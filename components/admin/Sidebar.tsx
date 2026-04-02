"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { logout } from "@/app/actions/auth";


type NavItem = {
  href: string;
  label: string;
  icon: ({ className }: { className?: string }) => React.JSX.Element;
  indent?: boolean;
};

const baseNavItems: NavItem[] = [
  { href: "/admin",                   label: "Tableau de bord",  icon: DashboardIcon },
  { href: "/admin/content/services",  label: "Services",         icon: ServicesIcon },
  { href: "/admin/content/pricing",   label: "Tarifs",           icon: PricingIcon },
  { href: "/admin/forms",             label: "Formulaires",      icon: FormsIcon },
  { href: "/admin/users",             label: "Utilisateurs",     icon: UsersIcon },
  { href: "/admin/settings",          label: "Paramètres",       icon: SettingsIcon },
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
  const [expanded, setExpanded] = useState(false);

  // On desktop, start expanded
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setExpanded(mql.matches);
    function handler(e: MediaQueryListEvent) { setExpanded(e.matches); }
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative shrink-0">
      {/* Arrow toggle — sits on the right edge of the sidebar */}
      <button
        type="button"
        onClick={() => setExpanded((v: boolean) => !v)}
        title={expanded ? "Réduire" : "Agrandir"}
        className="absolute top-5 -right-3 z-10 w-6 h-6 rounded-full bg-[#44312b] border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#5a4039] transition-colors shadow-md"
      >
        <ArrowIcon className={`w-3 h-3 transition-transform duration-200 ${expanded ? "" : "rotate-180"}`} />
      </button>

      <aside
        className={`bg-[#44312b] flex flex-col min-h-screen transition-all duration-200 ease-in-out ${
          expanded ? "w-[220px]" : "w-[60px]"
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center border-b border-white/10 h-[64px] ${expanded ? "px-5" : "justify-center"}`}>
          <img src="/icon.svg" alt="Taraya Institut" className="w-8 h-8 rounded-lg object-contain shrink-0" />
        </div>

      {/* User avatar */}
      <div className={`flex items-center border-b border-white/10 py-4 ${expanded ? "px-5 gap-3" : "justify-center"}`}>
        <div className="w-9 h-9 rounded-full bg-[#cab3a0] flex items-center justify-center text-[#44312b] font-bold text-[14px] shrink-0">
          {userName.charAt(0).toUpperCase()}
        </div>
        {expanded && (
          <div className="min-w-0">
            <p className="text-white text-[13px] font-medium truncate">{userName}</p>
            <p className="text-white/50 text-[11px] truncate">
              {userRole === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={expanded ? undefined : label}
              className={`group relative flex items-center rounded-lg transition-colors ${
                expanded ? "gap-3 px-3 py-2.5 text-[14px] font-body" : "justify-center py-3"
              } ${
                active
                  ? "bg-[#cab3a0]/20 text-white font-medium"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-[22px] h-[22px] shrink-0" />
              {expanded && <span className="truncate">{label}</span>}
              {!expanded && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-[#251d1b] text-white text-[12px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {label}
                </span>
              )}
            </Link>
          );
        })}

        {/* Logout — inline with nav icons */}
        <form action={logout}>
          <button
            type="submit"
            title={expanded ? undefined : "Déconnexion"}
            className={`group relative w-full flex items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors ${
              expanded ? "gap-3 px-3 py-2.5 text-[14px] font-body" : "justify-center py-3"
            }`}
          >
            <LogoutIcon className="w-[22px] h-[22px] shrink-0" />
            {expanded && <span>Déconnexion</span>}
            {!expanded && (
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-[#251d1b] text-white text-[12px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                Déconnexion
              </span>
            )}
          </button>
        </form>
      </nav>

      </aside>
    </div>
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
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
