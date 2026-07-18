import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { ArticleActions } from "@/components/sections/ArticleActions";
import { Link } from "@/i18n/navigation";
import {
  getAdjacentAnnouncements,
  getAnnouncementBySlug,
  getOlderAnnouncements,
} from "@/lib/api";

interface AnnouncementDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function AnnouncementDetailPage({ params }: AnnouncementDetailPageProps) {
  const { locale, slug } = await params;
  const announcement = await getAnnouncementBySlug({ locale, slug }).catch(() => null);

  if (!announcement) {
    notFound();
  }

  const t = await getTranslations("Parish.announcementDetail");
  const tNav = await getTranslations("Nav");
  const currentLocale = await getLocale();

  const [{ previous, next }, olderAnnouncements] = await Promise.all([
    getAdjacentAnnouncements({ locale, date: announcement.date }).catch(() => ({
      previous: null,
      next: null,
    })),
    getOlderAnnouncements({ locale, excludeSlug: slug, limit: 3 }).catch(() => []),
  ]);

  const formattedDate = new Date(announcement.date).toLocaleDateString(currentLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const paragraphs = announcement.content.split("\n\n");

  return (
    <main className="mt-14 px-4 py-8 md:mt-16 md:px-8 md:py-12 lg:mt-18 lg:px-12 lg:py-16">
      <Container className="max-w-3xl px-0">
        <Breadcrumb
          items={[
            { label: tNav("home"), href: "/" },
            { label: tNav("parish"), href: "/farnost" },
            { label: t("badge"), href: "/farnost/oznamy" },
            { label: announcement.title },
          ]}
        />

        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-gold-light px-3 py-1 text-xs font-medium text-gold-dark">
            {t("badge")}
          </span>
          <time dateTime={announcement.date} className="text-[13px] text-[#A39E94]">
            {formattedDate}
          </time>
        </div>

        <h1 className="mb-8 font-serif text-[28px] leading-tight font-bold tracking-tight text-navy md:text-[34px] lg:text-[40px]">
          {announcement.title}
        </h1>

        <div className="flex flex-col gap-5 text-base leading-[1.8] text-[#2C2A26] md:text-lg">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="my-10 border-t border-stone" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ArticleActions
            title={announcement.title}
            shareLabel={t("share")}
            printLabel={t("print")}
          />
          <div className="flex gap-4">
            {previous ? (
              <Link
                href={`/farnost/oznamy/${previous.slug}`}
                className="flex items-center gap-1 text-[13px] text-[#A39E94] hover:text-navy"
              >
                <ChevronLeft size={14} aria-hidden="true" />
                {t("previous")}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/farnost/oznamy/${next.slug}`}
                className="flex items-center gap-1 text-[13px] font-medium text-gold"
              >
                {t("next")}
                <ChevronRight size={14} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        {olderAnnouncements.length > 0 && (
          <>
            <div className="my-8 border-t border-stone" />
            <div>
              <div className="mb-2 text-xs font-semibold tracking-widest text-gold uppercase">
                {t("olderEyebrow")}
              </div>
              <h2 className="mb-5 font-serif text-2xl font-bold text-navy lg:text-[28px]">
                {t("olderTitle")}
              </h2>
              <div className="flex flex-col gap-2.5">
                {olderAnnouncements.map((item) => (
                  <Link
                    key={item.id}
                    href={`/farnost/oznamy/${item.slug}`}
                    className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-stone bg-white px-5 py-3.5 hover:border-gold"
                  >
                    <div>
                      <div className="text-sm leading-snug font-medium text-navy md:text-base">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-xs text-[#A39E94]">
                        {new Date(item.date).toLocaleDateString(currentLocale, {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <ChevronRight size={16} className="shrink-0 text-[#A39E94]" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
