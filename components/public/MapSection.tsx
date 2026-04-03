import { db } from "@/lib/db";

async function getMapSettings(): Promise<{ apiKey: string; pinTitle: string; address: string }> {
  try {
    const rows = await db.siteSetting.findMany({
      where: { key: { in: ["google_maps_embed_url", "google_maps_pin_title", "address"] } },
    });
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return {
      apiKey:   map.google_maps_embed_url ?? "",
      pinTitle: map.google_maps_pin_title ?? "Taraya Institut",
      address:  map.address              ?? "Waalsestraat 34, 1933 Sterrebeek",
    };
  } catch {
    return { apiKey: "", pinTitle: "Taraya Institut", address: "Waalsestraat 34, 1933 Sterrebeek" };
  }
}

export default async function MapSection() {
  const { apiKey, pinTitle, address } = await getMapSettings();
  if (!apiKey) return null;

  const q = encodeURIComponent(`${pinTitle}, ${address}`);

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
        title={`${pinTitle} – ${address}`}
      />
    </section>
  );
}
