"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { PricingCategorySchema, PricingItemSchema, type PricingState } from "@/lib/definitions";
import { requireSession } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

// ─── Categories ───────────────────────────────────────────────────────────────

export async function createCategory(_: PricingState, formData: FormData): Promise<PricingState> {
  const session = await requireSession();
  const validated = PricingCategorySchema.safeParse({
    title: formData.get("title"),
    order: 0,
    active: true,
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  const count = await db.pricingCategory.count();
  const category = await db.pricingCategory.create({ data: { ...validated.data, order: count } });
  await writeAudit(session, "create", "PricingCategory", validated.data.title, category.id);
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function updateCategory(id: string, _: PricingState, formData: FormData): Promise<PricingState> {
  const session = await requireSession();
  const validated = PricingCategorySchema.safeParse({
    title: formData.get("title"),
    order: 0,
    active: true,
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  await db.pricingCategory.update({ where: { id }, data: validated.data });
  await writeAudit(session, "update", "PricingCategory", validated.data.title, id);
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCategory(id: string) {
  const session = await requireSession();
  const category = await db.pricingCategory.findUnique({ where: { id }, select: { title: true } });
  await db.pricingCategory.delete({ where: { id } });
  await writeAudit(session, "delete", "PricingCategory", category?.title ?? id, id);
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}

export async function toggleCategory(id: string, active: boolean) {
  const session = await requireSession();
  const category = await db.pricingCategory.findUnique({ where: { id }, select: { title: true } });
  await db.pricingCategory.update({ where: { id }, data: { active } });
  await writeAudit(session, active ? "activate" : "deactivate", "PricingCategory", category?.title ?? id, id);
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}

export async function reorderCategories(ids: string[]) {
  await requireSession();
  await db.$transaction(ids.map((id, index) =>
    db.pricingCategory.update({ where: { id }, data: { order: index } })
  ));
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}

// ─── Items ────────────────────────────────────────────────────────────────────

export async function createItem(_: PricingState, formData: FormData): Promise<PricingState> {
  const session = await requireSession();
  const categoryId = formData.get("categoryId") as string;
  const validated = PricingItemSchema.safeParse({
    label: formData.get("label"),
    price: formData.get("price"),
    categoryId,
    order: 0,
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  const count = await db.pricingItem.count({ where: { categoryId } });
  const item = await db.pricingItem.create({ data: { ...validated.data, order: count } });
  await writeAudit(session, "create", "PricingItem", `${validated.data.label} — ${validated.data.price}€`, item.id);
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function updateItem(id: string, _: PricingState, formData: FormData): Promise<PricingState> {
  const session = await requireSession();
  const validated = PricingItemSchema.safeParse({
    label: formData.get("label"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
    order: 0,
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  await db.pricingItem.update({ where: { id }, data: validated.data });
  await writeAudit(session, "update", "PricingItem", `${validated.data.label} — ${validated.data.price}€`, id);
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function deleteItem(id: string) {
  const session = await requireSession();
  const item = await db.pricingItem.findUnique({ where: { id }, select: { label: true, price: true } });
  await db.pricingItem.delete({ where: { id } });
  await writeAudit(session, "delete", "PricingItem", item ? `${item.label} — ${item.price}€` : id, id);
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}

export async function reorderItems(ids: string[]) {
  await requireSession();
  await db.$transaction(ids.map((id, index) =>
    db.pricingItem.update({ where: { id }, data: { order: index } })
  ));
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}
