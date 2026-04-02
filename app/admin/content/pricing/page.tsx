import { db } from "@/lib/db";
import SortablePricingList from "./SortablePricingList";
import NewCategoryForm from "./NewCategoryForm";

export default async function PricingPage() {
  const categories = await db.pricingCategory.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { order: "asc" } } },
  }).catch(() => []);

  let totalItems = 0;
  for (const c of categories) totalItems += c.items.length;

  return (
    <div className="flex flex-col gap-8 max-w-[900px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">Tarifs</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">
          {categories.length} catégorie(s) — {totalItems} prestation(s) — glissez-déposez pour réordonner
        </p>
      </div>

      <SortablePricingList initialCategories={categories} />

      <div className="bg-white rounded-xl border border-[#dad5cd] p-6">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold mb-5">Ajouter une catégorie</h2>
        <NewCategoryForm />
      </div>
    </div>
  );
}
