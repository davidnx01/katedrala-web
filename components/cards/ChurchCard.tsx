import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import type { ChurchPreview } from "@/types/content";

interface ChurchCardProps {
  church: ChurchPreview;
}

export function ChurchCard({ church }: ChurchCardProps) {
  return (
    <Link
      href={`/kostoly/${church.slug}`}
      className="group block overflow-hidden rounded-2xl border border-stone bg-white transition-[border-color,transform] duration-250 hover:-translate-y-1 hover:border-gold"
    >
      <div className="w-full h-35 md:h-42.5 lg:h-50 relative">
        <ImagePlaceholder
          label={`Foto: ${church.name}`}
          src={church.photo?.url ?? ""}
          className="absolute w-full h-full inset-0 z-0 object-cover object-center"
        />
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
