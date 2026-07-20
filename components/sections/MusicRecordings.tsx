import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { RecordingCard } from "@/components/cards/RecordingCard";
import type { StrapiRecordingItem } from "@/types/strapi";

interface MusicRecordingsProps {
  eyebrow: string;
  title: string;
  recordings: StrapiRecordingItem[];
}

export function MusicRecordings({ eyebrow, title, recordings }: MusicRecordingsProps) {
  if (recordings.length === 0) return null;

  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} center />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4.5">
          {recordings.map((recording) => (
            <RecordingCard key={recording.title} recording={recording} />
          ))}
        </div>
      </Container>
    </section>
  );
}
