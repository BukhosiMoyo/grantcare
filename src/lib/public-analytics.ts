import { stripLocaleFromPathname } from "./site";

const PRIVATE_ROUTES = /^\/(?:admin|dashboard|sign-in|sign-up|forgot-password|reset-password|unsubscribe|api)(?:\/|$)/;
const PERSONAL_TOOL_ROUTES = /^\/tools\/[^/]+\/(?:builder|result)(?:\/|$)/;

export function isPublicAnalyticsPath(value: string) {
  const path = stripLocaleFromPathname(value.split(/[?#]/, 1)[0]);
  return !PRIVATE_ROUTES.test(path) && !PERSONAL_TOOL_ROUTES.test(path);
}

export function getPublicAnalyticsUrl(value: string, origin: string) {
  if (!value.trim()) return undefined;
  try {
    const url = new URL(value, origin);
    if (!isPublicAnalyticsPath(url.pathname)) return undefined;
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}
