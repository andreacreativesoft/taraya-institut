"use client";

import { useState } from "react";
import { updateUser, generatePasswordResetLink } from "@/app/actions/users";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function EditUserModal({ user, onClose }: { user: User; onClose: () => void }) {
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [resetLink, setResetLink] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const result = await updateUser(user.id, fd);
    setSaving(false);
    if (result?.success) {
      onClose();
    } else if (result?.errors) {
      const normalized: Record<string, string[]> = {};
      for (const [k, v] of Object.entries(result.errors)) {
        if (v !== undefined) normalized[k] = v;
      }
      setErrors(normalized);
    }
  }

  async function handleGenerateLink() {
    setGeneratingLink(true);
    try {
      const link = await generatePasswordResetLink(user.id);
      setResetLink(link);
    } catch {
      setErrors({ _form: ["Impossible de générer le lien"] });
    } finally {
      setGeneratingLink(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-[#251d1b] text-[18px] font-bold">Modifier l&apos;utilisateur</h3>
          <button onClick={onClose} className="font-body text-[#746e6b] hover:text-[#251d1b] text-[22px] leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Nom *</label>
            <input name="name" required defaultValue={user.name} className="input-admin" />
            {errors.name && <p className="text-red-500 text-[12px]">{errors.name[0]}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Email *</label>
            <input name="email" type="email" required defaultValue={user.email} className="input-admin" />
            {errors.email && <p className="text-red-500 text-[12px]">{errors.email[0]}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Rôle *</label>
            <select name="role" defaultValue={user.role} className="input-admin">
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Nouveau mot de passe</label>
            <input name="password" type="password" placeholder="Laisser vide pour ne pas modifier (min. 8 caractères)" className="input-admin" />
            <p className="font-body text-[#746e6b] text-[11px]">Laissez vide pour conserver le mot de passe actuel.</p>
          </div>

          {errors._form && (
            <p className="text-red-500 font-body text-[13px] bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {errors._form[0]}
            </p>
          )}

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

        {/* Password reset link */}
        <div className="border-t border-[#f0ece4] pt-4">
          <button
            type="button"
            onClick={handleGenerateLink}
            disabled={generatingLink}
            className="font-body text-[#44312b] text-[13px] underline underline-offset-2 hover:text-[#5a3f37] disabled:opacity-50">
            {generatingLink ? "Génération…" : "Générer un lien de réinitialisation de mot de passe"}
          </button>
          {resetLink && (
            <div className="mt-3 bg-[#fbf8ef] border border-[#dad5cd] rounded-lg p-3">
              <p className="font-body text-[#746e6b] text-[11px] mb-1">Lien valide 24h — copiez et partagez avec l&apos;utilisateur :</p>
              <p className="font-body text-[#251d1b] text-[12px] break-all select-all">{resetLink}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
