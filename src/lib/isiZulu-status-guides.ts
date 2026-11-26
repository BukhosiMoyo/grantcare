type Article = {
  title: string;
  summary: string;
  sections: { title: string; body: string }[];
};

const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) => section(`FAQ: ${question}`, answer);

export const isiZuluStatusGuides: Record<string, Article | undefined> = {
  "how-to-use-sassa-status-check-for-r350": {
    title: "Ungasibheka kanjani isimo sesicelo sakho se-SRD sakwa-SASSA (R350)?",
    summary: "Thola ukuthi ungalibona kanjani ikhasi elisemthethweni lakwa-SASSA, ubheke isimo sesicelo sakho se-SRD bese uqonda ukuthi umphumela wakho usho ukuthini.",
    sections: [
      section("Impendulo esheshayo", "Ukuze ubheke isimo sesicelo sakho, iya ku-srd.sassa.gov.za. Uma usuwutholile umphumela, funda wonke umyalezo. Amagama athi “approved” noma “declined” ayingxenye yawo kuphela.\n• https://srd.sassa.gov.za/"),
      section("Kusho ukuthini lokhu?", "Igama abantu abalisebenzisayo uma befuna isibonelelo lingahlala lithi R350 ngisho noma inani selishintshile. Okubalulekile wukuthi ubheke umphumela wesicelo sakho uqobo bese ufunda ukuthi uthi wenzeni."),
      section("Yini evame ukudida abantu?", "Ukuthola ikhasi elifanele nokuchaza umphumela yizinyathelo ezimbili. Qala ubheke isimo sakho kwa-SASSA. Uma umyalezo ungacacile, sebenzisa umhlahlandlela ukuze uwuqonde."),
      section("Ongakwenza manje", "1. Vula ikhasi lakwa-SASSA lokubheka isimo sesicelo se-SRD.\n2. Hlola ikheli lewebhusayithi ngaphambi kokufaka imininingwane yakho.\n3. Funda umyalezo ophelele ovela esikrinini.\n4. Uma kukhona igama ongalizwa kahle, bheka incazelo yalo.\n5. Uma kudingeka wenze okuthile, landela imiyalelo esekhasini elisemthethweni."),
      section("Uwufunda kanjani umphumela?", "Uma ubona elithi “pending”, isicelo sisacutshungulwa. Elithi “approved” lisho ukuthi samukelwe, kanti elithi “declined” lisho ukuthi senqatshiwe. Umyalezo ocela ukuthi uqinisekise ubuwena uhlukile kulowo othi inkokhelo isacutshungulwa. Funda umyalezo ohambisana nesicelo sakho."),
      section("Okufanele ukukhumbule", "Ungakhokheli muntu othembisa ukusheshisa isicelo sakho noma ukuqinisekisa ukuthi sizokwamukelwa. I-GrantCare ingakusiza uqonde umyalezo. Uma kudingeka wenze okuthile ngesicelo sakho, sebenzisa imigudu esemthethweni."),
      section("Ungaluthola kuphi olunye usizo?", "Khetha umhlahlandlela ohambisana nomphumela wakho. Ungafunda ngesicelo esisacutshungulwa, esamukelwe noma esenqatshiwe, ngezinsuku zokukhokha noma ngokufaka isikhalazo."),
      section("Eminye imihlahlandlela", "Funda kabanzi lapha:\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-read-your-status-check-result\n• /guides/why-is-my-status-pending\n• /guides/what-does-declined-mean\n• /payment-dates"),
      faq("Ingabe ikhasi elisemthethweni libizwa nge-R350?", "Igama elithi R350 lisasetshenziswa ngabantu abaningi uma befuna usizo. Bheka ukuthi ikhasi olivulile elakwa-SASSA nokuthi lihambisana nesibonelelo osifakela isicelo."),
      faq("Ingabe i-GrantCare ingangibhekela isimo sesicelo sami?", "Cha. I-GrantCare ichaza imiyalezo nezinyathelo ongazilandela. Umphumela wakho uwuthola ohlelweni olusemthethweni lakwa-SASSA."),
      faq("Ngenzenjani uma ngifuna incazelo yomyalezo kuphela?", "Qala ngokufunda umyalezo wakho kwa-SASSA, bese ukhetha umhlahlandlela we-GrantCare ochaza wona lowo myalezo."),
    ],
  },
  "srd-sassa-gov-za-status-check-guide": {
    title: "Ungasibheka kanjani isimo sesicelo sakho ku-srd.sassa.gov.za?",
    summary: "Funda ukuthi yiluphi usizo oluthola kusizindalwazi se-SRD sakwa-SASSA nokuthi i-GrantCare ingakusiza kanjani uma ungawuqondi umphumela wakho.",
    sections: [
      section("Impendulo esheshayo", "Vula i-srd.sassa.gov.za ukuze ubheke isimo sesicelo sakho ngqo kwa-SASSA. Uma usuwubonile umphumela, ungasebenzisa i-GrantCare ukuze uqonde amagama avela kuwo.\n• https://srd.sassa.gov.za/"),
      section("Kusho ukuthini lokhu?", "Ikhasi lakwa-SASSA libonisa umphumela wesicelo sakho, kodwa incazelo yamagama athile ingase ingacaci. Qala ngokufunda umyalezo okhonjisiwe bese ufuna incazelo yamagama ongawaqondi."),
      section("Umehluko phakathi kwe-SASSA ne-GrantCare", "I-SASSA ikubonisa isimo sangempela sesicelo sakho. I-GrantCare ingumhlahlandlela ozimele ochaza ukuthi ungasebenzisa kanjani ikhasi lakwa-SASSA nokuthi umyalezo owubonayo ungasho ukuthini."),
      section("Ongakwenza manje", "1. Vula isizindalwazi se-SRD sakwa-SASSA ukuze ubheke isimo sakho.\n2. Hlolisisa ikheli ngaphambi kokufaka imininingwane yakho.\n3. Funda umphumela njengoba ubhaliwe.\n4. Uma ufuna ukuwugcina, wubhale phansi noma ugcine isithombe sesikrini endaweni ephephile.\n5. Bheka incazelo yamagama ongawaqondi."),
      section("Sisiza ngani isizindalwazi sakwa-SASSA?", "Kulesi sizindalwazi ungabheka isimo sesicelo sakho se-SRD nemiyalezo ephathelene naso. Uma udinga incazelo kabanzi, ungasebenzisa imihlahlandlela ye-GrantCare."),
      section("Okufanele ukukhumbule", "I-GrantCare izimele futhi ichaza indlela uhlelo olusebenza ngayo. Ukuze ubone ukuthi kukhona yini okusha ngesicelo sakho, buyela esizindalwazini esisemthethweni sakwa-SASSA."),
      section("Ungawuqonda kanjani umyalezo wakho?", "Ngemva kokubuka umphumela, qhathanisa amagama awo nencazelo ehambisana nawo. Lokhu kuzokusiza uqonde isinyathelo esilandelayo ngaphambi kokusithatha kwa-SASSA."),
      section("Eminye imihlahlandlela", "Funda kabanzi lapha:\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-check-your-status\n• /guides/what-the-srd-portal-is-for\n• /status"),
      faq("Ingabe leli yikhasi lakwa-SASSA elisemthethweni?", "Cha. Leli khasi le-GrantCare likuchazela ukuthi ungasisebenzisa kanjani ngokuphephile isizindalwazi sakwa-SASSA."),
      faq("Kungani ngingadinga incazelo ngemva kokubheka isimo sami?", "Amagama asemiphumeleni ngezinye izikhathi anzima ukuwaqonda. Umhlahlandlela ungakuchazela ukuthi umyalezo wakho usho ukuthini."),
      faq("Ngingakwazi yini ukuthatha isinyathelo ngesicelo sami ekhasini elizimele?", "Cha. Uma kudingeka wenze okuthile ngesicelo sakho, landela imiyalelo esemthethweni ohlelweni lakwa-SASSA."),
    ],
  },
};

export const isiZuluStatusLinkLabels: Record<string, string | undefined> = {
  "/guides/how-to-check-srd-status-online": "Indlela yokubheka isimo sesicelo se-SRD ku-inthanethi",
  "/guides/how-to-read-your-status-check-result": "Indlela yokufunda umphumela wesicelo sakho",
  "/guides/why-is-my-status-pending": "Kungani isicelo sami sisacutshungulwa?",
  "/guides/what-does-declined-mean": "Kusho ukuthini uma isicelo senqatshiwe?",
  "/guides/official-status-check-vs-independent-guide": "Umehluko phakathi kwekhasi lakwa-SASSA nomhlahlandlela ozimele",
  "/guides/how-to-use-srd-status-check-safely": "Indlela ephephile yokubheka isimo sesicelo se-SRD",
  "/guides/how-to-check-your-status": "Indlela yokubheka isimo sesicelo sakho",
  "/guides/what-the-srd-portal-is-for": "Lisebenza kanjani ikhasi le-SRD lakwa-SASSA?",
  "/status": "Izincazelo zemiphumela yezicelo",
};
