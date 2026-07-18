import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface HistoryTodayProps {
  eyebrow: string;
  title: string;
  body?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
}

export function HistoryToday({ eyebrow, title, body, ctaPrimaryLabel, ctaSecondaryLabel }: HistoryTodayProps) {
  return (
    <section className="bg-navy py-12 md:py-16 lg:py-20">
      <Container className="max-w-[800px]! text-center">
        <SectionHeading eyebrow={eyebrow} title={title} light center />
        {body && (
          <p className="-mt-4 mx-auto max-w-xl text-base leading-[1.75] text-white/55 md:text-lg">{body}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {ctaPrimaryLabel && (
            <Button render={<Link href="/navsteva" />} nativeButton={false} className="w-full sm:w-fit whitespace-nowrap">
              {ctaPrimaryLabel}
            </Button>
          )}
          {ctaSecondaryLabel && (
            <Button
              render={<Link href="/kostoly" />}
              nativeButton={false}
              variant="outline"
              className="w-full sm:w-fit whitespace-nowrap"
            >
              {ctaSecondaryLabel}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
