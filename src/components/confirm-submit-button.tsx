"use client";

import { cn } from "@/lib/utils";

export function ConfirmSubmitButton({
  children,
  confirmText,
  className,
}: {
  children: React.ReactNode;
  confirmText: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!window.confirm(confirmText)) {
          event.preventDefault();
        }
      }}
      className={cn(
        "focus-ring tap-target rounded-full border border-danger/30 bg-white px-4 text-sm font-semibold text-danger hover:bg-danger/5",
        className,
      )}
    >
      {children}
    </button>
  );
}
