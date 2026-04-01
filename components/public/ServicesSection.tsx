const imgBase       = "/images/service-base.jpg";
const imgSoinsVis   = "/images/service-soins-visage.jpg";
const imgMassages   = "/images/service-massages.jpg";
const imgMainsPieds = "/images/service-mains-pieds.jpg";
const imgEpilations = "/images/service-epilations.jpg";
const imgTeintures  = "/images/service-teintures.jpg";

type ServiceData = { img: string; img2?: string; img2Style?: React.CSSProperties; title: string; desc: string };

const services: ServiceData[] = [
  { img: imgBase, img2: imgSoinsVis, img2Style: { height: "245.6%", top: "-114.63%", left: "0.22%", width: "100%" },
    title: "Soins visage Phyt's", desc: "Des soins sur mesure pour votre peau, avec des produits bio français de la marque Phyt's, choisis pour leur respect de la peau et leur efficacité." },
  { img: imgBase, img2: imgMassages,
    title: "Massages Phyt's", desc: "Des massages corps et visage pour relâcher les tensions et vous reconnecter à vous-même." },
  { img: imgMainsPieds,
    title: "Soins mains et pieds", desc: "Manucure, pédicure esthétique et médicale. Des mains et des pieds soignés." },
  { img: imgEpilations,
    title: "Épilations", desc: "Des épilations réalisées avec soin et précision, pour un résultat impeccable." },
  { img: imgBase, img2: imgTeintures, img2Style: { height: "259.95%", top: "-66.57%", left: "0", width: "100%" },
    title: "Teintures", desc: "Teinture cils ou sourcils pour un regard plus défini, sans effort." },
];

function ServiceCard({ img, img2, img2Style, title, desc }: ServiceData) {
  return (
    <div className="bg-[#fbf8ef] border border-[#dad5cd] rounded-lg p-6 flex flex-col gap-4 w-full">
      <div className="relative h-[207px] rounded overflow-hidden bg-[#e5e7eb]">
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover rounded" />
        {img2 && (
          <div className="absolute inset-0 overflow-hidden rounded">
            <img src={img2} alt="" aria-hidden="true"
              className="absolute max-w-none object-cover rounded"
              style={img2Style ?? { inset: 0, width: "100%", height: "100%" }} />
          </div>
        )}
      </div>
      <h3 className="font-heading text-[#251d1b] text-[24px] font-bold leading-[1.2]">{title}</h3>
      <p className="font-body text-[#736a66] text-[16px] leading-[1.4] tracking-[0.16px]">{desc}</p>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#fbf8ef] py-8 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col gap-8 lg:gap-16">
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-heading text-[#251d1b] text-[34px] lg:text-[48px] font-bold leading-[1.2]">Nos services</h2>
          <p className="font-body text-[#746e6b] text-[16px] lg:text-[20px] leading-[1.4] max-w-[864px]">
            Des soins pensés pour vous, de la tête aux pieds.<br />
            {`Chez Taraya, chaque soin est réalisé avec le temps et l'attention qu'il mérite. Découvrez nos prestations, toutes pensées pour vous offrir un vrai moment de bien-être.`}
          </p>
        </div>

        {/* Mobile: 1 col | Tablet: 2 cols */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>

        {/* Desktop: row of 3 + row of 2 centered */}
        <div className="hidden lg:flex flex-col gap-8">
          <div className="flex gap-8">
            {services.slice(0, 3).map(s => <ServiceCard key={s.title} {...s} />)}
          </div>
          <div className="flex gap-8 justify-center">
            {services.slice(3).map(s => (
              <div key={s.title} className="w-[405px]">
                <ServiceCard {...s} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
