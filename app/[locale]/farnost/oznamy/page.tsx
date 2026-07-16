import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/layout/Container";
import { AnnouncementCard } from "@/components/cards/AnnouncementCard";
import { Pagination } from "@/components/layout/Pagination";
import { getAnnouncements } from "@/lib/announcements";

interface AnnouncementsArchivePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function AnnouncementsArchivePage({
  params,
  searchParams,
}: AnnouncementsArchivePageProps) {
  const { locale } = await params;
  const { page } = await searchParams;
  const t = await getTranslations("Parish.announcementsArchive");
  const tNav = await getTranslations("Nav");

  const { items, pagination } = getAnnouncements({
    locale,
    page: page ? Number(page) : 1,
  });

  return (
    <main>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        imageLabel={t("imageAlt")}
        breadcrumbItems={[
          { label: tNav("home"), href: "/" },
          { label: tNav("parish"), href: "/farnost" },
          { label: t("breadcrumb") },
        ]}
      />
      <section className="py-12 md:py-16 lg:py-20">
        <Container>
          <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5">
            {items.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
          <Pagination
            currentPage={pagination.page}
            pageCount={pagination.pageCount}
            basePath="/farnost/oznamy"
            labels={{
              previous: t("paginationPrevious"),
              next: t("paginationNext"),
            }}
          />
        </Container>
      </section>
    </main>
  );
}
