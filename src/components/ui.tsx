import Link from "next/link";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("surface-card rounded-[var(--radius-card)] p-5 sm:p-6", className)}>
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-strong px-3 py-1 text-sm font-medium text-primary">
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring tap-target inline-flex items-center justify-center rounded-full px-5 text-base font-semibold transition-colors",
        variant === "primary"
          ? "primary-action bg-primary text-white hover:bg-primary-strong"
          : "border border-border bg-surface text-foreground hover:bg-surface-muted",
      )}
    >
      {children}
    </Link>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="space-y-2.5">
      <span className="text-sm font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "focus-ring tap-target w-full rounded-2xl border border-border bg-surface px-4 shadow-[0_14px_28px_-24px_var(--shadow)] transition-[border-color,background-color,box-shadow] hover:border-primary/25 focus:border-primary/35 focus:bg-white aria-[invalid=true]:border-danger/45 aria-[invalid=true]:bg-danger/5",
        className,
      )}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "focus-ring min-h-32 w-full rounded-2xl border border-border bg-surface px-4 py-3",
        className,
      )}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "focus-ring tap-target w-full rounded-2xl border border-border bg-surface px-4",
        className,
      )}
    >
      {children}
    </select>
  );
}

export function CheckboxRow({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span>{label}</span>
    </label>
  );
}

export function StatusMessage({
  tone = "info",
  children,
}: {
  tone?: "info" | "error";
  children: ReactNode;
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "rounded-[1.35rem] border px-4 py-3 text-sm leading-relaxed",
        tone === "error"
          ? "border-danger/30 bg-danger/5 text-danger"
          : "border-border bg-surface text-muted",
      )}
    >
      {children}
    </div>
  );
}
