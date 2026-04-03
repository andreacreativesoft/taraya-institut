import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import NewUserForm from "./NewUserForm";
import UserList from "./UserList";

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
        <UserList
          users={users}
          currentUserId={session?.userId}
          isSuperAdmin={isSuperAdmin}
        />
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
