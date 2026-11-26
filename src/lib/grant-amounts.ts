import { EVIDENCE_SOURCES } from "./content-evidence";

export const GRANT_AMOUNTS_CHECKED_ON = "2026-11-26";
export const GRANT_AMOUNT_PERIOD_END = "2027-03-31";
export type GrantAmountRecord = { key: string; amount: number; effectiveFrom: string; sourceId: string };

// Gazette R.7287 is the enacted amount notice; the earlier budget report differs.
export const GRANT_AMOUNT_RECORDS: readonly GrantAmountRecord[] = [
  {key:"older-persons", amount:2400, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"older-persons-75", amount:2420, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"war-veterans", amount:2420, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"disability", amount:2400, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"care-dependency", amount:2400, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"child-support", amount:580, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"child-support-top-up-total", amount:870, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"foster-child", amount:1290, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"foster-child", amount:1300, effectiveFrom:"2026-10-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"grant-in-aid", amount:580, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.amounts.id},
  {key:"social-relief", amount:370, effectiveFrom:"2026-04-01", sourceId:EVIDENCE_SOURCES.srdAmount.id},
];

export function getPublishedGrantAmount(key: string, on = new Date().toISOString().slice(0, 10)): GrantAmountRecord | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(on) || on > GRANT_AMOUNT_PERIOD_END || Number.isNaN(Date.parse(on + "T00:00:00Z")) || new Date(on + "T00:00:00Z").toISOString().slice(0,10) !== on) return null;
  return GRANT_AMOUNT_RECORDS.filter(record => record.key === key && record.effectiveFrom <= on).sort((a,b) => b.effectiveFrom.localeCompare(a.effectiveFrom))[0] ?? null;
}

export function formatPublishedGrantAmount(key: string, on?: string): string | null {
  const record = getPublishedGrantAmount(key, on);
  return record ? "R" + new Intl.NumberFormat("en-ZA").format(record.amount).replace(/[\u00a0\u202f,]/g, " ") : null;
}
