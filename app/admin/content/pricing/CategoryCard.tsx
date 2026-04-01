"use client";

import { useState } from "react";
import { deleteCategory, toggleCategory } from "@/app/actions/pricing";
import ItemRow from "./ItemRow";
import NewItemForm from "./NewItemForm";

type Item = { id: string; label: string; price: string; order: number };
type Category = { id: string; title: string; order: number; active: boolean; items: Item[] };

export default function CategoryCard({ category }: { category: Category }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-[#dad5cd] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#fbf8ef] border-b border-[#dad5cd]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-[#746e6b] hover:text-[#251d1b] transition-colors"
            aria-label={expanded ? "Réduire" : "Développer"}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={`transition-transform ${expanded ? "rotate-90" : "rotate-0"}`}>
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h3 className="font-heading text-[#251d1b] text-[15px] font-bold">{category.title}</h3>
          <span className="font-body text-[#746e6b] text-[12px]">{category.items.length} prestation(s)</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Toggle active */}
          <button
            onClick={() => toggleCategory(category.id, !category.active)}
            className={`inline-flex items-center justify-center w-11 h-6 rounded-full transition-colors ${
              category.active ? "bg-[#44312b]" : "bg-[#dad5cd]"
            }`}
            aria-label={category.active ? "Désactiver" : "Activer"}
          >
            <span className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
              category.active ? "translate-x-2.5" : "-translate-x-2.5"
            }`} />
          </button>
          {/* Delete */}
          <form action={() => deleteCategory(category.id)}
            onSubmit={(e) => { if (!confirm(`Supprimer "${category.title}" et toutes ses prestations ?`)) e.preventDefault(); }}>
            <button type="submit"
              className="font-body text-red-400 hover:text-red-600 text-[13px] transition-colors">
              Supprimer
            </button>
          </form>
        </div>
      </div>

      {/* Items */}
      {expanded && (
        <div className="px-5 py-4 flex flex-col gap-1">
          {category.items.length === 0 ? (
            <p className="font-body text-[#746e6b] text-[13px] text-center py-3">
              Aucune prestation. Ajoutez-en une ci-dessous.
            </p>
          ) : (
            category.items.map((item) => <ItemRow key={item.id} item={item} />)
          )}
          <NewItemForm categoryId={category.id} />
        </div>
      )}
    </div>
  );
}
