"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactMap } from "@/components/sections/ContactMap";
import { ContactLocationCard } from "@/components/cards/ContactLocationCard";
import type { StrapiContactLocation } from "@/types/strapi";

interface ContactLocationsProps {
  locations: StrapiContactLocation[];
}

export function ContactLocations({ locations }: ContactLocationsProps) {
  const t = useTranslations("ContactPage");
  const [activeIndex, setActiveIndex] = useState(0);

  if (locations.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={t("locationsEyebrow")} title={t("locationsTitle")} />
        <div className="mb-6 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 lg:mb-10 lg:grid-cols-3 lg:gap-6">
          {locations.map((location, index) => (
            <ContactLocationCard
              key={location.slug ?? location.name}
              location={location}
              isActive={activeIndex === index}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <ContactMap
          locations={locations}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </Container>
    </section>
  );
}
