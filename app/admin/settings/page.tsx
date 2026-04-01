import { db } from "@/lib/db";
import SettingsForm from "./SettingsForm";

type SettingRow = { key: string; value: string };

export default async function SettingsPage() {
  let rows: SettingRow[] = [];
  try {
    const fetched = await db.siteSetting.findMany();
    rows = fetched as unknown as SettingRow[];
  } catch {
    // db unavailable
  }

  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div className="flex flex-col gap-8 max-w-[700px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">Paramètres</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">Informations générales du site</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
