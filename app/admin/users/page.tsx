import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import NewUserForm from "./NewUserForm";
import DeleteUserButton from "./DeleteUserButton";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

export default async function UsersPage() {
  const session = await getSession();

  let users: User[] = [];
  try {
    users = await db.user.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    users = [];
  }

  const isSuperAdmin = session?.role === "SUPER_ADMIN";

  return (
    <div className="flex flex-col gap-8 max-w-[900px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">Utilisateurs</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">{users.length} utilisateur(s)</p>
      </div>

      {/* User list */}
      <div className="bg-white rounded-xl border border-[#dad5cd] overflow-hidden">
        {users.length === 0 ? (
          <p className="font-body text-[#746e6b] text-[14px] text-center py-12">Aucun utilisateur.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-[#fbf8ef] border-b border-[#dad5cd]">
              <tr>
                <th className="text-left font-heading text-[#251d1b] text-[13px] px-5 py-3">Nom</th>
                <th className="text-left font-heading text-[#251d1b] text-[13px] px-5 py-3 hidden sm:table-cell">Email</th>
                <th className="text-left font-heading text-[#251d1b] text-[13px] px-5 py-3">Rôle</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dad5cd]">
              {users.map((u: User) => (
                <tr key={u.id} className="hover:bg-[#fbf8ef]/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#44312b] flex items-center justify-center shrink-0">
                        <span className="text-white font-heading text-[12px] font-bold">
                          {u.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-heading text-[#251d1b] text-[14px] font-bold">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="font-body text-[#746e6b] text-[13px]">{u.email}</span>
                  </td>
                  <td className="px-5 py-4">
                    {u.role === "SUPER_ADMIN" ? (
                      <svg className="w-5 h-5 text-[#44312b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} title="Super Admin">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 8v6m3-3h-6" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-[#746e6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} title="Admin">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z" />
                      </svg>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {isSuperAdmin && u.id !== session?.userId && (
                      <DeleteUserButton userId={u.id} userName={u.name} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* New user form — only super admins */}
      {isSuperAdmin ? (
        <div className="bg-white rounded-xl border border-[#dad5cd] p-6">
          <h2 className="font-heading text-[#251d1b] text-[18px] font-bold mb-5">Créer un utilisateur</h2>
          <NewUserForm />
        </div>
      ) : (
        <div className="bg-[#fbf8ef] rounded-xl border border-[#dad5cd] p-6 text-center">
          <p className="font-body text-[#746e6b] text-[14px]">
            Seuls les Super Admins peuvent créer ou supprimer des utilisateurs.
          </p>
        </div>
      )}
    </div>
  );
}
