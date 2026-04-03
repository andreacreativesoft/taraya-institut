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

export default function GeneralSettingsForm({ settings }: { settings: Settings }) {
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

      {/* ── IDENTITÉ ─────────────────────────────────────────── */}
      <div className={cardCls}>
        <SectionLabel>Identité du site</SectionLabel>
        <div className={fieldCls}>
          <label className={labelCls}>Nom du site</label>
          <input name="site_name" defaultValue={get("site_name") || "Taraya Institut"} placeholder="Taraya Institut" className={inputCls} />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>URL du logo</label>
          <input name="logo_url" defaultValue={get("logo_url")} placeholder="https://..." className={inputCls} />
          <p className="font-body text-[#746e6b] text-[11px]">URL complète vers votre logo (https://...)</p>
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>URL du favicon</label>
          <input name="favicon_url" defaultValue={get("favicon_url")} placeholder="https://..." className={inputCls} />
          <p className="font-body text-[#746e6b] text-[11px]">URL complète vers votre favicon (https://...)</p>
        </div>
      </div>

      {/* ── CONTACT ──────────────────────────────────────────── */}
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

      {/* ── RÉSEAUX SOCIAUX ──────────────────────────────────── */}
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

      {/* ── SECTION HERO ─────────────────────────────────────── */}
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
