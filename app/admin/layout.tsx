import { getSession } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { defaults } from "@/lib/settings";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // No session → render the login page without admin chrome
  // The proxy/middleware handles redirecting unauthenticated users on protected routes
  if (!session) return <>{children}</>;

  const settings = await getSettings().catch(() => defaults);

  return (
    <div className="flex min-h-screen bg-[#f5f3ee]">
      <Sidebar
        userName={session.name}
        userRole={session.role}
        siteName={settings.site_name || "Taraya Institut"}
        sectionFaqEnabled={settings.section_faq_enabled === "true"}
        sectionFormsEnabled={settings.section_forms_enabled === "true"}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 lg:p-8 overflow-auto admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
