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
      metaTitle: "Editorial Policy",
      metaDescription: "Read how GrantCare handles official-source checks, payment-date updates, and status guidance.",
    },
    {
      metaTitle: "Inqubomgomo Yokuhlela",
      metaDescription: "Funda ukuthi i-GrantCare iziphatha kanjani ukuhlola imithombo esemthethweni, izibuyekezo zezinsuku zokukhokha, nesiqondiso sesimo.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/editorial-policy",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function EditorialPolicyPage({
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
      eyebrow: "Editorial policy",
      title: "Editorial policy",
      intro: [
        "GrantCare should rely on official government sources when it publishes payment dates, official links, and government contact details.",
      ],
      sections: [
        {
          title: "Source handling",
          paragraphs: [
            "Official payment schedules, official grant amount updates, and official contact details should be taken from government sources first.",
            "Independent guide pages should stay clearly separate from official government action pages.",
          ],
        },
        {
          title: "Date and status handling",
          paragraphs: [
            "Payment dates should distinguish between expected timing, pending updates, and portal-only situations.",
            "Status pages should explain common wording plainly without pretending to replace the official status system.",
          ],
        },
        {
          title: "Corrections",
          paragraphs: [
            "If a government source changes, GrantCare should update the related page and remove or revise outdated wording as quickly as possible.",
          ],
        },
      ],
    },
    {
      eyebrow: "Inqubomgomo yokuhlela",
      title: "Inqubomgomo yokuhlela",
      intro: [
        "I-GrantCare kufanele ithembele emithonjeni kahulumeni esemthethweni lapho ishicilela izinsuku zokukhokha, izixhumanisi ezisemthethweni, nemininingwane yokuxhumana kahulumeni.",
      ],
      sections: [
        {
          title: "Ukuphathwa kwemithombo",
          paragraphs: [
            "Izinhlelo zokukhokha ezisemthethweni, izibuyekezo ezisemthethweni zamanani ezibonelelo, nemininingwane yokuxhumana esemthethweni kufanele kuthathwe kuqala emithonjeni kahulumeni.",
            "Amakhasi emihlahlandlela azimele kufanele ahlale ehlukile ngokucacile emakhasi ezenzo zikahulumeni ezisemthethweni.",
          ],
        },
        {
          title: "Ukuphathwa kwezinsuku nesimo",
          paragraphs: [
            "Izinsuku zokukhokha kufanele zihlukanise phakathi kwesikhathi esilindelekile, izibuyekezo ezisalindile, nezimo ezibonakala ephothali kuphela.",
            "Amakhasi esimo kufanele achaze amagama avamile ngokucacile ngaphandle kokuzenza athathe indawo yohlelo olusemthethweni lwesimo.",
          ],
        },
        {
          title: "Izilungiso",
          paragraphs: [
            "Uma umthombo kahulumeni ushintsha, i-GrantCare kufanele ibuyekeze ikhasi elihlobene futhi isuse noma ilungise amagama aphelelwe isikhathi ngokushesha ngangokunokwenzeka.",
          ],
        },
      ],
    },
  );

  return (
    <LegalPage
      currentPath="/editorial-policy"
      eyebrow={content.eyebrow}
      intro={content.intro}
      locale={locale}
      sections={content.sections}
      title={content.title}
    />
  );
}
