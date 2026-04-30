export function getPaymentIndexYear() {
  return new Date().getUTCFullYear();
}

export const PAYMENT_PAGE_LAST_UPDATED = "2026-04-30";

export function isPaymentYearIndexable(year: number) {
  return year === getPaymentIndexYear();
}

export function filterIndexablePaymentPeriods<T extends { year: number }>(periods: T[]) {
  const indexYear = getPaymentIndexYear();
  return periods.filter((period) => period.year === indexYear);
}

export function formatPaymentPageLastUpdated() {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${PAYMENT_PAGE_LAST_UPDATED}T00:00:00`));
}
