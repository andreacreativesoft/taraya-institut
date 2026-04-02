import Image from "next/image";

const imgPhyts   = "/images/partner-phyts.webp";
const imgChevron = "/images/icon-chevron.svg";

export default function PartnerSection() {
  return (
    <section className="bg-[#fbf8ef] py-8 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
        {/* Desktop image — left column */}
        <div className="hidden lg:block flex-1 h-[674px] min-w-0 relative rounded-lg overflow-hidden shrink-0">
          <Image src={imgPhyts} alt="Gamme de produits Phyt's bio — crème revitalisante, gommage et hydrolé eucalyptus utilisés chez Taraya Institut"
            fill className="object-cover rounded-lg" sizes="(max-width: 1280px) 50vw, 608px" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[#251d1b] text-[34px] lg:text-[48px] font-bold leading-[1.2]">Notre marque partenaire</h2>
            <p className="font-body text-[#746e6b] text-[16px] lg:text-[20px] leading-[1.4] whitespace-pre-wrap">
              {`Une marque choisie avec soin, pour votre peau.\nChez Taraya, les produits utilisés ne sont pas choisis par hasard. C'est la raison pour laquelle je travaille avec la marque Phyt's, disponible à l'achat à l'institut.`}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="h-px bg-[#dad5cd]" />
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-[#111928] text-[20px] font-bold leading-[1.4]">Phyt&rsquo;s</h3>
              <p className="font-body text-[#746e6b] text-[16px] leading-[1.4] tracking-[0.16px]">
                {`Fondée en 1972, Phyt's est une marque de cosmétique française dont les produits sont d'origine naturelle, certifiés bio, vegan et fabriqués en France. Je l'utilise pour tous les soins visage et corps, parce qu'elle respecte la peau et répond aux besoins spécifiques de chaque cliente. Retrouvez également une sélection de produits Phyt's à l'achat à l'institut.`}
              </p>
              <div className="flex items-center gap-1.5">
                <a href="https://www.phyts.com" target="_blank" rel="noopener noreferrer"
                  className="font-heading font-bold text-[#cb9559] text-[18px] leading-[1.2] whitespace-nowrap hover:opacity-80 transition-opacity">
                  Découvrir Phyt&rsquo;s
                </a>
                <div className="relative w-[10px] h-[10px] overflow-hidden shrink-0">
                  <img src={imgChevron} alt="" className="absolute inset-0 w-full h-full object-contain" />
                </div>
              </div>
            </div>
            <div className="h-px bg-[#dad5cd]" />
          </div>
        </div>
      </div>
    </section>
  );
}
