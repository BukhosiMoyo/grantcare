"use client";

import { useState, useEffect } from "react";

const MESSAGES = [
  "Analysing your role…",
  "Preparing strong answers…",
  "Customising for your experience level…",
  "Generating personalised tips…",
  "Finalising your interview guide…",
];

/**
 * Animated loading screen that cycles through messages
 * to build anticipation while the AI generates content.
 */
export function LoadingSequence({
  error,
  onRetry,
  messages = MESSAGES,
  title = "Creating your personalised interview guide…",
}: {
  error?: string | null;
  onRetry?: () => void;
  messages?: string[];
  title?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (error) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [error, messages.length]);

  if (error) {
    return (
      <div className="loading-screen">
        <div className="flow-error">
          <span className="flow-error-icon">⚠️</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--foreground)" }}>
            Something went wrong
          </h2>
          <p>{error}</p>
          {onRetry && (
            <button className="flow-btn flow-btn-primary" onClick={onRetry} style={{ width: "auto", marginTop: "0.5rem" }}>
              Try Again
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
          {title}
        </h2>
        <div className="loading-messages">
          {messages.map((msg, i) => {
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
