import Image from "next/image";

const imgPhoto  = "/images/forwho-1.webp";
const imgPhoto2 = "/images/forwho-2.webp";
const imgFace   = "/images/icon-face.svg";
const imgFire   = "/images/icon-fire.svg";
const imgHeart  = "/images/icon-heart.svg";

const features = [
  { icon: imgFace,  title: "Un moment rien qu\u2019à vous",         desc: "Laissez vos préoccupations à la porte et profitez d\u2019un vrai moment de détente." },
  { icon: imgFire,  title: "Une atmosphère douce et apaisante",      desc: "Un cadre cocooning pensé pour que vous vous sentiez détendue dès que vous franchissez la porte" },
  { icon: imgHeart, title: "Des soins adaptés à vous",               desc: "Chaque soin est pensé selon vos besoins, votre peau, votre moment." },
];

export default function ForWhoSection() {
  return (
    <section className="bg-[#fbf8ef]">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-8 lg:py-0 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
        {/* Desktop image — left column */}
        <div className="hidden lg:block flex-1 h-[674px] min-w-0 relative rounded-lg overflow-hidden shrink-0">
          <Image src={imgPhoto} alt="Esthéticienne versant une huile essentielle pour un massage corporel relaxant chez Taraya"
            fill className="object-cover rounded-lg" sizes="(max-width: 1280px) 50vw, 608px" />
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <img src={imgPhoto2} alt="" aria-hidden="true"
              className="absolute max-w-none object-cover rounded-lg"
              style={{ height: "122.66%", top: "-15.34%", left: "-0.17%", width: "100.11%" }} />
          </div>
        </div>
        {/* Text + features */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[#251d1b] text-[34px] lg:text-[48px] font-bold leading-[1.2]">
              À qui sont destinés nos soins?
            </h2>
            <p className="font-body text-[#746e6b] text-[16px] lg:text-[20px] leading-[1.4]">
              {`Taraya Institut est un espace réservé aux femmes. Un endroit où l'on vient sans se presser, pour se détendre.  Juste se poser, souffler, et prendre soin de soi. Pour celles qui souhaitent s'offrir un moment vraiment à elles, dans un cadre chaleureux et bienveillant, entre de bonnes mains. Un espace qui vous offre : `}
            </p>
          </div>
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
      </div>
      {/* Mobile-only image — Figma: w-[343px] h-[400px] */}
      <div className="lg:hidden flex justify-center px-4 pb-8">
        <div className="w-[343px] h-[400px] relative rounded-lg overflow-hidden">
          <Image src={imgPhoto} alt="Esthéticienne versant une huile essentielle pour un massage corporel relaxant chez Taraya"
            fill className="object-cover rounded-lg" sizes="343px" />
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <img src={imgPhoto2} alt="" aria-hidden="true"
              className="absolute max-w-none object-cover rounded-lg"
              style={{ height: "122.66%", top: "-15.34%", left: "-0.17%", width: "100.11%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
