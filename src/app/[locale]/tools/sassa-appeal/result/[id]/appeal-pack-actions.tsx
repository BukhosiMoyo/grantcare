"use client";

import { useMemo, useState } from "react";

export function AppealPackActions({
  appealLetter,
  copiedLabel,
  copyLabel,
  downloadLabel,
  fileName,
  printLabel,
}: {
  appealLetter: string;
  copiedLabel: string;
  copyLabel: string;
  downloadLabel: string;
  fileName: string;
  printLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const canCopy = typeof navigator !== "undefined" && !!navigator.clipboard;

  const textFileName = useMemo(() => {
    const cleanName = fileName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `${cleanName || "appeal-letter"}.txt`;
  }, [fileName]);

  function download() {
    const blob = new Blob([appealLetter], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = textFileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(href);
  }

  async function copy() {
    if (!canCopy) return;
    await navigator.clipboard.writeText(appealLetter);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-base font-semibold text-foreground hover:bg-surface-muted"
        onClick={() => window.print()}
      >
        {printLabel}
      </button>
      <button
        type="button"
        className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-base font-semibold text-foreground hover:bg-surface-muted"
        onClick={download}
      >
        {downloadLabel}
      </button>
      <button
        type="button"
        className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-base font-semibold text-foreground hover:bg-surface-muted disabled:opacity-50"
        disabled={!canCopy}
        onClick={copy}
      >
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
