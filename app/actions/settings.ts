"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function saveSetting(key: string, value: string) {
  await requireSession();
  await db.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function saveSettings(_: unknown, formData: FormData): Promise<{ success: boolean }> {
  await requireSession();

  const keys = [
    "phone", "whatsapp", "email", "address",
    "instagram", "facebook",
    "hero_title", "hero_subtitle",
    "meta_title", "meta_description",
  ];

  await Promise.all(
    keys.map((key) => {
      const value = formData.get(key) as string ?? "";
      return db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    })
  );

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
