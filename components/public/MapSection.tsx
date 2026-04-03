import { db } from "@/lib/db";

const DEFAULT_PIN  = "Taraya Institut";
const DEFAULT_ADDR = "Sterrebeek";

async function getMapSettings(): Promise<{ apiKey: string; pinTitle: string }> {
  try {
    const rows = await db.siteSetting.findMany({
      where: { key: { in: ["google_maps_embed_url", "google_maps_pin_title"] } },
    });
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return {
      apiKey:   map.google_maps_embed_url  ?? "",
      pinTitle: map.google_maps_pin_title  ?? DEFAULT_PIN,
    };
  } catch {
    return { apiKey: "", pinTitle: DEFAULT_PIN };
  }
}

export default async function MapSection() {
  const { apiKey, pinTitle } = await getMapSettings();
  if (!apiKey) return null;

  const q = encodeURIComponent(`${pinTitle || DEFAULT_PIN}, ${DEFAULT_ADDR}`);

  const src =
    `https://www.google.com/maps/embed/v1/place` +
    `?key=${apiKey}` +
    `&q=${q}` +
    `&language=fr` +
    `&zoom=15`;

  return (
    <section id="localisation" aria-label="Notre localisation">
      <iframe
        src={src}
        width="100%"
        height="600"
        style={{
          border: 0,
          display: "block",
          filter: "sepia(0.35) saturate(0.85) brightness(0.97) hue-rotate(-5deg)",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${pinTitle || DEFAULT_PIN} – Waalsestraat 34, 1933 Sterrebeek`}
      />
    </section>
  );
}
