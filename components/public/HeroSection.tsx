"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const imgLogo  = "/images/logo.svg";
const imgPhone = "/images/icon-phone.svg";

export default function HeroSection({ whatsapp }: { whatsapp: string }) {
  const WHATSAPP_URL = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <section className="relative w-full min-h-[85svh] lg:min-h-[70vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image src="/images/hero-bg.webp"
            alt="Femme recevant un massage du visage dans un cadre chaleureux avec bougies — institut de beauté Taraya"
            fill fetchPriority="high" loading="eager" className="object-cover object-center" sizes="100vw" />
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
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <rect width="16" height="2" rx="1" fill="white"/>
                  <rect y="5" width="16" height="2" rx="1" fill="white"/>
                  <rect y="10" width="16" height="2" rx="1" fill="white"/>
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
                {`Un institut de beauté dédié `}<br />à votre bien-être
              </h1>
              <p className="font-body text-white text-[16px] lg:text-[20px] leading-[1.4] max-w-[844px]">
                {`"Là où l'on se pose, où l'on se dépose et où l'on ressort plus légère."`}<br />
                Taraya Institut est un cocon réservé aux femmes, pensé pour celles qui ont besoin de souffler. Des soins réalisés avec soin et attention, qui prennent le temps que vous méritez.
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
