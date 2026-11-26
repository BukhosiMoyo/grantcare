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
      sections={[...content.sections, ...[
        { title: "What a source check means", paragraphs: ["A source-check date records when the named reference was examined and the stated claim was compared. It is separate from an article's last-edited date. A reference link alone does not certify every claim on a page. Article panels identify when a full factual review is still pending."] },
        { title: "Conflicting and historical information", paragraphs: ["We prefer the applicable government notice and its effective date over an earlier announcement. We record conflicts rather than choose a convenient figure. Historical secondary-source checks, approximate map locations and unconfirmed future schedules are identified separately. Numeric means-test thresholds are not certified where the reviewed official publications disagree."] },
        { title: "Reporting a correction", paragraphs: ["Email hello@symaxx.com with the page address, the claim you believe is wrong and any supporting official source. Do not send an ID number, bank credentials, OTP or private application record. We assess the evidence, correct supported errors and record material changes; no response time is guaranteed."] },
        { title: "Scope of the current review", paragraphs: ["The current review includes the published calendar, the 2026 ordinary-grant amount notice, the published SRD extension and a comparison of listed office contacts. It is not a completed factual review of every guide, translation, eligibility result or individual application. Official sources can change after our check."] },
      ].map(section => ({...section, lang: "en"}))]}
      title={content.title}
    />
  );
}
