"use client";

import { useState } from "react";

type Settings = Record<string, string>;

const inputCls = "input-admin";
const labelCls = "font-body text-[#251d1b] text-[13px] font-medium";
const fieldCls = "flex flex-col gap-1.5";
const cardCls  = "bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-5";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[#746e6b] text-[11px] uppercase tracking-[0.08em] font-medium border-b border-[#f0ece4] pb-2 mb-1">
      {children}
    </p>
  );
}

function Toggle({ name, label, checked }: { name: string; label: string; checked: boolean }) {
  const [value, setValue] = useState(checked);
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={labelCls}>{label}</span>
      <div className="flex items-center gap-2">
        <input type="hidden" name={name} value={value ? "true" : "false"} />
        <button
          type="button"
          onClick={() => setValue(v => !v)}
          className={`inline-flex items-center justify-center w-11 h-6 rounded-full transition-colors ${value ? "bg-[#44312b]" : "bg-[#dad5cd]"}`}
          aria-label={value ? "Désactiver" : "Activer"}
        >
          <span className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${value ? "translate-x-2.5" : "-translate-x-2.5"}`} />
        </button>
      </div>
    </div>
  );
}

export default function SeoSettingsForm({ settings, userRole }: { settings: Settings; userRole: string }) {
  const get = (key: string) => settings[key] ?? "";

  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors]   = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setSuccess(false);
    setErrors({});

    const form = e.currentTarget;
    const data: Record<string, string> = {};
    new FormData(form).forEach((v, k) => { data[k] = v as string; });

    try {
      const res  = await fetch("/api/settings", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        setSuccess(true);
      } else if (json.errors) {
        setErrors(json.errors);
      } else {
        setErrors({ form: json.error || "Une erreur s'est produite. Veuillez réessayer." });
      }
    } catch {
      setErrors({ form: "Impossible de contacter le serveur. Vérifiez votre connexion." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* ── BALISES META ─────────────────────────────────────── */}
      <div className={cardCls}>
        <SectionLabel>Balises meta</SectionLabel>
        <div className={fieldCls}>
          <label className={labelCls}>Titre meta</label>
          <input name="meta_title" defaultValue={get("meta_title")} placeholder="Taraya Institut – Soins beauté Sterrebeek" className={inputCls} />
          <p className="font-body text-[#746e6b] text-[11px]">Recommandé : 50–60 caractères</p>
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Description meta</label>
          <textarea name="meta_description" defaultValue={get("meta_description")} rows={3}
            placeholder="Institut de beauté certifié Phyt's. Soins visage, massages, épilations…"
            className={`${inputCls} resize-none`} />
          <p className="font-body text-[#746e6b] text-[11px]">Recommandé : 150–160 caractères</p>
        </div>
      </div>

      {/* ── ANALYTICS ────────────────────────────────────────── */}
      <div className={cardCls}>
        <SectionLabel>Google Tag Manager</SectionLabel>
        <div className={fieldCls}>
          <label className={labelCls}>GTM ID</label>
          <input name="gtm_id" defaultValue={get("gtm_id")} placeholder="GTM-XXXXXXX" className={inputCls} />
          <p className="font-body text-[#746e6b] text-[11px]">Laissez vide pour désactiver. Format : GTM-XXXXXXX</p>
          {errors.gtm_id && <p className="text-red-500 text-[12px]">{errors.gtm_id}</p>}
        </div>
      </div>

      <div className={cardCls}>
        <SectionLabel>Facebook Pixel</SectionLabel>
        <div className={fieldCls}>
          <label className={labelCls}>Pixel ID</label>
          <input name="facebook_pixel_id" defaultValue={get("facebook_pixel_id")} placeholder="1234567890123456" className={inputCls} />
          <p className="font-body text-[#746e6b] text-[11px]">Laissez vide pour désactiver. Trouvez votre Pixel ID dans le Gestionnaire d&apos;événements Facebook.</p>
          {errors.facebook_pixel_id && <p className="text-red-500 text-[12px]">{errors.facebook_pixel_id}</p>}
        </div>
      </div>

      {/* ── RECAPTCHA ────────────────────────────────────────── */}
      <div className={cardCls}>
        <SectionLabel>Google reCAPTCHA</SectionLabel>
        <div className={fieldCls}>
          <label className={labelCls}>Clé de site (site key)</label>
          <input name="recaptcha_site_key" defaultValue={get("recaptcha_site_key")} placeholder="6Le..." className={inputCls} />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Clé secrète (secret key)</label>
          <input name="recaptcha_secret_key" defaultValue={get("recaptcha_secret_key")} placeholder="6Le..." className={inputCls} />
        </div>
      </div>

      {/* ── GOOGLE MAPS ──────────────────────────────────────── */}
      <div className={cardCls}>
        <SectionLabel>Google Maps</SectionLabel>
        <div className={fieldCls}>
          <label className={labelCls}>Clé API Google Maps</label>
          <input name="google_maps_embed_url" defaultValue={get("google_maps_embed_url")} placeholder="AIzaSy..." className={inputCls} />
          <p className="font-body text-[#746e6b] text-[11px]">Clé API Google Maps Embed. Laissez vide pour masquer la carte sur le site.</p>
        </div>
      </div>

      {/* ── VISIBILITÉ DES SECTIONS — SUPER ADMIN ONLY ───────── */}
      {userRole === "SUPER_ADMIN" && (
        <div className={cardCls}>
          <SectionLabel>Visibilité des sections</SectionLabel>
          <Toggle name="section_services_enabled" label="Services" checked={get("section_services_enabled") !== "false"} />
          <Toggle name="section_pricing_enabled" label="Tarifs" checked={get("section_pricing_enabled") !== "false"} />
          <Toggle name="section_faq_enabled" label="FAQ" checked={get("section_faq_enabled") === "true"} />
          <Toggle name="section_forms_enabled" label="Formulaires" checked={get("section_forms_enabled") !== "false"} />
        </div>
      )}

      {success && (
        <p className="text-green-600 font-body text-[13px]">✓ Paramètres enregistrés avec succès</p>
      )}
      {errors.form && (
        <p className="text-red-500 font-body text-[13px] bg-red-50 border border-red-200 rounded-lg px-4 py-3">{errors.form}</p>
      )}

      <div className="flex justify-end">
        <button type="submit" disabled={pending}
          className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-6 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
