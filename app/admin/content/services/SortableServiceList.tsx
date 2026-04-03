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
import { reorderServices } from "@/app/actions/services";
import ServiceRow, { type Service } from "./ServiceRow";

export default function SortableServiceList({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = services.findIndex(s => s.id === active.id);
    const newIdx = services.findIndex(s => s.id === over.id);
    const next = arrayMove(services, oldIdx, newIdx);
    setServices(next);
    reorderServices(next.map(s => s.id));
  }

  return (
    <div className="bg-white rounded-xl border border-[#dad5cd] overflow-hidden">
      {services.length === 0 ? (
        <p className="font-body text-[#746e6b] text-[14px] text-center py-12">
          Aucun service pour l&apos;instant. Ajoutez-en un ci-dessous.
        </p>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 pl-2 pr-3 lg:px-5 py-2 bg-[#fbf8ef] border-b border-[#dad5cd]">
            <span className="w-5 shrink-0" />
            <span className="w-12 shrink-0 hidden sm:block" />
            <span className="flex-1 font-heading text-[#251d1b] text-[13px]">Service</span>
            <span className="font-heading text-[#251d1b] text-[13px] shrink-0 w-11 text-center">Actif</span>
            <span className="w-16 shrink-0" />
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={services.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <div className="divide-y divide-[#dad5cd]">
                {services.map(s => <ServiceRow key={s.id} service={s} />)}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}
    </div>
  );
}
