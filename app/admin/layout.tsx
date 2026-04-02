import { getSession } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // No session → render the login page without admin chrome
  // The proxy/middleware handles redirecting unauthenticated users on protected routes
  if (!session) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#f5f3ee]">
      <Sidebar userName={session.name} userRole={session.role} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 pt-16 lg:p-8 lg:pt-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
