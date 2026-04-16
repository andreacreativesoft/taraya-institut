import { unstable_noStore as noStore } from "next/cache";
import { getSettings } from "@/lib/settings";

export default async function AnnouncementBanner() {
  noStore();
  const settings = await getSettings();

  if (settings.announcement_enabled !== "true" || !settings.announcement_text.trim()) {
    return null;
  }

  const hasButton = settings.announcement_button_text.trim() && settings.announcement_button_url.trim();

  return (
    <div className="w-full bg-[#cb9559] px-4 py-2.5">
      <div className="mx-auto max-w-[1280px] flex items-center justify-center gap-4 flex-wrap">
        <p className="font-body text-[#fbf8ef] text-[13px] lg:text-[14px] leading-[1.5] text-center">
          {settings.announcement_text}
        </p>
        {hasButton && (
          <a
            href={settings.announcement_button_url}
            className="shrink-0 inline-flex items-center border border-[#fbf8ef] text-[#fbf8ef] font-heading font-bold text-[13px] leading-[1.3] px-4 py-1.5 rounded-[64px] whitespace-nowrap hover:bg-white/10 transition-colors"
          >
            {settings.announcement_button_text}
          </a>
        )}
      </div>
    </div>
  );
}
