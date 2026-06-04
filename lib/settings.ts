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
  google_maps_pin_title: string;
  // Announcement banner
  announcement_enabled: string;
  announcement_text: string;
  announcement_button_text: string;
  announcement_button_url: string;
  // Section visibility (stored as "true"/"false" strings)
  section_services_enabled: string;
  section_pricing_enabled: string;
  section_promo_enabled: string;
  section_faq_enabled: string;
  section_forms_enabled: string;
  nav_cadeaux_enabled: string;
  // Section texts
  pedicure_title: string;
  pedicure_subtitle: string;
  services_title: string;
  services_subtitle: string;
  promo_label: string;
  promo_title: string;
  promo_body: string;
  pricing_title: string;
  pricing_subtitle: string;
  pricing_payment_note: string;
  cta_title: string;
  cta_body: string;
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
  google_maps_pin_title: "Taraya Institut",
  announcement_enabled: "false",
  announcement_text: "",
  announcement_button_text: "",
  announcement_button_url: "",
  section_services_enabled: "true",
  section_pricing_enabled: "true",
  section_promo_enabled: "true",
  section_faq_enabled: "false",
  section_forms_enabled: "true",
  nav_cadeaux_enabled: "true",
  // Section texts
  pedicure_title: "Pédicure médicale, notre spécialité à Zaventem",
  pedicure_subtitle: "Pédicure médicale et esthétique. La pédicure est au cœur de mon expertise. Après plus de 15 ans de pratique et une spécialisation approfondie, je propose des soins adaptés à chaque besoin.",
  services_title: "Nos services",
  services_subtitle: "Des soins pensés pour vous, de la tête aux pieds.\nChez Taraya, chaque soin est réalisé avec le temps et l'attention qu'il mérite. Découvrez nos prestations, toutes pensées pour vous offrir un vrai moment de bien-être.",
  promo_label: "Promo",
  promo_title: "-15% sur tous les soins visage durant le mois de MAI",
  promo_body: "Le printemps s'invite sur votre peau ! Profitez de -15% sur l'ensemble de nos soins visage Phyt's tout au long du mois de mai. Uniquement sur rendez-vous.",
  pricing_title: "Nos tarifs",
  pricing_subtitle: "Trouvez le soin qui vous correspond.\nRetrouvez ci-dessous l'ensemble des prestations et leurs tarifs.",
  pricing_payment_note: "Paiements par cash ou Payconiq uniquement.",
  cta_title: "Prête à prendre un moment pour vous ?",
  cta_body: "Vous souhaitez réserver ou vous avez une question ? Écrivez-moi sur WhatsApp.\nTout rendez-vous annulé moins de 24 heures à l'avance sera facturé.",
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
