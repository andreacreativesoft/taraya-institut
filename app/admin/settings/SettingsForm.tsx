"use client";

import { useActionState } from "react";
import { saveSettings } from "@/app/actions/settings";

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

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action, pending] = useActionState(saveSettings, undefined);
  const get = (key: string) => settings[key] ?? "";

  return (
    <form action={action} className="flex flex-col gap-10">

      {/* ── PARAMÈTRES DU SITE ───────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-[#251d1b] text-[20px] font-bold">Paramètres du site</h2>

        <div className={cardCls}>
          <SectionLabel>Contact</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={fieldCls}>
              <label className={labelCls}>Téléphone</label>
              <input name="phone" defaultValue={get("phone")} placeholder="+32 471 82 47 64" className={inputCls} />
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>WhatsApp</label>
              <input name="whatsapp" defaultValue={get("whatsapp")} placeholder="+32471824764" className={inputCls} />
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>Email</label>
              <input name="email" type="email" defaultValue={get("email")} placeholder="contact@taraya-institut.be" className={inputCls} />
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>Adresse</label>
              <input name="address" defaultValue={get("address")} placeholder="Sterrebeek, Belgique" className={inputCls} />
            </div>
          </div>
        </div>

        <div className={cardCls}>
          <SectionLabel>Réseaux sociaux</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={fieldCls}>
              <label className={labelCls}>Instagram</label>
              <input name="instagram" defaultValue={get("instagram")} placeholder="https://instagram.com/taraya_institut" className={inputCls} />
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>Facebook</label>
              <input name="facebook" defaultValue={get("facebook")} placeholder="https://facebook.com/taraya.institut" className={inputCls} />
            </div>
          </div>
        </div>

        <div className={cardCls}>
          <SectionLabel>Section Hero</SectionLabel>
          <div className="flex flex-col gap-4">
            <div className={fieldCls}>
              <label className={labelCls}>Titre principal</label>
              <input name="hero_title" defaultValue={get("hero_title")} placeholder="Un institut de beauté dédié à votre bien-être" className={inputCls} />
            </div>
            <div className={fieldCls}>
              <label className={labelCls}>Sous-titre</label>
              <textarea name="hero_subtitle" defaultValue={get("hero_subtitle")} rows={2}
                placeholder="Là où l'on se pose, où l'on se dépose…"
                className={`${inputCls} resize-none`} />
            </div>
          </div>
        </div>
      </div>

      {/* ── SEO ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-[#251d1b] text-[20px] font-bold">SEO</h2>

        <div className={cardCls}>
          <SectionLabel>Balises meta</SectionLabel>
          <div className="flex flex-col gap-4">
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
        </div>
      </div>

      {/* ── ANALYTICS & TRACKING ────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-[#251d1b] text-[20px] font-bold">Analytics & Tracking</h2>

        <div className={cardCls}>
          <SectionLabel>Google Tag Manager</SectionLabel>
          <div className={fieldCls}>
            <label className={labelCls}>GTM ID</label>
            <input name="gtm_id" defaultValue={get("gtm_id")} placeholder="GTM-XXXXXXX" className={inputCls} />
            <p className="font-body text-[#746e6b] text-[11px]">Laissez vide pour désactiver. Format : GTM-XXXXXXX</p>
            {state?.errors?.gtm_id && <p className="text-red-500 text-[12px]">{state.errors.gtm_id}</p>}
          </div>
        </div>

        <div className={cardCls}>
          <SectionLabel>Facebook Pixel</SectionLabel>
          <div className={fieldCls}>
            <label className={labelCls}>Pixel ID</label>
            <input name="facebook_pixel_id" defaultValue={get("facebook_pixel_id")} placeholder="1234567890123456" className={inputCls} />
            <p className="font-body text-[#746e6b] text-[11px]">Laissez vide pour désactiver. Trouvez votre Pixel ID dans le Gestionnaire d&apos;événements Facebook.</p>
            {state?.errors?.facebook_pixel_id && <p className="text-red-500 text-[12px]">{state.errors.facebook_pixel_id}</p>}
          </div>
        </div>
      </div>

      {state?.success && (
        <p className="text-green-600 font-body text-[13px]">✓ Paramètres enregistrés avec succès</p>
      )}
      {state?.errors?.form && (
        <p className="text-red-500 font-body text-[13px] bg-red-50 border border-red-200 rounded-lg px-4 py-3">{state.errors.form}</p>
      )}

      <div className="flex justify-end">
        <button type="submit" disabled={pending}
          className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-6 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
          {pending ? "Enregistrement…" : "Enregistrer les paramètres"}
        </button>
      </div>
    </form>
  );
}
