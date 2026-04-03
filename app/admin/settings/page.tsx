import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-[700px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold">Paramètres</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">Configurez votre site</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/settings/general" className="bg-white rounded-xl border border-[#dad5cd] p-6 hover:border-[#cab3a0] hover:shadow-sm transition-all">
          <p className="font-heading text-[#251d1b] text-[18px] font-bold">Général</p>
          <p className="font-body text-[#746e6b] text-[13px] mt-1">Logo, favicon, nom du site, contact, réseaux sociaux, hero</p>
        </Link>
        <Link href="/admin/settings/seo" className="bg-white rounded-xl border border-[#dad5cd] p-6 hover:border-[#cab3a0] hover:shadow-sm transition-all">
          <p className="font-heading text-[#251d1b] text-[18px] font-bold">SEO & Analytics</p>
          <p className="font-body text-[#746e6b] text-[13px] mt-1">Méta-données, Google Analytics, Facebook Pixel, reCAPTCHA, Google Maps</p>
        </Link>
      </div>
    </div>
  );
}
