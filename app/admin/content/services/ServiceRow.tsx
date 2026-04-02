"use client";

import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteService, toggleService, updateService } from "@/app/actions/services";

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  active: boolean;
  order: number;
};

// Same logic as public ServicesSection fallback
function getAutoImage(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("visage")) return "/images/service-soins-visage.jpg";
  if (t.includes("massage")) return "/images/service-massages.jpg";
  if (t.includes("main") || t.includes("pied") || t.includes("manucure") || t.includes("pédicure")) return "/images/service-mains-pieds.jpg";
  if (t.includes("épil") || t.includes("epil")) return "/images/service-epilations.jpg";
  if (t.includes("teinture") || t.includes("sourcil") || t.includes("cil")) return "/images/service-teintures.jpg";
  return "/images/service-base.jpg";
}

function EditModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const effectiveImage = service.image || getAutoImage(service.title);
  const isAutoImage = !service.image;
  const [preview, setPreview] = useState<string>(effectiveImage);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(service.image ?? "");
  const [isCustom, setIsCustom] = useState(!isAutoImage);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setIsCustom(true);
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) setImageUrl(data.url);
      else { alert(data.error ?? "Erreur upload"); setPreview(service.image ?? ""); }
    } catch { alert("Erreur réseau"); setPreview(service.image ?? ""); }
    finally { setUploading(false); }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    fd.set("image", imageUrl);
    await updateService(service.id, undefined, fd);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 flex flex-col gap-5" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-[#251d1b] text-[18px] font-bold">Modifier le service</h3>
          <button onClick={onClose} className="font-body text-[#746e6b] hover:text-[#251d1b] text-[22px] leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Titre *</label>
            <input name="title" required defaultValue={service.title}
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>

          {/* Image with large preview */}
          <div className="flex flex-col gap-2">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Image</label>
            {preview ? (
              <div className="relative rounded-lg overflow-hidden bg-[#f5f1e8] border border-[#dad5cd]" style={{ height: 160 }}>
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                {!isCustom && (
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white font-body text-[11px] px-2 py-0.5 rounded-full">
                    Image automatique
                  </div>
                )}
                <button type="button" onClick={() => {
                  if (isCustom) {
                    setPreview(getAutoImage(service.title));
                    setImageUrl("");
                    setIsCustom(false);
                  } else {
                    setPreview("");
                    setImageUrl("");
                  }
                }}
                  className="absolute top-2 right-2 bg-white/90 text-[#251d1b] rounded-full w-7 h-7 flex items-center justify-center text-[14px] hover:bg-white shadow-sm">
                  ×
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileRef.current?.click()}
                className="h-[120px] rounded-lg border-2 border-dashed border-[#dad5cd] flex flex-col items-center justify-center gap-2 hover:border-[#cab3a0] hover:bg-[#fbf8ef] transition-colors">
                <span className="text-[28px]">📷</span>
                <span className="font-body text-[#746e6b] text-[12px]">Cliquez pour choisir une image</span>
                <span className="font-body text-[#cab3a0] text-[11px]">JPG, PNG, WebP — max 5 MB</span>
              </button>
            )}
            {preview && (
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                className="font-body text-[#44312b] text-[13px] underline underline-offset-2 hover:text-[#5a3f37] disabled:opacity-50 self-start">
                {uploading ? "Upload en cours…" : "Changer l'image"}
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Description *</label>
            <textarea name="description" required rows={3} defaultValue={service.description}
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 resize-none" />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="font-body text-[#746e6b] text-[14px] px-4 py-2 rounded-full border border-[#dad5cd] hover:bg-[#fbf8ef] transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={saving || uploading}
              className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-5 py-2 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ServiceRow({ service }: { service: Service }) {
  const [editing, setEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <>
      {editing && <EditModal service={service} onClose={() => setEditing(false)} />}
      <tr ref={setNodeRef} style={style} className="hover:bg-[#fbf8ef]/50 transition-colors">
        {/* Drag handle */}
        <td className="pl-3 pr-1 py-4">
          <span {...attributes} {...listeners}
            className="cursor-grab active:cursor-grabbing text-[#cab3a0] hover:text-[#746e6b] text-[18px] select-none block leading-none">
            ⠿
          </span>
        </td>
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            {service.image ? (
              <img src={service.image} alt={service.title}
                className="w-10 h-10 rounded-lg object-cover border border-[#dad5cd] shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#f5f1e8] border border-[#dad5cd] flex items-center justify-center shrink-0 text-[14px]">📷</div>
            )}
            <p className="font-heading text-[#251d1b] text-[14px] font-bold">{service.title}</p>
          </div>
        </td>
        <td className="px-5 py-4 hidden sm:table-cell">
          <p className="font-body text-[#746e6b] text-[13px] line-clamp-2">{service.description}</p>
        </td>
        <td className="px-5 py-4 text-center">
          <button
            onClick={() => toggleService(service.id, !service.active)}
            className={`inline-flex items-center justify-center w-11 h-6 rounded-full transition-colors ${service.active ? "bg-[#44312b]" : "bg-[#dad5cd]"}`}
            aria-label={service.active ? "Désactiver" : "Activer"}
          >
            <span className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${service.active ? "translate-x-2.5" : "-translate-x-2.5"}`} />
          </button>
        </td>
        <td className="px-5 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setEditing(true)} title="Modifier"
              className="text-[#44312b] hover:text-[#5a3f37] transition-colors p-1.5 rounded-lg hover:bg-[#f5f1e8]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <form action={() => deleteService(service.id)}
              onSubmit={(e) => { if (!confirm("Supprimer ce service ?")) e.preventDefault(); }}>
              <button type="submit" title="Supprimer"
                className="text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </td>
      </tr>
    </>
  );
}
