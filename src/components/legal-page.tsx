import Link from "next/link";

import { Card, Section } from "@/components/ui";
import { LEGAL_LINKS } from "@/lib/official-resources";
import { buildLocalePath, type Locale } from "@/lib/site";

export function LegalPage({
  currentPath,
  eyebrow,
  intro,
  locale,
  sections,
  title,
}: {
  currentPath: string;
  eyebrow: string;
  intro: string[];
  locale: Locale;
  sections: Array<{ title: string; paragraphs: string[] }>;
  title: string;
}) {
  const relatedLinks = LEGAL_LINKS.filter((link) => link.path !== currentPath);

  return (
    <div className="space-y-8">
      <Section eyebrow={eyebrow} title={title}>
        <Card className="space-y-3">
          {intro.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-muted">
              {paragraph}
            </p>
          ))}
        </Card>
      </Section>

      {sections.map((section) => (
        <Section key={section.title} title={section.title}>
          <Card className="space-y-3">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-muted">
                {paragraph}
              </p>
            ))}
          </Card>
        </Section>
      ))}

      <Section title="Related pages">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {relatedLinks.map((link) => (
            <Link key={link.path} href={buildLocalePath(locale, link.path)}>
              <Card className="space-y-2">
                <h2 className="text-lg font-semibold">{link.label}</h2>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
