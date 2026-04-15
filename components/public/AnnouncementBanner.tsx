import { getSettings } from "@/lib/settings";

export default async function AnnouncementBanner() {
  const settings = await getSettings();

  if (settings.announcement_enabled !== "true" || !settings.announcement_text.trim()) {
    return null;
  }

  return (
    <div className="w-full bg-[#44312b] px-4 py-2.5 text-center">
      <p className="font-body text-[#fbf8ef] text-[14px] leading-[1.5]">
        {settings.announcement_text}
      </p>
    </div>
  );
}
