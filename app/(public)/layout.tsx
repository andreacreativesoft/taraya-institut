export const dynamic = "force-dynamic";

import AnnouncementBanner from "@/components/public/AnnouncementBanner";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBanner />
      {children}
    </>
  );
}
