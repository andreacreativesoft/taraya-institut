"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { UserSchema } from "@/lib/definitions";
import { requireSuperAdmin } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import bcrypt from "bcryptjs";

export type UserState = { errors?: Record<string, string[]>; success?: boolean } | undefined;

export async function createUser(_: UserState, formData: FormData): Promise<UserState> {
  try {
    const session = await requireSuperAdmin();

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
    const user = await db.user.create({ data: { ...validated.data, password: hashed } });
    await writeAudit(session, "create", "User", `${validated.data.name} (${validated.data.email})`, user.id);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return { errors: { _form: [msg] } };
  }
}

export async function deleteUser(id: string) {
  const session = await requireSuperAdmin();
  const user = await db.user.findUnique({ where: { id }, select: { name: true, email: true } });
  await db.user.delete({ where: { id } });
  await writeAudit(session, "delete", "User", user ? `${user.name} (${user.email})` : id, id);
  revalidatePath("/admin/users");
}
