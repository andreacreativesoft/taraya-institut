import { db } from "@/lib/db";
import CategoryCard from "./CategoryCard";
import NewCategoryForm from "./NewCategoryForm";

export default async function PricingPage() {
  const categories = await db.pricingCategory
    .findMany({ orderBy: { order: "asc" }, include: { items: { orderBy: { order: "asc" } } } })
    .catch(() => []);

  const totalItems = categories.reduce((sum: number, c) => sum + c.items.length, 0);

  return (
    <div className="flex flex-col gap-8 max-w-[900px]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">Tarifs</h1>
          <p className="font-body text-[#746e6b] text-[15px] mt-1">
            {categories.length} catégorie(s) — {totalItems} prestation(s)
          </p>
        </div>
      </div>

      {/* Categories list */}
      <div className="flex flex-col gap-4">
        {categories.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#dad5cd] p-12 text-center">
            <p className="font-body text-[#746e6b] text-[14px]">
              Aucune catégorie pour l&apos;instant. Ajoutez-en une ci-dessous.
            </p>
          </div>
        ) : (
          categories.map((cat) => <CategoryCard key={cat.id} category={cat} />)
        )}
      </div>

      {/* New category form */}
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold mb-5">Ajouter une catégorie</h2>
        <NewCategoryForm />
      </div>
    </div>
  );
}
