"use client";

import { useState } from "react";

import { Card } from "@/components/ui";
import { getEligibilityStatusLabel, type EligibilityStatus } from "@/lib/eligibility-wizard";

type SavedChecklistResult = {
  title: string;
  status: EligibilityStatus;
  checklist: Array<{ key: string; label: string }>;
};

export function EligibilityChecklistCard({
  id,
  result,
  completedKeys,
}: {
  id: string;
  result: SavedChecklistResult;
  completedKeys: string[];
}) {
  const [completed, setCompleted] = useState(completedKeys);
  const completedCount = completed.filter((key) =>
    result.checklist.some((item) => item.key === key),
  ).length;

  function toggle(key: string) {
    setCompleted((current) => {
      const next = current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key];

      void fetch(`/api/eligibility-wizard/sessions/${id}/checklist`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completedKeys: next }),
      });

      return next;
    });
  }

  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
            {getEligibilityStatusLabel(result.status)}
          </p>
          <h3 className="text-xl font-semibold tracking-tight">{result.title}</h3>
        </div>
        <p className="text-sm font-medium text-muted">
          {completedCount}/{result.checklist.length}
        </p>
      </div>

      <div className="grid gap-2">
        {result.checklist.map((item) => (
          <label key={item.key} className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
            <input
              type="checkbox"
              checked={completed.includes(item.key)}
              onChange={() => toggle(item.key)}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </label>
        ))}
      </div>

      <a
        href={`/api/eligibility-wizard/sessions/${id}/pdf`}
        className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 text-sm font-semibold hover:bg-surface-muted"
      >
        Download PDF
      </a>
    </Card>
  );
}

