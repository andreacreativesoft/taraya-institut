import Link from "next/link";
import Image from "next/image";
import { getSettings } from "@/lib/settings";
import Footer from "@/components/public/Footer";

const imgLogo    = "/images/logo.svg";
const imgPhone   = "/images/icon-phone.svg";
const imgHero    = "/images/pedicure-medicale-soins-pieds-zaventem.webp";
const imgBain    = "/images/bain-pieds-pedicure-esthetique-sterrebeek.webp";

export const metadata = {
  title: "Pédicure médicale à Zaventem – Taraya Institut",
  description: "Callosités, ongles incarnés, talons secs : la pédicure médicale traite ce que vous avez appris à ignorer. Institut Taraya à Sterrebeek, près de Zaventem.",
};

const conditions = [
  {
    title: "Callosités et durillons",
    desc: "Peau épaissie, talons durs, zones de frottement. Elles se travaillent au scalpel et à la râpe pour retrouver une peau toute douce.",
  },
  {
    title: "Crevasses",
    desc: "Talons secs et fissurés, souvent inconfortables ou douloureux.",
  },
  {
    title: "Ongles incarnés",
    desc: "Un fragment d'ongle qui pénètre dans la peau, provoquant une douleur réelle et une inflammation.",
  },
  {
    title: "Petits durillons localisés",
    desc: "Sur les orteils, le dessous du pied, les zones d'appui.",
  },
];

const steps = [
  {
    n: "01",
    title: "Bain de pieds",
    desc: "Chaque séance commence par un bain de pieds avec sels de bain, pour ramollir la peau et préparer le travail.",
  },
  {
    n: "02",
    title: "Soin en profondeur",
    desc: "Traitement des callosités au scalpel et à la râpe, soin des ongles, traitement des zones spécifiques selon les besoins.",
  },
  {
    n: "03",
    title: "Massage & finition",
    desc: "La séance se termine par un massage et l'application de crème.",
  },
];

export default async function PedicureMedicalePage() {
  const settings = await getSettings();
  const WHATSAPP_URL = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`;

  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
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

      <main>

        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="relative min-h-[480px] lg:min-h-[560px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={imgHero}
              alt="Pédicure médicale — Taraya Institut Sterrebeek Zaventem"
              fill fetchPriority="high"
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#251d1b]/80 via-[#251d1b]/40 to-transparent" />
          </div>
          <div className="relative z-10 w-full mx-auto max-w-[1280px] px-4 lg:px-6 pb-12 lg:pb-16">
            <div className="max-w-[720px] flex flex-col gap-4">
              <h1 className="font-heading font-bold text-white text-[38px] lg:text-[56px] leading-[1.1]">
                Pédicure médicale<br />à Zaventem
              </h1>
              <p className="font-body text-[#fbf8ef] text-[18px] lg:text-[22px] leading-[1.4]">
                Des pieds soignés en profondeur
              </p>
              <p className="font-body text-[#e8e0d5] text-[16px] lg:text-[18px] leading-[1.6] max-w-[600px]">
                Beaucoup de femmes supportent des douleurs aux pieds depuis des mois sans jamais consulter. La pédicure médicale existe précisément pour traiter ce que vous avez appris à ignorer.
              </p>
              <div className="mt-2">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-[#fbf8ef] text-[#44312b] font-heading font-bold text-[16px] leading-[1.3] px-6 py-3 rounded-[64px] hover:bg-white transition-colors">
                  Prendre rendez-vous
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 : CE QUE ÇA TRAITE ──────────────────────── */}
        <section className="bg-[#fbf8ef] py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col gap-10 lg:gap-14">
            <div className="flex flex-col gap-4 max-w-[720px]">
              <h2 className="font-heading font-bold text-[#251d1b] text-[30px] lg:text-[42px] leading-[1.2]">
                Ce que la pédicure médicale traite
              </h2>
              <p className="font-body text-[#746e6b] text-[16px] lg:text-[18px] leading-[1.6]">
                La pédicure médicale s&apos;adresse aux pieds qui ont besoin de plus qu&apos;un soin esthétique classique. Voici les problèmes les plus fréquents traités à l&apos;institut.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {conditions.map((c) => (
                <div key={c.title} className="bg-white border border-[#dad5cd] rounded-xl p-6 lg:p-8 flex flex-col gap-3">
                  <div className="w-8 h-0.5 bg-[#cb9559]" />
                  <h3 className="font-heading font-bold text-[#251d1b] text-[20px] leading-[1.2]">{c.title}</h3>
                  <p className="font-body text-[#746e6b] text-[15px] lg:text-[16px] leading-[1.6]">{c.desc}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-[#44312b] text-[15px] lg:text-[16px] leading-[1.5] italic border-l-2 border-[#cb9559] pl-4">
              Ces problèmes ne disparaissent pas seuls — et plus on attend, plus ils s&apos;installent.
            </p>
          </div>
        </section>

        {/* ── SECTION 3 : DÉROULEMENT ────────────────────────────── */}
        <section className="bg-[#44312b] py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col gap-10 lg:gap-14">
            <div className="flex flex-col gap-4 max-w-[720px]">
              <h2 className="font-heading font-bold text-white text-[30px] lg:text-[42px] leading-[1.2]">
                Comment se déroule une séance chez Taraya
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {steps.map((s) => (
                <div key={s.n} className="flex flex-col gap-4">
                  <span className="font-heading font-bold text-[#cb9559] text-[48px] leading-none">{s.n}</span>
                  <div className="h-px bg-[#5a3f37]" />
                  <h3 className="font-heading font-bold text-white text-[20px] leading-[1.2]">{s.title}</h3>
                  <p className="font-body text-[#e8e0d5] text-[15px] lg:text-[16px] leading-[1.6]">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#3a2923] rounded-xl p-6 lg:p-8 max-w-[720px]">
              <p className="font-body text-[#e8e0d5] text-[15px] lg:text-[16px] leading-[1.7]">
                <span className="font-heading font-bold text-white">Durée :</span> une demi-heure suffit pour un entretien régulier ou un petit problème localisé. Pour des pieds très secs, des ongles incarnés ou plusieurs zones à traiter, comptez jusqu&apos;à une heure.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 : POURQUOI ───────────────────────────────── */}
        <section className="bg-[#fbf8ef] py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="w-full lg:w-[480px] lg:flex-shrink-0 h-[320px] lg:h-[520px] rounded-xl overflow-hidden relative">
              <Image
                src={imgBain}
                alt="Bain de pieds pédicure médicale Taraya Institut"
                fill className="object-cover" sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-6 flex-1">
              <h2 className="font-heading font-bold text-[#251d1b] text-[30px] lg:text-[42px] leading-[1.2]">
                Pourquoi faire une pédicure médicale&nbsp;?
              </h2>
              <div className="h-px bg-[#dad5cd]" />
              <p className="font-body text-[#746e6b] text-[16px] lg:text-[18px] leading-[1.7]">
                La pédicure médicale, ce n&apos;est pas un soin esthétique. C&apos;est un soin qui traite ce qui ne disparaît pas seul : callosités qui reviennent, ongles incarnés douloureux, talons secs et fissurés.
              </p>
              <p className="font-body text-[#746e6b] text-[16px] lg:text-[18px] leading-[1.7]">
                Et le résultat se voit immédiatement. Vous arrivez avec des pieds abîmés, vous repartez avec des pieds tout doux. Pour maintenir ce résultat, une séance mensuelle est recommandée.
              </p>
              <p className="font-body text-[#746e6b] text-[16px] lg:text-[18px] leading-[1.7]">
                Et pour celles qui veulent en profiter pour chouchouter leurs pieds en même temps : la pose de vernis semi-permanent se combine très bien avec la pédicure médicale. Sur les pieds, il tient 4 à 5 semaines, bien plus que sur les mains.
              </p>
              <p className="font-heading font-bold text-[#251d1b] text-[17px] leading-[1.4]">
                Un soin en profondeur, et de jolis pieds en sortant.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 5 : PRODUITS ───────────────────────────────── */}
        <section className="bg-[#f5f0e8] py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col gap-8 max-w-[860px]">
            <h2 className="font-heading font-bold text-[#251d1b] text-[30px] lg:text-[38px] leading-[1.2]">
              Les produits utilisés
            </h2>
            <div className="h-px bg-[#dad5cd]" />
            <p className="font-body text-[#746e6b] text-[16px] lg:text-[18px] leading-[1.7]">
              Pour les soins des pieds, nous travaillons avec la marque <strong className="text-[#251d1b]">Gehwol</strong>, fondée en Allemagne en 1868 par le pharmacien Eduard Gerlach, l&apos;un des premiers à formuler des produits spécifiquement conçus pour le soin des pieds. Une référence dans le milieu depuis plus de 150 ans.
            </p>
            <p className="font-body text-[#746e6b] text-[16px] lg:text-[18px] leading-[1.7]">
              Nous utilisons également les produits <strong className="text-[#251d1b]">PHYT&apos;S</strong>, disponibles à l&apos;achat à l&apos;institut.
            </p>
            <div className="flex items-start gap-4 bg-white border border-[#dad5cd] rounded-xl p-5 lg:p-6">
              <div className="w-1 self-stretch bg-[#cb9559] rounded-full shrink-0" />
              <p className="font-body text-[#251d1b] text-[15px] lg:text-[16px] leading-[1.6]">
                <strong>L&apos;hygiène est non négociable :</strong> tous les instruments sont désinfectés entre chaque cliente. Produits antiseptiques utilisés systématiquement.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 6 : CTA ────────────────────────────────────── */}
        <section className="bg-[#44312b] py-16 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col items-center gap-6 text-center">
            <h2 className="font-heading font-bold text-white text-[30px] lg:text-[42px] leading-[1.2] max-w-[600px]">
              Prête à prendre soin de vos pieds&nbsp;?
            </h2>
            <p className="font-body text-[#e8e0d5] text-[16px] lg:text-[18px] leading-[1.6]">
              Prenez rendez-vous directement via WhatsApp.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="bg-[#fbf8ef] text-[#44312b] font-heading font-bold text-[16px] leading-[1.3] px-6 py-3 rounded-[64px] hover:bg-white transition-colors">
              Prendre rendez-vous
            </a>
          </div>
        </section>

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
