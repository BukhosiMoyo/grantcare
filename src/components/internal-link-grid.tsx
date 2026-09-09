import Link from "next/link";

import { buildLocalePath, type Locale } from "@/lib/site";
import { Section } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";

export function InternalLinkGrid({
  locale,
  title,
  items,
  columns = "md:grid-cols-2",
}: {
  locale: Locale;
  title: string;
  items: Array<{
    href: string;
    title: string;
    description: string;
  }>;
  columns?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section title={title}>
      <div className={`grid gap-4 ${columns}`}>
        {items.map((item) => (
          <Link key={item.href} href={buildLocalePath(locale, item.href)} className="related-link">
            <div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowRightIcon />
          </Link>
        ))}
      </div>
    </Section>
  );
}
