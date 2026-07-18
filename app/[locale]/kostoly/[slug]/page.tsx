import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/layout/Container";
import { ChurchHero } from "@/components/sections/ChurchHero";
import { ChurchInfoCard } from "@/components/sections/ChurchInfoCard";
import { ChurchGallery } from "@/components/sections/ChurchGallery";
import { getChurchBySlug } from "@/lib/api";
import { getStrapiMediaUrl } from "@/lib/strapi-media";

interface ChurchDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ChurchDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const church = await getChurchBySlug({ locale, slug }).catch(() => null);

  if (!church) return {};

  return {
    title: church.seo?.metaTitle ?? `${church.name} | Katedrála sv. Martina`,
    description: church.seo?.metaDescription ?? church.about.split("\n\n")[0],
    robots: church.seo?.noIndex ? { index: false } : undefined,
    openGraph: church.seo?.ogImage
      ? { images: [getStrapiMediaUrl(church.seo.ogImage) ?? ""] }
      : undefined,
  };
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

  return (
    <main>
      <ChurchHero
        name={church.name}
        address={church.address}
        typeLabel={typeLabel}
        photo={church.photo}
        breadcrumbItems={[
          { label: tNav("home"), href: "/" },
          { label: t("breadcrumbChurches"), href: "/kostoly" },
          { label: church.name },
        ]}
      />

      <section className="py-12 md:py-16 lg:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="mb-4 font-serif text-2xl sm:text-3xl font-bold text-navy lg:text-4xl">
                {t("aboutTitle")}
              </h2>
              <div className="church-markdown flex flex-col gap-4 text-[15px] leading-relaxed text-[#2C2A26] md:text-base">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h3 className="mt-2 font-serif text-xl font-semibold text-navy md:text-2xl">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => <p>{children}</p>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-navy">
                        {children}
                      </strong>
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

            <ChurchGallery
              title={t("galleryTitle")}
              churchName={church.name}
              images={church.gallery}
            />
          </div>

          <ChurchInfoCard
            church={church}
            labels={{
              addressLabel: t("addressLabel"),
              rectorLabel: t("rectorLabel"),
              phoneLabel: t("phoneLabel"),
              emailLabel: t("emailLabel"),
              directions: t("directions"),
              massScheduleTitle: t("massScheduleTitle"),
            }}
          />
        </Container>
      </section>
    </main>
  );
}
