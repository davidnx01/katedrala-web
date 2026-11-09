# PROJECT.md — Katedrála sv. Martina, Bratislava

> Web pre farnosť a Dom sv. Martina. Viacjazyčný (dnes SK/EN, architektúra pripravená na ďalšie). Cieľovka: farníci (60%), turisti (30%), kultúra (10%). Prístupný pre 12–65+ rokov.

> **Klientsky kontext (obchodné rozhodnutia, denník, otvorené otázky, zoznam „Čo nie je hotové“):**
> `~/Documents/Obsidian/Poznámky/Darwon/Klienti/Katedrála sv. Martina/Katedrála sv. Martina.md`
> Prečítaj to pred akoukoľvek dizajnovou/produktovou prácou na tomto projekte.
> Plán cache: `…/Podklady/Plán cache — rýchlosť a okamžité aktualizácie.md`.
>
> **Pozor:** kód je zdroj pravdy. Čo v tomto súbore ešte nie je postavené, je označené „plánované“ / „nie je hotové“.

## Tech stack

- Next.js 16 (App Router, Turbopack, `proxy.ts` namiesto `middleware.ts`) — pred písaním kódu čítaj `node_modules/next/dist/docs/` (pozri `AGENTS.md`)
- TypeScript (strict, no `any`)
- Tailwind CSS 4+
- shadcn/ui na `@base-ui/react`
- next-intl 4 (i18n)
- Strapi 5 (self-hosted, headless CMS)
- zod 4 (validácia formulárov)
- Resend (e-maily z formulárov)
- Playfair Display (serif nadpisy, `next/font/google` — fonty sa sťahujú pri builde, za behu sa z Google nenačítavajú)

## Coding standards

- Senior-level kód. Každý opakovateľný UI prvok = vlastný komponent vo vlastnom súbore.
- Props vždy cez `interface XxxProps {}`, destructured v signature.
- Žiadne `any`, žiadne inline `style={}`, žiadne anonymné mapované divy.
- Komponenty: named export + default export. Súbor = 1 komponent.
- Pomenovanie: PascalCase komponenty, camelCase funkcie, kebab-case súbory v app/.
- Tailwind triedy: zoradené podľa layout → spacing → sizing → typo → color → border → effects.
- Responzivita: mobile-first (`base` → `md:` → `lg:`).
- Všetky texty cez i18n, žiadne hardcoded stringy v komponentoch.

## Breakpointy

| Token | Range | Tailwind |
|-------|-------|----------|
| sm | 0–639px | base |
| md | 640–1023px | md: |
| lg | 1024px+ | lg: |

Container: `max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12`

## Spacing (8px base)

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| space-1 | 8px | p-2, gap-2 | ikona-text, vnútorný gap |
| space-2 | 16px | p-4, gap-4 | card padding (sm), badge gap |
| space-3 | 24px | p-6, gap-6 | card padding (md/lg), gap medzi kartami |
| space-4 | 32px | p-8 | dialog padding block (sm/md) |
| space-5 | 48px | p-12 | dialog padding block (lg), section py (sm) |
| space-6 | 64px | p-16 | section py (md) |
| space-8 | 80px | p-20 | section py (lg) |

Section padding pattern: `py-12 md:py-16 lg:py-20`

## Typografia

| Role | Size sm | Size lg | Weight | Font |
|------|---------|---------|--------|------|
| hero | 36px | 64px | 400+700italic | Playfair Display |
| h1 | 36px | 48px | 700 | Playfair Display |
| h2 (section) | 32px | 42px | 700 | Playfair Display |
| h3 | 20px | 24px | 600 | Playfair Display |
| body | 16px | 18px | 400 | System sans |
| small | 14px | 14px | 400 | System sans |
| caption | 12px | 12px | 500 | System sans, uppercase, tracking-wide |
| eyebrow | 12px | 12px | 600 | System sans, uppercase, tracking-widest, text-gold |

Tailwind config: `fontFamily: { serif: ['Playfair Display', 'Georgia', 'serif'], sans: ['system-ui', ...defaultTheme.fontFamily.sans] }`

## Border radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| radius-sm | 8px | rounded-lg | input, button, badge, tag, nav item |
| radius-md | 16px | rounded-2xl | card, image, container |
| radius-lg | 24px | rounded-3xl | dialog, sheet, popover, modal |
| radius-full | 9999px | rounded-full | avatar, pill badge |

## Komponentové paddingy

| Component | Mobile (base) | Tablet (md:) | Desktop (lg:) |
|-----------|--------------|-------------|--------------|
| Dialog/Sheet | 32px block, 16px inline | 32px block+inline | 48px block+inline |
| Popover | 16px | 24px | 24px |
| Card | 16px | 20px | 24px |
| Button | 10px 16px | 12px 24px | 12px 24px |
| Input | 10px 12px | 12px 16px | 12px 16px |
| Badge/Tag | 4px 8px | 4px 10px | 4px 10px |
| Table cell | 8px 12px | 12px 16px | 12px 16px |
| Nav item | 8px 12px | 8px 16px | 8px 16px |

Touch target minimum: 48px výška, 8px gap medzi klikateľnými prvkami.

## Farby

```ts
// tailwind.config.ts → theme.extend.colors
colors: {
  navy: '#1B1F2E',
  gold: {
    DEFAULT: '#C5A44E',
    light: '#F5ECD7',
    dark: '#8B7332',
  },
  warm: '#FAF7F2',
  stone: '#E8E2D6',
  surface: '#F9F7F3',
}
```

Pozadie stránky: `bg-warm`. Karty: `bg-white`. Tmavé sekcie: `bg-navy`. Nadpisy: `text-navy`. Body: `text-[#2C2A26]`. Secondary text: `text-[#7A756B]`. Muted: `text-[#A39E94]`. Bordery: `border-[#E5E0D6]`. Akcent/CTA: `text-gold` / `bg-gold`. Eyebrow labels: `text-gold uppercase tracking-widest text-xs font-semibold`.

## Navigácia

Header (desktop + mobilné menu), footer stĺpce a všetky ich odkazy sa **kompletne ťahajú zo Strapi** cez `Navigation` single type (`getNavigation()`, `lib/api.ts`) — nie sú fixné v kóde. `Header.tsx` je async Server Component, fetchne `headerLinks` a posiela ich ako props aj do `MobileMenu.tsx` (client component), takže desktop aj mobil čerpajú z toho istého zoznamu. `Footer.tsx` rovnako fetchne `footerColumns`.

Aktuálny obsah (nastavený v Strapi, editovateľný):
- **Header** (4 položky): Domov, Farnosť, Návšteva, Kontakt — "Kostoly" bolo presunuté do footeru.
- **Footer**: 3 stĺpce (Farnosť / Návšteva / Ďalšie), "Kostoly a kaplnky" je v stĺpci Ďalšie.

Ak `Navigation` v Strapi nemá (ešte) obsah, `Header.tsx`/`Footer.tsx` padnú na hardcoded fallback pole (texty cez i18n `Nav`/`Footer` namespace) — web nikdy nezostane bez navigácie.

### Jazykový prepínač
SK/EN, viditeľný v headeri. Prepnutie zachová aktuálnu stránku.

## Folder structure

```
app/
  [locale]/
    layout.tsx              ← root layout, fonty, generateMetadata (texty z i18n `Metadata`), CookieConsent
    page.tsx                ← homepage
    farnost/page.tsx        ← farnosť (sobáš/krst/lectio/adorácia = sekcie na tejto stránke)
    farnost/oznamy/page.tsx, [slug]/page.tsx
    navsteva/page.tsx
    kostoly/page.tsx, [slug]/page.tsx
    kontakt/page.tsx        ← lokácie + kontaktný formulár + CTA
    historia/page.tsx       ← pevné polia, fixné poradie sekcií v kóde
    hudba/page.tsx          ← pevné polia; sekcia koncertov je DOČASNE ZAKOMENTOVANÁ (kým nebude reálny program)
    udalosti/page.tsx, [slug]/page.tsx
    ochrana-udajov/page.tsx ← zásady ochrany osobných údajov (GDPR)
    cookies/page.tsx        ← cookie politika
    [...rest]/page.tsx      ← catch-all → notFound() (aby sa zobrazil štýlovaný 404)
    not-found.tsx
  sitemap.ts, robots.ts

components/
  layout/    Header, Footer, MobileMenu, LanguageSwitcher, Container, Breadcrumb, Pagination
  cards/     ContactCard, ChurchCard, AnnouncementCard, QuickLinkCard, EventCard, ConcertCard, RecordingCard, ...
  sections/  sekcie stránok (Hero*, History*, Music*, Visit*, Contact*, LegalDocument, OperatorCard, CookieTable, ...)
  forms/     ContactForm, FormField, form-styles
  consent/   CookieConsent, CookieCategoryToggle, CookieSettingsButton
  media/     ImagePlaceholder
  ui/        shadcn (button, badge, popover, sheet)
  icons.tsx

lib/
  api.ts                 ← Strapi fetch funkcie (server-only)
  strapi-media.ts        ← getStrapiMediaUrl() — bezpečné aj v Client Components
  seo.ts                 ← buildMetadata(), DEFAULT_OG_IMAGE, SITE_URL, excerpt()
  consent.ts             ← stav cookie súhlasu (client-safe)
  legal.ts               ← dátum poslednej aktualizácie právnych textov
  mail.ts                ← sendMail() cez Resend (server-only)
  contact-email.ts       ← šablóny e-mailov z kontaktného formulára
  rate-limit.ts          ← jednoduchý limiter v pamäti procesu
  actions/contact.ts     ← Server Action kontaktného formulára
  validation/contact.ts  ← zod schéma + typy + chybové kódy
  event-categories.ts, utils.ts

i18n/
  config.ts              ← ENABLED_LOCALES + DEFAULT_LOCALE (jediné miesto, kde sa povoľujú jazyky)
  languages.json/.ts     ← katalóg známych jazykov (názov, OG locale, smer písma)
  routing.ts, request.ts, navigation.ts

messages/                ← <kód>.json na každý povolený jazyk (sk.json, en.json)
scripts/                 ← add-locale.mjs, check-messages.mjs (pnpm i18n:add / i18n:check)
types/                   ← strapi.ts, content.ts, legal.ts
```

### Plánované, zatiaľ NEEXISTUJE
- Render kolekcie `Page` (Kapitulská ulica, Martineum, Hudba a koncerty sú v Strapi, ale web ich nenačítava — `getPageBySlug` nemá volajúceho).
- `navsteva/rezervacia`, `exkurzia`, `omsa-s-knazom`, `sprievodca`, `audioguides` — rozhodnúť, či budú `Page`, sekcie, alebo externý odkaz.
- Rezervačný formulár a formulár na exkurziu (exkurzie idú cez **externý link**, ktorý dodá David; rezervácie čakajú na rozhodnutie o MainSquare).
- Veľká stránka „obsadenosť katedrály“.

## Strapi content types

Presné schémy (komponenty, kolekcie, single types, dynamic zones) sú zdokumentované v `cms/CLAUDE.md` — to je zdroj pravdy. Zhrnutie:

- **Collections**: `Church`, `Announcement`, `Concert`, `Event` (kalendár udalostí na homepage), `Page` (generická flexibilná stránka pre Kapitulskú, Martineum, Sprievodcu, Audioguides, Exkurziu, Omšu s kňazom — nová stránka = nový záznam, nie nová schéma), `Reservation`/`Excursion`/`ContactMessage` (archív formulárov).
- **Single types**: `Homepage`, `ParishPage` (`/farnost`), `VisitPage` (`/navsteva`), `ContactPage` (`/kontakt`), `HistoryPage` (`/historia`), `MusicPage` (`/hudba` — koncerty na stránke sú live dáta z `Concert`, nie CMS pole), `Global` (siteName/tagline/footer text), `Navigation` (header, mobilné menu, footer odkazy — pozri Navigácia nižšie) — každý má vlastné štrukturálne polia (HistoryPage/VisitPage/MusicPage majú fixné poradie sekcií v kóde namiesto dynamic zone) + prípadne `sections` dynamic zone pre kompozovateľný obsah.
- **Zdieľané komponenty**: `shared.seo`, `shared.cta`, `shared.meta-row`, `shared.mass-time`, `shared.hours-row` (dayLabel/time/note?), `shared.contact-location`, `shared.faq-item`, `layout.hero-section` (slideshow-ready: `images[]` + 3-časťový titulok), `layout.quick-link`, `layout.quick-link-card` (homepage quick links s fotkou), `layout.stat-item`, `layout.journey-step`, `layout.ticket-row`, `layout.restriction-item`, `layout.timeline-event`, `layout.coronation-king`, `layout.recording-item`, `layout.venue-feature`, `layout.venue-space` (prepínacie záložky „Čo tu nájdete“ na `/navsteva`), `layout.nav-link`, `layout.footer-column` (Navigation), a desať `sections.*` komponentov (rich-text, image-text, cta-banner, gallery, faq, quick-nav, mass-schedule, announcements-preview, churches-preview, contacts).

Zodpovedajúce TypeScript typy: `types/strapi.ts` (Strapi-tvarové typy, komponenty, `FlexiblePageSection`/`HomepageSection`/`ParishPageSection`/`VisitPageSection`/`ContactPageSection` dynamic-zone union typy) a `types/content.ts` (aplikačné typy: `Church`, `Announcement`, `Concert` (má `isFree`), `Event`, `Global`, `Navigation`, `Page`, `Homepage`, `ParishPage`, `VisitPage`, `ContactPage`, `HistoryPage`, `MusicPage`, `ReservationInput`/`ExcursionInput`/`ContactMessageInput`).

## API vrstva (lib/api.ts)

`lib/api.ts` je **server-only** (`import "server-only"` — build zlyhá, ak ho niekedy importuje Client Component, takže API token sa nikdy nedostane do klientského JS). Nikdy nevolaj Strapi priamo z komponentu — vždy cez túto vrstvu.

Kľúčové pravidlo: **žiadna exportovaná funkcia neprijíma surový filter/query objekt od volajúceho.** Každá má úzku, pevnú signatúru a filter si stavia sama interne — vylučuje to query injection cez `filters[...]`/`sort`/`populate`. Vstupy, ktoré môžu pochádzať z URL (`page`, `locale`), prechádzajú cez `sanitizePage`/`sanitizePageSize`/`sanitizeLocale` (clamping + allowlist) predtým, než sa dostanú do query.

```ts
// Church
getChurches({ locale, type? }): Promise<Church[]>
getChurchBySlug({ locale, slug }): Promise<Church | null>

// Announcement
getAnnouncements({ locale, page?, pageSize? }): Promise<{ items, pagination }>
getLatestAnnouncements({ locale, limit? }): Promise<Announcement[]>
getAnnouncementBySlug({ locale, slug }): Promise<Announcement | null>
getAdjacentAnnouncements({ locale, date }): Promise<{ previous, next }>  // 2× $lt/$gt query, nie fetch celej kolekcie
getOlderAnnouncements({ locale, excludeSlug, limit? }): Promise<Announcement[]>

// Concert
getConcerts({ locale, upcomingOnly? }): Promise<Concert[]>
getConcertBySlug({ locale, slug }): Promise<Concert | null>

// Generická flexibilná stránka
getPageBySlug({ locale, slug }): Promise<Page | null>

// Event (homepage kalendár)
getEvents({ locale, upcomingOnly? }): Promise<Event[]>

// Single types
getHomepage({ locale }): Promise<Homepage>
getParishPage({ locale }): Promise<ParishPage>
getVisitPage({ locale }): Promise<VisitPage>
getContactPage({ locale }): Promise<ContactPage>
getHistoryPage({ locale }): Promise<HistoryPage>
getMusicPage({ locale }): Promise<MusicPage>
getGlobal({ locale }): Promise<Global>
getNavigation({ locale }): Promise<Navigation>  // header + mobilné menu + footer odkazy

// Formuláre — zapisujú cez STRAPI_FORMS_TOKEN (write-only), nikdy cez read token
createReservation(input: ReservationInput): Promise<void>
createExcursion(input: ExcursionInput): Promise<void>
createContactMessage(input: ContactMessageInput): Promise<void>
```

Populate dynamic zones používa Strapi 5 `on`-syntax (per-komponent populate, viď `flexibleSectionsPopulate`/`homepageSectionsPopulate`/`parishPageSectionsPopulate` v `lib/api.ts`).

Media URL (napr. `photo.url`) je **relatívna** k Strapi origin — nikdy ju nepoužívaj priamo v `<Image src>`. Prejdi ju cez `getStrapiMediaUrl()` z `lib/strapi-media.ts` (univerzálny, bez tokenu — bezpečný aj v Client Components).

Richtext polia (markdown) sa renderujú výhradne cez `react-markdown` — nikdy `dangerouslySetInnerHTML`.

### Bezpečnosť — zhrnutie (detaily v `cms/CLAUDE.md`)

- Dva oddelené API tokeny: `STRAPI_API_TOKEN` (read-only, GET) a `STRAPI_FORMS_TOKEN` (create-only na 3 form kolekcie). Kompromitácia jedného nikdy neodhalí ani neumožní zápis mimo jeho rozsahu.
- `AbortSignal.timeout()` na každom requeste — pomalý/nedostupný CMS nikdy nezavesí render.
- `StrapiFetchError` nesie status/endpoint, ale nikdy neleakuje internú Strapi odpoveď do UI — stránky ho zachytávajú a renderujú `notFound()`/generický error stav.
- CORS na strane Strapi obmedzený na `FRONTEND_URLS` (nikdy `*`).

### Cachovanie

Žiadne. Každý fetch do Strapi (`fetchStrapi()` v `lib/api.ts`) beží s `cache: "no-store"` — každá stránka sa renderuje nanovo pri každom requeste. Publikovaný obsah v Strapi je okamžite živý, bez ISR, bez revalidate okien, bez webhooku. Nevýhoda: každá návšteva zaťažuje CMS a pri jeho výpadku padne celý web. **Plánované:** tagované cachovanie + Strapi webhook tak, aby bol web rýchly, ale oznamy a kalendár udalostí sa obnovovali okamžite — plán a kroky sú v Obsidiane (`Podklady/Plán cache — rýchlosť a okamžité aktualizácie.md`). Do zavedenia nepridávaj žiadne `revalidate`/`force-cache`.

## Prístupnosť (WCAG 2.1 AA)

- Kontrast min 4.5:1 text, 3:1 veľký text + ikony.
- lang="sk" / lang="en" na html elemente.
- Alt texty na každej fotografii.
- Klávesnicová navigácia (TAB + Enter) cez celú stránku.
- Focus-visible ring na interaktívnych prvkoch.
- Žiadne hover-only informácie.
- `tel:` a `mailto:` linky na telefónoch a emailoch.
- Skip to content link — **zatiaľ NEEXISTUJE** (treba pridať).
- Min 48px touch target na mobile.

## Formuláre

### Kontaktný formulár (hotový) — `/kontakt`
`components/forms/ContactForm.tsx` (client, `useActionState`) → `lib/actions/contact.ts` (Server Action) → `lib/validation/contact.ts` (zod, rovnaká schéma na klientovi aj serveri).
- Chybové kódy zo zod (`required`, `invalidEmail`, `tooShort`, `tooLong`, `consent`) sú zároveň kľúče `ContactForm.errors.*` v i18n.
- Ochrana: honeypot pole `website`, časová pasca (`startedAt`, < 2,5 s = bot), rate limit 5 odoslaní / 10 min / IP (v pamäti procesu — len záťažová poistka, skutočná ochrana patrí pred aplikáciu), povinný súhlas s GDPR (odkaz na `/ochrana-udajov`).
- Odoslanie: e-mail na farský úrad (vždy v predvolenom jazyku, `replyTo` = odosielateľ) + potvrdenie odosielateľovi v jeho jazyku + zápis do Strapi `contact-messages` (cez `STRAPI_FORMS_TOKEN`). **Úspech = e-mail úradu odišiel**; zlyhanie archívu sa len zaloguje, zlyhanie potvrdenia tiež.
- Bez `RESEND_API_KEY`/`MAIL_FROM` sa mimo produkcie e-mail iba zaloguje; v produkcii je to chyba (nikdy nepredstieraj úspech).

### Formulár na exkurziu — NIE JE; rieši sa externe
Exkurzie sa objednávajú cez **externý link** (David ho dodá). Až príde, pridať ho ako tlačidlo (ideálne ako pole v Strapi, nie hardcode). Strapi kolekcia `Excursion` a `createExcursion()` ostávajú nepoužité.

### Rezervácie — čaká na rozhodnutie o MainSquare
`ReservationForm` neexistuje. `Reservation` kolekcia a `createReservation()` sú pripravené, ale nevolané.

## MainSquare / QCode integrácia

Klient používa platformu **MainSquare.it** na turistické objednávky a digitálne wallet karty.

**Objednávkový formulár (turisti):**
- URL: `https://mainsquare.it/lp/2ea658c60257c83b/` (permanentná, obsah sa mení cez klientovo MainSquare konto)
- QR kódy k dispozícii v 2 rozlíšeniach (330x400, 360x400)
- Integrácia: embed (iframe) alebo presmerovanie — **TBD po stretnutí s klientom**

**Wallet card (Apple/Google Wallet):**
- URL: `https://pub1.pskt.io/5z0SdPkmQCbtdWMqsF3hED`
- QR kód k dispozícii (360x740)
- Integrácia: tlačidlo "Pridať do Wallet" na stránke Návšteva

**Otvorené otázky (stretnutie s klientom; rozhodnutie zatiaľ nepadlo):**
- [ ] Iframe embed alebo len redirect na MainSquare?
- [ ] QR kódy na webe alebo len fyzická tlač?
- [ ] Nahradí MainSquare plánované ReservationForm/ExcursionForm, alebo paralelne?
- [ ] Vlastný QR dizajn alebo ponechať existujúce?

## Homepage sekcie (poradie)

1. Header (nav + lang switch)
2. Hero (celostránková foto, nadpis Playfair italic, 2x CTA)
3. Quick links (3 karty: Farnosť / Návšteva / Kontakt, vysunuté do hero)
4. Farské oznamy (posledné 3, dynamické zo Strapi)
5. Sväté omše (tmavá sekcia, rozpis + foto interiéru)
6. Kostoly a kaplnky (4 karty s foto, link na listing)
7. Kontakty (3 lokácie: Katedrála, Martineum, Farský úrad)
8. Footer (4-stĺpcový, logo, nav skupiny, copyright)

## Internacionalizácia (i18n)

**Jediný zoznam povolených jazykov:** `i18n/config.ts` → `ENABLED_LOCALES` (dnes `sk`, `en`). Z neho sa odvodzuje všetko: routing, `generateStaticParams`, prepínač jazyka (`LanguageSwitcher`), sitemap (hreflang), `<html lang/dir>`, Open Graph locale, validácia locale v `lib/api.ts`. Katalóg všetkých známych jazykov (sk, en, de, cs, it, es, fr, hu, pl, pt, hr, nl, uk) je v `i18n/languages.json` (kódy ISO 639-1 — čeština je `cs`, nie `cz`).

**Pridanie jazyka:**
```bash
pnpm i18n:add it      # povolí kód v i18n/config.ts a vytvorí messages/it.json (anglické znenie ako šablóna)
# preložiť hodnoty v messages/it.json, potom:
pnpm i18n:check       # overí, že každý povolený jazyk má všetky kľúče (exit 1 pri chýbajúcich)
```
Potom v Strapi admin → Settings → Internationalization pridať rovnaký locale a doplniť obsah. Chýbajúci kľúč v preklade nikdy nezhodí web — `i18n/request.ts` ho doplní zo slovenčiny.

**Texty, ktoré závisia od jazyka, sú v `messages/<kód>.json`** (nikdy v komponentoch). Metadáta webu (`<title>`, description, názov webu) sú v namespace `Metadata`; `app/[locale]/layout.tsx` ich skladá cez `generateMetadata`. Právne texty sú dáta (`Privacy.sections`, `Cookies.sections`), nie JSX; čítajú sa cez `t.raw()`.

**Plánované:** ďalšie jazyky (taliančina, španielčina a pod.) a automatická voľba jazyka podľa zariadenia návštevníka (`Accept-Language`; next-intl `localeDetection` je štandardne zapnuté — treba rozhodnúť, či má nepodporovaný jazyk padnúť na angličtinu namiesto slovenčiny).

## Právne: GDPR a cookies

- `/ochrana-udajov` (zásady ochrany osobných údajov) a `/cookies` — dátový obsah v i18n, vykresľuje `LegalDocument`. Prevádzkovateľ (adresa, e-mail, telefón, IČO) sa berie z Strapi `ContactPage.locations` (lokácia s `ico`, inak prvá). **Texty sú návrh bez právnej kontroly** — overiť právny názov prevádzkovateľa, dobu uchovávania (12 mesiacov je predpoklad), sprostredkovateľov (hosting, Resend). Pri každej zmene textov zvýšiť `LEGAL_LAST_UPDATED` v `lib/legal.ts`.
- **Cookie lišta** (`components/consent/CookieConsent.tsx`, stav v `lib/consent.ts`): súhlas sa ukladá do cookie `cookie_consent` (JSON, 12 mesiacov, `SameSite=Lax`, `Secure` na HTTPS). Zatiaľ existujú len nevyhnutné cookies (`NEXT_LOCALE`, `cookie_consent`), preto je lišta v **informačnom režime** (jedno tlačidlo). Pravidlá pre súhlasový režim podľa stanoviska Telekomunikačného úradu k § 109 ods. 8 zákona 452/2021: opt-in, „Prijať všetky“ a „Odmietnuť nepovinné“ rovnako výrazné na prvej vrstve, zatvorenie = odmietnutie, odvolanie súhlasu rovnako jednoduché (tlačidlo „Nastavenia cookies“ v pätičke).
- **Pridanie analytiky/marketingu:** v `lib/consent.ts` nastaviť `analytics.active: true`, skript načítavať až keď `hasConsent("analytics")` (počúvať `CONSENT_CHANGE_EVENT`), doplniť `Cookies.table` a zásady ochrany údajov. Návštevníci, ktorí už odpovedali, sa spýtajú znova.

## SEO a Open Graph

- `lib/seo.ts` → `buildMetadata()` je jediné miesto pre `<title>`/description/OG/Twitter na stránkach. Detailné stránky (kostol, oznam, udalosť) nemajú Strapi `seo` pole — metadáta sa odvodzujú z ich polí (pozri `cms/CLAUDE.md`).
- Predvolený OG obrázok: `public/images/og-default.png` (logo na navy pozadí, 1200×630 PNG — nie SVG, sociálne siete ho nevykresľujú). Next **neslučuje** `openGraph`/`twitter` medzi layoutom a stránkou (podradený objekt nahradí rodičovský), preto ich `buildMetadata()` vždy zostaví celé.
- `app/sitemap.ts`: pre každý povolený jazyk všetky statické stránky s hreflang alternatívami + `x-default`, plus kostoly, oznamy a udalosti z CMS; výpadok CMS sekciu len vynechá. `robots.ts` odkazuje na `/sitemap.xml`.

## Premenné prostredia

| Premenná | Povinná | Účel |
|---|---|---|
| `STRAPI_URL`, `NEXT_PUBLIC_STRAPI_URL` | áno | adresa CMS (na produkcii `https://`) |
| `NEXT_PUBLIC_SITE_URL` | áno | verejná adresa webu (sitemap, OG, metadataBase) |
| `STRAPI_API_TOKEN` | nie | read-only token (verejné čítanie funguje aj bez neho) |
| `STRAPI_FORMS_TOKEN` | pre formulár | Custom token, len `create` na `contact-message` |
| `RESEND_API_KEY` | pre formulár | kľúč z Resendu |
| `MAIL_FROM` | pre formulár | odosielateľ na overenej doméne, napr. `Katedrála sv. Martina <web@katedralabratislava.sk>` |
| `CONTACT_TO_EMAIL` | pre formulár | adresa farského úradu, kam chodia správy |

## Stav: čo nie je hotové
Aktuálny zoznam vedie Obsidian poznámka klienta (sekcia „Čo nie je hotové“). Skrátene: externý link na exkurzie, rozhodnutie o MainSquare/rezerváciách, reálne udalosti a koncerty, ďalšie jazyky + detekcia jazyka zariadenia, render kolekcie `Page`, alt texty médií, zavedenie cache (plán v Obsidiane), produkčná DB/uploady v CMS, právna kontrola GDPR textov.
