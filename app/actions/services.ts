"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ServiceSchema, type ServiceState } from "@/lib/definitions";
import { requireSession } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

export async function createService(_: ServiceState, formData: FormData): Promise<ServiceState> {
  const session = await requireSession();

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
  const service = await db.service.create({ data: { ...validated.data, order: count } });
  await writeAudit(session, "create", "Service", validated.data.title, service.id);
  revalidatePath("/admin/content/services");
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, _: ServiceState, formData: FormData): Promise<ServiceState> {
  const session = await requireSession();

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
  await writeAudit(session, "update", "Service", validated.data.title, id);
  revalidatePath("/admin/content/services");
  revalidatePath("/");
  return { success: true };
}

export async function saveService(id: string, formData: FormData): Promise<ServiceState> {
  return updateService(id, undefined, formData);
}

export async function deleteService(id: string) {
  const session = await requireSession();
  const service = await db.service.findUnique({ where: { id }, select: { title: true } });
  await db.service.delete({ where: { id } });
  await writeAudit(session, "delete", "Service", service?.title ?? id, id);
  revalidatePath("/admin/content/services");
  revalidatePath("/");
}

export async function toggleService(id: string, active: boolean) {
  const session = await requireSession();
  const service = await db.service.findUnique({ where: { id }, select: { title: true } });
  await db.service.update({ where: { id }, data: { active } });
  await writeAudit(session, active ? "activate" : "deactivate", "Service", service?.title ?? id, id);
  revalidatePath("/admin/content/services");
  revalidatePath("/");
}

export async function reorderServices(ids: string[]) {
  await requireSession();
  await db.$transaction(ids.map((id, index) =>
    db.service.update({ where: { id }, data: { order: index } })
  ));
  revalidatePath("/admin/content/services");
  revalidatePath("/");
}
