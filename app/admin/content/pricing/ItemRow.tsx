"use client";

import { deleteItem } from "@/app/actions/pricing";

type Item = { id: string; label: string; price: string; order: number };

export default function ItemRow({ item }: { item: Item }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#fbf8ef] transition-colors group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-[#dad5cd] text-[12px] font-body select-none">☰</span>
        <span className="font-body text-[#251d1b] text-[13px] truncate">{item.label}</span>
      </div>
      <div className="flex items-center gap-4 shrink-0 ml-3">
        <span className="font-heading text-[#44312b] text-[13px] font-bold">{item.price}</span>
        <form action={() => deleteItem(item.id)}
          onSubmit={(e) => { if (!confirm("Supprimer cette prestation ?")) e.preventDefault(); }}>
          <button type="submit"
            className="font-body text-red-400 hover:text-red-600 text-[12px] transition-colors opacity-0 group-hover:opacity-100">
            Supprimer
          </button>
        </form>
      </div>
    </div>
  );
}
