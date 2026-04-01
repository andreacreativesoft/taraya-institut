"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { UserSchema } from "@/lib/definitions";
import { requireSuperAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";

export type UserState = { errors?: Record<string, string[]>; success?: boolean } | undefined;

export async function createUser(_: UserState, formData: FormData): Promise<UserState> {
  await requireSuperAdmin();

  const validated = UserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

  const existing = await db.user.findUnique({ where: { email: validated.data.email } });
  if (existing) return { errors: { email: ["Cette adresse email est déjà utilisée"] } };

  const hashed = await bcrypt.hash(validated.data.password, 12);
  await db.user.create({ data: { ...validated.data, password: hashed } });
  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(id: string) {
  await requireSuperAdmin();
  await db.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
