"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createService } from "@/app/actions/services";

export default function NewServiceForm() {
  const [state, action, pending] = useActionState(createService, undefined);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.success) { formRef.current?.reset(); setPreview(""); setImageUrl(""); }
  }, [state?.success]);

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
      else { alert(data.error ?? "Erreur lors de l'upload"); setPreview(""); }
    } catch { alert("Erreur réseau lors de l'upload"); setPreview(""); }
    finally { setUploading(false); }
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4">
      <input type="hidden" name="image" value={imageUrl} />

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-[#251d1b] text-[13px] font-medium">Titre *</label>
        <input name="title" required placeholder="Ex: Soins visage Phyt's"
          className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20" />
        {state?.errors?.title && <p className="text-red-500 text-[12px]">{state.errors.title[0]}</p>}
      </div>

      {/* Image upload with large preview */}
      <div className="flex flex-col gap-2">
        <label className="font-body text-[#251d1b] text-[13px] font-medium">Image</label>
        {preview ? (
          <div className="relative rounded-lg overflow-hidden bg-[#f5f1e8] border border-[#dad5cd]" style={{ height: 160 }}>
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            <button type="button" onClick={() => { setPreview(""); setImageUrl(""); }}
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
        <textarea name="description" required rows={3} placeholder="Description du service…"
          className="border border-[#dad5cd] rounded-lg px-3 py-2 font-body text-[14px] text-[#251d1b] focus:outline-none focus:border-[#cab3a0] focus:ring-2 focus:ring-[#cab3a0]/20 resize-none" />
        {state?.errors?.description && <p className="text-red-500 text-[12px]">{state.errors.description[0]}</p>}
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
