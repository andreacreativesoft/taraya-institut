import { db } from "@/lib/db";

const imgOrnamentBL = "/images/pricing-ornament-bl.svg";
const imgOrnamentTR = "/images/pricing-ornament-tr.svg";

const WHATSAPP_URL = "https://wa.me/0471824764";

type PriceItem = { id: string; label: string; price: string };
type Category = { id: string; title: string; items: PriceItem[] };

function PricingCard({ title, items }: { title: string; items: PriceItem[] }) {
  return (
    <div className="bg-[#fbf8ef] rounded-lg px-4 py-6 lg:p-8 flex flex-col gap-8 w-full">
      <p className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.4]">{title}</p>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id}
            className="flex items-center justify-between border-b border-[rgba(68,49,43,0.05)] py-0.5 font-body text-[#736a66] text-[16px] leading-[1.4] tracking-[0.16px]">
            <span className="w-[260px] shrink-0">{item.label}</span>
            <span className="w-10 text-right shrink-0">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function PricingSection() {
  let categories: Category[] = [];
  try {
    const rows = await db.pricingCategory.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      include: { items: { orderBy: { order: "asc" } } },
    });
    categories = rows as unknown as Category[];
  } catch {
    // DB unavailable
  }

  if (categories.length === 0) return null;

  return (
    <section id="tarifs" className="bg-[#44312b] relative pt-10 lg:pt-[72px] pb-8 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ top: "81.6%", right: "78.46%", bottom: "-15.15%", left: "-27.42%" }}>
          <img src={imgOrnamentBL} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute" style={{ top: "-8.18%", right: "-24.51%", bottom: "74.63%", left: "75.55%" }}>
          <img src={imgOrnamentTR} alt="" className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="relative mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-2 lg:gap-4 items-center text-center text-white">
          <h2 className="font-heading text-white text-[34px] lg:text-[48px] font-bold leading-[1.2]">Nos tarifs</h2>
          <p className="font-body text-white text-[16px] lg:text-[20px] leading-[1.4]">
            Trouvez le soin qui vous correspond.<br />
            {`Retrouvez ci-dessous l'ensemble des prestations et leurs tarifs.`}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 items-start">
          {categories.map((cat) => (
            <PricingCard key={cat.id} title={cat.title} items={cat.items} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="font-body text-white text-[14px] lg:text-[16px] leading-[1.5] tracking-[0.14px] text-center max-w-[564px]">
            {`Tout rendez-vous annulé moins de 24 heures à l'avance sera facturé.`}
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="border border-[#fbf8ef] text-[#fbf8ef] font-heading font-bold text-[16px] leading-[1.3] px-5 py-2.5 rounded-[64px] whitespace-nowrap hover:bg-white/10 transition-colors">
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </section>
  );
}
