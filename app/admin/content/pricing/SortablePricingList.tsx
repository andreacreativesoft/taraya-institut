"use client";

import { useState } from "react";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { reorderCategories } from "@/app/actions/pricing";
import CategoryCard, { type Category } from "./CategoryCard";

export default function SortablePricingList({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = categories.findIndex(c => c.id === active.id);
    const newIdx = categories.findIndex(c => c.id === over.id);
    const next = arrayMove(categories, oldIdx, newIdx);
    setCategories(next);
    await reorderCategories(next.map(c => c.id));
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#dad5cd] p-12 text-center">
        <p className="font-body text-[#746e6b] text-[14px]">
          Aucune catégorie pour l&apos;instant. Ajoutez-en une ci-dessous.
        </p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4">
          {categories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      </SortableContext>
    </DndContext>
  );
}
