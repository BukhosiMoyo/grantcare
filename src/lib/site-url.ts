function withHttps(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function normalizeSiteUrl(value: string | undefined | null) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return withHttps(trimmed).replace(/\/+$/, "");
}

export function getSiteUrl() {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeSiteUrl(process.env.VERCEL_URL) ??
    "https://grantcare.example"
  );
}

export function isSiteUrlReady() {
  return getSiteUrl() !== "https://grantcare.example";
}
