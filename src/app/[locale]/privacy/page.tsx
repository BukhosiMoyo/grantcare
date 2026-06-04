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
      metaTitle: "Privacy Policy",
      metaDescription: "Read how GrantCare handles reminders, saved preferences, account access, and product analytics.",
    },
    {
      metaTitle: "Inqubomgomo Yobumfihlo",
      metaDescription: "Funda ukuthi i-GrantCare iziphatha kanjani izikhumbuzi, izintandokazi ezigciniwe, ukufinyelela ku-akhawunti, nokuhlaziywa komkhiqizo.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/privacy",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function PrivacyPage({
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
      eyebrow: "Privacy",
      title: "Privacy",
      intro: [
        "GrantCare keeps product data limited to reminders, saved preferences, account access, and basic support handling.",
        "GrantCare is independent and not affiliated with SASSA or the South African government.",
      ],
      sections: [
        {
          title: "What GrantCare may store",
          paragraphs: [
            "Account email addresses, sign-in details, reminder settings, saved guides, and grant preferences may be stored so the product can work.",
            "Official applications, appeals, and official status checks belong on government systems, not on GrantCare.",
          ],
        },
        {
          title: "How the data is used",
          paragraphs: [
            "GrantCare uses stored data to support sign-in, reminders, saved pages, and core product analytics.",
            "GrantCare should avoid collecting sensitive grant documents or official application data unless that changes in a clearly stated feature.",
          ],
        },
        {
          title: "Official contact routes",
          paragraphs: [
            "Official government questions should go through the official SASSA contacts and portals listed on the contact page.",
          ],
        },
      ],
    },
    {
      eyebrow: "Ubumfihlo",
      title: "Ubumfihlo",
      intro: [
        "I-GrantCare igcina idatha yomkhiqizo ilinganiselwe ezikhumbuzini, ezintandokazini ezigciniwe, ekufinyeleleni ku-akhawunti, nasekuphathweni kosizo oluyisisekelo.",
        "I-GrantCare izimele futhi ayihlangene ne-SASSA noma uhulumeni waseNingizimu Afrika.",
      ],
      sections: [
        {
          title: "Okungase kugcinwe yi-GrantCare",
          paragraphs: [
            "Amakheli e-imeyili e-akhawunti, imininingwane yokungena, izilungiselelo zezikhumbuzi, imihlahlandlela egciniwe, nezintandokazi zezibonelelo kungagcinwa ukuze umkhiqizo usebenze.",
            "Izicelo ezisemthethweni, izikhalazo, nokuhlolwa kwesimo okusemthethweni kungokwezinhlelo zikahulumeni, hhayi i-GrantCare.",
          ],
        },
        {
          title: "Indlela idatha esetshenziswa ngayo",
          paragraphs: [
            "I-GrantCare isebenzisa idatha egciniwe ukusekela ukungena, izikhumbuzi, amakhasi agciniwe, nokuhlaziywa okuyisisekelo komkhiqizo.",
            "I-GrantCare kufanele igweme ukuqoqa imibhalo ebucayi yezibonelelo noma idatha yezicelo ezisemthethweni ngaphandle uma lokho kushintsha esicini esichazwe ngokucacile.",
          ],
        },
        {
          title: "Izindlela zokuxhumana ezisemthethweni",
          paragraphs: [
            "Imibuzo esemthethweni kahulumeni kufanele iye koxhumana nabo namaphothali asemthethweni e-SASSA abhalwe ekhasini lokuxhumana.",
          ],
        },
      ],
    },
  );

  return (
    <LegalPage
      currentPath="/privacy"
      eyebrow={content.eyebrow}
      intro={content.intro}
      locale={locale}
      sections={content.sections}
      title={content.title}
    />
  );
}
