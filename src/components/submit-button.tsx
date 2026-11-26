"use client";

import { Send } from "@/components/lucide-icons";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  pendingLabel,
  className,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "primary-action focus-ring tap-target rounded-full bg-primary px-5 text-base font-semibold text-white transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
    ><Send className="action-icon" />
      {pending ? pendingLabel ?? children : children}
    </button>
  );
}
