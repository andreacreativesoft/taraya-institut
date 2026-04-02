"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { PricingCategorySchema, PricingItemSchema, type PricingState } from "@/lib/definitions";
import { requireSession } from "@/lib/auth";

// ─── Categories ───────────────────────────────────────────────────────────────

export async function createCategory(_: PricingState, formData: FormData): Promise<PricingState> {
  await requireSession();
  const validated = PricingCategorySchema.safeParse({
    title: formData.get("title"),
    order: 0,
    active: true,
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  const count = await db.pricingCategory.count();
  await db.pricingCategory.create({ data: { ...validated.data, order: count } });
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function updateCategory(id: string, _: PricingState, formData: FormData): Promise<PricingState> {
  await requireSession();
  const validated = PricingCategorySchema.safeParse({
    title: formData.get("title"),
    order: 0,
    active: true,
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  await db.pricingCategory.update({ where: { id }, data: validated.data });
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCategory(id: string) {
  await requireSession();
  await db.pricingCategory.delete({ where: { id } });
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}

export async function toggleCategory(id: string, active: boolean) {
  await requireSession();
  await db.pricingCategory.update({ where: { id }, data: { active } });
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}

export async function reorderCategories(ids: string[]) {
  await requireSession();
  await Promise.all(ids.map((id, index) =>
    db.pricingCategory.update({ where: { id }, data: { order: index } })
  ));
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}

// ─── Items ────────────────────────────────────────────────────────────────────

export async function createItem(_: PricingState, formData: FormData): Promise<PricingState> {
  await requireSession();
  const categoryId = formData.get("categoryId") as string;
  const validated = PricingItemSchema.safeParse({
    label: formData.get("label"),
    price: formData.get("price"),
    categoryId,
    order: 0,
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  const count = await db.pricingItem.count({ where: { categoryId } });
  await db.pricingItem.create({ data: { ...validated.data, order: count } });
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function updateItem(id: string, _: PricingState, formData: FormData): Promise<PricingState> {
  await requireSession();
  const validated = PricingItemSchema.safeParse({
    label: formData.get("label"),
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
    order: 0,
  });
  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };
  await db.pricingItem.update({ where: { id }, data: validated.data });
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
  return { success: true };
}

export async function deleteItem(id: string) {
  await requireSession();
  await db.pricingItem.delete({ where: { id } });
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}

export async function reorderItems(ids: string[]) {
  await requireSession();
  await Promise.all(ids.map((id, index) =>
    db.pricingItem.update({ where: { id }, data: { order: index } })
  ));
  revalidatePath("/admin/content/pricing");
  revalidatePath("/");
}
