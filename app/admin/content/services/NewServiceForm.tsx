"use client";

import { useActionState } from "react";
import { createService } from "@/app/actions/services";

export default function NewServiceForm() {
  const [state, action, pending] = useActionState(createService, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Titre *</label>
          <input name="title" required placeholder="Ex: Soins visage Phyt's"
            className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          {state?.errors?.title && <p className="text-red-500 text-[12px]">{state.errors.title[0]}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Image (chemin)</label>
          <input name="image" placeholder="Ex: /images/service-soins-visage.jpg"
            className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[#251d1b] text-[13px] font-medium">Description *</label>
        <textarea name="description" required rows={3} placeholder="Description du service…"
          className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 resize-none" />
        {state?.errors?.description && <p className="text-red-500 text-[12px]">{state.errors.description[0]}</p>}
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-1.5 w-[100px]">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Ordre</label>
          <input name="order" type="number" defaultValue={0}
            className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0]" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer mt-5">
          <input name="active" type="checkbox" defaultChecked className="w-4 h-4 accent-[#44312b]" />
          <span className="font-body text-[#251d1b] text-[14px]">Actif</span>
        </label>
      </div>
      {state?.success && (
        <p className="text-green-600 font-body text-[13px]">✓ Service ajouté avec succès</p>
      )}
      <div className="flex justify-end">
        <button type="submit" disabled={pending}
          className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-5 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
          {pending ? "Ajout…" : "Ajouter le service"}
        </button>
      </div>
    </form>
  );
}
