const imgPhoto  = "/images/about-1.webp";
const imgPhoto2 = "/images/about-2.webp";

export default function AboutSection() {
  return (
    <section id="a-propos" className="bg-[#fbf8ef]">
      {/* Text content */}
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-8 lg:py-24 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
        <div className="flex-1 flex flex-col gap-8 min-w-0">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[#251d1b] text-[34px] lg:text-[48px] font-bold leading-[1.2]">
              À propos du salon d&rsquo;esthétique Taraya
            </h2>
            <div className="font-body text-[#746e6b] text-[16px] lg:text-[20px] leading-[1.4]">
              <p className="mb-4">{`Taraya, c'est un nom qui correspond à ce que je voulais créer. Il est inspiré par "Tara", divinité bouddhiste qui incarne la femme, le soin de soi et la force tranquille d'avancer. C'est exactement l'esprit que j'ai voulu donner à cet endroit.`}</p>
              <p className="mb-4">{`Esthéticienne diplômée depuis 2005, je n'ai jamais arrêté de me former, de me perfectionner, d'apprendre. J'ai passé 15 ans à travailler en institut, à me spécialiser en pédicure médicale, à former d'autres professionnelles. Et aujourd'hui, j'ouvre les portes de mon propre cocon.`}</p>
              <p>{`Chez Taraya, les soins ne sont pas expédiés. Ils sont pensés, préparés, réalisés avec le temps qu'ils méritent. Parce que c'est ça, prendre soin de vous.`}</p>
            </div>
          </div>
        </div>
        {/* Desktop: image inline | Mobile: image below (shown as separate block) */}
        <div className="hidden lg:block flex-1 h-[529px] min-w-0 relative rounded-lg overflow-hidden">
          <img src={imgPhoto} alt="Cabine de soins Taraya Institut avec lit de massage, produits de beauté et équipement professionnel"
            className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <img src={imgPhoto2} alt="" aria-hidden="true"
              className="absolute h-full max-w-none object-cover rounded-lg"
              style={{ left: "-0.07%", top: "-0.01%", width: "116.01%" }} />
          </div>
        </div>
      </div>
      {/* Mobile-only image block — Figma: w-[343px] h-[400px] */}
      <div className="lg:hidden flex justify-center px-4 pb-8">
        <div className="w-[343px] h-[400px] relative rounded-lg overflow-hidden">
          <img src={imgPhoto} alt="Cabine de soins Taraya Institut avec lit de massage, produits de beauté et équipement professionnel"
            className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <img src={imgPhoto2} alt="" aria-hidden="true"
              className="absolute h-full max-w-none object-cover rounded-lg"
              style={{ left: "-0.07%", top: "-0.01%", width: "116.01%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
