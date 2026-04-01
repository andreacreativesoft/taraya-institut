const imgLogo      = "/images/footer-logo.svg";
const imgInstagram = "/images/icon-instagram.svg";
const imgFacebook  = "/images/icon-facebook.svg";

type Props = {
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
};

export default function Footer({ phone, email, address, instagram, facebook }: Props) {
  const phoneClean = phone.replace(/\s/g, "");
  const phoneHref = phoneClean.startsWith("+") ? `tel:${phoneClean}` : `tel:+${phoneClean}`;

  return (
    <footer className="bg-[#fbf8ef]">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 pt-12 lg:pt-16 pb-10 flex flex-col gap-12">

        {/* Mobile: stacked centered | Desktop: logo + 4-col grid */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          {/* Logo */}
          <div className="shrink-0" style={{ width: "213px", height: "109.508px" }}>
            <img src={imgLogo} alt="Taraya Institut" className="w-full h-full object-contain object-left" />
          </div>
          {/* Info columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left w-full">
            {[
              { title: "Adresse", content: <p>{address}</p> },
              { title: "Téléphone", content: <a href={phoneHref} className="hover:opacity-80">{phone}</a> },
              { title: "Heures d\u2019ouverture", content: <p>Du lundi au vendredi,<br />9h à 18h et le Samedi,<br />9h à 13h</p> },
              { title: "Email", content: <a href={`mailto:${email}`} className="hover:opacity-80 break-all">{email}</a> },
            ].map(({ title, content }) => (
              <div key={title} className="flex flex-col gap-2 lg:gap-3 items-center lg:items-start">
                <p className="font-heading text-[#251d1b] text-[16px] lg:text-[18px] font-bold leading-[1.3]">{title}</p>
                <div className="font-body text-[#746e6b] text-[16px] leading-[1.4] tracking-[0.16px]">{content}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="h-px bg-[#e5e7eb]" />
          <div className="flex items-center justify-between pt-4 lg:pt-8">
            <p className="font-body text-[#746e6b] text-[14px] lg:text-[16px] leading-[1.5] tracking-[0.14px]">
              © {new Date().getFullYear()} Taraya Institut. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="relative size-[24px] overflow-hidden shrink-0 hover:opacity-80 transition-opacity">
                  <div className="absolute inset-[12.5%]">
                    <img src={imgInstagram} alt="" className="absolute inset-0 w-full h-full object-contain" />
                  </div>
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="relative size-[24px] overflow-hidden shrink-0 hover:opacity-80 transition-opacity">
                  <div className="absolute inset-[8.33%_33.33%_8.33%_29.17%]">
                    <img src={imgFacebook} alt="" className="absolute inset-0 w-full h-full object-contain" />
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
