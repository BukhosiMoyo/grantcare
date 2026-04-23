"use client";

import type { ReactNode } from "react";

/**
 * Full-screen centered container for one question in the flow.
 * Handles animated entrance and consistent layout.
 */
export function FlowScreen({
  question,
  subtitle,
  children,
  onBack,
}: {
  question: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
}) {
  return (
    <>
      {onBack && (
        <button className="flow-back" onClick={onBack} type="button" aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div className="flow-screen" key={question}>
        <div className="flow-screen-inner">
          <div className="flow-question">
            <h2>{question}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
