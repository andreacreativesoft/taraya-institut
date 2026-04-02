"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const imgLogo  = "/images/logo.svg";
const imgPhone = "/images/icon-phone.svg";

const DEFAULT_TITLE    = "Un institut de beauté dédié à votre bien-être";
const DEFAULT_SUBTITLE = `"Là où l'on se pose, où l'on se dépose et où l'on ressort plus légère."\nTaraya Institut est un cocon réservé aux femmes, pensé pour celles qui ont besoin de souffler. Des soins réalisés avec soin et attention, qui prennent le temps que vous méritez.`;

export default function HeroSection({ whatsapp, title, subtitle }: { whatsapp: string; title?: string; subtitle?: string }) {
  const heroTitle    = title    || DEFAULT_TITLE;
  const heroSubtitle = subtitle || DEFAULT_SUBTITLE;
  const WHATSAPP_URL = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <section className="relative w-full min-h-[95svh] lg:min-h-[90vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Mobile image (< lg) */}
          <Image src="/images/institut-beaute-sterrebeek-estheticienne-mobile.webp"
            alt="Femme recevant un soin du visage — institut de beauté Taraya à Sterrebeek"
            fill fetchPriority="high" loading="eager"
            className="object-cover object-center lg:hidden"
            sizes="100vw" />
          {/* Desktop image (>= lg) */}
          <Image src="/images/institut-beaute-zaventem-soin-visage-desktop.jpg"
            alt="Femme recevant un massage du visage dans un cadre chaleureux avec bougies — institut de beauté Taraya à Zaventem"
            fill fetchPriority="high" loading="eager"
            className="object-cover object-center hidden lg:block"
            sizes="100vw" />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 w-full flex justify-center py-6 px-4 lg:px-6">
          <div className="w-full max-w-[1280px] flex items-center justify-between gap-4 lg:gap-8">
            {/* Desktop nav links */}
            <div className="hidden lg:flex flex-1 gap-8 items-center">
              {["À propos", "Services", "Tarifs"].map((link) => (
                <a key={link}
                  href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-")}`}
                  className="font-body text-white text-[18px] leading-[1.4] whitespace-nowrap hover:opacity-80 transition-opacity">
                  {link}
                </a>
              ))}
            </div>
            {/* Logo */}
            <Link href="/" aria-label="Taraya Institut — Accueil">
              <img src={imgLogo} alt="Taraya Institut — logo institut de beauté et bien-être" className="w-[190px] lg:w-[337px] h-[25px] lg:h-[44px] object-contain shrink-0" />
            </Link>
            {/* Desktop: WhatsApp | Mobile: hamburger */}
            <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 border border-[#fbf8ef] rounded-[64px] px-5 py-2.5 hover:bg-white/10 transition-colors">
                <img src={imgPhone} alt="" className="w-[14px] h-[14px] object-contain shrink-0" />
                <span className="font-heading font-bold text-[#fbf8ef] text-[16px] leading-[1.3] whitespace-nowrap">WhatsApp</span>
              </a>
              <button className="lg:hidden text-white p-1 cursor-pointer" aria-label="Ouvrir le menu"
                onClick={() => setMenuOpen(true)}>
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                  <rect width="18" height="2" rx="1" fill="white"/>
                  <rect y="6" width="18" height="2" rx="1" fill="white"/>
                  <rect y="12" width="18" height="2" rx="1" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 lg:px-6 pb-8 lg:pb-10 gap-1 lg:gap-0">
          <div className="flex flex-col gap-6 lg:gap-8 items-center text-center text-white w-full">
            <div className="flex flex-col gap-6 items-center">
              <h1 className="font-heading font-bold text-white text-[41px] lg:text-[63px] leading-none max-w-[980px]">
                {heroTitle}
              </h1>
              <p className="font-body text-white text-[16px] lg:text-[20px] leading-[1.4] max-w-[844px] whitespace-pre-line">
                {heroSubtitle}
              </p>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="bg-[#fbf8ef] text-[#44312b] font-heading font-bold text-[16px] leading-[1.3] px-5 py-2.5 rounded-[64px] whitespace-nowrap hover:bg-white transition-colors">
                Prendre rendez-vous
              </a>
              <p className="font-body text-[#fbf8ef] text-[14px] lg:text-[16px] leading-[1.5] tracking-[0.14px] lg:tracking-[0.16px]">
                Uniquement sur rendez-vous
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
