"use client";

import { useTransition } from "react";
import type { Locale } from "@/lib/site";
import { toggleToolPricing } from "./actions";

const ZU_PRICING_COPY: Record<string, string> = {
  "Premium Tools Pricing": "Intengo Yamathuluzi Aphambili",
  "Enable or disable the paywall for Email Templates and Interview Guides.":
    "Vula noma uvale i-paywall yama-Email Templates nama-Interview Guides.",
};

function pricingCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_PRICING_COPY[text] ?? text) : text;
}

export function PricingToggle({ isEnabled, locale }: { isEnabled: boolean; locale: Locale }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {pricingCopy(locale, "Premium Tools Pricing")}
        </p>
        <p className="text-xs text-muted">
          {pricingCopy(locale, "Enable or disable the paywall for Email Templates and Interview Guides.")}
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
