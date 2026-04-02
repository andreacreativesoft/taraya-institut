"use client";

import { useActionState } from "react";
import { createUser } from "@/app/actions/users";

export default function NewUserForm() {
  const [state, action, pending] = useActionState(createUser, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Nom *</label>
          <input name="name" required placeholder="Marie Dupont"
            className="input-admin" />
          {state?.errors?.name && <p className="text-red-500 text-[12px]">{state.errors.name[0]}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Email *</label>
          <input name="email" type="email" required placeholder="marie@taraya-institut.fr"
            className="input-admin" />
          {state?.errors?.email && <p className="text-red-500 text-[12px]">{state.errors.email[0]}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Mot de passe *</label>
          <input name="password" type="password" required placeholder="Min. 8 caractères"
            className="input-admin" />
          {state?.errors?.password && <p className="text-red-500 text-[12px]">{state.errors.password[0]}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Rôle *</label>
          <select name="role" defaultValue="ADMIN"
            className="input-admin bg-white">
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>
      </div>
      {state?.success && (
        <p className="text-green-600 font-body text-[13px]">✓ Utilisateur créé avec succès</p>
      )}
      <div className="flex justify-end">
        <button type="submit" disabled={pending}
          className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-5 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
          {pending ? "Création…" : "Créer l'utilisateur"}
        </button>
      </div>
    </form>
  );
}
