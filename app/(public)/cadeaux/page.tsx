import Link from "next/link";
import { getSettings } from "@/lib/settings";
import Footer from "@/components/public/Footer";

const imgLogo    = "/images/logo.svg";
const imgPhone   = "/images/icon-phone.svg";
const imgOrnament = "/images/cadeaux-lotus-ornament.svg";

export const metadata = {
  title: "Bons cadeaux – Taraya Institut",
  description: "Offrez un moment de bien-être avec les bons cadeaux Taraya Institut.",
};

export default async function CadeauxPage() {
  const settings = await getSettings();
  const WHATSAPP_URL = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`;

  return (
    <>
      {/* Navbar */}
      <header className="w-full bg-[#44312b]">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-5 flex items-center justify-between gap-4">
          <div className="hidden lg:flex flex-1 gap-8 items-center">
            {[
              { label: "À propos", href: "/#a-propos" },
              { label: "Services", href: "/#services" },
              { label: "Tarifs",   href: "/#tarifs"   },
              { label: "Cadeaux",  href: "/cadeaux"   },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                className="font-body text-white text-[18px] leading-[1.4] whitespace-nowrap hover:opacity-80 transition-opacity">
                {label}
              </Link>
            ))}
          </div>
          <Link href="/" aria-label="Taraya Institut — Accueil">
            <img src={imgLogo} alt="Taraya Institut" className="w-[190px] lg:w-[337px] h-[25px] lg:h-[44px] object-contain shrink-0" />
          </Link>
          <div className="hidden lg:flex flex-1 justify-end">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#fbf8ef] rounded-[64px] px-5 py-2.5 hover:bg-white/10 transition-colors">
              <img src={imgPhone} alt="" className="w-[14px] h-[14px] object-contain shrink-0" />
              <span className="font-heading font-bold text-[#fbf8ef] text-[16px] leading-[1.3] whitespace-nowrap">WhatsApp</span>
            </a>
          </div>
          <Link href="/" className="lg:hidden text-white font-body text-[14px] hover:opacity-80">
            ← Accueil
          </Link>
        </div>
      </header>

      {/* Gift card section */}
      <main className="bg-[#fbf8ef] pt-[88px] pb-[64px]">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6">

          {/* Desktop: 2 cols | Mobile: stacked */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-stretch">

            {/* Left — brown card wrapper (relative for ornament bleed) */}
            <div className="w-full lg:w-[608px] lg:flex-shrink-0 relative">
              {/* Card: overflow-hidden keeps rounded corners intact */}
              <div className="w-full bg-[#91622d] rounded-lg overflow-hidden flex flex-col items-center justify-start pt-[56px] pb-0 min-h-[400px] lg:min-h-[561px]">
                {/* Title */}
                <h1 className="font-heading font-bold text-white text-[34px] lg:text-[48px] leading-[1.2] text-center px-8 z-10 relative">
                  Bon cadeau<br />Fêtes des mères
                </h1>
                {/* Subtitle */}
                <p className="font-body text-[#fbf8ef] text-[16px] lg:text-[20px] leading-[1.3] text-center px-8 mt-4 z-10 relative">
                  Pensez au bon cadeau chez Taraya Institut
                </p>
              </div>
              {/* Lotus ornament — positioned on wrapper so it bleeds below card */}
              <div
                className="absolute pointer-events-none select-none"
                style={{ top: "41.69%", left: "4.77%", right: "4.77%", bottom: "-18%" }}
              >
                <img
                  src={imgOrnament}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right — content */}
            <div className="flex-1 flex flex-col gap-8 justify-center min-w-0">
              <h2 className="font-heading font-bold text-[#251d1b] text-[34px] lg:text-[48px] leading-[1.2]">
                Offrez un moment de bien-être à celles qui vous sont chères.
              </h2>

              <div className="h-px bg-[#dad5cd] w-full" />

              <div className="flex flex-col gap-6">
                <p className="font-body text-[#746e6b] text-[18px] lg:text-[20px] leading-[1.3]">
                  Pour commander un bon cadeau ou en savoir plus, contactez-nous directement.
                </p>

                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-heading font-bold text-[#cb9559] text-[18px] leading-[1.2] hover:opacity-80 transition-opacity w-fit">
                  Nous contacter
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 1.5L6.5 5L2 8.5" stroke="#cb9559" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        instagram={settings.instagram}
        facebook={settings.facebook}
      />
    </>
  );
}
