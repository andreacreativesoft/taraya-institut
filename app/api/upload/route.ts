import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  await requireSession();

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Format non supporté (JPG, PNG, WebP, GIF uniquement)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `services/${Date.now()}.${ext}`;

  const blob = await put(filename, file, { access: "public" });

  return NextResponse.json({ url: blob.url });
}
