"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ServiceSchema, type ServiceState } from "@/lib/definitions";
import { requireSession } from "@/lib/auth";

export async function createService(_: ServiceState, formData: FormData): Promise<ServiceState> {
  await requireSession();

  const validated = ServiceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image") || undefined,
    imageAlt: formData.get("imageAlt") || undefined,
    order: 0,
    active: true,
  });

  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

  const count = await db.service.count();
  await db.service.create({ data: { ...validated.data, order: count } });
  revalidatePath("/admin/content/services");
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, _: ServiceState, formData: FormData): Promise<ServiceState> {
  await requireSession();

  const validated = ServiceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image") || undefined,
    imageAlt: formData.get("imageAlt") || undefined,
    order: 0,
    active: true,
  });

  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

  await db.service.update({ where: { id }, data: validated.data });
  revalidatePath("/admin/content/services");
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  await requireSession();
  await db.service.delete({ where: { id } });
  revalidatePath("/admin/content/services");
  revalidatePath("/");
}

export async function toggleService(id: string, active: boolean) {
  await requireSession();
  await db.service.update({ where: { id }, data: { active } });
  revalidatePath("/admin/content/services");
  revalidatePath("/");
}

export async function reorderServices(ids: string[]) {
  await requireSession();
  await Promise.all(ids.map((id, index) =>
    db.service.update({ where: { id }, data: { order: index } })
  ));
  revalidatePath("/admin/content/services");
  revalidatePath("/");
}
