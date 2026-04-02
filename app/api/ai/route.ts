import Anthropic from "@anthropic-ai/sdk";
import { revalidatePath } from "next/cache";
import { requireSuperAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

const anthropic = new Anthropic();

const SYSTEM = `Tu es l'assistant administrateur du site Taraya Institut, un institut de beauté à Sterrebeek, Belgique.
Tu aides uniquement le Super Administrateur à gérer le contenu du site via une conversation naturelle en français.
Tu peux consulter et modifier les services, les tarifs et les paramètres du site.

Règles importantes :
- Réponds toujours en français
- Si tu as besoin d'un ID pour faire une modification, appelle d'abord l'outil de liste correspondant
- Après chaque modification, confirme clairement ce que tu as changé
- Sois concis et professionnel
- Ne modifie jamais les mots de passe ou les données des utilisateurs`;

const TOOLS: Anthropic.Tool[] = [
  {
    name: "list_services",
    description: "Liste tous les services du site avec leurs IDs, titres, descriptions et statut actif",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "update_service",
    description: "Modifie un service (titre, description ou statut actif/inactif)",
    input_schema: {
      type: "object" as const,
      properties: {
        id:          { type: "string", description: "ID du service" },
        title:       { type: "string", description: "Nouveau titre" },
        description: { type: "string", description: "Nouvelle description" },
        active:      { type: "boolean", description: "true = actif, false = inactif" },
      },
      required: ["id"],
    },
  },
  {
    name: "list_pricing",
    description: "Liste toutes les catégories de tarifs et leurs prestations avec IDs et prix",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "update_pricing_item",
    description: "Modifie une prestation (libellé ou prix)",
    input_schema: {
      type: "object" as const,
      properties: {
        id:    { type: "string", description: "ID de la prestation" },
        label: { type: "string", description: "Nouveau libellé" },
        price: { type: "string", description: "Nouveau prix (ex: '38€')" },
      },
      required: ["id"],
    },
  },
  {
    name: "get_settings",
    description: "Récupère tous les paramètres du site : téléphone, email, adresse, textes hero, réseaux sociaux",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "update_setting",
    description: "Modifie un paramètre du site",
    input_schema: {
      type: "object" as const,
      properties: {
        key:   { type: "string", description: "Clé : phone, whatsapp, email, address, instagram, facebook, hero_title, hero_subtitle, meta_title, meta_description" },
        value: { type: "string", description: "Nouvelle valeur" },
      },
      required: ["key", "value"],
    },
  },
];

const ALLOWED_SETTING_KEYS = new Set([
  "phone", "whatsapp", "email", "address",
  "instagram", "facebook",
  "hero_title", "hero_subtitle",
  "meta_title", "meta_description",
]);

async function executeTool(name: string, input: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case "list_services": {
      const services = await db.service.findMany({ orderBy: { order: "asc" } });
      return services.map(s => ({
        id: s.id, title: s.title,
        description: s.description, active: s.active,
      }));
    }
    case "update_service": {
      const { id, title, description, active } = input as {
        id: string; title?: string; description?: string; active?: boolean;
      };
      const data: Record<string, unknown> = {};
      if (title !== undefined) data.title = title;
      if (description !== undefined) data.description = description;
      if (active !== undefined) data.active = active;
      if (Object.keys(data).length === 0) return { error: "Aucune donnée à modifier" };
      const updated = await db.service.update({ where: { id }, data, select: { title: true } });
      revalidatePath("/"); revalidatePath("/admin/content/services");
      return { success: true, updated: updated.title };
    }
    case "list_pricing": {
      const categories = await db.pricingCategory.findMany({
        orderBy: { order: "asc" },
        include: { items: { orderBy: { order: "asc" } } },
      });
      return categories.map(c => ({
        id: c.id, title: c.title, active: c.active,
        items: c.items.map(i => ({ id: i.id, label: i.label, price: i.price })),
      }));
    }
    case "update_pricing_item": {
      const { id, label, price } = input as { id: string; label?: string; price?: string };
      const data: Record<string, unknown> = {};
      if (label !== undefined) data.label = label;
      if (price !== undefined) data.price = price;
      if (Object.keys(data).length === 0) return { error: "Aucune donnée à modifier" };
      const updated = await db.pricingItem.update({ where: { id }, data, select: { label: true, price: true } });
      revalidatePath("/"); revalidatePath("/admin/content/pricing");
      return { success: true, updated: `${updated.label} — ${updated.price}` };
    }
    case "get_settings": {
      const settings = await db.siteSetting.findMany();
      return Object.fromEntries(settings.map(s => [s.key, s.value]));
    }
    case "update_setting": {
      const { key, value } = input as { key: string; value: string };
      if (!ALLOWED_SETTING_KEYS.has(key)) return { error: `Clé "${key}" non autorisée` };
      await db.siteSetting.upsert({
        where: { key }, update: { value }, create: { key, value },
      });
      revalidatePath("/"); revalidatePath("/admin/settings");
      return { success: true, key, value };
    }
    default:
      return { error: "Outil inconnu" };
  }
}

export async function POST(request: Request) {
  await requireSuperAdmin();

  const { messages } = (await request.json()) as { messages: Anthropic.MessageParam[] };

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let currentMessages: Anthropic.MessageParam[] = [...messages];

        while (true) {
          const anthropicStream = anthropic.messages.stream({
            model: "claude-opus-4-6",
            max_tokens: 4096,
            system: SYSTEM,
            tools: TOOLS,
            messages: currentMessages,
          });

          for await (const event of anthropicStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }

          const finalMsg = await anthropicStream.finalMessage();

          if (finalMsg.stop_reason !== "tool_use") break;

          const toolUses = finalMsg.content.filter(
            (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
          );

          const toolResults: Anthropic.ToolResultBlockParam[] = [];
          for (const toolUse of toolUses) {
            const result = await executeTool(
              toolUse.name,
              toolUse.input as Record<string, unknown>
            );
            toolResults.push({
              type: "tool_result",
              tool_use_id: toolUse.id,
              content: JSON.stringify(result),
            });
          }

          currentMessages = [
            ...currentMessages,
            { role: "assistant", content: finalMsg.content },
            { role: "user", content: toolResults },
          ];
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (e) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: "Erreur serveur" })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
