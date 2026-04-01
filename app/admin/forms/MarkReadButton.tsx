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
        <button type="submit"
          className="font-body text-red-400 hover:text-red-600 text-[13px] transition-colors">
          Supprimer
        </button>
      </form>
    </div>
  );
}
