import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";

const GTM_RE      = /^GTM-[A-Z0-9]{4,10}$/;
const FB_PIXEL_RE = /^\d{10,20}$/;
const URL_MAX     = 300;
const TEXT_MAX    = 500;

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
  } catch { return ""; }
}

function sanitizePhone(value: unknown): string {
  return sanitizeText(value, 30).replace(/[^\d\s+\-().]/g, "");
}

function sanitizeEmail(value: unknown): string {
  const s = sanitizeText(value, 200);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s : "";
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();

    const gtmRaw   = sanitizeText(body.gtm_id ?? "", 20);
    const gtmSafe  = GTM_RE.test(gtmRaw) ? gtmRaw : "";
    const fbRaw    = sanitizeText(body.facebook_pixel_id ?? "", 20).replace(/\s/g, "");
    const fbSafe   = FB_PIXEL_RE.test(fbRaw) ? fbRaw : "";

    const errors: Record<string, string> = {};
    if (gtmRaw && !gtmSafe)  errors.gtm_id = "Format invalide. Exemple : GTM-XXXXXXX";
    if (fbRaw  && !fbSafe)   errors.facebook_pixel_id = "Format invalide. Le Pixel ID est un nombre de 10 à 20 chiffres.";
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    const sectionVal = (v: unknown) => v === "true" ? "true" : "false";

    const fieldMap: Record<string, string> = {
      phone:             sanitizePhone(body.phone),
      whatsapp:          sanitizePhone(body.whatsapp),
      email:             sanitizeEmail(body.email),
      address:           sanitizeText(body.address, 300),
      instagram:         sanitizeUrl(body.instagram),
      facebook:          sanitizeUrl(body.facebook),
      hero_title:        sanitizeText(body.hero_title),
      hero_subtitle:     sanitizeText(body.hero_subtitle),
      meta_title:        sanitizeText(body.meta_title, 100),
      meta_description:  sanitizeText(body.meta_description, 300),
      gtm_id:            gtmSafe,
      facebook_pixel_id: fbSafe,
      site_name:         sanitizeText(body.site_name, 100),
      logo_url:          sanitizeUrl(body.logo_url),
      favicon_url:       sanitizeUrl(body.favicon_url),
      recaptcha_site_key:    sanitizeText(body.recaptcha_site_key, 100),
      recaptcha_secret_key:  sanitizeText(body.recaptcha_secret_key, 100),
      google_maps_embed_url: sanitizeText(body.google_maps_embed_url, 200),
      section_services_enabled: sectionVal(body.section_services_enabled),
      section_pricing_enabled:  sectionVal(body.section_pricing_enabled),
      section_faq_enabled:      sectionVal(body.section_faq_enabled),
      section_forms_enabled:    sectionVal(body.section_forms_enabled),
    };

    for (const [key, value] of Object.entries(fieldMap)) {
      await db.siteSetting.upsert({
        where:  { key },
        update: { value },
        create: { key, value },
      });
    }

    await writeAudit(session, "update", "SiteSettings", "Paramètres du site");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/settings]", err);
    return NextResponse.json(
      { success: false, error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
