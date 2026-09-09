import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { ClaimChecker } from "@/components/claim-checker";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/site";

const ZU_CLAIM_CHECKER_COPY: Record<string, string> = {
  "Independent SASSA Claim Checker for Grant, Status and Payment Rumours":
    "Isihloli esizimele sezimangalo ze-SASSA ngezibonelelo, isimo nezinkokhelo",
  "Use GrantCare's independent claim checker to test status updates, payment-date claims, grant increase stories, banking-update rumours, and reapplication warnings before you trust them.":
    "Sebenzisa isihloli esizimele se-GrantCare ukuhlola izibuyekezo zesimo, izimangalo zezinsuku zokukhokha, izindaba zokwenyuka kwezibonelelo, amahemuhemu okubuyekeza ibhange, nezexwayiso zokufaka isicelo kabusha ngaphambi kokuzithemba.",
  Home: "Ikhaya",
  "Claim checker": "Isihloli sezimangalo",
  "Check a status update, payment-date claim, grant increase story, or warning message before you trust it.":
    "Hlola isibuyekezo sesimo, isimangalo sosuku lokukhokha, indaba yokwenyuka kwesibonelelo, noma umlayezo wesexwayiso ngaphambi kokuwuthemba.",
  "Check status meanings": "Hlola izincazelo zesimo",
  "Open status meanings if the claim mixes real status wording with rumours, screenshots, or copied advice.":
    "Vula izincazelo zesimo uma isimangalo sixuba amagama esimo angempela namahemuhemu, izithombe-skrini, noma iseluleko esikopishiwe.",
  "Check payment dates": "Hlola izinsuku zokukhokha",
  "Open payment dates if the claim is really about timing, release windows, or late-payment confusion.":
    "Vula izinsuku zokukhokha uma isimangalo simayelana nesikhathi, amawindi okukhokha, noma ukudideka ngokukhokha sekwephuzile.",
  "Find official banking and verification pages": "Thola amakhasi asemthethweni asebhange nokuqinisekisa",
  "Use the guide if a claim points you toward bank-detail updates or identity verification and you need the right official route.":
    "Sebenzisa umhlahlandlela uma isimangalo sikukhomba ekubuyekezeni imininingwane yasebhange noma ekuqinisekiseni ubuwena futhi udinga indlela esemthethweni efanele.",
  "Find the official reapplication page": "Thola ikhasi elisemthethweni lokufaka isicelo kabusha",
  "Use the guide if a claim says you must reapply and you need to separate the official route from unofficial pages.":
    "Sebenzisa umhlahlandlela uma isimangalo sithi kufanele ufake isicelo kabusha futhi udinga ukuhlukanisa indlela esemthethweni namakhasi angekho emthethweni.",
  "Check if a SASSA website is official": "Hlola ukuthi iwebhusayithi ye-SASSA isemthethweni yini",
  "Open the guide if you need to check whether the page itself looks official.":
    "Vula umhlahlandlela uma udinga ukuhlola ukuthi ikhasi ngokwalo libukeka lisemthethweni yini.",
  "Related routes": "Imizila ehlobene",
};

function claimCheckerCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_CLAIM_CHECKER_COPY[text] ?? text) : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: "/claim-checker",
    title: claimCheckerCopy(locale, "Independent SASSA Claim Checker for Grant, Status and Payment Rumours"),
    description: claimCheckerCopy(
      locale,
      "Use GrantCare's independent claim checker to test status updates, payment-date claims, grant increase stories, banking-update rumours, and reapplication warnings before you trust them.",
    ),
  });
}

export default async function ClaimCheckerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const hubLinks = [
    {
      href: "/status",
      title: claimCheckerCopy(locale, "Check status meanings"),
      description: claimCheckerCopy(
        locale,
        "Open status meanings if the claim mixes real status wording with rumours, screenshots, or copied advice.",
      ),
    },
    {
      href: "/payment-dates",
      title: claimCheckerCopy(locale, "Check payment dates"),
      description: claimCheckerCopy(
        locale,
        "Open payment dates if the claim is really about timing, release windows, or late-payment confusion.",
      ),
    },
    {
      href: "/guides/how-to-find-official-banking-and-verification-pages-safely",
      title: claimCheckerCopy(locale, "Find official banking and verification pages"),
      description: claimCheckerCopy(
        locale,
        "Use the guide if a claim points you toward bank-detail updates or identity verification and you need the right official route.",
      ),
    },
    {
      href: "/guides/how-to-find-the-official-reapplication-page-safely",
      title: claimCheckerCopy(locale, "Find the official reapplication page"),
      description: claimCheckerCopy(
        locale,
        "Use the guide if a claim says you must reapply and you need to separate the official route from unofficial pages.",
      ),
    },
    {
      href: "/guides/how-to-know-if-a-sassa-website-is-official",
      title: claimCheckerCopy(locale, "Check if a SASSA website is official"),
      description: claimCheckerCopy(
        locale,
        "Open the guide if you need to check whether the page itself looks official.",
      ),
    },
  ];

  return (
    <div className="space-y-12">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: claimCheckerCopy(locale, "Home"), path: "/" },
          { label: claimCheckerCopy(locale, "Claim checker"), path: "/claim-checker" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />

      <section className="page-intro">
        <div className="space-y-4">
          <h1 className="page-title">
            {claimCheckerCopy(locale, "Claim checker")}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted">
            {claimCheckerCopy(
              locale,
              "Check a status update, payment-date claim, grant increase story, or warning message before you trust it.",
            )}
          </p>
        </div>

        <div className="w-full max-w-3xl rounded-3xl bg-surface-strong p-2 text-left shadow-inner sm:p-4">
          <ClaimChecker locale={locale} />
        </div>
      </section>

      <InternalLinkGrid locale={locale} title={claimCheckerCopy(locale, "Related routes")} items={hubLinks} />
    </div>
  );
}
