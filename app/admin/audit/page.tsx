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
  FaqItem:         "FAQ",
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
          {/* Header */}
          <div className="flex items-center pl-2 pr-3 lg:px-5 py-2 bg-[#fbf8ef] border-b border-[#dad5cd]">
            <span className="w-36 shrink-0 hidden sm:block font-heading text-[#251d1b] text-[13px]">Date</span>
            <span className="w-36 shrink-0 font-heading text-[#251d1b] text-[13px]">Action</span>
            <span className="flex-1 font-heading text-[#251d1b] text-[13px]">Entité / Détail</span>
            <span className="w-32 shrink-0 hidden md:block font-heading text-[#251d1b] text-[13px]">Utilisateur</span>
          </div>
          {logs.map((log) => {
            const action = ACTION_LABELS[log.action] ?? { label: log.action, color: "bg-gray-100 text-gray-600" };
            const entity = ENTITY_LABELS[log.entity] ?? log.entity;
            return (
              <div
                key={log.id}
                className="flex items-center gap-3 pl-2 pr-3 lg:px-5 py-2.5 hover:bg-[#fbf8ef]/50 transition-colors border-b border-[#dad5cd] last:border-b-0"
              >
                <span className="w-36 shrink-0 hidden sm:block font-body text-[#746e6b] text-[12px] whitespace-nowrap">
                  {formatDate(log.createdAt)}
                </span>
                <div className="w-36 shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${action.color}`}>
                    {action.label}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-[#746e6b] text-[12px]">{entity}</p>
                  <p className="font-heading text-[#251d1b] text-[13px] font-medium truncate">{log.entityLabel}</p>
                </div>
                <div className="w-32 shrink-0 hidden md:block">
                  <p className="font-body text-[#251d1b] text-[12px] truncate">{log.userName}</p>
                  <p className="font-body text-[#9e9691] text-[11px] truncate">{log.userEmail}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
