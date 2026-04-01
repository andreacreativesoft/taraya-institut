import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function parseDbUrl(url: string) {
  // Parse mysql://user:pass@host:port/dbname into mariadb PoolConfig
  try {
    const u = new URL(url);
    return {
      host: u.hostname || "127.0.0.1",
      port: u.port ? parseInt(u.port) : 3306,
      user: u.username || "root",
      password: u.password || "",
      database: u.pathname.replace(/^\//, "") || undefined,
    };
  } catch {
    return { host: "127.0.0.1", port: 3306, user: "root", password: "" };
  }
}

function createClient() {
  const url = process.env.DATABASE_URL;
  const config = url
    ? parseDbUrl(url)
    : { host: "127.0.0.1", port: 3306, user: "root", password: "", database: "placeholder" };

  const adapter = new PrismaMariaDb(config);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error"] : [],
  });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
