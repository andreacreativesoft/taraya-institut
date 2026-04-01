const imgOrnamentBL = "/images/pricing-ornament-bl.svg";
const imgOrnamentTR = "/images/pricing-ornament-tr.svg";

const WHATSAPP_URL = "https://wa.me/0471824764";

type PriceItem = { label: string; price: string };

function PricingCard({ title, items }: { title: string; items: PriceItem[] }) {
  return (
    <div className="bg-[#fbf8ef] rounded-lg px-4 py-6 lg:p-8 flex flex-col gap-8 w-full">
      <p className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.4]">{title}</p>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.label}
            className="flex items-center justify-between border-b border-[rgba(68,49,43,0.05)] py-0.5 font-body text-[#736a66] text-[16px] leading-[1.4] tracking-[0.16px]">
            <span className="w-[260px] shrink-0">{item.label}</span>
            <span className="w-10 text-right shrink-0">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const mainsPieds: PriceItem[] = [
  { label: "Manucure", price: "35€" }, { label: "Pose vernis", price: "10€" },
  { label: "Semi permanent", price: "40€" }, { label: "Semi permanent french", price: "45€" },
  { label: "Manucure et semi permanent", price: "70€" }, { label: "Pédicure esthétique", price: "35€" },
  { label: "Pédicure médicale", price: "45€" }, { label: "Pédicure esthétique et semi permanent", price: "70€" },
  { label: "Pédicure médicale et semi permanent", price: "80€" }, { label: "Dépose semi permanent", price: "15€" },
];
const teintures: PriceItem[] = [{ label: "Teinture cils ou sourcils", price: "18€" }];
const epilations: PriceItem[] = [
  { label: "Sourcils", price: "12€" }, { label: "Lèvre", price: "10€" }, { label: "Favoris", price: "10€" },
  { label: "Aisselles", price: "12€" }, { label: "Bikini simple", price: "15€" },
  { label: "Bikini échancré", price: "20€" }, { label: "Bikini brésilien", price: "25€" },
  { label: "Bikini intégral", price: "30€" }, { label: "½ jambes", price: "20€" },
  { label: "¾ jambes", price: "25€" }, { label: "Jambes complètes", price: "30€" },
  { label: "½ bras", price: "15€" }, { label: "Bras complet", price: "25€" },
];
const soinsVisage: PriceItem[] = [
  { label: "Aqua phyt's 1h (hydratant)", price: "75€" }, { label: "White bio active 1h (tâches pigmentaires)", price: "70€" },
  { label: "Phyt'ssima 1h (nutrition)", price: "75€" }, { label: "Aromaclear pureté 1h (peaux grasses)", price: "70€" },
  { label: "Capyl 1h (sensible)", price: "60€" }, { label: "Revederm 1h (éclat, anti-pollution)", price: "60€" },
  { label: "Multi vita 1h15 (mature)", price: "95€" },
];
const massages: PriceItem[] = [
  { label: "Massage corps 60 min", price: "70€" }, { label: "Massage dos 30 min", price: "45€" },
  { label: "Massage visage et cuir chevelu 30 min", price: "45€" }, { label: "Massage corps et visage 1h20", price: "100€" },
];

export default function PricingSection() {
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
        {/* Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 items-start">
          <div className="flex flex-col gap-4 lg:gap-8">
            <PricingCard title="Soins mains et pieds" items={mainsPieds} />
            <PricingCard title="Teintures" items={teintures} />
          </div>
          <PricingCard title="Épilations" items={epilations} />
          {/* At tablet: span 2 cols → Soins visage left, Massages right. At desktop: back to 1 col stacked. */}
          <div className="md:col-span-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-8">
            <PricingCard title="Soins visage Phyt's" items={soinsVisage} />
            <PricingCard title="Massages Phyt's" items={massages} />
          </div>
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
