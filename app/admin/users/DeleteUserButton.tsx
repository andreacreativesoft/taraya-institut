"use client";

import { deleteUser } from "@/app/actions/users";

export default function DeleteUserButton({ userId, userName }: { userId: string; userName: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (confirm(`Supprimer ${userName} ?`)) {
          await deleteUser(userId);
        }
      }}
      className="text-red-400 hover:text-red-600 transition-colors"
      aria-label={`Supprimer ${userName}`}
    >
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}
