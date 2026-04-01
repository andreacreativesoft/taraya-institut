import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/images");

const assets = [
  // Hero
  ["97fe768a-1eaf-4ad2-a88d-4dc1d54754e5", "logo.png"],
  ["adaf3401-ed9f-4ec7-a9c9-300cf7195e7f", "hero-bg.jpg"],
  ["58b5c638-2aaa-4e16-9d52-0b0715b4811b", "icon-phone.png"],
  // About
  ["900e9e4f-2364-49a0-8ecf-09ec07479c86", "about-1.jpg"],
  ["2d0cb25b-abaf-4998-91f6-6db7aa4c6efa", "about-2.jpg"],
  // ForWho
  ["20819161-8c35-442a-9b6f-7547e416e5c0", "forwho-1.jpg"],
  ["278921ec-8554-4d6a-804f-3f5d4fc1c7fe", "forwho-2.jpg"],
  ["c16ed702-a40d-4e70-8382-9e08fbdcfbb4", "icon-face.png"],
  ["48faa28a-4293-46b3-ac58-3af4dc11b925", "icon-fire.png"],
  ["7eb5fde9-9a0d-430d-8ec2-1ce2181bf2ca", "icon-heart.png"],
  // Services
  ["674ef38c-cd52-43bb-9938-6ba435a0bf0a", "service-base.jpg"],
  ["eda1f7d6-16f7-45d3-b7eb-99c7546f028b", "service-soins-visage.jpg"],
  ["eff62901-856e-46c4-8759-5cec77ad51ca", "service-massages.jpg"],
  ["549a1d6c-f5fd-4f6b-acc8-69159f493193", "service-mains-pieds.jpg"],
  ["100ddfd1-6995-45a6-9fa2-a62255e1ee7c", "service-epilations.jpg"],
  ["404c1e8a-b944-4962-bf73-29c5feef9708", "service-teintures.jpg"],
  // Pedicure
  ["5734c66b-51d2-438c-9e45-5b2af73a7551", "pedicure-1.jpg"],
  ["96f9cc95-6dd4-4cfe-918f-264189d4eae5", "pedicure-2.jpg"],
  ["880c5f24-63f4-46e6-a6f2-adde977d5917", "icon-globe.png"],
  ["0cdaff54-20a3-4312-a905-697de1c345ec", "icon-circle-plus.png"],
  // Pricing ornaments
  ["c3a489b9-dee2-4967-8a17-741d70273ed4", "pricing-ornament-bl.png"],
  ["96325518-ee7b-496f-8ad9-53234333b087", "pricing-ornament-tr.png"],
  // WhyUs
  ["9fc64b44-6c5e-4944-b121-cb558280b383", "whyus-1.jpg"],
  ["433b12e7-1b9d-4f00-a8bd-055d658a63fa", "whyus-2.jpg"],
  ["142897c6-7270-4ab3-93cb-bf3c9bf14544", "whyus-3.jpg"],
  ["2a650199-97e7-4ec5-803c-6244d1fb9c1b", "whyus-4.jpg"],
  ["08b5eadb-f64e-4d15-b1ee-ad2ff34cfd6d", "icon-star.png"],
  ["25f106cc-be53-40dd-9a21-b38c2609f933", "icon-zoom.png"],
  ["6ac39f18-ab0b-42e1-98b7-850dd86023a4", "icon-receipt.png"],
  ["2db983f2-9b0b-464b-87bf-ce6688b8821b", "icon-home.png"],
  ["f37da23d-3c02-493c-b06b-a7ae732bd16a", "icon-heart-why.png"],
  // Partner
  ["904fc68e-c608-4810-916e-149c200d1475", "partner-phyts.jpg"],
  ["c19af2ee-baa3-4b55-b8fe-79bfaf61fa69", "icon-chevron.png"],
  // CTA ornaments
  ["440e9159-6b0a-4893-8be9-a7f27ca5e5b1", "cta-ornament-right.png"],
  ["7105c73d-af2b-46ea-bbef-0ebde19d8bcb", "cta-ornament-left.png"],
  // Footer
  ["7762ddab-17b7-4e5d-b1b8-8fdaaab8bfb3", "footer-logo.png"],
  ["d2aab8a2-cb8b-4dc3-9b3e-2dc06eafbdac", "icon-instagram.png"],
  ["8fa8e665-85e9-4c27-a5cc-2ff9f2630bfc", "icon-facebook.png"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      resolve(res);
    }).on("error", reject);
  });
}

async function download(id, filename, retries = 8, delay = 2000) {
  const dest = path.join(OUT_DIR, filename);
  const url = `https://www.figma.com/api/mcp/asset/${id}`;

  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await getUrl(url);

    // Follow redirects
    if (res.statusCode >= 301 && res.statusCode <= 308 && res.headers.location) {
      res.resume();
      const redirRes = await getUrl(res.headers.location);
      if (redirRes.statusCode === 200) {
        await saveStream(redirRes, dest);
        return filename;
      }
      redirRes.resume();
    }

    if (res.statusCode === 200) {
      await saveStream(res, dest);
      return filename;
    }

    // 202 = still processing, retry after delay
    res.resume();
    if (res.statusCode === 202) {
      await sleep(delay);
      delay = Math.min(delay * 1.5, 10000);
      continue;
    }

    throw new Error(`${filename}: HTTP ${res.statusCode}`);
  }

  throw new Error(`${filename}: timed out after ${retries} retries`);
}

function saveStream(res, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on("finish", () => { file.close(); resolve(); });
    file.on("error", reject);
  });
}

fs.mkdirSync(OUT_DIR, { recursive: true });

console.log(`Downloading ${assets.length} assets…`);

const results = await Promise.allSettled(
  assets.map(([id, name]) => download(id, name))
);

let ok = 0, fail = 0;
results.forEach((r) => {
  if (r.status === "fulfilled") { console.log("✓", r.value); ok++; }
  else { console.error("✗", r.reason?.message ?? r.reason); fail++; }
});

console.log(`\nDone: ${ok} ok, ${fail} failed`);
