import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { StrapiRestrictionItem } from "@/types/strapi";

interface VisitRestrictionsProps {
  eyebrow: string;
  title: string;
  restrictions: StrapiRestrictionItem[];
}

export function VisitRestrictions({ eyebrow, title, restrictions }: VisitRestrictionsProps) {
  if (restrictions.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container className="max-w-[900px]!">
        <SectionHeading eyebrow={eyebrow} title={title} center />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
          {restrictions.map((rule) => (
            <div
              key={rule.text}
              className="flex items-start gap-3 rounded-xl border border-stone bg-white p-4 md:p-4.5"
            >
              <span className="mt-0.5 shrink-0 text-xl" aria-hidden="true">
                {rule.icon}
              </span>
              <span className="text-sm leading-relaxed text-[#7A756B] md:text-[15px]">{rule.text}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
