import type {
  Announcement,
  CalendarEvent,
  ChurchPreview,
  ContactLocation,
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

export const mockChurches: ChurchPreview[] = [
  { id: 1, name: "Kostol Loretánskej Panny Márie", slug: "loretanska", address: "Uršulínska ulica", photo: { url: '/images/churches/loretanskej-panny-marie.jpg' }, },
  { id: 2, name: "Kostol sv. Ladislava", slug: "sv-ladislav", address: "Špitálska 7", photo: { url: '/images/churches/sv-ladislava.jpg' } },
  { id: 3, name: "Kostol Zvestovania Pána", slug: "zvestovanie-pana", address: "Františkánske námestie", photo: { url: '/images/churches/zvestovania-pana.jpeg' } },
  { id: 4, name: "Kostol Najsv. Spasiteľa", slug: "najsvatejsi-spasitel", address: "Františkánske námestie", photo: { url: '/images/churches/spasitela.jpg' } },
];

export const mockContacts: ContactLocation[] = [
  {
    name: "Katedrála sv. Martina",
    address: "Rudnayovo námestie 1",
    phone: "+421 2 5443 1359",
    email: "katedrala@ba.ecclesia.sk",
    hours: "Po – So: 9:00 – 17:00",
    photo: { url: '/images/contacts/martina.webp' },
    description: "",
  },
  {
    name: "Martineum",
    address: "Rudnayovo námestie 13",
    phone: "+421 2 5443 4054",
    email: "martineum@ba.ecclesia.sk",
    hours: "Po – Ne: 10:00 – 17:00",
    photo: { url: '/images/contacts/martineum.webp' },
    description: "",
  },
  {
    name: "Farský úrad",
    address: "Rudnayovo námestie 1",
    phone: "+421 2 5443 1359",
    email: "farnost@ba.ecclesia.sk",
    hours: "Po, St: 9:00 – 12:00",
    photo: { url: '/images/contacts/urad.webp' },
    description: "",
  },
];
