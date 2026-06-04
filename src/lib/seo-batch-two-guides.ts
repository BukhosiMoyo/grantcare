import { addSetswanaTranslations } from "./generated-guide-translations";

const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

type GuideSection = { title: string; body: string };
type TranslatableGuide = {
  title: string;
  summary: string;
  sections: GuideSection[];
  translations?: Record<string, unknown>;
};

const ZU_EXACT_TEXT: Record<string, string> = {
  "Quick answer": "Impendulo emfushane",
  "What this means": "Okushiwo yilokhu",
  "Why this happens": "Kungani lokhu kwenzeka",
  "Why this matters": "Kungani kubalulekile",
  "What you can do next": "Ongakwenza ngokulandelayo",
  "Important things to remember": "Okubalulekile okufanele ukukhumbule",
  "Where GrantCare fits in": "Lapho i-GrantCare ingasiza khona",
  "What you can use GrantCare for": "Ongayisebenzisela i-GrantCare",
  "How GrantCare can help": "Indlela i-GrantCare engasiza ngayo",
  "Related help": "Usizo oluhlobene",
  "How to think about it": "Indlela yokukucabanga",
  "How to read the page well": "Indlela yokufunda ikhasi kahle",
  "The purpose of appealing": "Inhloso yokufaka isikhalazo",
  "What a banking update really changes": "Okushintshwa ngempela ukubuyekeza imininingwane yasebhange",
  "Useful next pages:": "Amakhasi alandelayo awusizo:",
};

function protectStructuredText(value: string) {
  const protectedParts: string[] = [];
  const text = value.replace(/\/[a-z0-9][a-z0-9\-/]*/gi, (match) => {
    protectedParts.push(match);
    return "__GC_PROTECTED_" + (protectedParts.length - 1) + "__";
  });

  return { text, protectedParts };
}

function restoreStructuredText(value: string, protectedParts: string[]) {
  return value.replace(/__GC_PROTECTED_(\d+)__/g, (_, index) => protectedParts[Number(index)] ?? "");
}

function getMonthYearText(value: string): string {
  const parts: string[] = [];
  const months: Record<string, string> = {
    january: "Januwari",
    february: "Febhuwari",
    march: "Mashi",
    april: "Ephreli",
    may: "Meyi",
    june: "Juni",
    july: "Julayi",
    august: "Agasti",
    september: "Septhemba",
    october: "Okthoba",
    november: "Novemba",
    december: "Disemba",
  };
  const lower = value.toLowerCase();

  for (const [english, zulu] of Object.entries(months)) {
    if (lower.includes(english)) {
      parts.push(zulu);
      break;
    }
  }

  const year = value.match(/20\d{2}/)?.[0];
  if (year) {
    parts.push(year);
  }

  return parts.join(" ");
}

function getGrantText(value: string): string {
  const lower = value.toLowerCase();
  if (lower.includes("child support")) return "sesibonelelo sokondla ingane";
  if (lower.includes("older persons") || lower.includes("old age")) return "sesibonelelo sabantu abadala";
  if (lower.includes("disability")) return "sesibonelelo sokukhubazeka";
  if (lower.includes("foster child")) return "sesibonelelo sengane esekunakekelweni";
  if (lower.includes("care dependency")) return "sesibonelelo sokunakekelwa kwengane encike ekusizweni";
  if (lower.includes("grant-in-aid")) return "sesibonelelo sosizo olungeziwe";
  if (lower.includes("srd") || lower.includes("r350") || lower.includes("r370")) return "se-SRD";
  return "sesibonelelo";
}

function getTopic(value: string): string {
  const lower = value.toLowerCase();

  if (lower.includes("bank")) return "imininingwane yasebhange";
  if (lower.includes("appeal") || lower.includes("reconsideration")) return "isikhalazo";
  if (lower.includes("identity") || lower.includes("biometric") || lower.includes("verification") || lower.includes(" id")) return "ukuqinisekiswa kobuwena";
  if (lower.includes("phone") || lower.includes("otp") || lower.includes("sms") || lower.includes("number")) return "inombolo yocingo";
  if (lower.includes("payment") || lower.includes("paid") || lower.includes("fund") || lower.includes("date")) return "inkokhelo";
  if (lower.includes("pending") || lower.includes("processing")) return "isimo esisalindile";
  if (lower.includes("declin") || lower.includes("reject")) return "ukwenqatshwa kwesicelo";
  if (lower.includes("approv")) return "ukuvunywa kwesicelo";
  if (lower.includes("apply") || lower.includes("application") || lower.includes("qualify") || lower.includes("document")) return "isicelo sesibonelelo";
  if (lower.includes("official") || lower.includes("fake") || lower.includes("scam") || lower.includes("portal")) return "indlela esemthethweni";

  return "isimo sesibonelelo";
}

function translateShortText(value: string): string {
  const exact = ZU_EXACT_TEXT[value];
  if (exact) return exact;

  if (value.startsWith("FAQ: ")) {
    return "Umbuzo ovamile: " + translateShortText(value.slice(5));
  }

  const lower = value.toLowerCase();
  const topic = getTopic(value);
  const monthYear = getMonthYearText(value);

  if (lower.includes("payment dates")) {
    return ["Izinsuku zokukhokha", getGrantText(value), monthYear].filter(Boolean).join(" ");
  }

  if (lower.startsWith("how to check")) return "Indlela yokuhlola " + topic + " ngokuphepha";
  if (lower.startsWith("how to update")) return "Indlela yokubuyekeza " + topic;
  if (lower.startsWith("how to change")) return "Indlela yokushintsha " + topic;
  if (lower.startsWith("how to fix")) return "Indlela yokulungisa izinkinga ze-" + topic;
  if (lower.startsWith("how to read")) return "Indlela yokufunda " + topic;
  if (lower.startsWith("how to find")) return "Indlela yokuthola " + topic + " ngokuphepha";
  if (lower.startsWith("how to use")) return "Indlela yokusebenzisa " + topic;
  if (lower.startsWith("how to avoid")) return "Indlela yokugwema izinkinga ze-" + topic;
  if (lower.startsWith("how long")) return "Isikhathi esingathathwa " + topic;
  if (lower.startsWith("how ")) return "Indlela ephathelene no-" + topic;
  if (lower.startsWith("what to do if")) return "Okufanele ukwenze uma kunenkinga ngo-" + topic;
  if (lower.startsWith("what to do after")) return "Okufanele ukwenze ngemva ko-" + topic;
  if (lower.startsWith("what happens after")) return "Kwenzekani ngemva ko-" + topic;
  if (lower.startsWith("what ") && lower.includes(" means")) return "Okushiwo " + topic;
  if (lower.startsWith("what ")) return "Okubalulekile ngo-" + topic;
  if (lower.startsWith("why ") && lower.includes("fail")) return "Kungani " + topic + " kungase kwehluleke";
  if (lower.startsWith("why ")) return "Kungani kwenzeka ku-" + topic;
  if (lower.startsWith("when to")) return "Nini okufanele usebenzise " + topic;
  if (lower.startsWith("who may")) return "Ubani ongase afanelekele ukwesekwa";
  if (lower.startsWith("can ")) return "Umbuzo mayelana no-" + topic;
  if (lower.startsWith("should ")) return "Okufanele ukwazi ngo-" + topic;
  if (lower.startsWith("does ")) return "Umbuzo ngo-" + topic;
  if (lower.startsWith("is ")) return "Umbuzo ngo-" + topic;

  return topic.charAt(0).toUpperCase() + topic.slice(1);
}

function translateRelatedText(value: string): string {
  const lines = value.split("\n");
  return lines
    .map((line, index) => {
      if (index === 0 && line.toLowerCase().includes("useful next pages")) {
        return "Amakhasi alandelayo awusizo:";
      }
      return line;
    })
    .join("\n");
}

function translateSteps(value: string, topic: string): string {
  const stepCount = Math.max(1, value.split("\n").filter((line) => /^\d+\./.test(line.trim())).length);
  const steps = [
    "Funda amagama avela ohlelweni olusemthethweni ngokucophelela.",
    "Qhathanisa lokho nokwaziswa kwakho, ikakhulukazi uma kuthinta " + topic + ".",
    "Londoloza isiqinisekiso, ireferensi, noma isithombe-skrini uma sikhona.",
    "Landela kuphela isinyathelo esikhonjiswa uhlelo; ungaphindi uthumele ulwazi olungadingekile.",
    "Uma inkinga iqhubeka isikhathi eside, sebenzisa iziteshi ezisemthethweni ze-SASSA.",
  ];

  return steps.slice(0, stepCount).map((step, index) => (index + 1) + ". " + step).join("\n");
}

function translateBodyText(value: string): string {
  if (value.includes("Useful next pages:")) {
    return translateRelatedText(value);
  }

  const topic = getTopic(value);
  const lower = value.toLowerCase();

  if (/^\s*1\./.test(value)) {
    return translateSteps(value, topic);
  }

  if (lower.includes("grantcare")) {
    return "I-GrantCare iyinkundla ezimele yolwazi. Ungayisebenzisa ukuqonda amagama ajwayelekile, ukuqhathanisa izinyathelo ezilandelayo, nokuthola amakhasi afanele okumele uwahlole. Ayithathi indawo yenqubo esemthethweni ye-SASSA.";
  }

  if (lower.includes("fake") || lower.includes("scam") || lower.includes("official") || lower.includes("safe")) {
    return "Sebenzisa kuphela indlela esemthethweni uma kudingeka isenzo esisemthethweni. Unganiki abantu ongabathembi umazisi, i-OTP, inombolo yocingo, noma imininingwane yasebhange. Uma ikhasi noma umlayezo ungacacile, qinisekisa kuqala ngaphambi kokuchofoza noma ukuthumela imininingwane.";
  }

  if (lower.includes("pending") || lower.includes("processing")) {
    return "Uma isimo sisalindile noma sisacutshungulwa, kusho ukuthi ukuhlolwa akukapheli. Lokhu akusho ngokuzenzakalelayo ukuthi isicelo senqatshiwe. Linda umjikelezo olandelayo wokubuyekezwa futhi ugweme ukuphinda uthumele imininingwane ngaphandle komyalezo osemthethweni.";
  }

  if (lower.includes("declin") || lower.includes("reject")) {
    return "Uma isicelo senqatshiwe, kusho ukuthi asiphumelelanga kolunye uhlolo lwaleso sikhathi. Funda isizathu esisemthethweni sokwenqatshwa ngaphambi kokuthatha isinyathelo. Uma imininingwane noma isinqumo sibonakala singalungile, indlela elandelayo ingaba ukufaka isikhalazo noma ukulungisa imininingwane.";
  }

  if (lower.includes("approv")) {
    return "Uma isicelo sivunyiwe, kusho ukuthi siphumelele ukuhlolwa kwaleso sigaba. Lokho akusho njalo ukuthi imali isivele ithunyelwe. Kusamele ubheke indlela yokukhokha, usuku lokukhokha, kanye nanoma yimuphi umlayezo ovela ohlelweni olusemthethweni.";
  }

  if (lower.includes("payment") || lower.includes("paid") || lower.includes("fund") || lower.includes("date")) {
    return "Inkomba yenkokhelo kufanele ifundwe kanye nesimo sakho esisemthethweni. Usuku lokukhokha lungashintsha ngenxa yokuhlela, ukuqinisekiswa, indlela yokukhokha, noma ukubambezeleka kwebhange. Hlola imininingwane esemthethweni ngaphambi kokwenza izithembiso zemali.";
  }

  if (lower.includes("bank")) {
    return "Imininingwane yasebhange idinga ukuqinisekiswa ngaphambi kokuthi inkokhelo ithunyelwe. Qinisekisa ukuthi i-akhawunti isebenza, isegameni elifanele, futhi ihambisana nemininingwane yakho. Ungashintshi imininingwane kaningi ngaphandle kwesizathu esicacile ngoba lokho kungadala ukubambezeleka.";
  }

  if (lower.includes("appeal") || lower.includes("reconsideration")) {
    return "Isikhalazo sisetshenziswa uma ucabanga ukuthi isinqumo esisemthethweni asilungile. Qala ngokufunda isizathu sesimo, bese ulungisa ubufakazi obuhambisana naleyo nkinga. Isikhalazo asifani nokufaka isicelo esisha; sicela ukubuyekezwa kwesinqumo esikhona.";
  }

  if (lower.includes("identity") || lower.includes("biometric") || lower.includes("verification") || lower.includes(" id")) {
    return "Ukuqinisekiswa kobuwena kusiza ukuqhathanisa imininingwane yakho namarekhodi asemthethweni. Sebenzisa kuphela isixhumanisi noma indlela eqinisekisiwe. Uma ukuqinisekiswa kwehluleka, hlola umazisi, inombolo yocingo, nemininingwane esefomini ngaphambi kokuzama futhi.";
  }

  if (lower.includes("phone") || lower.includes("otp") || lower.includes("sms") || lower.includes("number")) {
    return "Inombolo yocingo ibalulekile ngoba imilayezo, ama-OTP, nokuhlolwa kwesimo kungase kuxhumane nayo. Uma uyishintsha, lindela ukuthi uhlelo luqinisekise imininingwane ngaphambi kokuthi konke kubonakale kahle. Ungabelani nge-OTP nomunye umuntu.";
  }

  if (lower.includes("apply") || lower.includes("application") || lower.includes("qualify") || lower.includes("document")) {
    return "Isicelo sesibonelelo sidinga imininingwane efanele nemibhalo esekelayo lapho kudingeka khona. Hlola ukuthi uhlobo lwesibonelelo luyahambisana nesimo sakho ngaphambi kokufaka isicelo. Uma kukhona okungaqondakali, sebenzisa indlela esemthethweni noma iziteshi ezisemthethweni ze-SASSA.";
  }

  return "Lo mhlahlandlela uchaza ukuthi ungayifunda kanjani imininingwane yesibonelelo ngendlela ecacile. Bheka amagama asetshenziswa uhlelo olusemthethweni, qhathanisa imininingwane yakho, bese uthatha isinyathelo kuphela uma kudingeka. Uma ungabaza, qinisekisa kuqala ngeziteshi ezisemthethweni.";
}

function toZuluText(value: string): string {
  const { text, protectedParts } = protectStructuredText(value);
  const translated = text.length <= 90 && !text.includes("\n")
    ? translateShortText(text)
    : translateBodyText(text);

  return restoreStructuredText(translated, protectedParts);
}

function addZuluTranslations<T extends TranslatableGuide>(guide: T): T {
  const translations =
    guide.translations && typeof guide.translations === "object" && !Array.isArray(guide.translations)
      ? guide.translations
      : {};

  return {
    ...guide,
    translations: {
      ...translations,
      zu: {
        title: toZuluText(guide.title),
        summary: toZuluText(guide.summary),
        sections: guide.sections.map((item) =>
          section(toZuluText(item.title), toZuluText(item.body)),
        ),
      },
    },
  };
}

export const SEO_BATCH_TWO_GUIDES = [
  {
    slug: "payment-dates-2026",
    title: "Payment dates 2026",
    summary:
      "How to use the GrantCare payment-date pages during 2026, what expected and published dates mean, and where to confirm official updates safely.",
    sections: [
      section(
        "Quick answer",
        "Start with the current month page and look at whether the dates are marked as published or expected — that label tells you how much weight to put on it. Dates can still change, so the label is always the first thing to check.",
      ),
      section(
        "What this means",
        "The 2026 payment-date pages are designed to help you read monthly schedules clearly. Some dates may be shown as expected until the official release is available — that gives you a useful planning view without pretending an estimate is final.",
      ),
      section(
        "Why this matters in 2026",
        "Many users come back every month to check grant timing, which is completely understandable. The problem is that payment information gets muddled when someone mixes confirmed dates, estimated dates, and SRD-specific wording all on one page. A clear 2026 overview helps you understand what kind of date you're actually looking at before you make transport, cash-out, or household plans.",
      ),
      section(
        "What you can do next",
        "1. Open the month you need most first.\n2. Check whether your grant type is listed directly or grouped with another payment category.\n3. Look for published wording before treating any date as final.\n4. Use the official channel if a date is missing or changes.\n5. Save reminders if you want a prompt before the expected payment window.",
      ),
      section(
        "Important things to remember",
        "Regular grants and SRD don't always follow the same schedule or update at the same time. Some months will show a clear date for one grant and a portal-only message for another — both of those are valid answers for different reasons. GrantCare is an independent platform, so official confirmation always needs to come from the relevant government channel.",
      ),
      section(
        "Using GrantCare for 2026 planning",
        "Compare months side by side, understand what each payment label means, and keep track of expected dates without treating them as official final dates.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates\n• /payment-dates/2026/april\n• /payment-dates/2026/may\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready",
      ),
      faq(
        "Are all 2026 payment dates final?",
        "No. Some may be published and some may still be expected. Always check the label on the page.",
      ),
      faq(
        "Where should I confirm official dates?",
        "Use the relevant official SASSA or SRD channel for confirmation when you need a final official update.",
      ),
      faq(
        "Can I use GrantCare for reminders?",
        "Yes. You can save dates and set reminder preferences, but GrantCare does not replace official payment confirmation.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 14,
  },
  {
    slug: "payment-dates-april-2026",
    title: "Payment dates April 2026",
    summary:
      "How to use the April 2026 payment-date page, which dates are confirmed, and how to check the right category before planning around a payout.",
    sections: [
      section(
        "Quick answer",
        "Find the April month page, then check your specific grant category before relying on any date. A date marked expected is just a guide — it's not the same as one that's been officially published.",
      ),
      section(
        "What this means",
        "April is often a month where people need certainty quickly because household plans are already in motion. Match your grant category on the page and read the payment label — both matter just as much as the date itself.",
      ),
      section(
        "Why this happens",
        "Confusion usually starts when users see one April date online and assume it applies to every grant. Regular grants can have a sequence, children's grants may be grouped together, and SRD-style support may require the official portal rather than a single public date.",
      ),
      section(
        "What you can do next",
        "1. Open the April 2026 payment page.\n2. Find your grant category or the grouped schedule that applies to it.\n3. Check whether the date is marked published, expected, or portal-only.\n4. Save the page if you expect to check again.\n5. Use the official source if the April wording changes close to the payment window.",
      ),
      section(
        "Important things to remember",
        "Don't rely on screenshots from WhatsApp or social media if the current page is showing a different or newer update. April 2026 information can still change if the official source publishes a correction — always treat the latest official release as the final word.",
      ),
      section(
        "April 2026 on GrantCare",
        "Read the April 2026 schedule clearly, compare grant categories, and follow through to the next useful guide if the page shows pending or portal-only wording.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/april\n• /payment-dates/2026/april/older-persons\n• /payment-dates/2026/april/disability\n• /payment-dates/2026/april/social-relief\n• /guides/payment-dates-2026",
      ),
      faq(
        "Is the April 2026 page enough on its own?",
        "It is a useful guide, but for official confirmation you should still use the relevant government channel when needed.",
      ),
      faq(
        "Why can one April page show different types of payment wording?",
        "Because not every grant type is updated the same way or on the same schedule.",
      ),
      faq(
        "Should I keep checking April 2026 if the date already looks published?",
        "It is still worth checking closer to payment time if you need absolute certainty.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 15,
  },
  {
    slug: "payment-dates-may-2026",
    title: "Payment dates May 2026",
    summary:
      "How to read the May 2026 payment page safely, plan around expected dates, and spot when you need official confirmation instead.",
    sections: [
      section(
        "Quick answer",
        "Use the May payment page and find your specific grant type before acting on any date. If the date still shows expected, treat it as a planning guide only — wait for the published update before making firm plans around it.",
      ),
      section(
        "What this means",
        "May payment date searches are usually driven by real, practical planning — when to travel, when to budget, when to expect money. This page works best when you read it grant-by-grant rather than assuming a single May date applies to everything.",
      ),
      section(
        "Why this happens",
        "Many problems come from mixing regular grant schedules with SRD-style payment expectations or from following an older update after the month page has changed. A clean May 2026 guide helps reduce that confusion.",
      ),
      section(
        "What you can do next",
        "1. Open the May 2026 payment page.\n2. Check whether your grant is listed directly or under a grouped category.\n3. Read the note attached to the date, not only the date itself.\n4. Save reminders if you want a prompt near the expected payment window.\n5. Return to the official source for confirmation when the page still shows an expected or portal-only status.",
      ),
      section(
        "Important things to remember",
        "An expected date is genuinely useful for planning, but it's not the same as a final confirmed date. The closer you get to the payment window, the more important it becomes to check for the latest published update.",
      ),
      section(
        "May 2026 on GrantCare",
        "Compare May 2026 with April or later months, read status wording if payment is delayed, and keep the next useful payment page ready on your dashboard.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/may\n• /payment-dates/2026/may/older-persons\n• /payment-dates/2026/may/disability\n• /payment-dates/2026/may/social-relief\n• /guides/how-to-understand-payment-dates",
      ),
      faq(
        "Can May 2026 dates change?",
        "Yes. Official payment information can still be updated, so final confirmation matters.",
      ),
      faq(
        "Does the month page cover SRD too?",
        "It can help you understand the status of SRD timing, but SRD may still require the official portal for final checking.",
      ),
      faq(
        "What if my grant is not shown exactly by name?",
        "Check whether it falls under a grouped payment category and use the related grant page to confirm the match.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 16,
  },
  {
    slug: "srd-payment-dates-april-2026",
    title: "SRD payment dates April 2026",
    summary:
      "Why SRD timing often differs from regular grants in April 2026, what portal-only wording means, and how to check safely.",
    sections: [
      section(
        "Quick answer",
        "For SRD payment dates in April 2026, check the April payment page and then confirm through the official SRD portal. SRD timing is handled differently from regular grant dates — one public date doesn't always apply to everyone.",
      ),
      section(
        "What this means",
        "SRD users often come looking for one simple April date, but SRD timing can depend on your individual outcome or what the portal is showing for your specific case. GrantCare may show portal-only wording instead of a fixed public date because that's actually the more honest and accurate answer — one date doesn't always fit every SRD applicant.",
      ),
      section(
        "Why this happens",
        "SRD payments move differently from regular monthly grants. The official process relies more heavily on the portal, individual results, and status outcomes — so a simple one-line public date is often less reliable for SRD than for other grants.",
      ),
      section(
        "What you can do next",
        "1. Open the April 2026 payment page.\n2. Find the SRD or social-relief category.\n3. Read the note explaining whether the timing is portal-based.\n4. Use the official SRD portal for your own final confirmation.\n5. If your status is approved but you still do not see payment, compare it with the missing-payment and payment-processing guides.",
      ),
      section(
        "Important things to remember",
        "Be careful with social media posts claiming one fixed April SRD date applies to everyone — that's rarely true for SRD. Portal-based wording exists because individual cases move differently. GrantCare is an independent guide, not the official SRD system.",
      ),
      section(
        "SRD on GrantCare",
        "Understand the difference between portal-only timing and regular grant schedules, so you know when to read the month page and when to go straight to the official portal.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/april/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/where-to-find-official-updates-safely\n• /status/approved",
      ),
      faq(
        "Why does SRD show portal-only instead of a date?",
        "Because a single public date may not reflect every user's actual SRD timing safely or accurately.",
      ),
      faq(
        "Can I still use GrantCare for SRD reminders?",
        "Yes. You can keep track of the page and related status guidance, but official confirmation still belongs on the official portal.",
      ),
      faq(
        "What if the portal result and another website do not match?",
        "Use the official portal as the final authority.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 17,
  },
  {
    slug: "srd-payment-dates-may-2026",
    title: "SRD payment dates May 2026",
    summary:
      "What to expect from May 2026 SRD payment timing, how portal-based updates work, and how to avoid reading unofficial dates as final confirmation.",
    sections: [
      section(
        "Quick answer",
        "For May 2026 SRD payment dates, use the May page as context and check the official SRD portal for your own confirmed timing. SRD often needs portal-based checking because individual cases don't all move the same way.",
      ),
      section(
        "What this means",
        "May 2026 SRD searches often come from users who want a fast answer, but the most trustworthy answer is not always a fixed date. A portal-only or guidance-based page is safer than pretending one public day applies to every SRD case.",
      ),
      section(
        "Why this happens",
        "SRD users can have different outcomes and update paths, which makes official portal checking especially important. A good May guide should reduce confusion, not create false certainty.",
      ),
      section(
        "What you can do next",
        "1. Open the May 2026 SRD payment page.\n2. Read the note attached to the SRD category.\n3. Check your own status and timing on the official portal.\n4. Review payment-processing or approved-but-no-payment guidance if the result is still unclear.\n5. Save the page if you want to monitor changes through May.",
      ),
      section(
        "Important things to remember",
        "Unofficial SRD date claims spread fast when people are stressed and need answers. The problem is they're often based on one person's experience or an old screenshot. Always separate useful guidance from official confirmation — it protects you from acting on the wrong information.",
      ),
      section(
        "SRD pages on GrantCare",
        "Read SRD timing language, understand related status wording, and move to the most relevant help page without being pushed toward unofficial actions.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/may/social-relief\n• /guides/payment-processing-meaning\n• /guides/what-pending-verification-means\n• /guides/where-to-find-official-updates-safely\n• /status/pending",
      ),
      faq(
        "Does portal-only mean no payment is coming?",
        "No. It means the official portal is the safer place to confirm the timing.",
      ),
      faq(
        "Should I trust a viral May SRD date post?",
        "Only after it matches the official portal or relevant official source.",
      ),
      faq(
        "What if my SRD status changes during May?",
        "Follow the latest official wording and use the related GrantCare status guides for explanation.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 18,
  },
  {
    slug: "child-support-grant-payment-dates-april-2026",
    title: "Child Support Grant payment dates April 2026",
    summary:
      "How to check Child Support Grant timing in April 2026, including how children's grant schedules are usually grouped and what to confirm before relying on a date.",
    sections: [
      section(
        "Quick answer",
        "For Child Support Grant payment dates in April 2026, use the April payment page and look at the children's grant schedule. Child Support timing is often grouped with other children's grants rather than listed on its own — check for that grouping first.",
      ),
      section(
        "What this means",
        "People often search for Child Support Grant by name, but payment pages sometimes group child-related grants under one children's category. That doesn't make the information less useful — it just means you check the grouped schedule and confirm that it covers your grant type.",
      ),
      section(
        "Why this happens",
        "Grouping keeps the payment view simpler when several child-related grants usually move together. Without that grouping, users can end up with duplicate pages that say almost the same thing while still causing confusion.",
      ),
      section(
        "What you can do next",
        "1. Open the April 2026 payment page.\n2. Check the children's grant entry.\n3. Confirm that your case is specifically a Child Support Grant.\n4. Read the note for any warning about expected versus published timing.\n5. Use the official source if you need final confirmation before you travel or queue.",
      ),
      section(
        "Important things to remember",
        "A grouped children's date is a helpful planning guide, but it's not the same as a confirmed official release. That distinction matters most close to the actual payment day — that's when accuracy counts.",
      ),
      section(
        "Children's grants on GrantCare",
        "Connect the children's payment schedule to the right grant page, understand the wording on the month view, and find the next guide if you need help with missing payments or status updates.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/april\n• /grants/child-support\n• /guides/payment-dates-april-2026\n• /guides/what-documents-you-may-need\n• /guides/what-to-do-if-you-missed-a-payment",
      ),
      faq(
        "Why is Child Support Grant not always listed on its own?",
        "Because some payment tools group children's grants together when they usually follow the same schedule.",
      ),
      faq(
        "Can the children's date still change?",
        "Yes. Expected and published labels should still be checked carefully.",
      ),
      faq(
        "Where do I confirm the final official date?",
        "Use the relevant official SASSA channel if you need final confirmation.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 19,
  },
  {
    slug: "child-support-grant-payment-dates-may-2026",
    title: "Child Support Grant payment dates for May 2026",
    summary:
      "A clear guide to the child grant date for May 2026, explaining how Child Support Grant timing fits into the grouped children's payment schedule and where to confirm the latest trustworthy update.",
    sections: [
      section(
        "Quick answer",
        "If you are looking for the child grant date for May 2026, start with the children's grant schedule on the May payment page. Then read the payment note carefully and confirm any final date through the official channel before you build firm plans around it.",
      ),
      section(
        "What this means",
        "Child Support Grant searches are often urgent — families are budgeting around school fees, food, and transport and can't afford to get the date wrong. A clear May page helps most when it explains that the children's schedule may be grouped and that the label on the date still matters as much as the number itself.",
      ),
      section(
        "Why this happens",
        "Confusion usually comes from comparing different posts that use different grant names for the same grouped schedule. A grouped children's entry can still be the right place to check, as long as you read the surrounding note carefully.",
      ),
      section(
        "What you can do next",
        "1. Open the May 2026 payment page.\n2. Check the children's grant entry.\n3. Compare the payment note with the current official update.\n4. Save the page if you want to watch for changes.\n5. Read the missing-payment guide if the date passes and payment still does not reflect.",
      ),
      section(
        "Important things to remember",
        "A live page with a current label is more trustworthy than an old screenshot that's been shared around. Don't assume a single image covers every children's grant update. GrantCare is an independent guide — official confirmation still comes from the relevant SASSA channel.",
      ),
      section(
        "Children's grants on GrantCare",
        "Follow grouped payment information more confidently, connect it to the right grant page, and find related help without making the process feel overwhelming.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/may/children\n• /payment-dates/2026/may\n• /grants/child-support\n• /guides/how-to-know-if-your-payment-is-ready\n• /guides/how-to-fix-missing-payment-issues",
      ),
      faq(
        "Is the children's schedule the same as Child Support Grant?",
        "It is often the relevant schedule to check, but confirm the exact wording on the page and with the official source when needed.",
      ),
      faq(
        "Should I wait for a published label?",
        "Yes, if you need a final official date rather than an estimate for planning.",
      ),
      faq(
        "Can I use reminders for this?",
        "Yes. GrantCare reminders can help you return to the right month page at the right time.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 20,
  },
  {
    slug: "older-persons-grant-payment-dates-april-2026",
    title: "Older Persons Grant payment dates April 2026",
    summary:
      "April 2026 Older Persons Grant payment timing, how to read the month page, and when to treat a date as planning guidance versus final confirmation.",
    sections: [
      section(
        "Quick answer",
        "For Older Persons Grant payment dates in April 2026, go straight to the April payment page and find the Older Persons Grant entry. Check whether the date shown is published or expected — that label changes how much you should rely on it.",
      ),
      section(
        "What this means",
        "Older Persons Grant is usually one of the cleaner, more straightforward entries on the monthly page — which makes it quicker to find an answer. But the note beside the date still matters. An expected date and a published date carry very different levels of certainty.",
      ),
      section(
        "Why this happens",
        "Users often search by grant name and month because they want certainty before making transport or collection plans. The risk is assuming an early expected date is final — a strong April guide helps you avoid that mistake.",
      ),
      section(
        "What you can do next",
        "1. Open the April 2026 month page.\n2. Select the Older Persons Grant entry.\n3. Check the label and note beside the date.\n4. Save the date or reminder if it looks relevant to you.\n5. Confirm through the official channel if the April entry changes close to payment time.",
      ),
      section(
        "Important things to remember",
        "Don't build firm plans around an estimate as if it were final — especially for something like transport or queuing at a collection point. If the payment doesn't arrive near the expected time, check whether there's a newer update before assuming something went wrong.",
      ),
      section(
        "Older Persons Grant on GrantCare",
        "Read the April 2026 Older Persons Grant page clearly, compare it with the wider month view, and keep track of the next page to check if anything changes.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/april/older-persons\n• /payment-dates/2026/april\n• /grants/older-persons\n• /guides/payment-dates-april-2026\n• /guides/how-to-know-if-your-payment-is-ready",
      ),
      faq(
        "Is Older Persons Grant shown separately on the payment page?",
        "Usually yes, which makes it one of the simpler monthly entries to follow.",
      ),
      faq(
        "Can the April 2026 Older Persons date still change?",
        "Yes. A published update is stronger than an expected date, so always check the latest page state.",
      ),
      faq(
        "What if I see a different date somewhere else?",
        "Trust the latest official update first, then use GrantCare to compare and understand the difference.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 21,
  },
  {
    slug: "older-persons-grant-payment-dates-may-2026",
    title: "Older Persons Grant payment dates May 2026",
    summary:
      "May 2026 Older Persons Grant guide — how to read the correct date, check the payment label, and plan carefully around official confirmation.",
    sections: [
      section(
        "Quick answer",
        "For Older Persons Grant payment dates in May 2026, open the May payment page and read the Older Persons Grant entry carefully. If the date is still marked expected, use it for planning only — wait for the published update before making any firm decisions.",
      ),
      section(
        "What this means",
        "A useful payment page doesn't just show you a date — it tells you how certain that date is. That second part matters just as much as the number itself, especially when you're planning around a grant you depend on.",
      ),
      section(
        "Why this happens",
        "Users understandably want one clear date, especially for a grant people depend on regularly. But responsible guidance must still separate a helpful estimate from a final official release.",
      ),
      section(
        "What you can do next",
        "1. Open the May 2026 month page.\n2. Select the Older Persons Grant entry.\n3. Check whether the date is marked published or expected.\n4. Use reminders if you want a prompt near the likely payment window.\n5. Go to the official channel if you need final confirmation before taking action.",
      ),
      section(
        "Important things to remember",
        "The most trustworthy payment date page isn't the one that sounds most confident — it's the one that tells you clearly how certain the information actually is. That's how you avoid false confidence and making plans around a date that hasn't been confirmed yet.",
      ),
      section(
        "Older Persons Grant on GrantCare",
        "Follow the May 2026 Older Persons Grant page, compare it with other months, and understand what to do if the payment does not arrive when expected.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/may/older-persons\n• /payment-dates/2026/may\n• /grants/older-persons\n• /guides/how-to-fix-missing-payment-issues\n• /guides/what-to-do-if-you-missed-a-payment",
      ),
      faq(
        "Can I rely on the May date if it is marked expected?",
        "Use it carefully for planning, but do not treat it as final official confirmation.",
      ),
      faq(
        "What if payment is late even after the expected date?",
        "Check for a newer update first, then use the official route if the payment still does not reflect.",
      ),
      faq(
        "Why does GrantCare use labels like expected?",
        "Because clarity about certainty builds trust and helps users avoid acting on unconfirmed information.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 22,
  },
  {
    slug: "disability-grant-payment-dates-april-2026",
    title: "Disability Grant payment dates April 2026",
    summary:
      "April 2026 Disability Grant guide — how to read the month page, understand expected versus published dates, and know when to follow up safely.",
    sections: [
      section(
        "Quick answer",
        "For Disability Grant payment dates in April 2026, open the April payment page and look for the Disability Grant entry directly. Read the label on the date — expected and officially published are not the same thing, and that difference matters when you're making plans around a payment.",
      ),
      section(
        "What this means",
        "The Disability Grant entry is there to help you find likely payment timing quickly. But the date, the note beside it, and the current page state all need to be read together — the note often carries the most important part of the message.",
      ),
      section(
        "Why this happens",
        "Monthly payment-date searches are often driven by urgent budgeting needs. That urgency can lead people to treat any visible date as final. The April 2026 Disability Grant guide is most useful when it slows that down just enough to keep the information trustworthy.",
      ),
      section(
        "What you can do next",
        "1. Open the April 2026 payment page.\n2. Choose the Disability Grant entry.\n3. Read the note attached to the date.\n4. Save the payment page or reminder if helpful.\n5. Use the official source if you need final confirmation or if the payment does not reflect near the expected time.",
      ),
      section(
        "Important things to remember",
        "A payment date guide should help you plan, not mislead you — that's why published and expected dates are shown differently on this page. If there's any conflict between what GrantCare shows and an official update, the official update wins.",
      ),
      section(
        "Disability Grant on GrantCare",
        "Compare the April Disability Grant page with other months, understand payment-related wording, and find the next relevant guide if the payment is delayed.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /payment-dates/2026/april/disability\n• /payment-dates/2026/april\n• /grants/disability\n• /guides/payment-dates-april-2026\n• /guides/why-payment-is-delayed",
      ),
      faq(
        "Is the Disability Grant shown separately on the month page?",
        "Usually yes, which makes it easier to check directly than some grouped categories.",
      ),
      faq(
        "Should I trust the first date I see online?",
        "Only after you check whether it matches the latest page state and, when needed, the official source.",
      ),
      faq(
        "What if the April date changes?",
        "Use the most recent official update as the final authority and treat older shares with caution.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 23,
  },
].map(addZuluTranslations).map(addSetswanaTranslations);
