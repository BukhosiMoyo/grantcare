import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listFaqs } from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const currentYear = new Date().getUTCFullYear();
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: `SASSA FAQ ${currentYear}: Grants, Payment Dates and Status Check`,
      metaDescription:
        "Get quick answers about SASSA grants, payment dates, status checks, eligibility, and official next steps.",
    },
    {
      metaTitle: `Imibuzo Ejwayelekile ye-SASSA ${currentYear}: Izibonelelo, Izinsuku Zokukhokha Nokuhlola Isimo`,
      metaDescription:
        "Thola izimpendulo ezisheshayo ngezibonelelo ze-SASSA, izinsuku zokukhokha, ukuhlolwa kwesimo, ukufaneleka, nezinyathelo ezisemthethweni ezilandelayo.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/faq",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function FaqPage({
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
      breadcrumbFaq: "FAQ",
      hubPaymentDescription: "Go straight to the payment-date hub if your question is about timing.",
      hubStatusDescription: "Open the status hub if your question starts with a status message.",
      hubEligibilityDescription: "Use the checker when you want general guidance about where to start.",
      hubGuidesDescription: "Read the full guide library for longer problem-solving help.",
      helpfulNextPagesTitle: "Helpful next pages",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbFaq: "Imibuzo ejwayelekile",
      hubPaymentDescription: "Yiya ngqo kuhabhu yezinsuku zokukhokha uma umbuzo wakho uphathelene nesikhathi.",
      hubStatusDescription: "Vula ihabhu yesimo uma umbuzo wakho uqala ngomlayezo wesimo.",
      hubEligibilityDescription: "Sebenzisa isihloli uma ufuna isiqondiso esijwayelekile sokuthi uqale kuphi.",
      hubGuidesDescription: "Funda ilabhulali ephelele yemihlahlandlela ukuze uthole usizo olude lokuxazulula izinkinga.",
      helpfulNextPagesTitle: "Amakhasi alandelayo awusizo",
    },
  );
  const faqs = await listFaqs(locale);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
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
      href: "/guides",
      title: copy.guides,
      description: routeCopy.hubGuidesDescription,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbFaq, path: "/faq" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Section eyebrow={copy.faq} title={copy.frequentlyAskedQuestionsTitle}>
        <div className="grid gap-3">
          {faqs.map((item) => (
            <Card key={item.question} className="space-y-2">
              <h2 className="text-xl font-semibold">{item.question}</h2>
              <p className="text-sm text-muted">{item.answer}</p>
            </Card>
          ))}
        </div>
      </Section>
      <InternalLinkGrid locale={locale} title={routeCopy.helpfulNextPagesTitle} items={hubLinks} />
    </>
  );
}
