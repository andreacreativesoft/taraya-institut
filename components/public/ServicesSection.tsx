import Image from "next/image";
import { db } from "@/lib/db";

const imgBase       = "/images/soins-beaute-estheticienne-sterrebeek.webp";
const imgSoinsVis   = "/images/soin-visage-phyts-estheticienne-zaventem.webp";
const imgMassages   = "/images/massage-relaxant-estheticienne-zaventem.webp";
const imgMainsPieds = "/images/manucure-pedicure-soins-mains-pieds-zaventem.webp";
const imgEpilations = "/images/epilation-estheticienne-zaventem-sterrebeek.webp";
const imgTeintures  = "/images/teinture-cils-sourcils-estheticienne-sterrebeek.webp";

// Fallback images per service title keyword
function getServiceImage(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("visage")) return imgSoinsVis;
  if (t.includes("massage")) return imgMassages;
  if (t.includes("main") || t.includes("pied") || t.includes("manucure") || t.includes("pédicure")) return imgMainsPieds;
  if (t.includes("épil") || t.includes("epil")) return imgEpilations;
  if (t.includes("teinture") || t.includes("sourcil") || t.includes("cil")) return imgTeintures;
  return imgBase;
}

type ServiceData = { id: string; title: string; description: string; image?: string | null; imageAlt?: string | null };

function ServiceCard({ title, description, image, imageAlt }: Omit<ServiceData, "id">) {
  const img = image || getServiceImage(title);
  const alt = imageAlt || `${title} — Taraya Institut`;
  return (
    <div className="bg-[#fbf8ef] border border-[#dad5cd] rounded-lg p-6 flex flex-col gap-4 w-full">
      <div className="relative h-[207px] rounded overflow-hidden bg-[#e5e7eb]">
        <Image src={img} alt={alt} fill className="object-cover rounded" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 405px" />
      </div>
      <h3 className="font-heading text-[#251d1b] text-[24px] font-bold leading-[1.2]">{title}</h3>
      <p className="font-body text-[#736a66] text-[16px] leading-[1.4] tracking-[0.16px]">{description}</p>
    </div>
  );
}

export default async function ServicesSection() {
  const services = await db.service.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  }).catch(() => []);

  if (services.length === 0) return null;

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
          {services.map(s => <ServiceCard key={s.id} title={s.title} description={s.description} image={s.image} imageAlt={s.imageAlt} />)}
        </div>

        {/* Desktop: row of 3 + row of 2 centered */}
        <div className="hidden lg:flex flex-col gap-8">
          <div className="flex gap-8">
            {services.slice(0, 3).map(s => <ServiceCard key={s.id} title={s.title} description={s.description} image={s.image} imageAlt={s.imageAlt} />)}
          </div>
          {services.length > 3 && (
            <div className="flex gap-8 justify-center">
              {services.slice(3).map(s => (
                <div key={s.id} className="w-[405px]">
                  <ServiceCard title={s.title} description={s.description} image={s.image} imageAlt={s.imageAlt} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
