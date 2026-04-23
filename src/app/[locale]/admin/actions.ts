"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { auth } from "@/auth";

export async function toggleToolPricing(enabled: boolean) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await db.siteSetting.upsert({
    where: { key: "tools_pricing_enabled" },
    update: { value: enabled ? "true" : "false" },
    create: { key: "tools_pricing_enabled", value: enabled ? "true" : "false" },
  });

  revalidatePath("/[locale]/admin", "layout");
}
