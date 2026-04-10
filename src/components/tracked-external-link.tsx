"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { trackClientEvent } from "@/lib/analytics-client";
import type { AnalyticsEventName } from "@/lib/analytics";
import type { Locale } from "@/lib/site";

export function TrackedExternalLink({
  children,
  eventName,
  eventPayload,
  href,
  locale,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventName: AnalyticsEventName;
  eventPayload?: Record<string, unknown>;
  locale?: Locale;
}) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        trackClientEvent({
          name: eventName,
          locale,
          payload: {
            href,
            ...(eventPayload ?? {}),
          },
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
