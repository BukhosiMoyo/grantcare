import Link from "next/link";

import { buildLocalePath } from "@/lib/site";

export const srdPaymentDateCopy = {
  en: {
    heading: "Approved, but no SRD payment date?",
    answer: "“Approved” means SASSA accepted your application for the month you selected. If the “Pay day” field is blank, SASSA has not yet processed that month’s payment.",
    check: "Open your SRD status on SASSA’s website, select the month and look for “Pay day”. The general grant calendar lists scheduled grant payments. Your own SRD payment date appears in your SRD record.",
    portal: "Check my month on the official SASSA site",
    verification: "If your grant shows as approved but remains unpaid, SASSA’s 2026 guide directs you to request a verification link and complete facial verification. Start on the official SRD site. If you need help, call SASSA on 0800 60 10 11.",
    paymentGuide: "How to read grant payment dates",
    sources: "SASSA sources",
    statusKey: "What each status means (PDF)",
    booklet: "2026 grant guide, page 12 (PDF)",
  },
  tn: {
    heading: "Kopo ya me e amogetswe. Ke eng fa go se na letlha la tuelo ya SRD?",
    answer: "Fa go kwadilwe “Approved”, SASSA e amogetse kopo ya gago ya kgwedi e o e tlhophileng. Fa go sa kwalwa sepe mo go “Pay day”, SASSA ga e ise e rulaganye tuelo ya kgwedi eo.",
    check: "Bula kopo ya gago mo webosaeteng ya SRD ya SASSA. Tlhopha kgwedi mme o lebe fa go kwadilweng “Pay day”. Khalendara ya dithuso e bontsha matlha a a rulaganyeditsweng go duela dithuso. Letlha la gago la tuelo ya SRD le tlhaga mo kopong ya gago.",
    portal: "Tlhola maemo a kopo ya me kwa SASSA",
    verification: "Fa kopo ya gago e amogetswe mme o ise o duelwe, kaedi ya SASSA ya 2026 e re o kope kgokagano mme o e dirise go tlhomamisa gore o mang ka go sekene sefatlhego sa gago. Simolola mo webosaeteng ya semmuso ya SRD. Fa o tlhoka thuso, leletsa SASSA mo go 0800 60 10 11.",
    paymentGuide: "Tsela ya go bala matlha a tuelo ya dithuso",
    sources: "Metswedi ya SASSA",
    statusKey: "Bokao jwa molaetsa mongwe le mongwe (PDF, ka Seesemane)",
    booklet: "Kaedi ya dithuso ya 2026, tsebe 12 (PDF, ka Seesemane)",
  },
  xh: {
    heading: "Isicelo sam se-SRD samkelwe. Kutheni kungekho mhla wentlawulo?",
    answer: "Xa kubhalwe “Approved”, iSASSA isamkele isicelo sakho saloo nyanga uyikhethileyo. Ukuba indawo ethi “Pay day” ayinanto, iSASSA ayikayilungisi intlawulo yaloo nyanga.",
    check: "Vula isicelo sakho kwiwebhusayithi ye-SRD yakwaSASSA. Khetha inyanga uze ujonge indawo ethi “Pay day”. Ikhalenda yezibonelelo ibonisa imihla ecwangcisiweyo yokuhlawula izibonelelo. Umhla wentlawulo yakho ye-SRD uvela kwiinkcukacha zesicelo sakho.",
    portal: "Jonga umphumo wenyanga endiyikhethileyo kwaSASSA",
    verification: "Ukuba isicelo sakho samkelwe kodwa awukahlawulwa, isikhokelo sakwaSASSA sowama-2026 sithi kufuneka ucele ikhonkco uze uqinisekise ukuba ungubani ngokuskena ubuso bakho. Qala kwiwebhusayithi ye-SRD yakwaSASSA. Ukuba ufuna uncedo, fowunela iSASSA ku-0800 60 10 11.",
    paymentGuide: "Indlela yokufunda imihla yokuhlawulwa kwezibonelelo",
    sources: "Imithombo yakwaSASSA",
    statusKey: "Intsingiselo yomyalezo ngamnye (PDF, ngesiNgesi)",
    booklet: "Isikhokelo sezibonelelo sowama-2026, iphepha 12 (PDF, ngesiNgesi)",
  },
  zu: {
    heading: "Isicelo samukelwe kodwa alukho usuku lokukhokha i-SRD?",
    answer: "Uma ubona elithi “Approved”, i-SASSA isamukele isicelo sakho saleyo nyanga oyikhethile. Uma kungabhalwanga lutho lapho kuthiwa “Pay day”, i-SASSA ayikayicubunguli inkokhelo yaleyo nyanga.",
    check: "Vula ikhasi lakwa-SASSA lokubheka isimo sesicelo se-SRD. Khetha inyanga bese ubheka lapho kuthiwa “Pay day”. Ikhalenda lezibonelelo libonisa izinsuku ezihlelelwe ukukhokhwa kwezibonelelo. Usuku lwakho lokukhokhelwa i-SRD luvela emininingwaneni yesicelo sakho.",
    portal: "Bheka isimo senyanga engiyikhethile kwa-SASSA",
    verification: "Uma isicelo sakho samukelwe kodwa ungakayitholi inkokhelo, umhlahlandlela wakwa-SASSA wango-2026 uthi cela isixhumanisi ukuze uqinisekise ubuwena ngobuso. Qala kusizindalwazi se-SRD esisemthethweni. Uma udinga usizo, shayela i-SASSA ku-0800 60 10 11.",
    paymentGuide: "Indlela yokufunda izinsuku zokukhokhwa kwezibonelelo",
    sources: "Imithombo yakwa-SASSA",
    statusKey: "Izincazelo zemiphumela yezicelo (PDF, ngesiNgisi)",
    booklet: "Umhlahlandlela wezibonelelo wango-2026, ikhasi 12 (PDF, ngesiNgisi)",
  },
};

export function SrdPaymentDateAnswer({ locale }: { locale: keyof typeof srdPaymentDateCopy }) {
  const labels = srdPaymentDateCopy[locale];
  const linkClass = "focus-ring text-primary underline underline-offset-4";

  return (
    <section id="approved-no-payment-date" lang={locale} className="scroll-mt-28 space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{labels.heading}</h2>
      <p>{labels.answer}</p>
      <p>{labels.check}</p>
      <a className={linkClass} href="https://srd.sassa.gov.za/">{labels.portal}</a>
      <p>{labels.verification}</p>
      <Link className={linkClass} href={buildLocalePath(locale, "/guides/how-to-understand-payment-dates")}>
        {labels.paymentGuide}
      </Link>
      <details className="text-sm">
        <summary className="focus-ring cursor-pointer py-2 font-medium">{labels.sources}</summary>
        <ul className="list-disc space-y-2 ps-5">
          <li><a className={linkClass} href="https://srd.sassa.gov.za/assets/status.pdf">{labels.statusKey}</a></li>
          <li><a className={linkClass} href="https://www.dsd.gov.za/index.php/component/jdownloads/?Itemid=101&catid=7&id=698%3Asassa-grant-booklet-2026&m=0&task=download.send">{labels.booklet}</a></li>
        </ul>
      </details>
    </section>
  );
}
