import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { getLanguage } from "@/i18n/languages";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import "../globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal"],
});

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    applicationName: t("siteName"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: getLanguage(locale).ogLocale,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [DEFAULT_OG_IMAGE.url] },
  };
}

// Site has one fixed light design (no dark theme). Without this, Chromium's
// "Auto Dark Mode for Web Content" (Windows, tied to the OS theme) can
// repaint brand/accent colors — e.g. the /udalosti category dots looking
// washed out on Windows while rendering correctly on macOS Safari, which
// has no equivalent forced-dark heuristic.
export const viewport: Viewport = {
  colorScheme: "light",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={getLanguage(locale).dir} className={`${playfairDisplay.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-warm">
        <NextIntlClientProvider>
          <Header />
          {/*
            Safari (unlike Chrome) doesn't reliably stretch a flex-column
            child to the container's full cross-axis width when that child's
            content includes CSS grid — it shrinks to fit instead. `<main>`
            varies per page so it can't be fixed at the source; wrapping it
            here in an explicit `w-full` is the one place that covers every
            route. Same reasoning applies to Footer below.
          */}
          <div className="w-full">{children}</div>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
