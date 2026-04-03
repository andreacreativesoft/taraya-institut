"use client";

import { useActionState } from "react";
import { createFaq } from "@/app/actions/faq";

type FaqState = { errors?: Record<string, string[]>; success?: boolean } | undefined;

export default function NewFaqForm() {
  const [state, formAction, isPending] = useActionState<FaqState, FormData>(createFaq, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[#251d1b] text-[13px] font-medium">Question *</label>
        <input name="question" required placeholder="Quelle est votre question ?" className="input-admin" />
        {state?.errors?.question && (
          <p className="text-red-500 text-[12px]">{state.errors.question[0]}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[#251d1b] text-[13px] font-medium">Réponse *</label>
        <textarea name="answer" required rows={4} placeholder="Votre réponse…" className="input-admin resize-none" />
        {state?.errors?.answer && (
          <p className="text-red-500 text-[12px]">{state.errors.answer[0]}</p>
        )}
      </div>
      {state?.success && (
        <p className="text-green-600 font-body text-[13px]">✓ Question ajoutée avec succès</p>
      )}
      <div className="flex justify-end">
        <button type="submit" disabled={isPending}
          className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-6 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
          {isPending ? "Ajout en cours…" : "Ajouter la question"}
        </button>
      </div>
    </form>
  );
}
