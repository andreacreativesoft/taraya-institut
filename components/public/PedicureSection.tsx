const imgPedicure  = "/images/pedicure-1.webp";
const imgPedicure2 = "/images/pedicure-2.webp";
const imgGlobe     = "/images/icon-globe.svg";
const imgPlus      = "/images/icon-circle-plus.svg";

const features = [
  { icon: imgGlobe, title: "La pédicure esthétique", desc: "Une pédicure esthétique est un soin qui permet d\u2019embellir et d\u2019entretenir les pieds. Elle consiste à couper et limer les ongles, soigner les cuticules et éliminer les petites callosités. Les pieds sont ainsi plus nets, doux et soignés." },
  { icon: imgPlus,  title: "La pédicure médicale",   desc: "La pédicure médicale va plus loin. En plus du soin esthétique, elle permet de traiter les callosités au bistouri, les ongles incarnés et d\u2019autres problèmes spécifiques. Un soin précis, réalisé avec expertise et attention." },
];

export default function PedicureSection() {
  return (
    <section className="bg-[#fbf8ef]">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-8 lg:py-0 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center lg:pb-22">
        {/* Desktop image — left column */}
        <div className="hidden lg:block flex-1 h-[674px] rounded-lg overflow-hidden shrink-0 relative">
          <div className="absolute inset-0 pointer-events-none rounded-lg">
            <img src={imgPedicure}  alt="" className="absolute max-w-none object-cover rounded-lg size-full" />
            <img src={imgPedicure2} alt="Bain de pieds dans un bassin en céramique avec pierres décoratives — pédicure esthétique et médicale Taraya" className="absolute max-w-none object-cover rounded-lg size-full" />
          </div>
        </div>
        {/* Text + features */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[#251d1b] text-[34px] lg:text-[48px] font-bold leading-[1.2]">La pédicure, notre spécialité</h2>
            <p className="font-body text-[#746e6b] text-[16px] lg:text-[20px] leading-[1.4]">
              Pédicure médicale et esthétique. La pédicure est au cœur de mon expertise. Après plus de 15 ans de pratique et une spécialisation approfondie, je propose des soins adaptés à chaque besoin.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="h-px bg-[#dad5cd]" />
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 bg-[#cab3a0] rounded-full flex items-center justify-center">
                  <img src={f.icon} alt="" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-heading text-[#251d1b] text-[20px] font-bold leading-[1.2]">{f.title}</h3>
                  <p className="font-body text-[#746e6b] text-[16px] leading-[1.4] tracking-[0.16px]">{f.desc}</p>
                </div>
              </div>
            ))}
            <div className="h-px bg-[#dad5cd]" />
          </div>
        </div>
      </div>
      {/* Mobile-only image — Figma: w-[343px] h-[400px] */}
      <div className="lg:hidden flex justify-center px-4 pb-8">
        <div className="w-[343px] h-[400px] rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none rounded-lg">
            <img src={imgPedicure}  alt="" className="absolute max-w-none object-cover rounded-lg size-full" />
            <img src={imgPedicure2} alt="Bain de pieds dans un bassin en céramique avec pierres décoratives — pédicure esthétique et médicale Taraya" className="absolute max-w-none object-cover rounded-lg size-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
