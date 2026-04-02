"use client";

import Link from "next/link";

const imgLogo  = "/images/logo.svg";
const imgPhone = "/images/icon-phone.svg";

const WHATSAPP_URL = "https://wa.me/0471824764";

const links = [
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "#services" },
  { label: "Tarifs",   href: "#tarifs" },
];

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#44312b] flex flex-col lg:hidden">
      {/* Navbar row */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-[#746e6b]">
        <Link href="/" onClick={onClose} aria-label="Taraya Institut — Accueil">
          <img src={imgLogo} alt="Taraya Institut" className="w-[190px] h-[25px] object-contain" />
        </Link>
        <button onClick={onClose} aria-label="Fermer le menu" className="text-white p-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M1 1L19 19M19 1L1 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Links + CTA */}
      <div className="flex flex-col px-4 pt-[80px]">
        <nav className="flex flex-col gap-8">
          {links.map(({ label, href }) => (
            <a key={label} href={href} onClick={onClose}
              className="font-body text-white text-[18px] leading-[1.5] hover:opacity-80 transition-opacity">
              {label}
            </a>
          ))}
        </nav>

        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="mt-[72px] inline-flex items-center gap-2 border border-[#fbf8ef] rounded-[64px] px-5 py-2.5 w-fit hover:bg-white/10 transition-colors">
          <img src={imgPhone} alt="" className="w-[14px] h-[14px] object-contain shrink-0" />
          <span className="font-heading font-bold text-[#fbf8ef] text-[16px] leading-[1.3] whitespace-nowrap">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
