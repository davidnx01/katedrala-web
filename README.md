# Web — Katedrála sv. Martina

Next.js frontend. Kompletný postup nastavenia (lokálne aj nasadenie) je
v [`../README.md`](../README.md) v koreňovom priečinku projektu.

Detailná dokumentácia (štruktúra stránok, dizajn systém, API vrstva, SEO,
i18n) je v [`CLAUDE.md`](./CLAUDE.md).

## Rýchly štart

```bash
pnpm install
cp .env.example .env   # over hodnoty — komentáre v súbore vysvetlia každú
pnpm run dev
```

Web beží na `http://localhost:3000`. Vyžaduje bežiace Strapi CMS (repozitár
`cms/`) — pozri jeho README.
