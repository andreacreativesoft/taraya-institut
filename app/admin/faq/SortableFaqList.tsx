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
import { reorderFaq } from "@/app/actions/faq";
import FaqRow from "./FaqRow";
import type { FaqItem } from "@prisma/client";

export default function SortableFaqList({ initialFaqs }: { initialFaqs: FaqItem[] }) {
  const [faqs, setFaqs] = useState(initialFaqs);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = faqs.findIndex(f => f.id === active.id);
    const newIdx = faqs.findIndex(f => f.id === over.id);
    const next = arrayMove(faqs, oldIdx, newIdx);
    setFaqs(next);
    reorderFaq(next.map(f => f.id));
  }

  if (faqs.length === 0) {
    return (
      <p className="font-body text-[#746e6b] text-[14px] text-center py-12">
        Aucune question pour l&apos;instant. Ajoutez-en une ci-dessous.
      </p>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 pl-2 pr-3 lg:px-5 py-2 bg-[#fbf8ef] border-b border-[#dad5cd]">
        <span className="w-5 shrink-0" />
        <span className="flex-1 font-heading text-[#251d1b] text-[13px]">Question</span>
        <span className="font-heading text-[#251d1b] text-[13px] shrink-0 w-11 text-center">Actif</span>
        <span className="w-24 shrink-0" />
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={faqs.map(f => f.id)} strategy={verticalListSortingStrategy}>
          <div>
            {faqs.map(f => <FaqRow key={f.id} faq={f} />)}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
