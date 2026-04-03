"use client";

import { useState } from "react";
import { deleteUser } from "@/app/actions/users";
import EditUserModal from "./EditUserModal";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

const BinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function UserList({
  users,
  currentUserId,
  isSuperAdmin,
}: {
  users: User[];
  currentUserId: string | undefined;
  isSuperAdmin: boolean;
}) {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (users.length === 0) {
    return <p className="font-body text-[#746e6b] text-[14px] text-center py-12">Aucun utilisateur.</p>;
  }

  return (
    <>
      {editingUser && (
        <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} />
      )}
      {/* Header */}
      <div className="flex items-center pl-2 pr-3 lg:px-5 py-2 bg-[#fbf8ef] border-b border-[#dad5cd]">
        <span className="flex-1 font-heading text-[#251d1b] text-[13px]">Nom</span>
        <span className="hidden sm:block w-48 font-heading text-[#251d1b] text-[13px]">Email</span>
        <span className="w-24 font-heading text-[#251d1b] text-[13px]">Rôle</span>
        <span className="w-20" />
      </div>
      {users.map((u) => (
        <div
          key={u.id}
          className="flex items-center gap-3 pl-2 pr-3 lg:px-5 py-2.5 hover:bg-[#fbf8ef]/50 transition-colors border-b border-[#dad5cd] last:border-b-0"
        >
          {/* Avatar + name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#44312b] flex items-center justify-center shrink-0">
              <span className="text-white font-heading text-[12px] font-bold">
                {u.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-heading text-[#251d1b] text-[14px] font-bold truncate">{u.name}</p>
              <p className="font-body text-[#746e6b] text-[12px] truncate sm:hidden">{u.email}</p>
            </div>
          </div>
          {/* Email - desktop */}
          <span className="hidden sm:block w-48 font-body text-[#746e6b] text-[13px] truncate">{u.email}</span>
          {/* Role */}
          <div className="w-24 shrink-0">
            {u.role === "SUPER_ADMIN" ? (
              <span className="inline-flex items-center gap-1 font-body text-[11px] text-[#44312b] bg-[#f5efe9] px-2 py-0.5 rounded-full">
                Super Admin
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-body text-[11px] text-[#746e6b] bg-[#f5f3ee] px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </div>
          {/* Actions */}
          <div className="w-20 flex items-center justify-end gap-1 shrink-0">
            {isSuperAdmin && (
              <button
                onClick={() => setEditingUser(u)}
                aria-label="Modifier"
                className="text-[#44312b] hover:text-[#5a3f37] transition-colors p-1.5 rounded-lg hover:bg-[#f5f1e8]"
              >
                <PencilIcon />
              </button>
            )}
            {isSuperAdmin && u.id !== currentUserId && (
              <form action={() => deleteUser(u.id)}
                onSubmit={(e) => { if (!confirm(`Supprimer l'utilisateur "${u.name}" ?`)) e.preventDefault(); }}>
                <button type="submit" aria-label="Supprimer"
                  className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                  <BinIcon />
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
