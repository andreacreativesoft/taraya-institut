"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { deleteCategory, toggleCategory, reorderItems } from "@/app/actions/pricing";
import ItemRow from "./ItemRow";
import NewItemForm from "./NewItemForm";

export type Item = { id: string; label: string; price: string; order: number };
export type Category = { id: string; title: string; order: number; active: boolean; items: Item[] };

export default function CategoryCard({ category }: { category: Category }) {
  const [expanded, setExpanded] = useState(true);
  const [items, setItems] = useState(category.items);

  // Sortable for this category card itself (used by parent SortablePricingList)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // DnD sensors for items inside this category
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleItemDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex(i => i.id === active.id);
    const newIdx = items.findIndex(i => i.id === over.id);
    const next = arrayMove(items, oldIdx, newIdx);
    setItems(next);
    reorderItems(next.map(i => i.id));
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-xl border border-[#dad5cd] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#fbf8ef] border-b border-[#dad5cd]">
        <div className="flex items-center gap-3">
          {/* Drag handle for category */}
          <span {...attributes} {...listeners}
            className="cursor-grab active:cursor-grabbing text-[#cab3a0] hover:text-[#746e6b] text-[18px] select-none leading-none">
            ⠿
          </span>
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-[#746e6b] hover:text-[#251d1b] transition-colors"
            aria-label={expanded ? "Réduire" : "Développer"}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={`transition-transform ${expanded ? "rotate-90" : "rotate-0"}`}>
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h3 className="font-heading text-[#251d1b] text-[15px] font-bold">{category.title}</h3>
          <span className="font-body text-[#746e6b] text-[12px]">{items.length} prestation(s)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleCategory(category.id, !category.active)}
            className={`inline-flex items-center justify-center w-11 h-6 rounded-full transition-colors ${category.active ? "bg-[#44312b]" : "bg-[#dad5cd]"}`}
            aria-label={category.active ? "Désactiver" : "Activer"}
          >
            <span className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${category.active ? "translate-x-2.5" : "-translate-x-2.5"}`} />
          </button>
          <form action={() => deleteCategory(category.id)}
            onSubmit={(e) => { if (!confirm(`Supprimer "${category.title}" et toutes ses prestations ?`)) e.preventDefault(); }}>
            <button type="submit" className="font-body text-red-400 hover:text-red-600 text-[13px] transition-colors">
              Supprimer
            </button>
          </form>
        </div>
      </div>

      {/* Items with DnD */}
      {expanded && (
        <div className="px-5 py-4 flex flex-col gap-1">
          {items.length === 0 ? (
            <p className="font-body text-[#746e6b] text-[13px] text-center py-3">
              Aucune prestation. Ajoutez-en une ci-dessous.
            </p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleItemDragEnd}>
              <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                {items.map(item => <ItemRow key={item.id} item={item} categoryId={category.id} />)}
              </SortableContext>
            </DndContext>
          )}
          <NewItemForm categoryId={category.id} />
        </div>
      )}
    </div>
  );
}
