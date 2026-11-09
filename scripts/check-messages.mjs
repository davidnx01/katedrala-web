#!/usr/bin/env node
// Usage: pnpm i18n:check
// Verifies that every enabled language has exactly the keys of the default
// language. Exit code 1 when keys are missing (CI-friendly).

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = readFileSync(join(root, "i18n/config.ts"), "utf8");

const enabled = [
  ...(config.match(/export const ENABLED_LOCALES = \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([a-z]{2,3})"/g),
].map((m) => m[1]);
const defaultLocale = config.match(/export const DEFAULT_LOCALE = "([a-z]{2,3})"/)?.[1];

if (!defaultLocale || enabled.length === 0) {
  console.error("Could not read ENABLED_LOCALES / DEFAULT_LOCALE from i18n/config.ts");
  process.exit(1);
}

function flatten(object, prefix = "") {
  return Object.entries(object).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? flatten(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

function load(locale) {
  const path = join(root, `messages/${locale}.json`);
  return existsSync(path) ? new Set(flatten(JSON.parse(readFileSync(path, "utf8")))) : null;
}

const reference = load(defaultLocale);
let failed = false;

for (const locale of enabled) {
  if (locale === defaultLocale) continue;
  const keys = load(locale);
  if (!keys) {
    console.error(`✗ ${locale}: messages/${locale}.json is missing`);
    failed = true;
    continue;
  }
  const missing = [...reference].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !reference.has(key));
  if (missing.length) {
    failed = true;
    console.error(`✗ ${locale}: ${missing.length} missing key(s)\n   ${missing.join("\n   ")}`);
  }
  if (extra.length) {
    console.warn(`! ${locale}: ${extra.length} key(s) not in ${defaultLocale}\n   ${extra.join("\n   ")}`);
  }
  if (!missing.length) console.log(`✓ ${locale}: all ${reference.size} keys present`);
}

process.exit(failed ? 1 : 0);
