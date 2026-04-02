"use client";

import { useRef, useState } from "react";

export function useImageUpload(initial = "") {
  const [preview, setPreview] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(initial);
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
        setUrl(data.url);
      } else {
        alert(data.error ?? "Erreur lors de l'upload");
        setPreview(initial);
      }
    } catch {
      alert("Erreur réseau lors de l'upload");
      setPreview(initial);
    } finally {
      setUploading(false);
    }
  }

  function clear() {
    setPreview("");
    setUrl("");
  }

  return { preview, uploading, url, fileRef, handleFile, clear, setPreview, setUrl };
}
