import Link from "next/link";

import { Card, Section } from "@/components/ui";
import { getLegalLinks } from "@/lib/official-resources";
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
  const relatedLinks = getLegalLinks(locale).filter(
    (link) => link.path !== currentPath,
  );
  const relatedPagesTitle =
    locale === "zu"
      ? "Amakhasi ahlobene"
      : locale === "tn"
        ? "Ditsebe tse di amanang"
        : locale === "xh"
          ? "Amaphepha anxulumene"
          : "Related pages";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10">
      <article className="article-content space-y-10">
        <Section eyebrow={eyebrow} title={title} headingAs="h1">
          <div className="narrative-copy">
            {intro.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        {sections.map((section) => (
          <Section key={section.title} title={section.title}>
            <div className="narrative-copy">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Section>
        ))}
      </article>

      <Section title={relatedPagesTitle}>
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
