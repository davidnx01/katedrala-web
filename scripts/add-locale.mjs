#!/usr/bin/env node
// Usage: pnpm i18n:add <code>   (e.g. pnpm i18n:add it)
//
// Adds a language to the site in one step:
//   1. enables the code in i18n/config.ts (ENABLED_LOCALES) — routing, sitemap
//      alternates, language switcher, <html lang> and Open Graph locale all
//      derive from that single list;
//   2. scaffolds messages/<code>.json from the English file, so the new
//      language starts complete (English wording) and every key is ready to
//      translate. Untranslated keys never break the site anyway — missing keys
//      fall back to the default language (see i18n/request.ts).

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const code = process.argv[2]?.trim().toLowerCase();

const languages = JSON.parse(readFileSync(join(root, "i18n/languages.json"), "utf8"));

if (!code) {
  console.error(`Usage: pnpm i18n:add <code>\nKnown codes: ${Object.keys(languages).join(", ")}`);
  process.exit(1);
}
if (!languages[code]) {
  console.error(
    `Unknown language "${code}". Add it to i18n/languages.json first (ISO 639-1 code, e.g. "cs" for Czech).\nKnown codes: ${Object.keys(languages).join(", ")}`,
  );
  process.exit(1);
}

const configPath = join(root, "i18n/config.ts");
const config = readFileSync(configPath, "utf8");
const match = config.match(/export const ENABLED_LOCALES = \[([^\]]*)\]/);
if (!match) {
  console.error("Could not find ENABLED_LOCALES in i18n/config.ts");
  process.exit(1);
}

const enabled = [...match[1].matchAll(/"([a-z]{2,3})"/g)].map((m) => m[1]);
if (enabled.includes(code)) {
  console.log(`"${code}" is already enabled.`);
} else {
  const next = [...enabled, code].map((c) => `"${c}"`).join(", ");
  writeFileSync(configPath, config.replace(match[0], `export const ENABLED_LOCALES = [${next}]`));
  console.log(`Enabled "${code}" in i18n/config.ts`);
}

const messagesPath = join(root, `messages/${code}.json`);
if (existsSync(messagesPath)) {
  console.log(`messages/${code}.json already exists — left untouched.`);
} else {
  writeFileSync(messagesPath, readFileSync(join(root, "messages/en.json"), "utf8"));
  console.log(`Created messages/${code}.json (English wording — translate the values).`);
}

console.log(`
Next steps:
  1. Translate the values in messages/${code}.json, then run: pnpm i18n:check
  2. Strapi admin → Settings → Internationalization → add the "${code}" locale
     (content is then created per content type via the locale switcher).
  3. Rebuild/redeploy the web.`);
