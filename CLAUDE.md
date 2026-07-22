# PROJECT.md — Katedrála sv. Martina, Bratislava

> Web pre farnosť a Dom sv. Martina. Dvojjazyčný (SK/EN). Cieľovka: farníci (60%), turisti (30%), kultúra (10%). Prístupný pre 12–65+ rokov.

## Tech stack

- Next.js 15+ (App Router)
- TypeScript (strict, no `any`)
- Tailwind CSS 4+
- shadcn/ui
- Strapi 5 (self-hosted, headless CMS)
- Playfair Display (serif headings, Google Fonts)
- Resend (email z formulárov)

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

### Hlavná (5 položiek)
1. Domov
2. Farnosť
3. Návšteva
4. Kostoly
5. Kontakt

### Footer (sekundárna)
- Kapitulská ulica
- Hudba a koncerty
- Martineum
- Ochrana údajov

### Jazykový prepínač
SK/EN, viditeľný v headeri. Prepnutie zachová aktuálnu stránku.

## Folder structure

```
app/
  [locale]/
    layout.tsx              ← root layout, fonty, metadata
    page.tsx                ← homepage
    farnost/
      page.tsx              ← listing (oznamy, sviatosti)
      oznamy/
        page.tsx            ← archív oznamov
        [slug]/page.tsx     ← detail oznamu
      sobas/page.tsx
      krst/page.tsx
      lectio-divina/page.tsx
      adoracia/page.tsx
    navsteva/
      page.tsx              ← info pre turistov
      rezervacia/page.tsx
      exkurzia/page.tsx
      omsa-s-knazom/page.tsx
      sprievodca/page.tsx
      audioguides/page.tsx
    kostoly/
      page.tsx              ← listing (7 kostolov + 6 kaplniek)
      [slug]/page.tsx       ← detail kostola/kaplnky
    kontakt/page.tsx
    historia/page.tsx        ← /historia (pevné polia, fixné poradie sekcií v kóde)
    hudba/page.tsx           ← /hudba (pevné polia, fixné poradie sekcií; koncerty ťahané naživo z Concert)
    udalosti/
      page.tsx               ← týždenný kalendár udalostí
      [slug]/page.tsx        ← detail udalosti
    kapitulska/page.tsx
    martineum/page.tsx

components/
  layout/
    Header.tsx
    Footer.tsx
    Container.tsx
    MobileMenu.tsx
    LanguageSwitcher.tsx
  cards/
    ContactCard.tsx
    ChurchCard.tsx
    AnnouncementCard.tsx
    QuickLinkCard.tsx
    EventCard.tsx
  sections/
    Hero.tsx
    MassSchedule.tsx
    ChurchesPreview.tsx
    ContactsSection.tsx
    AnnouncementsPreview.tsx
  forms/
    ReservationForm.tsx
    ExcursionForm.tsx
    ContactForm.tsx
  ui/                        ← shadcn (Button, Dialog, Sheet, Input...)

lib/
  api.ts                     ← Strapi fetch funkcie (server-only)
  strapi-media.ts            ← getStrapiMediaUrl() — bezpečné aj v Client Components
  announcements.ts           ← mock-backed data layer (dočasné, kým Strapi nemá obsah — pozri nižšie)
  mock-data.ts                ← placeholder dáta, tvarovo zhodné so Strapi typmi
  utils.ts                   ← helper funkcie

types/
  strapi.ts                  ← Strapi response/komponent/dynamic-zone typy
  content.ts                 ← aplikačné content model typy

app/api/
  revalidate/route.ts        ← on-demand ISR webhook receiver (Strapi → Next.js)

messages/
  sk.json                    ← slovenské preklady
  en.json                    ← anglické preklady
```

## Strapi content types

Presné schémy (komponenty, kolekcie, single types, dynamic zones) sú zdokumentované v `cms/CLAUDE.md` — to je zdroj pravdy. Zhrnutie:

- **Collections**: `Church`, `Announcement`, `Concert`, `Event` (kalendár udalostí na homepage), `Page` (generická flexibilná stránka pre Kapitulskú, Martineum, Sprievodcu, Audioguides, Exkurziu, Omšu s kňazom — nová stránka = nový záznam, nie nová schéma), `Reservation`/`Excursion`/`ContactMessage` (archív formulárov).
- **Single types**: `Homepage`, `ParishPage` (`/farnost`), `VisitPage` (`/navsteva`), `ContactPage` (`/kontakt`), `HistoryPage` (`/historia`), `MusicPage` (`/hudba` — koncerty na stránke sú live dáta z `Concert`, nie CMS pole), `Global` (siteName/tagline/footer text — navigácia a footer odkazy zostávajú fixné v kóde, pozri Navigácia nižšie) — každý má vlastné štrukturálne polia (HistoryPage/VisitPage/MusicPage majú fixné poradie sekcií v kóde namiesto dynamic zone) + prípadne `sections` dynamic zone pre kompozovateľný obsah.
- **Zdieľané komponenty**: `shared.seo`, `shared.cta`, `shared.meta-row`, `shared.mass-time`, `shared.hours-row` (dayLabel/time/note?), `shared.contact-location`, `shared.faq-item`, `layout.hero-section` (slideshow-ready: `images[]` + 3-časťový titulok), `layout.quick-link`, `layout.quick-link-card` (homepage quick links s fotkou), `layout.stat-item`, `layout.journey-step`, `layout.ticket-row`, `layout.restriction-item`, `layout.timeline-event`, `layout.coronation-king`, `layout.recording-item`, `layout.venue-feature`, `layout.venue-space` (prepínacie záložky „Čo tu nájdete“ na `/navsteva`), a desať `sections.*` komponentov (rich-text, image-text, cta-banner, gallery, faq, quick-nav, mass-schedule, announcements-preview, churches-preview, contacts).

Zodpovedajúce TypeScript typy: `types/strapi.ts` (Strapi-tvarové typy, komponenty, `FlexiblePageSection`/`HomepageSection`/`ParishPageSection`/`VisitPageSection`/`ContactPageSection` dynamic-zone union typy) a `types/content.ts` (aplikačné typy: `Church`, `Announcement`, `Concert` (má `isFree`), `Event`, `Global`, `Page`, `Homepage`, `ParishPage`, `VisitPage`, `ContactPage`, `HistoryPage`, `MusicPage`, `ReservationInput`/`ExcursionInput`/`ContactMessageInput`).

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

### On-demand revalidation

`app/api/revalidate/route.ts` prijíma Strapi webhooky (`x-revalidate-secret` header, timing-safe porovnanie) a volá `revalidateTag()` — publikovaný obsah sa prejaví okamžite namiesto čakania na časový interval. Nastavenie webhooku: `cms/CLAUDE.md`.

Revalidácia (timed fallback): announcements 60s, churches/concerts 3600s, homepage/parish-page 300s, visit-page/contact-page/pages 86400s.

## Prístupnosť (WCAG 2.1 AA)

- Kontrast min 4.5:1 text, 3:1 veľký text + ikony.
- lang="sk" / lang="en" na html elemente.
- Alt texty na každej fotografii.
- Klávesnicová navigácia (TAB + Enter) cez celú stránku.
- Focus-visible ring na interaktívnych prvkoch.
- Žiadne hover-only informácie.
- `tel:` a `mailto:` linky na telefónoch a emailoch.
- Skip to content link.
- Min 48px touch target na mobile.

## Formuláre (Resend + Next.js Server Action)

Formuláre: ReservationForm, ExcursionForm, ContactForm.
Submit → Server Action → Resend API → email na farský úrad + potvrdenie odosielateľovi.
Voliteľne: uložiť záznam do Strapi collection (Reservation, Excursion) pre archív v admin paneli.
Validácia: zod schema, client + server side.

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

**Otvorené otázky (stretnutie s klientom):**
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
