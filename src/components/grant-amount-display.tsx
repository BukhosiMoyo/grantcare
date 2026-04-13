import type { GrantAmountDetail } from "@/lib/official-resources";
import { cn } from "@/lib/utils";

type GrantAmountDisplayProps = {
  details: readonly GrantAmountDetail[];
  variant?: "compact" | "summary" | "table" | "panel";
  className?: string;
};

export function GrantAmountDisplay({
  details,
  variant = "compact",
  className,
}: GrantAmountDisplayProps) {
  if (details.length === 0) {
    return null;
  }

  if (variant === "summary") {
    if (details.length === 1) {
      return (
        <div className={cn("space-y-2", className)}>
          <div className="rounded-2xl border border-border bg-surface-muted px-4 py-3">
            <span className="inline-flex max-w-full rounded-full bg-surface-strong px-4 py-2 text-lg font-semibold text-primary sm:text-xl">
              {details[0].amount}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className={cn("space-y-2", className)}>
        {details.map((detail) => (
          <div key={detail.label} className="rounded-2xl border border-border bg-surface-muted px-4 py-3">
            <p className="text-sm font-medium text-muted">{detail.label}</p>
            <span className="mt-2 inline-flex max-w-full rounded-full bg-surface-strong px-4 py-2 text-lg font-semibold text-primary sm:text-xl">
              {detail.amount}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "panel") {
    if (details.length === 1) {
      return (
        <div className={className}>
          <p className="text-xl font-semibold text-primary sm:text-[1.7rem]">{details[0].amount}</p>
        </div>
      );
    }

    return (
      <div className={cn("grid gap-3 sm:grid-cols-3", className)}>
        {details.map((detail) => (
          <div key={detail.label} className="rounded-3xl border border-border bg-surface px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70 sm:text-sm">
              {detail.label}
            </p>
            <p className="mt-2 text-xl font-semibold text-primary sm:text-[1.4rem]">{detail.amount}</p>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    if (details.length === 1) {
      return (
        <p className={cn("text-lg font-semibold text-primary sm:text-xl", className)}>
          {details[0].amount}
        </p>
      );
    }

    return (
      <div className={cn("space-y-3", className)}>
        {details.map((detail) => (
          <div key={detail.label} className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/70 sm:text-sm">
              {detail.label}
            </p>
            <p className="text-lg font-semibold text-primary sm:text-xl">{detail.amount}</p>
          </div>
        ))}
      </div>
    );
  }

  if (details.length === 1) {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        <span className="inline-flex items-center rounded-full bg-surface-strong px-4 py-2 text-lg font-semibold text-primary sm:text-xl">
          {details[0].amount}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {details.map((detail) => (
        <div key={detail.label} className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary/70 sm:text-sm">
            {detail.label}
          </span>
          <span className="inline-flex items-center rounded-full bg-surface-strong px-4 py-2 text-lg font-semibold text-primary sm:text-xl">
            {detail.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
