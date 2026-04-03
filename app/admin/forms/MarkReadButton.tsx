"use client";

import { markSubmissionRead, deleteSubmission } from "@/app/actions/forms";

export default function SubmissionActions({ id, read }: { id: string; read: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {!read && (
        <button
          onClick={() => markSubmissionRead(id)}
          className="font-body text-[#44312b] hover:text-[#5a3f37] text-[13px] underline transition-colors">
          Marquer lu
        </button>
      )}
      <form action={() => deleteSubmission(id)}
        onSubmit={(e) => { if (!confirm("Supprimer ce message ?")) e.preventDefault(); }}>
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
  );
}
