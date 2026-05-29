import { getSettings } from "@/lib/settings";
import TextsSettingsForm from "./TextsSettingsForm";

export const metadata = { title: "Textes des sections – Admin" };

export default async function TextsSettingsPage() {
  const settings = await getSettings();
  return (
    <div className="flex flex-col gap-8 max-w-[1200px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold">Textes des sections</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">
          Modifiez les titres et sous-titres de chaque section de la page d&apos;accueil.
        </p>
      </div>
      <TextsSettingsForm settings={settings} />
    </div>
  );
}
