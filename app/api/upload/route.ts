import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png":  "png",
  "image/webp": "webp",
  "image/gif":  "gif",
};

export async function POST(request: Request): Promise<NextResponse> {
  await requireSession();

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 5 MB)" }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Format non supporté (JPG, PNG, WebP, GIF uniquement)" }, { status: 400 });
  }

  const filename = `${crypto.randomUUID()}.${ext}`;
  const uploadDir = join(process.cwd(), "public", "uploads", "services");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(uploadDir, filename), buffer);

  const url = `/uploads/services/${filename}`;
  return NextResponse.json({ url });
}
