import { db } from "@/lib/db";

const MAP_QUERY = encodeURIComponent("Taraya Institut, Waalsestraat 34, 1933 Sterrebeek");

async function getApiKey(): Promise<string> {
  try {
    const row = await db.siteSetting.findUnique({ where: { key: "google_maps_embed_url" } });
    return row?.value ?? "";
  } catch {
    return "";
  }
}

export default async function MapSection() {
  const apiKey = await getApiKey();
  if (!apiKey) return null;

  const src =
    `https://www.google.com/maps/embed/v1/place` +
    `?key=${apiKey}` +
    `&q=${MAP_QUERY}` +
    `&language=fr` +
    `&zoom=15`;

  return (
    <section id="localisation" aria-label="Notre localisation">
      <iframe
        src={src}
        width="100%"
        height="600"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Taraya Institut – Waalsestraat 34, 1933 Sterrebeek"
      />
    </section>
  );
}
