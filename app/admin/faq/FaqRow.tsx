"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteFaq, toggleFaq, updateFaq } from "@/app/actions/faq";
import type { FaqItem } from "@prisma/client";

function EditModal({ faq, onClose }: { faq: FaqItem; onClose: () => void }) {
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    await updateFaq(faq.id, fd);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-[#251d1b] text-[18px] font-bold">Modifier la question</h3>
          <button onClick={onClose} className="font-body text-[#746e6b] hover:text-[#251d1b] text-[22px] leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Question *</label>
            <input name="question" required defaultValue={faq.question} className="input-admin" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Réponse *</label>
            <textarea name="answer" required rows={5} defaultValue={faq.answer} className="input-admin resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="font-body text-[#746e6b] text-[14px] px-4 py-2 rounded-full border border-[#dad5cd] hover:bg-[#fbf8ef] transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={saving}
              className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-5 py-2 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function FaqRow({ faq }: { faq: FaqItem }) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: faq.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <>
      {editing && <EditModal faq={faq} onClose={() => setEditing(false)} />}
      <div ref={setNodeRef} style={style} className="border-b border-[#dad5cd] last:border-b-0">
        <div className="flex items-center gap-3 pl-2 pr-3 lg:px-5 py-2.5 hover:bg-[#fbf8ef]/50 transition-colors">
          {/* Drag handle */}
          <span {...attributes} {...listeners}
            className="cursor-grab active:cursor-grabbing text-[#cab3a0] hover:text-[#746e6b] text-[18px] select-none leading-none shrink-0 w-5 text-center">
            ⠿
          </span>
          {/* Question text */}
          <div className="flex-1 min-w-0">
            <p className="font-heading text-[#251d1b] text-[14px] font-bold truncate">{faq.question}</p>
          </div>
          {/* Toggle active */}
          <button
            onClick={() => toggleFaq(faq.id, !faq.active)}
            className={`inline-flex items-center justify-center w-11 h-6 rounded-full transition-colors shrink-0 ${faq.active ? "bg-[#44312b]" : "bg-[#dad5cd]"}`}
            aria-label={faq.active ? "Désactiver" : "Activer"}
          >
            <span className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${faq.active ? "translate-x-2.5" : "-translate-x-2.5"}`} />
          </button>
          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Expand/collapse answer */}
            <button
              onClick={() => setExpanded(v => !v)}
              aria-label={expanded ? "Masquer la réponse" : "Voir la réponse"}
              className="text-[#746e6b] hover:text-[#251d1b] transition-colors p-1.5 rounded-lg hover:bg-[#f5f1e8]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                className={`transition-transform ${expanded ? "rotate-90" : "rotate-0"}`}>
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={() => setEditing(true)} aria-label="Modifier"
              className="text-[#44312b] hover:text-[#5a3f37] transition-colors p-1.5 rounded-lg hover:bg-[#f5f1e8]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <form action={() => deleteFaq(faq.id)}
              onSubmit={(e) => { if (!confirm("Supprimer cette question ?")) e.preventDefault(); }}>
              <button type="submit" aria-label="Supprimer"
                className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
        {/* Answer expansion */}
        {expanded && (
          <div className="px-5 pb-4 pt-1 ml-8">
            <p className="font-body text-[#746e6b] text-[13px] leading-relaxed whitespace-pre-wrap">{faq.answer}</p>
          </div>
        )}
      </div>
    </>
  );
}
