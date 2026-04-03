import { db } from "@/lib/db";
import GeneralSettingsForm from "./GeneralSettingsForm";

export default async function GeneralSettingsPage() {
  const rows = await db.siteSetting.findMany().catch(() => []);
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div className="flex flex-col gap-8 max-w-[700px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">Paramètres généraux</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">Logo, favicon, nom du site, contact, réseaux sociaux, hero</p>
      </div>
      <GeneralSettingsForm settings={settings} />
    </div>
  );
}
