import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/utils";
import type { StrapiTimelineEvent } from "@/types/strapi";

interface HistoryTimelineProps {
  eyebrow: string;
  title: string;
  events: StrapiTimelineEvent[];
}

export function HistoryTimeline({ eyebrow, title, events }: HistoryTimelineProps) {
  if (events.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} center />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-stone sm:block" />
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={event.year}
                className={cn(
                  "relative mb-6 flex items-start gap-4 sm:mb-8 sm:items-center sm:gap-6 md:mb-10 md:gap-8",
                  isLeft ? "sm:flex-row" : "sm:flex-row-reverse",
                )}
              >
                <div className="relative z-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-warm bg-navy font-serif text-sm font-bold text-gold sm:h-16 sm:w-16 sm:text-base lg:h-18 lg:w-18 lg:text-lg">
                  {event.year}
                </div>
                <div
                  className={cn(
                    "flex-1 rounded-2xl border border-stone bg-white p-4 sm:p-5 md:p-6",
                    isLeft ? "sm:text-right" : "sm:text-left",
                  )}
                >
                  <h3 className="mb-1 text-lg font-semibold text-navy md:text-xl">{event.title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-[#7A756B] md:text-[15px]">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
