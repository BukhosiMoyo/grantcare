import type { PublicGuide } from "./fallback-content";

type Translation = Pick<PublicGuide, "title" | "summary" | "sections">;
const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) => section(`FAQ: ${question}`, answer);

export const isiXhosaStatusGuides: Record<string, Translation | undefined> = {
  "how-to-use-sassa-status-check-for-r350": {
    title: "Usijonga njani isimo sesicelo sakho se-SRD kwaSASSA (R350)?",
    summary: "Fumana iphepha elisemthethweni lakwaSASSA, ujonge isimo sesicelo sakho se-SRD uze ufunde ukuba uthini umyalezo oboniswe kwisikrini.",
    sections: [
      section("Impendulo emfutshane", "Yiya kwiwebhusayithi ye-SRD yakwaSASSA ukuze ujonge isicelo sakho. Xa ubonile ukuba sibhalwe “approved” okanye “declined”, funda umyalezo wonke. Usenokuchaza isizathu sesigqibo okanye inyathelo elilandelayo.\n• https://srd.sassa.gov.za/"),
      section("Kuthetha ukuthini oku?", "Abantu abaninzi basasebenzisa igama elithi R350 xa bekhangela isibonelelo se-SRD. Vula isicelo sakho kwaSASSA uze ufunde umphumo wenyanga ofuna ukuyijonga."),
      section("Yintoni edla ngokubhidanisa abantu?", "Kukho izinto ezimbini onokuzifuna: ukufumana iphepha elibonisa isimo sesicelo sakho nokuqonda umyalezo owufumene apho. Qala ngokujonga isicelo sakho kwaSASSA. Wakuba uwufundile umyalezo, khetha isikhokelo esiwuchazayo."),
      section("Amanyathelo onokuwalandela", "1. Vula iwebhusayithi ye-SRD yakwaSASSA.\n2. Jonga idilesi yewebhusayithi phambi kokufaka iinkcukacha zakho.\n3. Funda umyalezo wonke njengoko uvela kwisikrini.\n4. Ukuba kukho igama ongaliqondiyo, funda ingcaciso yalo.\n5. Ukuba kukho into ekufuneka uyenzile, landela imiyalelo ekwiphepha elisemthethweni."),
      section("Uwufunda njani umphumo?", "Igama elithi “pending” lithetha ukuba isicelo sisaphononongwa. Elithi “approved” lithetha ukuba samkelwe, kanti elithi “declined” lithetha ukuba saliwe. Umyalezo othi qinisekisa ukuba ungubani wahlukile kulowo uthi intlawulo isalungiswa. Funda umyalezo ovela kwisicelo sakho."),
      section("Into omele uyikhumbule", "Musa ukuhlawula umntu othembisa ukukhawulezisa isicelo sakho okanye ukuqinisekisa ukuba siza kwamkelwa. IGrantCare ikunceda uqonde umyalezo. Sebenzisa amajelo asemthethweni akwaSASSA xa kufuneka wenze okuthile ngesicelo sakho."),
      section("Ungalufumana phi olunye uncedo?", "Khetha isikhokelo esihambelana nesimo sesicelo sakho. Unokufunda ngesicelo esisaphononongwayo, esamkelweyo okanye esaliweyo, ngemihla yentlawulo nangendlela yokufaka isibheno."),
      section("Ezinye izikhokelo", "Funda ngakumbi apha:\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-read-your-status-check-result\n• /guides/why-is-my-status-pending\n• /guides/what-does-declined-mean\n• /payment-dates"),
      faq("Ngaba iphepha lakwaSASSA libizwa ngokuba yi-R350?", "Abantu abaninzi bakhangela ngegama elithi R350. Jonga ukuba iwebhusayithi yeyakwaSASSA nokuba uvule iphepha lesibonelelo osenzele isicelo."),
      faq("Ingaba iGrantCare ingandijongela isimo sesicelo sam?", "Hayi. IGrantCare ichaza imiyalezo namanyathelo onokuwalandela. Nguwe ojonga umphumo wesicelo sakho kwiwebhusayithi yakwaSASSA."),
      faq("Ndenze ntoni xa ndifuna nje ukwazi ukuba umyalezo uthetha ukuthini?", "Funda umyalezo ovela kwaSASSA uze uvule isikhokelo seGrantCare esichaza kwaloo myalezo."),
    ],
  },
  "srd-sassa-gov-za-status-check-guide": {
    title: "Usijonga njani isimo sesicelo sakho kwi-srd.sassa.gov.za?",
    summary: "Funda indlela yokusebenzisa iwebhusayithi ye-SRD yakwaSASSA ngokukhuselekileyo nalapho unokufumana khona ingcaciso xa ungawuqondi umyalezo wesicelo sakho.",
    sections: [
      section("Impendulo emfutshane", "Vula i-srd.sassa.gov.za ukuze ubone umphumo wesicelo sakho ngqo kwaSASSA. Ukuba akucaci ukuba uthini umyalezo, ungasebenzisa izikhokelo zeGrantCare ukukhangela intsingiselo yawo.\n• https://srd.sassa.gov.za/"),
      section("Kuthetha ukuthini oku?", "ISASSA ikubonisa isigqibo okanye inkqubela yesicelo sakho. Amanye amagama asenokuba nzima ukuwaqonda. Funda kuqala oko kubhaliweyo kwisicelo sakho, uze ukhangele ingcaciso yamagama ongawaqondiyo."),
      section("Yintoni eyenziwa yiSASSA, yintoni eyenziwa yiGrantCare?", "ISASSA igcina iinkcukacha zesicelo sakho ize ikubonise isimo saso. IGrantCare sisikhokelo esizimeleyo. Apha unokufunda indlela yokusebenzisa iwebhusayithi yakwaSASSA nokutolika umyalezo owufumene kuyo."),
      section("Amanyathelo onokuwalandela", "1. Vula iwebhusayithi ye-SRD yakwaSASSA.\n2. Qinisekisa ukuba idilesi ichanekile phambi kokufaka iinkcukacha zakho.\n3. Funda umyalezo njengoko ubhaliwe.\n4. Ukuba ufuna ukuwugcina, wubhale phantsi okanye ugcine umfanekiso wesikrini kwindawo ekhuselekileyo.\n5. Khangela ingcaciso ukuba kukho igama ongaqinisekanga ngalo."),
      section("Ungenza ntoni kwiwebhusayithi yakwaSASSA?", "Ungajonga isimo sesicelo sakho se-SRD nemiyalezo enxulumene naso. Ukuba kukho inyathelo ekufuneka ulithathile, landela imiyalelo yakwaSASSA."),
      section("Into omele uyikhumbule", "IGrantCare sisikhokelo esizimeleyo. Xa ufuna ukubona ukuba kukho utshintsho kwisicelo sakho, buyela kwiwebhusayithi ye-SRD yakwaSASSA."),
      section("Ungawuqonda njani umyalezo wakho?", "Emva kokujonga isicelo sakho, khangela isikhokelo esichaza amagama owabonileyo. Oku kukunceda uqonde into omawuyenze ngaphambi kokuba uthathe inyathelo kwaSASSA."),
      section("Ezinye izikhokelo", "Funda ngakumbi apha:\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-check-your-status\n• /guides/what-the-srd-portal-is-for\n• /status"),
      faq("Ngaba eli liphepha elisemthethweni lakwaSASSA?", "Hayi. Eli liphepha leGrantCare elichaza indlela yokusebenzisa iwebhusayithi yakwaSASSA ngokukhuselekileyo."),
      faq("Singandinceda njani isikhokelo emva kokuba ndijonge isicelo sam?", "Ukuba awuwaqondi amagama akwimpendulo yakwaSASSA, isikhokelo singakucacisela ukuba athetha ukuthini."),
      faq("Ngaba ndingasebenzisa iwebhusayithi ezimeleyo ukwenza utshintsho kwisicelo sam?", "Xa kufuneka wenze okuthile ngesicelo sakho, sebenzisa inkqubo esemthethweni yakwaSASSA uze ulandele imiyalelo yayo."),
    ],
  },
};

export const isiXhosaStatusLinkLabels: Record<string, string | undefined> = {
  "/guides/how-to-check-srd-status-online": "Jonga isimo sesicelo sakho se-SRD kwi-intanethi",
  "/guides/how-to-read-your-status-check-result": "Funda umphumo wesicelo sakho",
  "/guides/why-is-my-status-pending": "Kutheni isicelo sam sisaphononongwa?",
  "/guides/what-does-declined-mean": "Kuthetha ukuthini xa isicelo saliwe?",
  "/guides/official-status-check-vs-independent-guide": "Umahluko phakathi kwewebhusayithi yakwaSASSA nesikhokelo esizimeleyo",
  "/guides/how-to-use-srd-status-check-safely": "Jonga isimo sesicelo sakho se-SRD ngokukhuselekileyo",
  "/guides/how-to-check-your-status": "Indlela yokujonga isimo sesicelo sakho",
  "/guides/what-the-srd-portal-is-for": "Isetyenziselwa ntoni iwebhusayithi ye-SRD?",
  "/status": "Iintsingiselo zemiyalezo yezicelo",
  "/payment-dates": "Imihla yokuhlawulwa kwezibonelelo",
};
