import { Prisma } from "@prisma/client";

import { db } from "@/lib/prisma";
import { isDatabaseConfigured, isProductionServer } from "@/lib/server-env";

const DEV_DATABASE_CHECK_TTL_MS = 15000;

let devDatabaseCheckPromise: Promise<boolean> | null = null;
let devDatabaseCheckedAt = 0;

export function isRecoverableDatabaseError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  const message = error instanceof Error ? error.message : String(error);

  return /authentication failed against database server|can't reach database server|connect|econnrefused|p1000|p1001|p1017/i.test(
    message,
  );
}

export function markDatabaseUnavailable() {
  devDatabaseCheckedAt = Date.now();
  devDatabaseCheckPromise = Promise.resolve(false);
}

export async function canQueryDatabase() {
  if (!isDatabaseConfigured()) {
    return false;
  }

  if (isProductionServer()) {
    return true;
  }

  const now = Date.now();
  if (devDatabaseCheckPromise && now - devDatabaseCheckedAt < DEV_DATABASE_CHECK_TTL_MS) {
    return devDatabaseCheckPromise;
  }

  devDatabaseCheckedAt = now;
  devDatabaseCheckPromise = db
    .$queryRawUnsafe("SELECT 1")
    .then(() => true)
    .catch((error) => {
      if (isRecoverableDatabaseError(error)) {
        return false;
      }

      throw error;
    });

  return devDatabaseCheckPromise;
}
