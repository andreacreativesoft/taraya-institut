import { db } from "@/lib/db";

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  hero_title: string;
  hero_subtitle: string;
  meta_title: string;
  meta_description: string;
  gtm_id: string;
};

const defaults: SiteSettings = {
  phone: "+32471824764",
  whatsapp: "0471824764",
  email: "tarayainstitut@hotmail.com",
  address: "Waalsestraat 34, 1933 Sterrebeek",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  hero_title: "Un institut de beauté dédié à votre bien-être",
  hero_subtitle: "Uniquement sur rendez-vous",
  meta_title: "Taraya Institut – Soins beauté",
  meta_description: "Institut de beauté certifié Phyt's. Soins visage, massages, épilations et plus.",
  gtm_id: "",
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const rows = await db.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return { ...defaults, ...map } as SiteSettings;
  } catch {
    return defaults;
  }
}
