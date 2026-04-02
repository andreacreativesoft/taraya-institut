"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { logout } from "@/app/actions/auth";

const imgLogo = "/images/logo.svg";

type NavItem = { href: string; label: string; icon: ({ className }: { className?: string }) => React.JSX.Element; indent?: boolean };

const baseNavItems: NavItem[] = [
  { href: "/admin",                   label: "Tableau de bord",  icon: DashboardIcon },
  { href: "/admin/content",           label: "Contenu",          icon: ContentIcon },
  { href: "/admin/content/services",  label: "Services",         icon: ServicesIcon, indent: true },
  { href: "/admin/content/pricing",   label: "Tarifs",           icon: PricingIcon,  indent: true },
  { href: "/admin/forms",             label: "Formulaires",      icon: FormsIcon },
  { href: "/admin/settings",          label: "Paramètres",       icon: SettingsIcon },
  { href: "/admin/users",             label: "Utilisateurs",     icon: UsersIcon },
  { href: "/admin/audit",             label: "Journal d'audit",  icon: AuditIcon },
];

const superAdminItems: NavItem[] = [
  { href: "/admin/ai", label: "Assistant Claude", icon: AIIcon },
];

export default function Sidebar({ userName, userRole }: { userName: string; userRole: string }) {
  const navItems = userRole === "SUPER_ADMIN"
    ? [...baseNavItems, ...superAdminItems]
    : baseNavItems;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden bg-[#44312b] text-white p-2 rounded-lg shadow-lg"
        aria-label="Ouvrir le menu"
      >
        <HamburgerIcon className="w-5 h-5" />
      </button>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[240px] bg-[#44312b] flex flex-col transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0 lg:shrink-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo + close button */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <img src={imgLogo} alt="Taraya Institut" className="h-[28px] object-contain object-left" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/70 hover:text-white p-1 -mr-2"
            aria-label="Fermer le menu"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, indent }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-body transition-colors ${
                  indent ? "ml-4" : ""
                } ${
                  active
                    ? "bg-[#cab3a0]/20 text-white font-medium"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-[#cab3a0] flex items-center justify-center text-[#44312b] font-bold text-[14px] shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-[13px] font-medium truncate">{userName}</p>
              <p className="text-white/50 text-[11px] truncate">{userRole === "SUPER_ADMIN" ? "Super Admin" : "Admin"}</p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-[13px] font-body transition-colors"
            >
              <LogoutIcon className="w-4 h-4" />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────
function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function ContentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" d="M4 6h16M4 10h16M4 14h10" />
    </svg>
  );
}
function ServicesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}
function PricingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
function FormsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function AIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  );
}
function AuditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
    </svg>
  );
}
function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}
function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
