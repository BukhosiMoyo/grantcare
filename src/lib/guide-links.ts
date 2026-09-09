import { getDuplicateGuideRedirectPath } from "./guide-redirects";

// Broken references in the existing guide inventory, matched to their actual
// published equivalents after reviewing source and destination content.
export const CORRECTED_LINKS: Record<string, string> = {
  "/guides/how-to-check-370-application-pages-safely": "/guides/how-to-use-an-r370-application-page-safely",
  "/guides/how-to-understand-r370-application-status-safely": "/guides/how-to-check-r370-status-safely",
  "/guides/how-to-find-official-portal-updates-without-fake-login-pages": "/guides/how-to-find-official-status-check-updates-safely",
  "/status/payment-processing": "/guides/payment-processing-meaning",
};

export function resolveGuideLink(path: string) {
  if (CORRECTED_LINKS[path]) return CORRECTED_LINKS[path];
  if (path.startsWith("/guides/")) return getDuplicateGuideRedirectPath(path.slice(8)) ?? path;
  return path;
}
