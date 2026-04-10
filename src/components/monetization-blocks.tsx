import { Card } from "@/components/ui";
import { TrackedExternalLink } from "@/components/tracked-external-link";
import type { PublicMonetizationBlock } from "@/lib/content";
import type { Locale } from "@/lib/site";

export function MonetizationBlocks({
  blocks,
  locale,
  placement,
}: {
  blocks: PublicMonetizationBlock[];
  locale: Locale;
  placement: string;
}) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blocks.map((block) => (
        <Card key={block.slug} className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
            {block.disclosureLabel}
          </p>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{block.title}</h3>
            <p className="text-sm text-muted">{block.body}</p>
          </div>
          <TrackedExternalLink
            href={block.href}
            locale={locale}
            eventName="monetization.clicked"
            eventPayload={{
              placement,
              slug: block.slug,
            }}
            target="_blank"
            rel="noreferrer sponsored"
            className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-5 text-sm font-semibold hover:bg-surface-muted"
          >
            {block.ctaLabel}
          </TrackedExternalLink>
        </Card>
      ))}
    </div>
  );
}
