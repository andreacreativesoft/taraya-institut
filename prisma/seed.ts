import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

function parseDbUrl(url: string) {
  const u = new URL(url);
  return {
    host: u.hostname || "127.0.0.1",
    port: u.port ? parseInt(u.port) : 3306,
    user: u.username || "root",
    password: u.password || "",
    database: u.pathname.replace(/^\//, "") || undefined,
  };
}

const adapter = new PrismaMariaDb(parseDbUrl(process.env.DATABASE_URL!));
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database…");

  // ─── Super Admin ──────────────────────────────────────────────────────────
  const email = process.env.SEED_EMAIL ?? "admin@taraya-institut.fr";
  const password = process.env.SEED_PASSWORD ?? "Taraya2024!";

  const existing = await db.user.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 12);
    await db.user.create({
      data: { email, password: hashed, name: "Super Admin", role: "SUPER_ADMIN" },
    });
    console.log(`✅ Super Admin created: ${email}`);
  } else {
    console.log(`ℹ️  Super Admin already exists: ${email}`);
  }

  // ─── Default site settings ────────────────────────────────────────────────
  const defaults: Record<string, string> = {
    phone: "+33 6 00 00 00 00",
    whatsapp: "+33600000000",
    email: "contact@taraya-institut.fr",
    address: "Paris, France",
    instagram: "",
    facebook: "",
    hero_title: "Votre soin beauté sur mesure",
    hero_subtitle: "Institut de beauté certifié Phyt's",
    meta_title: "Taraya Institut – Soins beauté",
    meta_description: "Institut de beauté certifié Phyt's. Soins visage, massages, épilations et plus.",
  };

  for (const [key, value] of Object.entries(defaults)) {
    await db.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log("✅ Default site settings seeded");

  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
