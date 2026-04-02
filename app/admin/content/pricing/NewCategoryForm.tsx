"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCategory } from "@/app/actions/pricing";

export default function NewCategoryForm() {
  const [state, action, pending] = useActionState(createCategory, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state?.success) formRef.current?.reset(); }, [state?.success]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[#251d1b] text-[13px] font-medium">Titre *</label>
        <input name="title" required placeholder="Ex: Soins visage Phyt's"
          className="input-admin" />
        {state?.errors?.title && <p className="text-red-500 text-[12px]">{state.errors.title[0]}</p>}
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={pending}
          className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-5 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
          {pending ? "Ajout…" : "Ajouter la catégorie"}
        </button>
      </div>
      {state?.success && (
        <p className="text-green-600 font-body text-[13px]">✓ Catégorie ajoutée avec succès</p>
      )}
    </form>
  );
}
