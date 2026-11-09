import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/layout/Container";
import { ChurchHero } from "@/components/sections/ChurchHero";
import { ChurchInfoCard } from "@/components/sections/ChurchInfoCard";
import { ChurchGallery } from "@/components/sections/ChurchGallery";
import { ChurchMassSchedule } from "@/components/sections/ChurchMassSchedule";
import { RelatedChurches } from "@/components/sections/RelatedChurches";
import { getChurchBySlug, getGlobal } from "@/lib/api";
import { getDirectionsUrl } from "@/lib/maps";
import { buildMetadata, excerpt } from "@/lib/seo";

interface ChurchDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ChurchDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const [church, global] = await Promise.all([
    getChurchBySlug({ locale, slug }).catch(() => null),
    getGlobal({ locale }).catch(() => null),
  ]);

  if (!church) return {};

  return buildMetadata({
    title: church.name,
    description: excerpt(church.about),
    image: church.photo,
    global,
  });
}

export default async function ChurchDetailPage({
  params,
}: ChurchDetailPageProps) {
  const { locale, slug } = await params;
  const church = await getChurchBySlug({ locale, slug }).catch(() => null);

  if (!church) {
    notFound();
  }

  const t = await getTranslations("ChurchDetail");
  const tNav = await getTranslations("Nav");
  const tChurches = await getTranslations("Churches");

  const typeLabel =
    church.type === "kostol"
      ? tChurches("typeChurch")
      : tChurches("typeChapel");

  const directionsUrl = getDirectionsUrl(church);

  return (
    <main>
      <ChurchHero
        name={church.name}
        address={church.address}
        typeLabel={typeLabel}
        photo={church.photo}
        directionsUrl={directionsUrl}
        directionsLabel={t("directions")}
        breadcrumbItems={[
          { label: tNav("home"), href: "/" },
          { label: t("breadcrumbChurches"), href: "/kostoly" },
          { label: church.name },
        ]}
      />

      <section className="py-12 md:py-16 lg:py-20">
        <Container className="grid grid-cols-1 gap-y-10 lg:grid-cols-[1fr_380px] lg:gap-x-12 lg:gap-y-14">
          <ChurchMassSchedule
            title={t("massScheduleTitle")}
            schedule={church.massSchedule}
            className="lg:col-start-1"
          />

          <ChurchInfoCard
            church={church}
            directionsUrl={directionsUrl}
            className="lg:col-start-2 lg:row-span-3 lg:row-start-1"
            labels={{
              title: t("contactTitle"),
              addressLabel: t("addressLabel"),
              rectorLabel: t("rectorLabel"),
              phoneLabel: t("phoneLabel"),
              emailLabel: t("emailLabel"),
              directions: t("directions"),
              announcementsCta: t("announcementsCta"),
            }}
          />

          {church.about && (
            <div className="lg:col-start-1">
              <h2 className="mb-4 font-serif text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
                {t("aboutTitle")}
              </h2>
              <div className="church-markdown flex max-w-[68ch] flex-col gap-4 text-base leading-relaxed text-[#2C2A26] md:text-lg">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h3 className="mt-2 font-serif text-xl font-semibold text-navy md:text-2xl">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => <p>{children}</p>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-navy">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="ml-5 list-disc space-y-1">{children}</ul>
                    ),
                  }}
                >
                  {church.about}
                </ReactMarkdown>
              </div>
            </div>
          )}

          <div className="lg:col-start-1 empty:hidden">
            <ChurchGallery
              title={t("galleryTitle")}
              churchName={church.name}
              images={church.gallery}
            />
          </div>
        </Container>
      </section>

      <RelatedChurches currentSlug={church.slug} />
    </main>
  );
}
