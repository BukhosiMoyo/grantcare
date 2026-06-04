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
      metaTitle: "Terms and Conditions",
      metaDescription:
        "Read the terms for using GrantCare as an independent information and reminder product.",
    },
    {
      metaTitle: "Imigomo Nemibandela",
      metaDescription:
        "Funda imigomo yokusebenzisa i-GrantCare njengomkhiqizo ozimele wolwazi nezikhumbuzi.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/terms",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function TermsPage({
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
      eyebrow: "Terms",
      title: "Terms",
      intro: [
        "These terms cover use of GrantCare as an independent information and reminder product.",
      ],
      sections: [
        {
          title: "Use of the site",
          paragraphs: [
            "GrantCare may be used to read guidance, compare payment dates, understand common status wording, and manage reminders or saved preferences.",
            "Users should keep official actions on official government systems.",
          ],
        },
        {
          title: "Content limits",
          paragraphs: [
            "GrantCare aims to keep information useful and current, but official decisions and official updates remain with government channels.",
            "Users should verify formal actions, deadlines, and final outcomes on official routes.",
          ],
        },
        {
          title: "Account use",
          paragraphs: [
            "Users should keep account access details secure and use the product lawfully.",
            "GrantCare may limit or remove access if the service is abused or used to mislead others.",
          ],
        },
      ],
    },
    {
      eyebrow: "Imigomo",
      title: "Imigomo",
      intro: [
        "Le migomo imayelana nokusebenzisa i-GrantCare njengomkhiqizo ozimele wolwazi nezikhumbuzi.",
      ],
      sections: [
        {
          title: "Ukusebenzisa isayithi",
          paragraphs: [
            "I-GrantCare ingasetshenziswa ukufunda isiqondiso, ukuqhathanisa izinsuku zokukhokha, ukuqonda amagama avamile esimo, nokuphatha izikhumbuzi noma izintandokazi ezigciniwe.",
            "Abasebenzisi kufanele bagcine izenzo ezisemthethweni ezinhlelweni zikahulumeni ezisemthethweni.",
          ],
        },
        {
          title: "Imikhawulo yokuqukethwe",
          paragraphs: [
            "I-GrantCare ihlose ukugcina ulwazi luwusizo futhi lusesikhathini, kodwa izinqumo nezibuyekezo ezisemthethweni zihlala eziteshini zikahulumeni.",
            "Abasebenzisi kufanele baqinisekise izenzo ezisemthethweni, iminqamulajuqu, nemiphumela yokugcina ngezindlela ezisemthethweni.",
          ],
        },
        {
          title: "Ukusebenzisa i-akhawunti",
          paragraphs: [
            "Abasebenzisi kufanele bagcine imininingwane yokufinyelela ku-akhawunti ivikelekile futhi basebenzise umkhiqizo ngokusemthethweni.",
            "I-GrantCare ingakhawulela noma isuse ukufinyelela uma isevisi isetshenziswa kabi noma ukukhohlisa abanye.",
          ],
        },
      ],
    },
  );

  return (
    <LegalPage
      currentPath="/terms"
      eyebrow={content.eyebrow}
      intro={content.intro}
      locale={locale}
      sections={content.sections}
      title={content.title}
    />
  );
}
