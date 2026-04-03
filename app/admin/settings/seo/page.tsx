import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import SeoSettingsForm from "./SeoSettingsForm";

export default async function SeoSettingsPage() {
  const rows = await db.siteSetting.findMany().catch(() => []);
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const session = await getSession();
  const userRole = session?.role ?? "ADMIN";

  return (
    <div className="flex flex-col gap-8 max-w-[700px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">SEO & Analytics</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">Méta-données, Google Analytics, Facebook Pixel, reCAPTCHA, Google Maps</p>
      </div>
      <SeoSettingsForm settings={settings} userRole={userRole} />
    </div>
  );
}
