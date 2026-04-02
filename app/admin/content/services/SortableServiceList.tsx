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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={services.map(s => s.id)} strategy={verticalListSortingStrategy}>
            <table className="w-full">
              <thead className="bg-[#fbf8ef] border-b border-[#dad5cd]">
                <tr>
                  <th className="w-10 px-3 py-3" />
                  <th className="text-left font-heading text-[#251d1b] text-[13px] px-5 py-3">Service</th>
                  <th className="text-left font-heading text-[#251d1b] text-[13px] px-5 py-3 hidden sm:table-cell">Description</th>
                  <th className="text-center font-heading text-[#251d1b] text-[13px] px-5 py-3">Actif</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dad5cd]">
                {services.map(s => <ServiceRow key={s.id} service={s} />)}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
