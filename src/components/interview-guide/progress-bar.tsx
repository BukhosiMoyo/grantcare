"use client";

/**
 * Thin progress bar fixed at top of screen.
 * Shows flow completion as a gradient-filled bar.
 */
export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.min(((current) / total) * 100, 100);

  return (
    <div className="flow-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="flow-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
