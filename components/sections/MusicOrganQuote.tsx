import { Container } from "@/components/layout/Container";

interface MusicOrganQuoteProps {
  text?: string;
  author?: string;
}

export function MusicOrganQuote({ text, author }: MusicOrganQuoteProps) {
  if (!text) return null;

  return (
    <section className="bg-navy py-12 md:py-16 lg:py-20">
      <Container className="max-w-[800px]! text-center">
        <div className="mb-5 font-serif text-5xl leading-none text-gold opacity-30 lg:text-6xl" aria-hidden="true">
          &ldquo;
        </div>
        <p className="mb-5 font-serif text-lg leading-relaxed font-normal text-white/75 italic md:text-2xl lg:text-[26px]">
          {text}
        </p>
        <div className="mx-auto mb-4 h-px w-10 bg-gold opacity-40" />
        {author && <p className="text-sm text-white/35">{author}</p>}
      </Container>
    </section>
  );
}
