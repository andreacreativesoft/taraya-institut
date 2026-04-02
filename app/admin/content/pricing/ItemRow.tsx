"use client";

import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteItem, updateItem } from "@/app/actions/pricing";

type Item = { id: string; label: string; price: string; order: number };

export default function ItemRow({ item, categoryId }: { item: Item; categoryId: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(item.label);
  const [price, setPrice] = useState(item.price);
  const [saving, setSaving] = useState(false);
  const labelRef = useRef<HTMLInputElement>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  function startEditing() {
    setEditing(true);
    setTimeout(() => labelRef.current?.focus(), 0);
  }

  function cancelEditing() {
    setLabel(item.label);
    setPrice(item.price);
    setEditing(false);
  }

  async function handleSave() {
    if (!label.trim()) return;
    setSaving(true);
    const fd = new FormData();
    fd.set("label", label.trim());
    fd.set("price", price.trim());
    fd.set("categoryId", categoryId);
    await updateItem(item.id, undefined, fd);
    setSaving(false);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); handleSave(); }
    if (e.key === "Escape") cancelEditing();
  }

  return (
    <div ref={setNodeRef} style={style}
      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#fbf8ef] transition-colors group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span {...attributes} {...listeners}
          className="cursor-grab active:cursor-grabbing text-[#dad5cd] hover:text-[#cab3a0] text-[16px] select-none leading-none shrink-0">
          ⠿
        </span>
        {editing ? (
          <input
            ref={labelRef}
            value={label}
            onChange={e => setLabel(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-0 border border-[#cab3a0] rounded px-2 py-0.5 font-body text-[#251d1b] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#cab3a0]/20"
          />
        ) : (
          <span
            className="font-body text-[#251d1b] text-[13px] truncate cursor-pointer"
            onClick={startEditing}
            title="Cliquer pour modifier"
          >
            {label}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-3">
        {editing ? (
          <>
            <input
              value={price}
              onChange={e => setPrice(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: 35 EUR"
              className="w-24 border border-[#cab3a0] rounded px-2 py-0.5 font-heading text-[#44312b] text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-[#cab3a0]/20"
            />
            <button onClick={handleSave} disabled={saving}
              className="font-body text-green-600 hover:text-green-700 text-[13px] transition-colors disabled:opacity-50">
              {saving ? "…" : "✓"}
            </button>
            <button onClick={cancelEditing}
              className="font-body text-[#746e6b] hover:text-[#251d1b] text-[13px] transition-colors">
              ✕
            </button>
          </>
        ) : (
          <>
            <span
              className="font-heading text-[#44312b] text-[13px] font-bold cursor-pointer"
              onClick={startEditing}
              title="Cliquer pour modifier"
            >
              {price}
            </span>
            <button onClick={startEditing}
              className="font-body text-[#44312b] hover:text-[#5a3f37] text-[12px] transition-colors">
              Modifier
            </button>
            <form action={() => deleteItem(item.id)}
              onSubmit={(e) => { if (!confirm("Supprimer cette prestation ?")) e.preventDefault(); }}>
              <button type="submit"
                className="font-body text-red-400 hover:text-red-600 text-[12px] transition-colors">
                Supprimer
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
