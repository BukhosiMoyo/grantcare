"use client";

import { useState } from "react";

export function UnlockButton({ generationId, locale }: { generationId: string; locale: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tools/interview-guide/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generationId, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="focus-ring tap-target inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-[18px] font-semibold transition-all primary-action bg-primary text-white hover:bg-primary-strong shadow-[0_4px_12px_-4px_rgba(23,76,60,0.3)] hover:shadow-[0_6px_20px_-6px_rgba(23,76,60,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Processing…
        </span>
      ) : (
        "Unlock Now — R49"
      )}
    </button>
  );
}
