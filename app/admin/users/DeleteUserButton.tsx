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
      className="font-body text-red-400 hover:text-red-600 text-[13px] transition-colors"
    >
      Supprimer
    </button>
  );
}
