import type { Locale } from "@/lib/site";

type HomeCopy = {
  account: string;
  alreadyHaveAccount: string;
  admin: string;
  archiveCardText: string;
  archiveTitle: string;
  checkDates: string;
  chooseStatus: string;
  commonFixes: string;
  commonQuestionsTitle: string;
  commonStatusMeaningsTitle: string;
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
  checkDates: "Check dates",
  chooseStatus: "Choose a status",
  commonFixes: "Common fixes",
  commonQuestionsTitle: "Common questions",
  commonStatusMeaningsTitle: "Common status meanings",
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
  paymentEstimate: "Date expected",
  paymentPending: "Date not out yet",
  paymentPortalOnly: "Check the official SRD site",
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

export const COPY: Record<Locale, Partial<HomeCopy>> = {
  en: ENGLISH_COPY,
  zu: {
    admin: "Umphathi",
    archiveTitle: "Ingobo yomlando",
    commonStatusMeaningsTitle: "Izincazelo zesimo ezivamile",
    createAccount: "Dala i-akhawunti",
    dashboard: "Ideshibhodi",
    disclaimer:
      "I-GrantCare izimele. Izicelo ezisemthethweni nokuhlolwa kwesimo kuhlala kwizinhlelo zikahulumeni.",
    eligibility: "Ukufaneleka",
    emailRemindersTitle: "Izikhumbuzi ze-imeyili",
    faq: "Imibuzo ejwayelekile",
    grantTypesTitle: "Izinhlobo zezibonelelo",
    guides: "Imihlahlandlela",
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
    latestDates: "Izinsuku zakamuva",
    likelyMatch: "Okungenzeka kufane",
    monthlyPaymentSchedule: "Uhlelo lwenkokhelo lwenyanga",
    myDashboard: "Ideshibhodi yami",
    notice: "Isaziso",
    officialLink: "Isixhumanisi esisemthethweni",
    officialLinks: "Izixhumanisi ezisemthethweni",
    officialNextStep: "Isinyathelo esisemthethweni",
    paymentDates: "Izinsuku zokukhokha",
    popularTools: "Amathuluzi adumile",
    profileTitle: "Iphrofayili",
    relatedGuidesTitle: "Imihlahlandlela ehambisanayo",
    relatedStatusesTitle: "Izimo ezihambisanayo",
    reminders: "Izikhumbuzi",
    saveProfile: "Londoloza iphrofayili",
    saveReminders: "Londoloza izikhumbuzi",
    savedGuidesTitle: "Imihlahlandlela egciniwe",
    showLabel: "Bonisa",
    signIn: "Ngena",
    signOut: "Phuma",
    sponsoredTitle: "Okuxhasiwe",
    statusHelp: "Usizo lwesimo",
    statusLabel: "Isimo",
    statusListTitle: "Uhlu lwesimo",
    statusMeanings: "Izincazelo zesimo",
    unsubscribeEyebrow: "Izikhumbuzi",
    unsubscribeInvalidTitle: "Isixhumanisi asitholakali",
    unsubscribeStoppedTitle: "Izikhumbuzi ze-imeyili zimisiwe",
    viewMonth: "Buka inyanga",
  },
  xh: {
    admin: "Ulawulo",
    archiveTitle: "Uvimba",
    commonStatusMeaningsTitle: "Iintsingiselo zesimo eziqhelekileyo",
    createAccount: "Yenza iakhawunti",
    dashboard: "Ideshibhodi",
    disclaimer:
      "I-GrantCare izimele. Izicelo ezisemthethweni kunye nokuhlolwa kwesimo kuhlala kwiinkqubo zikarhulumente.",
    eligibility: "Ukufaneleka",
    emailRemindersTitle: "Izikhumbuzi ze-imeyile",
    faq: "Imibuzo eqhelekileyo",
    grantTypesTitle: "Iintlobo zezibonelelo",
    guides: "Izikhokelo",
    news: "Iindaba",
    helpfulOffersTitle: "Izibonelelo eziluncedo",
    heroBody: "Uncedo oluzimeleyo ngemibuzo yezibonelelo eMzantsi Afrika.",
    heroTitle: "Imihla yokuhlawula, uncedo lwesimo, namanyathelo alandelayo.",
    homeStepOne: "Khetha isixhobo.",
    homeStepTwo: "Funda impendulo emfutshane.",
    homeStepThree: "Sebenzisa ikhonkco elisemthethweni xa kufuneka isenzo esisemthethweni.",
    howItWorks: "Isebenza njani",
    language: "Ulwimi",
    latestDates: "Imihla yakutshanje",
    likelyMatch: "Olona lulungelelaniso",
    monthlyPaymentSchedule: "Ishedyuli yentlawulo yenyanga",
    myDashboard: "Ideshibhodi yam",
    notice: "Isaziso",
    officialLink: "Ikhonkco elisemthethweni",
    officialLinks: "Amakhonkco asemthethweni",
    officialNextStep: "Inyathelo elisemthethweni",
    paymentDates: "Imihla yokuhlawula",
    popularTools: "Izixhobo ezisetyenziswa kakhulu",
    profileTitle: "Iprofayili",
    relatedGuidesTitle: "Izikhokelo ezinxulumene noko",
    relatedStatusesTitle: "Izimo ezinxulumene noko",
    reminders: "Izikhumbuzi",
    saveProfile: "Gcina iprofayili",
    saveReminders: "Gcina izikhumbuzi",
    savedGuidesTitle: "Izikhokelo ezigciniweyo",
    showLabel: "Bonisa",
    signIn: "Ngena",
    signOut: "Phuma",
    sponsoredTitle: "Ixhasiwe",
    statusHelp: "Uncedo lwesimo",
    statusLabel: "Isimo",
    statusListTitle: "Uluhlu lwesimo",
    statusMeanings: "Iintsingiselo zesimo",
    unsubscribeEyebrow: "Izikhumbuzi",
    unsubscribeInvalidTitle: "Ikhonkco alifumaneki",
    unsubscribeStoppedTitle: "Izikhumbuzi ze-imeyile zimisiwe",
    viewMonth: "Jonga inyanga",
  },
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
  tn: {
    dashboard: "Dashboard",
    eligibility: "Tshwanelo",
    guides: "Ditaelo",
    news: "Ditaba",
    heroBody: "Thuso e e ikemetseng ka dipotso tsa dithuso tsa Aforika Borwa.",
    heroTitle: "Malatsi a tefo, thuso ya maemo, le dikgato tse di latelang.",
    howItWorks: "Go dira jang",
    language: "Puo",
    latestDates: "Malatsi a bosheng",
    paymentDates: "Malatsi a tefo",
    popularTools: "Didirisiwa tse di tumileng",
    reminders: "Dikgopotso",
    statusHelp: "Thuso ya maemo",
    statusMeanings: "Bokao jwa maemo",
    viewMonth: "Bona kgwedi",
  },
};

export function getCopy(locale: Locale): HomeCopy {
  return {
    ...ENGLISH_COPY,
    ...COPY[locale],
  };
}
