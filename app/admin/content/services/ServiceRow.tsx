"use client";

import { useRef, useState } from "react";
import { deleteService, toggleService, updateService } from "@/app/actions/services";

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  active: boolean;
  order: number;
};

function EditModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [preview, setPreview] = useState<string>(service.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(service.image ?? "");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
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
          <button onClick={onClose} className="font-body text-[#746e6b] hover:text-[#251d1b] text-[20px] leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Titre *</label>
            <input name="title" required defaultValue={service.title}
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Image</label>
            <div className="flex items-center gap-3">
              {preview ? (
                <img src={preview} alt="preview"
                  className="w-16 h-16 rounded-lg object-cover border border-[#dad5cd] shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-[#f5f1e8] border border-[#dad5cd] flex items-center justify-center shrink-0">
                  <span className="text-[#cab3a0] text-[22px]">📷</span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="text-left font-body text-[#44312b] text-[13px] underline underline-offset-2 hover:text-[#5a3f37] disabled:opacity-50">
                  {uploading ? "Upload en cours…" : preview ? "Changer l'image" : "Choisir une image"}
                </button>
                <p className="font-body text-[#746e6b] text-[11px]">JPG, PNG, WebP — max 5 MB</p>
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[#251d1b] text-[13px] font-medium">Description *</label>
            <textarea name="description" required rows={3} defaultValue={service.description}
              className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 resize-none" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1.5 w-[80px]">
              <label className="font-body text-[#251d1b] text-[13px] font-medium">Ordre</label>
              <input name="order" type="number" defaultValue={service.order}
                className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0]" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer mt-5">
              <input name="active" type="checkbox" defaultChecked={service.active} className="w-4 h-4 accent-[#44312b]" />
              <span className="font-body text-[#251d1b] text-[14px]">Actif</span>
            </label>
          </div>

          <div className="flex justify-end gap-3">
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

  return (
    <>
      {editing && <EditModal service={service} onClose={() => setEditing(false)} />}
      <tr className="hover:bg-[#fbf8ef]/50 transition-colors">
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            {service.image ? (
              <img src={service.image} alt={service.title}
                className="w-10 h-10 rounded-lg object-cover border border-[#dad5cd] shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#f5f1e8] border border-[#dad5cd] flex items-center justify-center shrink-0 text-[14px]">📷</div>
            )}
            <div>
              <p className="font-heading text-[#251d1b] text-[14px] font-bold">{service.title}</p>
              <p className="font-body text-[#746e6b] text-[12px] mt-0.5 sm:hidden line-clamp-1">{service.description}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-4 hidden sm:table-cell">
          <p className="font-body text-[#746e6b] text-[13px] line-clamp-2">{service.description}</p>
        </td>
        <td className="px-5 py-4 text-center">
          <button
            onClick={() => toggleService(service.id, !service.active)}
            className={`inline-flex items-center justify-center w-11 h-6 rounded-full transition-colors ${
              service.active ? "bg-[#44312b]" : "bg-[#dad5cd]"
            }`}
            aria-label={service.active ? "Désactiver" : "Activer"}
          >
            <span className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
              service.active ? "translate-x-2.5" : "-translate-x-2.5"
            }`} />
          </button>
        </td>
        <td className="px-5 py-4 text-right">
          <div className="flex items-center justify-end gap-3">
            <button onClick={() => setEditing(true)}
              className="font-body text-[#44312b] hover:text-[#5a3f37] text-[13px] transition-colors">
              Modifier
            </button>
            <form action={() => deleteService(service.id)}
              onSubmit={(e) => { if (!confirm("Supprimer ce service ?")) e.preventDefault(); }}>
              <button type="submit"
                className="font-body text-red-400 hover:text-red-600 text-[13px] transition-colors">
                Supprimer
              </button>
            </form>
          </div>
        </td>
      </tr>
    </>
  );
}
