"use client";

import { useState, useEffect } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site";

const MESSAGES = [
  "Analysing your role…",
  "Preparing strong answers…",
  "Customising for your experience level…",
  "Generating personalised tips…",
  "Finalising your interview guide…",
];

const LOCALIZED_MESSAGES: Partial<Record<Locale, string[]>> = {
  zu: [
    "Kuhlaziywa indima yakho…",
    "Kulungiswa izimpendulo eziqinile…",
    "Kwenziwa ngendlela yezinga lakho lolwazi…",
    "Kukhiqizwa amathiphu enzelwe wena…",
    "Kuphethwa umhlahlandlela wakho wenhlolokhono…",
  ],
};

const COPY: Partial<Record<Locale, {
  defaultTitle: string;
  errorTitle: string;
  retry: string;
}>> = {
  zu: {
    defaultTitle: "Kudalwa umhlahlandlela wakho wenhlolokhono…",
    errorTitle: "Kukhona okungahambanga kahle",
    retry: "Zama futhi",
  },
};

function getCopy(locale: Locale) {
  return {
    defaultTitle: "Creating your personalised interview guide…",
    errorTitle: "Something went wrong",
    retry: "Try Again",
    ...(COPY[locale] ?? {}),
  };
}

/**
 * Animated loading screen that cycles through messages
 * to build anticipation while the AI generates content.
 */
export function LoadingSequence({
  error,
  locale = DEFAULT_LOCALE,
  onRetry,
  messages,
  title,
}: {
  error?: string | null;
  locale?: Locale;
  onRetry?: () => void;
  messages?: string[];
  title?: string;
}) {
  const copy = getCopy(locale);
  const resolvedMessages = messages ?? LOCALIZED_MESSAGES[locale] ?? MESSAGES;
  const resolvedTitle = title ?? copy.defaultTitle;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (error) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev < resolvedMessages.length - 1) return prev + 1;
        return prev;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [error, resolvedMessages.length]);

  if (error) {
    return (
      <div className="loading-screen">
        <div className="flow-error">
          <span className="flow-error-icon">⚠️</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--foreground)" }}>
            {copy.errorTitle}
          </h2>
          <p>{error}</p>
          {onRetry && (
            <button className="flow-btn flow-btn-primary" onClick={onRetry} style={{ width: "auto", marginTop: "0.5rem" }}>
              {copy.retry}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-screen">
      <div className="loading-spinner" />
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1.5rem" }}>
          {resolvedTitle}
        </h2>
        <div className="loading-messages">
          {resolvedMessages.map((msg, i) => {
            let state: "pending" | "active" | "done" = "pending";
            if (i < activeIndex) state = "done";
            else if (i === activeIndex) state = "active";

            return (
              <div key={msg} className="loading-msg" data-state={state}>
                <span className="loading-msg-icon">
                  {state === "done" ? (
                    <span className="loading-msg-check" style={{ color: "var(--primary)" }}>✓</span>
                  ) : state === "active" ? (
                    <span style={{ opacity: 0.5 }}>○</span>
                  ) : (
                    <span style={{ opacity: 0.2 }}>○</span>
                  )}
                </span>
                <span>{msg}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
