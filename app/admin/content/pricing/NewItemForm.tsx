"use client";

import { useActionState, useEffect, useRef } from "react";
import { createItem } from "@/app/actions/pricing";

export default function NewItemForm({ categoryId }: { categoryId: string }) {
  const [state, action, pending] = useActionState(createItem, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state?.success) formRef.current?.reset(); }, [state?.success]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3 pt-3 border-t border-[#dad5cd]">
      <input type="hidden" name="categoryId" value={categoryId} />
      <input type="hidden" name="order" value={0} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 flex flex-col gap-1">
          <input name="label" required placeholder="Ex: Soin hydratant 45min"
            className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[13px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          {state?.errors?.label && <p className="text-red-500 text-[11px]">{state.errors.label[0]}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <input name="price" required placeholder="Ex: 65€"
            className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[13px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          {state?.errors?.price && <p className="text-red-500 text-[11px]">{state.errors.price[0]}</p>}
        </div>
      </div>
      <div className="flex items-center justify-between">
        {state?.success && <p className="text-green-600 font-body text-[12px]">✓ Prestation ajoutée</p>}
        {!state?.success && <span />}
        <button type="submit" disabled={pending}
          className="text-[#44312b] border border-[#44312b] font-body text-[12px] font-medium px-4 py-1.5 rounded-full hover:bg-[#44312b] hover:text-white transition-colors disabled:opacity-60">
          {pending ? "Ajout…" : "+ Ajouter la prestation"}
        </button>
      </div>
    </form>
  );
}
