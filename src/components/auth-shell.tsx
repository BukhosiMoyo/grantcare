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
    <section className="auth-layout">
      <div>
        <div className="auth-heading">
          <div className="rounded-2xl bg-surface-strong p-3">
            <BrandLogo variant="icon" priority className="h-14 w-14 sm:h-16 sm:w-16" />
          </div>
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70 sm:text-sm">
                {eyebrow}
              </p>
            ) : null}
            <h1>
              {title}
            </h1>
          </div>
        </div>

        <Card className="p-5 sm:p-8">
          <div className="space-y-6">
            {children}
            {footer ? <div className="text-sm text-muted">{footer}</div> : null}
          </div>
        </Card>
      </div>
    </section>
  );
}
