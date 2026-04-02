"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";
import { LoginSchema, type LoginState } from "@/lib/definitions";
import { checkRateLimit, resetRateLimit } from "@/lib/ratelimit";

export async function login(state: LoginState, formData: FormData): Promise<LoginState> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  const rl = checkRateLimit(email.toLowerCase());
  if (!rl.allowed) {
    const minutes = Math.ceil((rl.retryAfterSeconds ?? 900) / 60);
    return { errors: { _form: [`Trop de tentatives. Réessayez dans ${minutes} minute${minutes > 1 ? "s" : ""}.`] } };
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return { errors: { _form: ["Email ou mot de passe incorrect"] } };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { errors: { _form: ["Email ou mot de passe incorrect"] } };
  }

  resetRateLimit(email.toLowerCase());

  await createSession({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  });

  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
