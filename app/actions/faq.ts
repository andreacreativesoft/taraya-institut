"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { z } from "zod";
import { requireSession } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

const FaqSchema = z.object({
  question: z.string().min(1, { message: "Question requise" }),
  answer: z.string().min(1, { message: "Réponse requise" }),
});

export async function createFaq(_: unknown, formData: FormData) {
  const session = await requireSession();
  const validated = FaqSchema.safeParse({ question: formData.get("question"), answer: formData.get("answer") });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  const maxOrder = await db.faqItem.aggregate({ _max: { order: true } });
  const faq = await db.faqItem.create({ data: { ...validated.data, order: (maxOrder._max.order ?? 0) + 1 } });
  await writeAudit(session, "create", "FaqItem", validated.data.question, faq.id);
  revalidatePath("/admin/faq"); revalidatePath("/");
  return { success: true };
}

export async function updateFaq(id: string, formData: FormData) {
  const session = await requireSession();
  const data: Record<string, unknown> = {};
  const q = formData.get("question"); if (q) data.question = q;
  const a = formData.get("answer"); if (a) data.answer = a;
  const faq = await db.faqItem.update({ where: { id }, data });
  await writeAudit(session, "update", "FaqItem", faq.question, id);
  revalidatePath("/admin/faq"); revalidatePath("/");
}

export async function deleteFaq(id: string) {
  const session = await requireSession();
  const faq = await db.faqItem.findUnique({ where: { id }, select: { question: true } });
  await db.faqItem.delete({ where: { id } });
  await writeAudit(session, "delete", "FaqItem", faq?.question ?? id, id);
  revalidatePath("/admin/faq"); revalidatePath("/");
}

export async function toggleFaq(id: string, active: boolean) {
  const session = await requireSession();
  const faq = await db.faqItem.update({ where: { id }, data: { active } });
  await writeAudit(session, active ? "activate" : "deactivate", "FaqItem", faq.question, id);
  revalidatePath("/admin/faq"); revalidatePath("/");
}

export async function reorderFaq(ids: string[]) {
  await Promise.all(ids.map((id, order) => db.faqItem.update({ where: { id }, data: { order } })));
  revalidatePath("/admin/faq"); revalidatePath("/");
}
