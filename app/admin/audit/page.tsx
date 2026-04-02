import { db } from "@/lib/db";

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  login:      { label: "Connexion",    color: "bg-blue-100 text-blue-700" },
  create:     { label: "Création",     color: "bg-green-100 text-green-700" },
  update:     { label: "Modification", color: "bg-amber-100 text-amber-700" },
  delete:     { label: "Suppression",  color: "bg-red-100 text-red-700" },
  activate:   { label: "Activé",       color: "bg-emerald-100 text-emerald-700" },
  deactivate: { label: "Désactivé",    color: "bg-gray-100 text-gray-600" },
};

const ENTITY_LABELS: Record<string, string> = {
  Service:         "Service",
  PricingCategory: "Catégorie tarif",
  PricingItem:     "Prestation",
  SiteSetting:     "Paramètre",
  SiteSettings:    "Paramètres",
  User:            "Utilisateur",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AuditPage() {
  const logs = await db.auditLog
    .findMany({ orderBy: { createdAt: "desc" }, take: 200 })
    .catch(() => []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-[#251d1b]">Journal d&apos;audit</h1>
        <p className="text-[14px] text-[#746e6b] mt-1">Historique des modifications — 200 dernières entrées</p>
      </div>

      {logs.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#dad5cd] p-12 text-center text-[#746e6b] text-[14px]">
          Aucune activité enregistrée pour l&apos;instant.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#dad5cd] overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#dad5cd] bg-[#f5f3ee]">
                <th className="text-left px-4 py-3 font-medium text-[#746e6b]">Date</th>
                <th className="text-left px-4 py-3 font-medium text-[#746e6b]">Utilisateur</th>
                <th className="text-left px-4 py-3 font-medium text-[#746e6b]">Action</th>
                <th className="text-left px-4 py-3 font-medium text-[#746e6b]">Entité</th>
                <th className="text-left px-4 py-3 font-medium text-[#746e6b]">Détail</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => {
                const action = ACTION_LABELS[log.action] ?? { label: log.action, color: "bg-gray-100 text-gray-600" };
                const entity = ENTITY_LABELS[log.entity] ?? log.entity;
                return (
                  <tr
                    key={log.id}
                    className={`border-b border-[#dad5cd] last:border-0 ${i % 2 === 0 ? "" : "bg-[#faf9f6]"}`}
                  >
                    <td className="px-4 py-3 text-[#746e6b] whitespace-nowrap">{formatDate(log.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-[#251d1b]">{log.userName}</span>
                      <span className="block text-[11px] text-[#9e9691]">{log.userEmail}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${action.color}`}>
                        {action.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#746e6b]">{entity}</td>
                    <td className="px-4 py-3 text-[#251d1b]">{log.entityLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
