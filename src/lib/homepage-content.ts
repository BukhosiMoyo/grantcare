import { sentenceCase } from "@/lib/utils";
import { getMonthSlugFromNumber } from "@/lib/fallback-content";
import { toGeneratedSetswanaText, toGeneratedXhosaText } from "./generated-guide-translations";
import type { Locale } from "@/lib/site";

export type HomepageContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroDisclaimer: string;
  heroPreviewTitle: string;
  heroPreviewBody: string;
  toolsTitle: string;
  toolsIntro: string;
  supportTitle: string;
  supportParagraphs: string[];
  supportPoints: string[];
  latestGuidesTitle: string;
  latestGuidesBody: string;
  faqTitle: string;
  faqBody: string;
  libraryTitle: string;
  libraryBody: string;
  waysToCheckTitle: string;
  waysToCheckBody: string;
  yearScheduleTitle: string;
  yearScheduleBody: string;
  nextMonthTitle: string;
  nextMonthBody: string;
};

export function getLocalizedRouteCopy<T extends Record<string, unknown>>(
  locale: Locale,
  english: T,
  zulu: Partial<T>,
  setswana?: Partial<T>,
): T {
  if (locale === "zu") {
    return {
      ...english,
      ...zulu,
    };
  }

  if (locale === "tn") {
    return {
      ...translateRouteCopyToSetswana(english),
      ...(setswana ?? {}),
    };
  }

  if (locale === "xh") {
    return translateRouteCopyToXhosa(english);
  }

  return english;
}

function translateRouteCopyToSetswana<T extends Record<string, unknown>>(copy: T): T {
  return Object.fromEntries(
    Object.entries(copy).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, toGeneratedSetswanaText(value)];
      }

      if (typeof value === "function") {
        return [
          key,
          (...args: unknown[]) => {
            const result = (value as (...args: unknown[]) => unknown)(...args);
            return typeof result === "string" ? toGeneratedSetswanaText(result) : result;
          },
        ];
      }

      return [key, value];
    }),
  ) as T;
}

function translateRouteCopyToXhosa<T extends Record<string, unknown>>(copy: T): T {
  return Object.fromEntries(
    Object.entries(copy).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, toGeneratedXhosaText(value)];
      }

      if (typeof value === "function") {
        return [
          key,
          (...args: unknown[]) => {
            const result = (value as (...args: unknown[]) => unknown)(...args);
            return typeof result === "string" ? toGeneratedXhosaText(result) : result;
          },
        ];
      }

      return [key, value];
    }),
  ) as T;
}

function getHomepageMonthLabel(locale: Locale, month: number) {
  const monthSlug = getMonthSlugFromNumber(month);

  if (locale === "zu") {
    const zuluMonths = [
      "Januwari",
      "Februwari",
      "Mashi",
      "Ephreli",
      "Meyi",
      "Juni",
      "Julayi",
      "Agasti",
      "Septhemba",
      "Okthoba",
      "Novemba",
      "Disemba",
    ];

    return zuluMonths[Math.max(0, Math.min(month - 1, zuluMonths.length - 1))];
  }

  if (locale === "tn") {
    const setswanaMonths = [
      "Ferikgong",
      "Tlhakole",
      "Mopitlwe",
      "Moranang",
      "Motsheganong",
      "Seetebosigo",
      "Phukwi",
      "Phatwe",
      "Lwetse",
      "Diphalane",
      "Ngwanatsele",
      "Sedimonthole",
    ];

    return setswanaMonths[Math.max(0, Math.min(month - 1, setswanaMonths.length - 1))];
  }

  if (locale === "xh") {
    const xhosaMonths = [
      "Januwari",
      "Februwari",
      "Matshi",
      "Epreli",
      "Meyi",
      "Juni",
      "Julayi",
      "Agasti",
      "Septemba",
      "Oktobha",
      "Novemba",
      "Disemba",
    ];

    return xhosaMonths[Math.max(0, Math.min(month - 1, xhosaMonths.length - 1))];
  }

  return sentenceCase(monthSlug);
}

function buildEnglishHomepageContent(monthLabel: string, year: number): HomepageContent {
  return {
    metaTitle: "SASSA Grants, Payment Dates and Status Check",
    metaDescription: `Check SASSA payment dates for ${monthLabel} ${year}, compare grant amounts, understand status checks, and find the next step for SRD and other grants.`,
    heroEyebrow: "Independent grant help",
    heroTitle: `SASSA Payment Dates for ${monthLabel} ${year}`,
    heroDescription: `Check ${monthLabel} ${year} pay days, understand status words, and find the next step — with calm, independent support.`,
    heroDisclaimer:
      "GrantCare is not SASSA or the South African government. Use official government channels for applications, appeals, and official status checks.",
    heroPreviewTitle: `${monthLabel} ${year} grant summary`,
    heroPreviewBody: "See the pay day and the amount for each grant.",
    toolsTitle: "Choose the task you need today.",
    toolsIntro:
      "Start with the tool that matches your question, then move to the official route only when you need a formal action.",
    supportTitle: "Why people use GrantCare",
    supportParagraphs: [
      "Most visitors arrive with one urgent question. They want to know whether a date is ready, what a pending or declined message usually means, or what to check before following up. The homepage should answer that quickly and point them to the right next page.",
      "GrantCare stays useful by keeping those jobs separate. Payment pages focus on timing. Status pages explain wording. The eligibility checker offers general direction. Guides sit in the guide library so the homepage can stay clean and easier to use.",
    ],
    supportPoints: [
      "Check the latest month and grant type in one place.",
      "Read plain-language status help before you guess.",
      "Use reminders and saved preferences only if they help you.",
      "Switch to official channels for official actions.",
    ],
    latestGuidesTitle: "Latest guides",
    latestGuidesBody:
      "Read the newest guides when you want more detail on current payment-date searches, status wording, or common support questions.",
    faqTitle: "Common questions",
    faqBody:
      "These quick answers cover the questions people ask most often before they move to a guide or official channel.",
    libraryTitle: "Need deeper help?",
    libraryBody:
      "The full guide library covers common problems, document questions, monthly payment searches, and support topics without crowding the homepage.",
    waysToCheckTitle: "Ways to check your SASSA status",
    waysToCheckBody:
      "Use any of these methods to check your grant application status or payment dates. For accuracy and privacy, try the official SRD portal first.",
    yearScheduleTitle: `SASSA Payment Dates ${year} — Full Year Schedule`,
    yearScheduleBody: `All confirmed and expected SASSA payment dates for ${year}. Dates are based on usual business-day patterns and may change when officially published by SASSA.`,
    nextMonthTitle: "Coming up next",
    nextMonthBody: "Preview the following month's expected payment dates so you can plan ahead.",
  };
}

function buildZuluHomepageContent(monthLabel: string, year: number): HomepageContent {
  return {
    metaTitle: "Izibonelelo ze-SASSA, Izinsuku Zokukhokha Nokuhlola Isimo",
    metaDescription: `Hlola izinsuku zokukhokha ze-SASSA zango-${monthLabel} ${year}, uqhathanise amanani ezibonelelo, uqonde ukuhlolwa kwesimo, futhi uthole isinyathelo esilandelayo se-SRD nezinye izibonelelo.`,
    heroEyebrow: "Usizo oluzimele lwezibonelelo",
    heroTitle: `Izinsuku Zokukhokha ze-SASSA zango-${monthLabel} ${year}`,
    heroDescription: `Hlola izinsuku zokukhokha zango-${monthLabel} ${year}, uqonde amagama esimo, futhi uthole isinyathelo esilandelayo ngokusekelwa okuzolile nokuzimele.`,
    heroDisclaimer:
      "I-GrantCare ayiyona i-SASSA noma uhulumeni waseNingizimu Afrika. Sebenzisa iziteshi zikahulumeni ezisemthethweni ngezicelo, izikhalazo, nokuhlolwa kwesimo okusemthethweni.",
    heroPreviewTitle: `Isifinyezo sezibonelelo sango-${monthLabel} ${year}`,
    heroPreviewBody: "Bona usuku lokukhokha nenani lesibonelelo ngasinye.",
    toolsTitle: "Khetha umsebenzi owudingayo namuhla.",
    toolsIntro:
      "Qala ngethuluzi elifana nombuzo wakho, bese uya endleleni esemthethweni kuphela uma kudingeka isenzo esisemthethweni.",
    supportTitle: "Kungani abantu basebenzisa i-GrantCare",
    supportParagraphs: [
      "Izivakashi eziningi zifika nombuzo owodwa ophuthumayo. Zifuna ukwazi ukuthi usuku selulungile yini, ukuthi umlayezo othi pending noma declined uvame ukusho ukuthini, noma okufanele kuhlolwe ngaphambi kokulandela udaba. Ikhasi lasekhaya kufanele liphendule lokho ngokushesha futhi likhombe ikhasi elilandelayo elifanele.",
      "I-GrantCare ihlala iwusizo ngokugcina leyo misebenzi ihlukene. Amakhasi okukhokha agxila esikhathini. Amakhasi esimo achaza amagama. Isihloli sokufaneleka sinikeza isiqondiso esijwayelekile. Imihlahlandlela ihlala kulabhulali ukuze ikhasi lasekhaya lihlale lihlanzekile futhi lisebenziseke kalula.",
    ],
    supportPoints: [
      "Hlola inyanga yakamuva nohlobo lwesibonelelo endaweni eyodwa.",
      "Funda usizo lwesimo ngolimi oluqondile ngaphambi kokuqagela.",
      "Sebenzisa izikhumbuzi nezintandokazi ezigciniwe kuphela uma zikusiza.",
      "Shintshela eziteshini ezisemthethweni ngezenzo ezisemthethweni.",
    ],
    latestGuidesTitle: "Imihlahlandlela yakamuva",
    latestGuidesBody:
      "Funda imihlahlandlela emisha uma ufuna imininingwane eyengeziwe ngokusesha izinsuku zokukhokha zamanje, amagama esimo, noma imibuzo evamile yosizo.",
    faqTitle: "Imibuzo ejwayelekile",
    faqBody:
      "Lezi zimpendulo ezisheshayo zimboza imibuzo abantu abayibuza kakhulu ngaphambi kokudlulela kumhlahlandlela noma esiteshini esisemthethweni.",
    libraryTitle: "Udinga usizo oluningiliziwe?",
    libraryBody:
      "Ilabhulali ephelele yemihlahlandlela ihlanganisa izinkinga ezivamile, imibuzo yemibhalo, ukusesha izinkokhelo zenyanga, nezihloko zosizo ngaphandle kokugcwalisa ikhasi lasekhaya.",
    waysToCheckTitle: "Izindlela zokuhlola isimo sakho se-SASSA",
    waysToCheckBody:
      "Sebenzisa noma iyiphi yalezi zindlela ukuhlola isimo sesicelo sakho sesibonelelo noma izinsuku zokukhokha. Ukuze kube nokunemba nobumfihlo, zama iphothali esemthethweni ye-SRD kuqala.",
    yearScheduleTitle: `Izinsuku Zokukhokha ze-SASSA ${year} — Uhlelo Lonyaka Wonke`,
    yearScheduleBody: `Zonke izinsuku zokukhokha ze-SASSA eziqinisekisiwe nezilindelekile zango-${year}. Izinsuku zisekelwe emaphethini avamile ezinsuku zebhizinisi futhi zingashintsha uma sezishicilelwe ngokusemthethweni yi-SASSA.`,
    nextMonthTitle: "Okulandelayo",
    nextMonthBody: "Buka kuqala izinsuku zokukhokha ezilindelekile zenyanga elandelayo ukuze uhlele kusenesikhathi.",
  };
}

function buildSetswanaHomepageContent(monthLabel: string, year: number): HomepageContent {
  return {
    metaTitle: "Dithuso tsa SASSA, Malatsi a Tefo le Tlhahlobo ya Maemo",
    metaDescription: `Tlhola malatsi a tefo a SASSA a ${monthLabel} ${year}, bapisa madi a dithuso, tlhaloganya maemo, mme o bone kgato e e latelang ya SRD le dithuso tse dingwe.`,
    heroEyebrow: "Thuso e e ikemetseng ya dithuso",
    heroTitle: `Malatsi a Tefo a SASSA a ${monthLabel} ${year}`,
    heroDescription: `Tlhola malatsi a tefo a ${monthLabel} ${year}, tlhaloganya mafoko a maemo, mme o bone kgato e e latelang ka tshegetso e e ikemetseng.`,
    heroDisclaimer:
      "GrantCare ga se SASSA kgotsa puso ya Aforika Borwa. Dirisa ditsela tsa semmuso tsa puso bakeng sa dikopo, boipiletso, le ditlhahlobo tsa maemo tsa semmuso.",
    heroPreviewTitle: `Tshobokanyo ya dithuso ya ${monthLabel} ${year}`,
    heroPreviewBody: "Bona letsatsi la tefo le madi a thuso nngwe le nngwe.",
    toolsTitle: "Tlhopha tiro e o e tlhokang gompieno.",
    toolsIntro:
      "Simolola ka sedirisiwa se se tshwanang le potso ya gago, mme o ye kwa tseleng ya semmuso fela fa go tlhokega kgato ya semmuso.",
    supportTitle: "Goreng batho ba dirisa GrantCare",
    supportParagraphs: [
      "Baeti ba le bantsi ba tla ka potso e le nngwe e e potlakileng. Ba batla go itse gore letsatsi le setse le bonala, gore molaetsa wa pending kgotsa declined o raya eng, kgotsa se ba tshwanetseng go se tlhola pele ba latela kgang.",
      "GrantCare e nna mosola ka go kgaoganya ditiro tseo. Ditsebe tsa tefo di leba nako. Ditsebe tsa maemo di tlhalosa mafoko. Setlhola-tshwanelo se naya tataiso ya kakaretso. Ditaelo di nna mo laeboraring gore tsebe ya gae e nne phepa.",
    ],
    supportPoints: [
      "Tlhola kgwedi ya bosheng le mofuta wa thuso mo lefelong le le lengwe.",
      "Bala thuso ya maemo ka puo e e bonolo pele o fopholetsa.",
      "Dirisa dikgopotso le ditlhopho tse di bolokilweng fela fa di go thusa.",
      "Fetela kwa ditseleng tsa semmuso bakeng sa dikgato tsa semmuso.",
    ],
    latestGuidesTitle: "Ditaelo tsa bosheng",
    latestGuidesBody:
      "Bala ditaelo tse dintšhwa fa o batla dintlha tse di oketsegileng ka malatsi a tefo, mafoko a maemo, kgotsa dipotso tse di tlwaelegileng.",
    faqTitle: "Dipotso tse di tlwaelegileng",
    faqBody:
      "Dikarabo tseno tse dikhutshwane di akaretsa dipotso tse batho ba di botsang pele ba ya kwa tataisong kgotsa kwa tseleng ya semmuso.",
    libraryTitle: "O tlhoka thuso e e tseneletseng?",
    libraryBody:
      "Laeborari ya ditaelo e akaretsa mathata a a tlwaelegileng, dipotso tsa ditokomane, patlo ya ditefo tsa kgwedi, le ditlhogo tsa tshegetso.",
    waysToCheckTitle: "Ditsela tsa go tlhola maemo a gago a SASSA",
    waysToCheckBody:
      "Dirisa nngwe ya ditsela tseno go tlhola maemo a kopo ya gago kgotsa malatsi a tefo. Bakeng sa nepagalo le sephiri, leka portal ya semmuso ya SRD pele.",
    yearScheduleTitle: `Malatsi a Tefo a SASSA ${year} — Lenaneo la Ngwaga Otlhe`,
    yearScheduleBody: `Malatsi otlhe a tefo a SASSA a a netefaditsweng kgotsa a a solofetsweng a ${year}. Malatsi a ikaegile ka paterone ya malatsi a tiro mme a ka fetoga fa SASSA e phasalatsa semmuso.`,
    nextMonthTitle: "Se se latelang",
    nextMonthBody: "Leba pele malatsi a tefo a kgwedi e e latelang gore o kgone go rulaganya.",
  };
}

export function getHomepageContent(locale: Locale, month: number, year: number) {
  const monthLabel = getHomepageMonthLabel(locale, month);

  if (locale === "zu") {
    return buildZuluHomepageContent(monthLabel, year);
  }

  if (locale === "tn") {
    return buildSetswanaHomepageContent(monthLabel, year);
  }

  if (locale === "xh") {
    return {
      ...translateRouteCopyToXhosa(buildEnglishHomepageContent(monthLabel, year)),
    };
  }

  return buildEnglishHomepageContent(monthLabel, year);
}
