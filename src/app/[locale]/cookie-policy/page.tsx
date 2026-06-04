import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/legal-page";
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

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: "Cookie Policy",
      metaDescription:
        "Read the cookie policy for locale preferences, sign-in sessions, and product analytics on GrantCare.",
    },
    {
      metaTitle: "Inqubomgomo Yamakhukhi",
      metaDescription:
        "Funda inqubomgomo yamakhukhi yezintandokazi zolimi, izikhathi zokungena, nokuhlaziywa komkhiqizo ku-GrantCare.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/cookie-policy",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getLocalizedRouteCopy(
    locale,
    {
      eyebrow: "Cookie policy",
      title: "Cookie policy",
      intro: [
        "GrantCare may use cookies or similar storage for locale preferences, sign-in sessions, and core product analytics.",
      ],
      sections: [
        {
          title: "Product cookies",
          paragraphs: [
            "GrantCare can store a language preference so the site opens in the same locale on a later visit.",
            "Account and security features may use session storage or cookies to keep sign-in working correctly.",
          ],
        },
        {
          title: "Analytics",
          paragraphs: [
            "GrantCare may use basic analytics to understand which pages or tools are being used.",
            "Analytics should support product improvement, not replace official government systems.",
          ],
        },
        {
          title: "Control",
          paragraphs: [
            "Browser settings can limit or clear cookies, but some product features may stop working as expected if they are disabled.",
          ],
        },
      ],
    },
    {
      eyebrow: "Inqubomgomo yamakhukhi",
      title: "Inqubomgomo yamakhukhi",
      intro: [
        "I-GrantCare ingasebenzisa amakhukhi noma isitoreji esifanayo ngezintandokazi zolimi, izikhathi zokungena, nokuhlaziywa okuyisisekelo komkhiqizo.",
      ],
      sections: [
        {
          title: "Amakhukhi omkhiqizo",
          paragraphs: [
            "I-GrantCare ingagcina okuthandwayo kolimi ukuze isayithi livuleke ngolimi olufanayo ekuvakasheleni okulandelayo.",
            "Izici ze-akhawunti nezokuphepha zingasebenzisa isitoreji seseshini noma amakhukhi ukuze ukungena kusebenze kahle.",
          ],
        },
        {
          title: "Ukuhlaziya",
          paragraphs: [
            "I-GrantCare ingasebenzisa ukuhlaziya okuyisisekelo ukuqonda ukuthi yimaphi amakhasi noma amathuluzi asetshenziswayo.",
            "Ukuhlaziya kufanele kusekele ukuthuthukiswa komkhiqizo, hhayi ukufaka esikhundleni sezinhlelo zikahulumeni ezisemthethweni.",
          ],
        },
        {
          title: "Ukulawula",
          paragraphs: [
            "Izilungiselelo zesiphequluli zingakhawulela noma zisule amakhukhi, kodwa ezinye izici zomkhiqizo zingase zingasebenzi njengoba kulindelekile uma ekhutshaziwe.",
          ],
        },
      ],
    },
  );

  return (
    <LegalPage
      currentPath="/cookie-policy"
      eyebrow={content.eyebrow}
      intro={content.intro}
      locale={locale}
      sections={content.sections}
      title={content.title}
    />
  );
}
