import { getTranslations } from "next-intl/server";
import { Home } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { IconCross } from "@/components/icons";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex min-h-[70vh] items-center py-16 md:py-24">
      <Container className="flex max-w-[560px] flex-col items-center text-center">
        <IconCross size={48} className="mb-6 text-gold" />
        <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          {t("eyebrow")}
        </div>
        <h1 className="mb-4 font-serif text-[32px] font-bold tracking-tight text-navy md:text-[40px]">
          {t("title")}
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-[#7A756B] md:text-base">
          {t("body")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="dark"
            render={<Link href="/" />}
            nativeButton={false}
          >
            <Home size={24} aria-hidden="true" />
            {t("ctaHome")}
          </Button>
        </div>
      </Container>
    </main>
  );
}
