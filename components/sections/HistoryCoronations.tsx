import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { toParagraphs } from "@/lib/utils";
import type { StrapiCoronationKing } from "@/types/strapi";

interface HistoryCoronationsProps {
  eyebrow: string;
  title: string;
  body?: string;
  listLabel?: string;
  kings: StrapiCoronationKing[];
}

export function HistoryCoronations({ eyebrow, title, body, listLabel, kings }: HistoryCoronationsProps) {
  return (
    <section className="bg-navy py-12 md:py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} light />
          <div className="-mt-4 flex flex-col gap-4">
            {toParagraphs(body).map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.75] text-white/55 md:text-[17px]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div>
          {listLabel && (
            <div className="mb-4 text-[11px] font-semibold tracking-widest text-white/30 uppercase">
              {listLabel}
            </div>
          )}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {kings.map((king) => (
              <div
                key={king.name}
                className="flex items-center justify-between rounded-[10px] border border-white/6 bg-white/3 px-4 py-3"
              >
                <span className="text-sm font-medium text-white/70">{king.name}</span>
                <span className="text-sm font-semibold text-gold">{king.year}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
