import { db } from "@/lib/db";
import ServiceRow, { type Service } from "./ServiceRow";
import NewServiceForm from "./NewServiceForm";

export default async function ServicesPage() {
  let services: Service[] = [];
  try {
    const rows = await db.service.findMany({ orderBy: { order: "asc" } });
    services = rows as unknown as Service[];
  } catch {
    // db unavailable — show empty state
  }

  return (
    <div className="flex flex-col gap-8 max-w-[900px]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">Services</h1>
          <p className="font-body text-[#746e6b] text-[15px] mt-1">{services.length} service(s) configuré(s)</p>
        </div>
      </div>

      {/* Service list */}
      <div className="bg-white rounded-xl border border-[#dad5cd] overflow-hidden">
        {services.length === 0 ? (
          <p className="font-body text-[#746e6b] text-[14px] text-center py-12">
            Aucun service pour l&apos;instant. Ajoutez-en un ci-dessous.
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-[#fbf8ef] border-b border-[#dad5cd]">
              <tr>
                <th className="text-left font-heading text-[#251d1b] text-[13px] px-5 py-3">Service</th>
                <th className="text-left font-heading text-[#251d1b] text-[13px] px-5 py-3 hidden sm:table-cell">Description</th>
                <th className="text-center font-heading text-[#251d1b] text-[13px] px-5 py-3">Actif</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dad5cd]">
              {services.map((s) => <ServiceRow key={s.id} service={s} />)}
            </tbody>
          </table>
        )}
      </div>

      {/* New service form */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold mb-5">Ajouter un service</h2>
        <NewServiceForm />
      </div>
    </div>
  );
}
