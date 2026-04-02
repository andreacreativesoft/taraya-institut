"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteItem } from "@/app/actions/pricing";

type Item = { id: string; label: string; price: string; order: number };

export default function ItemRow({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}
      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#fbf8ef] transition-colors group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span {...attributes} {...listeners}
          className="cursor-grab active:cursor-grabbing text-[#dad5cd] hover:text-[#cab3a0] text-[16px] select-none leading-none shrink-0">
          ⠿
        </span>
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
