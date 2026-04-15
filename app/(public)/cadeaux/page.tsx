import Link from "next/link";
import { getSettings } from "@/lib/settings";
import Footer from "@/components/public/Footer";

const imgLogo  = "/images/logo.svg";
const imgPhone = "/images/icon-phone.svg";

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
              { label: "À propos",  href: "/#a-propos"  },
              { label: "Services",  href: "/#services"  },
              { label: "Tarifs",    href: "/#tarifs"    },
              { label: "Cadeaux",   href: "/cadeaux"    },
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
          {/* Mobile back link */}
          <Link href="/" className="lg:hidden text-white font-body text-[14px] hover:opacity-80">
            ← Accueil
          </Link>
        </div>
      </header>

      <main className="bg-[#fbf8ef] py-12 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col items-center gap-10 lg:gap-14">

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="font-heading text-[#251d1b] text-[34px] lg:text-[48px] font-bold leading-[1.2]">Bons cadeaux</h1>
            <p className="font-body text-[#746e6b] text-[16px] lg:text-[20px] leading-[1.5] max-w-[600px]">
              Offrez un moment de bien-être à celles qui vous sont chères.
            </p>
          </div>

          {/* Promo image */}
          <div className="rounded-xl overflow-hidden shadow-md w-full max-w-[420px]">
            <img
              src="/images/promo-mothers-day.jpg"
              alt="Bon cadeau Fête des Mères – Taraya Institut"
              className="w-full h-auto"
            />
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-body text-[#746e6b] text-[15px] text-center">
              Pour commander un bon cadeau ou en savoir plus, contactez-nous directement.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[16px] leading-[1.3] px-8 py-3 rounded-[64px] whitespace-nowrap hover:bg-[#5a3f37] transition-colors">
              Nous contacter
            </a>
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
