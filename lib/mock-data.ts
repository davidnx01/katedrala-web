import type {
  Announcement,
  CalendarEvent,
  Church,
  ContactLocation,
  ContactPageLocation,
} from "@/types/content";

/**
 * Placeholder content until the matching Strapi collections are populated.
 * Shape mirrors the Strapi response types in types/content.ts so swapping
 * these for `lib/api.ts` fetch calls later is a drop-in replacement.
 */

export const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Oznamy Farnosti sv. Martina – 15. nedeľa v cezročnom období",
    slug: "15-nedela",
    date: "2026-07-13",
    content:
      "Svätá omša za farníkov bude slúžená v nedeľu o 10:30. Zbierka na opravu strechy katedrály pokračuje. Doteraz sa vyzbieralo 12 450 €. Ďakujeme všetkým darcom za štedrosť. Prispieť môžete aj cez farský účet — IBAN nájdete na stránke kontaktov.\n\nFarská kancelária bude v týždni od 14. do 18. júla otvorená iba v pondelok od 9:00 do 12:00. V stredu bude zatvorená z dôvodu dovolenky.\n\nPripomíname, že letný program svätých omší platí od 1. júla do 31. augusta. Aktuálny rozpis nájdete v sekcii Sväté omše na hlavnej stránke.\n\nV piatok 18. júla bude po večernej svätej omši eucharistická adorácia od 18:30 do 19:30. Srdečne pozývame všetkých farníkov.",
  },
  {
    id: 2,
    title: "Oznamy Farnosti sv. Martina – 14. nedeľa v cezročnom období",
    slug: "14-nedela",
    date: "2026-07-06",
    content:
      "Letný program svätých omší platí od 1. júla. Farská kancelária je otvorená v pondelok a stredu.",
  },
  {
    id: 3,
    title: "Slávnosť sv. Petra a Pavla — zmena programu svätých omší",
    slug: "petra-a-pavla",
    date: "2026-06-29",
    content:
      "Pri príležitosti slávnosti bude svätá omša slúžená o 9:00 a 18:00. Večerná adorácia bude presunutá.",
  },
  {
    id: 4,
    title: "13. nedeľa v cezročnom období",
    slug: "13-nedela",
    date: "2026-06-22",
    content:
      "Svätá omša za farníkov o 10:30. V sakristii je možné zapísať úmysly svätých omší na august.",
  },
  {
    id: 5,
    title: "Slávnosť Najsvätejšieho Kristovho Tela a Krvi",
    slug: "bozie-telo",
    date: "2026-06-15",
    content:
      "Eucharistická procesia sa uskutoční po svätej omši o 10:30 uličkami okolo katedrály. Prosíme farníkov o účasť a výzdobu okien na trase.",
  },
  {
    id: 6,
    title: "11. nedeľa v cezročnom období",
    slug: "11-nedela",
    date: "2026-06-08",
    content: "Svätá omša za farníkov o 10:30. Po omši stretnutie farskej rady.",
  },
  {
    id: 7,
    title: "Zoslanie Ducha Svätého — slávnosť Turíc",
    slug: "turice",
    date: "2026-06-01",
    content:
      "Slávnostná svätá omša o 10:30. Sviatosť birmovania prijme 12 birmovancov z farnosti.",
  },
  {
    id: 8,
    title: "7. veľkonočná nedeľa",
    slug: "7-velkonocna-nedela",
    date: "2026-05-25",
    content: "Svätá omša za farníkov o 10:30. Deviatnik pred Turícami pokračuje každý deň o 18:00.",
  },
  {
    id: 9,
    title: "Slávnosť Nanebovstúpenia Pána",
    slug: "nanebovstupenie",
    date: "2026-05-18",
    content: "Svätá omša o 8:00, 9:30, 11:00 a 18:00. Prikázaný sviatok.",
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 1, date: "2026-07-13", title: "15. nedeľa v cezročnom období", description: "Svätá omša za farníkov o 10:30. Zbierka na opravu strechy.", href: "/farnost/oznamy/15-nedela" },
  { id: 2, date: "2026-07-14", title: "Adorácia Najsvätejšej Sviatosti", description: "Eucharistická adorácia od 17:00 do 18:00 v katedrále.", href: "/farnost/adoracia" },
  { id: 3, date: "2026-07-16", title: "Sviatok Karmelskej Panny Márie", description: "Svätá omša o 8:00 a 18:00. Požehnanie škapuliarov po večernej omši.", href: "/farnost/oznamy/karmelska" },
  { id: 4, date: "2026-07-19", title: "Koncert: Baroková hudba v katedrále", description: "Komorný koncert o 19:00. Vstup voľný, dobrovoľné vstupné.", href: "/hudba/barokova-hudba" },
  { id: 5, date: "2026-07-20", title: "16. nedeľa v cezročnom období", description: "Svätá omša za farníkov o 10:30. Krst detí po omši o 11:00.", href: "/farnost/oznamy/16-nedela" },
  { id: 6, date: "2026-07-22", title: "Sviatok sv. Márie Magdalény", description: "Svätá omša o 8:00 a 18:00 v katedrále.", href: "/farnost/oznamy/maria-magdalena" },
  { id: 7, date: "2026-07-25", title: "Sviatok sv. Jakuba", description: "Pútnická svätá omša o 18:00. Požehnanie pútnikov.", href: "/farnost/oznamy/jakub" },
  { id: 8, date: "2026-07-27", title: "17. nedeľa v cezročnom období", description: "Svätá omša za farníkov o 10:30. Stretnutie farskej rady po omši.", href: "/farnost/oznamy/17-nedela" },
  { id: 9, date: "2026-08-01", title: "Lectio divina", description: "Stretnutie nad Písmom o 18:30 vo farskej sále. Téma: Ježišove podobenstvá.", href: "/farnost/lectio-divina" },
  { id: 10, date: "2026-08-05", title: "Nočná prehliadka katedrály", description: "Výnimočná nočná prehliadka s odborným výkladom o 21:00. Vstupné 5€.", href: "/navsteva/nocna-prehliadka" },
  { id: 11, date: "2026-08-15", title: "Nanebovzatie Panny Márie", description: "Slávnostná svätá omša o 10:30. Prikázaný sviatok.", href: "/farnost/oznamy/nanebovzatie" },
];

export const mockChurches: Church[] = [
  {
    id: 1,
    name: "Kostol Loretánskej Panny Márie",
    slug: "loretanska",
    type: "kostol",
    address: "Uršulínska ulica 5, 811 01 Bratislava",
    rector: "vdp. Ján Kováč",
    email: "loretanska@ba.ecclesia.sk",
    phone: "+421 2 5443 2210",
    massSchedule: [
      { dayLabel: "Pondelok – Piatok", times: ["7:00", "18:00"], language: "sk" },
      { dayLabel: "Nedeľa", times: ["9:00", "11:00"], language: "sk" },
    ],
    about:
      "Kostol Loretánskej Panny Márie patrí medzi menšie sakrálne stavby v historickom jadre Bratislavy. Jeho súčasná podoba pochádza z barokovej prestavby, no základy siahajú hlbšie do histórie mesta.\n\n## História\n\nPôvodný objekt prešiel niekoľkými prestavbami. Interiér si zachoval **jednoduchý, no pôsobivý** oltár a niekoľko historických sôch.\n\nKostol je súčasťou farnosti sv. Martina a slúži predovšetkým miestnym farníkom a návštevníkom historického centra.",
    photo: { url: "/images/churches/loretanskej-panny-marie.jpg" },
    gallery: [{ url: "/images/churches/loretanskej-panny-marie.jpg" }],
    announcementsUrl: "/farnost/oznamy",
    latitude: 48.1436,
    longitude: 17.1075,
    order: 1,
  },
  {
    id: 2,
    name: "Kostol sv. Ladislava",
    slug: "sv-ladislav",
    type: "kostol",
    address: "Špitálska 7, 811 08 Bratislava",
    rector: "vdp. Peter Horváth",
    email: "sv-ladislav@ba.ecclesia.sk",
    phone: "+421 2 5443 2544",
    massSchedule: [
      { dayLabel: "Pondelok – Piatok", times: ["7:30", "17:30"], language: "sk" },
      { dayLabel: "Nedeľa", times: ["8:00", "10:00", "19:00"], language: "sk" },
    ],
    about:
      "Kostol sv. Ladislava sa nachádza na Špitálskej ulici a je jedným z významných chrámov v širšom centre mesta. Pôvodne bol súčasťou kláštorného komplexu.\n\n## Súčasnosť\n\nDnes slúži ako farský kostol s pravidelným programom svätých omší v slovenskom jazyku. Priestor je obľúbený aj u návštevníkov vďaka svojej pokojnej atmosfére.",
    photo: { url: "/images/churches/sv-ladislava.jpg" },
    gallery: [{ url: "/images/churches/sv-ladislava.jpg" }],
    announcementsUrl: "/farnost/oznamy",
    latitude: 48.1499,
    longitude: 17.1157,
    order: 2,
  },
  {
    id: 3,
    name: "Kostol Zvestovania Pána",
    slug: "zvestovanie-pana",
    type: "kostol",
    address: "Františkánske námestie 2, 811 01 Bratislava",
    rector: "vdp. Michal Szabó",
    email: "frantiskani@ba.ecclesia.sk",
    phone: "+421 2 5443 1756",
    massSchedule: [
      { dayLabel: "Pondelok – Piatok", times: ["6:30", "17:00"], language: "sk" },
      { dayLabel: "Nedeľa", times: ["9:00", "10:30", "18:00"], language: "sk" },
    ],
    about:
      "Františkánsky kostol Zvestovania Pána je jedným z najstarších zachovaných kostolov v Bratislave, s gotickými základmi siahajúcimi do 13. storočia.\n\n## Architektúra\n\nInteriér spája gotické, barokové aj klasicistické prvky z rôznych období prestavby. Kostol je súčasťou aktívneho františkánskeho kláštora.\n\nPre návštevníkov je otvorený mimo bohoslužieb, s rešpektovaním prebiehajúcich obradov.",
    photo: { url: "/images/churches/zvestovania-pana.jpeg" },
    gallery: [{ url: "/images/churches/zvestovania-pana.jpeg" }],
    announcementsUrl: "/farnost/oznamy",
    latitude: 48.1421,
    longitude: 17.1078,
    order: 3,
  },
  {
    id: 4,
    name: "Kostol Najsv. Spasiteľa",
    slug: "najsvatejsi-spasitel",
    type: "kostol",
    address: "Františkánske námestie 8, 811 01 Bratislava",
    rector: "vdp. Tomáš Varga",
    email: "spasitel@ba.ecclesia.sk",
    phone: "+421 2 5443 2989",
    massSchedule: [
      { dayLabel: "Pondelok – Piatok", times: ["7:00", "18:30"], language: "sk" },
      { dayLabel: "Nedeľa", times: ["9:30", "11:00"], language: "sk" },
    ],
    about:
      "Kostol Najsvätejšieho Spasiteľa, pôvodne jezuitský, je významnou barokovou stavbou v samom srdci Bratislavy. Jeho fasáda je jednou z najznámejších na Františkánskom námestí.\n\n## Zaujímavosti\n\nInteriér zdobia rozsiahle nástenné maľby a bohato zdobený hlavný oltár. Kostol je aktívne využívaný na pravidelné bohoslužby aj kultúrne podujatia.",
    photo: { url: "/images/churches/spasitela.jpg" },
    gallery: [{ url: "/images/churches/spasitela.jpg" }],
    announcementsUrl: "/farnost/oznamy",
    latitude: 48.1424,
    longitude: 17.1082,
    order: 4,
  },
  {
    id: 5,
    name: "Kaplnka sv. Kataríny",
    slug: "sv-katarina",
    type: "kaplnka",
    address: "Kapitulská ulica 1, 811 01 Bratislava",
    rector: "vdp. Ján Kováč",
    email: "kapitulska@ba.ecclesia.sk",
    phone: "+421 2 5443 1359",
    massSchedule: [{ dayLabel: "Streda", times: ["17:00"], language: "sk" }],
    about:
      "Kaplnka sv. Kataríny sa nachádza na historickej Kapitulskej ulici, v tesnej blízkosti Katedrály sv. Martina. Slúži predovšetkým na menšie bohoslužby a súkromnú modlitbu.\n\nPriestor je súčasťou komplexu budov spravovaných farnosťou.",
    photo: null,
    gallery: [],
    announcementsUrl: null,
    latitude: 48.1439,
    longitude: 17.1057,
    order: 5,
  },
  {
    id: 6,
    name: "Kaplnka Panny Márie Snežnej",
    slug: "panna-maria-snezna",
    type: "kaplnka",
    address: "Klariská ulica 2, 811 03 Bratislava",
    rector: "vdp. Peter Horváth",
    email: "klariska@ba.ecclesia.sk",
    phone: "+421 2 5443 2544",
    massSchedule: [{ dayLabel: "Sobota", times: ["8:00"], language: "sk" }],
    about:
      "Malá kaplnka zasvätená Panne Márii Snežnej sa nachádza na Klariskej ulici. Je obľúbeným miestom tichej modlitby v historickom centre mesta.",
    photo: null,
    gallery: [],
    announcementsUrl: null,
    latitude: 48.1432,
    longitude: 17.1065,
    order: 6,
  },
];

export const mockContacts: ContactLocation[] = [
  {
    name: "Katedrála sv. Martina",
    address: "Rudnayovo námestie 1",
    phone: "+421 2 5443 1359",
    email: "katedrala@ba.ecclesia.sk",
    hours: "Po – So: 9:00 – 17:00",
    photo: { url: '/images/contacts/martina.webp' },
    description: "Hlavný chrám farnosti. Sväté omše, sviatosti, adorácia.",
    tags: ["Hlavný chrám farnosti", "Sväté omše", "Sviatosti", "Adorácia"],
  },
  {
    name: "Martineum",
    address: "Rudnayovo námestie 13",
    phone: "+421 2 5443 4054",
    email: "martineum@ba.ecclesia.sk",
    hours: "Po – Ne: 10:00 – 17:00",
    photo: { url: '/images/contacts/martineum.webp' },
    description: "Informačné centrum. Vstupenky, audioguides, suveníry.",
    tags: ["Informačné centrum", "Vstupenky", "Audioguides", "Suveníry"],
  },
  {
    name: "Farský úrad",
    address: "Rudnayovo námestie 1",
    phone: "+421 2 5443 1359",
    email: "farnost@ba.ecclesia.sk",
    hours: "Po, St: 9:00 – 12:00",
    photo: { url: '/images/contacts/urad.webp' },
    description: "Administratíva. Krst, sobáš, potvrdenia, matrika.",
    tags: ["Administratíva", "Krst", "Sobáš", "Potvrdenia", "Matrika"],
  },
];

export const mockContactPageLocations: ContactPageLocation[] = [
  {
    id: "katedrala",
    name: "Katedrála sv. Martina",
    description: "Hlavný chrám farnosti. Sväté omše, sviatosti, adorácia.",
    address: "Rudnayovo námestie 1",
    city: "811 01 Bratislava",
    phone: "+421 2 5443 1359",
    email: "katedrala@ba.ecclesia.sk",
    hours: [
      { dayLabel: "Po – Pi", time: "8:00 – 17:00" },
      { dayLabel: "Sobota", time: "8:00 – 17:00" },
      { dayLabel: "Nedeľa", time: "7:30 – 18:30" },
    ],
  },
  {
    id: "martineum",
    name: "Martineum",
    description: "Informačné centrum. Vstupenky, audioguides, suveníry.",
    address: "Rudnayovo námestie 13",
    city: "811 01 Bratislava",
    phone: "+421 2 5443 4054",
    email: "martineum@ba.ecclesia.sk",
    hours: [{ dayLabel: "Po – Ne", time: "10:00 – 17:00" }],
  },
  {
    id: "urad",
    name: "Farský úrad",
    description: "Administratíva. Krst, sobáš, potvrdenia, matrika.",
    address: "Rudnayovo námestie 1",
    city: "811 01 Bratislava",
    phone: "+421 2 5443 1359",
    email: "farnost@ba.ecclesia.sk",
    iban: "SK12 3456 7890 1234 5678 9012",
    hours: [
      { dayLabel: "Pondelok", time: "9:00 – 12:00" },
      { dayLabel: "Streda", time: "9:00 – 12:00" },
    ],
  },
];
