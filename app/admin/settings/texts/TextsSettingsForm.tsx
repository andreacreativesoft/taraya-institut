"use client";

import { useState } from "react";
import { SiteSettings } from "@/lib/settings";

export default function TextsSettingsForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({
    pedicure_title:       settings.pedicure_title,
    pedicure_subtitle:    settings.pedicure_subtitle,
    services_title:       settings.services_title,
    services_subtitle:    settings.services_subtitle,
    promo_label:          settings.promo_label,
    promo_title:          settings.promo_title,
    promo_body:           settings.promo_body,
    pricing_title:        settings.pricing_title,
    pricing_subtitle:     settings.pricing_subtitle,
    pricing_payment_note: settings.pricing_payment_note,
    cta_title:            settings.cta_title,
    cta_body:             settings.cta_body,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const save = async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? "saved" : "error");
    } catch { setStatus("error"); }
    setTimeout(() => setStatus("idle"), 3000);
  };

  const inputCls = "w-full border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:ring-2 focus:ring-[#cab3a0]";
  const textareaCls = `${inputCls} resize-y min-h-[80px]`;
  const labelCls = "font-body text-[#251d1b] text-[13px] font-medium";

  const Field = ({ label, id, k, textarea }: { label: string; id: string; k: keyof typeof form; textarea?: boolean }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelCls}>{label}</label>
      {textarea
        ? <textarea id={id} className={textareaCls} value={form[k]} onChange={set(k)} />
        : <input id={id} type="text" className={inputCls} value={form[k]} onChange={set(k)} />}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Pédicure */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-4">
        <p className="font-heading text-[#251d1b] text-[16px] font-bold">Section Pédicure</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Field label="Titre (H2)" id="pedicure_title" k="pedicure_title" />
          <div className="lg:col-span-1">
            <Field label="Sous-titre" id="pedicure_subtitle" k="pedicure_subtitle" textarea />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-4">
        <p className="font-heading text-[#251d1b] text-[16px] font-bold">Section Services</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Field label="Titre (H2)" id="services_title" k="services_title" />
          <div className="lg:col-span-1">
            <Field label="Sous-titre" id="services_subtitle" k="services_subtitle" textarea />
          </div>
        </div>
      </div>

      {/* Promo */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-4">
        <p className="font-heading text-[#251d1b] text-[16px] font-bold">Section Promo</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Field label="Label (ex: Promo)" id="promo_label" k="promo_label" />
          <Field label="Titre (H2)" id="promo_title" k="promo_title" />
          <div className="lg:col-span-2">
            <Field label="Corps du texte" id="promo_body" k="promo_body" textarea />
          </div>
        </div>
      </div>

      {/* Tarifs */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-4">
        <p className="font-heading text-[#251d1b] text-[16px] font-bold">Section Tarifs</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Field label="Titre (H2)" id="pricing_title" k="pricing_title" />
          <Field label="Note de paiement" id="pricing_payment_note" k="pricing_payment_note" />
          <div className="lg:col-span-2">
            <Field label="Sous-titre" id="pricing_subtitle" k="pricing_subtitle" textarea />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-4">
        <p className="font-heading text-[#251d1b] text-[16px] font-bold">Section Contact (CTA)</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Field label="Titre (H2)" id="cta_title" k="cta_title" />
          <div className="lg:col-span-1">
            <Field label="Corps du texte" id="cta_body" k="cta_body" textarea />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={save} disabled={status === "saving"}
          className="bg-[#44312b] text-white font-heading font-bold text-[14px] px-6 py-2.5 rounded-lg hover:bg-[#5a3f37] disabled:opacity-60 transition-colors">
          {status === "saving" ? "Enregistrement…" : "Enregistrer"}
        </button>
        {status === "saved" && <span className="font-body text-[13px] text-green-600">Enregistré ✓</span>}
        {status === "error"  && <span className="font-body text-[13px] text-red-600">Erreur lors de l&apos;enregistrement</span>}
      </div>
    </div>
  );
}
