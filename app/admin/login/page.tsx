"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

const imgLogo = "/images/footer-logo.svg";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen bg-[#fbf8ef] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] flex flex-col gap-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={imgLogo} alt="Taraya Institut" className="h-[60px] w-auto object-contain" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#dad5cd] p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-[#251d1b] text-[24px] font-bold leading-[1.2]">
              Connexion
            </h1>
            <p className="font-body text-[#746e6b] text-[14px] leading-[1.5]">
              Accédez au panneau d&rsquo;administration
            </p>
          </div>

          {state?.errors?._form && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-red-600 text-[14px] font-body">{state.errors._form[0]}</p>
            </div>
          )}

          <form action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-body text-[#251d1b] text-[14px] font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@taraya.be"
                className="w-full border border-[#dad5cd] rounded-lg px-4 py-2.5 font-body text-[14px] text-[#251d1b] bg-white focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 transition-colors"
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-[12px] font-body">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="font-body text-[#251d1b] text-[14px] font-medium">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full border border-[#dad5cd] rounded-lg px-4 py-2.5 font-body text-[14px] text-[#251d1b] bg-white focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 transition-colors"
              />
              {state?.errors?.password && (
                <p className="text-red-500 text-[12px] font-body">{state.errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[16px] leading-[1.3] py-3 rounded-[64px] hover:bg-[#5a3f37] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {pending ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-[#746e6b] text-[12px]">
          Taraya Institut © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
