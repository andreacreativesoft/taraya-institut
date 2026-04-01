import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function parseDbUrl(url: string) {
  try {
    const u = new URL(url);
    return {
      host: u.hostname === "localhost" ? "127.0.0.1" : (u.hostname || "127.0.0.1"),
      port: u.port ? parseInt(u.port) : 3306,
      user: u.username || "root",
      password: u.password || "",
      database: u.pathname.replace(/^\//, "") || undefined,
    };
  } catch {
    return { host: "127.0.0.1", port: 3306, user: "root", password: "" };
  }
}

let _db: PrismaClient | null = null;

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  const config = url
    ? parseDbUrl(url)
    : { host: "127.0.0.1", port: 3306, user: "root", password: "", database: "placeholder" };
  const adapter = new PrismaMariaDb(config);
  return new PrismaClient({ adapter });
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!_db) {
      _db = createClient();
    }
    const val = (_db as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function" ? val.bind(_db) : val;
  },
});
