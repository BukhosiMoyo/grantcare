import type { PublicGuide } from "./fallback-content";

type Translation = Pick<PublicGuide, "title" | "summary" | "sections">;
const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) => section(`FAQ: ${question}`, answer);

export const setswanaStatusGuides: Record<string, Translation | undefined> = {
  "how-to-use-sassa-status-check-for-r350": {
    title: "O ka tlhola jang maemo a kopo ya gago ya SRD kwa SASSA (R350)?",
    summary: "Bona gore o ka bula kae tsebe ya semmuso ya SASSA, wa tlhola kopo ya gago ya SRD le go tlhaloganya molaetsa o o tlhagang mo sekirining.",
    sections: [
      section("Karabo e khutshwane", "Bula webosaete ya semmuso ya SRD ya SASSA go tlhola kopo ya gago. Fa o bona lefoko “approved” kgotsa “declined”, bala molaetsa otlhe. O ka tlhalosa lebaka la tshwetso kgotsa se o tshwanetseng go se dira morago ga moo.\n• https://srd.sassa.gov.za/"),
      section("Seno se kaya eng?", "Batho ba le bantsi ba sa ntse ba dirisa leina R350 fa ba batla tshedimosetso ka thuso ya SRD. Bula kopo ya gago kwa SASSA mme o tlhole dipholo tsa kgwedi e o batlang go itse ka yone."),
      section("Ke eng se gantsi se tlhakanyang batho tlhogo?", "Go bona tsebe e e siameng le go tlhaloganya dipholo tsa kopo ke dikgato tse pedi. Tlhola kopo ya gago kwa SASSA pele. Fa o sena go bona molaetsa, batla tlhaloso ya mafoko a o sa a tlhaloganyeng."),
      section("Dikgato tse o ka di latelang", "1. Bula webosaete ya SRD ya SASSA.\n2. Tlhola aterese ya webosaete pele ga o tsenya tshedimosetso ya gago.\n3. Bala molaetsa otlhe o o mo sekirining.\n4. Fa go na le lefoko le o sa le tlhaloganyeng, batla tlhaloso ya lone.\n5. Fa o kopiwa go tsaya kgato, latela ditaelo tse di mo tsebeng ya semmuso."),
      section("O ka tlhaloganya jang dipholo tsa gago?", "Fa go kwadilwe “pending”, kopo ya gago e sa ntse e sekasekiwa. “Approved” e kaya gore kopo e amogetswe, mme “declined” e kaya gore e gannwe. Fa o kopiwa go tlhomamisa gore o mang, latela ditaelo tseo. Molaetsa o o buang ka tuelo one o go itsise ka kgato e tuelo e leng mo go yone."),
      section("Se o tshwanetseng go se gakologelwa", "O se ka wa duela motho yo o go solofetsang gore o ka potlakisa kopo ya gago kgotsa a tlhomamisa gore e tla amogelwa. GrantCare e go thusa go tlhaloganya molaetsa. Dirisa ditsela tsa semmuso tsa SASSA fa o tlhoka go dira sengwe ka kopo ya gago."),
      section("O ka bona thuso e nngwe kae?", "Tlhopha kaedi e e tsamaisanang le molaetsa o o o boneng. O ka bala ka kopo e e sa ntseng e sekasekiwa, e e amogetsweng kgotsa e e gannweng, ka matlha a tuelo kgotsa ka go dira boikuelo."),
      section("Dikaedi tse dingwe", "Bala mo go oketsegileng fano:\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-read-your-status-check-result\n• /guides/why-is-my-status-pending\n• /guides/what-does-declined-mean\n• /payment-dates"),
      faq("A R350 ke leina la tsebe ya semmuso?", "Batho ba le bantsi ba batla ka leina R350. Tlhola gore o mo webosaeteng ya SASSA le gore o butse tsebe ya thuso e o e kopileng."),
      faq("A GrantCare e ka ntlholela kopo ya me?", "Nnyaa. GrantCare e tlhalosa melaetsa le dikgato tse o ka di latelang. O bona dipholo tsa kopo ya gago mo webosaeteng ya semmuso ya SASSA."),
      faq("Ke dire eng fa ke batla fela go tlhaloganya molaetsa?", "Bala molaetsa wa gago kwa SASSA pele, go tswa foo o bule kaedi ya GrantCare e e tlhalosang molaetsa oo."),
    ],
  },
  "srd-sassa-gov-za-status-check-guide": {
    title: "O ka tlhola jang kopo ya gago mo go srd.sassa.gov.za?",
    summary: "Ithute go dirisa webosaete ya SRD ya SASSA ka pabalesego le go bona tlhaloso fa mafoko a a mo dipholong tsa kopo ya gago a sa utlwale sentle.",
    sections: [
      section("Karabo e khutshwane", "Bula srd.sassa.gov.za go bona dipholo tsa kopo ya gago ka tlhamalalo kwa SASSA. Fa go na le lefoko le o sa le tlhaloganyeng, o ka dirisa kaedi ya GrantCare go batla tlhaloso ya lone.\n• https://srd.sassa.gov.za/"),
      section("Seno se kaya eng?", "SASSA e go bontsha gore kopo ya gago e mo kgatong efe kgotsa e bontshe tshwetso e e tserweng. Bala molaetsa o o kwadilweng mo kopong ya gago pele o batla tlhaloso."),
      section("SASSA le GrantCare di go thusa jang?", "SASSA e tshola tshedimosetso ya kopo ya gago mme e go bontsha maemo a yone. GrantCare ke kaedi e e ikemetseng e e tlhalosang gore o ka dirisa jang webosaete ya SASSA le gore molaetsa o o boneng o kaya eng."),
      section("Dikgato tse o ka di latelang", "1. Bula webosaete ya SRD ya SASSA.\n2. Tlhola aterese pele ga o tsenya tshedimosetso ya gago.\n3. Bala molaetsa jaaka o kwadilwe.\n4. Fa o batla go o boloka, o kwale kgotsa o boloke setshwantsho sa sekirini mo lefelong le le sireletsegileng.\n5. Batla tlhaloso fa go na le lefoko le o sa le tlhaloganyeng."),
      section("O ka dira eng mo webosaeteng ya SASSA?", "O ka tlhola maemo a kopo ya gago ya SRD le melaetsa e e amanang le yone. Fa SASSA e go kopa go tsaya kgato, latela ditaelo tse o di bonang mo webosaeteng ya yone."),
      section("Se o tshwanetseng go se gakologelwa", "GrantCare ke kaedi e e ikemetseng. Fa o batla go bona gore go na le phetogo mo kopong ya gago, boela kwa webosaeteng ya semmuso ya SRD ya SASSA."),
      section("O ka tlhaloganya molaetsa wa gago jang?", "Fa o sena go tlhola kopo, batla kaedi e e tlhalosang mafoko a o a boneng. Seno se ka go thusa go tlhaloganya kgato e e latelang pele o e tsaya kwa SASSA."),
      section("Dikaedi tse dingwe", "Bala mo go oketsegileng fano:\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-check-your-status\n• /guides/what-the-srd-portal-is-for\n• /status"),
      faq("A eno ke tsebe ya semmuso ya SASSA?", "Nnyaa. Eno ke tsebe ya GrantCare e e tlhalosang gore o ka dirisa jang webosaete ya semmuso ya SASSA ka pabalesego."),
      faq("Kaedi e ka nthusa jang fa ke sena go tlhola kopo?", "Fa mafoko mangwe a a mo karabong ya SASSA a sa utlwale sentle, kaedi e ka go tlhalosetsa bokao jwa one."),
      faq("A nka dirisa webosaete e e ikemetseng go fetola kopo ya me?", "Dirisa webosaete ya semmuso ya SASSA fa o tlhoka go dira sengwe ka kopo ya gago, mme o latele ditaelo tse di mo go yone."),
    ],
  },
};

export const setswanaStatusLinkLabels: Record<string, string | undefined> = {
  "/guides/how-to-check-srd-status-online": "Tlhola maemo a kopo ya gago ya SRD mo inthaneteng",
  "/guides/how-to-read-your-status-check-result": "Bala dipholo tsa kopo ya gago",
  "/guides/why-is-my-status-pending": "Ke eng fa kopo ya me e sa ntse e sekasekiwa?",
  "/guides/what-does-declined-mean": "Go kaya eng fa kopo e gannwe?",
  "/guides/official-status-check-vs-independent-guide": "Pharologanyo fa gare ga webosaete ya SASSA le kaedi e e ikemetseng",
  "/guides/how-to-use-srd-status-check-safely": "Tlhola kopo ya gago ya SRD ka pabalesego",
  "/guides/how-to-check-your-status": "Tsela ya go tlhola maemo a kopo ya gago",
  "/guides/what-the-srd-portal-is-for": "Webosaete ya SRD e dirisediwa eng?",
  "/status": "Bokao jwa melaetsa ya dikopo",
  "/payment-dates": "Matlha a tuelo ya dithuso",
};
