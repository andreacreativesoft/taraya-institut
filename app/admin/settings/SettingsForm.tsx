"use client";

import { useActionState } from "react";
import { saveSettings } from "@/app/actions/settings";

type Settings = Record<string, string>;

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action, pending] = useActionState(saveSettings, undefined);

  const get = (key: string) => settings[key] ?? "";

  return (
    <form action={action} className="flex flex-col gap-8">
      {/* Contact */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-5">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold">Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Téléphone</label>
            <input name="phone" defaultValue={get("phone")} placeholder="+33 6 00 00 00 00"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">WhatsApp</label>
            <input name="whatsapp" defaultValue={get("whatsapp")} placeholder="+33600000000"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Email</label>
            <input name="email" type="email" defaultValue={get("email")} placeholder="contact@taraya-institut.fr"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Adresse</label>
            <input name="address" defaultValue={get("address")} placeholder="123 rue de la Paix, 75001 Paris"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-5">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold">Réseaux sociaux</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Instagram</label>
            <input name="instagram" defaultValue={get("instagram")} placeholder="https://instagram.com/taraya_institut"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Facebook</label>
            <input name="facebook" defaultValue={get("facebook")} placeholder="https://facebook.com/taraya.institut"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-5">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold">Section Hero</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Titre principal</label>
            <input name="hero_title" defaultValue={get("hero_title")} placeholder="Votre soin beauté sur mesure"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Sous-titre</label>
            <textarea name="hero_subtitle" defaultValue={get("hero_subtitle")} rows={2}
              placeholder="Institut de beauté certifié Phyt's à Paris"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 resize-none" />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-5">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold">SEO</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Titre meta</label>
            <input name="meta_title" defaultValue={get("meta_title")} placeholder="Taraya Institut – Soins beauté Paris"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Description meta</label>
            <textarea name="meta_description" defaultValue={get("meta_description")} rows={3}
              placeholder="Institut de beauté certifié Phyt's. Soins visage, massages, épilations…"
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 resize-none" />
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-5">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold">Analytics</h2>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Google Tag Manager ID</label>
          <input name="gtm_id" defaultValue={get("gtm_id")} placeholder="GTM-XXXXXXX"
            className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          <p className="font-body text-[#746e6b] text-[12px]">Laissez vide pour désactiver le tracking.</p>
          {state?.errors?.gtm_id && <p className="text-red-500 text-[12px]">{state.errors.gtm_id}</p>}
        </div>
      </div>

      {state?.success && (
        <p className="text-green-600 font-body text-[13px]">✓ Paramètres enregistrés avec succès</p>
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
