import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ConcertCard } from "@/components/cards/ConcertCard";
import type { Concert } from "@/types/content";

interface MusicConcertsProps {
  eyebrow: string;
  title: string;
  concerts: Concert[];
  freeLabel: string;
}

export function MusicConcerts({ eyebrow, title, concerts, freeLabel }: MusicConcertsProps) {
  if (concerts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4.5 lg:gap-5">
          {concerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} freeLabel={freeLabel} />
          ))}
        </div>
      </Container>
    </section>
  );
}
