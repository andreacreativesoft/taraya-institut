import { db } from "@/lib/db";
import SortableServiceList from "./SortableServiceList";
import NewServiceForm from "./NewServiceForm";

export default async function ServicesPage() {
  const services = await db.service.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div className="flex flex-col gap-8 max-w-[900px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">Services</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">
          {services.length} service(s) — glissez-déposez pour réordonner
        </p>
      </div>

      <SortableServiceList initialServices={services} />

      <div className="bg-white rounded-xl border border-[#dad5cd] p-6">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold mb-5">Ajouter un service</h2>
        <NewServiceForm />
      </div>
    </div>
  );
}
