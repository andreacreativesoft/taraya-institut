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
        <Link href="/admin/content/services"
          className="bg-white rounded-xl border border-[#dad5cd] p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-[#cab3a0]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#44312b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6m-6 4h4" />
            </svg>
          </div>
          <div>
            <p className="font-heading text-[#251d1b] text-[28px] font-bold leading-none">{stats.services}</p>
            <p className="font-body text-[#746e6b] text-[13px] mt-1">Services actifs</p>
          </div>
        </Link>

        <Link href="/admin/content/pricing"
          className="bg-white rounded-xl border border-[#dad5cd] p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-[#cab3a0]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#44312b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <div>
            <p className="font-heading text-[#251d1b] text-[28px] font-bold leading-none">{stats.categories}</p>
            <p className="font-body text-[#746e6b] text-[13px] mt-1">Catégories de tarifs</p>
          </div>
        </Link>

        <Link href="/admin/forms"
          className="bg-white rounded-xl border border-[#dad5cd] p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stats.unreadForms > 0 ? "bg-amber-100" : "bg-[#cab3a0]/20"}`}>
            <svg className={`w-5 h-5 ${stats.unreadForms > 0 ? "text-amber-600" : "text-[#44312b]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className={`font-heading text-[28px] font-bold leading-none ${stats.unreadForms > 0 ? "text-amber-600" : "text-[#251d1b]"}`}>{stats.unreadForms}</p>
            <p className="font-body text-[#746e6b] text-[13px] mt-1">Demandes non lues</p>
          </div>
        </Link>

        <Link href="/admin/forms"
          className="bg-white rounded-xl border border-[#dad5cd] p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-[#cab3a0]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#44312b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="font-heading text-[#251d1b] text-[28px] font-bold leading-none">{stats.totalForms}</p>
            <p className="font-body text-[#746e6b] text-[13px] mt-1">Total soumissions</p>
          </div>
        </Link>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/admin/content/services"
            className="bg-white rounded-xl border border-[#dad5cd] p-5 flex items-start gap-4 hover:shadow-sm hover:border-[#cab3a0] transition-all group">
            <div className="w-9 h-9 bg-[#fbf8ef] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#cab3a0]/20 transition-colors">
              <svg className="w-4 h-4 text-[#44312b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6m-6 4h4" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-[#251d1b] text-[15px] font-bold">Gérer les services</p>
              <p className="font-body text-[#746e6b] text-[13px] mt-0.5">Ajouter, modifier ou supprimer des services</p>
            </div>
          </Link>

          <Link href="/admin/content/pricing"
            className="bg-white rounded-xl border border-[#dad5cd] p-5 flex items-start gap-4 hover:shadow-sm hover:border-[#cab3a0] transition-all group">
            <div className="w-9 h-9 bg-[#fbf8ef] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#cab3a0]/20 transition-colors">
              <svg className="w-4 h-4 text-[#44312b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-[#251d1b] text-[15px] font-bold">Mettre à jour les tarifs</p>
              <p className="font-body text-[#746e6b] text-[13px] mt-0.5">Modifier les prix et catégories</p>
            </div>
          </Link>

          <Link href="/admin/forms"
            className="bg-white rounded-xl border border-[#dad5cd] p-5 flex items-start gap-4 hover:shadow-sm hover:border-[#cab3a0] transition-all group">
            <div className="w-9 h-9 bg-[#fbf8ef] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#cab3a0]/20 transition-colors">
              <svg className="w-4 h-4 text-[#44312b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-[#251d1b] text-[15px] font-bold">Voir les demandes</p>
              <p className="font-body text-[#746e6b] text-[13px] mt-0.5">Consulter les formulaires de contact</p>
            </div>
          </Link>

          <Link href="/admin/settings"
            className="bg-white rounded-xl border border-[#dad5cd] p-5 flex items-start gap-4 hover:shadow-sm hover:border-[#cab3a0] transition-all group">
            <div className="w-9 h-9 bg-[#fbf8ef] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#cab3a0]/20 transition-colors">
              <svg className="w-4 h-4 text-[#44312b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-[#251d1b] text-[15px] font-bold">Paramètres du site</p>
              <p className="font-body text-[#746e6b] text-[13px] mt-0.5">Analytics, informations de contact</p>
            </div>
          </Link>
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
