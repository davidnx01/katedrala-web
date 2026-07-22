# Web — Katedrála sv. Martina

Next.js frontend webu farnosti. Detailná dokumentácia (štruktúra stránok,
dizajn systém, API vrstva, SEO, i18n) je v [`CLAUDE.md`](./CLAUDE.md).

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
podľa jeho README) netreba meniť nič, defaultné hodnoty už sedia.

```bash
pnpm run dev
```

Web beží na `http://localhost:3000`.

## Nasadenie na produkciu

1. Nasaď ako bežný Next.js proces (`pnpm run build && pnpm run start`) alebo
   na Vercel.
2. V `.env` na produkcii nastav:
   - `STRAPI_URL` / `NEXT_PUBLIC_STRAPI_URL` — skutočná adresa, kde beží CMS.
   - `NEXT_PUBLIC_SITE_URL` — skutočná adresa tohto webu.
   - presný popis každej premennej je priamo v `.env.example`.
3. (Voliteľné) V Strapi admine nastav webhook, aby sa zmeny obsahu prejavili
   na webe okamžite — presný postup je v `../cms` README/CLAUDE.md sekcia
   "On-demand revalidation webhook".
