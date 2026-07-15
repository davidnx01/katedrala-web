import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { cn } from "@/lib/utils";

interface ContentSectionMeta {
  icon: LucideIcon;
  label: string;
}

interface ContentSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  meta?: ContentSectionMeta[];
  imageLabel: string;
  imageSrc?: string;
  reverse?: boolean;
  tinted?: boolean;
}

export function ContentSection({
  id,
  eyebrow,
  title,
  paragraphs,
  cta,
  meta,
  imageLabel,
  imageSrc,
  reverse,
  tinted,
}: ContentSectionProps) {
  return (
    <section id={id} className={cn("py-12 md:py-16 lg:py-20", tinted && "bg-surface")}>
      <Container
        className={cn(
          "grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16",
          reverse && "lg:[&>*:first-child]:order-2"
        )}
      >
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="-mt-4 flex flex-col gap-4">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-[#7A756B] md:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          {meta && meta.length > 0 && (
            <div className="mt-6 flex flex-col gap-2.5 border-t border-stone pt-6">
              {meta.map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.label} className="flex items-center gap-2.5 text-sm text-[#2C2A26]">
                    <Icon size={16} className="shrink-0 text-gold" aria-hidden="true" />
                    <span className="font-medium">{row.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {cta && (
            <Link
              href={cta.href}
              className="mt-6 inline-flex min-h-12 items-center rounded-lg border border-stone bg-white px-6 text-sm font-medium text-navy transition-colors hover:border-gold"
            >
              {cta.label}
            </Link>
          )}
        </div>

        <ImagePlaceholder
          label={imageLabel}
          src={imageSrc}
          alt={imageLabel}
          className="h-60 rounded-2xl md:h-75 lg:h-90"
        />
      </Container>
    </section>
  );
}
