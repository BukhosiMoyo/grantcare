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

export function getPaymentSitemapLastModified() {
  return new Date(`${PAYMENT_PAGE_LAST_UPDATED}T00:00:00.000Z`);
}

function getMonthOffsetFromNow(period: { year: number; month: number }) {
  const now = new Date();
  const currentMonthIndex = now.getUTCFullYear() * 12 + now.getUTCMonth();
  const periodMonthIndex = period.year * 12 + period.month - 1;

  return periodMonthIndex - currentMonthIndex;
}

export function getPaymentSitemapChangeFrequency(period: { year: number; month: number }) {
  const monthOffset = getMonthOffsetFromNow(period);

  if (monthOffset >= 0 && monthOffset <= 1) {
    return "daily" as const;
  }

  return "weekly" as const;
}

export function getPaymentMonthSitemapPriority(period: { year: number; month: number }) {
  const monthOffset = getMonthOffsetFromNow(period);

  if (monthOffset === 0) {
    return 0.9;
  }

  if (monthOffset === 1) {
    return 0.86;
  }

  return 0.8;
}

export function getPaymentGrantSitemapPriority(
  period: { year: number; month: number },
  grantSlug: string,
) {
  const monthOffset = getMonthOffsetFromNow(period);

  if (monthOffset === 0) {
    return grantSlug === "children" ? 0.9 : 0.86;
  }

  if (monthOffset === 1) {
    return grantSlug === "children" ? 0.88 : 0.84;
  }

  return grantSlug === "children" ? 0.82 : 0.78;
}

export function formatPaymentPageLastUpdated() {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${PAYMENT_PAGE_LAST_UPDATED}T00:00:00`));
}
