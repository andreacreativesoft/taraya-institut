"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

const GTM_RE = /^GTM-[A-Z0-9]{4,10}$/;

const ALLOWED_KEYS = new Set([
  "phone", "whatsapp", "email", "address",
  "instagram", "facebook",
  "hero_title", "hero_subtitle",
  "meta_title", "meta_description",
  "gtm_id",
]);
const URL_MAX = 300;
const TEXT_MAX = 500;

function sanitizeText(value: unknown, max = TEXT_MAX): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function sanitizeUrl(value: unknown): string {
  const s = sanitizeText(value, URL_MAX);
  if (!s) return "";
  try {
    const u = new URL(s);
    if (u.protocol !== "https:" && u.protocol !== "http:") return "";
    return s;
  } catch {
    return "";
  }
}

function sanitizePhone(value: unknown): string {
  const s = sanitizeText(value, 30);
  // Allow digits, spaces, +, -, (, )
  return s.replace(/[^\d\s+\-().]/g, "");
}

function sanitizeEmail(value: unknown): string {
  const s = sanitizeText(value, 200);
  // Basic email shape check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s : "";
}

function sanitizeGtm(value: unknown): string {
  const s = sanitizeText(value, 20);
  if (!s) return "";
  return GTM_RE.test(s) ? s : "";
}

export async function saveSetting(key: string, value: string) {
  await requireSession();
  if (!ALLOWED_KEYS.has(key)) throw new Error("Clé de paramètre invalide");
  const sanitized = sanitizeText(value);
  await db.siteSetting.upsert({
    where: { key },
    update: { value: sanitized },
    create: { key, value: sanitized },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function saveSettings(_: unknown, formData: FormData): Promise<{ success: boolean; errors?: Record<string, string> }> {
  await requireSession();

  const gtmRaw = sanitizeGtm(formData.get("gtm_id"));
  const gtmInput = sanitizeText(formData.get("gtm_id"), 20);

  // If user typed something but it doesn't match GTM format, surface an error
  if (gtmInput && !gtmRaw) {
    return { success: false, errors: { gtm_id: "Format invalide. Exemple : GTM-XXXXXXX" } };
  }

  const fieldMap: Record<string, string> = {
    phone:            sanitizePhone(formData.get("phone")),
    whatsapp:         sanitizePhone(formData.get("whatsapp")),
    email:            sanitizeEmail(formData.get("email")),
    address:          sanitizeText(formData.get("address"), 300),
    instagram:        sanitizeUrl(formData.get("instagram")),
    facebook:         sanitizeUrl(formData.get("facebook")),
    hero_title:       sanitizeText(formData.get("hero_title")),
    hero_subtitle:    sanitizeText(formData.get("hero_subtitle")),
    meta_title:       sanitizeText(formData.get("meta_title"), 100),
    meta_description: sanitizeText(formData.get("meta_description"), 300),
    gtm_id:           gtmRaw,
  };

  await Promise.all(
    Object.entries(fieldMap).map(([key, value]) =>
      db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
