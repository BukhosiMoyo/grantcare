"use client";

import { useEffect } from "react";

import { trackClientEvent } from "@/lib/analytics-client";
import type { AnalyticsEventName } from "@/lib/analytics";
import type { Locale } from "@/lib/site";

export function PageViewTracker({
  name,
  locale,
  payload,
}: {
  name: AnalyticsEventName;
  locale: Locale;
  payload?: Record<string, unknown>;
}) {
  const serializedPayload = JSON.stringify(payload ?? {});

  useEffect(() => {
    trackClientEvent({
      name,
      locale,
      payload: serializedPayload ? (JSON.parse(serializedPayload) as Record<string, unknown>) : undefined,
    });
  }, [locale, name, serializedPayload]);

  return null;
}
