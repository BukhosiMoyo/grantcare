import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listGuides } from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { filterIndexableGuides } from "@/lib/guide-seo";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: "SASSA Guides for Status, Appeals and Payments",
      metaDescription:
        "Browse SASSA guides for status check problems, payment delays, appeals, banking details, documents, and SRD questions.",
    },
    {
      metaTitle: "Imihlahlandlela ye-SASSA Yesimo, Izikhalazo Nezinkokhelo",
      metaDescription:
        "Phequlula imihlahlandlela ye-SASSA yezinkinga zokuhlola isimo, ukubambezeleka kokukhokha, izikhalazo, imininingwane yasebhange, imibhalo, nemibuzo ye-SRD.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/guides",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbGuides: "Guides",
      hubPaymentDescription: "Check the current month first, then use guides when you need more detail.",
      hubStatusDescription: "Open the status library when your question starts with a specific status message.",
      hubEligibilityDescription: "Use the checker for general direction before you read grant-specific guides.",
      hubNewsDescription: "Open the news archive when you need the latest announcement coverage first.",
      hubFaqDescription: "Read the short answers first if you only need the basics.",
      moreWaysTitle: "More ways to explore",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbGuides: "Imihlahlandlela",
      hubPaymentDescription: "Hlola inyanga yamanje kuqala, bese usebenzisa imihlahlandlela uma udinga imininingwane eyengeziwe.",
      hubStatusDescription: "Vula ilabhulali yesimo uma umbuzo wakho uqala ngomlayezo othile wesimo.",
      hubEligibilityDescription: "Sebenzisa isihloli ukuze uthole isiqondiso esijwayelekile ngaphambi kokufunda imihlahlandlela yezibonelelo ezithile.",
      hubNewsDescription: "Vula ingobo yezindaba uma udinga kuqala izindaba zakamuva zezaziso.",
      hubFaqDescription: "Funda izimpendulo ezimfishane kuqala uma udinga okuyisisekelo kuphela.",
      moreWaysTitle: "Ezinye izindlela zokuhlola",
    },
  );
  const guides = filterIndexableGuides(await listGuides(locale));
  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: routeCopy.hubPaymentDescription,
    },
    {
      href: "/status",
      title: copy.statusHelp,
      description: routeCopy.hubStatusDescription,
    },
    {
      href: "/eligibility-checker",
      title: copy.eligibilityChecker,
      description: routeCopy.hubEligibilityDescription,
    },
    {
      href: "/news",
      title: copy.news,
      description: routeCopy.hubNewsDescription,
    },
    {
      href: "/faq",
      title: copy.faq,
      description: routeCopy.hubFaqDescription,
    },
  ];

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbGuides, path: "/guides" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section headingAs="h1" eyebrow={copy.guides} title={copy.guideLibraryTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <InternalLinkGrid locale={locale} title={routeCopy.moreWaysTitle} items={hubLinks} />
    </div>
  );
}
