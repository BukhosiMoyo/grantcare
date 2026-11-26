import { TrackedExternalLink } from "@/components/tracked-external-link";

export const STATUS_ACTION_GUIDES = new Set([
  "how-to-use-sassa-status-check-for-r350",
  "srd-sassa-gov-za-status-check-guide",
]);

export function GuideStatusAction({ slug }: { slug: string }) {
  if (!STATUS_ACTION_GUIDES.has(slug)) return null;
  return <div className="space-y-3 rounded-2xl border border-primary/15 bg-primary/[0.04] p-4 sm:p-5">
    <p className="text-sm font-semibold text-foreground">Ready to check your status?</p>
    <TrackedExternalLink href="https://srd.sassa.gov.za/" eventName="official_resource.clicked" eventPayload={{ placement: "guide-primary-action", guide: slug, destination: "srd-portal" }} locale="en" target="_blank" rel="noopener noreferrer" className="primary-action focus-ring flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-center text-base font-semibold sm:w-fit">
      Open the official SRD portal <span aria-hidden="true">↗</span>
    </TrackedExternalLink>
    <p className="text-sm leading-6 text-muted">Opens srd.sassa.gov.za in a new tab. GrantCare explains results; your official check happens on SASSA&apos;s website.</p>
  </div>;
}
