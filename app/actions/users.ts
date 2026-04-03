"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { UserSchema } from "@/lib/definitions";
import { requireSuperAdmin } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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

export async function updateUser(id: string, formData: FormData) {
  try {
    const session = await requireSuperAdmin();
    const name  = (formData.get("name")  as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const role  = formData.get("role") as "ADMIN" | "SUPER_ADMIN";
    const password = (formData.get("password") as string)?.trim();

    if (!name || !email || !["ADMIN","SUPER_ADMIN"].includes(role)) {
      return { errors: { _form: ["Données invalides"] } };
    }
    // Check email uniqueness (exclude current user)
    const existing = await db.user.findFirst({ where: { email, NOT: { id } } });
    if (existing) return { errors: { email: ["Email déjà utilisé"] } };

    const data: Record<string, unknown> = { name, email, role };
    if (password && password.length >= 8) {
      data.password = await bcrypt.hash(password, 12);
    }
    const user = await db.user.update({ where: { id }, data });
    await writeAudit(session, "update", "User", `${user.name} (${user.email})`, id);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (e) {
    return { errors: { _form: [e instanceof Error ? e.message : "Erreur"] } };
  }
}

export async function generatePasswordResetLink(userId: string): Promise<string> {
  await requireSuperAdmin();
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  await db.passwordResetToken.upsert({
    where: { userId },
    update: { token, expiresAt },
    create: { userId, token, expiresAt },
  });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tarayainstitut.be";
  return `${baseUrl}/admin/reset-password?token=${token}`;
}
