import Link from "next/link";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function getStats() {
  try {
    const [services, categories, unreadForms, totalForms] = await Promise.all([
      db.service.count({ where: { active: true } }),
      db.pricingCategory.count({ where: { active: true } }),
      db.formSubmission.count({ where: { read: false } }),
      db.formSubmission.count(),
    ]);
    return { services, categories, unreadForms, totalForms };
  } catch {
    return { services: 0, categories: 0, unreadForms: 0, totalForms: 0 };
  }
}

export default async function AdminDashboard() {
  const session = await getSession();
  const stats = await getStats();

  const statCards = [
    { label: "Services actifs",       value: stats.services,    href: "/admin/content/services", color: "bg-[#cab3a0]" },
    { label: "Catégories de tarifs",  value: stats.categories,  href: "/admin/content/pricing",  color: "bg-[#b8a090]" },
    { label: "Demandes non lues",     value: stats.unreadForms, href: "/admin/forms",            color: stats.unreadForms > 0 ? "bg-amber-400" : "bg-[#cab3a0]" },
    { label: "Total soumissions",     value: stats.totalForms,  href: "/admin/forms",            color: "bg-[#dad5cd]" },
  ];

  const quickLinks = [
    { href: "/admin/content/services", label: "Gérer les services",        desc: "Ajouter, modifier ou supprimer des services" },
    { href: "/admin/content/pricing",  label: "Mettre à jour les tarifs",  desc: "Modifier les prix et catégories" },
    { href: "/admin/forms",            label: "Voir les demandes",          desc: "Consulter les formulaires de contact" },
    { href: "/admin/settings",         label: "Paramètres du site",         desc: "Analytics, informations de contact" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-[1100px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">
          Bonjour, {session?.name?.split(" ")[0]} 👋
        </h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">
          Voici un aperçu de votre site Taraya Institut.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, href, color }) => (
          <Link key={label} href={href}
            className="bg-white rounded-xl border border-[#dad5cd] p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
            <div className={`w-10 h-10 rounded-lg ${color}`} />
            <div>
              <p className="font-heading text-[#251d1b] text-[28px] font-bold leading-none">{value}</p>
              <p className="font-body text-[#746e6b] text-[13px] mt-1">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map(({ href, label, desc }) => (
            <Link key={href} href={href}
              className="bg-white rounded-xl border border-[#dad5cd] p-5 flex items-start gap-4 hover:shadow-sm hover:border-[#cab3a0] transition-all group">
              <div className="w-9 h-9 bg-[#fbf8ef] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#cab3a0]/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#cab3a0]" />
              </div>
              <div>
                <p className="font-heading text-[#251d1b] text-[15px] font-bold">{label}</p>
                <p className="font-body text-[#746e6b] text-[13px] mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Public site link */}
      <div className="bg-[#44312b] rounded-xl p-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-heading text-white text-[15px] font-bold">Voir le site public</p>
          <p className="font-body text-white/60 text-[13px] mt-0.5">Prévisualiser le site tel que les visiteurs le voient</p>
        </div>
        <Link href="/" target="_blank"
          className="bg-[#fbf8ef] text-[#44312b] font-heading font-bold text-[14px] px-4 py-2 rounded-full hover:bg-white transition-colors whitespace-nowrap shrink-0">
          Ouvrir →
        </Link>
      </div>
    </div>
  );
}
