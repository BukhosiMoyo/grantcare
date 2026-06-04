import type { Locale } from "@/lib/site";
import { toGeneratedSetswanaText, toGeneratedXhosaText } from "./generated-guide-translations";

type HomeCopy = {
  account: string;
  alreadyHaveAccount: string;
  admin: string;
  archiveCardText: string;
  archiveTitle: string;
  authorLabel: string;
  checkDates: string;
  checkPaymentDates: string;
  checkStatus: string;
  chooseStatus: string;
  commonFixes: string;
  commonQuestionsTitle: string;
  commonStatusMeaningsTitle: string;
  copyLink: string;
  createAccount: string;
  dashboard: string;
  disclaimer: string;
  documents: string;
  eligibility: string;
  eligibilityChecker: string;
  eligibilityIntro: string;
  eligibilityResultsNote: string;
  eligibilityTitle: string;
  emailLabel: string;
  emailRemindersTitle: string;
  enableReminders: string;
  explore: string;
  faq: string;
  forgotPassword: string;
  forgotPasswordTitle: string;
  frequentlyAskedQuestionsTitle: string;
  generalGuidance: string;
  grantTypeLabel: string;
  grantTypesTitle: string;
  guideLabel: string;
  guideLibraryTitle: string;
  guides: string;
  help: string;
  helpfulOffersTitle: string;
  heroBody: string;
  heroTitle: string;
  homeStepOne: string;
  homeStepTwo: string;
  homeStepThree: string;
  homepageEligibilityText: string;
  homepagePaymentText: string;
  homepageReminderText: string;
  homepageStatusText: string;
  howItWorks: string;
  language: string;
  lastUpdated: string;
  latestDates: string;
  latestPublishedPaymentDate: string;
  latestScheduleSlots: string;
  likelyMatch: string;
  meaningLabel: string;
  monthLabel: string;
  monthlyPaymentSchedule: string;
  moreMonthsText: string;
  moreMonthsTitle: string;
  morePaymentDatesText: string;
  morePaymentDatesTitle: string;
  myDashboard: string;
  nameLabel: string;
  nextSteps: string;
  news: string;
  noPreference: string;
  noSavedGuides: string;
  notice: string;
  notifyMe: string;
  officialLink: string;
  officialLinks: string;
  officialNextStep: string;
  officialNotice: string;
  onPublishReminder: string;
  oneDayBefore: string;
  open: string;
  openDashboard: string;
  otherGrantsTitle: string;
  paymentDates: string;
  paymentEstimate: string;
  paymentPending: string;
  paymentPortalOnly: string;
  paymentScheduleIntro: string;
  summaryAmountLabel: string;
  summaryMonthLabel: string;
  summaryPayDayLabel: string;
  summarySeePaymentDates: string;
  possibleCauses: string;
  confirmPasswordLabel: string;
  preferredGrant: string;
  privacy: string;
  profileTitle: string;
  popularTools: string;
  passwordLabel: string;
  readGuide: string;
  readGuides: string;
  relatedGuidesTitle: string;
  relatedStatusesTitle: string;
  reminders: string;
  reminderSettingsText: string;
  removeSavedGuide: string;
  needAccount: string;
  saveDate: string;
  savedGuidesTitle: string;
  saveGuide: string;
  saveProfile: string;
  saveReminders: string;
  saveResult: string;
  share: string;
  shareGuide: string;
  setPreferredGrantPrompt: string;
  showLabel: string;
  signIn: string;
  signingIn: string;
  signOut: string;
  authUnavailable: string;
  accountExists: string;
  backToSignIn: string;
  invalidCredentials: string;
  passwordResetSent: string;
  passwordResetUpdated: string;
  requestAnotherReset: string;
  resetPassword: string;
  resetPasswordInvalid: string;
  resetPasswordTitle: string;
  resettingPassword: string;
  sendResetLink: string;
  sendingResetLink: string;
  sponsoredTitle: string;
  startAgain: string;
  statusHelp: string;
  statusLabel: string;
  statusListTitle: string;
  statusMeanings: string;
  statusToolIntro: string;
  tableOfContents: string;
  thisGrant: string;
  twoDaysBefore: string;
  unsubscribeEyebrow: string;
  unsubscribeInvalidText: string;
  unsubscribeInvalidTitle: string;
  unsubscribeStoppedSuffix: string;
  unsubscribeStoppedTitle: string;
  viewMonth: string;
  whoItMayFit: string;
  creatingAccount: string;
};

const ENGLISH_COPY: HomeCopy = {
  account: "Account",
  alreadyHaveAccount: "Already have an account?",
  admin: "Admin",
  archiveCardText: "Open the month view and choose a grant category.",
  archiveTitle: "Archive",
  authorLabel: "Author",
  checkDates: "Check dates",
  checkPaymentDates: "Check payment dates",
  checkStatus: "Check status meanings",
  chooseStatus: "Choose a status",
  commonFixes: "Common fixes",
  commonQuestionsTitle: "Common questions",
  commonStatusMeaningsTitle: "Common status meanings",
  copyLink: "Copy link",
  createAccount: "Create account",
  dashboard: "Dashboard",
  disclaimer:
    "GrantCare is independent and not affiliated with SASSA or the South African government.",
  documents: "Documents",
  eligibility: "Eligibility",
  eligibilityChecker: "Eligibility checker",
  eligibilityIntro:
    "Answer a few short questions. This tool offers general guidance only and does not promise approval.",
  eligibilityResultsNote:
    "General guidance only. Approval depends on the official rules and review.",
  eligibilityTitle: "Grant guidance checker",
  emailLabel: "Email",
  emailRemindersTitle: "Email reminders",
  enableReminders: "Enable reminders",
  explore: "Explore",
  faq: "FAQ",
  forgotPassword: "Forgot password?",
  forgotPasswordTitle: "Forgot password",
  frequentlyAskedQuestionsTitle: "Frequently asked questions",
  generalGuidance: "General guidance only",
  grantTypeLabel: "Grant type",
  grantTypesTitle: "Grant types",
  guideLabel: "Guide",
  guideLibraryTitle: "Guide library",
  guides: "Guides",
  help: "Help",
  helpfulOffersTitle: "Helpful offers",
  heroBody: "Independent help for South African grant questions.",
  heroTitle: "Payment dates, status help, and next steps.",
  homeStepOne: "Choose a tool or guide that fits your needs.",
  homeStepTwo: "Get clear, simple answers and payment dates instantly.",
  homeStepThree: "Follow the official links provided to take action.",
  homepageEligibilityText: "Answer a few short questions.",
  homepagePaymentText: "Find the month and grant category.",
  homepageReminderText: "Save what matters on your dashboard.",
  homepageStatusText: "Match the wording and see the next step.",
  howItWorks: "How it works",
  language: "Language",
  lastUpdated: "Last updated",
  latestDates: "Latest payment dates",
  latestPublishedPaymentDate: "Latest published payment date for your preferred grant type.",
  latestScheduleSlots: "Latest schedule slots",
  likelyMatch: "Likely match",
  meaningLabel: "Meaning",
  monthLabel: "Month",
  monthlyPaymentSchedule: "Monthly payment schedule",
  moreMonthsText: "Open the payment archive for the selected month.",
  moreMonthsTitle: "More months",
  morePaymentDatesText: "Open payment categories for the selected month.",
  morePaymentDatesTitle: "More payment dates",
  myDashboard: "My dashboard",
  nameLabel: "Name",
  nextSteps: "Next steps",
  news: "News",
  noPreference: "No preference",
  noSavedGuides: "No saved guides yet.",
  notice: "Notice",
  notifyMe: "Notify me",
  officialLink: "Official link",
  officialLinks: "Official links",
  officialNextStep: "Official next step",
  officialNotice:
    "GrantCare is independent and not affiliated with SASSA or the South African government. Use official channels for applications, appeals, and official checks.",
  onPublishReminder: "When a new payment date is published",
  oneDayBefore: "1 day before payment",
  open: "Open",
  openDashboard: "Open dashboard",
  otherGrantsTitle: "Other grants",
  paymentDates: "Payment dates",
  paymentEstimate: "Date confirmed",
  paymentPending: "Date not out yet",
  paymentPortalOnly: "SRD date varies by person",
  paymentScheduleIntro:
    "Choose a month and a grant. If the pay day is not out yet, it will say so clearly.",
  summaryAmountLabel: "How much you get",
  summaryMonthLabel: "Upcoming month",
  summaryPayDayLabel: "Pay day",
  summarySeePaymentDates: "See payment dates page",
  passwordLabel: "Password",
  possibleCauses: "Possible causes",
  confirmPasswordLabel: "Confirm password",
  preferredGrant: "Preferred grant",
  privacy: "Privacy",
  profileTitle: "Profile",
  popularTools: "Popular tools",
  readGuide: "Read guide",
  readGuides: "Read guides",
  relatedGuidesTitle: "Related guides",
  relatedStatusesTitle: "Related statuses",
  reminders: "Reminders",
  reminderSettingsText: "Email reminder settings for this payment category.",
  removeSavedGuide: "Remove saved guide",
  needAccount: "Need an account?",
  saveDate: "Save this date",
  savedGuidesTitle: "Saved guides",
  saveGuide: "Save guide",
  saveProfile: "Save profile",
  saveReminders: "Save reminders",
  saveResult: "Save result",
  share: "Share",
  shareGuide: "Share guide",
  setPreferredGrantPrompt: "Set a preferred grant to see the latest matching payment dates.",
  showLabel: "Show",
  signIn: "Sign in",
  signingIn: "Signing in",
  signOut: "Sign out",
  authUnavailable: "Account access is not available right now.",
  accountExists: "An account with that email already exists.",
  backToSignIn: "Back to sign in",
  invalidCredentials: "Email or password is not correct.",
  passwordResetSent: "If an account exists for that email, a reset link has been prepared.",
  passwordResetUpdated: "Your password has been updated. You can sign in now.",
  requestAnotherReset: "Request another link",
  resetPassword: "Reset password",
  resetPasswordInvalid: "This reset link is missing, expired, or already used.",
  resetPasswordTitle: "Choose a new password",
  resettingPassword: "Saving password",
  sendResetLink: "Send reset link",
  sendingResetLink: "Sending link",
  sponsoredTitle: "Sponsored",
  startAgain: "Start again",
  statusHelp: "Status help",
  statusLabel: "Status",
  statusListTitle: "Status list",
  statusMeanings: "Status meanings",
  statusToolIntro:
    "This tool explains common wording and possible next steps. It is not an official status checker.",
  tableOfContents: "Table of contents",
  thisGrant: "This grant",
  twoDaysBefore: "2 days before payment",
  unsubscribeEyebrow: "Reminders",
  unsubscribeInvalidText: "This unsubscribe link is missing or no longer valid.",
  unsubscribeInvalidTitle: "Link not available",
  unsubscribeStoppedSuffix: "will no longer send email reminders.",
  unsubscribeStoppedTitle: "Email reminders stopped",
  viewMonth: "View month",
  whoItMayFit: "Who it may fit",
  creatingAccount: "Creating account",
};

const SETSWANA_COPY = Object.fromEntries(
  Object.entries(ENGLISH_COPY).map(([key, value]) => [key, toGeneratedSetswanaText(value)]),
) as HomeCopy;

const XHOSA_COPY = Object.fromEntries(
  Object.entries(ENGLISH_COPY).map(([key, value]) => [key, toGeneratedXhosaText(value)]),
) as HomeCopy;

export const COPY: Record<Locale, Partial<HomeCopy>> = {
  en: ENGLISH_COPY,
  zu: {
    account: "I-akhawunti",
    alreadyHaveAccount: "Usunayo i-akhawunti?",
    admin: "Umphathi",
    archiveCardText: "Vula ukubuka kwenyanga bese ukhetha isigaba sesibonelelo.",
    archiveTitle: "Ingobo yomlando",
    authorLabel: "Umbhali",
    checkDates: "Hlola izinsuku",
    checkPaymentDates: "Hlola izinsuku zokukhokha",
    checkStatus: "Hlola izincazelo zesimo",
    chooseStatus: "Khetha isimo",
    commonFixes: "Ukulungisa okuvamile",
    commonQuestionsTitle: "Imibuzo ejwayelekile",
    commonStatusMeaningsTitle: "Izincazelo zesimo ezivamile",
    copyLink: "Kopisha isixhumanisi",
    createAccount: "Dala i-akhawunti",
    dashboard: "Ideshibhodi",
    disclaimer:
      "I-GrantCare izimele. Izicelo ezisemthethweni nokuhlolwa kwesimo kuhlala kwizinhlelo zikahulumeni.",
    documents: "Imibhalo",
    eligibility: "Ukufaneleka",
    eligibilityChecker: "Isihloli sokufaneleka",
    eligibilityIntro:
      "Phendula imibuzo embalwa emfushane. Leli thuluzi linikeza isiqondiso esijwayelekile kuphela futhi alithembisi ukuvunywa.",
    eligibilityResultsNote:
      "Isiqondiso esijwayelekile kuphela. Ukuvunywa kuncike emithethweni esemthethweni nasekubuyekezweni.",
    eligibilityTitle: "Isihloli sesiqondiso sesibonelelo",
    emailLabel: "I-imeyili",
    emailRemindersTitle: "Izikhumbuzi ze-imeyili",
    enableReminders: "Vula izikhumbuzi",
    explore: "Hlola",
    faq: "Imibuzo ejwayelekile",
    forgotPassword: "Ukhohlwe iphasiwedi?",
    forgotPasswordTitle: "Ukhohlwe iphasiwedi",
    frequentlyAskedQuestionsTitle: "Imibuzo evame ukubuzwa",
    generalGuidance: "Isiqondiso esijwayelekile kuphela",
    grantTypeLabel: "Uhlobo lwesibonelelo",
    grantTypesTitle: "Izinhlobo zezibonelelo",
    guideLabel: "Umhlahlandlela",
    guideLibraryTitle: "Ilabhulali yemihlahlandlela",
    guides: "Imihlahlandlela",
    help: "Usizo",
    news: "Izindaba",
    helpfulOffersTitle: "Okuwusizo okukhokhelwe",
    heroBody: "Usizo oluzimele ngemibuzo yezibonelelo zaseNingizimu Afrika.",
    heroTitle: "Izinsuku zokukhokha, usizo lwesimo, nezinyathelo ezilandelayo.",
    homeStepOne: "Khetha ithuluzi.",
    homeStepTwo: "Funda umphumela omfishane.",
    homeStepThree: "Sebenzisa isixhumanisi esisemthethweni lapho kudingeka isenzo esisemthethweni.",
    homepageEligibilityText: "Phendula imibuzo embalwa emfushane.",
    homepagePaymentText: "Thola inyanga nohlobo lwesibonelelo.",
    homepageReminderText: "Londoloza okubalulekile kudeshibhodi yakho.",
    homepageStatusText: "Qhathanisa amagama bese ubona isinyathelo esilandelayo.",
    howItWorks: "Isebenza kanjani",
    language: "Ulimi",
    lastUpdated: "Kubuyekezwe okokugcina",
    latestDates: "Izinsuku zakamuva",
    latestPublishedPaymentDate:
      "Usuku lwakamuva lokukhokha olushicilelwe lohlobo lwesibonelelo olukhethile.",
    latestScheduleSlots: "Izikhala zohlelo zakamuva",
    likelyMatch: "Okungenzeka kufane",
    meaningLabel: "Incazelo",
    monthLabel: "Inyanga",
    monthlyPaymentSchedule: "Uhlelo lwenkokhelo lwenyanga",
    moreMonthsText: "Vula ingobo yomlando yokukhokha yenyanga ekhethiwe.",
    moreMonthsTitle: "Izinyanga ezengeziwe",
    morePaymentDatesText: "Vula izigaba zokukhokha zenyanga ekhethiwe.",
    morePaymentDatesTitle: "Izinsuku zokukhokha ezengeziwe",
    myDashboard: "Ideshibhodi yami",
    nameLabel: "Igama",
    nextSteps: "Izinyathelo ezilandelayo",
    noPreference: "Akukho okukhethwayo",
    noSavedGuides: "Ayikho imihlahlandlela egciniwe okwamanje.",
    notice: "Isaziso",
    notifyMe: "Ngazise",
    officialLink: "Isixhumanisi esisemthethweni",
    officialLinks: "Izixhumanisi ezisemthethweni",
    officialNextStep: "Isinyathelo esisemthethweni",
    officialNotice:
      "I-GrantCare izimele futhi ayihlangene ne-SASSA noma uhulumeni waseNingizimu Afrika. Sebenzisa iziteshi ezisemthethweni ngezicelo, izikhalazo, nokuhlolwa okusemthethweni.",
    onPublishReminder: "Lapho kushicilelwa usuku olusha lokukhokha",
    oneDayBefore: "Usuku olu-1 ngaphambi kokukhokha",
    open: "Vula",
    openDashboard: "Vula ideshibhodi",
    otherGrantsTitle: "Ezinye izibonelelo",
    paymentDates: "Izinsuku zokukhokha",
    paymentEstimate: "Usuku luqinisekisiwe",
    paymentPending: "Usuku alukaphumi okwamanje",
    paymentPortalOnly: "Usuku lwe-SRD luyahlukahluka ngomuntu",
    paymentScheduleIntro:
      "Khetha inyanga nesibonelelo. Uma usuku lokukhokha lungakaphumi, kuzovezwa ngokucacile.",
    summaryAmountLabel: "Imali oyitholayo",
    summaryMonthLabel: "Inyanga ezayo",
    summaryPayDayLabel: "Usuku lokukhokha",
    summarySeePaymentDates: "Bona ikhasi lezinsuku zokukhokha",
    possibleCauses: "Izimbangela ezingaba khona",
    confirmPasswordLabel: "Qinisekisa iphasiwedi",
    preferredGrant: "Isibonelelo osikhethayo",
    privacy: "Ubumfihlo",
    popularTools: "Amathuluzi adumile",
    passwordLabel: "Iphasiwedi",
    profileTitle: "Iphrofayili",
    readGuide: "Funda umhlahlandlela",
    readGuides: "Funda imihlahlandlela",
    relatedGuidesTitle: "Imihlahlandlela ehambisanayo",
    relatedStatusesTitle: "Izimo ezihambisanayo",
    reminders: "Izikhumbuzi",
    reminderSettingsText: "Izilungiselelo zezikhumbuzi ze-imeyili zalesi sigaba sokukhokha.",
    removeSavedGuide: "Susa umhlahlandlela ogciniwe",
    needAccount: "Udinga i-akhawunti?",
    saveDate: "Londoloza lolu suku",
    savedGuidesTitle: "Imihlahlandlela egciniwe",
    saveGuide: "Londoloza umhlahlandlela",
    saveProfile: "Londoloza iphrofayili",
    saveReminders: "Londoloza izikhumbuzi",
    saveResult: "Londoloza umphumela",
    share: "Yabelana",
    shareGuide: "Yabelana ngomhlahlandlela",
    setPreferredGrantPrompt:
      "Setha isibonelelo osikhethayo ukuze ubone izinsuku zakamuva zokukhokha ezihambisanayo.",
    showLabel: "Bonisa",
    signIn: "Ngena",
    signingIn: "Kuyangena",
    signOut: "Phuma",
    authUnavailable: "Ukufinyelela ku-akhawunti akutholakali manje.",
    accountExists: "I-akhawunti enaleyo imeyili isivele ikhona.",
    backToSignIn: "Buyela ekungeneni",
    invalidCredentials: "I-imeyili noma iphasiwedi ayilungile.",
    passwordResetSent:
      "Uma i-akhawunti ikhona kuleyo imeyili, isixhumanisi sokusetha kabusha silungisiwe.",
    passwordResetUpdated: "Iphasiwedi yakho ibuyekeziwe. Ungangena manje.",
    requestAnotherReset: "Cela esinye isixhumanisi",
    resetPassword: "Setha kabusha iphasiwedi",
    resetPasswordInvalid:
      "Lesi sixhumanisi sokusetha kabusha asikho, siphelelwe isikhathi, noma sesisetshenzisiwe.",
    resetPasswordTitle: "Khetha iphasiwedi entsha",
    resettingPassword: "Kulondolozwa iphasiwedi",
    sendResetLink: "Thumela isixhumanisi sokusetha kabusha",
    sendingResetLink: "Kuthunyelwa isixhumanisi",
    sponsoredTitle: "Okuxhasiwe",
    startAgain: "Qala futhi",
    statusHelp: "Usizo lwesimo",
    statusLabel: "Isimo",
    statusListTitle: "Uhlu lwesimo",
    statusMeanings: "Izincazelo zesimo",
    statusToolIntro:
      "Leli thuluzi lichaza amagama avamile nezinyathelo ezilandelayo ezingaba khona. Akusona isihloli sesimo esisemthethweni.",
    tableOfContents: "Okuqukethwe",
    thisGrant: "Lesi sibonelelo",
    twoDaysBefore: "Izinsuku ezi-2 ngaphambi kokukhokha",
    unsubscribeEyebrow: "Izikhumbuzi",
    unsubscribeInvalidText: "Lesi sixhumanisi sokuyeka ukubhalisa asikho noma asisasebenzi.",
    unsubscribeInvalidTitle: "Isixhumanisi asitholakali",
    unsubscribeStoppedSuffix: "ngeke isathumela izikhumbuzi ze-imeyili.",
    unsubscribeStoppedTitle: "Izikhumbuzi ze-imeyili zimisiwe",
    viewMonth: "Buka inyanga",
    whoItMayFit: "Ubani engase imfanele",
    creatingAccount: "Kudalwa i-akhawunti",
  },
  xh: XHOSA_COPY,
  af: {
    admin: "Admin",
    archiveTitle: "Argief",
    commonStatusMeaningsTitle: "Algemene statusbetekenisse",
    createAccount: "Skep rekening",
    dashboard: "Paneel",
    disclaimer:
      "GrantCare is onafhanklik. Amptelike aansoeke en amptelike statuskontroles bly op regeringsstelsels.",
    eligibility: "Geskiktheid",
    emailRemindersTitle: "E-posherinnerings",
    faq: "Vrae",
    grantTypesTitle: "Toelaagtipes",
    guides: "Gidse",
    news: "Nuus",
    helpfulOffersTitle: "Nuttige aanbiedinge",
    heroBody: "Onafhanklike hulp vir Suid-Afrikaanse toelaevrae.",
    heroTitle: "Betaaldatums, statushulp en volgende stappe.",
    homeStepOne: "Kies 'n hulpmiddel.",
    homeStepTwo: "Lees die kort antwoord.",
    homeStepThree: "Gebruik die amptelike skakel vir die amptelike aksie.",
    howItWorks: "Hoe dit werk",
    language: "Taal",
    latestDates: "Nuutste datums",
    likelyMatch: "Waarskynlike pasmaat",
    monthlyPaymentSchedule: "Maandelikse betalingskedule",
    myDashboard: "My paneel",
    notice: "Kennisgewing",
    officialLink: "Amptelike skakel",
    officialLinks: "Amptelike skakels",
    officialNextStep: "Amptelike volgende stap",
    paymentDates: "Betaaldatums",
    popularTools: "Gewilde hulpmiddels",
    profileTitle: "Profiel",
    relatedGuidesTitle: "Verwante gidse",
    relatedStatusesTitle: "Verwante statusse",
    reminders: "Herinnerings",
    saveProfile: "Stoor profiel",
    saveReminders: "Stoor herinnerings",
    savedGuidesTitle: "Gestoorde gidse",
    showLabel: "Wys",
    signIn: "Teken in",
    signOut: "Teken uit",
    sponsoredTitle: "Geborg",
    statusHelp: "Statushulp",
    statusLabel: "Status",
    statusListTitle: "Statuslys",
    statusMeanings: "Statusbetekenisse",
    unsubscribeEyebrow: "Herinnerings",
    unsubscribeInvalidTitle: "Skakel nie beskikbaar nie",
    unsubscribeStoppedTitle: "E-posherinnerings gestop",
    viewMonth: "Bekyk maand",
  },
  nso: {
    dashboard: "Dasheboto",
    eligibility: "Go swanela",
    guides: "Ditaelo",
    news: "Ditaba",
    heroBody: "Thušo ya boikemelo bakeng sa dipotšišo tša dithušo tša Afrika Borwa.",
    heroTitle: "Matšatšikgwedi a tefo, thušo ya maemo, le dikgato tše di latelago.",
    howItWorks: "E šoma bjang",
    language: "Polelo",
    latestDates: "Matšatšikgwedi a moragorago",
    paymentDates: "Matšatšikgwedi a tefo",
    popularTools: "Didirišwa tše di tumilego",
    reminders: "Dikgopotšo",
    statusHelp: "Thušo ya maemo",
    statusMeanings: "Tlhalošo ya maemo",
    viewMonth: "Bona kgwedi",
  },
  tn: SETSWANA_COPY,
};

export function getCopy(locale: Locale): HomeCopy {
  return {
    ...ENGLISH_COPY,
    ...COPY[locale],
  };
}
