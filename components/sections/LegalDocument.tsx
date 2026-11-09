import { Container } from "@/components/layout/Container";
import type { LegalSection } from "@/types/legal";

interface LegalDocumentProps {
  intro: string;
  updatedLabel: string;
  sections: LegalSection[];
  /** Rendered between the intro and the numbered sections (operator card, cookie table...). */
  children?: React.ReactNode;
  /** Rendered after the last section (cross links). */
  footer?: React.ReactNode;
}

export function LegalDocument({ intro, updatedLabel, sections, children, footer }: LegalDocumentProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container className="max-w-[800px]">
        <p className="text-base leading-relaxed text-[#2C2A26] lg:text-lg">{intro}</p>
        <p className="mt-3 text-sm text-[#A39E94]">{updatedLabel}</p>

        {children}

        <div className="mt-10 flex flex-col gap-10">
          {sections.map((section, index) => (
            <article key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-serif text-2xl font-bold text-navy md:text-[28px]">
                {index + 1}. {section.title}
              </h2>
              <div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed text-[#2C2A26] md:text-base">
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items && (
                  <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-gold">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {section.outro?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          ))}
        </div>

        {footer}
      </Container>
    </section>
  );
}
