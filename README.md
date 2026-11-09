# Web — Katedrála sv. Martina

Next.js frontend webu farnosti. Detailná dokumentácia (štruktúra stránok,
dizajn systém, API vrstva, i18n, formuláre, GDPR, SEO) je v [`CLAUDE.md`](./CLAUDE.md).

Tento web je jedna polovica dvojice repozitárov — druhá je Strapi CMS
(obsahový systém, cez ktorý sa upravuje text/foto):
**https://github.com/davidnx01/katedrala-strapi**

Web bez bežiaceho CMS nefunguje (ťahá z neho všetok obsah cez API), takže
na lokálny beh potrebuješ mať naklonované a spustené **oba** repozitáre.

## Rýchly štart (lokálne)

Vyžaduje **Node.js 20+** a **pnpm** (`npm install -g pnpm`).

```bash
pnpm install
cp .env.example .env
```

Otvor `.env` a skontroluj hodnoty — každá premenná má v súbore komentár,
čo je a kam patrí. Pre lokálny beh (keď máš CMS spustené na `localhost:1337`
podľa jeho README) netreba meniť nič, defaultné hodnoty už sedia. Kontaktný
formulár funguje aj bez Resendu — e-mail sa vtedy len vypíše do konzoly.

```bash
pnpm run dev
```

Web beží na `http://localhost:3000`.

## Príkazy

| Príkaz | Čo robí |
|---|---|
| `pnpm run dev` | vývojový server |
| `pnpm run build` / `pnpm run start` | produkčný build a beh (build potrebuje prístup na Google Fonts) |
| `pnpm run lint` | ESLint |
| `pnpm i18n:add <kód>` | povolí nový jazyk (napr. `it`) a vytvorí `messages/<kód>.json` |
| `pnpm i18n:check` | overí, že všetky povolené jazyky majú všetky kľúče |

## Nasadenie na produkciu

1. Nasaď ako bežný Next.js proces (`pnpm run build && pnpm run start`) alebo
   na Vercel. Pozn.: deploy produkčného CMS je manuálny (`git pull`, build,
   reštart) — push do `main` sám nič nenasadí.
2. V `.env` na produkcii nastav (presný popis je priamo v `.env.example`):
   - `STRAPI_URL` / `NEXT_PUBLIC_STRAPI_URL` — skutočná adresa CMS, **s `https://`**.
   - `NEXT_PUBLIC_SITE_URL` — skutočná adresa tohto webu.
   - `RESEND_API_KEY`, `MAIL_FROM`, `CONTACT_TO_EMAIL` — e-maily z kontaktného formulára.
   - `STRAPI_FORMS_TOKEN` — zápis správ z formulára do archívu v CMS.
3. Web momentálne **nepoužíva žiadnu cache** (každý fetch je `no-store`), takže
   po publikovaní v CMS netreba nič revalidovať ani nastavovať webhook.
   Plánované cachovanie je popísané v `CLAUDE.md`.
