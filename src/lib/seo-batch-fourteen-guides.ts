import { addSetswanaTranslations } from "./generated-guide-translations";

const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

type GuideConfig = {
  slug: string;
  title: string;
  summary: string;
  quickAnswer: string;
  whatThisMeans: string;
  whyThisMatters: string;
  steps: string;
  keyFocusTitle?: string;
  keyFocus: string;
  important: string;
  help: string;
  related: string;
  faqs: Array<{ question: string; answer: string }>;
  sortOrder: number;
};

function guide({
  slug,
  title,
  summary,
  quickAnswer,
  whatThisMeans,
  whyThisMatters,
  steps,
  keyFocusTitle = "How to think about it",
  keyFocus,
  important,
  help,
  related,
  faqs,
  sortOrder,
}: GuideConfig) {
  return {
    slug,
    title,
    summary,
    sections: [
      section("Quick answer", quickAnswer),
      section("What this means", whatThisMeans),
      section("Why this matters", whyThisMatters),
      section("What you can do next", steps),
      section(keyFocusTitle, keyFocus),
      section("Important things to remember", important),
      section("How GrantCare can help", help),
      section("Related help", related),
      ...faqs.map((item) => faq(item.question, item.answer)),
    ],
    featured: false,
    sponsored: false,
    sortOrder,
  };
}

function grantIncreaseGuide({
  slug,
  title,
  grantName,
  grantPath,
  sortOrder,
}: {
  slug: string;
  title: string;
  grantName: string;
  grantPath: string;
  sortOrder: number;
}) {
  return guide({
    slug,
    title,
    summary:
      `A trust-first guide to ${grantName.toLowerCase()} increase searches and how to separate official published updates from copied posts or old year labels.`,
    quickAnswer:
      `Check ${grantName.toLowerCase()} increase updates by using the latest official published information rather than trusting screenshots, copied posts, or old year labels on their own.`,
    whatThisMeans:
      `${grantName} increase searches often come from users who want one simple answer about money or timing. The safe answer is usually not one number in a post. It is the most recent official published update for that grant category.`,
    whyThisMatters:
      `Increase rumours spread easily because users want certainty quickly. If the number is wrong or out of date, it can create false hope, panic, or confusion about when a change really applies.`,
    steps:
      `1. Check the latest official update for ${grantName.toLowerCase()} changes.\n2. Be careful with year labels such as 2025 or 2026 if the post is old.\n3. Avoid trusting screenshots with no source.\n4. Compare the update with the grant type you actually receive.\n5. Use GrantCare if you need help reading the update without mistaking guidance for confirmation.`,
    keyFocusTitle: "The grant type matters as much as the number",
    keyFocus:
      `The safest way to read an increase claim is to match it to the exact grant type first. A number that sounds right in general can still be wrong for ${grantName.toLowerCase()} support specifically.`,
    important:
      "GrantCare does not publish official grant increases as government authority. It helps users read public claims more carefully and points them back to official channels for final confirmation.",
    help:
      "GrantCare can help you compare grant-type pages, payment dates, and safe update-checking guides so increase claims feel less confusing and less risky.",
    related:
      `Useful next pages:\n• ${grantPath}\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely`,
    faqs: [
      {
        question: `Should I trust a ${grantName.toLowerCase()} increase post without a source?`,
        answer: "No. It is safer to confirm the latest official published update first.",
      },
      {
        question: "Why do old year labels matter so much?",
        answer: "Because users often share older posts that no longer reflect the latest published position.",
      },
      {
        question: "Can GrantCare confirm the final amount?",
        answer: "GrantCare can explain what a claim means, but official confirmation still belongs to the relevant government channels.",
      },
    ],
    sortOrder,
  });
}

function claimedAmountGuide({
  slug,
  title,
  claimLabel,
  sortOrder,
}: {
  slug: string;
  title: string;
  claimLabel: string;
  sortOrder: number;
}) {
  return guide({
    slug,
    title,
    summary:
      `A plain-language guide to ${claimLabel} searches and why users should treat claimed grant amounts as something to verify, not as instant proof of a real grant.`,
    quickAnswer:
      `${claimLabel} searches usually mean users are trying to verify whether a claimed grant amount or payment story is real. The safest move is to treat the claim as unconfirmed until an official source clearly supports it.`,
    whatThisMeans:
      `Claimed grant amounts can spread very quickly because they look simple and specific. That precision makes them feel trustworthy, but a familiar amount alone does not prove that the claim reflects a real official grant or official payment update.`,
    whyThisMatters:
      "False amount claims often create urgency, false hope, or pressure to click fast. Users who pause to verify the source are much less likely to follow a fake route or trust a misleading post.",
    steps:
      "1. Treat the claimed amount as unconfirmed at first.\n2. Check whether the claim comes from a clear official update.\n3. Avoid trusting beneficiary lists, urgent posts, or copied application links on their own.\n4. Compare the claim with the grant type or support route it supposedly matches.\n5. Use GrantCare to understand the claim safely before you act on it.",
    keyFocusTitle: "A specific amount can still be a weak signal",
    keyFocus:
      "People often trust a claim because it sounds exact. The better question is not how specific the amount is. The better question is whether the route, source, and grant category actually line up with it.",
    important:
      "GrantCare is independent and should never be mistaken for an official source of grant creation, approval, or amount confirmation. Official grant amounts and eligibility still belong to official channels.",
    help:
      "GrantCare can help you compare claimed amounts with official-route guidance, eligibility pages, and safe update-checking habits so you do not mistake a rumour for a real grant.",
    related:
      `Useful next pages:\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely`,
    faqs: [
      {
        question: `Does the amount ${claimLabel} make a claim more trustworthy?`,
        answer: "No. A specific amount still needs a trustworthy official source behind it.",
      },
      {
        question: "Why do amount rumours spread so easily?",
        answer: "Because exact numbers feel clear and shareable even when the source is weak.",
      },
      {
        question: "What should I check before acting on a claim?",
        answer: "Check the source, the route, and the grant category the claim is actually talking about.",
      },
    ],
    sortOrder,
  });
}

const SEO_BATCH_FOURTEEN_GUIDES_SOURCE = [
  guide({
    slug: "what-grant-increase-searches-usually-mean",
    title: "What grant increase searches usually mean",
    summary:
      "A clear guide to grant increase searches and how to read them safely without confusing rumours, old posts, and official updates.",
    quickAnswer:
      "Grant increase searches usually mean users want to know whether grant amounts changed. The safest way to read those searches is to separate general rumours from the latest official published update.",
    whatThisMeans:
      "People often search for increase when they want one direct answer about money. In practice, the useful answer usually depends on the date of the update, the grant type, and whether the source is clearly official.",
    whyThisMatters:
      "If a user trusts an old or unclear increase post, the result can be false expectations about grant amounts, payment timing, or eligibility.",
    steps:
      "1. Check whether the increase claim is linked to a clear official update.\n2. Match the update to the exact grant type.\n3. Be careful with year labels from older posts.\n4. Avoid trusting screenshots without source.\n5. Use GrantCare to interpret the claim without treating it as official confirmation.",
    keyFocusTitle: "The safest question is not did it increase, but according to what source",
    keyFocus:
      "Increase rumours often feel believable because they are shared as simple facts. The stronger test is whether the claim clearly comes from an official published update and whether it fits the grant category you actually care about.",
    important:
      "GrantCare can explain increase claims, but official grant amounts and official changes still belong to official government channels.",
    help:
      "GrantCare can help you compare grant categories, payment-date context, and update-checking guides so increase searches become easier to read safely.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely\n• /grants",
    faqs: [
      {
        question: "Why do grant increase searches feel urgent?",
        answer: "Because they affect money expectations and users often want a fast, simple answer.",
      },
      {
        question: "What should I check first?",
        answer: "Check the source, the date, and the exact grant category involved.",
      },
      {
        question: "Can GrantCare confirm the official increase?",
        answer: "No. It can help explain the claim, but official confirmation still belongs to official channels.",
      },
    ],
    sortOrder: 294,
  }),
  guide({
    slug: "how-to-check-if-a-grant-increase-update-is-official",
    title: "How to check if a grant increase update is official",
    summary:
      "A trust-first guide to checking whether a grant increase update really comes from an official source before you rely on it.",
    quickAnswer:
      "Check whether a grant increase update is official by looking at the source, the route, and the grant category rather than trusting the amount or wording alone.",
    whatThisMeans:
      "Many increase posts look believable because they use familiar grant language. The problem is that copied wording can move faster than real official updates.",
    whyThisMatters:
      "A false increase claim can change household plans, create worry, or push users toward unsafe pages that pretend to explain or unlock the change.",
    steps:
      "1. Look for a clear official source.\n2. Match the update to the correct grant category.\n3. Check whether the post still makes sense for the latest period.\n4. Avoid relying on shared screenshots without source.\n5. Use GrantCare if you need help understanding the difference between guidance and confirmation.",
    keyFocusTitle: "Source comes before amount",
    keyFocus:
      "The amount in the post is not the strongest proof. The strongest proof is whether the update clearly belongs to the correct official route and clearly applies to the grant being discussed.",
    important:
      "GrantCare does not act as the official publisher of grant increases. It helps users evaluate claims more carefully.",
    help:
      "GrantCare can help you compare increase posts with grant-type pages, official-route guides, and payment-date context so you can read the claim more calmly.",
    related:
      "Useful next pages:\n• /guides/what-grant-increase-searches-usually-mean\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why is source more important than the number?",
        answer: "Because a number can be copied easily, while a clear official source is much harder to fake well.",
      },
      {
        question: "Should I trust an increase image shared in a group?",
        answer: "No. Confirm the official source first.",
      },
      {
        question: "What else should I match besides the source?",
        answer: "Match the update to the right grant category and the right period.",
      },
    ],
    sortOrder: 295,
  }),
  guide({
    slug: "how-to-read-grant-increase-news-safely",
    title: "How to read grant increase news safely",
    summary:
      "A practical guide to reading grant increase news in a calm and careful way without turning every headline into confirmed action.",
    quickAnswer:
      "Read grant increase news safely by checking whether the report points to a clear official update, whether the headline matches the grant category, and whether the timing is still current.",
    whatThisMeans:
      "News-style increase reports often compress a lot of information into one headline. Users still need to slow down enough to ask what changed, for which grant, and according to what official source.",
    whyThisMatters:
      "A short headline can make a tentative or old update sound immediate and universal when it is not.",
    steps:
      "1. Read beyond the headline.\n2. Check what grant category the report is actually about.\n3. Look for whether it points back to an official published update.\n4. Be careful with old stories that are shared again later.\n5. Use GrantCare to understand the practical meaning without over-reading the headline.",
    keyFocusTitle: "Headlines often simplify more than they explain",
    keyFocus:
      "A useful habit is to treat increase headlines as starting points for verification, not as final proof. The smaller details often change how the headline should be understood.",
    important:
      "GrantCare can help users read public reporting more carefully, but it does not replace official sources of final confirmation.",
    help:
      "GrantCare can help you move from a headline into the right grant page, update-checking guide, or payment context without guessing.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/what-grant-increase-searches-usually-mean\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely\n• /guides/how-to-know-if-a-sassa-website-is-official",
    faqs: [
      {
        question: "Why should I read beyond the headline?",
        answer: "Because the important details about source, timing, and grant category are often inside the story, not in the title.",
      },
      {
        question: "Can an old increase story keep circulating later?",
        answer: "Yes. That is why checking the timing matters so much.",
      },
      {
        question: "What should I compare the news report with?",
        answer: "Compare it with the relevant official update and the correct grant category.",
      },
    ],
    sortOrder: 296,
  }),
  grantIncreaseGuide({
    slug: "how-to-check-older-persons-grant-increase-updates-safely",
    title: "How to check older persons grant increase updates safely",
    grantName: "Older Persons Grant",
    grantPath: "/grants/older-persons",
    sortOrder: 297,
  }),
  grantIncreaseGuide({
    slug: "how-to-check-disability-grant-increase-updates-safely",
    title: "How to check disability grant increase updates safely",
    grantName: "Disability Grant",
    grantPath: "/grants/disability",
    sortOrder: 298,
  }),
  grantIncreaseGuide({
    slug: "how-to-check-child-support-grant-increase-updates-safely",
    title: "How to check child support grant increase updates safely",
    grantName: "Child Support Grant",
    grantPath: "/grants/child-support",
    sortOrder: 299,
  }),
  guide({
    slug: "what-pension-increase-searches-usually-mean",
    title: "What pension increase searches usually mean",
    summary:
      "A calm guide to pension-style increase searches and how to read them without confusing general talk, old-age grant posts, and official updates.",
    quickAnswer:
      "Pension increase searches usually mean users are trying to verify older-person support changes. The safest habit is to match the claim to the actual grant category and the latest official update.",
    whatThisMeans:
      "People often use the word pension even when they mean the older persons grant. That can make search results feel mixed and harder to trust if the route and grant category are not checked carefully.",
    whyThisMatters:
      "If the wording in the post and the official grant category do not match cleanly, it is easier for old or unclear claims to spread.",
    steps:
      "1. Check whether the post is really about the older persons grant.\n2. Look for a clear official source.\n3. Be cautious with year-based posts shared again later.\n4. Avoid trusting the amount alone.\n5. Use GrantCare if you need help translating the search language into the correct grant category.",
    keyFocusTitle: "Search language and official grant names are not always the same",
    keyFocus:
      "A big part of safe reading here is recognising that search habits can use one label while the official grant system uses another. That translation step helps users verify the right route.",
    important:
      "GrantCare helps users understand pension-style searches, but official confirmation about the older persons grant still belongs to official channels.",
    help:
      "GrantCare can help you move from pension wording into the older persons grant page, official update-checking habits, and payment-date context.",
    related:
      "Useful next pages:\n• /guides/how-to-check-older-persons-grant-increase-updates-safely\n• /guides/how-to-check-old-age-grant-increase-rumours-safely\n• /grants/older-persons\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why do pension searches feel mixed with grant searches?",
        answer: "Because users often use everyday wording that does not exactly match the official grant name.",
      },
      {
        question: "What should I match first?",
        answer: "Match the claim to the older persons grant category first.",
      },
      {
        question: "Should I trust the amount alone?",
        answer: "No. The source and the grant category matter more.",
      },
    ],
    sortOrder: 300,
  }),
  guide({
    slug: "how-to-check-old-age-grant-increase-rumours-safely",
    title: "How to check old age grant increase rumours safely",
    summary:
      "A guide to checking old-age-grant increase rumours without mistaking shared claims for confirmed official changes.",
    quickAnswer:
      "Check old age grant increase rumours safely by matching the claim to the older persons grant, looking for a clear official source, and being cautious with recycled year labels.",
    whatThisMeans:
      "Old-age-grant increase rumours often spread in short messages or images. They sound useful because they are easy to share, but that simplicity can hide missing context.",
    whyThisMatters:
      "Users may make plans around the rumour before they know whether it is real, current, or even tied to the correct grant category.",
    steps:
      "1. Translate old-age wording into the older persons grant category.\n2. Check whether the claim has a clear official source.\n3. Be careful with posts using old dates or year labels.\n4. Avoid trusting cropped images.\n5. Use GrantCare to compare the claim with the correct grant page and update-checking guides.",
    keyFocusTitle: "Short rumours remove the context you need most",
    keyFocus:
      "The shorter the rumour, the more important it becomes to rebuild the missing context yourself. That means checking the grant category, the timing, and the source before you believe the number.",
    important:
      "GrantCare explains old-age-grant rumours in plain language, but final official confirmation still belongs to official channels.",
    help:
      "GrantCare can help you connect the rumour to the right grant page, the right terminology, and the right update-checking habits.",
    related:
      "Useful next pages:\n• /guides/how-to-check-older-persons-grant-increase-updates-safely\n• /guides/what-pension-increase-searches-usually-mean\n• /grants/older-persons\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why are old-age-grant rumours easy to trust?",
        answer: "Because they are short, specific, and often shared in familiar wording.",
      },
      {
        question: "What should I translate first?",
        answer: "Translate old-age wording into the official older persons grant category first.",
      },
      {
        question: "What makes a rumour weaker?",
        answer: "Missing source, unclear timing, and images with no official context all make it weaker.",
      },
    ],
    sortOrder: 301,
  }),
  guide({
    slug: "how-to-tell-grant-amount-pages-from-rumours",
    title: "How to tell grant amount pages from rumours",
    summary:
      "A trust guide for telling the difference between a useful grant-amount page and a rumour page built around fear, urgency, or copied numbers.",
    quickAnswer:
      "Tell grant amount pages from rumours by checking whether the page clearly explains the source, the grant category, and the timing instead of only pushing a number or urgent claim.",
    whatThisMeans:
      "A real amount page should help users understand what the number refers to, for which grant, and according to what source. Rumour pages usually focus on the number and the emotion around it.",
    whyThisMatters:
      "If users cannot tell the difference, they may trust a number with no reliable path behind it.",
    steps:
      "1. Check whether the page names the grant category clearly.\n2. Look for whether it points to a trustworthy source.\n3. Be cautious if the page only repeats numbers and urgency.\n4. Compare the page with official-route guidance.\n5. Use GrantCare if you need help reading the page safely.",
    keyFocusTitle: "A useful page explains context, not only numbers",
    keyFocus:
      "The best sign of a useful page is context. A rumour usually tries to move faster than the explanation. A safer page gives users enough context to think before they act.",
    important:
      "GrantCare is an independent guide and not an official source of grant amounts. It helps users evaluate amount pages more carefully.",
    help:
      "GrantCare can help you compare amount pages with official-route habits, update-checking guides, and grant-type pages so the claim becomes easier to judge.",
    related:
      "Useful next pages:\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "What is the main difference between a useful page and a rumour page?",
        answer: "A useful page explains the context and source, while a rumour page pushes a number without enough support.",
      },
      {
        question: "Why is urgency a warning sign?",
        answer: "Because it can pressure users to trust the claim before they have checked it properly.",
      },
      {
        question: "What should I look for first?",
        answer: "Look for clear grant category, source, and timing details first.",
      },
    ],
    sortOrder: 302,
  }),
  guide({
    slug: "how-to-read-grant-amount-pages-safely",
    title: "How to read grant amount pages safely",
    summary:
      "A practical guide to reading grant-amount pages without mistaking tentative guidance or old amounts for current official confirmation.",
    quickAnswer:
      "Read grant-amount pages safely by checking what grant the amount belongs to, what period it applies to, and whether the page clearly distinguishes guidance from confirmation.",
    whatThisMeans:
      "Amount pages can be helpful when they are careful and transparent. They become risky when users skim only the number and ignore the grant type, the time period, or the source.",
    whyThisMatters:
      "A number on the wrong grant page or from the wrong period can mislead users as much as a rumour can.",
    steps:
      "1. Match the amount to the exact grant category.\n2. Check the period the page is referring to.\n3. Look for whether the page signals caution or official confirmation.\n4. Avoid trusting old amount pages shared again later.\n5. Use GrantCare to compare the page with the right grant and official-update guidance.",
    keyFocusTitle: "A number only matters when its context is clear",
    keyFocus:
      "Grant amounts become useful only when users know which grant, which period, and which source the number belongs to. Without those three things, the page becomes much less reliable.",
    important:
      "GrantCare can help users read amount pages more safely, but it is not the official publisher of final grant amounts.",
    help:
      "GrantCare can help you match amount pages to the right grant page, the right update-checking habits, and the right payment-date context.",
    related:
      "Useful next pages:\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-check-older-persons-grant-increase-updates-safely\n• /grants",
    faqs: [
      {
        question: "What should I match first on an amount page?",
        answer: "Match the amount to the correct grant category first.",
      },
      {
        question: "Why does the time period matter?",
        answer: "Because an old amount can keep circulating even after the official position has changed.",
      },
      {
        question: "Can a cautious page still be useful?",
        answer: "Yes. A page that signals caution clearly can be more trustworthy than one that sounds too certain.",
      },
    ],
    sortOrder: 303,
  }),
  claimedAmountGuide({
    slug: "what-r700-grant-searches-usually-mean",
    title: "What R700 grant searches usually mean",
    claimLabel: "R700 grant",
    sortOrder: 304,
  }),
  guide({
    slug: "how-to-check-if-an-r700-grant-page-is-real",
    title: "How to check if an R700 grant page is real",
    summary:
      "A trust guide for users who find R700-grant pages and need a safer way to judge whether the page reflects a real official route or just a claim.",
    quickAnswer:
      "Check if an R700-grant page is real by treating the amount as unconfirmed first, checking the route and the source carefully, and not trusting the claim just because the number looks specific.",
    whatThisMeans:
      "An amount page can look persuasive when it uses a precise number and a grant-like label. The safer question is whether the page clearly belongs to an official route or only imitates official language.",
    whyThisMatters:
      "If the page is only a claim, users may waste time, share details in the wrong place, or build expectations around something that is not officially supported.",
    steps:
      "1. Treat the R700 claim as unconfirmed first.\n2. Check whether the page points to a real official route.\n3. Avoid trusting copied application or beneficiary claims.\n4. Compare the page with safe amount-reading habits.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or something riskier.",
    keyFocusTitle: "Specificity is not proof",
    keyFocus:
      "The page feels trustworthy because the claim sounds exact. That is exactly why users need to pause and check the route more carefully than they otherwise might.",
    important:
      "GrantCare does not endorse claimed grants without official confirmation. It helps users assess the safety of what they found.",
    help:
      "GrantCare can help you compare the page with official-route guidance, amount-rumour pages, and safe update-checking habits before you trust it.",
    related:
      "Useful next pages:\n• /guides/what-r700-grant-searches-usually-mean\n• /guides/what-r700-eligibility-pages-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why is the R700 page easy to trust too quickly?",
        answer: "Because a precise amount can sound more official than it really is.",
      },
      {
        question: "What should I check besides the amount?",
        answer: "Check the route, the source, and whether the page clearly belongs to an official process.",
      },
      {
        question: "Should I enter details just to test it?",
        answer: "No. Confirm the route first.",
      },
    ],
    sortOrder: 305,
  }),
  guide({
    slug: "is-the-r700-grant-real",
    title: "Is the R700 grant real?",
    summary:
      "A direct guide for users who want a plain answer about R700 grant claims, whether the grant is real, and how to avoid unsafe pages built around the number.",
    quickAnswer:
      "Treat R700 grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real only because the amount sounds specific or the page looks familiar.",
    whatThisMeans:
      "Most R700 grant searches come from users trying to verify a claim, not from a stable official grant route. The safe reading habit is to treat the amount like a rumour first, then check whether an official route, official update, or real grant category clearly supports it.",
    whyThisMatters:
      "R700 pages can create false hope, push users into fake applications, or encourage people to share details on unsafe routes. A direct myth-busting page helps users slow down before they trust the claim.",
    steps:
      "1. Treat the R700 claim as unconfirmed first.\n2. Check whether the page points to a real official route.\n3. Avoid trusting copied application, beneficiary, or eligibility claims on their own.\n4. Compare the page with the current grant amounts and the right grant category.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "The number is the hook, not the proof",
    keyFocus:
      "A specific amount can feel authoritative, but exact wording is easy to copy. The real test is whether the route, source, and grant category are clearly official and current.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official amounts, and official applications still belong to official channels.",
    help:
      "GrantCare can help you compare R700 claims with current grant amounts, safe page-reading habits, and official-route guidance so you do not mistake a rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r700-grant-searches-usually-mean\n• /guides/how-to-check-if-an-r700-grant-page-is-real\n• /guides/what-r700-eligibility-pages-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages",
    faqs: [
      {
        question: "Does a specific amount make the R700 claim more believable?",
        answer: "No. A specific amount still needs a trustworthy official source behind it.",
      },
      {
        question: "Should I apply if a page says applications are open?",
        answer: "Not until you confirm that the route is official and the grant itself is real.",
      },
      {
        question: "What should I compare the page with first?",
        answer: "Compare it with current grant amounts, official-route guidance, and the real grant category it claims to match.",
      },
    ],
    sortOrder: 324,
  }),
  guide({
    slug: "is-the-youth-grant-real",
    title: "Is the youth grant real?",
    summary:
      "A direct guide for users who want a plain answer about youth-grant claims, whether the grant is real, and how to avoid unsafe application pages built around the label.",
    quickAnswer:
      "Treat youth grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real only because a page offers an application, eligibility list, or urgent promise.",
    whatThisMeans:
      "Many youth-grant searches come from users reacting to social posts, copied links, or pages that use familiar grant language without proving that a real official youth-grant route exists. The safer habit is to verify the grant first and only think about applications after that.",
    whyThisMatters:
      "Youth-grant pages can waste time, create false hope, or pressure users into unsafe forms and fake routes. A direct myth-busting page helps users stop before they commit to a claim that has not earned trust.",
    steps:
      "1. Treat the youth-grant claim as unconfirmed first.\n2. Check whether the page points to a clear official route.\n3. Do not treat an application form or eligibility list as proof on its own.\n4. Compare the claim with current real grant categories and the eligibility checker.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "An application link is not proof that the grant is real",
    keyFocus:
      "Many misleading pages try to move users straight into applying. The safer order is the opposite: confirm whether the grant itself is real, then worry about who qualifies and where to apply.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official applications, and official eligibility still belong to official channels.",
    help:
      "GrantCare can help you compare youth-grant claims with real grant categories, safe page-reading habits, and official-route guidance so you do not mistake a rumour for a real support route.",
    related:
      "Useful next pages:\n• /eligibility-checker\n• /claim-checker\n• /grants\n• /guides/how-to-know-which-grant-application-fits-you\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official",
    faqs: [
      {
        question: "Does an application page prove the youth grant is real?",
        answer: "No. A page can offer an application without proving that the grant itself is officially supported.",
      },
      {
        question: "What should I confirm before I think about eligibility?",
        answer: "Confirm whether the grant itself is real and whether the route is official first.",
      },
      {
        question: "Where should I compare the claim with real options?",
        answer: "Compare it with the eligibility checker, the grant library, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 325,
  }),
  guide({
    slug: "is-the-r1400-grant-real",
    title: "Is the R1400 grant real?",
    summary:
      "A direct guide for users who want a plain answer about R1400 grant claims, beneficiary-list posts, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R1400 grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real because a page mentions beneficiaries, payments, or a specific monthly amount.",
    whatThisMeans:
      "Many R1400 searches come from users trying to verify a shared claim, not from a stable official grant route. The safest reading habit is to treat the amount and any beneficiary-list language as a rumour first, then check whether a real official route clearly supports it.",
    whyThisMatters:
      "R1400 pages can create false hope, drive clicks into fake beneficiary lists, or pressure users to share details on unsafe pages. A direct myth-busting page helps users slow down before they trust the story.",
    steps:
      "1. Treat the R1400 claim as unconfirmed first.\n2. Do not treat a beneficiary list or payment post as proof on its own.\n3. Check whether the page points to a real official route.\n4. Compare the claim with current grant amounts and current real grant categories.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "Beneficiary language is often part of the hook",
    keyFocus:
      "Pages that mention beneficiaries or monthly lists can sound administrative and therefore trustworthy. The better test is still whether the route, source, and grant category are clearly official and current.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official beneficiary information, and official applications still belong to official channels.",
    help:
      "GrantCare can help you compare R1400 claims with current grant amounts, safe page-reading habits, and official-route guidance so you do not mistake a beneficiary-style rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r1400-beneficiary-list-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Does a beneficiary list prove the R1400 grant is real?",
        answer: "No. A beneficiary list or payment-style post still needs a trustworthy official source behind it.",
      },
      {
        question: "Why are R1400 pages easy to trust too quickly?",
        answer: "Because a specific amount plus beneficiary wording can make the claim sound more official than it really is.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with current grant amounts, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 326,
  }),
  guide({
    slug: "is-the-r2090-grant-real",
    title: "Is the R2090 grant real?",
    summary:
      "A direct guide for users who want a plain answer about R2090 grant claims, payment-date promises, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R2090 grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real because a page combines the amount with payment dates or eligibility wording.",
    whatThisMeans:
      "Many R2090 searches come from users trying to verify a claim, not from a stable official grant route. The safer reading habit is to treat the amount, payment-date language, and eligibility language as a rumour first, then check whether a real official route clearly supports it.",
    whyThisMatters:
      "R2090 pages can waste time, create false expectations about payments, or pull users into unsafe routes that imitate official grant pages. A direct myth-busting page helps users stop before they trust the claim.",
    steps:
      "1. Treat the R2090 claim as unconfirmed first.\n2. Do not treat payment dates or eligibility wording as proof on their own.\n3. Check whether the page points to a real official route.\n4. Compare the claim with current grant amounts and current real grant categories.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "Payment-date wording can make a fake claim feel official",
    keyFocus:
      "A page that mixes a specific amount with payment dates or eligibility can feel administrative and trustworthy. The safer test is still whether the route, source, and grant category are clearly official and current.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official payment dates, and official eligibility still belong to official channels.",
    help:
      "GrantCare can help you compare R2090 claims with current grant amounts, safe page-reading habits, and official-route guidance so you do not mistake a payment-style rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r2090-grant-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /payment-dates",
    faqs: [
      {
        question: "Do payment dates prove the R2090 grant is real?",
        answer: "No. A claimed payment date still needs a trustworthy official route and a real grant category behind it.",
      },
      {
        question: "Why is R2090 often mixed with eligibility or payment promises?",
        answer: "Because those extra details make the claim feel more official even when the source is weak.",
      },
      {
        question: "What should I compare the page with first?",
        answer: "Compare it with current grant amounts, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 327,
  }),
  guide({
    slug: "is-the-senior-grant-bonus-real",
    title: "Is the senior grant bonus real?",
    summary:
      "A direct guide for users who want a plain answer about senior-grant bonus claims, bonus-payment posts, and whether the claimed extra payment is real.",
    quickAnswer:
      "Treat senior-grant bonus claims as unconfirmed unless a clear official source supports them. Do not assume the claim is real because it uses older-persons, pension, or bonus wording that sounds familiar.",
    whatThisMeans:
      "Many senior-grant bonus searches come from users reacting to shared posts, copied headlines, or pages that mix real older-persons grant language with an unconfirmed extra-payment claim. The safer habit is to separate the real grant from the claimed bonus and verify the bonus on its own.",
    whyThisMatters:
      "Senior-grant bonus pages can create false hope, push users toward unsafe update or payment links, or make an ordinary older-persons grant page look like proof of an extra payment. A direct myth-busting page helps users stop before they trust the claim.",
    steps:
      "1. Treat the senior-grant bonus claim as unconfirmed first.\n2. Separate the real older-persons grant from the claimed bonus payment.\n3. Do not treat shared payment dates, screenshots, or beneficiary wording as proof on their own.\n4. Compare the claim with current grant amounts and the real older-persons grant page.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "Real grant language can be used to dress up a fake bonus claim",
    keyFocus:
      "A page can sound believable when it borrows familiar terms like pension, old age, or older persons grant. The safer test is whether the claimed bonus has its own clear official support instead of borrowing trust from a real grant.",
    important:
      "GrantCare does not confirm unverified bonus claims or publish fake grants as official. Official grants, official amounts, and official payment updates still belong to official channels.",
    help:
      "GrantCare can help you compare senior-grant bonus claims with current grant amounts, the real older-persons grant route, and safe update-checking habits so you do not mistake a rumour for a real extra payment.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /grants/older-persons\n• /guides/how-to-check-old-age-grant-increase-rumours-safely\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Does older-persons grant wording prove the bonus is real?",
        answer: "No. Familiar grant wording can still be used inside an unconfirmed bonus claim.",
      },
      {
        question: "Should I trust a post that shows payment dates or beneficiary details?",
        answer: "No. Those details still need a trustworthy official source behind the bonus claim itself.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with current grant amounts, the real older-persons grant page, and official-update guidance before trusting it.",
      },
    ],
    sortOrder: 328,
  }),
  guide({
    slug: "what-r700-eligibility-pages-usually-mean",
    title: "What R700 eligibility pages usually mean",
    summary:
      "A calm guide to R700 eligibility searches and why users should treat them as claims to verify rather than as proof of a real official grant.",
    quickAnswer:
      "R700 eligibility pages usually mean users are trying to check whether a claimed grant is real and who it might apply to. The safest move is to verify that the grant itself is official before worrying about eligibility.",
    whatThisMeans:
      "Many users jump straight into eligibility because the amount sounds appealing. The more careful order is the opposite: confirm whether the claimed grant exists officially, then think about who it is for.",
    whyThisMatters:
      "If the grant itself is not confirmed, eligibility questions can pull users deeper into a claim that has not earned trust yet.",
    steps:
      "1. Check whether the claimed grant is supported by a clear official route.\n2. Avoid treating eligibility lists as proof on their own.\n3. Be careful with pages that use urgency or promises.\n4. Compare the page with safe amount-reading habits.\n5. Use GrantCare to step back and judge the claim before you act on it.",
    keyFocusTitle: "Eligibility only matters after the grant itself is real",
    keyFocus:
      "A common mistake is to move too quickly into who qualifies before confirming what is real. That order makes users more vulnerable to misleading pages.",
    important:
      "GrantCare does not promise eligibility or endorse unconfirmed grant claims. It helps users think more carefully before they commit to a route.",
    help:
      "GrantCare can help you separate real eligibility guidance from claim-first pages that use the language of qualification without a trustworthy grant behind it.",
    related:
      "Useful next pages:\n• /guides/what-r700-grant-searches-usually-mean\n• /guides/how-to-check-if-an-r700-grant-page-is-real\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /eligibility-checker\n• /guides/how-to-know-if-a-sassa-website-is-official",
    faqs: [
      {
        question: "Why should I confirm the grant first?",
        answer: "Because eligibility only matters if the grant itself is real and officially supported.",
      },
      {
        question: "Can an eligibility list still be misleading?",
        answer: "Yes. It can sound helpful while still being built around an unconfirmed claim.",
      },
      {
        question: "What should I do before I trust the page?",
        answer: "Check whether the route and source clearly support the claim.",
      },
    ],
    sortOrder: 306,
  }),
  claimedAmountGuide({
    slug: "what-r1400-beneficiary-list-searches-usually-mean",
    title: "What R1400 beneficiary list searches usually mean",
    claimLabel: "R1400 beneficiary list",
    sortOrder: 307,
  }),
  claimedAmountGuide({
    slug: "what-r1370-grant-searches-usually-mean",
    title: "What R1370 grant searches usually mean",
    claimLabel: "R1370 grant",
    sortOrder: 308,
  }),
  claimedAmountGuide({
    slug: "what-r2090-grant-searches-usually-mean",
    title: "What R2090 grant searches usually mean",
    claimLabel: "R2090 grant",
    sortOrder: 309,
  }),
  claimedAmountGuide({
    slug: "what-r3070-grant-searches-usually-mean",
    title: "What R3070 grant searches usually mean",
    claimLabel: "R3070 grant",
    sortOrder: 310,
  }),
  guide({
    slug: "how-to-avoid-fake-grant-amount-pages",
    title: "How to avoid fake grant amount pages",
    summary:
      "A practical guide to avoiding fake or misleading amount pages that use specific numbers to attract clicks and trust.",
    quickAnswer:
      "Avoid fake grant amount pages by checking the route, the source, and the grant category instead of trusting the amount or the headline alone.",
    whatThisMeans:
      "Fake amount pages often rely on a simple formula: one exact number, one urgent promise, and very little context. Users who know that pattern are much harder to mislead.",
    whyThisMatters:
      "A fake amount page can push users toward unsafe links, copied forms, or unrealistic expectations about money and eligibility.",
    steps:
      "1. Be cautious with pages built around one exact number.\n2. Check whether the page explains the grant category clearly.\n3. Look for whether the source is clear and official.\n4. Avoid sharing details on unclear routes.\n5. Use GrantCare if you need help deciding whether the page is only a claim.",
    keyFocusTitle: "The number is often the hook, not the proof",
    keyFocus:
      "Many misleading pages work by making the number do all the convincing. The safer habit is to shift your attention away from the number and back to the route and source.",
    important:
      "GrantCare does not publish fake grant amounts or treat rumours like official government announcements. It stays in the guidance role.",
    help:
      "GrantCare can help users compare amount pages with official-route guidance, eligibility tools, and safe update-checking habits before they trust what they found.",
    related:
      "Useful next pages:\n• /claim-checker\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/what-r700-grant-searches-usually-mean\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why are fake amount pages so effective?",
        answer: "Because exact numbers attract attention and feel simpler than a careful explanation.",
      },
      {
        question: "What should I check besides the number?",
        answer: "Check the route, the grant category, and the source.",
      },
      {
        question: "What if the page sounds urgent?",
        answer: "Treat urgency as a reason to slow down and verify more carefully.",
      },
    ],
    sortOrder: 311,
  }),
  claimedAmountGuide({
    slug: "what-srd-grant-amount-searches-usually-mean",
    title: "What SRD grant amount searches usually mean",
    claimLabel: "SRD grant amount",
    sortOrder: 312,
  }),
  guide({
    slug: "what-covid-19-social-relief-of-distress-grant-wording-usually-means",
    title: "What COVID-19 social relief of distress grant wording usually means",
    summary:
      "A historical explainer for users who still search with COVID-19 social-relief wording and want to understand how it connects to SRD, R350, and R370 language today.",
    quickAnswer:
      "COVID-19 social relief of distress grant wording usually points users toward the same social-relief support family that is often searched as SRD, R350, or R370. The safe move is to treat the older phrase as historical wording, then use the current route that matches your task.",
    whatThisMeans:
      "Many users still remember the support through the older COVID-19 wording, while others search with SRD, R350, or R370 wording. Those labels can overlap, but they do not always describe the exact task you need next. The task still matters more than the search phrase.",
    whyThisMatters:
      "If users treat the old COVID-19 wording like a separate new grant, they can follow outdated instructions, trust copied archive pages, or miss the current status, payment, or application route that actually fits their case.",
    steps:
      "1. Treat the COVID-19 wording as historical context first.\n2. Match it to the current social-relief or SRD route before you do anything else.\n3. Decide whether you actually need application help, status help, or payment-date help.\n4. Do not assume R350 or R370 wording means a different grant on its own.\n5. Use GrantCare to move from the old phrase to the right current page safely.",
    keyFocusTitle: "The wording changed, but the task is still the real question",
    keyFocus:
      "Users often search with the phrase they remember best, especially when the support has been discussed for years. The safer reading habit is to map the older COVID-19 phrase to the current SRD context, then pick the page that matches your real task instead of chasing every wording variant.",
    important:
      "GrantCare is an independent guide and does not replace the official SRD system. Official status checks, applications, and payment confirmation still belong to official channels.",
    help:
      "GrantCare can help you translate older COVID-19 social-relief wording into the current SRD, R350, and R370 context so you can reach the right grant page, payment-date page, or status guide without guessing.",
    related:
      "Useful next pages:\n• /grants/social-relief\n• /payment-dates\n• /guides/what-the-srd-portal-is-for\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-use-sassa-status-check-for-r350",
    faqs: [
      {
        question: "Is COVID-19 social relief of distress the same thing as SRD?",
        answer: "Users often mean the same social-relief support family, but the safest approach is still to use the current SRD route and the page that matches your task.",
      },
      {
        question: "Why do some pages say R350 and others say R370?",
        answer: "People often search with different amount labels they have seen before, so the wording can vary even when the safer next step is the same current SRD route.",
      },
      {
        question: "Should I trust old COVID-era application or payment instructions?",
        answer: "No. Treat older wording as context and use the current official route for any real action or final confirmation.",
      },
    ],
    sortOrder: 329,
  }),
  guide({
    slug: "capitec-sassa-payment-delay-help",
    title: "Capitec SASSA payment delays: what to check first",
    summary:
      "A practical guide for users who receive a SASSA payment through Capitec and want to work out what to check before assuming the bank is the whole problem.",
    quickAnswer:
      "If a SASSA payment looks delayed at Capitec, first separate the payment date, payment-processing stage, and banking-details route before you assume the delay started with the bank itself.",
    whatThisMeans:
      "Many users search for Capitec payment delays when the money is late or missing, but the issue may start earlier in the chain. A delay can come from payment processing, a payment-method issue, banking details, or a timing misunderstanding rather than from Capitec alone.",
    whyThisMatters:
      "If users blame the bank too quickly, they can miss the real cause, follow the wrong support route, or change details before they know what is actually happening.",
    steps:
      "1. Check the correct payment date and grant category first.\n2. Read whether your case looks approved, processing, delayed, or still unclear.\n3. Check whether your banking details changed or still need confirmation.\n4. Compare the problem with missing-payment and payment-processing guidance before you assume it is only a Capitec issue.\n5. Use the correct official contact route if the payment still looks stuck after those checks.",
    keyFocusTitle: "The bank is only one part of the payment chain",
    keyFocus:
      "A bank-reflection delay can be real, but it is safer to test the earlier stages first. Users often get better answers by checking payment state, payment method, and payment date before narrowing the issue to Capitec.",
    important:
      "GrantCare does not see private bank records and does not replace official support or bank support. It helps users work out which part of the chain needs attention first.",
    help:
      "GrantCare can help you compare payment delays with payment-processing wording, banking-details updates, and missing-payment guidance so you do not guess blindly.",
    related:
      "Useful next pages:\n• /payment-dates\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-banking-details-updates-work\n• /guides/how-to-find-official-contact-details-safely",
    faqs: [
      {
        question: "Does a Capitec delay always mean the bank caused the problem?",
        answer: "No. The delay may start earlier with payment processing, payment method, or timing rather than with the bank alone.",
      },
      {
        question: "What should I check before I contact anyone?",
        answer: "Check the payment date, your grant category, and whether the case still looks processing or missing rather than final.",
      },
      {
        question: "Should I change banking details immediately?",
        answer: "Not until you understand whether the delay is really a banking-details problem.",
      },
    ],
    sortOrder: 330,
  }),
  guide({
    slug: "what-social-grant-usually-means",
    title: "What social grant usually means in South Africa",
    summary:
      "A plain-language guide to broad social-grant searches and how that wording usually maps to real SASSA grant categories, dates, amounts, and application tasks.",
    quickAnswer:
      "Social grant usually means a broad search for SASSA support rather than one specific grant. The safest next step is to work out whether you need a grant type, payment date, amount, status, or application route.",
    whatThisMeans:
      "Users often search for social grant when they mean something broader than one page can answer on its own. They may be looking for Older Persons, Disability, Child Support, SRD, payment dates, or a general starting point. The broad wording is useful, but the next step should be more specific.",
    whyThisMatters:
      "If users stay at the broad social-grant level for too long, they can land on the wrong route, read the wrong grant page, or miss the exact task they really needed to solve.",
    steps:
      "1. Decide whether you need a grant type, payment date, amount, status, or application route.\n2. Open the grants hub if you still need the right category.\n3. Open payment dates if your real question is about timing.\n4. Open grant amounts if your real question is about money.\n5. Use the eligibility checker if you still do not know which grant fits your situation.",
    keyFocusTitle: "The broad term is a starting point, not the final route",
    keyFocus:
      "Social grant is useful search language because it matches how people talk. It becomes more useful only when you narrow it into the exact grant or exact task you actually need next.",
    important:
      "GrantCare is an independent guide. It helps users move from broad social-grant wording into the right next page, but official applications, status actions, and final confirmation still belong to official channels.",
    help:
      "GrantCare can help you translate the broad term into the right grant page, payment-date page, amount page, or status guide so you waste less time clicking around.",
    related:
      "Useful next pages:\n• /grants\n• /payment-dates\n• /grant-amounts\n• /eligibility-checker\n• /grants/social-relief",
    faqs: [
      {
        question: "Does social grant mean one specific SASSA grant?",
        answer: "Not usually. It often means the user needs a broader starting point before choosing the exact grant or task.",
      },
      {
        question: "What should I open if I need timing?",
        answer: "Open the payment-dates page if your real question is about when a grant may be paid.",
      },
      {
        question: "What if I do not know which grant fits me?",
        answer: "Use the grants hub and the eligibility checker to narrow the right category first.",
      },
    ],
    sortOrder: 331,
  }),
  guide({
    slug: "what-social-grant-dates-searches-usually-mean",
    title: "What social grant dates searches usually mean",
    summary:
      "A practical guide to social-grant-date searches and how to move from a broad timing phrase into the right month page and grant category.",
    quickAnswer:
      "Social grant dates searches usually mean users want a broad SASSA payment schedule, not one fixed date for every grant. The safest move is to open the payment-date hub and then match the month and grant category carefully.",
    whatThisMeans:
      "The phrase social grant dates can include Older Persons, Disability, children's grants, or SRD timing. Users often search broadly first and then need help narrowing the correct month page and category instead of treating one date like a universal answer.",
    whyThisMatters:
      "If users trust one floating date without matching the grant type and month, they can plan around the wrong schedule or misunderstand what the page is really showing.",
    steps:
      "1. Open the payment-dates hub first.\n2. Pick the correct month or year before you trust any date.\n3. Match the schedule to the exact grant category you need.\n4. Read whether the timing is published, expected, or portal-based.\n5. Use current payment guidance instead of old screenshots or recycled date posts.",
    keyFocusTitle: "One search phrase can hide several different schedules",
    keyFocus:
      "Broad date searches feel simple, but they often mix regular grants, grouped children's grants, and SRD-style support. The safest reading habit is to narrow the month and the category before you rely on the timing.",
    important:
      "GrantCare explains public timing in plain language, but official confirmation still belongs to the relevant official route when your own case needs a final answer.",
    help:
      "GrantCare can help you move from a broad social-grant-dates search into the correct month page, grant category, and timing guide without treating every date as interchangeable.",
    related:
      "Useful next pages:\n• /payment-dates\n• /grants/older-persons\n• /grants/social-relief\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-track-payment-dates-without-rumours",
    faqs: [
      {
        question: "Do social grant dates mean one schedule for every grant?",
        answer: "No. The phrase usually covers more than one grant category and needs to be narrowed before timing is clear.",
      },
      {
        question: "What should I check besides the date itself?",
        answer: "Check the month, the grant category, and whether the timing is published, expected, or portal-based.",
      },
      {
        question: "Should I trust dates from old images or shared posts?",
        answer: "No. It is safer to use the current payment-dates hub and current timing guidance.",
      },
    ],
    sortOrder: 332,
  }),
  guide({
    slug: "is-the-r500-grant-real",
    title: "Is the R500 grant real?",
    summary:
      "A direct guide for users who want a plain answer about R500 grant claims, payment-delay posts, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R500 grant claims as unconfirmed unless a clear official source supports them. Do not assume the claim is real because a page mentions delays, applications, or a familiar social-grant label.",
    whatThisMeans:
      "Many R500 searches come from users trying to verify a claim, not from a stable official grant route. Some pages try to make the claim sound more believable by mixing the amount with delay wording, status language, or general grant terms that users already know.",
    whyThisMatters:
      "R500 pages can create false hope, send users into fake applications, or push them toward unsafe links that pretend to explain a delay or payment issue.",
    steps:
      "1. Treat the R500 claim as unconfirmed first.\n2. Do not treat delay wording or application wording as proof on its own.\n3. Check whether the page points to a real official route.\n4. Compare the claim with current grant amounts and current real grant categories.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "Delay wording can make a fake claim sound more official",
    keyFocus:
      "A page can feel believable when it adds a reason for why the money is late or where the application should go. That extra detail still does not prove the grant exists. The real test is the route, the source, and the real grant category behind it.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official amounts, and official payment updates still belong to official channels.",
    help:
      "GrantCare can help you compare R500 claims with current grant amounts, safe page-reading habits, and official-route guidance so you do not mistake a rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r500-grant-payment-delay-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Does payment-delay wording prove the R500 grant is real?",
        answer: "No. Delay wording can make a weak claim sound more administrative, but it still needs a trustworthy official source behind it.",
      },
      {
        question: "Should I trust a page that says R500 applications are open?",
        answer: "Not until you confirm that the route is official and the grant itself is real.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with current grant amounts, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 333,
  }),
  guide({
    slug: "what-r500-grant-payment-delay-searches-usually-mean",
    title: "What R500 grant payment delay searches usually mean",
    summary:
      "A plain-language guide to R500 payment-delay searches and why users should verify the claimed grant first before they worry about why the money is late.",
    quickAnswer:
      "R500 grant payment delay searches usually mean users are trying to verify whether a claimed R500 payment is real and why it has not arrived. The safest move is to confirm the grant claim first before treating the delay story as meaningful.",
    whatThisMeans:
      "Delay wording can make a fake or unclear claim sound more official because it creates the feeling that the payment already exists and only the timing is the problem. In practice, the first question should still be whether the claimed R500 grant is real at all.",
    whyThisMatters:
      "If users skip straight to the delay explanation, they can waste time on the wrong pages, share details unsafely, or trust a fake claim that never had a real official route behind it.",
    steps:
      "1. Verify whether the claimed R500 grant itself is real.\n2. Do not treat delay, processing, or bank wording as proof on its own.\n3. Compare the claim with current grant amounts and real grant categories.\n4. Use payment-date or payment-status guidance only if the grant claim itself is trustworthy.\n5. Use official channels when a real payment issue still needs direct confirmation.",
    keyFocusTitle: "A delay explanation is not the same thing as proof",
    keyFocus:
      "Some misleading pages work by skipping past the question of whether the grant is real and moving straight into why payment is late. That makes the claim feel established even when the grant itself still has not earned trust.",
    important:
      "GrantCare does not confirm unverified delay claims or publish fake grants as official. Official payment confirmation and official case details still belong to official channels.",
    help:
      "GrantCare can help you separate real payment-stage issues from fake amount claims so you do not spend time diagnosing a payment that may never have been real in the first place.",
    related:
      "Useful next pages:\n• /guides/is-the-r500-grant-real\n• /grant-amounts\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-avoid-fake-grant-amount-pages",
    faqs: [
      {
        question: "Why do R500 delay pages sound believable?",
        answer: "Because delay language makes the story feel like an existing payment problem instead of an unverified grant claim.",
      },
      {
        question: "Should I check bank or payment details first?",
        answer: "First confirm that the claimed R500 grant is real. Delay checks only make sense after that.",
      },
      {
        question: "What if the page shows a payment date or processing note?",
        answer: "Those details still need a trustworthy official source behind the grant claim itself.",
      },
    ],
    sortOrder: 334,
  }),
  guide({
    slug: "what-r350-grant-wording-usually-means",
    title: "What R350 grant wording usually means",
    summary:
      "A plain-language guide for users who still search with R350 grant wording and want to understand how it fits the current SRD and social-relief context.",
    quickAnswer:
      "R350 grant wording usually points users toward the SRD or social-relief support family rather than a separate unrelated grant. The safest move is to map the wording to your real task, such as application, status, or payment dates.",
    whatThisMeans:
      "Many users still search with R350 because that is the amount label they remember best. In practice, the useful next step is not to chase the wording alone. It is to work out whether you need the current SRD grant page, a status route, an application guide, or the payment-date page.",
    whyThisMatters:
      "If users treat R350 wording like a separate route for every task, they can follow outdated links, trust copied pages, or miss the current SRD route that actually fits what they need.",
    steps:
      "1. Treat R350 as familiar search wording first.\n2. Match it to the current SRD or social-relief route before you do anything else.\n3. Decide whether your real task is application, status, payment dates, or general explanation.\n4. Do not assume every R350 page is an official action route.\n5. Use GrantCare to move from the wording to the right current page safely.",
    keyFocusTitle: "The remembered amount is not always the full answer",
    keyFocus:
      "R350 is often the label people remember, but the better question is what you actually need to do now. Once that is clear, the correct SRD page becomes easier to find and easier to trust.",
    important:
      "GrantCare is an independent guide and does not replace the official SRD system. Official applications, status actions, and final payment confirmation still belong to official channels.",
    help:
      "GrantCare can help you translate R350 wording into the right SRD page for status, application, payment dates, or general support without guessing from copied links.",
    related:
      "Useful next pages:\n• /grants/social-relief\n• /guides/how-to-use-sassa-status-check-for-r350\n• /guides/how-to-start-an-r350-online-application-safely\n• /payment-dates\n• /guides/what-the-srd-portal-is-for",
    faqs: [
      {
        question: "Is R350 the same thing as the current SRD route?",
        answer: "Users often mean the same social-relief support family, but the safest move is still to use the current SRD route that matches your task.",
      },
      {
        question: "Should I trust any page that repeats R350 in the title?",
        answer: "No. Familiar wording does not prove the page is official or current.",
      },
      {
        question: "What should I decide first when I search R350?",
        answer: "Decide whether you need status help, application help, payment dates, or the main SRD grant page.",
      },
    ],
    sortOrder: 335,
  }),
  guide({
    slug: "what-r370-grant-wording-usually-means",
    title: "What R370 grant wording usually means",
    summary:
      "A plain-language guide for users who search with R370 grant wording and want to understand how that label fits the current SRD and social-relief context.",
    quickAnswer:
      "R370 grant wording usually points users toward the SRD or social-relief support family rather than a separate new grant. The safest move is to match the wording to your actual task, such as status, payment dates, or application guidance.",
    whatThisMeans:
      "Many users search with R370 because they are following newer amount wording, but the core challenge is still the same: finding the right current SRD page for the task they actually need. The wording alone should not decide which route to trust.",
    whyThisMatters:
      "If users treat R370 wording like proof that a page is current, they can trust weak links too quickly or miss the exact SRD route that handles status, application, or payment timing more safely.",
    steps:
      "1. Treat R370 as current amount wording first.\n2. Match it to the SRD or social-relief route before you trust the page.\n3. Decide whether you need status help, payment dates, application help, or a general explanation.\n4. Do not assume a page is official only because it uses the newer amount.\n5. Use GrantCare to move from the wording to the right current page safely.",
    keyFocusTitle: "Newer wording still needs the right route behind it",
    keyFocus:
      "A page can sound up to date because it uses the newer amount label, but the safer test is still whether the route, source, and task all line up clearly.",
    important:
      "GrantCare is an independent guide and does not replace the official SRD system. Official status checks, applications, and final payment confirmation still belong to official channels.",
    help:
      "GrantCare can help you translate R370 wording into the right SRD page for status, payment dates, or application guidance without treating every amount-based page as official.",
    related:
      "Useful next pages:\n• /grants/social-relief\n• /guides/how-to-check-r370-status-safely\n• /guides/how-to-use-an-r370-application-page-safely\n• /payment-dates\n• /guides/what-the-srd-portal-is-for",
    faqs: [
      {
        question: "Does R370 mean I need a different grant route from SRD?",
        answer: "Not usually. The safer move is to use the current SRD route that matches the task you need.",
      },
      {
        question: "Why do R370 pages feel easier to trust?",
        answer: "Because newer amount wording can make a page sound current even when the route still needs checking.",
      },
      {
        question: "What should I decide first when I search R370?",
        answer: "Decide whether you need status help, payment-date help, application guidance, or the main SRD grant page.",
      },
    ],
    sortOrder: 336,
  }),
  guide({
    slug: "what-social-grant-increase-searches-usually-mean",
    title: "What social grant increase searches usually mean",
    summary:
      "A calm guide to social-grant-increase searches and how to read broad increase claims without confusing general headlines, old posts, and the exact grant category that changed.",
    quickAnswer:
      "Social grant increase searches usually mean users want a broad answer about changing grant amounts. The safest move is to narrow the claim to the exact grant category and the latest official update before you trust the amount.",
    whatThisMeans:
      "People often search for social grant increase when they have not yet narrowed whether they mean Older Persons, Disability, Child Support, SRD, or another category. That broad wording is useful as a starting point, but it still needs to be translated into the correct grant and the correct current update.",
    whyThisMatters:
      "A broad increase phrase can pull together mixed headlines and recycled year labels. If users do not narrow the claim properly, they can trust the wrong amount or the wrong timing too quickly.",
    steps:
      "1. Treat the broad increase claim as a starting point, not a final answer.\n2. Decide which grant category the update is really about.\n3. Check the latest official published update for that category.\n4. Be cautious with old screenshots and year-based posts.\n5. Use GrantCare if you need help translating the broad wording into the correct grant page or amount guide.",
    keyFocusTitle: "Broad increase wording still needs one exact grant behind it",
    keyFocus:
      "The safest way to read a social-grant-increase claim is to narrow it until only one grant category remains. That step reduces confusion and makes it easier to judge whether the source is still current.",
    important:
      "GrantCare can help users understand increase claims, but official confirmation of changed amounts still belongs to official published sources.",
    help:
      "GrantCare can help you move from broad social-grant-increase wording into the correct amount page, grant page, and update-checking guide so the claim feels less mixed.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /grants\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why do social grant increase searches feel so broad?",
        answer: "Because users often want one simple answer before they have narrowed the exact grant category involved.",
      },
      {
        question: "What should I match first?",
        answer: "Match the increase claim to the exact grant category first.",
      },
      {
        question: "Should I trust an amount without checking the source?",
        answer: "No. The exact grant category and the source matter more than the number alone.",
      },
    ],
    sortOrder: 337,
  }),
  guide({
    slug: "how-to-check-social-grant-increase-updates-safely",
    title: "How to check social grant increase updates safely",
    summary:
      "A trust-first guide to checking broad social-grant-increase updates without treating mixed headlines, year labels, or screenshots like final confirmation.",
    quickAnswer:
      "Check social grant increase updates safely by narrowing the claim to the exact grant category, then comparing it with the latest official published update instead of trusting a headline or screenshot on its own.",
    whatThisMeans:
      "Broad social-grant-increase searches often begin with uncertainty. Users know something may have changed, but they do not yet know which grant, which period, or which source to trust. That is why the narrowing step matters so much.",
    whyThisMatters:
      "Without a careful source check, users can confuse one grant with another, trust a repeated older update, or expect an amount change that does not fit their own grant.",
    steps:
      "1. Decide which grant category the update seems to mention.\n2. Check whether the update points to a clear official published source.\n3. Compare the timing carefully so you do not rely on an old year label.\n4. Use the grant-amounts page and the matching grant page for context.\n5. Treat social posts and screenshots as unconfirmed until the source is clear.",
    keyFocusTitle: "The safer check is narrower than the search",
    keyFocus:
      "A useful habit is to let the search stay broad only for a moment. The next step should be much narrower: one grant category, one current update, and one clear source.",
    important:
      "GrantCare helps users evaluate public increase claims, but official confirmation of changed grant amounts still belongs to official published channels.",
    help:
      "GrantCare can help you move from a broad increase search into the right grant page, amount guide, and source-checking habit so you do not over-read one post or headline.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /grants\n• /guides/what-social-grant-increase-searches-usually-mean\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely",
    faqs: [
      {
        question: "Why should I narrow the grant category first?",
        answer: "Because broad social-grant language can mix more than one grant and more than one update together.",
      },
      {
        question: "What is the biggest risk with screenshots?",
        answer: "Screenshots often remove the date, the source, or the grant category that would show whether the update is still current.",
      },
      {
        question: "What should I compare the claim with?",
        answer: "Compare it with the correct grant category and the latest official published update.",
      },
    ],
    sortOrder: 338,
  }),
  guide({
    slug: "how-to-check-srd-grant-increase-updates-safely",
    title: "How to check SRD grant increase updates safely",
    summary:
      "A practical guide to checking SRD grant increase updates without confusing amount rumours, year labels, and current social-relief wording.",
    quickAnswer:
      "Check SRD grant increase updates safely by matching the claim to the current social-relief route, checking the latest official published update, and being cautious with posts that only repeat R350, R370, or another number without a source.",
    whatThisMeans:
      "SRD increase searches are often driven by amount-based wording such as R350 or R370, which can make users assume the number alone tells the full story. The safer approach is to connect the claim back to the current SRD or social-relief route and the latest official update.",
    whyThisMatters:
      "If users trust a copied amount claim too quickly, they can misunderstand what changed, when it applies, or whether the post even reflects the current SRD context at all.",
    steps:
      "1. Match the increase claim to the current SRD or social-relief route.\n2. Check the latest official published update rather than trusting the amount alone.\n3. Be careful with older R350 or newer R370 wording if the source is unclear.\n4. Compare the claim with the grant-amounts page and the SRD grant page.\n5. Use GrantCare if you need help separating the wording from the real update.",
    keyFocusTitle: "The number can change, but source-checking stays the same",
    keyFocus:
      "Users often focus on the amount first because it feels simple. The safer reading habit is to test the source, the timing, and the current SRD route before trusting what the number seems to imply.",
    important:
      "GrantCare can help users read SRD increase claims more safely, but official confirmation of changed amounts still belongs to official published sources.",
    help:
      "GrantCare can help you compare SRD increase claims with current grant amounts, the SRD grant page, and safe update-checking guides so you do not over-read amount-based rumours.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /grants/social-relief\n• /guides/what-r350-grant-wording-usually-means\n• /guides/what-r370-grant-wording-usually-means\n• /guides/how-to-check-if-a-grant-increase-update-is-official",
    faqs: [
      {
        question: "Why do SRD increase searches often focus on the amount?",
        answer: "Because amount labels such as R350 and R370 are memorable and easy to share, even when the source behind them is weak.",
      },
      {
        question: "Should I trust a post that only says the SRD amount changed?",
        answer: "No. Check the source and the current SRD route before you treat the claim as real.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with the current SRD grant page, the grant-amounts page, and the latest official published update.",
      },
    ],
    sortOrder: 339,
  }),
  guide({
    slug: "is-the-r12500-youth-grant-real",
    title: "Is the R12500 youth grant real?",
    summary:
      "A direct guide for users who want a plain answer about R12500 youth-grant claims, application pages, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R12500 youth grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real because a page combines a large amount with youth wording and an application promise.",
    whatThisMeans:
      "Many R12500 youth-grant searches come from users reacting to social posts, copied application links, or pages that try to make the claim sound more urgent by attaching a large amount to a broad youth label. The safer habit is to verify the grant first and only think about applying after that.",
    whyThisMatters:
      "R12500 youth-grant pages can create false hope, waste time, or pressure users into unsafe forms and copied routes. A direct myth-busting page helps users stop before they commit to a claim that has not earned trust.",
    steps:
      "1. Treat the R12500 youth-grant claim as unconfirmed first.\n2. Check whether the page points to a clear official route.\n3. Do not treat an application form or amount promise as proof on its own.\n4. Compare the claim with real grant categories, the eligibility checker, and the existing youth-grant guide.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "A larger amount can make the youth claim feel more convincing",
    keyFocus:
      "The amount is often the hook. A large number plus youth wording can make the page feel urgent and valuable, but the real test is still whether the route, the source, and the grant itself are clearly official.",
    important:
      "GrantCare does not confirm unverified youth-grant claims or publish fake grants as official. Official grants, official applications, and official eligibility still belong to official channels.",
    help:
      "GrantCare can help you compare R12500 youth-grant claims with the broader youth-grant myth page, current grant categories, and official-route guidance so you do not mistake a rumour for a real support route.",
    related:
      "Useful next pages:\n• /guides/is-the-youth-grant-real\n• /claim-checker\n• /eligibility-checker\n• /grants\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official",
    faqs: [
      {
        question: "Does the large amount make the youth grant more believable?",
        answer: "No. A larger amount can make the claim feel more urgent, but it still needs a trustworthy official source behind it.",
      },
      {
        question: "Should I trust a page that offers an R12500 youth application?",
        answer: "Not until you confirm that the route is official and the grant itself is real.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with the youth-grant myth page, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 340,
  }),
  guide({
    slug: "is-the-r1370-grant-real",
    title: "Is the R1370 grant real?",
    summary:
      "A direct guide for users who want a plain answer about R1370 grant claims, application pages, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R1370 grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real because a page adds details about applications, eligibility, or payment dates.",
    whatThisMeans:
      "Many R1370 searches come from users trying to verify a claim, not from a stable official grant route. Some pages try to make the claim sound more trustworthy by adding application, eligibility, or payment language that feels administrative.",
    whyThisMatters:
      "R1370 pages can create false hope, push users toward unsafe forms, or make a copied claim feel more official than it really is. A direct myth-busting page helps users slow down before they trust the story.",
    steps:
      "1. Treat the R1370 claim as unconfirmed first.\n2. Do not treat application, eligibility, or payment wording as proof on its own.\n3. Check whether the page points to a real official route.\n4. Compare the claim with current grant amounts and current real grant categories.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "Extra detail can still sit on top of a weak claim",
    keyFocus:
      "A page can feel believable when it offers eligibility or application detail, but those details only matter if the grant itself is real and the route is clearly official.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official applications, and official payment guidance still belong to official channels.",
    help:
      "GrantCare can help you compare R1370 claims with current grant amounts, safe page-reading habits, and official-route guidance so you do not mistake a detailed rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r1370-grant-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Does eligibility wording prove the R1370 grant is real?",
        answer: "No. Eligibility wording can make the claim sound official, but it still needs a trustworthy official source behind it.",
      },
      {
        question: "Should I trust a page that says R1370 applications are open?",
        answer: "Not until you confirm that the route is official and the grant itself is real.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with current grant amounts, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 341,
  }),
  guide({
    slug: "is-the-r2315-grant-real",
    title: "Is the R2315 grant real?",
    summary:
      "A direct guide for users who want a plain answer about R2315 grant claims, payment-date pages, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R2315 grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real because a page combines the amount with payment dates or a payment schedule.",
    whatThisMeans:
      "Many R2315 searches come from users trying to verify a claim, not from a stable official grant route. Some pages try to make the claim feel established by jumping straight into payment dates or a payment schedule before proving the grant itself.",
    whyThisMatters:
      "R2315 pages can create false expectations about timing or money and may pull users into unsafe routes that imitate official payment pages. A direct myth-busting page helps users stop before they trust the claim.",
    steps:
      "1. Treat the R2315 claim as unconfirmed first.\n2. Do not treat payment dates or schedule wording as proof on their own.\n3. Check whether the page points to a real official route.\n4. Compare the claim with current grant amounts and current real grant categories.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "A payment schedule can make a fake claim feel settled",
    keyFocus:
      "When a page jumps straight into dates and schedules, it can make the grant sound already established. The safer test is still whether the route, source, and grant category are clearly official and current.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official payment dates, and official payment confirmation still belong to official channels.",
    help:
      "GrantCare can help you compare R2315 claims with current grant amounts, payment-date guidance, and official-route checks so you do not mistake a schedule-style rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /payment-dates\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-understand-payment-dates\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Do payment dates prove the R2315 grant is real?",
        answer: "No. Claimed dates or schedules still need a trustworthy official route and a real grant category behind them.",
      },
      {
        question: "Why are schedule-style pages easy to trust?",
        answer: "Because a schedule makes the claim feel administrative and settled even when the source is weak.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with current grant amounts, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 342,
  }),
  guide({
    slug: "is-the-r3070-grant-real",
    title: "Is the R3070 grant real?",
    summary:
      "A direct guide for users who want a plain answer about R3070 grant claims, list-style posts, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R3070 grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real because a page adds lists, qualifications, or payment wording around the amount.",
    whatThisMeans:
      "Many R3070 searches come from users trying to verify a claim, not from a stable official grant route. Some pages try to make the claim sound more official by mixing the amount with lists, qualifications, or payment notes that feel specific.",
    whyThisMatters:
      "R3070 pages can create false hope, waste time, or pressure users into unsafe pages that imitate real grant guidance. A direct myth-busting page helps users stop before they trust the claim.",
    steps:
      "1. Treat the R3070 claim as unconfirmed first.\n2. Do not treat list-style or qualification wording as proof on its own.\n3. Check whether the page points to a real official route.\n4. Compare the claim with current grant amounts and current real grant categories.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "List-style detail can make a weak claim sound organised",
    keyFocus:
      "Some pages feel persuasive because they add lists or qualification notes. That extra structure still does not prove the grant exists. The real test is the source, the route, and the real grant category behind the claim.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official amounts, and official eligibility still belong to official channels.",
    help:
      "GrantCare can help you compare R3070 claims with current grant amounts, safe page-reading habits, and official-route guidance so you do not mistake a structured rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r3070-grant-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Do qualifications or lists prove the R3070 grant is real?",
        answer: "No. Structured details can make the claim sound organised, but they still need a trustworthy official source behind them.",
      },
      {
        question: "Why are list-style pages easy to trust too quickly?",
        answer: "Because the structure can make the claim feel formal even when the route is weak.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with current grant amounts, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 343,
  }),
  guide({
    slug: "is-the-r530-grant-real",
    title: "Is the R530 grant real?",
    summary:
      "A direct guide for users who want a plain answer about R530 grant claims, detail pages, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R530 grant claims as unconfirmed unless a clear official source supports them. Do not assume the grant is real because a page adds details about eligibility, payment, or qualifications.",
    whatThisMeans:
      "Many R530 searches come from users trying to verify a claim, not from a stable official grant route. Some pages try to make the claim sound more trustworthy by adding detail about eligibility, payment, or qualifications that feels practical and specific.",
    whyThisMatters:
      "R530 pages can create false hope, push users into unsafe links, or make a copied amount claim feel more official than it really is. A direct myth-busting page helps users slow down before they trust the story.",
    steps:
      "1. Treat the R530 claim as unconfirmed first.\n2. Do not treat eligibility, payment, or qualification wording as proof on its own.\n3. Check whether the page points to a real official route.\n4. Compare the claim with current grant amounts and current real grant categories.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "Practical detail can still be built on a fake amount claim",
    keyFocus:
      "A page can feel useful because it offers qualifications, payment notes, or extra detail. That usefulness is still weak if the grant itself has not been clearly proven through an official route and source.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official amounts, and official eligibility still belong to official channels.",
    help:
      "GrantCare can help you compare R530 claims with current grant amounts, safe page-reading habits, and official-route guidance so you do not mistake a detailed rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Does eligibility or payment wording prove the R530 grant is real?",
        answer: "No. Those details can make the claim sound practical, but they still need a trustworthy official source behind them.",
      },
      {
        question: "Why do detail pages make R530 claims feel believable?",
        answer: "Because the extra detail can make the claim feel useful and therefore more official than it really is.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with current grant amounts, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 344,
  }),
  guide({
    slug: "is-the-r1500-grocery-grant-real",
    title: "Is the R1500 grocery grant real?",
    summary:
      "A direct guide for users who want a plain answer about R1500 grocery-grant claims, grocery-support pages, and whether the claimed grant is real.",
    quickAnswer:
      "Treat R1500 grocery grant claims as unconfirmed unless a clear official source supports them. Do not assume the claim is real because a page uses grocery-help wording that sounds urgent or practical.",
    whatThisMeans:
      "Many R1500 grocery-grant searches come from users reacting to social posts or copied pages that mix a specific amount with grocery-support wording. That combination can make the claim feel practical and immediate even when there is no clear official route behind it.",
    whyThisMatters:
      "R1500 grocery-grant pages can create false hope, push users into unsafe links, or make a copied rumour feel more believable because it sounds tied to food support rather than to a generic payment promise.",
    steps:
      "1. Treat the R1500 grocery-grant claim as unconfirmed first.\n2. Do not treat grocery-help wording as proof on its own.\n3. Check whether the page points to a real official route.\n4. Compare the claim with current grant amounts and current real grant categories.\n5. Use GrantCare if you need help deciding whether the page is guidance, rumour, or a risky fake route.",
    keyFocusTitle: "Practical support wording can make a fake claim feel compassionate",
    keyFocus:
      "A page can feel convincing when it connects the amount to food or grocery help. That emotional pull still does not prove the grant exists. The safer test is the route, the source, and the real support category behind the claim.",
    important:
      "GrantCare does not confirm unverified grant claims or publish fake grants as official. Official grants, official amounts, and official support routes still belong to official channels.",
    help:
      "GrantCare can help you compare R1500 grocery-grant claims with current grant amounts, safe page-reading habits, and official-route guidance so you do not mistake a practical-sounding rumour for a real grant.",
    related:
      "Useful next pages:\n• /grant-amounts\n• /claim-checker\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Does grocery-support wording prove the R1500 grant is real?",
        answer: "No. Practical support wording can make the claim sound compassionate, but it still needs a trustworthy official source behind it.",
      },
      {
        question: "Why do R1500 grocery pages feel believable?",
        answer: "Because they connect a specific amount to an everyday need, which makes the claim feel urgent and useful.",
      },
      {
        question: "What should I compare the claim with first?",
        answer: "Compare it with current grant amounts, real grant categories, and official-route guidance before trusting it.",
      },
    ],
    sortOrder: 345,
  }),
  guide({
    slug: "what-beneficiary-detail-update-searches-usually-mean",
    title: "What beneficiary detail update searches usually mean",
    summary:
      "A practical guide to beneficiary-detail update searches and how to approach them without confusing general record changes with unsafe third-party requests.",
    quickAnswer:
      "Beneficiary-detail update searches usually mean users want to change or confirm official records. The safest habit is to use only the official route for the actual update and to avoid sharing details through unclear pages.",
    whatThisMeans:
      "Record-update searches can relate to contact details, payment details, or another official profile change. The key is to keep the update itself on the official route and not let confusing pages sit in the middle.",
    whyThisMatters:
      "When users are worried about deadlines or payment issues, they may share details too quickly on any page that promises to help update them.",
    steps:
      "1. Decide exactly which beneficiary detail you need to update.\n2. Find the correct official update route for that detail.\n3. Avoid entering details on a page that only talks about updates without proving the route.\n4. Save any official confirmation after the change.\n5. Use GrantCare if you need help understanding what kind of update route you actually need.",
    keyFocusTitle: "The update route matters as much as the detail",
    keyFocus:
      "A detail change is safest when users know exactly what they are changing and exactly which official route handles it. Unclear update pages are where mistakes often begin.",
    important:
      "GrantCare is not an official beneficiary-detail update system. It helps users understand the task and reach the correct official route safely.",
    help:
      "GrantCare can help you separate phone, banking, verification, and general-record updates so you do not guess which route to use.",
    related:
      "Useful next pages:\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/how-banking-details-updates-work\n• /guides/how-to-check-if-a-deadline-notice-is-official\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-find-official-contact-details-safely",
    faqs: [
      {
        question: "Why should I decide the exact detail first?",
        answer: "Because different detail changes may use different official routes.",
      },
      {
        question: "Should I trust a page that only says update here?",
        answer: "No. Confirm the route and the task first.",
      },
      {
        question: "What should I save after I update details?",
        answer: "Save the official confirmation or record of the change.",
      },
    ],
    sortOrder: 313,
  }),
  guide({
    slug: "what-double-payment-rumours-usually-mean",
    title: "What double payment rumours usually mean",
    summary:
      "A calm explainer on double-payment rumours and why users should treat them as claims to verify, not as guaranteed payment news.",
    quickAnswer:
      "Double-payment rumours usually mean users are reacting to shared claims about extra payments. The safest move is to treat those claims as unconfirmed until a clear official source supports them.",
    whatThisMeans:
      "Rumours about double payments spread because they sound both exciting and urgent. That makes them highly shareable even when the evidence behind them is weak.",
    whyThisMatters:
      "Users can change plans, raise expectations, or click unsafe links if they assume the rumour must be true.",
    steps:
      "1. Treat the double-payment claim as unconfirmed first.\n2. Check for a clear official source.\n3. Avoid trusting screenshots, cropped posts, or beneficiary lists on their own.\n4. Compare the claim with the right payment-date and update-checking pages.\n5. Use GrantCare to read the rumour more carefully before you act on it.",
    keyFocusTitle: "Extra-payment rumours spread faster than explanations",
    keyFocus:
      "The emotional pull of a double-payment claim is exactly why users need a slower, source-first reading habit when they see one.",
    important:
      "GrantCare does not publish fake payment promises or present rumours as official payment announcements.",
    help:
      "GrantCare can help you compare double-payment posts with payment dates, official-update habits, and safe page-reading practices before you trust them.",
    related:
      "Useful next pages:\n• /claim-checker\n• /guides/how-to-check-if-a-double-payment-update-is-real\n• /guides/what-to-do-if-you-see-a-double-grant-payment-post\n• /guides/how-to-understand-payment-dates\n• /payment-dates\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why are double-payment rumours so persuasive?",
        answer: "Because they combine urgency, hope, and a simple claim that is easy to share.",
      },
      {
        question: "What should I check first?",
        answer: "Check whether the claim points to a clear official source.",
      },
      {
        question: "Should I trust a shared image of a payment list?",
        answer: "No. A list or image still needs a trustworthy source behind it.",
      },
    ],
    sortOrder: 314,
  }),
  guide({
    slug: "how-to-check-if-a-double-payment-update-is-real",
    title: "How to check if a double payment update is real",
    summary:
      "A trust guide for users who see extra-payment updates and want a safer way to verify them.",
    quickAnswer:
      "Check if a double-payment update is real by looking for a clear official source, matching it to the correct grant category, and avoiding claims that only rely on screenshots or group messages.",
    whatThisMeans:
      "Double-payment updates often sound more urgent than ordinary payment news. That urgency is why source-checking matters even more than usual.",
    whyThisMatters:
      "If the update is wrong, users can build expectations around money that was never clearly confirmed.",
    steps:
      "1. Look for a clear official source.\n2. Match the update to the exact grant category.\n3. Check whether the timing still makes sense.\n4. Be cautious with screenshots and forwarded posts.\n5. Use GrantCare if you need help deciding whether the update is only a rumour.",
    keyFocusTitle: "The update is only as strong as its source",
    keyFocus:
      "A dramatic payment claim can feel stronger than it really is. The real test is whether the source, the grant category, and the timing all line up clearly.",
    important:
      "GrantCare explains payment rumours, but official payment confirmation still belongs to official channels.",
    help:
      "GrantCare can help you compare the update with payment-date guides, safe update-reading habits, and official-route checks so you can verify it more calmly.",
    related:
      "Useful next pages:\n• /guides/what-double-payment-rumours-usually-mean\n• /claim-checker\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-read-payment-notes-on-date-pages\n• /guides/where-to-find-official-updates-safely\n• /payment-dates",
    faqs: [
      {
        question: "What is the strongest sign that the update is weak?",
        answer: "The strongest sign is when it relies only on a screenshot or forwarded message with no clear official source.",
      },
      {
        question: "Why does grant category matter here?",
        answer: "Because a payment claim can be wrong even if it sounds plausible in general.",
      },
      {
        question: "Should I plan around the update right away?",
        answer: "It is safer to verify the source first before changing plans.",
      },
    ],
    sortOrder: 315,
  }),
  guide({
    slug: "what-to-do-if-you-see-a-double-grant-payment-post",
    title: "What to do if you see a double grant payment post",
    summary:
      "A practical next-step guide for users who encounter double-payment posts and want to respond carefully instead of reacting on impulse.",
    quickAnswer:
      "If you see a double grant payment post, do not treat it as confirmed right away. Save the post if needed, check the source, and compare it with official updates before you believe it.",
    whatThisMeans:
      "A double-payment post is often shared because it gets attention fast. That does not automatically make it false, but it does mean users should be careful about trusting it too quickly.",
    whyThisMatters:
      "A rushed reaction can lead to false expectations or to following links that were designed to exploit curiosity and urgency.",
    steps:
      "1. Pause before sharing or trusting the post.\n2. Check whether the post links to a clear official source.\n3. Compare the claim with current payment-date and update pages.\n4. Avoid clicking urgent links that feel unfamiliar.\n5. Use GrantCare if you want help understanding whether the post still looks weak or credible.",
    keyFocusTitle: "Pause is the safest first step",
    keyFocus:
      "The safest thing about a double-payment post is not the information inside it. It is the moment when the user pauses before acting. That pause protects against most of the risk.",
    important:
      "GrantCare does not confirm double-payment claims as official announcements. It helps users read those claims more safely.",
    help:
      "GrantCare can help you move from a social post into the right payment-date and update-checking guides so you rely less on the post itself.",
    related:
      "Useful next pages:\n• /guides/what-double-payment-rumours-usually-mean\n• /guides/how-to-check-if-a-double-payment-update-is-real\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-understand-payment-dates\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Should I share the post straight away?",
        answer: "No. Check the source first.",
      },
      {
        question: "What if the post sounds very urgent?",
        answer: "Treat urgency as a reason to slow down and verify the claim more carefully.",
      },
      {
        question: "What should I compare the post with?",
        answer: "Compare it with trusted update routes and payment-date guidance.",
      },
    ],
    sortOrder: 316,
  }),
  guide({
    slug: "what-grant-suspension-searches-usually-mean",
    title: "What grant suspension searches usually mean",
    summary:
      "A calm explainer on grant suspension searches and how to tell the difference between fear, warning language, and confirmed official action.",
    quickAnswer:
      "Grant suspension searches usually mean users are worried that a grant may stop or be reviewed. The safest move is to read the actual wording carefully and confirm whether the issue is a real official message or only a rumour.",
    whatThisMeans:
      "Suspension language feels serious, so even vague claims can create immediate fear. That is why users need a clear way to separate official wording from social panic.",
    whyThisMatters:
      "Fear-based searches can lead users to trust unsafe pages or overreact before they have enough information to know what the message really means.",
    steps:
      "1. Save the exact wording that triggered the concern.\n2. Check whether it came from a clear official route.\n3. Separate direct official wording from rumours or shared posts.\n4. Compare it with safe suspension-reading guides.\n5. Use official follow-up routes if the wording clearly requires action.",
    keyFocusTitle: "Suspension fear grows fast when the wording is unclear",
    keyFocus:
      "The best way to reduce panic is to focus on the exact wording and the exact source. Most of the confusion around suspension starts when users work from memory or rumours instead of the real message.",
    important:
      "GrantCare can explain suspension-related wording, but official confirmation and official next steps still belong to official channels.",
    help:
      "GrantCare can help you compare suspension language with deadline notices, review wording, and contact-route guidance so you know whether the issue still needs explanation or real follow-up.",
    related:
      "Useful next pages:\n• /claim-checker\n• /guides/how-to-read-grant-suspension-wording-safely\n• /guides/how-to-check-if-a-suspension-warning-is-official\n• /guides/what-to-do-if-you-fear-your-grant-is-suspended\n• /guides/how-to-find-official-contact-details-safely\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why does suspension wording feel so alarming?",
        answer: "Because it sounds serious and can affect a user's sense of security immediately.",
      },
      {
        question: "What should I check first?",
        answer: "Check the exact wording and whether it came from a clear official route.",
      },
      {
        question: "Should I trust a social post about suspension?",
        answer: "No. Confirm the official source first.",
      },
    ],
    sortOrder: 317,
  }),
  guide({
    slug: "how-to-read-grant-suspension-wording-safely",
    title: "How to read grant suspension wording safely",
    summary:
      "A practical guide to reading suspension-style messages carefully so users do not mistake warnings, reviews, and confirmed actions for the same thing.",
    quickAnswer:
      "Read suspension wording safely by using the exact message, not memory, and by checking whether it points to review, warning, deadline, or a confirmed official action.",
    whatThisMeans:
      "Suspension wording often sits close to other serious-sounding messages. That is why reading the exact phrase matters more here than in many other grant searches.",
    whyThisMatters:
      "Users who compress the message into one scary word can miss the difference between a warning and a final official step.",
    steps:
      "1. Save the exact wording.\n2. Read whether the message is a warning, review, request, or confirmed action.\n3. Check whether a deadline or supporting detail is attached.\n4. Compare the message with the right GrantCare guide.\n5. Use official channels if the wording clearly asks for action.",
    keyFocusTitle: "The exact phrase can change the meaning a lot",
    keyFocus:
      "Suspension-style language often feels similar at first glance, but a small wording difference can completely change what the user should do next.",
    important:
      "GrantCare explains wording patterns but does not replace official channels for confirmation or action.",
    help:
      "GrantCare can help users separate suspension, deadline, review, and verification language so they do not respond to the wrong problem.",
    related:
      "Useful next pages:\n• /guides/what-grant-suspension-searches-usually-mean\n• /guides/how-to-check-if-a-suspension-warning-is-official\n• /guides/what-id-and-kyc-deadline-searches-usually-mean\n• /guides/what-to-do-if-you-fear-your-grant-is-suspended\n• /guides/how-to-find-official-contact-details-safely",
    faqs: [
      {
        question: "Why should I save the exact wording?",
        answer: "Because the exact phrase may tell you whether the issue is a warning, a review, or a confirmed official action.",
      },
      {
        question: "What if the wording still feels too serious to judge calmly?",
        answer: "Use a wording guide and the official source together instead of relying on memory.",
      },
      {
        question: "When should I act?",
        answer: "Act when the official wording clearly asks for a next step rather than only guessing from a vague claim.",
      },
    ],
    sortOrder: 318,
  }),
  guide({
    slug: "how-to-check-if-a-suspension-warning-is-official",
    title: "How to check if a suspension warning is official",
    summary:
      "A trust guide for verifying suspension warnings before users panic or respond to the wrong route.",
    quickAnswer:
      "Check if a suspension warning is official by confirming the source, the route, and the exact wording before you treat it as a real action notice.",
    whatThisMeans:
      "Suspension warnings can appear in messages, posts, or pages that sound urgent. That urgency is exactly why users need a stronger source check before they believe the warning.",
    whyThisMatters:
      "If the warning is fake or distorted, users may waste time, share details unsafely, or take the wrong next step.",
    steps:
      "1. Check where the warning came from.\n2. Look for whether it points to a clear official route.\n3. Save the exact wording and any date attached.\n4. Avoid clicking urgent links that do not clearly prove the route.\n5. Use official contact or status routes if the warning still looks real after checking.",
    keyFocusTitle: "Urgency is when source-checking matters most",
    keyFocus:
      "The more urgent the warning feels, the more users should slow down and test the source instead of reacting to the fear it creates.",
    important:
      "GrantCare can help users evaluate warnings, but official confirmation of suspension-related issues still belongs to official channels.",
    help:
      "GrantCare can help you compare suspension warnings with review wording, deadline notices, and contact guidance so you do not react blindly.",
    related:
      "Useful next pages:\n• /guides/what-grant-suspension-searches-usually-mean\n• /claim-checker\n• /guides/how-to-read-grant-suspension-wording-safely\n• /guides/what-id-and-kyc-deadline-searches-usually-mean\n• /guides/how-to-find-official-contact-details-safely\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why are suspension warnings easy to trust too quickly?",
        answer: "Because they create fear and urgency, which can push users to skip verification.",
      },
      {
        question: "What should I save first?",
        answer: "Save the exact warning wording and any date attached to it.",
      },
      {
        question: "What if the warning still looks real after I check it?",
        answer: "Move to the correct official route for confirmation or the required next step.",
      },
    ],
    sortOrder: 319,
  }),
  guide({
    slug: "what-to-do-if-you-fear-your-grant-is-suspended",
    title: "What to do if you fear your grant is suspended",
    summary:
      "A calm next-step guide for users who are scared by suspension claims and need a clearer way to respond.",
    quickAnswer:
      "If you fear your grant is suspended, start by saving the wording, checking the source, and working out whether the message is a real official notice or a rumour before you do anything else.",
    whatThisMeans:
      "Suspension fear can come from official wording, a message, a post, or even a rumour shared by someone else. The safest response is to move from fear to facts as quickly as possible.",
    whyThisMatters:
      "Acting on fear alone can push users into bad links, wrong assumptions, or unsafe sharing of personal details.",
    steps:
      "1. Save the wording or message that caused the fear.\n2. Check whether it came from a clear official route.\n3. Compare it with the correct suspension and deadline guides.\n4. Gather any records or details linked to the issue.\n5. Use official channels if the message clearly needs real follow-up.",
    keyFocusTitle: "Move from fear to the exact message",
    keyFocus:
      "The fastest way to calm the problem is to stop working from feeling alone and start working from the exact words, the exact source, and the exact next-step request if there is one.",
    important:
      "GrantCare is not the official decision maker on suspension matters. It helps users interpret the situation more clearly before they act.",
    help:
      "GrantCare can help users understand whether the problem looks like a deadline, review, verification issue, or a more direct official action that needs follow-up.",
    related:
      "Useful next pages:\n• /guides/what-grant-suspension-searches-usually-mean\n• /guides/how-to-read-grant-suspension-wording-safely\n• /guides/how-to-check-if-a-suspension-warning-is-official\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-keep-records-of-payment-problems",
    faqs: [
      {
        question: "What should I do first if I feel scared?",
        answer: "Save the wording and check the source before you do anything else.",
      },
      {
        question: "Why should I not act from fear alone?",
        answer: "Because fear can make unsafe pages and weak claims feel more trustworthy than they are.",
      },
      {
        question: "What helps after I save the wording?",
        answer: "Compare it with the right guide and the right official route before you react further.",
      },
    ],
    sortOrder: 320,
  }),
  guide({
    slug: "what-id-and-kyc-deadline-searches-usually-mean",
    title: "What ID and KYC deadline searches usually mean",
    summary:
      "A practical guide to ID-update and KYC-deadline searches and how to read deadline claims safely without overreacting to vague warnings.",
    quickAnswer:
      "ID and KYC deadline searches usually mean users are worried about a record update or verification deadline. The safest move is to check the exact wording and source before treating the deadline as a confirmed official instruction.",
    whatThisMeans:
      "Deadline language can refer to different things: ID verification, KYC-style updates, card changes, or another record-related step. That is why users need to understand what the deadline is actually about before they act.",
    whyThisMatters:
      "A vague deadline notice can create panic, but the right response depends on whether the message is real, current, and clearly connected to the user’s situation.",
    steps:
      "1. Save the exact deadline wording.\n2. Work out what the deadline is actually about.\n3. Check whether the source is clearly official.\n4. Avoid using third-party pages to handle the update.\n5. Use GrantCare if you need help translating the deadline message into a safer next step.",
    keyFocusTitle: "A deadline is only useful when the task is clear",
    keyFocus:
      "Users often focus on the date and forget to identify the task behind it. The safer reading starts by asking what the deadline is actually asking you to do.",
    important:
      "GrantCare can explain deadline wording, but official confirmation and official record updates still belong to official routes.",
    help:
      "GrantCare can help you separate ID, KYC, card, and beneficiary-detail update searches so you know which official route makes sense for the warning you saw.",
    related:
      "Useful next pages:\n• /claim-checker\n• /guides/how-to-check-if-a-deadline-notice-is-official\n• /guides/what-gold-card-and-card-deadline-searches-usually-mean\n• /guides/what-beneficiary-detail-update-searches-usually-mean\n• /guides/how-to-find-official-contact-details-safely\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why can deadline searches feel more confusing than useful?",
        answer: "Because the deadline often sounds urgent before the actual task behind it is clear.",
      },
      {
        question: "What should I identify first?",
        answer: "Identify what the deadline is asking you to update, confirm, or review.",
      },
      {
        question: "Should I use a third-party page to fix it quickly?",
        answer: "No. Use the correct official route instead.",
      },
    ],
    sortOrder: 321,
  }),
  guide({
    slug: "how-to-check-if-a-deadline-notice-is-official",
    title: "How to check if a deadline notice is official",
    summary:
      "A trust guide for users who see grant-related deadline notices and want to avoid fake warnings or pressure tactics.",
    quickAnswer:
      "Check if a deadline notice is official by confirming the source, the route, the task involved, and whether the wording clearly matches a real official process.",
    whatThisMeans:
      "Deadline notices create pressure, and pressure often makes weak claims feel stronger than they really are. That is why source-checking is especially important with deadline messages.",
    whyThisMatters:
      "A fake or unclear deadline can push users into rushed updates, unsafe pages, or unnecessary fear.",
    steps:
      "1. Save the exact notice.\n2. Check where the notice came from.\n3. Identify the task the deadline refers to.\n4. Avoid acting on unclear links or cropped images.\n5. Use official routes if the notice still looks real after careful checking.",
    keyFocusTitle: "Pressure is part of why deadline notices work",
    keyFocus:
      "The biggest risk with deadline notices is not only the wording. It is the pressure the notice creates. That pressure is what makes a slower, source-first check so valuable.",
    important:
      "GrantCare can help evaluate deadline notices, but final confirmation and official action still belong to official channels.",
    help:
      "GrantCare can help you compare deadline notices with record updates, card changes, suspension warnings, and contact-route guidance so the issue feels easier to classify.",
    related:
      "Useful next pages:\n• /guides/what-id-and-kyc-deadline-searches-usually-mean\n• /claim-checker\n• /guides/what-gold-card-and-card-deadline-searches-usually-mean\n• /guides/what-beneficiary-detail-update-searches-usually-mean\n• /guides/how-to-check-if-a-suspension-warning-is-official\n• /guides/how-to-find-official-contact-details-safely",
    faqs: [
      {
        question: "Why are deadline notices easy to trust too quickly?",
        answer: "Because they create urgency and fear of missing something important.",
      },
      {
        question: "What should I save first?",
        answer: "Save the exact wording and the source of the notice first.",
      },
      {
        question: "What should I avoid doing?",
        answer: "Avoid clicking rushed links or acting on cropped images without a clear official route behind them.",
      },
    ],
    sortOrder: 322,
  }),
  guide({
    slug: "what-gold-card-and-card-deadline-searches-usually-mean",
    title: "What gold card and card deadline searches usually mean",
    summary:
      "A plain-language guide to gold-card, black-card, replacement, and card-deadline searches and how to read them safely.",
    quickAnswer:
      "Gold-card and card-deadline searches usually mean users are trying to verify whether a card change or deadline really applies to them. The safest move is to check the exact official notice and not rely on social posts alone.",
    whatThisMeans:
      "Card-related searches often carry urgency because they affect access, identity, or payment confidence. That urgency can make unclear posts feel stronger than they really are.",
    whyThisMatters:
      "If the card message is misunderstood, users may travel unnecessarily, miss the real task, or trust the wrong route for updates.",
    steps:
      "1. Save the exact card-related message or notice.\n2. Check whether it comes from a clear official route.\n3. Identify whether the issue is about replacement, deadline, or general update news.\n4. Avoid relying on shared screenshots with no source.\n5. Use official contact or update routes if the notice still appears genuine.",
    keyFocusTitle: "Card messages feel practical, but still need verification",
    keyFocus:
      "Because card-related notices sound concrete, users may trust them too quickly. The safer habit is to verify the route before making plans around the notice.",
    important:
      "GrantCare is not an official card-replacement or official card-update system. It helps users read card-related claims more safely.",
    help:
      "GrantCare can help you translate card-related searches into the right official contact or update route and keep rumours separate from real notices.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-a-deadline-notice-is-official\n• /guides/what-id-and-kyc-deadline-searches-usually-mean\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why do card deadline searches feel so urgent?",
        answer: "Because users associate card changes with access to support and payment security.",
      },
      {
        question: "Should I trust a card deadline screenshot on its own?",
        answer: "No. Check whether it comes from a clear official route.",
      },
      {
        question: "What should I identify first?",
        answer: "Identify whether the notice is about replacement, deadline, or a different card-related task.",
      },
    ],
    sortOrder: 323,
  }),
];

type GuideTranslation = {
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
};

const ZU_TRANSLATIONS: Record<string, GuideTranslation> = {
  "what-grant-increase-searches-usually-mean": {
    "title": "Ukuthi ukusesha kwesibonelelo sikahulumeni ngokuvamile kusho ukuthini",
    "summary": "Umhlahlandlela ocacile wokunikeza ukusesha okukhulayo kanye nendlela yokuyifunda ngokuphephile ngaphandle kwamahemuhemu adidayo, okuthunyelwe kwakudala, nezibuyekezo ezisemthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Nikeza usesho olukhuphukile ngokuvamile lusho ukuthi abasebenzisi bafuna ukwazi ukuthi amanani esibonelelo ashintshile yini. Indlela ephephe kunazo zonke yokufunda lokho kusesha iwukuhlukanisa amahlebezi avamile kusukela kusibuyekezo sakamuva esisemthethweni esishicilelwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abantu bavame ukucinga ukwanda uma befuna impendulo eyodwa eqondile ngemali. Empeleni, impendulo ewusizo ngokuvamile incike osukwini lokubuyekezwa, uhlobo lwesibonelelo, kanye nokuthi umthombo usemthethweni ngokusobala yini."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma umsebenzisi ethemba okuthunyelwe okukhushulwayo okudala noma okungacacile, umphumela ungase ube ukulindela okungamanga mayelana namanani esibonelelo, isikhathi sokukhokha, noma ukufaneleka."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi isimangalo sokwenyuka sixhumene yini nesibuyekezo esisemthethweni esicacile.\n2. Qondanisa isibuyekezo nohlobo oluqondile lwesibonelelo.\n3. Qaphela amalebula onyaka asuka kokuthunyelwe amadala.\n4. Gwema ukwethemba izithombe-skrini ezingenamthombo.\n5. Sebenzisa i-GrantCare ukuze uhumushe isimangalo ngaphandle kokusithatha njengesiqiniseko esisemthethweni."
      },
      {
        "title": "Umbuzo ophephile kakhulu awuzange ukhule, kodwa ngokusho kwamuphi umthombo",
        "body": "Ukwanda kwamahemuhemu kuvame ukuzwakala kukholakala ngoba kwabiwa njengamaqiniso alula. Ukuhlola okuqinile ukuthi isimangalo sivela ngokusobala yini esibuyekezweni esisemthethweni esishicilelwe nokuthi siyahambisana yini nesigaba sesibonelelo osikhathalelayo ngempela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingachaza izimangalo ezikhuphukayo, kodwa amanani ezibonelelo ezisemthethweni nezinguquko ezisemthethweni kusengezaseziteshini zikahulumeni ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqhathanise izigaba zesibonelelo, umongo wedethi yokukhokha, nemihlahlandlela yokuhlola isibuyekezo ukuze ukhulise ukusesha kube lula ukufundeka ngokuphephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely\n• /grants"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani ukusesha kwesibonelelo sikahulumeni kuzwakala kuphuthumayo?",
        "body": "Ngoba zithinta okulindelwe ngemali futhi abasebenzisi bavame ukufuna impendulo esheshayo, elula."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola umthombo, idethi, kanye nesigaba esiqondile sesibonelelo esihilelekile."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingakuqinisekisa ukwenyuka okusemthethweni?",
        "body": "Cha. Kungasiza ukuchaza isimangalo, kodwa ukuqinisekiswa okusemthethweni kuseseziteshini ezisemthethweni."
      }
    ]
  },
  "how-to-check-if-a-grant-increase-update-is-official": {
    "title": "Ungahlola kanjani ukuthi isibuyekezo sokukhushulwa kwesibonelelo sikahulumeni sisemthethweni",
    "summary": "Umhlahlandlela wokuqala wokuthembana wokuhlola ukuthi ingabe isibuyekezo sokukhushulwa kwesibonelelo sikahulumeni sivela ngempela emthonjeni osemthethweni ngaphambi kokuthi uthembele kuso.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola ukuthi isibuyekezo sokukhushulwa kwesibonelelo sikahulumeni sisemthethweni yini ngokubheka umthombo, umzila, nesigaba sesibonelelo kunokuthemba inani noma amagama kuphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amaposi amaningi akhuphukayo abukeka ekholeka ngoba asebenzisa ulimi olujwayelekile lwesibonelelo. Inkinga ukuthi amagama akopishiwe angahamba ngokushesha kunezibuyekezo zangempela ezisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Isimangalo sokwenyuka esingamanga singashintsha izinhlelo zendlu, sidale ukukhathazeka, noma sisunduzele abasebenzisi kumakhasi angaphephile azenza sengathi achaza noma avule ushintsho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka umthombo osemthethweni ocacile.\n2. Qondanisa isibuyekezo nesigaba esifanele sesibonelelo.\n3. Hlola ukuthi ingabe okuthunyelwe kusenengqondo yini esikhathini sakamuva.\n4. Gwema ukuthembela ezithombeni-skrini ezabiwe ezingenamthombo.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuqonda umehluko phakathi kwesiqondiso nokuqinisekiswa."
      },
      {
        "title": "Umthombo uza ngaphambi kwenani",
        "body": "Inani kokuthunyelwe akulona ubufakazi obunamandla. Ubufakazi obuqine kakhulu ukuthi ingabe isibuyekezo singesomzila osemthethweni olungile futhi sisebenza ngokusobala kusibonelelo okuxoxwa ngaso."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayisebenzi njengomshicileli osemthethweni wokwenyuka kwesibonelelo. Isiza abasebenzisi ukuthi bahlole izimangalo ngokucophelela."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise ukukhushulwa kokuthunyelwe namakhasi ohlobo lwesibonelelo, imihlahlandlela yemizila esemthethweni, nomongo wedethi yokukhokha ukuze ufunde isimangalo ngokuzola."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-grant-increase-searches-usually-mean\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani umthombo ubaluleke kakhulu kunenombolo?",
        "body": "Ngoba inombolo ingakopishwa kalula, kuyilapho umthombo osemthethweni ocacile unzima kakhulu ukukhohlisa kahle."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngethembe isithombe esikhulayo esabiwe eqenjini?",
        "body": "Cha. Qinisekisa umthombo osemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Yini enye okufanele ngiyifanise ngaphandle komthombo?",
        "body": "Qondanisa isibuyekezo nesigaba esifanele sesibonelelo kanye nesikhathi esifanele."
      }
    ]
  },
  "how-to-read-grant-increase-news-safely": {
    "title": "Uzifunda kanjani izindaba zesibonelelo sikahulumeni ngokuphepha",
    "summary": "Umhlahlandlela osebenzayo wokufunda isibonelelo sinyusa izindaba ngendlela ezolile necophelelayo ngaphandle kokushintsha zonke izihloko zezindaba zibe isenzo esiqinisekisiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Funda izindaba zokukhushulwa kwesibonelelo sikahulumeni ngokuphepha ngokuhlola ukuthi umbiko ukhomba yini isibuyekezo esisemthethweni esicacile, ukuthi isihloko siyafana yini nesigaba sesibonelelo sikahulumeni, kanye nokuthi isikhathi sisemanje yini."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Imibiko yokwanda kwesitayela sezindaba ivamise ukucindezela ulwazi oluningi lube sihloko esisodwa. Abasebenzisi kusadingeka behlise ijubane ngokwanele ukuze babuze ukuthi yini eshintshile, yasiphi isibonelelo, futhi ngokuya ngamuphi umthombo osemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Isihloko esifushane singenza isibuyekezo esihlala njalo noma esidala sizwakale ngokushesha futhi sifinyelele indawo yonke uma singenjalo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda ngale kwesihloko.\n2. Hlola ukuthi umbiko umayelana nani ngempela.\n3. Bheka ukuthi ingabe ikhomba emuva kusibuyekezo esishicilelwe esisemthethweni.\n4. Qaphela izindaba ezindala okwabelwana ngazo futhi kamuva.\n5. Sebenzisa i-GrantCare ukuze uqonde incazelo engokoqobo ngaphandle kokufunda kakhulu isihloko."
      },
      {
        "title": "Izihloko zezindaba ngokuvamile zenza kube lula kunalokho ezikuchazayo",
        "body": "Umkhuba owusizo ukuphatha izihloko zezindaba ezikhuphukayo njengesiqalo sokuqinisekisa, hhayi njengobufakazi bokugcina. Imininingwane emincane ivamise ukushintsha indlela isihloko okufanele siqondwe ngayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza abasebenzisi ukuthi bafunde ukubika komphakathi ngokucophelela, kodwa ayithathi indawo yemithombo esemthethweni yokuqinisekisa kokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke esihlokweni uye ekhasini elifanele lesibonelelo, inkomba yokuhlola isibuyekezo, noma umongo wokukhokha ngaphandle kokuqagela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/what-grant-increase-searches-usually-mean\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely\n• /guides/how-to-know-if-a-sassa-website-is-official"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde ngale kwesihloko?",
        "body": "Ngoba imininingwane ebalulekile mayelana nomthombo, isikhathi, kanye nesigaba sesibonelelo sivame ukuba ngaphakathi kwendaba, hhayi esihlokweni."
      },
      {
        "title": "I-FAQ: Ingabe indaba endala yokwenyuka ingaqhubeka nokusabalala ngokuhamba kwesikhathi?",
        "body": "Yebo. Yingakho ukuhlola isikhathi kubaluleke kakhulu."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise nayo umbiko wezindaba?",
        "body": "Qhathanisa nesibuyekezo esisemthethweni esifanele kanye nesigaba esifanele sesibonelelo."
      }
    ]
  },
  "how-to-check-older-persons-grant-increase-updates-safely": {
    "title": "Ungahlola kanjani ukuvuselelwa kwesibonelelo sikahulumeni sabadala ngokuphephile",
    "summary": "Igayidi yokwethenjwa yokuqala kubantu asebekhulile inikeza ukusesha okukhulayo kanye nendlela yokuhlukanisa izibuyekezo ezisemthethweni ezishicilelwe kokuthunyelwe okukopishiwe noma amalebula onyaka omdala.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola ukuthi abantu abadala banikeza izibuyekezo zokukhushulwa ngokusebenzisa ulwazi lwakamuva olusemthethweni olushicilelwe kunokuthembela ngokwabo izithombe-skrini, okuthunyelwe okukopishiwe, noma amalebula onyaka omdala."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukwenyuka Kwesibonelelo Sabantu Abadala ukusesha ngokuvamile kuvela kubasebenzisi abafuna impendulo eyodwa elula mayelana nemali noma isikhathi. Impendulo ephephile ngokuvamile akuyona inombolo eyodwa kokuthunyelwe. Isibuyekezo sakamuva esishicilelwe esisemthethweni saleso sigaba sesibonelelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Khulisa amahlebezi asakazwa kalula ngoba abasebenzisi bafuna isiqiniseko ngokushesha. Uma inombolo ingalungile noma iphelelwe isikhathi, ingadala ithemba elingamanga, ukwethuka, noma ukudideka mayelana nokuthi ushintsho lusebenza nini ngempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola isibuyekezo sakamuva esisemthethweni sezinguquko zezibonelelo zabantu abadala.\n2. Qaphela amalebula onyaka afana no-2025 noma 2026 uma iposi lidala.\n3. Gwema ukwethemba izithombe-skrini ezingenamthombo.\n4. Qhathanisa isibuyekezo nohlobo lwesibonelelo osithola ngempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokufunda isibuyekezo ngaphandle kokuphutha isiqondiso sokuqinisekisa."
      },
      {
        "title": "Uhlobo lwesibonelelo lubaluleke kakhulu njengenombolo",
        "body": "Indlela ephephe kunazo zonke yokufunda isimangalo sokwenyuka ukusifanisa nohlobo oluqondile lwesibonelelo sikahulumeni kuqala. Inombolo ezwakala ilungile ngokujwayelekile isengaba nephutha kubantu abadala abanikeza usizo ngokukhethekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikushicileli ukukhuphuka kwezibonelelo ezisemthethweni njengesiphathimandla sikahulumeni. Isiza abasebenzisi ukuthi bafunde izimangalo zomphakathi ngokucophelela futhi bazibuyisele eziteshini ezisemthethweni ukuze ziqinisekiswe okokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amakhasi ohlobo lwesibonelelo, izinsuku zokukhokha, nemihlahlandlela yokuhlola isibuyekezo esiphephile ukuze ukhuphule izimangalo zizwe zingadideki futhi zingenabungozi kangako."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/older-persons\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngithembe umsebenzi wokukhushulwa kwesibonelelo sikahulumeni sabantu abadala ngaphandle komthombo?",
        "body": "Cha. Kuphephe kakhudlwana ukuqinisekisa isibuyekezo sakamuva esishicilelwe esisemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Kungani amalebula onyaka omdala ebaluleke kangaka?",
        "body": "Ngoba abasebenzisi bavame ukwabelana ngamaposi amadala angasabonisi isimo sakamuva esishicilelwe."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingaqinisekisa inani lokugcina?",
        "body": "I-GrantCare ingachaza ukuthi isimangalo sisho ukuthini, kodwa isiqinisekiso esisemthethweni siseseziteshini zikahulumeni ezifanele."
      }
    ]
  },
  "how-to-check-disability-grant-increase-updates-safely": {
    "title": "Ungahlola kanjani ukuthuthukiswa kwezibonelelo zokukhubazeka ngokuphepha",
    "summary": "Igayidi yokwethenjwa yokuqala ekusesheni okukhushulwayo kwesibonelelo sokukhubazeka kanye nendlela yokuhlukanisa izibuyekezo ezisemthethweni ezishicilelwe kokuthunyelwe okukopishiwe noma amalebula onyaka omdala.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola izibuyekezo zokukhushulwa kwesibonelelo sokukhubazeka ngokusebenzisa ulwazi lwakamuva olusemthethweni olushicilelwe esikhundleni sokuthemba izithombe-skrini, okuthunyelwe okukopishiwe, noma amalebula onyaka omdala ngokwawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho olukhushulwayo lwe-Diability Grant ngokuvamile luvela kubasebenzisi abafuna impendulo eyodwa elula mayelana nemali noma isikhathi. Impendulo ephephile ngokuvamile akuyona inombolo eyodwa kokuthunyelwe. Isibuyekezo sakamuva esishicilelwe esisemthethweni saleso sigaba sesibonelelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Khulisa amahlebezi asakazwa kalula ngoba abasebenzisi bafuna isiqiniseko ngokushesha. Uma inombolo ingalungile noma iphelelwe isikhathi, ingadala ithemba elingamanga, ukwethuka, noma ukudideka mayelana nokuthi ushintsho lusebenza nini ngempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola isibuyekezo sakamuva esisemthethweni ngezinguquko zesibonelelo sokukhubazeka.\n2. Qaphela amalebula onyaka afana no-2025 noma 2026 uma iposi lidala.\n3. Gwema ukwethemba izithombe-skrini ezingenamthombo.\n4. Qhathanisa isibuyekezo nohlobo lwesibonelelo osithola ngempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokufunda isibuyekezo ngaphandle kokuphutha isiqondiso sokuqinisekisa."
      },
      {
        "title": "Uhlobo lwesibonelelo lubaluleke kakhulu njengenombolo",
        "body": "Indlela ephephe kunazo zonke yokufunda isimangalo sokwenyuka ukusifanisa nohlobo oluqondile lwesibonelelo sikahulumeni kuqala. Inombolo ezwakala ilungile ngokuvamile isengaba nephutha ekusekelweni kwesibonelelo sokukhubazeka ngokuqondile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikushicileli ukukhuphuka kwezibonelelo ezisemthethweni njengesiphathimandla sikahulumeni. Isiza abasebenzisi ukuthi bafunde izimangalo zomphakathi ngokucophelela futhi bazibuyisele eziteshini ezisemthethweni ukuze ziqinisekiswe okokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amakhasi ohlobo lwesibonelelo, izinsuku zokukhokha, nemihlahlandlela yokuhlola isibuyekezo esiphephile ukuze ukhuphule izimangalo zizwe zingadideki futhi zingenabungozi kangako."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/disability\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngithembe umsebenzi wokukhushulwa kwesibonelelo sikahulumeni sokukhubazeka ngaphandle komthombo?",
        "body": "Cha. Kuphephe kakhudlwana ukuqinisekisa isibuyekezo sakamuva esishicilelwe esisemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Kungani amalebula onyaka omdala ebaluleke kangaka?",
        "body": "Ngoba abasebenzisi bavame ukwabelana ngamaposi amadala angasabonisi isimo sakamuva esishicilelwe."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingaqinisekisa inani lokugcina?",
        "body": "I-GrantCare ingachaza ukuthi isimangalo sisho ukuthini, kodwa isiqinisekiso esisemthethweni siseseziteshini zikahulumeni ezifanele."
      }
    ]
  },
  "how-to-check-child-support-grant-increase-updates-safely": {
    "title": "Ungahlola kanjani izibuyekezo zokwenyuka kwesibonelelo sezingane ngokuphepha",
    "summary": "Igayidi yokwethenjwa yokuqala yokuseshwa kwesibonelelo sezingane kanye nendlela yokuhlukanisa izibuyekezo ezisemthethweni ezishicilelwe kokuthunyelwe okukopishiwe noma amalebula onyaka omdala.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola izibuyekezo zokukhushulwa kwesibonelelo sezingane ngokusebenzisa ulwazi lwakamuva olusemthethweni olushicilelwe esikhundleni sokuthemba izithombe-skrini, okuthunyelwe okukopishiwe, noma amalebula onyaka omdala ngokwawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho olukhushulwayo lweSibonelelo Sokusekelwa Kwezingane ngokuvamile luvela kubasebenzisi abafuna impendulo eyodwa elula mayelana nemali noma isikhathi. Impendulo ephephile ngokuvamile akuyona inombolo eyodwa kokuthunyelwe. Isibuyekezo sakamuva esishicilelwe esisemthethweni saleso sigaba sesibonelelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Khulisa amahlebezi asakazwa kalula ngoba abasebenzisi bafuna isiqiniseko ngokushesha. Uma inombolo ingalungile noma iphelelwe isikhathi, ingadala ithemba elingamanga, ukwethuka, noma ukudideka mayelana nokuthi ushintsho lusebenza nini ngempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola isibuyekezo sakamuva esisemthethweni sezinguquko zesibonelelo sezingane.\n2. Qaphela amalebula onyaka afana no-2025 noma 2026 uma iposi lidala.\n3. Gwema ukwethemba izithombe-skrini ezingenamthombo.\n4. Qhathanisa isibuyekezo nohlobo lwesibonelelo osithola ngempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokufunda isibuyekezo ngaphandle kokuphutha isiqondiso sokuqinisekisa."
      },
      {
        "title": "Uhlobo lwesibonelelo lubaluleke kakhulu njengenombolo",
        "body": "Indlela ephephe kunazo zonke yokufunda isimangalo sokwenyuka ukusifanisa nohlobo oluqondile lwesibonelelo sikahulumeni kuqala. Inombolo ezwakala ilungile ngokujwayelekile isengaba nephutha emalini yesibonelelo sezingane ngokuqondile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikushicileli ukukhuphuka kwezibonelelo ezisemthethweni njengesiphathimandla sikahulumeni. Isiza abasebenzisi ukuthi bafunde izimangalo zomphakathi ngokucophelela futhi bazibuyisele eziteshini ezisemthethweni ukuze ziqinisekiswe okokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amakhasi ohlobo lwesibonelelo, izinsuku zokukhokha, nemihlahlandlela yokuhlola isibuyekezo esiphephile ukuze ukhuphule izimangalo zizwe zingadideki futhi zingenabungozi kangako."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/child-support\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngithembe umsebenzi wokwenyusa imali yesibonelelo sezingane ngaphandle komthombo?",
        "body": "Cha. Kuphephe kakhudlwana ukuqinisekisa isibuyekezo sakamuva esishicilelwe esisemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Kungani amalebula onyaka omdala ebaluleke kangaka?",
        "body": "Ngoba abasebenzisi bavame ukwabelana ngamaposi amadala angasabonisi isimo sakamuva esishicilelwe."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingaqinisekisa inani lokugcina?",
        "body": "I-GrantCare ingachaza ukuthi isimangalo sisho ukuthini, kodwa isiqinisekiso esisemthethweni siseseziteshini zikahulumeni ezifanele."
      }
    ]
  },
  "what-pension-increase-searches-usually-mean": {
    "title": "Ukuthi ukukhuphuka kwempesheni kusesho ukuthini ngokujwayelekile",
    "summary": "Igayidi ezolile yokusesha okwenyukayo kwesitayela sempesheni nokuthi ungayifunda kanjani ngaphandle kwenkulumo evamile edidayo, izikhala zezibonelelo zabadala, nezibuyekezo ezisemthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lokwenyuka kwempesheni ngokuvamile lusho ukuthi abasebenzisi bazama ukuqinisekisa izinguquko zosekelo lwabantu abadala. Umkhuba ophephe kakhulu ukufanisa isimangalo nesigaba sangempela sesibonelelo sikahulumeni kanye nesibuyekezo sakamuva esisemthethweni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abantu bavame ukusebenzisa igama elithi impesheni ngisho besho imali yesibonelelo sikahulumeni yabantu abadala. Lokho kungenza imiphumela yosesho izwakale ixubile futhi kunzima ukuyithemba uma umzila nesigaba sesibonelelo singahlolisiswa ngokucophelela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma amagama aseposini kanye nesigaba sesibonelelo esisemthethweni engafani ngokuhlanzekile, kulula ukuthi izimangalo ezindala noma ezingacacile zisakazeke."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi ingabe okuthunyelwe kumayelana nesibonelelo sikahulumeni sabantu abadala.\n2. Bheka umthombo osemthethweni ocacile.\n3. Qaphela ngokuthunyelwe okusekelwe onyakeni okwabiwe futhi kamuva.\n4. Gwema ukwethemba inani uwedwa.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuhumusha ulimi lokusesha lube esigabeni esilungile sesibonelelo."
      },
      {
        "title": "Ulimi lokusesha namagama ezibonelelo ezisemthethweni awahlali afana",
        "body": "Ingxenye enkulu yokufunda okuphephile lapha iwukubona ukuthi imikhuba yosesho ingasebenzisa ilebula eyodwa kuyilapho uhlelo olusemthethweni lwesibonelelo lisebenzisa enye. Leso sinyathelo sokuhumusha sisiza abasebenzisi ukuthi baqinisekise umzila olungile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi baqonde ukusesha kwendlela yempesheni, kodwa ukuqinisekiswa okusemthethweni mayelana nesibonelelo sikahulumeni sabantu abadala kuseseziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke emazwini empesheni uye ekhasini lezibonelelo zabantu abadala, imikhuba esemthethweni yokuhlola ukubuyekezwa, kanye nomongo wedethi yokukhokha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-older-persons-grant-increase-updates-safely\n• /guides/how-to-check-old-age-grant-increase-rumours-safely\n• /grants/older-persons\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani ukusesha impesheni kuzwakala kuxubene nosesho lwezibonelelo?",
        "body": "Ngoba abasebenzisi bavamise ukusebenzisa amagama ansuku zonke angafani ncamashi negama lesibonelelo elisemthethweni."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyifanise kuqala?",
        "body": "Qondanisa isimangalo nesigaba sesibonelelo sabantu abadala kuqala."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe inani ngedwa?",
        "body": "Cha. Umthombo nesigaba sesibonelelo sibalulekile."
      }
    ]
  },
  "how-to-check-old-age-grant-increase-rumours-safely": {
    "title": "Ungawabheka kanjani amahemuhemu esibonelelo sikahulumeni sabadala ngokuphepha",
    "summary": "Umhlahlandlela wokuhlola amahemuhemu akhuphukayo esibonelelo sikahulumeni sabadala ngaphandle kokuphazama izimangalo ezabiwe zezinguquko ezisemthethweni eziqinisekisiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola amahemuhemu okukhulisa isibonelelo sabadala ngokuphepha ngokufanisa isimangalo nesibonelelo sabadala, ubheke umthombo osemthethweni ocacile, futhi uqaphe ngamalebula onyaka agaywe kabusha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amahlebezi okukhula kwesibonelelo sikahulumeni avame ukusabalala emilayezweni emifushane noma ezithombeni. Zizwakala ziwusizo ngoba kulula ukwabelana ngazo, kodwa lokho kulula kungafihla umongo ongekho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bangase benze izinhlelo mayelana namahemuhemu ngaphambi kokuthi bazi ukuthi angempela, awamanje, noma axhumene nesigaba esifanele sesibonelelo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Humusha amagama asebekhulile esigabeni sezibonelelo zabantu abadala.\n2. Hlola ukuthi isimangalo sinawo yini umthombo osemthethweni ocacile.\n3. Qaphela ngokuthunyelwe usebenzisa amadethi amadala noma amalebula onyaka.\n4. Gwema ukwethemba izithombe ezinqanyuliwe.\n5. Sebenzisa i-GrantCare ukuze uqhathanise isimangalo nekhasi elilungile lesibonelelo kanye nemihlahlandlela yokuhlola isibuyekezo."
      },
      {
        "title": "Amahemuhemu amafushane asusa umongo oyidinga kakhulu",
        "body": "Lapho amahemuhemu emfushane, kubaluleke kakhulu ukuthi uzakhele kabusha umongo ongekho. Lokho kusho ukuhlola isigaba sesibonelelo, isikhathi, kanye nomthombo ngaphambi kokuthi ukholelwe inombolo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza amahlebezi ezibonelelo zabadala ngolimi olulula, kodwa isiqinisekiso sokugcina esisemthethweni siseseziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuxhuma amahemuhemu ekhasini elifanele lesibonelelo, amagama afanele, kanye nemikhuba efanele yokuhlola isibuyekezo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-older-persons-grant-increase-updates-safely\n• /guides/what-pension-increase-searches-usually-mean\n• /grants/older-persons\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kulula ukuwethemba amahlebezi ezibonelelo zabadala?",
        "body": "Ngoba mafushane, aqondile, futhi avame ukuhlanganyela emagameni ajwayelekile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihumushe kuqala?",
        "body": "Humusha amagama asebekhulile uwafake esigabeni sesibonelelo sabantu abadala kuqala."
      },
      {
        "title": "I-FAQ: Yini eyenza amahemuhemu abe buthaka?",
        "body": "Umthombo ongekho, isikhathi esingacacile, nezithombe ezingenawo umongo osemthethweni konke kuyenza ibe buthaka."
      }
    ]
  },
  "how-to-tell-grant-amount-pages-from-rumours": {
    "title": "Ungawahlukanisa kanjani amakhasi enani lemali yesibonelelo kumahemuhemu",
    "summary": "Umhlahlandlela wokuthembana wokutshela umehluko phakathi kwekhasi lenani lesibonelelo nekhasi lamahemuhemu elakhelwe eduze kokwesaba, ukuphuthuma, noma izinombolo ezikopishiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Tshela amakhasi yenani lemali yesibonelelo kusuka kumahemuhemu ngokubheka ukuthi ikhasi liwuchaza ngokucacile yini umthombo, isigaba sesibonelelo, kanye nesikhathi esikhundleni sokuphusha inombolo noma isimangalo esiphuthumayo kuphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ikhasi lemali yangempela kufanele lisize abasebenzisi baqonde ukuthi inombolo isho ukuthini, isiphi isibonelelo, futhi ngokuya ngamuphi umthombo. Amakhasi amahemuhemu ngokuvamile agxila enombolweni kanye nomuzwa ozungezile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bengakwazi ukusho umehluko, bangase bathembe inombolo engenandlela ethembekile ngemuva kwayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi ikhasi lisho ngokucacile yini isigaba sesibonelelo.\n2. Bheka ukuthi ingabe ikhomba emthonjeni othembekile.\n3. Qaphela uma ikhasi liphinda izinombolo kanye nokuphuthuma.\n4. Qhathanisa ikhasi neziqondiso zomzila osemthethweni.\n5. Sebenzisa i-GrantCare uma udinga usizo lokufunda ikhasi ngokuphepha."
      },
      {
        "title": "Ikhasi eliwusizo lichaza umongo, hhayi izinombolo kuphela",
        "body": "Uphawu oluhle kakhulu lwekhasi eliwusizo umongo. Amahemuhemu ngokuvamile azama ukuhamba ngokushesha kunencazelo. Ikhasi eliphephile linikeza abasebenzisi umongo owanele wokucabanga ngaphambi kokuba benze."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele hhayi umthombo osemthethweni wamanani esibonelelo. Isiza abasebenzisi ukuhlola inani lamakhasi ngokucophelela."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amakhasi wenani nemikhuba yemizila esemthethweni, imihlahlandlela yokuhlola isibuyekezo, namakhasi ohlobo lwesibonelelo ukuze isimangalo sibe lula ukukwahlulela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Imuphi umehluko omkhulu phakathi kwekhasi eliwusizo nekhasi lamahemuhemu?",
        "body": "Ikhasi eliwusizo lichaza umongo nomthombo, kuyilapho ikhasi lamahemuhemu liphusha inombolo ngaphandle kokusekelwa okwanele."
      },
      {
        "title": "I-FAQ: Kungani ukuphuthuma kuwuphawu lwesixwayiso?",
        "body": "Ngoba kungacindezela abasebenzisi ukuthi bathembe isimangalo ngaphambi kokuthi basihlole kahle."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyibheke kuqala?",
        "body": "Bheka isigaba esicacile sesibonelelo, umthombo, kanye nemininingwane yesikhathi kuqala."
      }
    ]
  },
  "how-to-read-grant-amount-pages-safely": {
    "title": "Ungawafunda kanjani amakhasi yenani lesibonelelo sikahulumeni ngokuphepha",
    "summary": "Umhlahlandlela osebenzayo wokufunda amakhasi yenani lesibonelelo ngaphandle kokuphazama umhlahlandlela wesikhashana noma amanani amadala ukuze kuqinisekiswe ngokusemthethweni kwamanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Funda amakhasi yenani lesibonelelo sikahulumeni ngokubheka ukuthi inani lemali lingesasiphi isibonelelo, lisebenza kusiphi isikhathi, kanye nokuthi ikhasi lisihlukanisa ngokucacile yini isiqondiso nokuqinisekiswa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi enani angasiza uma ecophelela futhi esobala. Ziba yingozi uma abasebenzisi beqa inombolo kuphela futhi banganaki uhlobo lwesibonelelo, isikhathi, noma umthombo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Inombolo esekhasini lesibonelelo esingalungile noma kusukela esikhathini esingalungile ingadukisa abasebenzisi ngendlela amahemuhemu angenza ngayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qondanisa inani nesigaba esiqondile sesibonelelo.\n2. Hlola isikhathi ikhasi elibhekise kuso.\n3. Bheka ukuthi ikhasi libonisa isixwayiso noma isiqinisekiso esisemthethweni.\n4. Gwema ukuthemba amakhasi amadala abiwe futhi kamuva.\n5. Sebenzisa i-GrantCare ukuze uqhathanise ikhasi nesibonelelo esilungile kanye nesiqondiso sokubuyekeza okusemthethweni."
      },
      {
        "title": "Inombolo ibalulekile kuphela uma umongo wayo ucacile",
        "body": "Amanani e-Grant aba usizo kuphela uma abasebenzisi bazi ukuthi iyiphi isibonelelo, yisiphi isikhathi, nokuthi inombolo ingeyamuphi umthombo. Ngaphandle kwalezo zinto ezintathu, leli khasi liyancipha ukwethembeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza abasebenzisi ukuthi bafunde amakhasi wenani ngokuphepha kakhulu, kodwa akuyena umshicileli osemthethweni wamanani esibonelelo sokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqondanise amakhasi wenani nekhasi elifanele lesibonelelo, imikhuba efanele yokuhlola isibuyekezo, kanye nomongo olungile wedethi yokukhokha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-check-older-persons-grant-increase-updates-safely\n• /grants"
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyifanise kuqala ekhasini lesamba?",
        "body": "Qondanisa inani nesigaba esifanele sesibonelelo kuqala."
      },
      {
        "title": "I-FAQ: Kungani isikhathi sesikhathi sibalulekile?",
        "body": "Ngoba inani elidala lingaqhubeka lijikeleza ngisho nangemva kokuba isikhundla esisemthethweni sesishintshile."
      },
      {
        "title": "I-FAQ: Ingabe ikhasi eliqaphelayo lisengaba usizo?",
        "body": "Yebo. Ikhasi elibonisa isixwayiso ngokucacile lingathembeka kakhulu kunelilo elizwakala liqinisekile kakhulu."
      }
    ]
  },
  "what-r700-grant-searches-usually-mean": {
    "title": "Okushiwo ukusesha kwesibonelelo sika-R700 kuvame ukusho",
    "summary": "Umhlahlandlela wolimi olulula osesho lwesibonelelo sika-R700 nokuthi kungani abasebenzisi kufanele baphathe amanani esibonelelo sikahulumeni njengento okufanele iqinisekiswe, hhayi njengobufakazi obusheshayo besibonelelo sikahulumeni sangempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuseshwa kwesibonelelo sika-R700 ngokuvamile kusho ukuthi abasebenzisi bazama ukuqinisekisa ukuthi inani lemali yesibonelelo esifunwayo noma indaba yokukhokha ingeyangempela. Isinyathelo esiphephe kunazo zonke siwukuthatha isimangalo njengesingaqinisekisiwe kuze kube yilapho umthombo osemthethweni usisekela ngokucacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amanani ezibonelelo ezifunwayo angasabalala ngokushesha kakhulu ngoba abukeka elula futhi eqondile. Lokho kunemba kubenza bazizwe bethembekile, kodwa inani elijwayelekile lilodwa alibonisi ukuthi isimangalo sibonisa isibonelelo sangempela esisemthethweni noma isibuyekezo senkokhelo esisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Izimangalo zenani elingamanga zivame ukudala ukuphuthuma, ithemba elingamanga, noma ingcindezi yokuchofoza ngokushesha. Abasebenzisi abama kancane ukuze baqinisekise umthombo mancane kakhulu amathuba okuba balandele umzila mbumbulu noma bathembe okuthunyelwe okudukisayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha inani elifunwayo njengelingaqinisekisiwe ekuqaleni.\n2. Hlola ukuthi isimangalo sivela kusibuyekezo esisemthethweni esicacile.\n3. Gwema ukwethemba uhlu lwabahlomuli, okuthunyelwe okuphuthumayo, noma izixhumanisi zezicelo ezikopishiwe ngokwazo.\n4. Qhathanisa isimangalo nohlobo lwesibonelelo noma umzila wokusekela okuthiwa ufana nawo.\n5. Sebenzisa i-GrantCare ukuze uqonde isimangalo ngokuphepha ngaphambi kokuthi uthathe isinyathelo ngaso."
      },
      {
        "title": "Inani elithile lingase libe isignali ebuthakathaka",
        "body": "Abantu bavame ukwethemba isimangalo ngoba sizwakala sinembile. Umbuzo ongcono awukona ukuthi inani liqondile kangakanani. Umbuzo ongcono ngowokuthi ingabe umzila, umthombo, kanye nesigaba sesibonelelo siyahambisana nakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele neze kwenziwe iphutha njengomthombo osemthethweni wokudala isibonelelo, ukugunyazwa, noma ukuqinisekiswa kwenani. Amanani ezibonelelo ezisemthethweni nokufaneleka kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amanani afunwayo nesiqondiso somzila osemthethweni, amakhasi okufaneleka, nemikhuba yokuhlola ephephile ukuze ungaphazamisi amahlebezi ngomnikelo wangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe imali yesibonelelo sika-R700 yenza isicelo sithembeke kakhulu?",
        "body": "Cha. Inani elithile lisadinga umthombo othembekile osemthethweni ngemuva kwalo."
      },
      {
        "title": "I-FAQ: Kungani amahlebezi amanani asakazeka kalula kangaka?",
        "body": "Ngoba izinombolo eziqondile zizwakala zicacile futhi zabelana ngisho nalapho umthombo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokuthatha isinyathelo ngesimangalo?",
        "body": "Hlola umthombo, umzila, kanye nesigaba sesibonelelo isimangalo esikhuluma ngaso."
      }
    ]
  },
  "how-to-check-if-an-r700-grant-page-is-real": {
    "title": "Ungabheka kanjani ukuthi ikhasi lesibonelelo sika-R700 liyiqiniso",
    "summary": "Umhlahlandlela wokwethenjwa wabasebenzisi abathola amakhasi ezibonelelo zika-R700 futhi badinga indlela ephephile yokwahlulela ukuthi ikhasi libonisa umzila wangempela osemthethweni noma isimangalo nje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola ukuthi ikhasi lesibonelelo sika-R700 lingokoqobo yini ngokuphatha inani njengelingaqinisekisiwe kuqala, uhlole umzila nomthombo ngokucophelela, futhi ungathembi isimangalo ngenxa nje yokuthi inombolo ibukeka icacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ikhasi lenani lingabukeka likhuthaza uma lisebenzisa inombolo enembile kanye nelebula elifana nesibonelelo. Umbuzo ophephile ngowokuthi ingabe leli khasi ngelingelomzila osemthethweni noma lilingisa kuphela ulimi olusemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ikhasi liyisimangalo kuphela, abasebenzisi bangase bamoshe isikhathi, babelane ngemininingwane endaweni engafanele, noma bakhe okulindelekile kokuthile okungasekelwe ngokusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isimangalo sika-R700 njengesingakaqinisekiswa kuqala.\n2. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n3. Gwema ukwethemba izicelo ezikopishiwe noma izicelo zabahlomuli.\n4. Qhathanisa ikhasi nemikhuba ephephile yokufunda inani.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahlebezi, noma okuthile okuyingozi."
      },
      {
        "title": "Ukucaciswa akubona ubufakazi",
        "body": "Ikhasi lizwakala lithembekile ngoba isimangalo sizwakala sinembile. Yingakho nje abasebenzisi kumele bame kancane futhi bahlole umzila ngokucophelela kunalokho abebengakwenza."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayisekeli izibonelelo ezifunwayo ngaphandle kokuqinisekiswa okusemthethweni. Isiza abasebenzisi ukuhlola ukuphepha kwalokho abakutholile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise ikhasi neziqondiso zomzila osemthethweni, amakhasi amahemuhemu amanani, kanye nemikhuba yokuhlola isibuyekezo ephephile ngaphambi kokulethemba."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-r700-grant-searches-usually-mean\n• /guides/what-r700-eligibility-pages-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kulula ukulethemba ikhasi lika-R700 ngokushesha okukhulu?",
        "body": "Ngoba inani eliqondile lingazwakala lisemthethweni kakhulu kunalokho eliyikho ngempela."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphandle kwenani?",
        "body": "Hlola umzila, umthombo, kanye nokuthi ikhasi ngokusobala lingelenqubo esemthethweni."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngifake imininingwane ukuze ngiyihlole?",
        "body": "Cha. Qinisekisa umzila kuqala."
      }
    ]
  },
  "is-the-r700-grant-real": {
    "title": "Ingabe isibonelelo sika-R700 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zesibonelelo sikahulumeni sika-R700, noma ngabe isibonelelo sikahulumeni singokoqobo, kanye nendlela yokugwema amakhasi angaphephile akhiwe eduze kwenombolo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zesibonelelo sika-R700 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi isibonelelo singokoqobo kuphela ngoba inani lizwakala likhethekile noma ikhasi libukeka lijwayelekile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kwezibonelelo zika-R700 kuvela kubasebenzisi abazama ukuqinisekisa isimangalo, hhayi emzileni ozinzile osemthethweni wesibonelelo. Umkhuba wokufunda ophephile ukuphatha inani njengamahemuhemu kuqala, bese uhlola ukuthi umzila osemthethweni, isibuyekezo esisemthethweni, noma isigaba sangempela sesibonelelo sisekela ngokusobala yini."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi angama-R700 angadala ithemba elingamanga, afake abasebenzisi izicelo zomgunyathi, noma akhuthaze abantu ukuthi babelane ngemininingwane yemizila engaphephile. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi behlise ijubane ngaphambi kokuthi bathembe isimangalo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isimangalo sika-R700 njengesingakaqinisekiswa kuqala.\n2. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n3. Gwema ukwethemba izicelo ezikopishiwe, izimangalo zomhlomuli, noma ukufaneleka ngokwabo.\n4. Qhathanisa ikhasi namanani amanje esibonelelo sikahulumeni kanye nesigaba esifanele sesibonelelo.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Inombolo iyihhuku, hhayi ubufakazi",
        "body": "Inani elithile lingazwakala linegunya, kodwa amagama aqondile kulula ukuwakopisha. Ukuhlola kwangempela ukuthi ingabe umzila, umthombo, nesigaba sesibonelelo sisemthethweni ngokusobala futhi esamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, amanani asemthethweni, nezicelo ezisemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zika-R700 namanani amanje esibonelelo sikahulumeni, imikhuba ephephile yokufunda amakhasi, kanye neziqondiso zomzila osemthethweni ukuze ungaphutheli amahemuhemu ngesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r700-grant-searches-usually-mean\n• /guides/how-to-check-if-an-r700-grant-page-is-real\n• /guides/what-r700-eligibility-pages-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe inani elithile lenza isimangalo sika-R700 sikholweke nakakhulu?",
        "body": "Cha. Inani elithile lisadinga umthombo othembekile osemthethweni ngemuva kwalo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngifake isicelo uma ikhasi lithi izicelo zivuliwe?",
        "body": "Hhayi kuze kube yilapho uqinisekisa ukuthi umzila usemthethweni futhi isibonelelo ngokwaso singokoqobo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise nekhasi kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, isiqondiso somzila osemthethweni, kanye nesigaba sangempela sesibonelelo esithi siyasifanisa."
      }
    ]
  },
  "is-the-youth-grant-real": {
    "title": "Ingabe isibonelelo sentsha singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezimangalo zesibonelelo sentsha, noma ngabe isibonelelo singokoqobo, kanye nendlela yokugwema amakhasi ezicelo angaphephile akhiwe azungeze ilebula.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zezibonelelo zentsha njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi uxhaso lungokoqobo kuphela ngoba ikhasi linikeza isicelo, uhlu lokufaneleka, noma isithembiso esiphuthumayo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho oluningi lwezibonelelo zentsha luvela kubasebenzisi abasabela kokuthunyelwe komphakathi, izixhumanisi ezikopishiwe, noma amakhasi asebenzisa ulimi olujwayelekile lwesibonelelo ngaphandle kokufakazela ukuthi umzila wangempela osemthethweni wokunikeza intsha ukhona. Umkhuba ophephile uwukuqinisekisa kuqala isibonelelo bese ucabanga ngezicelo kuphela ngemva kwalokho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi esibonelelo sentsha angamosha isikhathi, adale ithemba elingamanga, noma acindezele abasebenzisi kumafomu angaphephile nemizila mbumbulu. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi bame ngaphambi kokuthi bazibophezele esimangalweni esingazuzanga ukwethenjwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sesibonelelo sentsha njengesingakaqinisekiswa kuqala.\n2. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni ocacile.\n3. Ungaphathi ifomu lesicelo noma uhlu lokufaneleka njengobufakazi ngokwalo.\n4. Qhathanisa isimangalo nezigaba zamanje zesibonelelo sangempela kanye nesihloli sokufaneleka.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Isixhumanisi sesicelo asibona ubufakazi bokuthi isibonelelo singokoqobo",
        "body": "Amakhasi amaningi adukisayo azama ukuhambisa abasebenzisi ngqo ekufakeni isicelo. Ukuhleleka okuphephile kuphambene: qinisekisa ukuthi isibonelelo ngokwaso singokoqobo, bese ukhathazeka ngokuthi ubani ofaneleka nokuthi usifaka kuphi isicelo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, izicelo ezisemthethweni, nokufaneleka okusemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zesibonelelo sentsha nezigaba zesibonelelo sangempela, imikhuba ephephile yokufunda amakhasi, kanye nesiqondiso somzila osemthethweni ukuze ungaphazami amahlebezi ngomzila wosekelo wangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /eligibility-checker\n• /claim-checker\n• /grants\n• /guides/how-to-know-which-grant-application-fits-you\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi lesicelo liyakufakazela ukuthi isibonelelo sikahulumeni sentsha singokoqobo?",
        "body": "Cha. Ikhasi linganikeza isicelo ngaphandle kokuqinisekisa ukuthi isibonelelo ngokwaso sisekelwa ngokusemthethweni."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqinisekise ngaphambi kokuthi ngicabange ngokufaneleka?",
        "body": "Qinisekisa ukuthi isibonelelo ngokwaso singokoqobo nokuthi umzila usemthethweni yini kuqala."
      },
      {
        "title": "I-FAQ: Kufanele ngiqhathanise kuphi isimangalo nezinketho zangempela?",
        "body": "Qhathanisa nesihloli sokufaneleka, ilabhulali yesibonelelo, kanye neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "is-the-r1400-grant-real": {
    "title": "Ingabe isibonelelo sika-R1400 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zezibonelelo zesibonelelo sika-R1400, izikhala zohlu lwabahlomulayo, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zesibonelelo sika-R1400 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi imali yesibonelelo ingokoqobo ngoba ikhasi likhuluma ngabahlomulayo, izinkokhelo, noma inani elithile lanyanga zonke."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kuka-R1400 kuvela kubasebenzisi abazama ukuqinisekisa isimangalo esabiwe, hhayi emzileni ozinzile osemthethweni wesibonelelo. Umkhuba wokufunda ophephe kakhulu ukuphatha inani kanye nanoma yiluphi ulimi lohlu lwabahlomulayo njengamahemuhemu kuqala, bese uhlola ukuthi umzila wangempela osemthethweni uyawasekela ngokusobala yini."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi angu-R1400 angakha ithemba elingamanga, afake ukuchofoza ohlwini lwabahlomula mbumbulu, noma acindezele abasebenzisi ukuthi babelane ngemininingwane emakhasini angaphephile. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi behlise ijubane ngaphambi kokuthi bathembe indaba."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sika-R1400 njengesingakaqinisekiswa.\n2. Ungaphathi uhlu lwabahlomulayo noma iposi lokukhokha njengobufakazi ngokwalo.\n3. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n4. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zamanje zesibonelelo sangempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Ulimi lwabahlomuli luvame ukuba yingxenye yehhuku",
        "body": "Amakhasi akhuluma ngabahlomuli noma uhlu lwanyanga zonke angazwakala njengokuphatha futhi ngenxa yalokho athembekile. Ukuhlola okungcono kakhulu kusewukuthi umzila, umthombo, kanye nesigaba sesibonelelo sisemthethweni ngokusobala futhi esamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, ulwazi olusemthethweni lwabahlomuli, kanye nezicelo ezisemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zika-R1400 namanani amanje esibonelelo sikahulumeni, imikhuba ephephile yokufunda amakhasi, kanye neziqondiso zomzila osemthethweni ukuze ungaphutheli amahemuhemu endlela yokuhlomula ngesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r1400-beneficiary-list-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe uhlu lwabahlomulayo lufakazela ukuthi isibonelelo sika-R1400 singokoqobo?",
        "body": "Cha. Uhlu lwabahlomulayo noma okuthunyelwe kwendlela yokukhokha kusadinga umthombo othembekile osemthethweni ngemuva kwakho."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani amakhasi angu-R1400 kulula ukuwethemba ngokushesha?",
        "body": "Ngoba inani elithile kanye namagama omhlomuli angenza isimangalo sizwakale sisemthethweni kunalokho esiyikho ngempela."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, izigaba zesibonelelo sangempela, neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "is-the-r2090-grant-real": {
    "title": "Ingabe isibonelelo sika-R2090 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zezibonelelo zesibonelelo sika-R2090, izithembiso zosuku lokukhokha, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zesibonelelo sika-R2090 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi imali yesibonelelo ingokoqobo ngoba ikhasi lihlanganisa inani nezinsuku zokukhokha noma amagama okufaneleka."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kuka-R2090 kuvela kubasebenzisi abazama ukuqinisekisa isimangalo, hhayi emzileni ozinzile osemthethweni wesibonelelo. Umkhuba wokufunda ophephile ukuphatha inani, ulimi lwedethi yokukhokha, nolimi lokufaneleka njengamahemuhemu kuqala, bese uhlola ukuthi umzila wangempela osemthethweni uyawusekela ngokusobala yini."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi angu-R2090 angamosha isikhathi, enze okulindelwe okungamanga mayelana nezinkokhelo, noma adonsele abasebenzisi emizileni engaphephile elingisa amakhasi ezibonelelo ezisemthethweni. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi bayeke ngaphambi kokuthi bathembe isimangalo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sika-R2090 njengesingakaqinisekiswa.\n2. Ungathathi izinsuku zokukhokha noma amagama okufaneleka njengobufakazi ngokwabo.\n3. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n4. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zamanje zesibonelelo sangempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Amagama osuku lokukhokha angenza isimangalo esingumgunyathi sizizwe sisemthethweni",
        "body": "Ikhasi elihlanganisa inani elithile nezinsuku zokukhokha noma ukufaneleka lingase lizizwe lilawula futhi linokwethenjelwa. Ukuhlola okuphephile kusese ukuthi umzila, umthombo, nesigaba sesibonelelo sisemthethweni ngokusobala futhi esamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, izinsuku zokukhokha ezisemthethweni, nokufaneleka okusemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zika-R2090 namanani amanje esibonelelo sikahulumeni, imikhuba ephephile yokufunda amakhasi, kanye neziqondiso zomzila osemthethweni ukuze ungaphutheli amahemuhemu endlela yokukhokha ngesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r2090-grant-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe izinsuku zokukhokha zifakazela ukuthi isibonelelo sika-R2090 singokoqobo?",
        "body": "Cha. Idethi yokukhokha efunwayo isadinga umzila osemthethweni othembekile kanye nesigaba sangempela sesibonelelo esingemuva kwayo."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani u-R2090 evame ukuxutshwa nezithembiso zokufaneleka noma zokukhokha?",
        "body": "Ngoba leyo mininingwane eyengeziwe yenza isimangalo sizizwe sisemthethweni ngisho nalapho umthombo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise nekhasi kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, izigaba zesibonelelo sangempela, neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "is-the-senior-grant-bonus-real": {
    "title": "Ingabe ibhonasi yesibonelelo sikahulumeni esiphezulu ingokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezimangalo zebhonasi yesibonelelo sikahulumeni, okuthunyelwe kwenkokhelo yebhonasi, kanye nokuthi inkokhelo eyengeziwe efunwayo iyiqiniso yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izimangalo zebhonasi yesibonelelo sikahulumeni njengezingaqinisekisiwe ngaphandle kwalapho umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi isimangalo singokoqobo ngoba sisebenzisa abantu abadala, impesheni, noma amagama ebhonasi azwakala ajwayelekile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kwebhonasi yesibonelelo sikahulumeni kuvela kubasebenzisi abasabela kokuthunyelwe okwabiwe, izihloko zezindaba ezikopishiwe, noma amakhasi axuba ulimi olunikeza abantu abadala bangempela nesimangalo senkokhelo eyengeziwe esingaqinisekisiwe. Umkhuba ophephile ukuhlukanisa isibonelelo sangempela kwibhonasi efunwayo futhi uqinisekise ibhonasi ngokwakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi ebhonasi yezibonelelo eziphezulu angadala ithemba elingamanga, asunduzele abasebenzisi ekubuyekezeni okungaphephile noma ezixhumanisini zokukhokha, noma enze ikhasi elivamile lesibonelelo sabantu abadala libukeke njengobufakazi benkokhelo eyengeziwe. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi bayeke ngaphambi kokuthi bathembe isimangalo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isimangalo sebhonasi yesibonelelo sikahulumeni njengengaqinisekisiwe kuqala.\n2. Hlukanisa isibonelelo sangempela sabantu abadala enkokhelweni yebhonasi efunwayo.\n3. Ungathathi izinsuku zokukhokha okwabelwana ngazo, izithombe-skrini, noma amagama abahlomuli njengobufakazi ngokwabo.\n4. Qhathanisa isimangalo namanani amanje ezibonelelo kanye nekhasi langempela lesibonelelo sabantu abadala.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Ulimi lwangempela lwesibonelelo lungasetshenziswa ukugqoka isimangalo sebhonasi mbumbulu",
        "body": "Ikhasi lingazwakala lingakholakala uma liboleka amagama ajwayelekile njengempesheni, imali yokuguga, noma isibonelelo sikahulumeni sabantu abadala. Ukuhlola okuphephile ukuthi ingabe ibhonasi efunwayo inokwesekwa kwayo okusemthethweni okucacile esikhundleni sokuboleka ukwethenjwa kwisibonelelo sangempela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zebhonasi ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, amanani asemthethweni, nezibuyekezo zokukhokha ezisemthethweni kusengezaziteshi ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqhathanise izimangalo zebhonasi yesibonelelo sikahulumeni namanani amanje esibonelelo sikahulumeni, umzila wangempela wesibonelelo sabantu abadala, kanye nemikhuba ephephile yokuhlola ukubuyekezwa ukuze ungaphutheli amahlebezi ngenkokhelo eyengeziwe yangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /grants/older-persons\n• /guides/how-to-check-old-age-grant-increase-rumours-safely\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Ingabe abantu abadala banikeza amagama afakazela ukuthi ibhonasi ingokoqobo?",
        "body": "Cha. Amagama ajwayelekile esibonelelo sikahulumeni asengasetshenziswa ngaphakathi kwesimangalo sebhonasi esingaqinisekisiwe."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe okuthunyelwe okubonisa izinsuku zokukhokha noma imininingwane yabahlomuli?",
        "body": "Cha. Leyo mininingwane isadinga umthombo othembekile osemthethweni ngemuva kwesimangalo sebhonasi ngokwaso."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, ikhasi langempela lesibonelelo sabantu abadala, kanye nesiqondiso sokubuyekeza okusemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "what-r700-eligibility-pages-usually-mean": {
    "title": "Lokho amakhasi okufaneleka angu-R700 ngokuvamile akushoyo",
    "summary": "Umhlahlandlela ozothile wokusesha ukufaneleka kuka-R700 nokuthi kungani abasebenzisi kufanele bawaphathe njengezimangalo zokuqinisekisa kunokuba njengobufakazi besibonelelo sangempela esisemthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Amakhasi okufaneleka angu-R700 ngokuvamile asho ukuthi abasebenzisi bazama ukuhlola ukuthi isibonelelo esifunwayo singokoqobo yini nokuthi singafaka isicelo kubani. Isinyathelo esiphephe kakhulu siwukuqinisekisa ukuthi isibonelelo sikahulumeni ngokwaso sisemthethweni ngaphambi kokukhathazeka ngokufaneleka."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi bagxumela ngqo ekufanelekeni ngoba inani lizwakala likhanga. Ukuhleleka okucophelelayo kuphambene: qinisekisa ukuthi isibonelelo esifunwayo sikhona ngokusemthethweni, bese ucabanga ukuthi ngesabani."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma isibonelelo ngokwaso singaqinisekisiwe, imibuzo yokufaneleka ingadonsela abasebenzisi bajule esimangalweni esingakazuzi ukwethenjwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi isibonelelo esifunwayo sisekelwa umzila osemthethweni ocacile.\n2. Gwema ukuphatha izinhlu zokufaneleka njengobufakazi ngokwabo.\n3. Qaphela amakhasi asebenzisa ukuphuthuma noma izithembiso.\n4. Qhathanisa ikhasi nemikhuba ephephile yokufunda inani.\n5. Sebenzisa i-GrantCare ukuze uhlehle futhi wahlulele isimangalo ngaphambi kokuba wenze okuthile ngakho."
      },
      {
        "title": "Ukufaneleka kubaluleke kuphela ngemva kokuba isibonelelo sikahulumeni singokoqobo",
        "body": "Iphutha elivamile ukuhamba ngokushesha kakhulu kokuthi ubani ofaneleka ngaphambi kokuqinisekisa lokho okuyiqiniso. Lowo myalelo wenza abasebenzisi babe sengcupheni enkulu yamakhasi edukisayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayithembisi ukufaneleka noma ivumele izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe. Isiza abasebenzisi ukuthi bacabange ngokucophelela ngaphambi kokuthi bazibophezele emzileni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlukanise isiqondiso sokufaneleka sangempela emakhasini okufaka isicelo asebenzisa ulimi lokufaneleka ngaphandle kwesibonelelo esithembekile ngemuva kwakho."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-r700-grant-searches-usually-mean\n• /guides/how-to-check-if-an-r700-grant-page-is-real\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /eligibility-checker\n• /guides/how-to-know-if-a-sassa-website-is-official"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiqinisekise isibonelelo kuqala?",
        "body": "Ngoba ukufaneleka kubaluleke kuphela uma isibonelelo ngokwaso singokoqobo futhi sisekelwa ngokusemthethweni."
      },
      {
        "title": "I-FAQ: Ingabe uhlu lokufaneleka lusengadukisa?",
        "body": "Yebo. Kungazwakala kuwusizo ngenkathi kusakhiwa eduze kwesimangalo esingaqinisekisiwe."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngaphambi kokuthi ngithembe ikhasi?",
        "body": "Hlola ukuthi umzila nomthombo uyasisekela ngokusobala isimangalo."
      }
    ]
  },
  "what-r1400-beneficiary-list-searches-usually-mean": {
    "title": "Lokho okuvame ukusho ukusesha kohlu lwabahlomulayo ngo-R1400",
    "summary": "Umhlahlandlela wolimi olulula lokuseshwa kohlu lwabahlomulayo luka-R1400 nokuthi kungani abasebenzisi kufanele baphathe amanani esibonelelo sikahulumeni njengokuthile okufanele kuqinisekiswe, hhayi njengobufakazi obusheshayo besibonelelo sikahulumeni sangempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kohlu lwabahlomulayo kuka-R1400 ngokuvamile kusho ukuthi abasebenzisi bazama ukuqinisekisa ukuthi inani lemali yesibonelelo esifunwayo noma indaba yokukhokha ingokoqobo. Isinyathelo esiphephe kunazo zonke siwukuthatha isimangalo njengesingaqinisekisiwe kuze kube yilapho umthombo osemthethweni usisekela ngokucacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amanani ezibonelelo ezifunwayo angasabalala ngokushesha kakhulu ngoba abukeka elula futhi eqondile. Lokho kunemba kubenza bazizwe bethembekile, kodwa inani elijwayelekile lilodwa alibonisi ukuthi isimangalo sibonisa isibonelelo sangempela esisemthethweni noma isibuyekezo senkokhelo esisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Izimangalo zenani elingamanga zivame ukudala ukuphuthuma, ithemba elingamanga, noma ingcindezi yokuchofoza ngokushesha. Abasebenzisi abama kancane ukuze baqinisekise umthombo mancane kakhulu amathuba okuba balandele umzila mbumbulu noma bathembe okuthunyelwe okudukisayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha inani elifunwayo njengelingaqinisekisiwe ekuqaleni.\n2. Hlola ukuthi isimangalo sivela kusibuyekezo esisemthethweni esicacile.\n3. Gwema ukwethemba uhlu lwabahlomuli, okuthunyelwe okuphuthumayo, noma izixhumanisi zezicelo ezikopishiwe ngokwazo.\n4. Qhathanisa isimangalo nohlobo lwesibonelelo noma umzila wokusekela okuthiwa ufana nawo.\n5. Sebenzisa i-GrantCare ukuze uqonde isimangalo ngokuphepha ngaphambi kokuthi uthathe isinyathelo ngaso."
      },
      {
        "title": "Inani elithile lingase libe isignali ebuthakathaka",
        "body": "Abantu bavame ukwethemba isimangalo ngoba sizwakala sinembile. Umbuzo ongcono awukona ukuthi inani liqondile kangakanani. Umbuzo ongcono ngowokuthi ingabe umzila, umthombo, kanye nesigaba sesibonelelo siyahambisana nakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele neze kwenziwe iphutha njengomthombo osemthethweni wokudala isibonelelo, ukugunyazwa, noma ukuqinisekiswa kwenani. Amanani ezibonelelo ezisemthethweni nokufaneleka kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amanani afunwayo nesiqondiso somzila osemthethweni, amakhasi okufaneleka, nemikhuba yokuhlola ephephile ukuze ungaphazamisi amahlebezi ngomnikelo wangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe uhlu lwabahlomulayo lwenani elingu-R1400 lenza isimangalo sithembeke kakhudlwana?",
        "body": "Cha. Inani elithile lisadinga umthombo othembekile osemthethweni ngemuva kwalo."
      },
      {
        "title": "I-FAQ: Kungani amahlebezi amanani asakazeka kalula kangaka?",
        "body": "Ngoba izinombolo eziqondile zizwakala zicacile futhi zabelana ngisho nalapho umthombo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokuthatha isinyathelo ngesimangalo?",
        "body": "Hlola umthombo, umzila, kanye nesigaba sesibonelelo isimangalo esikhuluma ngaso."
      }
    ]
  },
  "what-r1370-grant-searches-usually-mean": {
    "title": "Okushiwo ukusesha kwesibonelelo sika-R1370 kuvame ukusho",
    "summary": "Umhlahlandlela wolimi olulula lokuseshwa kwesibonelelo sikahulumeni sika-R1370 nokuthi kungani abasebenzisi kufanele baphathe amanani esibonelelo sikahulumeni njengokuthile okufanele kuqinisekiswe, hhayi njengobufakazi obusheshayo besibonelelo sikahulumeni sangempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kwesibonelelo sika-R1370 ngokuvamile kusho ukuthi abasebenzisi bazama ukuqinisekisa ukuthi inani lemali yesibonelelo esifunwayo noma indaba yokukhokha ingeyangempela. Isinyathelo esiphephe kunazo zonke siwukuthatha isimangalo njengesingaqinisekisiwe kuze kube yilapho umthombo osemthethweni usisekela ngokucacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amanani ezibonelelo ezifunwayo angasabalala ngokushesha kakhulu ngoba abukeka elula futhi eqondile. Lokho kunemba kubenza bazizwe bethembekile, kodwa inani elijwayelekile lilodwa alibonisi ukuthi isimangalo sibonisa isibonelelo sangempela esisemthethweni noma isibuyekezo senkokhelo esisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Izimangalo zenani elingamanga zivame ukudala ukuphuthuma, ithemba elingamanga, noma ingcindezi yokuchofoza ngokushesha. Abasebenzisi abama kancane ukuze baqinisekise umthombo mancane kakhulu amathuba okuba balandele umzila mbumbulu noma bathembe okuthunyelwe okudukisayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha inani elifunwayo njengelingaqinisekisiwe ekuqaleni.\n2. Hlola ukuthi isimangalo sivela kusibuyekezo esisemthethweni esicacile.\n3. Gwema ukwethemba uhlu lwabahlomuli, okuthunyelwe okuphuthumayo, noma izixhumanisi zezicelo ezikopishiwe ngokwazo.\n4. Qhathanisa isimangalo nohlobo lwesibonelelo noma umzila wokusekela okuthiwa ufana nawo.\n5. Sebenzisa i-GrantCare ukuze uqonde isimangalo ngokuphepha ngaphambi kokuthi uthathe isinyathelo ngaso."
      },
      {
        "title": "Inani elithile lingase libe isignali ebuthakathaka",
        "body": "Abantu bavame ukwethemba isimangalo ngoba sizwakala sinembile. Umbuzo ongcono awukona ukuthi inani liqondile kangakanani. Umbuzo ongcono ngowokuthi ingabe umzila, umthombo, kanye nesigaba sesibonelelo siyahambisana nakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele neze kwenziwe iphutha njengomthombo osemthethweni wokudala isibonelelo, ukugunyazwa, noma ukuqinisekiswa kwenani. Amanani ezibonelelo ezisemthethweni nokufaneleka kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amanani afunwayo nesiqondiso somzila osemthethweni, amakhasi okufaneleka, nemikhuba yokuhlola ephephile ukuze ungaphazamisi amahlebezi ngomnikelo wangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe imali yesibonelelo sika-R1370 yenza isicelo sithembeke kakhulu?",
        "body": "Cha. Inani elithile lisadinga umthombo othembekile osemthethweni ngemuva kwalo."
      },
      {
        "title": "I-FAQ: Kungani amahlebezi amanani asakazeka kalula kangaka?",
        "body": "Ngoba izinombolo eziqondile zizwakala zicacile futhi zabelana ngisho nalapho umthombo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokuthatha isinyathelo ngesimangalo?",
        "body": "Hlola umthombo, umzila, kanye nesigaba sesibonelelo isimangalo esikhuluma ngaso."
      }
    ]
  },
  "what-r2090-grant-searches-usually-mean": {
    "title": "Okushiwo ukusesha kwesibonelelo sika-R2090 kuvame ukusho",
    "summary": "Umhlahlandlela wolimi olulula osesho lwezibonelelo zika-R2090 nokuthi kungani abasebenzisi kufanele baphathe amanani esibonelelo sikahulumeni njengento okufanele iqinisekiswe, hhayi njengobufakazi obusheshayo besibonelelo sikahulumeni sangempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kwesibonelelo sika-R2090 ngokuvamile kusho ukuthi abasebenzisi bazama ukuqinisekisa ukuthi inani lemali yesibonelelo esifunwayo noma indaba yokukhokha ingeyangempela. Isinyathelo esiphephe kunazo zonke siwukuthatha isimangalo njengesingaqinisekisiwe kuze kube yilapho umthombo osemthethweni usisekela ngokucacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amanani ezibonelelo ezifunwayo angasabalala ngokushesha kakhulu ngoba abukeka elula futhi eqondile. Lokho kunemba kubenza bazizwe bethembekile, kodwa inani elijwayelekile lilodwa alibonisi ukuthi isimangalo sibonisa isibonelelo sangempela esisemthethweni noma isibuyekezo senkokhelo esisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Izimangalo zenani elingamanga zivame ukudala ukuphuthuma, ithemba elingamanga, noma ingcindezi yokuchofoza ngokushesha. Abasebenzisi abama kancane ukuze baqinisekise umthombo mancane kakhulu amathuba okuba balandele umzila mbumbulu noma bathembe okuthunyelwe okudukisayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha inani elifunwayo njengelingaqinisekisiwe ekuqaleni.\n2. Hlola ukuthi isimangalo sivela kusibuyekezo esisemthethweni esicacile.\n3. Gwema ukwethemba uhlu lwabahlomuli, okuthunyelwe okuphuthumayo, noma izixhumanisi zezicelo ezikopishiwe ngokwazo.\n4. Qhathanisa isimangalo nohlobo lwesibonelelo noma umzila wokusekela okuthiwa ufana nawo.\n5. Sebenzisa i-GrantCare ukuze uqonde isimangalo ngokuphepha ngaphambi kokuthi uthathe isinyathelo ngaso."
      },
      {
        "title": "Inani elithile lingase libe isignali ebuthakathaka",
        "body": "Abantu bavame ukwethemba isimangalo ngoba sizwakala sinembile. Umbuzo ongcono awukona ukuthi inani liqondile kangakanani. Umbuzo ongcono ngowokuthi ingabe umzila, umthombo, kanye nesigaba sesibonelelo siyahambisana nakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele neze kwenziwe iphutha njengomthombo osemthethweni wokudala isibonelelo, ukugunyazwa, noma ukuqinisekiswa kwenani. Amanani ezibonelelo ezisemthethweni nokufaneleka kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amanani afunwayo nesiqondiso somzila osemthethweni, amakhasi okufaneleka, nemikhuba yokuhlola ephephile ukuze ungaphazamisi amahlebezi ngomnikelo wangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe imali yesibonelelo sika-R2090 yenza isicelo sithembeke kakhulu?",
        "body": "Cha. Inani elithile lisadinga umthombo othembekile osemthethweni ngemuva kwalo."
      },
      {
        "title": "I-FAQ: Kungani amahlebezi amanani asakazeka kalula kangaka?",
        "body": "Ngoba izinombolo eziqondile zizwakala zicacile futhi zabelana ngisho nalapho umthombo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokuthatha isinyathelo ngesimangalo?",
        "body": "Hlola umthombo, umzila, kanye nesigaba sesibonelelo isimangalo esikhuluma ngaso."
      }
    ]
  },
  "what-r3070-grant-searches-usually-mean": {
    "title": "Okushiwo ukusesha kwesibonelelo sika-R3070 kuvame ukusho",
    "summary": "Umhlahlandlela wolimi olulula lokuseshwa kwesibonelelo sikahulumeni sika-R3070 nokuthi kungani abasebenzisi kufanele baphathe amanani esibonelelo sikahulumeni njengokuthile okufanele kuqinisekiswe, hhayi njengobufakazi obusheshayo besibonelelo sikahulumeni sangempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kwesibonelelo sika-R3070 ngokuvamile kusho ukuthi abasebenzisi bazama ukuqinisekisa ukuthi inani lemali yesibonelelo esifunwayo noma indaba yokukhokha ingeyangempela. Isinyathelo esiphephe kunazo zonke siwukuthatha isimangalo njengesingaqinisekisiwe kuze kube yilapho umthombo osemthethweni usisekela ngokucacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amanani ezibonelelo ezifunwayo angasabalala ngokushesha kakhulu ngoba abukeka elula futhi eqondile. Lokho kunemba kubenza bazizwe bethembekile, kodwa inani elijwayelekile lilodwa alibonisi ukuthi isimangalo sibonisa isibonelelo sangempela esisemthethweni noma isibuyekezo senkokhelo esisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Izimangalo zenani elingamanga zivame ukudala ukuphuthuma, ithemba elingamanga, noma ingcindezi yokuchofoza ngokushesha. Abasebenzisi abama kancane ukuze baqinisekise umthombo mancane kakhulu amathuba okuba balandele umzila mbumbulu noma bathembe okuthunyelwe okudukisayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha inani elifunwayo njengelingaqinisekisiwe ekuqaleni.\n2. Hlola ukuthi isimangalo sivela kusibuyekezo esisemthethweni esicacile.\n3. Gwema ukwethemba uhlu lwabahlomuli, okuthunyelwe okuphuthumayo, noma izixhumanisi zezicelo ezikopishiwe ngokwazo.\n4. Qhathanisa isimangalo nohlobo lwesibonelelo noma umzila wokusekela okuthiwa ufana nawo.\n5. Sebenzisa i-GrantCare ukuze uqonde isimangalo ngokuphepha ngaphambi kokuthi uthathe isinyathelo ngaso."
      },
      {
        "title": "Inani elithile lingase libe isignali ebuthakathaka",
        "body": "Abantu bavame ukwethemba isimangalo ngoba sizwakala sinembile. Umbuzo ongcono awukona ukuthi inani liqondile kangakanani. Umbuzo ongcono ngowokuthi ingabe umzila, umthombo, kanye nesigaba sesibonelelo siyahambisana nakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele neze kwenziwe iphutha njengomthombo osemthethweni wokudala isibonelelo, ukugunyazwa, noma ukuqinisekiswa kwenani. Amanani ezibonelelo ezisemthethweni nokufaneleka kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amanani afunwayo nesiqondiso somzila osemthethweni, amakhasi okufaneleka, nemikhuba yokuhlola ephephile ukuze ungaphazamisi amahlebezi ngomnikelo wangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe imali yesibonelelo sika-R3070 yenza isicelo sithembeke kakhulu?",
        "body": "Cha. Inani elithile lisadinga umthombo othembekile osemthethweni ngemuva kwalo."
      },
      {
        "title": "I-FAQ: Kungani amahlebezi amanani asakazeka kalula kangaka?",
        "body": "Ngoba izinombolo eziqondile zizwakala zicacile futhi zabelana ngisho nalapho umthombo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokuthatha isinyathelo ngesimangalo?",
        "body": "Hlola umthombo, umzila, kanye nesigaba sesibonelelo isimangalo esikhuluma ngaso."
      }
    ]
  },
  "how-to-avoid-fake-grant-amount-pages": {
    "title": "Ungawagwema kanjani amakhasi enani lemali yesibonelelo sikahulumeni",
    "summary": "Umhlahlandlela osebenzayo wokugwema amakhasi amanani omgunyathi noma adukisayo asebenzisa izinombolo ezithile ukuze ahehe ukuchofoza nokwethenjwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Gwema amakhasi enani lemali yesibonelelo sikahulumeni mbumbulu ngokubheka umzila, umthombo, nesigaba sesibonelelo esikhundleni sokuthemba inani noma isihloko sodwa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi enani elingelona iqiniso avame ukuncika kufomula elula: inombolo eyodwa ncamashi, isithembiso esiphuthumayo, kanye nomongo omncane kakhulu. Abasebenzisi abayaziyo leyo phethini kunzima kakhulu ukudukisa."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ikhasi lenani elingumgunyathi lingaphushela abasebenzisi kuzixhumanisi ezingaphephile, amafomu akopishiwe, noma okulindelwe okungenangqondo mayelana nemali nokufaneleka."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qaphela amakhasi akhiwe azungeze inombolo eyodwa ngqo.\n2. Hlola ukuthi ikhasi liyasichaza kahle yini isigaba sesibonelelo.\n3. Bheka ukuthi umthombo ucacile futhi usemthethweni.\n4. Gwema ukwabelana ngemininingwane emizileni engacacile.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisimangalo kuphela."
      },
      {
        "title": "Inombolo ivame ukuba yihhuku, hhayi ubufakazi",
        "body": "Amakhasi amaningi adukisayo asebenza ngokwenza inombolo yenze konke okukholisayo. Umkhuba ophephile ukususa ukunaka kwakho kude nenombolo bese ubuyela emzileni nomthombo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiwashicileli amanani omgunyathi noma iphathe amahlebezi njengezimemezelo ezisemthethweni zikahulumeni. Ihlala endimeni yokuqondisa."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa amakhasi enani neziqondiso zomzila osemthethweni, amathuluzi okufaneleka, nemikhuba yokuhlola isibuyekezo ephephile ngaphambi kokuthi bathembe abakutholile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /claim-checker\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/what-r700-grant-searches-usually-mean\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani amakhasi enani lomgunyathi esebenza kangaka?",
        "body": "Ngoba izinombolo eziqondile ziheha ukunaka futhi zizwakala zilula kunencazelo ecophelelayo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphandle kwenombolo?",
        "body": "Hlola umzila, isigaba sesibonelelo, kanye nomthombo."
      },
      {
        "title": "I-FAQ: Kuthiwani uma ikhasi lizwakala liyaphuthuma?",
        "body": "Phatha ukuphuthuma njengesizathu sokwehlisa ijubane futhi uqinisekise ngokucophelela."
      }
    ]
  },
  "what-srd-grant-amount-searches-usually-mean": {
    "title": "Lokho okuvamise ukusho ukusesha kwenani lesibonelelo se-SRD",
    "summary": "Umhlahlandlela wolimi olulula wokusesha inani lesibonelelo se-SRD nokuthi kungani abasebenzisi kufanele baphathe amanani esibonelelo sikahulumeni njengokuthile okufanele kuqinisekiswe, hhayi njengobufakazi obusheshayo besibonelelo sikahulumeni sangempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kwenani lesibonelelo se-SRD ngokuvamile kusho ukuthi abasebenzisi bazama ukuqinisekisa ukuthi inani lesibonelelo esifunwayo noma indaba yokukhokha ingokoqobo. Isinyathelo esiphephe kunazo zonke siwukuthatha isimangalo njengesingaqinisekisiwe kuze kube yilapho umthombo osemthethweni usisekela ngokucacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amanani ezibonelelo ezifunwayo angasabalala ngokushesha kakhulu ngoba abukeka elula futhi eqondile. Lokho kunemba kubenza bazizwe bethembekile, kodwa inani elijwayelekile lilodwa alibonisi ukuthi isimangalo sibonisa isibonelelo sangempela esisemthethweni noma isibuyekezo senkokhelo esisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Izimangalo zenani elingamanga zivame ukudala ukuphuthuma, ithemba elingamanga, noma ingcindezi yokuchofoza ngokushesha. Abasebenzisi abama kancane ukuze baqinisekise umthombo mancane kakhulu amathuba okuba balandele umzila mbumbulu noma bathembe okuthunyelwe okudukisayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha inani elifunwayo njengelingaqinisekisiwe ekuqaleni.\n2. Hlola ukuthi isimangalo sivela kusibuyekezo esisemthethweni esicacile.\n3. Gwema ukwethemba uhlu lwabahlomuli, okuthunyelwe okuphuthumayo, noma izixhumanisi zezicelo ezikopishiwe ngokwazo.\n4. Qhathanisa isimangalo nohlobo lwesibonelelo noma umzila wokusekela okuthiwa ufana nawo.\n5. Sebenzisa i-GrantCare ukuze uqonde isimangalo ngokuphepha ngaphambi kokuthi uthathe isinyathelo ngaso."
      },
      {
        "title": "Inani elithile lingase libe isignali ebuthakathaka",
        "body": "Abantu bavame ukwethemba isimangalo ngoba sizwakala sinembile. Umbuzo ongcono awukona ukuthi inani liqondile kangakanani. Umbuzo ongcono ngowokuthi ingabe umzila, umthombo, kanye nesigaba sesibonelelo siyahambisana nakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele neze kwenziwe iphutha njengomthombo osemthethweni wokudala isibonelelo, ukugunyazwa, noma ukuqinisekiswa kwenani. Amanani ezibonelelo ezisemthethweni nokufaneleka kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amanani afunwayo nesiqondiso somzila osemthethweni, amakhasi okufaneleka, nemikhuba yokuhlola ephephile ukuze ungaphazamisi amahlebezi ngomnikelo wangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-read-grant-amount-pages-safely\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Ingabe inani lemali lesibonelelo le-SRD lenza isimangalo sithembeke kakhudlwana?",
        "body": "Cha. Inani elithile lisadinga umthombo othembekile osemthethweni ngemuva kwalo."
      },
      {
        "title": "I-FAQ: Kungani amahlebezi amanani asakazeka kalula kangaka?",
        "body": "Ngoba izinombolo eziqondile zizwakala zicacile futhi zabelana ngisho nalapho umthombo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokuthatha isinyathelo ngesimangalo?",
        "body": "Hlola umthombo, umzila, kanye nesigaba sesibonelelo isimangalo esikhuluma ngaso."
      }
    ]
  },
  "what-covid-19-social-relief-of-distress-grant-wording-usually-means": {
    "title": "Lokho okuvame ukusho i-COVID-19 social relief of distress words",
    "summary": "Umchazi womlando wabasebenzisi abasasesha ngamagama okusiza umphakathi we-COVID-19 futhi abafuna ukuqonda ukuthi ixhumeka kanjani ku-SRD, R350, kanye nolimi lwe-R370 namuhla.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Amagama e-COVID-19 yosizo lwenhlalo yesibonelelo sokucindezeleka ngokuvamile akhomba abasebenzisi emndenini ofanayo wokweseka usizo lomphakathi ovame ukuseshwa njenge-SRD, R350, noma R370. Ukunyakaza okuphephile ukuphatha umushwana omdala njengamagama omlando, bese usebenzisa umzila wamanje ofana nomsebenzi wakho."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basakhumbula ukusekelwa ngamagama amadala e-COVID-19, kuyilapho abanye basesha nge-SRD, R350, noma amagama angu-R370. Lawo malebula angagqagqana, kodwa awahlali echaza ngqo umsebenzi owudingayo ngokulandelayo. Umsebenzi usabalulekile ngaphezu kwebinzana lokusesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bephatha amagama amadala e-COVID-19 njengesibonelelo esisha esihlukile, bangalandela imiyalelo ephelelwe yisikhathi, bathembe amakhasi engobo yomlando akopishiwe, noma baphuthelwe isimo samanje, inkokhelo, noma umzila wesicelo ofanelana nesimo sabo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha amagama e-COVID-19 njengomongo womlando kuqala.\n2. Qondanisa nendlela yamanje yokusiza umphakathi noma i-SRD ngaphambi kokwenza noma yini enye.\n3. Nquma ukuthi uyaludinga ngempela usizo lwesicelo, usizo lwesimo, noma usizo lwedethi yokukhokha.\n4. Ungacabangi ukuthi R350 noma R370 amagama asho isibonelelo esihlukile ngokwaso.\n5. Sebenzisa i-GrantCare ukuze usuke emshweni omdala uye ekhasini elilungile lamanje ngokuphepha."
      },
      {
        "title": "Amagama ashintshile, kodwa umsebenzi usewumbuzo wangempela",
        "body": "Abasebenzisi bavame ukusesha ngamagama abawakhumbula kakhulu, ikakhulukazi uma kuxoxiswana ngosekelo iminyaka. Umkhuba wokufunda ophephile uwukubeka kumephu umushwana omdala we-COVID-19 kumongo wamanje we-SRD, bese ukhetha ikhasi elifana nomsebenzi wakho wangempela esikhundleni sokujaha zonke izinhlobo zamagama."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele futhi ayithathi indawo yohlelo olusemthethweni lwe-SRD. Ukuhlolwa kwesimo esisemthethweni, izicelo, nokuqinisekiswa kwenkokhelo kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhumushe amagama amadala e-COVID-19 e-COVID-19 emongweni wamanje we-SRD, R350, kanye ne-R370 ukuze ukwazi ukufinyelela ikhasi elifanele lesibonelelo, ikhasi losuku lokukhokha, noma inkomba yesimo ngaphandle kokuqagela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/social-relief\n• /payment-dates\n• /guides/what-the-srd-portal-is-for\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-use-sassa-status-check-for-r350"
      },
      {
        "title": "I-FAQ: Ingabe i-COVID-19 impumuzo yenhlalo yokucindezeleka iyafana ne-SRD?",
        "body": "Abasebenzisi bavame ukusho umndeni ofanayo wosekelo wokusiza umphakathi, kodwa indlela ephephe kunazo zonke kusewukusebenzisa umzila wamanje we-SRD kanye nekhasi elifana nomsebenzi wakho."
      },
      {
        "title": "I-FAQ: Kungani amanye amakhasi ethi R350 kanti amanye athi R370?",
        "body": "Abantu bavame ukusesha ngamalebula amanani ahlukene abawabone ngaphambilini, ngakho amagama angahluka ngisho nalapho isinyathelo esilandelayo esiphephile siwumzila ofanayo wamanje we-SRD."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngethembe isicelo esidala senkathi ye-COVID noma imiyalelo yokukhokha?",
        "body": "Cha. Phatha amagama amadala njengomongo futhi usebenzise umzila wamanje osemthethweni nganoma yisiphi isenzo sangempela noma isiqinisekiso sokugcina."
      }
    ]
  },
  "capitec-sassa-payment-delay-help": {
    "title": "Capitec SASSA ukubambezeleka kokukhokha: yini okufanele uyihlole kuqala",
    "summary": "Umhlahlandlela osebenzayo wabasebenzisi abathola inkokhelo ye-SASSA nge-Capitec futhi bafuna ukuthola ukuthi yini okufanele bayihlole ngaphambi kokuthatha ukuthi ibhange yilo lonke inkinga.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma inkokhelo ye-SASSA ibonakala ibambezelekile ku-Capitec, qala ngokuhlukanisa idethi yokukhokha, isigaba sokucubungula inkokhelo, kanye nomzila wemininingwane yasebhange ngaphambi kokuthi ucabange ukuthi ukubambezeleka kuqale ebhange ngokwalo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basesha ukubambezeleka kokukhokha kwe-Capitec lapho imali yephuzile noma ingekho, kodwa inkinga ingase iqale ngaphambi kwesikhathi ochungechungeni. Ukubambezeleka kungavela ekucutshungulweni kwenkokhelo, odabeni lwendlela yokukhokha, imininingwane yasebhange, noma ukungaqondi kahle kwesikhathi kunokuba kuvele ku-Capitec kuphela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi besola ibhange ngokushesha okukhulu, bangaphuthelwa imbangela yangempela, balandele umzila wosekelo ongalungile, noma bashintshe imininingwane ngaphambi kokuthi bazi ukuthi kwenzekani ngempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola idethi yokukhokha efanele kanye nesigaba sesibonelelo kuqala.\n2. Funda ukuthi ingabe icala lakho libukeka ligunyaziwe, liyacutshungulwa, libambezelekile, noma lingakacaci.\n3. Hlola ukuthi imininingwane yakho yasebhange ishintshile yini noma isadinga ukuqinisekiswa.\n4. Qhathanisa inkinga nokushoda kwenkokhelo kanye nesiqondiso sokucubungula inkokhelo ngaphambi kokuthi ucabange ukuthi inkinga ye-Capitec kuphela.\n5. Sebenzisa umzila wokuxhumana osemthethweni olungile uma inkokhelo isabukeka ibambekile ngemuva kwalawo masheke."
      },
      {
        "title": "Ibhange liyingxenye eyodwa kuphela yochungechunge lokukhokha",
        "body": "Ukubambezeleka kokuboniswa kwebhange kungaba okwangempela, kodwa kuphephe kakhudlwana ukuhlola izigaba zangaphambili kuqala. Abasebenzisi bavame ukuthola izimpendulo ezingcono ngokubheka isimo sokukhokha, indlela yokukhokha, kanye nedethi yokukhokha ngaphambi kokwehlisela inkinga ku-Capitec."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiwaboni amarekhodi ebhange langasese futhi ayithathi indawo yosekelo olusemthethweni noma ukusekelwa kwebhange. Isiza abasebenzisi ukuthi babone ukuthi iyiphi ingxenye yeketango edinga ukunakwa kuqala."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise ukubambezeleka kwenkokhelo namagama okucubungula inkokhelo, izibuyekezo zemininingwane yasebhange, neziqondiso zokukhokha ezingekho ukuze ungaqageli ngokungaboni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-banking-details-updates-work\n• /guides/how-to-find-official-contact-details-safely"
      },
      {
        "title": "I-FAQ: Ingabe ukubambezeleka kwe-Capitec kuhlale kusho ukuthi ibhange lidale inkinga?",
        "body": "Cha. Ukubambezeleka kungase kuqale ngaphambi kwesikhathi ngokucubungula inkokhelo, indlela yokukhokha, noma isikhathi kunokuba kuqale ebhange lodwa."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokuthi ngithinte noma ubani?",
        "body": "Hlola idethi yokukhokha, isigaba sakho sesibonelelo, nokuthi ingabe icala lisacutshungulwa noma lishoda kunokuba ligcine."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngishintshe imininingwane yasebhange ngokushesha?",
        "body": "Hhayi uze uqonde ukuthi ukubambezeleka kuyinkinga yemininingwane yasebhange ngempela."
      }
    ]
  },
  "what-social-grant-usually-means": {
    "title": "Ngokuvamile kusho ukuthini isibonelelo sikahulumeni eNingizimu Afrika",
    "summary": "Igayidi yolimi olulula ekusesheni okubanzi kwesibonelelo sikahulumeni kanye nokuthi lawo magama ngokuvamile akhomba kanjani izigaba zesibonelelo se-SASSA zangempela, izinsuku, amanani, nemisebenzi yesicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo sikahulumeni ngokuvamile sisho ukusesha okubanzi kosekelo lwe-SASSA kunoxhaso olulodwa olulodwa. Isinyathelo esilandelayo esiphephe kakhulu ukuthola ukuthi udinga uhlobo lwesibonelelo, usuku lokukhokha, inani, isimo, noma umzila wokufaka isicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi bavame ukucinga isibonelelo sikahulumeni uma besho okuthile okubanzi kunekhasi elilodwa elingaziphendula ngokwalo. Bangase bafune Abantu Abadala, Ukukhubazeka, Isondlo Sezingane, SRD, izinsuku zokukhokha, noma indawo yokuqala evamile. Amagama abanzi awusizo, kodwa isinyathelo esilandelayo kufanele sicace kakhudlwana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi behlala ezingeni elibanzi lesibonelelo sikahulumeni isikhathi eside kakhulu, bangakwazi ukuhlala emzileni ongalungile, bafunde ikhasi lesibonelelo elingalungile, noma baphuthelwe yiwona msebenzi ababewudinga ngempela ukuze bawuxazulule."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi udinga uhlobo lwesibonelelo, usuku lokukhokha, inani, isimo, noma umzila wokufaka isicelo.\n2. Vula ihabhu yezibonelelo uma usadinga isigaba esifanele.\n3. Vula izinsuku zokukhokha uma umbuzo wakho wangempela umayelana nesikhathi.\n4. Vula amanani ezibonelelo uma umbuzo wakho wangempela umayelana nemali.\n5. Sebenzisa isihloli sokufaneleka uma namanje ungazi ukuthi yisiphi isibonelelo esifanelana nesimo sakho."
      },
      {
        "title": "Igama elibanzi liyisiqalo, hhayi umzila wokugcina",
        "body": "Isibonelelo sikahulumeni siwulimi lokusesha oluwusizo ngoba luhambisana nendlela abantu abakhuluma ngayo. Iba wusizo kakhulu kuphela uma uyinciphisa ungene esibonelweni esiqondile noma umsebenzi owudinga ngempela ngokulandelayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele. Isiza abasebenzisi ukuthi basuke emazwini abanzi ezibonelelo zomphakathi baye ekhasini elingakwesokudla elilandelayo, kodwa izicelo ezisemthethweni, izenzo zesimo, nokuqinisekiswa kokugcina kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhumushe igama elibanzi ekhasini elilungile lesibonelelo, ikhasi ledethi yokukhokha, ikhasi lenani, noma umhlahlandlela wesimo ukuze uchithe isikhathi esincane ngokuchofoza."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants\n• /payment-dates\n• /grant-amounts\n• /eligibility-checker\n• /grants/social-relief"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe isibonelelo sikahulumeni sisho isibonelelo esisodwa esithi SASSA?",
        "body": "Akuvamile. Ngokuvamile kusho ukuthi umsebenzisi udinga indawo yokuqala ebanzi ngaphambi kokukhetha uxhaso oluqondile noma umsebenzi."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyivule uma ngidinga isikhathi?",
        "body": "Vula ikhasi lezinsuku zokukhokha uma umbuzo wakho wangempela umayelana nokuthi isibonelelo singakhokhwa nini."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma ngingazi ukuthi yisiphi isibonelelo esilingana nami?",
        "body": "Sebenzisa ihabhu lezibonelelo kanye nesihloli sokufaneleka ukuze unciphise isigaba esifanele kuqala."
      }
    ]
  },
  "what-social-grant-dates-searches-usually-mean": {
    "title": "Ukuthi ukuseshwa kwezinsuku zesibonelelo sikahulumeni ngokuvamile kusho ukuthini",
    "summary": "Umhlahlandlela osebenzayo osesho lwedethi yesibonelelo sikahulumeni nokuthi ungasuka kanjani kubinzana lesikhathi elibanzi uye ekhasini elilungile lenyanga kanye nesigaba sesibonelelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kwezinsuku zesibonelelo sikahulumeni ngokuvamile kusho ukuthi abasebenzisi bafuna ishejuli yokukhokha ye-SASSA ebanzi, hhayi usuku olulodwa olumisiwe lwazo zonke izibonelelo. Ukunyakaza okuphephe kakhulu ukuvula ihabhu yedethi yokukhokha bese uqondanisa inyanga nesigaba sesibonelelo ngokucophelela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Inkulumo ethi izinsuku zesibonelelo sikahulumeni zingabandakanya Abantu Abadala, Abakhubazekile, izibonelelo zezingane, noma isikhathi se-SRD. Abasebenzisi bavame ukusesha kabanzi kuqala bese bedinga usizo lokunciphisa ikhasi lenyanga elilungile kanye nesigaba esikhundleni sokuphatha idethi eyodwa njengempendulo yendawo yonke."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bethemba idethi eyodwa entantayo ngaphandle kokufanisa uhlobo lwesibonelelo nenyanga, bangahlela ngeshejuli engalungile noma bangaqondi kahle ukuthi ikhasi libonisani ngempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ihabhu yezinsuku zokukhokha kuqala.\n2. Khetha inyanga efanele noma unyaka ngaphambi kokuthi uthembe noma iyiphi idethi.\n3. Qondanisa ishejuli nesigaba esiqondile sesibonelelo osidingayo.\n4. Funda ukuthi isikhathi sishicilelwe, silindelwe, noma sisekelwe kuphothali.\n5. Sebenzisa isiqondiso sokukhokha samanje esikhundleni sezithombe-skrini ezindala noma okuthunyelwe kwedethi okugaywe kabusha."
      },
      {
        "title": "Ibinzana lokusesha elilodwa lingafihla amashejuli ambalwa ahlukene",
        "body": "Ukusesha okubanzi kwedethi kuzwakala kulula, kodwa kuvame ukuhlanganisa izibonelelo ezivamile, izibonelelo zezingane eziqoqwe, nosekelo lwesitayela se-SRD. Umkhuba wokufunda ophephe kakhulu ukunciphisa inyanga nesigaba ngaphambi kokuthi uthembele kusikhathi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza isikhathi somphakathi ngolimi olulula, kodwa isiqinisekiso esisemthethweni sisesesemzileni osemthethweni ofanele lapho udaba lwakho ludinga impendulo yokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekuseshweni okubanzi kwezinsuku zesibonelelo sikahulumeni uye ekhasini elilungile lenyanga, isigaba sesibonelelo, kanye nomhlahlandlela wesikhathi ngaphandle kokuphatha zonke izinsuku njengezishintshashintshayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates\n• /grants/older-persons\n• /grants/social-relief\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-track-payment-dates-without-rumours"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe izinsuku zesibonelelo sikahulumeni zisho ishejuli eyodwa yazo zonke izibonelelo?",
        "body": "Cha. Ibinzana ngokuvamile lihlanganisa izigaba ezingaphezu kwesisodwa futhi lidinga ukuncishiswa ngaphambi kokuba kucace isikhathi."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphandle kwedethi ngokwayo?",
        "body": "Hlola inyanga, isigaba sesibonelelo, nokuthi isikhathi sishicilelwe, silindelwe, noma sisekelwe kuphothali."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe izinsuku ezivela ezithombeni ezindala noma okuthunyelwe okwabiwe?",
        "body": "Cha. Kuphephe kakhudlwana ukusebenzisa ihabhu yezinsuku zokukhokha kanye nesiqondiso samanje sesikhathi."
      }
    ]
  },
  "is-the-r500-grant-real": {
    "title": "Ingabe isibonelelo sika-R500 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zesibonelelo sikahulumeni ezingu-R500, izikhala zokubambezeleka kokukhokha, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zesibonelelo sika-R500 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi isimangalo singokoqobo ngoba ikhasi likhuluma ngokubambezeleka, izicelo, noma ilebula elijwayelekile lesibonelelo sikahulumeni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kuka-R500 kuvela kubasebenzisi abazama ukuqinisekisa isimangalo, hhayi emzileni ozinzile osemthethweni wesibonelelo. Amanye amakhasi azama ukwenza isimangalo sizwakale sikholeka kakhudlwana ngokuxuba inani namagama okulibaziseka, ulimi lwesimo, noma imigomo yesibonelelo esivamile abasebenzisi asebeyazi kakade."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi angama-R500 angakha ithemba elingamanga, athumele abasebenzisi izicelo zomgunyathi, noma abaphushele ezixhumanisini ezingaphephile ezishaya sengathi zichaza ukubambezeleka noma inkinga yokukhokha."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sika-R500 njengesingakaqinisekiswa.\n2. Ungathathi ukulibaziseka kwamagama noma amagama asetshenziswayo njengobufakazi ngokwawo.\n3. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n4. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zamanje zesibonelelo sangempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Ukulibaziseka kwamagama kungenza isimangalo esingumgunyathi sizwakale sisemthethweni",
        "body": "Ikhasi lingazwakala likholeka uma lengeza isizathu sokuthi kungani imali ifika sekwephuzile noma lapho isicelo kufanele siye khona. Leyo mininingwane eyengeziwe ayikafakazi ukuthi isibonelelo sikhona. Ukuhlolwa kwangempela umzila, umthombo, kanye nesigaba sangempela sesibonelelo esingemuva kwakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, amanani asemthethweni, nezibuyekezo zokukhokha ezisemthethweni kusengezaziteshi ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zika-R500 namanani amanje esibonelelo sikahulumeni, imikhuba ephephile yokufunda amakhasi, kanye nesiqondiso somzila osemthethweni ukuze ungaphazamisi amahlebezi ngesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r500-grant-payment-delay-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe amagama okulibazisa ukukhokha afakazela ukuthi isibonelelo sika-R500 singokoqobo?",
        "body": "Cha. Ukulibaziseka kwamagama kungenza isimangalo esibuthakathaka sizwakale njengokuphatha kakhudlwana, kodwa sisadinga umthombo othembekile osekelwe kuso."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ngabe kufanele ngithembe ikhasi elithi izicelo zama-R500 zivuliwe?",
        "body": "Hhayi kuze kube yilapho uqinisekisa ukuthi umzila usemthethweni futhi isibonelelo ngokwaso singokoqobo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, izigaba zesibonelelo sangempela, neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "what-r500-grant-payment-delay-searches-usually-mean": {
    "title": "Okushiwo ukuseshwa kokulibaziseka kwenkokhelo yesibonelelo sika-R500 ngokuvamile kusho",
    "summary": "Umhlahlandlela wolimi olulula osesho lokulibaziseka kuka-R500 kanye nokuthi kungani abasebenzisi kufanele baqinisekise isibonelelo sikahulumeni esifunwayo kuqala ngaphambi kokuba bakhathazeke ngokuthi kungani imali ifika sekwephuzile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kokulibaziseka kwenkokhelo yesibonelelo sika-R500 ngokuvamile kusho ukuthi abasebenzisi bazama ukuqinisekisa ukuthi inkokhelo ka-R500 efunwayo ingeyangempela yini nokuthi kungani ingakafiki. Isinyathelo esiphephe kunazo zonke siwukuqinisekisa isimangalo sesibonelelo sikahulumeni kuqala ngaphambi kokuthatha indaba yokubambezeleka njengenengqondo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukubambezeleka kwamagama kungenza isimangalo esingumgunyathi noma esingacacile sizwakale sisemthethweni kakhulu ngoba kudala umuzwa wokuthi inkokhelo isivele ikhona futhi isikhathi kuphela esiyinkinga. Empeleni, umbuzo wokuqala kusamele ube ukuthi ngabe isibonelelo sika-R500 esibangwayo singokoqobo yini."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi beqa baqonde encazelweni yokulibaziseka, bangamosha isikhathi emakhasini angalungile, babelane ngemininingwane ngokungaphephile, noma bathembe isimangalo esingumgunyathi esingakaze sibe nomzila wangempela osemthethweni ngemva kwakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi isibonelelo sika-R500 esibangwayo singokoqobo.\n2. Ungathathi ukubambezeleka, ukucubungula, noma amagama asebhange njengobufakazi ngokwakho.\n3. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zesibonelelo sangempela.\n4. Sebenzisa usuku lokukhokha noma isiqondiso sesimo sokukhokha kuphela uma isimangalo sesibonelelo sithembekile.\n5. Sebenzisa iziteshi ezisemthethweni uma inkinga yokukhokha yangempela isadinga ukuqinisekiswa okuqondile."
      },
      {
        "title": "Incazelo yokubambezeleka ayifani nobufakazi",
        "body": "Amanye amakhasi adukisayo asebenza ngokweqa umbuzo wokuthi ingabe isibonelelo sikahulumeni singokoqobo futhi siqonde ngqo kokuthi kungani inkokhelo yephuzile. Lokho kwenza isimangalo sizizwe siqinisekisiwe ngisho noma isibonelelo ngokwaso singakakuzuzi ukuthenjwa."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zokulibaziseka ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Isiqinisekiso sokukhokha esisemthethweni kanye nemininingwane yecala esemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlukanise izindaba zesigaba sokukhokha sangempela nezimangalo zenani elingumgunyathi ukuze ungachithi isikhathi uhlola inkokhelo okungenzeka ayizange ibe ngokoqobo kwasekuqaleni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/is-the-r500-grant-real\n• /grant-amounts\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-avoid-fake-grant-amount-pages"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani amakhasi okulibaziseka angama-R500 ezwakala ekholakala?",
        "body": "Ngoba ulimi lokulibaziseka lwenza indaba izwakale njengenkinga yokukhokha ekhona esikhundleni sesicelo sesibonelelo esingaqinisekisiwe."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngibheke imininingwane yebhange noma yokukhokha kuqala?",
        "body": "Okokuqala qinisekisa ukuthi isibonelelo sika-R500 esibangwayo singokoqobo. Ukuhlola ukubambezeleka kunengqondo ngemva kwalokho."
      },
      {
        "title": "I-FAQ: Kuthiwani uma ikhasi libonisa idethi yokukhokha noma inothi lokucubungula?",
        "body": "Leyo mininingwane isadinga umthombo othembekile osemthethweni ngemuva kwesimangalo ngokwaso."
      }
    ]
  },
  "what-r350-grant-wording-usually-means": {
    "title": "Lokho okuvame ukusho i-R350 ukunikeza amagama",
    "summary": "Umhlahlandlela wolimi olulula wabasebenzisi abasasesha ngamagama esibonelelo se-R350 futhi abafuna ukuqonda ukuthi ungena kanjani ku-SRD yamanje kanye nomxholo wokusiza umphakathi.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Amagama esibonelelo se-R350 ngokuvamile akhomba abasebenzisi ku-SRD noma umndeni wokusekela usizo lomphakathi esikhundleni sesibonelelo esihlukile esingahlobene. Umnyakazo ophephe kakhulu ukubeka amagama kumephu yomsebenzi wakho wangempela, njengokufaka isicelo, isimo, noma izinsuku zokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basasesha nge-R350 ngoba leyo ilebula yenani abalikhumbula kakhulu. Empeleni, isinyathelo esilandelayo esiwusizo akukona ukujaha amagama wedwa. Okokuthola ukuthi uyalidinga yini ikhasi lamanje le-SRD, umzila wesimo, umhlahlandlela wohlelo lokusebenza, noma ikhasi losuku lokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bephatha amagama e-R350 njengomzila ohlukile wawo wonke umsebenzi, bangalandela izixhumanisi eziphelelwe yisikhathi, bathembe amakhasi akopishiwe, noma baphuthe umzila wamanje we-SRD olingana nabakudingayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha i-R350 njengamagama okusesha ajwayelekile kuqala.\n2. Imatanise ne-SRD yamanje noma umzila wokusiza umphakathi ngaphambi kokwenza noma yini enye.\n3. Nquma ukuthi umsebenzi wakho wangempela uwuhlelo lokusebenza, isimo, izinsuku zokukhokha, noma incazelo evamile.\n4. Ungacabangi ukuthi ikhasi ngalinye le-R350 liyindlela esemthethweni yesenzo.\n5. Sebenzisa i-GrantCare ukusuka kumagama uye ekhasini elilungile lamanje ngokuphepha."
      },
      {
        "title": "Inani elikhunjulwayo alihlali liyimpendulo egcwele",
        "body": "I-R350 imvamisa ilebula abantu abayikhumbulayo, kodwa umbuzo ongcono ukuthi yini okudingeka ukwenze manje. Uma lokho sekucacile, ikhasi elilungile le-SRD liba lula ukulithola futhi kube lula ukulethemba."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele futhi ayithathi indawo yohlelo olusemthethweni lwe-SRD. Izicelo ezisemthethweni, izenzo zesimo, nokuqinisekiswa kokukhokha kokugcina kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhumushe amagama angu-R350 uwayise ekhasini elilungile le-SRD ukuze uthole isimo, isicelo, izinsuku zokukhokha, noma ukwesekwa okuvamile ngaphandle kokuqagela izixhumanisi ezikopishiwe."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/social-relief\n• /guides/how-to-use-sassa-status-check-for-r350\n• /guides/how-to-start-an-r350-online-application-safely\n• /payment-dates\n• /guides/what-the-srd-portal-is-for"
      },
      {
        "title": "I-FAQ: Ingabe i-R350 iyinto efanayo nomzila wamanje we-SRD?",
        "body": "Abasebenzisi bavame ukusho umndeni ofanayo wosekelo wokusiza umphakathi, kodwa umnyakazo ophephe kakhulu kusewukusebenzisa umzila wamanje we-SRD ofana nomsebenzi wakho."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe noma yiliphi ikhasi eliphinda i-R350 esihlokweni?",
        "body": "Cha. Amagama ajwayelekile akufakazeli ukuthi leli khasi lisemthethweni noma elamanje."
      },
      {
        "title": "I-FAQ: Yini okufanele nginqume kuqala uma ngicinga i-R350?",
        "body": "Nquma ukuthi uyaludinga yini usizo lwesimo, usizo lwesicelo, izinsuku zokukhokha, noma ikhasi eliyinhloko le-SRD."
      }
    ]
  },
  "what-r370-grant-wording-usually-means": {
    "title": "Lokho okuvame ukusho i-R370 ukunikeza amagama",
    "summary": "Umhlahlandlela wolimi olulula wabasebenzisi abasesha ngamagama esibonelelo se-R370 futhi abafuna ukuqonda ukuthi lelo lebula ifanelana kanjani ne-SRD yamanje kanye nomxholo wokusiza umphakathi.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Amagama esibonelelo se-R370 ngokuvamile akhomba abasebenzisi ku-SRD noma umndeni wosekelo lokusiza umphakathi esikhundleni sesibonelelo esisha esihlukile. Ukunyakaza okuphephe kakhulu ukufanisa amagama nomsebenzi wakho wangempela, njengesimo, izinsuku zokukhokha, noma isiqondiso sohlelo lokusebenza."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basesha nge-R370 ngoba balandela amagama amanani amasha, kodwa inselele eyinhloko isafana: ukuthola ikhasi elilungile lamanje le-SRD lomsebenzi abawudingayo ngempela. Amagama ewodwa akufanele anqume ukuthi yimuphi umzila ongawethemba."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bephatha amagama e-R370 njengobufakazi bokuthi ikhasi ngelemanje, bangathemba izixhumanisi ezibuthakathaka ngokushesha noma baphuthe umzila oqondile we-SRD ophethe isimo, isicelo, noma isikhathi sokukhokha ngokuphepha."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha i-R370 njengenani lamagama lamanje kuqala.\n2. Qondanisa ne-SRD noma umzila wokusiza umphakathi ngaphambi kokuthemba ikhasi.\n3. Nquma ukuthi udinga usizo lwesimo, izinsuku zokukhokha, usizo lwesicelo, noma incazelo evamile.\n4. Ungacabangi ukuthi ikhasi lisemthethweni kuphela ngoba lisebenzisa inani elisha.\n5. Sebenzisa i-GrantCare ukusuka kumagama uye ekhasini elilungile lamanje ngokuphepha."
      },
      {
        "title": "Amagama amasha asadinga umzila olungile ngemuva kwawo",
        "body": "Ikhasi lingazwakala lisesikhathini samanje ngoba lisebenzisa ilebula yenani elisha, kodwa ukuhlola okuphephile kusese ukuthi umzila, umthombo, nomsebenzi konke kumugqa ocacile yini."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele futhi ayithathi indawo yohlelo olusemthethweni lwe-SRD. Ukuhlolwa kwesimo esisemthethweni, izicelo, nokuqinisekiswa kwenkokhelo yokugcina kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhumushe amagama angu-R370 uwayise ekhasini elilungile le-SRD ukuze uthole isimo, izinsuku zokukhokha, noma isiqondiso sokufaka isicelo ngaphandle kokuphatha wonke amakhasi asekelwe enanini njengesemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/social-relief\n• /guides/how-to-check-r370-status-safely\n• /guides/how-to-use-an-r370-application-page-safely\n• /payment-dates\n• /guides/what-the-srd-portal-is-for"
      },
      {
        "title": "I-FAQ: Ingabe i-R370 isho ukuthi ngidinga umzila wesibonelelo ohlukile kusukela ku-SRD?",
        "body": "Akuvamile. Ukunyakaza okuphephile ukusebenzisa umzila we-SRD wamanje ofana nomsebenzi owudingayo."
      },
      {
        "title": "I-FAQ: Kungani amakhasi e-R370 ezizwa kulula ukuwethemba?",
        "body": "Ngoba amagama amanani amasha angenza ikhasi lizwakale lamanje ngisho noma umzila usadinga ukuhlolwa."
      },
      {
        "title": "I-FAQ: Yini okufanele nginqume kuqala uma ngicinga i-R370?",
        "body": "Nquma ukuthi udinga usizo lwesimo, usizo lwedethi yokukhokha, isiqondiso sohlelo lokusebenza, noma ikhasi eliyinhloko le-SRD."
      }
    ]
  },
  "what-social-grant-increase-searches-usually-mean": {
    "title": "Ukuthi ukusesha ngokwenyuswa kwemali yesibonelelo sikahulumeni ngokuvamile kusho ukuthini",
    "summary": "Umhlahlandlela ozothile osesho lokukhushulwa kwezibonelelo zomphakathi kanye nokuthi uzifunda kanjani izimangalo zokwenyuka okubanzi ngaphandle kokudida izihloko ezijwayelekile, okuthunyelwe okudala, kanye nesigaba esiqondile sesibonelelo esishintshile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lokwenyuka kwezibonelelo zikahulumeni ngokuvamile lusho ukuthi abasebenzisi bafuna impendulo ebanzi mayelana nokushintsha amanani ezibonelelo. Umnyakazo ophephe kakhulu uwukunciphisa isimangalo siye esigabeni esiqondile sesibonelelo sikahulumeni kanye nesibuyekezo sakamuva esisemthethweni ngaphambi kokuba ulethembe inani."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abantu bavame ukucinga ukukhushulwa kwesibonelelo sikahulumeni lapho bengakanciphisi ukuthi baqonde Abantu Abadala, Abakhubazekile, Isondlo Sezingane, SRD, noma esinye isigaba. Lawo magama abanzi awusizo njengesiqalo, kodwa sisadinga ukuhunyushwa esibonelweni esilungile kanye nesibuyekezo esifanele samanje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ibinzana elibanzi lokukhuphula lingahlanganisa izihloko zezindaba ezixubile namalebula onyaka agaywe kabusha. Uma abasebenzisi bengasinciphisi isimangalo ngendlela efanele, bangathemba inani elingalungile noma isikhathi esingalungile ngokushesha okukhulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka isimangalo sokwenyuka okubanzi njengesiqalo, hhayi impendulo yokugcina.\n2. Nquma ukuthi yisiphi isigaba sesibonelelo isibuyekezo esimayelana ngempela.\n3. Hlola isibuyekezo sakamuva esishicilelwe esisemthethweni saleso sigaba.\n4. Qaphela ngezithombe-skrini ezindala nokuthunyelwe okusekelwe onyakeni.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuhumusha amagama abanzi uwayise ekhasini elilungile lesibonelelo noma inkomba yenani."
      },
      {
        "title": "Ukwandiswa kwamagama okubanzi kusadinga uxhaso olulodwa ngemuva kwakho",
        "body": "Indlela ephephe kunazo zonke yokufunda isimangalo sokwenyuswa kwesibonelelo sikahulumeni ukusinciphisa kuze kusele isigaba esisodwa kuphela. Leso sinyathelo sehlisa ukudideka futhi senza kube lula ukwahlulela ukuthi umthombo usengowamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza abasebenzisi baqonde izimangalo ezikhuphukayo, kodwa ukuqinisekiswa okusemthethweni kwamanani ashintshiwe kusengokwemithombo eshicilelwe esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke emazwini abanzi okwandisa isibonelelo-somphakathi uye ekhasini lenani elifanele, ikhasi lesibonelelo, kanye nomhlahlandlela wokuhlola isibuyekezo ukuze isimangalo sizwakale sixubene kakhulu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /grants\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani ukukhuphuka kwezibonelelo zikahulumeni kuseshwa kuzwakala kubanzi kangaka?",
        "body": "Ngoba abasebenzisi bavame ukufuna impendulo eyodwa elula ngaphambi kokuthi banciphise isigaba esiqondile sesibonelelo esihilelekile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyifanise kuqala?",
        "body": "Qondanisa isimangalo sokwenyuka nesigaba esiqondile sesibonelelo sikahulumeni kuqala."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe inani ngaphandle kokuhlola umthombo?",
        "body": "Cha. Isigaba esiqondile sesibonelelo kanye nomthombo kubaluleke ngaphezu kwenombolo yodwa."
      }
    ]
  },
  "how-to-check-social-grant-increase-updates-safely": {
    "title": "Ungahlola kanjani ukuthuthukiswa kwezibonelelo zikahulumeni ngokuphepha",
    "summary": "Umhlahlandlela wokuqala wokuthembana wokuhlola izibuyekezo ezibanzi zokukhushulwa kwezibonelelo zomphakathi ngaphandle kokuphatha izihloko ezixubile, amalebula onyaka, noma izithombe-skrini njengokuqinisekisa kokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola izibuyekezo zokukhushulwa kwezibonelelo zikahulumeni ngokuphepha ngokunciphisa isimangalo siye esigabeni esiqondile sesibonelelo, bese usiqhathanisa nesibuyekezo sakamuva esishicilelwe esisemthethweni esikhundleni sokuthembela esihlokweni noma isithombe-skrini sodwa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho olubanzi lokukhushulwa kwezibonelelo zomphakathi ngokuvamile luqala ngokungaqiniseki. Abasebenzisi bayazi ukuthi kungenzeka ukuthi kukhona okushintshile, kodwa okwamanje abazi ukuthi iyiphi isibonelelo, yisiphi isikhathi, noma yimuphi umthombo okufanele bawuthembe. Yingakho isinyathelo esinciphile sibaluleke kakhulu."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngaphandle kokuhlolwa komthombo ngokucophelela, abasebenzisi bangadida isibonelelo esisodwa nesinye, bathembe isibuyekezo esidala esiphindaphindiwe, noma balindele ukuguqulwa kwenani elingahambisani nesibonelelo sabo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi yisiphi isigaba sesibonelelo isibuyekezo esibonakala sisisho.\n2. Hlola ukuthi isibuyekezo sikhomba yini emthonjeni oshicilelwe osemthethweni ocacile.\n3. Qhathanisa isikhathi ngokucophelela ukuze unganciki kulebula yonyaka omdala.\n4. Sebenzisa ikhasi lamanani ezibonelelo kanye nekhasi lesibonelelo esihambelanayo ukuze uthole umongo.\n5. Phatha okuthunyelwe komphakathi nezithombe-skrini njengokungaqinisekisiwe kuze kube yilapho umthombo usucacile."
      },
      {
        "title": "Ukuhlola okuphephile kuncane kunosesho",
        "body": "Umkhuba owusizo ukuvumela ukusesha kuhlale kubanzi okwesikhashana. Isinyathelo esilandelayo kufanele sibe sincane kakhulu: isigaba esisodwa sesibonelelo, isibuyekezo samanje esisodwa, nomthombo owodwa ocacile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bahlole izimangalo zokukhushulwa komphakathi, kodwa ukuqinisekiswa okusemthethweni kwamanani esibonelelo sikahulumeni ashintshile kusengokweziteshi ezishicilelwe ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi uye ekhasini elilungile lesibonelelo, umhlahlandlela wamanani, kanye nomkhuba wokuhlola umthombo ukuze ungafundi kakhulu okuthunyelwe okukodwa noma isihloko."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /grants\n• /guides/what-social-grant-increase-searches-usually-mean\n• /guides/how-to-check-if-a-grant-increase-update-is-official\n• /guides/how-to-read-grant-increase-news-safely"
      },
      {
        "title": "I-FAQ: Kungani kufanele nginciphise isigaba sesibonelelo kuqala?",
        "body": "Ngoba ulimi olubanzi lwesibonelelo sikahulumeni lungahlanganisa isibonelelo esingaphezu kwesisodwa kanye nesibuyekezo esingaphezu kwesisodwa ndawonye."
      },
      {
        "title": "I-FAQ: Iyiphi ingozi enkulu ngezithombe-skrini?",
        "body": "Izithombe-skrini zivame ukususa idethi, umthombo, noma isigaba sesibonelelo esingabonisa ukuthi isibuyekezo sisesekhona yini."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kufanele ngiqhathanise nani isimangalo?",
        "body": "Qhathanisa nesigaba esifanele sesibonelelo kanye nesibuyekezo sakamuva esisemthethweni esishicilelwe."
      }
    ]
  },
  "how-to-check-srd-grant-increase-updates-safely": {
    "title": "Ungazibheka kanjani izibuyekezo zokwenyuka kwesibonelelo se-SRD ngokuphepha",
    "summary": "Umhlahlandlela osebenzayo wokuhlola izibuyekezo zokukhushulwa kwesibonelelo se-SRD ngaphandle kwamahemuhemu amanani adidayo, amalebula onyaka, namagama amanje okusiza umphakathi.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola izibuyekezo zokukhushulwa kwesibonelelo se-SRD ngokuphepha ngokufanisa isimangalo nomzila wamanje wokusiza umphakathi, uhlole isibuyekezo sakamuva esisemthethweni esishicilelwe, futhi uqaphe ngokuthunyelwe okuphinda kuphela okuthi R350, R370, noma enye inombolo engenamthombo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwe-SRD okwandayo kuvame ukuqhutshwa amagama asuselwa enanini afana ne-R350 noma i-R370, okungenza abasebenzisi bacabange ukuthi inombolo iyodwa exoxa indaba egcwele. Indlela ephephile ukuxhuma isimangalo emuva ku-SRD yamanje noma umzila wokusiza umphakathi kanye nesibuyekezo sakamuva esisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bethemba isimangalo senani elikopishiwe ngokushesha okukhulu, bangaqondi kahle ukuthi yini eshintshile, uma sisebenza, noma ukuthi okuthunyelwe kuveza ngisho nokuqukethwe kwamanje kwe-SRD nhlobo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qondanisa isimangalo sokwenyuka nomzila wamanje we-SRD noma wokusiza umphakathi.\n2. Hlola isibuyekezo sakamuva esisemthethweni esishicilelwe esikhundleni sokuthemba inani lodwa.\n3. Qaphela ngamagama amadala R350 noma R370 entsha uma umthombo ungacacile.\n4. Qhathanisa isimangalo nekhasi lamanani ezibonelelo kanye nekhasi lesibonelelo le-SRD.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuhlukanisa amagama nesibuyekezo sangempela."
      },
      {
        "title": "Inombolo ingashintsha, kodwa ukuhlola umthombo kuhlala kunjalo",
        "body": "Abasebenzisi bavame ukugxila enanini kuqala ngoba lizwakala lilula. Umkhuba wokufunda ophephile ukuhlola umthombo, isikhathi, kanye nomzila wamanje we-SRD ngaphambi kokwethemba lokho inombolo ebonakala ikusho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza abasebenzisi ukuthi bafunde i-SRD bakhuphule izimangalo ngokuphepha kakhulu, kodwa ukuqinisekiswa okusemthethweni kwamanani ashintshiwe kusengokwemithombo eshicilelwe esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zokukhushulwa kwe-SRD namanani amanje esibonelelo sikahulumeni, ikhasi lesibonelelo le-SRD, nemihlahlandlela yokuhlola isibuyekezo esiphephile ukuze ungafundi kakhulu amahemuhemu asekelwe enanini."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /grants/social-relief\n• /guides/what-r350-grant-wording-usually-means\n• /guides/what-r370-grant-wording-usually-means\n• /guides/how-to-check-if-a-grant-increase-update-is-official"
      },
      {
        "title": "I-FAQ: Kungani i-SRD inyusa ukusesha kuvame ukugxila enanini?",
        "body": "Ngoba amalebula amanani afana ne-R350 kanye ne-R370 ayakhumbuleka futhi kulula ukwabelana, ngisho noma umthombo ngemuva kwawo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe okuthunyelwe okuthi kuphela inani le-SRD lishintshile?",
        "body": "Cha. Hlola umthombo kanye nomzila wamanje we-SRD ngaphambi kokuthi uphathe isimangalo njengesingokoqobo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa nekhasi lamanje le-SRD, ikhasi lamanani esibonelelo, kanye nesibuyekezo sakamuva esisemthethweni esishicilelwe."
      }
    ]
  },
  "is-the-r12500-youth-grant-real": {
    "title": "Ngabe isibonelelo sentsha sika-R12500 siyiqiniso?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zesibonelelo sentsha zika-R12500, amakhasi ezicelo, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zesibonelelo sentsha zika-R12500 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi isibonelelo singokoqobo ngoba ikhasi lihlanganisa inani elikhulu namagama entsha kanye nesithembiso sesicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kwesibonelelo sentsha kuka-R12 500 kuvela kubasebenzisi abasabela kokuthunyelwe komphakathi, izixhumanisi zezicelo ezikopishiwe, noma amakhasi azama ukwenza isimangalo sizwakale siphuthuma ngokunamathisela inani elikhulu kulebula ebanzi yentsha. Umkhuba ophephile uwukuqinisekisa kuqala isibonelelo bese ucabanga ukufaka isicelo ngemva kwalokho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi esibonelelo sentsha angu-R12500 angadala ithemba elingamanga, amoshe isikhathi, noma acindezele abasebenzisi ukuba bafake amafomu angaphephile nemizila ekopishiwe. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi bame ngaphambi kokuthi bazibophezele esimangalweni esingazuzanga ukwethenjwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sesibonelelo sentsha sika-R12500 njengesingakaqinisekiswa kuqala.\n2. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni ocacile.\n3. Ungaphathi ifomu lesicelo noma isithembiso semali njengobufakazi ngokwaso.\n4. Qhathanisa isimangalo nezigaba zangempela zezibonelelo, umhloli wokufaneleka, kanye nomhlahlandlela okhona wesibonelelo sentsha.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Inani elikhulu lingenza isimangalo sentsha sizizwe siqiniseka ngokwengeziwe",
        "body": "Inani ngokuvamile liyi-hook. Inombolo enkulu kanye namagama entsha ingenza ikhasi lizizwe liphuthuma futhi libalulekile, kodwa ukuhlolwa kwangempela kusewukuthi umzila, umthombo, kanye nesibonelelo sikahulumeni ngokwaso sisemthethweni ngokusobala."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sentsha ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, izicelo ezisemthethweni, nokufaneleka okusemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zesibonelelo sentsha zika-R12500 nekhasi lezinganekwane ezibanzi zezibonelelo zentsha, izigaba zamanje zezibonelelo, kanye nesiqondiso somzila osemthethweni ukuze ungaphazamisi amahlebezi ngomzila wokwesekwa wangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/is-the-youth-grant-real\n• /claim-checker\n• /eligibility-checker\n• /grants\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe inani elikhulu lenza imali yesibonelelo sikahulumeni yentsha ikholeleke kakhulu?",
        "body": "Cha. Inani elikhulu lingenza isimangalo sizizwe siphuthuma kakhulu, kodwa sisadinga umthombo othembekile osemthethweni ngemuva kwaso."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngithembe ikhasi elinikeza isicelo sentsha sika-R12500?",
        "body": "Hhayi kuze kube yilapho uqinisekisa ukuthi umzila usemthethweni futhi isibonelelo ngokwaso singokoqobo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa nekhasi lenganekwane lesibonelelo sentsha, izigaba zesibonelelo sangempela, kanye nesiqondiso somzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "is-the-r1370-grant-real": {
    "title": "Ingabe isibonelelo sika-R1370 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zezibonelelo zesibonelelo sika-R1370, amakhasi ezicelo, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zezibonelelo zesibonelelo sika-R1370 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi lesi sibonelelo singokoqobo ngoba ikhasi lengeza imininingwane mayelana nezicelo, ukufaneleka, noma izinsuku zokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kuka-R1370 kuvela kubasebenzisi abazama ukuqinisekisa isimangalo, hhayi emzileni ozinzile osemthethweni wesibonelelo. Amanye amakhasi azama ukwenza isimangalo sizwakale sithembekile ngokungeza isicelo, ukufaneleka, noma ulimi lokukhokha oluzwakala njengokuphatha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi angu-R1370 angakha ithemba elingamanga, asunduze abasebenzisi kumafomu angaphephile, noma enze isimangalo esikopishiwe sizizwe sisemthethweni kakhulu kunalokho esiyikho ngempela. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi behlise ijubane ngaphambi kokuthi bathembe indaba."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sika-R1370 njengesingakaqinisekiswa.\n2. Ungaphathi isicelo, ukufaneleka, noma amagama okukhokha njengobufakazi ngokwakho.\n3. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n4. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zamanje zesibonelelo sangempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Imininingwane eyengeziwe isengahlala phezu kwesimangalo esibuthakathaka",
        "body": "Ikhasi lingazwakala likholeka uma linikeza imininingwane yokufaneleka noma yesicelo, kodwa leyo mininingwane ibalulekile kuphela uma isibonelelo ngokwaso singokoqobo futhi umzila usemthethweni ngokusobala."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, izicelo ezisemthethweni, nesiqondiso sokukhokha esisemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zika-R1370 namanani amanje esibonelelo sikahulumeni, imikhuba ephephile yokufunda amakhasi, kanye neziqondiso zomzila osemthethweni ukuze ungaphutheli amahemuhemu anemininingwane ngesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r1370-grant-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe amagama okufaneleka afakazela ukuthi isibonelelo sika-R1370 singokoqobo?",
        "body": "Cha. Ukufaneleka kwamagama kungenza isimangalo sizwakale sisemthethweni, kodwa sisadinga umthombo othembekile osemthethweni ngemuva kwaso."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe ikhasi elithi izicelo zika-R1370 zivuliwe?",
        "body": "Hhayi kuze kube yilapho uqinisekisa ukuthi umzila usemthethweni futhi isibonelelo ngokwaso singokoqobo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, izigaba zesibonelelo sangempela, neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "is-the-r2315-grant-real": {
    "title": "Ingabe isibonelelo sika-R2315 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zezibonelelo zesibonelelo sika-R2315, amakhasi osuku lokukhokha, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zezibonelelo zesibonelelo sika-R2315 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi imali yesibonelelo ingokoqobo ngoba ikhasi lihlanganisa inani nezinsuku zokukhokha noma ishejuli yokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kuka-R2315 kuvela kubasebenzisi abazama ukuqinisekisa isimangalo, hhayi emzileni ozinzile wesibonelelo sikahulumeni. Amanye amakhasi azama ukwenza isimangalo sizizwe simisiwe ngokugxumela ngqo ezinsukwini zokukhokha noma ohlelweni lokukhokha ngaphambi kokuqinisekisa ukuthi isibonelelo sikahulumeni ngokwaso."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi angu-R2315 angadala okulindelwe okungamanga mayelana nesikhathi noma imali futhi angase adonsele abasebenzisi emizileni engaphephile elingisa amakhasi okukhokha asemthethweni. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi bayeke ngaphambi kokuthi bathembe isimangalo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sika-R2315 njengesingakaqinisekiswa kuqala.\n2. Ungathathi izinsuku zokukhokha noma uhlele amagama njengobufakazi ngokwabo.\n3. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n4. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zamanje zesibonelelo sangempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Ishejuli yokukhokha ingenza isimangalo esingumgunyathi sizizwe sixazululiwe",
        "body": "Uma ikhasi ligxumela kumadethi namashejuli, lingenza ukuthi isibonelelo sizwakale sesivele sisunguliwe. Ukuhlola okuphephile kusese ukuthi umzila, umthombo, nesigaba sesibonelelo sisemthethweni ngokusobala futhi esamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, izinsuku zokukhokha ezisemthethweni, nokuqinisekiswa kokukhokha okusemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zika-R2315 namanani amanje esibonelelo sikahulumeni, isiqondiso sosuku lokukhokha, kanye namasheke omzila osemthethweni ukuze ungaphutheli amahemuhemu esitayela seshejuli wesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /payment-dates\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-understand-payment-dates\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe izinsuku zokukhokha zifakazela ukuthi isibonelelo sika-R2315 singokoqobo?",
        "body": "Cha. Izinsuku ezifunwayo noma amashejuli asadinga umzila osemthethweni othembekile kanye nesigaba sangempela sesibonelelo esisemva kwawo."
      },
      {
        "title": "I-FAQ: Kungani amakhasi esitayela seshejuli kulula ukwethemba?",
        "body": "Ngoba ishejuli yenza isimangalo sizizwe njengokuphatha futhi sixazululiwe ngisho nalapho umthombo ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, izigaba zesibonelelo sangempela, neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "is-the-r3070-grant-real": {
    "title": "Ingabe isibonelelo sika-R3070 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezimangalo zesibonelelo sikahulumeni ezingu-R3070, amaposi wohlu, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zezibonelelo zesibonelelo sika-R3070 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi imali yesibonelelo ingokoqobo ngoba ikhasi lengeza izinhlu, iziqu, noma amagama okukhokha azungeze inani."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kuka-R3070 kuvela kubasebenzisi abazama ukuqinisekisa isimangalo, hhayi emzileni ozinzile osemthethweni wesibonelelo. Amanye amakhasi azama ukwenza isimangalo sizwakale sisemthethweni kakhulu ngokuxuba inani nezinhlu, iziqu, noma amanothi okukhokha azwakala ethize."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi angu-R3070 angadala ithemba elingamanga, amoshe isikhathi, noma acindezele abasebenzisi ukuthi bangene emakhasini angaphephile alingisa isiqondiso sangempela sesibonelelo. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi bayeke ngaphambi kokuthi bathembe isimangalo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sika-R3070 njengesingakaqinisekiswa kuqala.\n2. Ungaphathi indlela yohlu noma amagama eziqu njengobufakazi ngokwawo.\n3. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n4. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zamanje zesibonelelo sangempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Imininingwane yesitayela sohlu ingenza isimangalo esibuthakathaka sizwakale sihlelekile",
        "body": "Amanye amakhasi azizwa ekhuthaza ngoba engeza izinhlu noma amanothi okufaneleka. Leso sakhiwo esengeziwe asikafakazi ukuthi isibonelelo sikhona. Ukuhlola kwangempela umthombo, umzila, kanye nesigaba sangempela sesibonelelo esingemva kwesimangalo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, amanani asemthethweni, nokufaneleka okusemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zika-R3070 namanani amanje esibonelelo sikahulumeni, imikhuba ephephile yokufunda amakhasi, kanye neziqondiso zomzila osemthethweni ukuze ungaphazamisi amahlebezi ahlelekile ngesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /guides/what-r3070-grant-searches-usually-mean\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe iziqu noma izinhlu zifakazela ukuthi isibonelelo sika-R3070 singokoqobo?",
        "body": "Cha. Imininingwane ehleliwe ingenza isimangalo sizwakale sihlelekile, kodwa basadinga umthombo othembekile osemthethweni ngemuva kwabo."
      },
      {
        "title": "I-FAQ: Kungani amakhasi esitayela sohlu kulula ukwethemba ngokushesha kakhulu?",
        "body": "Ngoba isakhiwo singenza isimangalo sizizwe sihlelekile ngisho nalapho umzila ubuthakathaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, izigaba zesibonelelo sangempela, neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "is-the-r530-grant-real": {
    "title": "Ingabe isibonelelo sika-R530 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zesibonelelo sikahulumeni ezingama-R530, amakhasi emininingwane, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zezibonelelo zesibonelelo sika-R530 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi imali yesibonelelo ingokoqobo ngoba ikhasi lengeza imininingwane mayelana nokufaneleka, inkokhelo, noma iziqu."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kuka-R530 kuvela kubasebenzisi abazama ukuqinisekisa isimangalo, hhayi emzileni ozinzile osemthethweni wesibonelelo. Amanye amakhasi azama ukwenza isimangalo sizwakale sinokwethenjelwa kakhulu ngokwengeza imininingwane emayelana nokufaneleka, inkokhelo, noma iziqu ezizwakala zisebenza futhi ziqondile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi angama-R530 angakha ithemba elingamanga, afake abasebenzisi kuzixhumanisi ezingaphephile, noma enze isimangalo sesamba esikopishiwe sizizwe sisemthethweni kakhulu kunalokho esiyikho ngempela. Ikhasi eliqondile lokuqamba izinganekwane lisiza abasebenzisi ukuthi behlise ijubane ngaphambi kokuthi bathembe indaba."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isimangalo sika-R530 njengesingakaqinisekiswa kuqala.\n2. Ungaphathi ukufaneleka, inkokhelo, noma amagama afaneleka njengobufakazi ngokwakho.\n3. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n4. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zamanje zesibonelelo sangempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Imininingwane esebenzayo isengakhelwa esicelweni semali mbumbulu",
        "body": "Ikhasi lingazwakala liwusizo ngoba linikeza iziqu, amanothi okukhokha, noma imininingwane eyengeziwe. Lokho kusizakala kusebuthakathaka uma isibonelelo ngokwaso singakafakazelwa ngokucacile ngomzila osemthethweni nomthombo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, amanani asemthethweni, nokufaneleka okusemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izimangalo zika-R530 namanani amanje esibonelelo sikahulumeni, imikhuba ephephile yokufunda amakhasi, kanye neziqondiso zomzila osemthethweni ukuze ungaphutheli amahemuhemu anemininingwane ngesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-tell-grant-amount-pages-from-rumours\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ukufaneleka noma amagama okukhokha afakazela ukuthi isibonelelo sika-R530 singokoqobo?",
        "body": "Cha. Leyo mininingwane ingenza isimangalo sizwakale siwusizo, kodwa basadinga umthombo othembekile osisekelayo."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani amakhasi emininingwane enza izicelo zama-R530 zizizwe zikholeka?",
        "body": "Ngoba imininingwane eyengeziwe ingenza isimangalo sizizwe siwusizo futhi ngenxa yalokho sisemthethweni kakhulu kunalokho esiyikho ngempela."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, izigaba zesibonelelo sangempela, neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "is-the-r1500-grocery-grant-real": {
    "title": "Ingabe isibonelelo segrosa sika-R1500 singokoqobo?",
    "summary": "Umhlahlandlela oqondile wabasebenzisi abafuna impendulo ecacile mayelana nezicelo zesibonelelo segrosa zika-R1500, amakhasi okuxhasa igrosa, kanye nokuthi isibonelelo esifunwayo singokoqobo yini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Phatha izicelo zesibonelelo segrosa zika-R1500 njengezingaqinisekisiwe ngaphandle uma umthombo ocacile osemthethweni uzisekela. Ungacabangi ukuthi isimangalo singokoqobo ngoba ikhasi lisebenzisa amagama osizo lwegrosa azwakala aphuthuma noma asebenzayo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuningi kwesibonelelo segilosa kuka-R1500 kuvela kubasebenzisi abasabela kokuthunyelwe komphakathi noma amakhasi akopishiwe axuba inani elithile namagama asekela igrosa. Leyo nhlanganisela ingenza isimangalo sizizwe sisebenza futhi sishesha ngisho nalapho ungekho umzila osemthethweni ocacile ngemuva kwakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi e-R1500 esibonelelo segrosa angadala ithemba elingamanga, acindezele abasebenzisi kuzixhumanisi ezingaphephile, noma enze inzwabethi ekopishiwe izwakale ikholeka kakhulu ngoba izwakala iboshelwe ekusekelweni kokudla esikhundleni sesithembiso sokukhokha esijwayelekile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isicelo sesibonelelo segrosa sika-R1500 njengesingakaqinisekiswa kuqala.\n2. Ungaphathi amagama okusiza egrosa njengobufakazi ngokwawo.\n3. Hlola ukuthi ikhasi likhomba yini emzileni osemthethweni wangempela.\n4. Qhathanisa isimangalo namanani amanje esibonelelo sikahulumeni kanye nezigaba zamanje zesibonelelo sangempela.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi ikhasi liyisiqondiso, amahemuhemu, noma umzila womgunyathi oyingozi."
      },
      {
        "title": "Amagama asekelayo asebenzayo angenza isimangalo esingumgunyathi sizizwe sinozwela",
        "body": "Ikhasi lingazizwa liqiniseka uma lixhuma inani lokudla noma usizo lwegrosa. Lokho kudonswa kwemizwa namanje akufakazeli ukuthi isibonelelo sikhona. Ukuhlola okuphephile umzila, umthombo, kanye nesigaba sangempela sokusekela ngemuva kwesimangalo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zesibonelelo sikahulumeni ezingaqinisekisiwe noma ishicilele izibonelelo ezingamanga njengezisemthethweni. Izibonelelo ezisemthethweni, amanani asemthethweni, nemizila yokwesekwa esemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqhathanise izimangalo zegrosa zika-R1500 namanani amanje esibonelelo sikahulumeni, imikhuba ephephile yokufunda amakhasi, kanye neziqondiso zomzila osemthethweni ukuze ungaphazami amahlebezi azwakalayo njengesibonelelo sangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grant-amounts\n• /claim-checker\n• /guides/how-to-avoid-fake-grant-amount-pages\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe amagama asekela igrosa afakazela ukuthi isibonelelo sika-R1500 singokoqobo?",
        "body": "Cha. Amagama awusizo asekelayo angenza isimangalo sizwakale njengozwela, kodwa sisadinga umthombo othembekile osekelwe kuso."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani amakhasi egilosa ka-R1500 ezwakala akholeka?",
        "body": "Ngoba baxhuma inani elithile esidingweni sansuku zonke, okwenza isimangalo sizizwe siphuthuma futhi siwusizo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise isimangalo nayo kuqala?",
        "body": "Qhathanisa namanani amanje esibonelelo, izigaba zesibonelelo sangempela, neziqondiso zomzila osemthethweni ngaphambi kokuyethemba."
      }
    ]
  },
  "what-beneficiary-detail-update-searches-usually-mean": {
    "title": "Ukuthi ukusesha kwemininingwane yabahlomuli ngokuvamile kusho ukuthini",
    "summary": "Umhlahlandlela osebenzayo osesho lwemininingwane yabahlomulayo kanye nendlela yokubhekana nayo ngaphandle kokudida izinguquko zerekhodi elivamile nezicelo ezingaphephile zezinkampani zangaphandle.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kwemininingwane yabahlomuli ngokuvamile kusho ukuthi abasebenzisi bafuna ukushintsha noma ukuqinisekisa amarekhodi asemthethweni. Umkhuba ophephe kakhulu ukusebenzisa umzila osemthethweni kuphela ukuze uthole isibuyekezo sangempela futhi ugweme ukwabelana ngemininingwane ngamakhasi angacacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kokubuyekeza irekhodi kungase kuhlobane nemininingwane yokuxhumana, imininingwane yokukhokha, noma olunye ushintsho olusemthethweni lwephrofayela. Okubalulekile wukugcina isibuyekezo ngokwaso kumzila osemthethweni futhi ungavumeli amakhasi adidayo ahlale phakathi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bekhathazekile ngezinsuku zokugcina noma ngezinkinga zokukhokha, bangase babelane ngemininingwane ngokushesha kakhulu kunoma yiliphi ikhasi elithembisa ukusiza ukuzibuyekeza."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi iyiphi imininingwane yabahlomuli okufanele uyibuyekeze.\n2. Thola umzila wokubuyekeza osemthethweni olungile waleyo mininingwane.\n3. Gwema ukufaka imininingwane ekhasini elikhuluma kuphela ngezibuyekezo ngaphandle kokuqinisekisa umzila.\n4. Londoloza noma isiphi isiqinisekiso esisemthethweni ngemva koshintsho.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuqonda ukuthi hlobo luni lomzila wokubuyekeza oyidingayo ngempela."
      },
      {
        "title": "Umzila wokubuyekeza ubaluleke kakhulu njengemininingwane",
        "body": "Ushintsho lwemininingwane luphephe kakhulu uma abasebenzisi bazi kahle ukuthi bashintsha ini nokuthi yimuphi umzila osemthethweni osiphethe. Amakhasi okubuyekeza angacacile yilapho amaphutha avame ukuqala khona."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayilona uhlelo olusemthethweni lokubuyekeza imininingwane yabahlomuli. Isiza abasebenzisi baqonde umsebenzi futhi bafinyelele umzila osemthethweni olungile ngokuphepha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlukanise ifoni, ibhange, ukuqinisekiswa, nezibuyekezo zamarekhodi avamile ukuze ungaqageli ukuthi yimuphi umzila ongawusebenzisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/how-banking-details-updates-work\n• /guides/how-to-check-if-a-deadline-notice-is-official\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-find-official-contact-details-safely"
      },
      {
        "title": "I-FAQ: Kungani kufanele nginqume imininingwane eqondile kuqala?",
        "body": "Ngoba izinguquko zemininingwane ehlukene zingasebenzisa imizila esemthethweni ehlukene."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe ikhasi elithi kuphela isibuyekezo lapha?",
        "body": "Cha. Qinisekisa umzila nomsebenzi kuqala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyilondoloze ngemva kokubuyekeza imininingwane?",
        "body": "Londoloza ukuqinisekiswa okusemthethweni noma irekhodi loshintsho."
      }
    ]
  },
  "what-double-payment-rumours-usually-mean": {
    "title": "Okuvame ukusho amahemuhemu okukhokha kabili",
    "summary": "Umchazi ozolile kumahemuhemu okukhokha kabili nokuthi kungani abasebenzisi kufanele bawaphathe njengezimangalo zokuqinisekisa, hhayi njengezindaba zokukhokha eziqinisekisiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Amahemuhemu okukhokha kabili ngokuvamile asho ukuthi abasebenzisi basabela ezimangalweni ezabiwe mayelana nezinkokhelo ezengeziwe. Isinyathelo esiphephe kunazo zonke siwukuthatha lezo zimangalo njengezingaqinisekisiwe kuze kube yilapho umthombo ocacile osemthethweni uzisekela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amahemuhemu mayelana nezinkokhelo ezimbili asabalale ngoba azwakala ejabulisa futhi ephuthumayo. Lokho kubenza babelane kakhulu ngisho nalapho ubufakazi babo bubuthakathaka."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bangashintsha izinhlelo, bakhulise okulindelekile, noma bachofoze izixhumanisi ezingaphephile uma becabanga ukuthi amahlebezi kufanele abe yiqiniso."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha isimangalo sokukhokha kabili njengesingaqinisekisiwe kuqala.\n2. Hlola umthombo osemthethweni ocacile.\n3. Gwema ukwethemba izithombe-skrini, okuthunyelwe okunqanyuliwe, noma uhlu lwabahlomulayo ngokwazo.\n4. Qhathanisa isimangalo nedethi yokukhokha efanele kanye namakhasi okuhlola isibuyekezo.\n5. Sebenzisa i-GrantCare ukufunda amahlebezi ngokucophelela ngaphambi kokuthatha isinyathelo ngawo."
      },
      {
        "title": "Amahemuhemu enkokhelo eyengeziwe asakazeka ngokushesha kunezincazelo",
        "body": "Ukudonswa ngokomzwelo kwesimangalo senkokhelo ephindwe kabili yingakho nje abasebenzisi bedinga umkhuba ohamba kancane, wokuqala wokufunda umthombo lapho bewubona."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayishicileli izithembiso zokukhokha ezingamanga noma yethule amahlebezi njengezimemezelo zokukhokha ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise okuthunyelwe okukhokha kabili nezinsuku zokukhokha, imikhuba yokubuyekeza esemthethweni, nezindlela eziphephile zokufunda amakhasi ngaphambi kokuthi uzethembe."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /claim-checker\n• /guides/how-to-check-if-a-double-payment-update-is-real\n• /guides/what-to-do-if-you-see-a-double-grant-payment-post\n• /guides/how-to-understand-payment-dates\n• /payment-dates\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani amahlebezi okukhokha kabili eheha kangaka?",
        "body": "Ngoba ahlanganisa ukuphuthuma, ithemba, kanye nesimangalo esilula okulula ukwabelana ngaso."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola ukuthi isimangalo sikhomba emthonjeni osemthethweni ocacile."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngethembe isithombe esabiwe sohlu lwezinkokhelo?",
        "body": "Cha. Uhlu noma isithombe sisadinga umthombo othembekile ngemuva kwakho."
      }
    ]
  },
  "how-to-check-if-a-double-payment-update-is-real": {
    "title": "Ungahlola kanjani ukuthi isibuyekezo sokukhokha kabili singokoqobo",
    "summary": "Umhlahlandlela wokuthembana wabasebenzisi ababona izibuyekezo zenkokhelo eyengeziwe futhi abafuna indlela ephephile yokuyiqinisekisa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola ukuthi isibuyekezo sokukhokha kabili singokoqobo yini ngokufuna umthombo osemthethweni ocacile, ukuwufanisa nesigaba esilungile sesibonelelo, futhi ugweme izimangalo ezithembele kuphela kuzithombe-skrini noma imilayezo yeqembu."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Izibuyekezo zokukhokha kabili ngokuvamile zizwakala ziphuthuma kunezindaba zokukhokha ezivamile. Lokho kuphuthuma yingakho ukuhlola umthombo kubaluleke kakhulu kunokujwayelekile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma isibuyekezo singalungile, abasebenzisi bangakha okulindelwe ngemali engakaze iqinisekiswe ngokucacile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka umthombo osemthethweni ocacile.\n2. Qondanisa isibuyekezo nesigaba esiqondile sesibonelelo.\n3. Hlola ukuthi isikhathi sisezwakala yini.\n4. Qaphela ngezithombe-skrini nokuthunyelwe okudluliselwe phambili.\n5. Sebenzisa i-GrantCare uma udinga usizo lokunquma ukuthi isibuyekezo singamahemuhemu kuphela."
      },
      {
        "title": "Isibuyekezo siqine njengomthombo waso kuphela",
        "body": "Isimangalo senkokhelo emangalisayo singazwakala sinamandla kunalokho esiyikho ngempela. Ukuhlola kwangempela ukuthi umthombo, isigaba sesibonelelo, kanye nesikhathi konke kuhamba ngokusobala."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza amahlebezi okukhokha, kodwa isiqinisekiso sokukhokha esisemthethweni siseseziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise isibuyekezo nemihlahlandlela yedethi yokukhokha, imikhuba ephephile yokufunda isibuyekezo, nokuhlola umzila osemthethweni ukuze ukuqinisekise ngokuzola."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-double-payment-rumours-usually-mean\n• /claim-checker\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-read-payment-notes-on-date-pages\n• /guides/where-to-find-official-updates-safely\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Iluphi uphawu oluqine kakhulu lokuthi isibuyekezo asinamandla?",
        "body": "Uphawu oluqine kakhulu yilapho luthembele kuphela kusithombe-skrini noma umlayezo odluliselwe ngaphandle komthombo osemthethweni ocacile."
      },
      {
        "title": "I-FAQ: Kungani isigaba sesibonelelo sibalulekile lapha?",
        "body": "Ngoba isimangalo senkokhelo singaba iphutha ngisho noma sizwakala sizwakala sisonke."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngihlele mayelana nesibuyekezo ngokushesha?",
        "body": "Kuphephe kakhudlwana ukuqinisekisa umthombo kuqala ngaphambi kokushintsha izinhlelo."
      }
    ]
  },
  "what-to-do-if-you-see-a-double-grant-payment-post": {
    "title": "Okufanele ukwenze uma ubona iposi lokukhokha kabili isibonelelo",
    "summary": "Umhlahlandlela osebenzayo wesinyathelo esilandelayo wabasebenzisi abahlangabezana nokuthunyelwe okukhokhelwa kabili futhi abafuna ukuphendula ngokucophelela esikhundleni sokusabela ngokucabangayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ubona iposi lokukhokha izibonelelo ezimbili, ungakuphathi njengokuqinisekisiwe ngaso leso sikhathi. Londoloza okuthunyelwe uma kudingeka, hlola umthombo, futhi uwuqhathanise nezibuyekezo ezisemthethweni ngaphambi kokuthi ukukholelwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Okuthunyelwe okukhokhelwa kabili kuvame ukwabiwa ngoba kuqashelwa ngokushesha. Lokho akukwenzi kube ngamanga ngokuzenzekelayo, kodwa kusho ukuthi abasebenzisi kufanele baqaphele ngokuyethemba ngokushesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukusabela ngokushesha kungaholela ekulindelweni okungamanga noma ekulandeleni izixhumanisi ezaklanyelwe ukusizakala ngelukuluku nokuphuthuma."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Misa isikhashana ngaphambi kokwabelana noma ukwethemba okuthunyelwe.\n2. Hlola ukuthi okuthunyelwe kuxhumene yini nomthombo osemthethweni ocacile.\n3. Qhathanisa isimangalo nedethi yokukhokha yamanje kanye namakhasi okubuyekeza.\n4. Gwema ukuchofoza izixhumanisi eziphuthumayo ozizwa ungazazi.\n5. Sebenzisa i-GrantCare uma ufuna usizo lokuqonda ukuthi okuthunyelwe kusabukeka kubuthakathaka noma ukwethembeka."
      },
      {
        "title": "Ukumisa isikhashana isinyathelo sokuqala esiphephe kunazo zonke",
        "body": "Into ephephe kakhulu mayelana nokuthunyelwe okukhokhelwa kabili akulona ulwazi olungaphakathi kwakho. Yisikhathi lapho umsebenzisi emisa khona ngaphambi kokuthatha isinyathelo. Lokho kuphumula kuvikela ezingozini eziningi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiqinisekisi izimangalo zokukhokha kabili njengezimemezelo ezisemthethweni. Isiza abasebenzisi ukuthi bafunde lezo zimangalo ngokuphepha kakhulu."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke kokuthunyelwe komphakathi uye edethithini efanele yokukhokha kanye nemihlahlandlela yokuhlola isibuyekezo ukuze uthembele kancane kokuthunyelwe ngokwako."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-double-payment-rumours-usually-mean\n• /guides/how-to-check-if-a-double-payment-update-is-real\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-understand-payment-dates\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngabelane ngokuthunyelwe ngokushesha?",
        "body": "Cha. Hlola umthombo kuqala."
      },
      {
        "title": "I-FAQ: Kuthiwani uma okuthunyelwe kuzwakala kuphuthuma kakhulu?",
        "body": "Phatha ukuphuthuma njengesizathu sokwehlisa ijubane futhi uqinisekise isimangalo ngokucophelela."
      },
      {
        "title": "I-FAQ: Kufanele ngiqhathanise nani okuthunyelwe?",
        "body": "Iqhathanise nemizila yokubuyekeza ethembekile kanye neziqondiso zedethi yokukhokha."
      }
    ]
  },
  "what-grant-suspension-searches-usually-mean": {
    "title": "Ukuthi usesho lokumiswa kwesibonelelo luvame ukusho ukuthini",
    "summary": "Umchazi ozolile osesho lokumiswa kwesibonelelo sikahulumeni kanye nendlela yokubona umehluko phakathi kokwesaba, ulimi oluyisixwayiso, kanye nesenzo esisemthethweni esiqinisekisiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Nikeza ukusesha ukumiswa ngokuvamile kusho ukuthi abasebenzisi bakhathazekile ngokuthi isibonelelo singama noma sibuyekezwe. Isinyathelo esiphephe kunazo zonke siwukufunda amagama angempela ngokucophelela futhi uqinisekise ukuthi udaba luwumlayezo wangempela osemthethweni noma amahemuhemu kuphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ulimi lokumiswa luzwakala lubucayi, ngakho ngisho nezimangalo ezingacacile zingadala ukwesaba ngokushesha. Kungakho abasebenzisi badinga indlela ecacile yokuhlukanisa amagama asemthethweni nokwethuka komphakathi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Usesho olusekelwe ekwesabeni lungaholela abasebenzisi ukuthi bathembe amakhasi angaphephile noma basabele ngokweqile ngaphambi kokuba babe nolwazi olwanele ukuze bazi ukuthi umlayezo usho ukuthini ngempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Londoloza amagama aqondile abangele ukukhathazeka.\n2. Hlola ukuthi iphuma emzileni osemthethweni ocacile.\n3. Hlukanisa amagama asemthethweni aqondile namahemuhemu noma okuthunyelwe okwabiwe.\n4. Qhathanisa neziqondiso eziphephile zokufunda ukumiswa.\n5. Sebenzisa izindlela zokulandelela ezisemthethweni uma amagama adinga isenzo ngokusobala."
      },
      {
        "title": "Ukwesaba ukumiswa kukhula ngokushesha lapho amagama angacacile",
        "body": "Indlela engcono kakhulu yokunciphisa ukwethuka ukugxila emazwini aqondile kanye nomthombo oqondile. Iningi lokudideka mayelana nokumiswa kwesikhashana liqala lapho abasebenzisi besebenza ngekhanda noma amahlebezi esikhundleni somlayezo wangempela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingachaza amagama ahlobene nokumiswa, kodwa ukuqinisekiswa okusemthethweni nezinyathelo ezilandelayo ezisemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise ulimi lokumiswa okwesikhashana nezaziso zomnqamulajuqu, amagama abuyekeziwe, neziqondiso zomzila wokuxhumana ukuze wazi ukuthi ingabe inkinga isadinga incazelo noma ukulandelela kwangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /claim-checker\n• /guides/how-to-read-grant-suspension-wording-safely\n• /guides/how-to-check-if-a-suspension-warning-is-official\n• /guides/what-to-do-if-you-fear-your-grant-is-suspended\n• /guides/how-to-find-official-contact-details-safely\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani amagama amisiwe azwakala ethusa kangaka?",
        "body": "Ngoba kuzwakala kubucayi futhi kungathinta umuzwa wokuphepha womsebenzisi ngokushesha."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola amagama aqondile nokuthi avele emzileni osemthethweni ocacile yini."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe okuthunyelwe komphakathi mayelana nokumiswa?",
        "body": "Cha. Qinisekisa umthombo osemthethweni kuqala."
      }
    ]
  },
  "how-to-read-grant-suspension-wording-safely": {
    "title": "Ungawafunda kanjani amagama okumiswa kwesibonelelo sikahulumeni ngokuphepha",
    "summary": "Umhlahlandlela osebenzayo wokufunda imilayezo yesitayela sokumiswa ngokucophelela ukuze abasebenzisi bangaphuthelwa izexwayiso, ukubuyekezwa, nezenzo eziqinisekisiwe zento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Funda amagama amisiwe ngokuphepha ngokusebenzisa umlayezo oqondile, hhayi inkumbulo, futhi ngokubheka ukuthi akhomba yini ekubuyekezeni, isexwayiso, umnqamulajuqu, noma isenzo esisemthethweni esiqinisekisiwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amagama amisiwe ngokuvamile ahlala eduze kweminye imilayezo enemisindo engathi sína. Kungakho ukufunda umusho okuyiwonawona kubaluleke kakhulu lapha kunokunye ukusesha okuningi kwesibonelelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi abacindezela umlayezo ube igama elilodwa elithusayo bangaphuthelwa umehluko phakathi kwesixwayiso nesinyathelo sokugcina esisemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Gcina amagama aqondile.\n2. Funda ukuthi umlayezo uyisixwayiso, isibuyekezo, isicelo, noma isenzo esiqinisekisiwe.\n3. Hlola ukuthi kunamathiselwe umnqamulajuqu noma imininingwane esekelayo.\n4. Qhathanisa umlayezo nomhlahlandlela ofanele we-GrantCare.\n5. Sebenzisa imigudu esemthethweni uma amagama acela isenzo ngokusobala."
      },
      {
        "title": "Ibinzana eliqondile lingashintsha incazelo kakhulu",
        "body": "Ulimi lwesitayela sokumiswa ngokuvamile luzwakala lufana lapho uqala nje, kodwa umehluko omncane wamagama ungashintsha ngokuphelele lokho umsebenzisi okufanele akwenze ngokulandelayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza amaphethini wamagama kodwa ayishintshi iziteshi ezisemthethweni zokuqinisekisa noma isenzo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi bahlukanise ukumiswa okwesikhashana, umnqamulajuqu, ukubuyekezwa, nolimi lokuqinisekisa ukuze bangaphenduli enkingeni engalungile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-grant-suspension-searches-usually-mean\n• /guides/how-to-check-if-a-suspension-warning-is-official\n• /guides/what-id-and-kyc-deadline-searches-usually-mean\n• /guides/what-to-do-if-you-fear-your-grant-is-suspended\n• /guides/how-to-find-official-contact-details-safely"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngigcine amagama aqondile?",
        "body": "Ngoba umusho oqondile ungakutshela ukuthi inkinga iyisexwayiso, isibuyekezo, noma isenzo esisemthethweni esiqinisekisiwe."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma igama lisabonakala libucayi kakhulu ukuthi ungahlulela ngomoya ophansi?",
        "body": "Sebenzisa umhlahlandlela wamagama kanye nomthombo osemthethweni ndawonye esikhundleni sokuthembela enkumbulweni."
      },
      {
        "title": "I-FAQ: Kufanele ngenze nini?",
        "body": "Thatha isenzo lapho amagama asemthethweni acela ngokusobala isinyathelo esilandelayo kunokuqagela nje esicelweni esingacacile."
      }
    ]
  },
  "how-to-check-if-a-suspension-warning-is-official": {
    "title": "Ungabheka kanjani ukuthi isexwayiso sokumiswa sisemthethweni",
    "summary": "Umhlahlandlela wokuthembana wokuqinisekisa izexwayiso zokumiswa ngaphambi kokuthi abasebenzisi bethuke noma baphendule umzila ongalungile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola ukuthi isixwayiso sokumiswa sisemthethweni yini ngokuqinisekisa umthombo, umzila, kanye namagama aqondile ngaphambi kokuthi usiphathe njengesaziso sesenzo sangempela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Izexwayiso zokumiswa zingavela emilayezweni, kokuthunyelwe, noma emakhasini azwakala aphuthuma. Lokho kuphuthuma yingakho nje abasebenzisi bedinga ukuhlola komthombo okuqinile ngaphambi kokuthi bakholwe isexwayiso."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma isexwayiso singelona iqiniso noma sihlanekezelwe, abasebenzisi bangamosha isikhathi, babelane ngemininingwane ngokungaphephile, noma bathathe isinyathelo esilandelayo esingalungile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi isixwayiso sivelaphi.\n2. Bheka ukuthi ingabe ikhomba umzila osemthethweni ocacile.\n3. Gcina amagama aqondile nanoma yiluphi usuku olunamathiselwe.\n4. Gwema ukuchofoza izixhumanisi eziphuthumayo ezingawubonisi ngokucacile umzila.\n5. Sebenzisa ukuxhumana okusemthethweni noma imizila yesimo uma isexwayiso sisabukeka singokoqobo ngemva kokuhlola."
      },
      {
        "title": "Ukuphuthuma yilapho ukuhlola umthombo kubaluleke kakhulu",
        "body": "Uma isixwayiso siphuthuma kakhulu, abasebenzisi kufanele behlise ijubane futhi bahlole umthombo esikhundleni sokusabela ekusabeni esikudalayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza abasebenzisi ukuthi bahlole izexwayiso, kodwa ukuqinisekiswa okusemthethweni kwezindaba ezihlobene nokumiswa kuseseziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqhathanise izexwayiso zokumiswa namagama okubuyekeza, izaziso zomnqamulajuqu, neziqondiso zokuxhumana ukuze ungaphenduli ngokunganaki."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-grant-suspension-searches-usually-mean\n• /claim-checker\n• /guides/how-to-read-grant-suspension-wording-safely\n• /guides/what-id-and-kyc-deadline-searches-usually-mean\n• /guides/how-to-find-official-contact-details-safely\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani izixwayiso zokumiswa kulula ukuzethemba ngokushesha okukhulu?",
        "body": "Ngoba zidala ukwesaba nokuphuthuma, okungacindezela abasebenzisi ukuthi beqe ukuqinisekiswa."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyonge kuqala?",
        "body": "Londoloza isixwayiso esiqondile kanye nanoma iyiphi idethi enamathiselwe kuso."
      },
      {
        "title": "I-FAQ: Kuthiwani uma isexwayiso sisabukeka singokoqobo ngemva kokusihlola?",
        "body": "Yiya emzileni osemthethweni olungile ukuze uthole ukuqinisekiswa noma isinyathelo esilandelayo esidingekayo."
      }
    ]
  },
  "what-to-do-if-you-fear-your-grant-is-suspended": {
    "title": "Okufanele ukwenze uma wesaba ukuthi isibonelelo sikahulumeni siyamiswa",
    "summary": "Umhlahlandlela wesinyathelo esilandelayo ozolile wabasebenzisi abesaba izimangalo zokumiswa futhi abadinga indlela ecacile yokuphendula.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma wesaba ukuthi isibonelelo sakho sizomiswa, qala ngokulondoloza amagama, uhlole umthombo, futhi uthole ukuthi umlayezo uyisaziso sangempela esisemthethweni noma inzwabethi ngaphambi kokwenza noma yini enye."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukwesaba ukumiswa kungase kuvele emagameni asemthethweni, umlayezo, okuthunyelwe, noma ngisho namahemuhemu abiwe omunye umuntu. Impendulo ephephe kunazo zonke iwukusuka ekwesabeni uye emaqinisweni ngokushesha ngangokunokwenzeka."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukwenza ngokwesaba kukodwa kungacindezela abasebenzisi kuzixhumanisi ezimbi, ekucabangeni okungalungile, noma ukwabelana okungaphephile kwemininingwane yomuntu siqu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Gcina amagama noma umyalezo obangele ukwesaba.\n2. Hlola ukuthi iphuma emzileni osemthethweni ocacile.\n3. Qhathanisa neziqondiso ezifanele zokumiswa kanye nomnqamulajuqu.\n4. Qoqa noma imaphi amarekhodi noma imininingwane exhumene nodaba.\n5. Sebenzisa iziteshi ezisemthethweni uma umlayezo ngokusobala udinga ukulandelelwa kwangempela."
      },
      {
        "title": "Susa ukwesaba uye emlayezo oqondile",
        "body": "Indlela eshesha kakhulu yokudambisa inkinga ukuyeka ukusebenza ekubeni wedwa bese uqala ukusebenza ngokusuka emazwini aqondile, umthombo oqondile, kanye nesicelo sesinyathelo esilandelayo uma sikhona."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiyena umenzi wezinqumo osemthethweni ezindabeni zokumiswa. Isiza abasebenzisi ukuchaza isimo ngokucace kakhudlwana ngaphambi kokuba benze okuthile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi baqonde ukuthi ingabe inkinga ibukeka njengomnqamulajuqu, isibuyekezo, udaba lokuqinisekisa, noma isenzo esisemthethweni esiqondile esidinga ukulandelelwa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-grant-suspension-searches-usually-mean\n• /guides/how-to-read-grant-suspension-wording-safely\n• /guides/how-to-check-if-a-suspension-warning-is-official\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-keep-records-of-payment-problems"
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze kuqala uma ngizwa ukwesaba?",
        "body": "Londoloza amagama futhi uhlole umthombo ngaphambi kokwenza noma yini enye."
      },
      {
        "title": "I-FAQ: Kungani kungafanele ngithathe isinyathelo ngenxa yokwesaba ngedwa?",
        "body": "Ngoba ukwesaba kungenza amakhasi angaphephile futhi izimangalo ezibuthakathaka zizizwe zithembeke kakhulu kunalokho eziyikho."
      },
      {
        "title": "I-FAQ: Yini esiza ngemva kokulondoloza amagama?",
        "body": "Qhathanisa nomhlahlandlela ofanele kanye nomzila osemthethweni ofanele ngaphambi kokuthi usabele ngokuqhubekayo."
      }
    ]
  },
  "what-id-and-kyc-deadline-searches-usually-mean": {
    "title": "Lokho okuvamise ukusho i-ID kanye nosesho lomnqamulajuqu lwe-KYC",
    "summary": "Umhlahlandlela osebenzayo wokubuyekeza i-ID kanye nosesho lomnqamulajuqu lwe-KYC nokuthi uzifunda kanjani izimangalo zomnqamulajuqu ngokuphepha ngaphandle kokusabela ngokweqile ezixwayiso ezingacacile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kwe-ID kanye nomnqamulajuqu we-KYC ngokuvamile kusho ukuthi abasebenzisi bakhathazekile ngesibuyekezo serekhodi noma umnqamulajuqu wokuqinisekisa. Umnyakazo ophephe kakhulu ukuhlola amagama aqondile kanye nomthombo ngaphambi kokuphatha umnqamulajuqu njengomyalelo osemthethweni oqinisekisiwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ulimi lomnqamulajuqu lungabhekisela ezintweni ezihlukene: ukuqinisekiswa kwe-ID, ukubuyekezwa kwesitayela se-KYC, izinguquko zamakhadi, noma esinye isinyathelo esihlobene nerekhodi. Kungakho abasebenzisi kumele baqonde ukuthi umnqamulajuqu umayelana nani ngaphambi kokuthi bathathe isinyathelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Isaziso somnqamulajuqu esingacacile singadala ukwethuka, kodwa impendulo efanele incike ekutheni umlayezo ungokoqobo, owamanje, futhi uxhumeke ngokucacile yini esimweni somsebenzisi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Londoloza amagama aqondile omnqamulajuqu.\n2. Thola ukuthi umnqamulajuqu umayelana nani ngempela.\n3. Hlola ukuthi umthombo usemthethweni ngokusobala yini.\n4. Gwema ukusebenzisa amakhasi ezinkampani zangaphandle ukuze uphathe isibuyekezo.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuhumusha umlayezo womnqamulajuqu ube isinyathelo esilandelayo esiphephile."
      },
      {
        "title": "Umnqamulajuqu uwusizo kuphela uma umsebenzi ucacile",
        "body": "Abasebenzisi bavame ukugxila osukwini futhi bakhohlwe ukukhomba umsebenzi ongemuva kwayo. Ukufunda okuphephile kuqala ngokubuza ukuthi umnqamulajuqu ukucela ukuthi wenzeni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingachaza amagama omnqamulajuqu, kodwa ukuqinisekiswa okusemthethweni nezibuyekezo zamarekhodi ezisemthethweni kusengezamizila esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlukanise i-ID, i-KYC, ikhadi, nosesho lwesibuyekezo semininingwane yabahlomulayo ukuze wazi ukuthi yimuphi umzila osemthethweni onengqondo ngesixwayiso osibonile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /claim-checker\n• /guides/how-to-check-if-a-deadline-notice-is-official\n• /guides/what-gold-card-and-card-deadline-searches-usually-mean\n• /guides/what-beneficiary-detail-update-searches-usually-mean\n• /guides/how-to-find-official-contact-details-safely\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani ukusesha komnqamulajuqu kungazwakala kudida kakhulu kunokusebenziseka?",
        "body": "Ngoba umnqamulajuqu uvame ukuzwakala uphuthumayo ngaphambi kokuba umsebenzi wangempela ngemuva kwawo ucace."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyibone kuqala?",
        "body": "Thola ukuthi yini umnqamulajuqu ekucela ukuthi uyibuyekeze, uqinisekise, noma uyibuyekeze."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise ikhasi lenkampani yangaphandle ukuze ngiyilungise ngokushesha?",
        "body": "Cha. Sebenzisa umzila osemthethweni olungile kunalokho."
      }
    ]
  },
  "how-to-check-if-a-deadline-notice-is-official": {
    "title": "Ungasibheka kanjani ukuthi isaziso somnqamulajuqu sisemthethweni",
    "summary": "Umhlahlandlela wokuthembana wabasebenzisi ababona izaziso zomnqamulajuqu ezihlobene nesibonelelo futhi abafuna ukugwema izexwayiso ezingamanga noma amaqhinga okucindezela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola ukuthi isaziso somnqamulajuqu sisemthethweni yini ngokuqinisekisa umthombo, umzila, umsebenzi ohilelekile, kanye nokuthi amagama ahambisana kahle yini nenqubo esemthethweni yangempela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Izaziso zomnqamulajuqu zidala ingcindezi, futhi ingcindezi ngokuvamile yenza izimangalo ezibuthakathaka zizizwe zinamandla kunalokho eziyikho ngempela. Yingakho ukuhlola umthombo kubaluleke kakhulu ngemilayezo yomnqamulajuqu."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Umnqamulajuqu womgunyathi noma ongacacile ungacindezela abasebenzisi ukuthi bazibuyekeze ngokushesha, amakhasi angaphephile, noma ukwesaba okungadingekile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Gcina isaziso esiqondile.\n2. Bheka ukuthi isaziso sivelaphi.\n3. Khomba umsebenzi umnqamulajuqu obhekise kuwo.\n4. Gwema ukwenza izixhumanisi ezingacacile noma izithombe ezinqanyuliwe.\n5. Sebenzisa imizila esemthethweni uma isaziso sisabukeka singokoqobo ngemva kokuhlolwa ngokucophelela."
      },
      {
        "title": "Ingcindezi iyingxenye yokuthi kungani izaziso zomnqamulajuqu zisebenza",
        "body": "Ingozi enkulu ngezaziso zomnqamulajuqu akuwona amagama kuphela. Yingcindezi edalwa yisaziso. Lokho kucindezela yikho okwenza isheke elihamba kancane, lokuqala lomthombo libaluleke kangaka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza ekuhloleni izaziso zomnqamulajuqu, kodwa ukuqinisekiswa kokugcina nesenzo esisemthethweni kusengezashaneli ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqhathanise izaziso zomnqamulajuqu nezibuyekezo zerekhodi, izinguquko zekhadi, izexwayiso zokumiswa okwesikhashana, neziqondiso zomzila wokuxhumana ukuze inkinga izwakale kulula ukuyihlukanisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-id-and-kyc-deadline-searches-usually-mean\n• /claim-checker\n• /guides/what-gold-card-and-card-deadline-searches-usually-mean\n• /guides/what-beneficiary-detail-update-searches-usually-mean\n• /guides/how-to-check-if-a-suspension-warning-is-official\n• /guides/how-to-find-official-contact-details-safely"
      },
      {
        "title": "I-FAQ: Kungani izaziso zomnqamulajuqu kulula ukuzethemba ngokushesha okukhulu?",
        "body": "Ngoba kudala ukuphuthuma nokwesaba ukuphuthelwa okuthile okubalulekile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyonge kuqala?",
        "body": "Gcina amagama aqondile kanye nomthombo wesaziso kuqala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngigweme ukuyenza?",
        "body": "Gwema ukuchofoza izixhumanisi ezisheshayo noma ukwenza ezithombeni ezisikiwe ngaphandle komzila ocacile osemthethweni ngemuva kwazo."
      }
    ]
  },
  "what-gold-card-and-card-deadline-searches-usually-mean": {
    "title": "Lokho okushiwo ukusesha kwekhadi legolide nomnqamulajuqu wekhadi ngokuvamile",
    "summary": "Igayidi yolimi olulula ekhadini legolide, ikhadi elimnyama, ukushintshwa, kanye nosesho losuku lomnqamulajuqu lwekhadi nokuthi ungalufunda kanjani ngokuphephile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lwekhadi legolide kanye nosuku lomnqamulajuqu lwekhadi ngokuvamile lusho ukuthi abasebenzisi bazama ukuqinisekisa ukuthi ukuguqulwa kwekhadi noma umnqamulajuqu uyasebenza yini kubo ngempela. Umnyakazo ophephe kakhulu ukuhlola isaziso esisemthethweni esiqondile futhi unganciki ekuthunyelweni komphakathi kuphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuhlobene namakhadi kuvame ukuba nokuphuthuma ngoba kuthinta ukufinyelela, ubunikazi, noma ukuzethemba kwenkokhelo. Lokho kuphuthuma kungenza okuthunyelwe okungacacile kuzizwe kunamandla kunalokho okuyikho ngempela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma umlayezo wekhadi ungaqondakali, abasebenzisi bangase bahambe ngokungadingekile, baphuthe umsebenzi wangempela, noma bathembe umzila ongalungile ukuze uthole izibuyekezo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Gcina umlayezo noma isaziso esihlobene ngqo nekhadi.\n2. Hlola ukuthi iphuma emzileni osemthethweni ocacile.\n3. Thola ukuthi ingabe inkinga imayelana nokumiselela, umnqamulajuqu, noma izindaba ezijwayelekile zokubuyekeza.\n4. Gwema ukuthembela ezithombeni-skrini ezabiwe ezingenamthombo.\n5. Sebenzisa ukuthintana okusemthethweni noma ubuyekeze imizila uma isaziso sisabonakala siyiqiniso."
      },
      {
        "title": "Imilayezo yekhadi izwakala isebenza, kodwa isadinga ukuqinisekiswa",
        "body": "Ngenxa yokuthi izaziso ezihambisana namakhadi zizwakala ziphathekayo, abasebenzisi bangase bazithembe ngokushesha okukhulu. Umkhuba ophephile uwukuqinisekisa umzila ngaphambi kokwenza izinhlelo mayelana nesaziso."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayilona uhlelo olusemthethweni lokushintsha ikhadi noma uhlelo olusemthethweni lokubuyekeza ikhadi. Isiza abasebenzisi ukuthi bafunde izimangalo ezihlobene nekhadi ngokuphepha kakhulu."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uhumushele ukusesha okuhlobene namakhadi koxhumana naye osemthethweni olungile noma ubuyekeze umzila futhi ugcine amahlebezi ehlukene nezaziso zangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-if-a-deadline-notice-is-official\n• /guides/what-id-and-kyc-deadline-searches-usually-mean\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani ukusesha komnqamulajuqu wekhadi kuzwakala kuphuthuma kangaka?",
        "body": "Ngoba abasebenzisi bahlobanisa izinguquko zekhadi nokufinyelela ekusekelweni nasekuvikelekeni kwenkokhelo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe isithombe-skrini somnqamulajuqu wekhadi ngokwaso?",
        "body": "Cha. Hlola ukuthi ingabe iphuma emzileni osemthethweni ocacile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyibone kuqala?",
        "body": "Khomba ukuthi ingabe isaziso simayelana nokushintshwa, umnqamulajuqu, noma umsebenzi ohlukile ohlobene nekhadi."
      }
    ]
  }
};

function withZuTranslations<
  T extends {
    slug: string;
    title: string;
    summary: string;
    sections: Array<{ title: string; body: string }>;
    translations?: Record<string, unknown>;
  },
>(guide: T, translation: GuideTranslation) {
  return {
    ...guide,
    translations: {
      ...(guide.translations ?? {}),
      zu: translation,
    },
  };
}

export const SEO_BATCH_FOURTEEN_GUIDES = SEO_BATCH_FOURTEEN_GUIDES_SOURCE.map((guide) =>
  addSetswanaTranslations(withZuTranslations(guide, ZU_TRANSLATIONS[guide.slug])),
);
