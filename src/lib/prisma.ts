import { PrismaClient } from "@prisma/client";

declare global {
  var __grantcare_prisma__: PrismaClient | undefined;
}

export const db =
  globalThis.__grantcare_prisma__ ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__grantcare_prisma__ = db;
}
