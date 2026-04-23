"use client";

import { useTransition } from "react";
import { toggleToolPricing } from "./actions";

export function PricingToggle({ isEnabled }: { isEnabled: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          Premium Tools Pricing
        </p>
        <p className="text-xs text-muted">
          Enable or disable the paywall for Email Templates and Interview Guides.
        </p>
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            toggleToolPricing(!isEnabled);
          });
        }}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isEnabled ? "bg-[#25D366]" : "bg-muted"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
