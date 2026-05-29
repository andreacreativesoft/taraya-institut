const imgOrnamentRight = "/images/cta-ornament-right.svg";
const imgOrnamentLeft  = "/images/cta-ornament-left.svg";

export default function PromoSection({ whatsapp, label, title, body }: { whatsapp: string; label?: string; title?: string; body?: string }) {
  const WHATSAPP_URL = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
  return (
    <section className="bg-[#44312b] relative mt-[94px] mb-[96px] pt-[64px] pb-[96px] overflow-hidden">
      {/* Mobile ornaments */}
      <div className="absolute lg:hidden pointer-events-none select-none"
        style={{ top: "-3.36%", right: "49.93%", bottom: "49.87%", left: "-41.6%" }}>
        <img src={imgOrnamentLeft} alt="" aria-hidden="true" className="w-full h-full object-contain" />
      </div>
      <div className="absolute lg:hidden pointer-events-none select-none"
        style={{ top: "69.51%", right: "-41.53%", bottom: "-23%", left: "49.87%" }}>
        <img src={imgOrnamentRight} alt="" aria-hidden="true" className="w-full h-full object-contain" />
      </div>
      {/* Desktop ornaments */}
      <div className="hidden lg:block absolute pointer-events-none select-none"
        style={{ width: "626px", height: "377px", left: "-269px", bottom: "0" }}>
        <img src={imgOrnamentLeft} alt="" aria-hidden="true" className="w-full h-full object-contain" />
      </div>
      <div className="hidden lg:block absolute pointer-events-none select-none"
        style={{ width: "626px", height: "377px", right: "-269px", bottom: "0" }}>
        <img src={imgOrnamentRight} alt="" aria-hidden="true" className="w-full h-full object-contain" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-4 lg:gap-6 items-center">
          <span className="font-body text-white text-[20px] leading-[1.3] font-normal text-center">
            {label ?? "Promo"}
          </span>
          <h2 className="font-heading text-white text-[34px] lg:text-[48px] font-bold leading-[1.2] whitespace-pre-line">
            {title ?? "-15% sur tous les soins visage\ndurant le mois de MAI"}
          </h2>
          <p className="font-body text-white text-[16px] lg:text-[20px] leading-[1.4] max-w-[768px] whitespace-pre-line">
            {body ?? "Le printemps s'invite sur votre peau ! Profitez de -15% sur l'ensemble de nos soins visage Phyt's tout au long du mois de mai. Uniquement sur rendez-vous."}
          </p>
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="bg-[#fbf8ef] text-[#44312b] font-heading font-bold text-[16px] leading-[1.3] px-5 py-2.5 rounded-full hover:bg-white transition-colors">
          Prendre rendez-vous
        </a>
      </div>
    </section>
  );
}
