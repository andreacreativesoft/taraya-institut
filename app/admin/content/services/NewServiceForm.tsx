"use client";

import { useActionState, useRef, useState } from "react";
import { createService } from "@/app/actions/services";

export default function NewServiceForm() {
  const [state, action, pending] = useActionState(createService, undefined);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
      if (data.url) {
        setImageUrl(data.url);
      } else {
        alert(data.error ?? "Erreur lors de l'upload");
        setPreview("");
      }
    } catch {
      alert("Erreur réseau lors de l'upload");
      setPreview("");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="image" value={imageUrl} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Titre *</label>
          <input name="title" required placeholder="Ex: Soins visage Phyt's"
            className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
          {state?.errors?.title && <p className="text-red-500 text-[12px]">{state.errors.title[0]}</p>}
        </div>

        {/* Image upload */}
        <div className="flex flex-col gap-1.5">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Image</label>
          <div className="flex items-center gap-3">
            {preview ? (
              <img src={preview} alt="preview"
                className="w-14 h-14 rounded-lg object-cover border border-[#dad5cd] shrink-0" />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-[#f5f1e8] border border-[#dad5cd] flex items-center justify-center shrink-0">
                <span className="text-[#cab3a0] text-[20px]">📷</span>
              </div>
            )}
            <div className="flex flex-col gap-1 min-w-0">
              <button type="button" onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="text-left font-body text-[#44312b] text-[13px] underline underline-offset-2 hover:text-[#5a3f37] disabled:opacity-50">
                {uploading ? "Upload en cours…" : preview ? "Changer l'image" : "Choisir une image"}
              </button>
              {imageUrl && <p className="font-body text-[#746e6b] text-[11px] truncate">✓ Image uploadée</p>}
              <p className="font-body text-[#746e6b] text-[11px]">JPG, PNG, WebP — max 5 MB</p>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[#251d1b] text-[13px] font-medium">Description *</label>
        <textarea name="description" required rows={3} placeholder="Description du service…"
          className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 resize-none" />
        {state?.errors?.description && <p className="text-red-500 text-[12px]">{state.errors.description[0]}</p>}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-1.5 w-[100px]">
          <label className="font-body text-[#251d1b] text-[13px] font-medium">Ordre</label>
          <input name="order" type="number" defaultValue={0}
            className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0]" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer mt-5">
          <input name="active" type="checkbox" defaultChecked className="w-4 h-4 accent-[#44312b]" />
          <span className="font-body text-[#251d1b] text-[14px]">Actif</span>
        </label>
      </div>

      {state?.success && <p className="text-green-600 font-body text-[13px]">✓ Service ajouté avec succès</p>}

      <div className="flex justify-end">
        <button type="submit" disabled={pending || uploading}
          className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[14px] px-5 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors disabled:opacity-60">
          {pending ? "Ajout…" : "Ajouter le service"}
        </button>
      </div>
    </form>
  );
}
