import Anthropic from "@anthropic-ai/sdk";
import { revalidatePath } from "next/cache";
import { requireSuperAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

const anthropic = new Anthropic();

const SYSTEM = `Tu es l'assistant administrateur du site Taraya Institut, un institut de beauté à Sterrebeek, Belgique.
Tu aides uniquement le Super Administrateur à gérer le contenu du site via une conversation naturelle en français.
Tu peux consulter et modifier les services, les tarifs, les paramètres, les blocs de contenu texte/HTML, la FAQ, les formulaires de contact et la visibilité des sections du site.

Les blocs de contenu (ContentBlocks) permettent de modifier le texte de chaque section du site (hero, à propos, pour qui, etc.).
Le champ "content" est un objet JSON libre : tu peux y mettre n'importe quelle clé/valeur (titre, sous-titre, texte, html, etc.).
Pour voir ce qui existe déjà, utilise list_content_blocks avant de modifier.

La FAQ est gérée via les outils list_faq, create_faq_item, update_faq_item, delete_faq_item.
La visibilité des sections (services, tarifs, FAQ, formulaires) se gère via set_section_visibility.
Les formulaires de contact personnalisés se créent via create_contact_form.
Les soumissions de formulaires récentes sont accessibles via list_form_submissions.

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
    description: "Récupère tous les paramètres du site : téléphone, email, adresse, textes hero, réseaux sociaux, visibilité des sections",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "update_setting",
    description: "Modifie un paramètre du site",
    input_schema: {
      type: "object" as const,
      properties: {
        key:   { type: "string", description: "Clé du paramètre (ex: phone, email, hero_title, site_name, section_faq_enabled, etc.)" },
        value: { type: "string", description: "Nouvelle valeur" },
      },
      required: ["key", "value"],
    },
  },
  {
    name: "list_content_blocks",
    description: "Liste tous les blocs de contenu du site (sections texte/HTML éditables) avec leurs clés, labels, contenu JSON et statut",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "update_content_block",
    description: "Modifie le contenu d'un bloc de texte du site. Le champ 'content' est un objet JSON libre avec les textes de la section.",
    input_schema: {
      type: "object" as const,
      properties: {
        key:     { type: "string", description: "Clé unique du bloc (ex: 'hero', 'about', 'forwho')" },
        content: { type: "object", description: "Nouveau contenu JSON (objet avec les champs texte de la section)" },
        active:  { type: "boolean", description: "true = section visible, false = section cachée" },
      },
      required: ["key"],
    },
  },
  {
    name: "list_faq",
    description: "Liste toutes les questions FAQ avec leurs IDs, questions, réponses et statut actif",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "create_faq_item",
    description: "Crée une nouvelle question FAQ",
    input_schema: {
      type: "object" as const,
      properties: {
        question: { type: "string", description: "La question" },
        answer:   { type: "string", description: "La réponse" },
      },
      required: ["question", "answer"],
    },
  },
  {
    name: "update_faq_item",
    description: "Modifie une question FAQ existante (question, réponse ou statut actif)",
    input_schema: {
      type: "object" as const,
      properties: {
        id:       { type: "string", description: "ID de la question FAQ" },
        question: { type: "string", description: "Nouvelle question" },
        answer:   { type: "string", description: "Nouvelle réponse" },
        active:   { type: "boolean", description: "true = active, false = inactive" },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_faq_item",
    description: "Supprime une question FAQ",
    input_schema: {
      type: "object" as const,
      properties: {
        id: { type: "string", description: "ID de la question FAQ à supprimer" },
      },
      required: ["id"],
    },
  },
  {
    name: "set_section_visibility",
    description: "Active ou désactive la visibilité d'une section du site (services, pricing, faq, forms)",
    input_schema: {
      type: "object" as const,
      properties: {
        section: {
          type: "string",
          description: "Section à modifier",
          enum: ["services", "pricing", "faq", "forms"],
        },
        enabled: { type: "boolean", description: "true = visible, false = cachée" },
      },
      required: ["section", "enabled"],
    },
  },
  {
    name: "list_form_submissions",
    description: "Liste les 20 dernières soumissions de formulaires de contact",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "list_contact_forms",
    description: "Liste tous les formulaires de contact personnalisés",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "create_contact_form",
    description: "Crée un nouveau formulaire de contact personnalisé",
    input_schema: {
      type: "object" as const,
      properties: {
        name:        { type: "string", description: "Nom du formulaire" },
        description: { type: "string", description: "Description optionnelle" },
        fields: {
          type: "array",
          description: "Champs du formulaire",
          items: {
            type: "object",
            properties: {
              label:       { type: "string" },
              type:        { type: "string", enum: ["text", "email", "tel", "textarea", "select"] },
              required:    { type: "boolean" },
              placeholder: { type: "string" },
              options:     { type: "array", items: { type: "string" } },
            },
            required: ["label", "type", "required"],
          },
        },
      },
      required: ["name", "fields"],
    },
  },
  {
    name: "update_contact_form",
    description: "Modifie un formulaire de contact (nom, description ou statut actif)",
    input_schema: {
      type: "object" as const,
      properties: {
        id:          { type: "string", description: "ID du formulaire" },
        name:        { type: "string", description: "Nouveau nom" },
        description: { type: "string", description: "Nouvelle description" },
        active:      { type: "boolean", description: "true = actif, false = inactif" },
      },
      required: ["id"],
    },
  },
];

// claude-opus-4-6 pricing: $15 / 1M input tokens, $75 / 1M output tokens
function calcCost(inputTokens: number, outputTokens: number) {
  return (inputTokens * 15 + outputTokens * 75) / 1_000_000;
}

const ALLOWED_SETTING_KEYS = new Set([
  "phone", "whatsapp", "email", "address",
  "instagram", "facebook",
  "hero_title", "hero_subtitle",
  "meta_title", "meta_description",
  "site_name", "logo_url", "favicon_url",
  "recaptcha_site_key", "recaptcha_secret_key",
  "google_maps_embed_url",
  "section_services_enabled", "section_pricing_enabled",
  "section_faq_enabled", "section_forms_enabled",
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
    case "list_content_blocks": {
      const blocks = await db.contentBlock.findMany({ orderBy: { order: "asc" } });
      return blocks.map(b => ({
        key: b.key, label: b.label, content: b.content, active: b.active,
      }));
    }
    case "update_content_block": {
      const { key, content, active } = input as {
        key: string; content?: Record<string, unknown>; active?: boolean;
      };
      const data: Record<string, unknown> = {};
      if (content !== undefined) data.content = content;
      if (active !== undefined) data.active = active;
      if (Object.keys(data).length === 0) return { error: "Aucune donnée à modifier" };
      const updated = await db.contentBlock.update({ where: { key }, data, select: { key: true, label: true } });
      revalidatePath("/"); revalidatePath("/admin/content");
      return { success: true, updated: updated.label };
    }
    case "list_faq": {
      const faqs = await db.faqItem.findMany({ orderBy: { order: "asc" } });
      return faqs.map(f => ({ id: f.id, question: f.question, answer: f.answer, active: f.active, order: f.order }));
    }
    case "create_faq_item": {
      const { question, answer } = input as { question: string; answer: string };
      if (!question || !answer) return { error: "Question et réponse requises" };
      const maxOrder = await db.faqItem.aggregate({ _max: { order: true } });
      const faq = await db.faqItem.create({ data: { question, answer, order: (maxOrder._max.order ?? 0) + 1 } });
      revalidatePath("/admin/faq"); revalidatePath("/");
      return { success: true, id: faq.id, question: faq.question };
    }
    case "update_faq_item": {
      const { id, question, answer, active } = input as {
        id: string; question?: string; answer?: string; active?: boolean;
      };
      const data: Record<string, unknown> = {};
      if (question !== undefined) data.question = question;
      if (answer !== undefined) data.answer = answer;
      if (active !== undefined) data.active = active;
      if (Object.keys(data).length === 0) return { error: "Aucune donnée à modifier" };
      const updated = await db.faqItem.update({ where: { id }, data, select: { question: true } });
      revalidatePath("/admin/faq"); revalidatePath("/");
      return { success: true, updated: updated.question };
    }
    case "delete_faq_item": {
      const { id } = input as { id: string };
      const faq = await db.faqItem.findUnique({ where: { id }, select: { question: true } });
      await db.faqItem.delete({ where: { id } });
      revalidatePath("/admin/faq"); revalidatePath("/");
      return { success: true, deleted: faq?.question ?? id };
    }
    case "set_section_visibility": {
      const { section, enabled } = input as { section: string; enabled: boolean };
      const key = `section_${section}_enabled`;
      if (!ALLOWED_SETTING_KEYS.has(key)) return { error: `Section "${section}" inconnue` };
      const value = enabled ? "true" : "false";
      await db.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
      revalidatePath("/"); revalidatePath("/admin/settings");
      return { success: true, section, enabled };
    }
    case "list_form_submissions": {
      const submissions = await db.formSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
      });
      return submissions.map(s => ({
        id: s.id, name: s.name, email: s.email, phone: s.phone,
        service: s.service, message: s.message, read: s.read,
        createdAt: s.createdAt,
      }));
    }
    case "list_contact_forms": {
      const forms = await db.contactForm.findMany({ orderBy: { order: "asc" } });
      return forms.map(f => ({
        id: f.id, name: f.name, description: f.description,
        fields: f.fields, active: f.active, order: f.order,
      }));
    }
    case "create_contact_form": {
      const { name, description, fields } = input as {
        name: string; description?: string; fields: unknown[];
      };
      if (!name || !fields) return { error: "Nom et champs requis" };
      const maxOrder = await db.contactForm.aggregate({ _max: { order: true } });
      const form = await db.contactForm.create({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { name, description, fields: fields as any, order: (maxOrder._max.order ?? 0) + 1 },
      });
      revalidatePath("/admin/forms");
      return { success: true, id: form.id, name: form.name };
    }
    case "update_contact_form": {
      const { id, name, description, active } = input as {
        id: string; name?: string; description?: string; active?: boolean;
      };
      const data: Record<string, unknown> = {};
      if (name !== undefined) data.name = name;
      if (description !== undefined) data.description = description;
      if (active !== undefined) data.active = active;
      if (Object.keys(data).length === 0) return { error: "Aucune donnée à modifier" };
      const updated = await db.contactForm.update({ where: { id }, data, select: { name: true } });
      revalidatePath("/admin/forms");
      return { success: true, updated: updated.name };
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
        let totalInput = 0;
        let totalOutput = 0;

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
          totalInput  += finalMsg.usage.input_tokens;
          totalOutput += finalMsg.usage.output_tokens;

          // ── Send usage BEFORE any DB changes happen ──────────────────────
          controller.enqueue(encoder.encode(
            `data: ${JSON.stringify({
              usage: {
                input:  totalInput,
                output: totalOutput,
                cost:   calcCost(totalInput, totalOutput),
              },
            })}\n\n`
          ));

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
