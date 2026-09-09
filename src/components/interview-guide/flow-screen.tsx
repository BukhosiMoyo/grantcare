"use client";

import type { ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site";

/**
 * Full-screen centered container for one question in the flow.
 * Handles animated entrance and consistent layout.
 */
export function FlowScreen({
  question,
  subtitle,
  children,
  locale = DEFAULT_LOCALE,
  onBack,
}: {
  question: string;
  subtitle?: string;
  children: ReactNode;
  locale?: Locale;
  onBack?: () => void;
}) {
  const backLabel = locale === "zu" ? "Buyela emuva" : "Go back";

  return (
    <>
      {onBack && (
        <button className="flow-back" onClick={onBack} type="button" aria-label={backLabel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div className="flow-screen" key={question}>
        <div className="flow-screen-inner">
          <div className="flow-question">
            <h1>{question}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
