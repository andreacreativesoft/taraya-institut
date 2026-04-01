import Link from "next/link";

const sections = [
  { href: "/admin/content/services", label: "Services",   desc: "Gérer les cartes de services affichées sur le site",      icon: "🧴" },
  { href: "/admin/content/pricing",  label: "Tarifs",     desc: "Modifier les catégories et prix de toutes les prestations", icon: "💶" },
];

export default function ContentPage() {
  return (
    <div className="flex flex-col gap-8 max-w-[800px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">Contenu</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">
          Gérez le contenu affiché sur votre site.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map(({ href, label, desc, icon }) => (
          <Link key={href} href={href}
            className="bg-white rounded-xl border border-[#dad5cd] p-6 flex flex-col gap-3 hover:shadow-sm hover:border-[#cab3a0] transition-all">
            <span className="text-3xl">{icon}</span>
            <div>
              <p className="font-heading text-[#251d1b] text-[18px] font-bold">{label}</p>
              <p className="font-body text-[#746e6b] text-[14px] mt-1">{desc}</p>
            </div>
            <span className="font-body text-[#cab3a0] text-[13px] font-medium">Gérer →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
