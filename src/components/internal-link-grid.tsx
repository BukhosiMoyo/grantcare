import Link from "next/link";

import { buildLocalePath, type Locale } from "@/lib/site";
import { Card, Section } from "@/components/ui";

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
          <Link key={item.href} href={buildLocalePath(locale, item.href)}>
            <Card className="space-y-2">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm leading-7 text-muted">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
