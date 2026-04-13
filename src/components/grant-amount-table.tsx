import { CURRENT_GRANT_AMOUNT_ROWS, GRANT_AMOUNT_SOURCE } from "@/lib/official-resources";

export function GrantAmountTable() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Current official amounts effective April 2026.</p>
        <a href={GRANT_AMOUNT_SOURCE.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">
          Official amount source
        </a>
      </div>

      <div className="overflow-x-auto rounded-[1.5rem] border border-border">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-surface-muted text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Grant</th>
              <th className="px-4 py-3 font-medium">Current amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {CURRENT_GRANT_AMOUNT_ROWS.map((row) => (
              <tr key={row.name}>
                <td className="px-4 py-3 font-semibold text-foreground">{row.name}</td>
                <td className="px-4 py-3 font-semibold text-primary">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
