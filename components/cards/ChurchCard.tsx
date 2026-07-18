import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Badge } from "@/components/ui/badge";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { ChurchPreview } from "@/types/content";

interface ChurchCardProps {
  church: ChurchPreview;
}

export function ChurchCard({ church }: ChurchCardProps) {
  const t = useTranslations("Churches");

  return (
    <Link
      href={`/kostoly/${church.slug}`}
      className="group block overflow-hidden rounded-2xl border border-stone bg-white transition-[border-color,transform] duration-250 hover:-translate-y-1 hover:border-gold"
    >
      <div className="w-full h-35 md:h-42.5 lg:h-50 relative">
        <ImagePlaceholder
          label={`Foto: ${church.name}`}
          src={getStrapiMediaUrl(church.photo) ?? ""}
          className="absolute w-full h-full inset-0 z-0 object-cover object-center"
        />
        <Badge className="absolute top-2.5 left-2.5 rounded-lg border border-gold/40 bg-navy/70 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-gold uppercase backdrop-blur-sm">
          {church.type === "kostol" ? t("typeChurch") : t("typeChapel")}
        </Badge>
      </div>

      <div className="p-3 md:p-3.5 lg:p-4">
        <h3 className="mb-1.5 text-base leading-snug font-bold text-navy font-heading">
          {church.name}
        </h3>
        <p className="text-sm text-black/75">{church.address}</p>
      </div>
    </Link>
  );
}
