"use client";

import { useState } from "react";

import { LinkIcon, ShareIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const actionClassName =
  "focus-ring inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted";

export function GuideShareActions({
  shareLabel,
  copyLabel,
  url,
  title,
}: {
  shareLabel: string;
  copyLabel: string;
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function shareGuide() {
    if (typeof navigator.share !== "function") {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, url });
      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      setShared(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={shareGuide}
        className={cn(actionClassName, shared && "border-primary/30 text-primary")}
      >
        <ShareIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{shareLabel}</span>
      </button>
      <button
        type="button"
        onClick={copyLink}
        className={cn(actionClassName, copied && "border-primary/30 text-primary")}
      >
        <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{copyLabel}</span>
      </button>
    </div>
  );
}
