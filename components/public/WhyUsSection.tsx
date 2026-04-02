const imgPhoto1  = "/images/whyus-1.jpg";
const imgPhoto2  = "/images/whyus-2.jpg";
const imgPhoto3  = "/images/whyus-3.jpg";
const imgPhoto4  = "/images/whyus-4.jpg";
const imgStar    = "/images/icon-star.svg";
const imgZoom    = "/images/icon-zoom.svg";
const imgReceipt = "/images/icon-receipt.svg";
const imgHome    = "/images/icon-home.svg";
const imgHeart   = "/images/icon-heart-why.svg";

const features = [
  { icon: imgStar,    title: "Une expérience de plus de 20 ans",          desc: "Chaque soin est réalisé avec la maîtrise et l\u2019attention que seules les années de pratique peuvent apporter." },
  { icon: imgZoom,    title: "Le souci du détail",                         desc: "Dans un secteur où les soins vont de plus en plus vite, Taraya fait le choix inverse. Prendre le temps, soigner chaque détail, et s\u2019assurer que vous repartez plus légère." },
  { icon: imgReceipt, title: "Des produits soigneusement sélectionnés",    desc: "Indigo, pour un semi-permanent d\u2019exception, ainsi que Phyt\u2019s, marque bio française, pour les soins visage et corps (disponible à l\u2019achat à l\u2019institut)." },
  { icon: imgHome,    title: "Un espace rien qu\u2019à vous",              desc: "Un cocon exclusivement féminin, chaleureux et bienveillant, où vous pouvez vous poser en toute tranquillité." },
  { icon: imgHeart,   title: "Des soins sur mesure",                       desc: "Chaque cliente est différente. Chaque soin est adapté à vos besoins, votre peau, votre moment." },
];

export default function WhyUsSection() {
  return (
    <section className="bg-[#fbf8ef]">
      {/* Mobile-only image — Figma: w-[343px] h-[400px] */}
      <div className="lg:hidden flex justify-center px-4 pt-8">
        <div className="w-[343px] h-[400px] relative rounded-lg overflow-hidden">
          <img src={imgPhoto4} alt="Espace de travail soigné chez Taraya Institut — bureau manucure, fauteuil en velours et décoration murale en bois" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-8 lg:pt-[88px] flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          <h2 className="font-heading text-[#251d1b] text-[34px] lg:text-[48px] font-bold leading-[1.2]">
            Pourquoi choisir notre institut de beauté&nbsp;?
          </h2>
          <div className="flex flex-col gap-8">
            <div className="h-px bg-[#dad5cd]" />
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 bg-[#cab3a0] rounded-full flex items-center justify-center">
                  <img src={f.icon} alt="" className="w-4 h-4 object-contain" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-3">
                  <h3 className="font-heading text-[#251d1b] text-[20px] font-bold leading-[1.2]">{f.title}</h3>
                  <p className="font-body text-[#746e6b] text-[16px] leading-[1.4] tracking-[0.16px]">{f.desc}</p>
                </div>
              </div>
            ))}
            <div className="h-px bg-[#dad5cd]" />
          </div>
        </div>
        {/* Desktop image collage */}
        <div className="hidden lg:block relative h-[844px] w-[608px] shrink-0 rounded-lg overflow-hidden">
          <img src={imgPhoto1} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <img src={imgPhoto2} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <img src={imgPhoto3} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <img src={imgPhoto4} alt="Espace de travail soigné chez Taraya Institut — bureau manucure, fauteuil en velours et décoration murale en bois" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
        </div>
      </div>
    </section>
  );
}
