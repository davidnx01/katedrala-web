import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { StrapiJourneyStep } from "@/types/strapi";

interface VisitJourneyProps {
  eyebrow: string;
  title: string;
  steps: StrapiJourneyStep[];
}

export function VisitJourney({ eyebrow, title, steps }: VisitJourneyProps) {
  if (steps.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} center />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, i) => (
            <div key={step.title} className="overflow-hidden rounded-[20px] border border-stone bg-white">
              <div className="relative h-40 md:h-45 lg:h-50">
                <ImagePlaceholder
                  label={step.title}
                  src={getStrapiMediaUrl(step.image) ?? undefined}
                  alt={step.title}
                  className="h-full"
                />
                <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-navy text-sm font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-4 md:p-4.5 lg:p-5">
                <h3 className="mb-1.5 text-base font-semibold text-navy md:text-[17px] lg:text-lg">
                  {step.title}
                </h3>
                <p className="m-0 text-sm leading-relaxed text-[#7A756B]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
