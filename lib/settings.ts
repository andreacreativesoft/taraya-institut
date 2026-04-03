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
  facebook_pixel_id: string;
  // General
  site_name: string;
  logo_url: string;
  favicon_url: string;
  // reCAPTCHA & Maps
  recaptcha_site_key: string;
  recaptcha_secret_key: string;
  google_maps_embed_url: string;
  // Section visibility (stored as "true"/"false" strings)
  section_services_enabled: string;
  section_pricing_enabled: string;
  section_faq_enabled: string;
  section_forms_enabled: string;
};

export const defaults: SiteSettings = {
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
  facebook_pixel_id: "",
  site_name: "Taraya Institut",
  logo_url: "",
  favicon_url: "",
  recaptcha_site_key: "",
  recaptcha_secret_key: "",
  google_maps_embed_url: "",
  section_services_enabled: "true",
  section_pricing_enabled: "true",
  section_faq_enabled: "false",
  section_forms_enabled: "true",
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
