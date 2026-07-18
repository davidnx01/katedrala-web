import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { IconCard } from "@/components/cards/IconCard";
import type { StrapiIconCard } from "@/types/strapi";

interface VisitServicesProps {
  eyebrow: string;
  title: string;
  services: StrapiIconCard[];
}

export function VisitServices({ eyebrow, title, services }: VisitServicesProps) {
  if (services.length === 0) return null;

  return (
    <section id="sluzby" className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} center />
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:gap-4.5 lg:grid-cols-4 lg:gap-5">
          {services.map((service) => (
            <IconCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
