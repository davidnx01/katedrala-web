import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { StrapiRecordingItem } from "@/types/strapi";

interface RecordingCardProps {
  recording: StrapiRecordingItem;
}

export function RecordingCard({ recording }: RecordingCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone bg-white transition-all duration-250 hover:-translate-y-1 hover:border-gold">
      <div className="relative h-40 md:h-45 lg:h-50">
        <ImagePlaceholder
          label={`Obal: ${recording.title}`}
          src={getStrapiMediaUrl(recording.photo) ?? undefined}
          alt={recording.title}
          className="h-full"
        />
      </div>
      <div className="p-4 md:p-4.5 lg:p-5">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="rounded-full bg-gold-light px-2.5 py-0.75 text-[11px] font-semibold text-gold-dark">
            {recording.type}
          </span>
          {recording.year && <span className="text-xs text-[#A39E94]">{recording.year}</span>}
        </div>
        <h3 className="mb-1.5 text-[15px] leading-snug font-semibold text-navy md:text-base">
          {recording.title}
        </h3>
        <p className="m-0 text-[13px] leading-relaxed text-[#7A756B]">{recording.description}</p>
      </div>
    </div>
  );
}
