"use client";

import type { AnalyticsEventName } from "@/lib/analytics";
import type { Locale } from "@/lib/site";

export function trackClientEvent(input: {
  name: AnalyticsEventName;
  locale?: Locale;
  path?: string;
  payload?: Record<string, unknown>;
}) {
  const body = JSON.stringify({
    ...input,
    path: input.path ?? window.location.pathname,
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics", blob);
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
    keepalive: true,
  });
}
