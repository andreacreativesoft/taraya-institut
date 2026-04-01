import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function parseDbUrl(url: string) {
  try {
    const u = new URL(url);
    return {
      host: u.hostname || "127.0.0.1",
      port: u.port ? parseInt(u.port) : 3306,
      user: decodeURIComponent(u.username) || "root",
      password: decodeURIComponent(u.password) || "",
      database: u.pathname.replace(/^\//, "") || undefined,
      connectionLimit: 5,
      connectTimeout: 20000,
      acquireTimeout: 20000,
      idleTimeout: 30000,
    };
  } catch {
    return {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      connectionLimit: 5,
      connectTimeout: 20000,
    };
  }
}

function createClient() {
  const url = process.env.DATABASE_URL;
  const config = url
    ? parseDbUrl(url)
    : { host: "127.0.0.1", port: 3306, user: "root", password: "", database: "placeholder", connectionLimit: 5 };

  const adapter = new PrismaMariaDb(config);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error"] : [],
  });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
