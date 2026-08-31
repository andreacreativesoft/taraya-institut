const imgOrnamentRight = "/images/cta-ornament-right.svg";
const imgOrnamentLeft  = "/images/cta-ornament-left.svg";

export default function PromoSection({ whatsapp, label, title, body }: { whatsapp: string; label?: string; title?: string; body?: string }) {
  const WHATSAPP_URL = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
  const displayLabel = label ?? "Offre exclusive";
  const displayTitle = title ?? "Éclat et sérénité de la rentrée";
  const displayBody  = body  ?? "";

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

      <div className="relative mx-auto max-w-[1280px] px-4 lg:px-6 flex flex-col items-center gap-6 text-center">

        {/* Badge */}
        <span className="inline-flex border border-[#cb9559] text-[#cb9559] font-heading font-bold text-[11px] tracking-[0.12em] uppercase px-5 py-1.5 rounded-full">
          {displayLabel}
        </span>

        {/* Title */}
        <h2 className="font-heading text-white text-[36px] lg:text-[56px] font-bold leading-[1.15] whitespace-pre-line max-w-[720px]">
          {displayTitle}
        </h2>

        {/* Intro line */}
        <p className="font-body text-[#e8e0d5] text-[16px] lg:text-[19px] leading-[1.5] max-w-[560px]">
          Prolongez la douceur de l&apos;été et prenez soin de vous chez{" "}
          <strong className="text-white font-bold">Taraya Institut</strong>{" "}
          tout le mois de septembre.
        </p>

        {/* Offer card */}
        <div className="bg-[#fbf8ef] rounded-2xl px-8 py-7 lg:py-8 flex flex-col items-center gap-4 max-w-[440px] w-full mt-2">
          <p className="font-body text-[#746e6b] text-[15px] lg:text-[17px] leading-[1.4]">
            Pour tout soin visage <strong className="text-[#251d1b]">Phyt&apos;s</strong>
          </p>
          <p className="font-body text-[#746e6b] text-[15px] leading-[1.4]">
            la pose du vernis semi-permanent est à
          </p>
          <div className="flex items-baseline gap-3">
            <span className="font-heading font-bold text-[#44312b] text-[60px] lg:text-[72px] leading-none">25€</span>
            <span className="font-body text-[#746e6b] text-[15px]">(au lieu de 40€)</span>
          </div>
          <div className="h-px bg-[#dad5cd] w-full" />
          <p className="font-body text-[#746e6b] text-[13px] lg:text-[14px] leading-[1.6] text-center">
            Si dépose de semi-permanent :{" "}
            <strong className="text-[#251d1b]">35€</strong> au lieu de 50€
          </p>
        </div>

        {/* Tagline */}
        <p className="font-body text-[#e8e0d5] text-[15px] lg:text-[17px] italic leading-[1.4] mt-1">
          Offrez-vous une pause cocoon dédiée à votre bien-être
        </p>

        {/* Validity */}
        <p className="font-body text-[#cb9559] text-[12px] lg:text-[13px] tracking-[0.1em] uppercase font-medium">
          Offre valable du 1<sup>er</sup> septembre au 30 septembre
        </p>

        {/* CTA */}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="bg-[#fbf8ef] text-[#44312b] font-heading font-bold text-[16px] leading-[1.3] px-6 py-3 rounded-full hover:bg-white transition-colors mt-2">
          Prendre rendez-vous
        </a>
      </div>
    </section>
  );
}
