import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { deleteUser } from "@/app/actions/users";
import NewUserForm from "./NewUserForm";

export default async function UsersPage() {
  const session = await getSession();
  const users = await db.user.findMany({ orderBy: { createdAt: "asc" } }).catch(() => []);

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
              {users.map((u) => (
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
                    <span className={`inline-block font-body text-[11px] px-2 py-0.5 rounded-full ${
                      u.role === "SUPER_ADMIN"
                        ? "bg-[#44312b] text-white"
                        : "bg-[#fbf8ef] text-[#746e6b] border border-[#dad5cd]"
                    }`}>
                      {u.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {isSuperAdmin && u.id !== session?.userId && (
                      <form action={() => deleteUser(u.id)}
                        onSubmit={(e) => { if (!confirm(`Supprimer ${u.name} ?`)) e.preventDefault(); }}>
                        <button type="submit"
                          className="font-body text-red-400 hover:text-red-600 text-[13px] transition-colors">
                          Supprimer
                        </button>
                      </form>
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
