import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Card } from "@/components/ui";

export function AuthShell({
  eyebrow,
  title,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-5xl py-2 sm:py-4">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-8">
        <div className="flex flex-col items-center gap-4 px-1 pt-2 text-center lg:items-start lg:justify-center lg:pt-8 lg:text-left">
          <div className="surface-card rounded-[1.75rem] p-3 sm:p-3.5">
            <BrandLogo variant="icon" priority className="h-14 w-14 sm:h-16 sm:w-16" />
          </div>
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70 sm:text-sm">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="max-w-[14ch] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
          </div>
        </div>

        <Card className="rounded-[1.75rem] p-5 sm:p-7 lg:p-8">
          <div className="space-y-6">
            {children}
            {footer ? <div className="text-sm text-muted">{footer}</div> : null}
          </div>
        </Card>
      </div>
    </section>
  );
}
