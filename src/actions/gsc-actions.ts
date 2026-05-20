"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { getGscConfig, queryGscData, type GscPerformanceSummary } from "@/lib/google-gsc";

/**
 * Saves Google Search Console Connection Credentials
 */
export async function saveGscCredentials(propertyUrl: string, serviceAccountKeyJson: string) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  // Validate propertyUrl
  const trimmedUrl = propertyUrl.trim();
  if (!trimmedUrl) {
    throw new Error("Property URL is required.");
  }

  // Validate JSON key
  let parsedKey: Record<string, unknown>;
  try {
    parsedKey = JSON.parse(serviceAccountKeyJson.trim()) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid Service Account JSON credentials (JSON parse error).");
  }

  if (!parsedKey || typeof parsedKey !== "object" || !parsedKey.client_email || !parsedKey.private_key) {
    throw new Error("Service Account JSON must contain client_email and private_key keys.");
  }

  // Save to database
  await db.$transaction([
    db.siteSetting.upsert({
      where: { key: "gsc_property_url" },
      update: { value: trimmedUrl },
      create: { key: "gsc_property_url", value: trimmedUrl },
    }),
    db.siteSetting.upsert({
      where: { key: "gsc_service_account_key" },
      update: { value: serviceAccountKeyJson.trim() },
      create: { key: "gsc_service_account_key", value: serviceAccountKeyJson.trim() },
    }),
  ]);

  revalidatePath("/[locale]/admin/seo", "page");
  return { success: true };
}

/**
 * Disconnects GSC connection by clearing database configurations
 */
export async function disconnectGsc() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await db.siteSetting.deleteMany({
    where: {
      key: {
        in: ["gsc_property_url", "gsc_service_account_key"],
      },
    },
  });

  revalidatePath("/[locale]/admin/seo", "page");
  return { success: true };
}

/**
 * Retrieves the GSC Dashboard organic visibility report
 */
export async function getGscDashboardReport(days: number = 7): Promise<{
  success: boolean;
  error?: string;
  config?: { propertyUrl: string; isConnected: boolean };
  report?: GscPerformanceSummary;
}> {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const config = await getGscConfig();
  if (!config.isConnected) {
    return {
      success: false,
      config: { propertyUrl: config.propertyUrl, isConnected: false },
      error: "Google Search Console is not connected yet.",
    };
  }

  try {
    const report = await queryGscData(days);
    return {
      success: true,
      config: { propertyUrl: config.propertyUrl, isConnected: true },
      report,
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("GSC server query error:", err);
    return {
      success: false,
      config: { propertyUrl: config.propertyUrl, isConnected: true },
      error: err.message || "Failed to query Google Search Console API.",
    };
  }
}
