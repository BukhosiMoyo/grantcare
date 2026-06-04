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
      metaTitle: "Disclaimer",
      metaDescription:
        "GrantCare is an independent information site and is not affiliated with SASSA or the South African government.",
    },
    {
      metaTitle: "Isitatimende Sokuzikhulula",
      metaDescription:
        "I-GrantCare iyisiza solwazi esizimele futhi ayihlangene ne-SASSA noma uhulumeni waseNingizimu Afrika.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/disclaimer",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function DisclaimerPage({
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
      eyebrow: "Disclaimer",
      title: "Disclaimer",
      intro: [
        "GrantCare is an independent information site.",
        "GrantCare is not affiliated with SASSA or the South African government.",
      ],
      sections: [
        {
          title: "What GrantCare does",
          paragraphs: [
            "GrantCare explains payment dates, common status wording, grant types, and next-step guidance.",
            "GrantCare can point users to official routes, but it is not the official route.",
          ],
        },
        {
          title: "What GrantCare does not do",
          paragraphs: [
            "GrantCare does not process official applications, official appeals, or official status checks.",
            "GrantCare does not issue government decisions, payments, or confirmations.",
          ],
        },
        {
          title: "Official action",
          paragraphs: [
            "Use the official SASSA website, online services portal, SRD portal, and official contact channels whenever you need an official action or official answer.",
          ],
        },
      ],
    },
    {
      eyebrow: "Isitatimende sokuzikhulula",
      title: "Isitatimende sokuzikhulula",
      intro: [
        "I-GrantCare iyisiza solwazi esizimele.",
        "I-GrantCare ayihlangene ne-SASSA noma uhulumeni waseNingizimu Afrika.",
      ],
      sections: [
        {
          title: "Lokho okwenziwa yi-GrantCare",
          paragraphs: [
            "I-GrantCare ichaza izinsuku zokukhokha, amagama avamile esimo, izinhlobo zezibonelelo, nesiqondiso sezinyathelo ezilandelayo.",
            "I-GrantCare ingakhomba abasebenzisi ezindleleni ezisemthethweni, kodwa ayiyona indlela esemthethweni.",
          ],
        },
        {
          title: "Lokho i-GrantCare engakwenzi",
          paragraphs: [
            "I-GrantCare ayicubunguli izicelo ezisemthethweni, izikhalazo ezisemthethweni, noma ukuhlolwa kwesimo okusemthethweni.",
            "I-GrantCare ayikhiphi izinqumo zikahulumeni, izinkokhelo, noma iziqinisekiso.",
          ],
        },
        {
          title: "Isenzo esisemthethweni",
          paragraphs: [
            "Sebenzisa iwebhusayithi esemthethweni ye-SASSA, iphothali yamasevisi aku-inthanethi, iphothali ye-SRD, neziteshi zokuxhumana ezisemthethweni noma nini lapho udinga isenzo noma impendulo esemthethweni.",
          ],
        },
      ],
    },
  );

  return (
    <LegalPage
      currentPath="/disclaimer"
      eyebrow={content.eyebrow}
      intro={content.intro}
      locale={locale}
      sections={content.sections}
      title={content.title}
    />
  );
}
