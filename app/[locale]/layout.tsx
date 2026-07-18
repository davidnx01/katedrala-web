import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Katedrála sv. Martina | Bratislava",
  description:
    "Farnosť sv. Martina v Bratislave — korunovačná katedrála, kostoly a kaplnky, farské oznamy a informácie pre návštevníkov.",
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
    <html lang={locale} className={`${playfairDisplay.variable} h-full antialiased`}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
