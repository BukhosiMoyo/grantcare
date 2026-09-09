import type { ReactNode } from "react";

import { GrantAmountDisplay } from "@/components/grant-amount-display";
import { Card } from "@/components/ui";
import type { GrantAmountDetail } from "@/lib/official-resources";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

type PaymentSummaryState = "expected" | "pending" | "portal-only";

type PaymentSummaryCopy = {
  paymentEstimate: string;
  paymentPending: string;
  paymentPortalOnly: string;
};

type GrantSummaryCardProps = {
  amountDetails: readonly GrantAmountDetail[] | null;
  amountLabel: string;
  amountPendingText?: string;
  className?: string;
  footer?: ReactNode;
  locale?: Locale;
  payDayLabel: string;
  payDayText: string;
  statusText: string;
  title: string;
};

export function getPaymentSummaryStatusText(
  copy: PaymentSummaryCopy,
  state: PaymentSummaryState,
) {
  if (state === "expected") {
    return copy.paymentEstimate;
  }

  if (state === "pending") {
    return copy.paymentPending;
  }

  return copy.paymentPortalOnly;
}

export function getPaymentSummaryDayText(
  copy: PaymentSummaryCopy,
  input: {
    date: string | null;
    grantSlug?: string;
    locale?: Locale;
    month?: number;
    state: PaymentSummaryState;
    year?: number;
  },
) {
  if (input.date) {
    return input.date;
  }

  if (input.state === "pending") {
    return copy.paymentPending;
  }

  return copy.paymentPortalOnly;
}

export function GrantSummaryCard({
  amountDetails,
  amountLabel,
  amountPendingText,
  className,
  footer,
  locale = DEFAULT_LOCALE,
  payDayLabel,
  payDayText,
  statusText,
  title,
}: GrantSummaryCardProps) {
  return (
    <Card className={cn("space-y-4", className)}>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-base text-muted">{statusText}</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)]">
        <div className="rounded-3xl border border-border bg-surface px-4 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
            {payDayLabel}
          </p>
          <p className="mt-3 break-words text-2xl font-semibold text-primary sm:text-[2rem]">{payDayText}</p>
        </div>

        <div className="rounded-3xl border border-border bg-surface px-4 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
            {amountLabel}
          </p>
          {amountDetails ? (
            <GrantAmountDisplay details={amountDetails} variant="summary" className="mt-3" />
          ) : (
            <p className="mt-3 text-lg font-semibold text-primary">
              {amountPendingText ?? (locale === "zu" ? "Imali isalindile" : locale === "tn" ? "Madi a sa ntse a emetswe" : locale === "xh" ? "Imali isalindile" : "Amount pending")}
            </p>
          )}
        </div>
      </div>

      {footer ? <div className="space-y-3">{footer}</div> : null}
    </Card>
  );
}
