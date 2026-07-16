"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactMap } from "@/components/sections/ContactMap";
import { ContactLocationCard } from "@/components/cards/ContactLocationCard";
import { mockContactPageLocations } from "@/lib/mock-data";

export function ContactLocations() {
  const t = useTranslations("ContactPage");
  const [activeId, setActiveId] = useState(mockContactPageLocations[0].id);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={t("locationsEyebrow")} title={t("locationsTitle")} />
        <div className="mb-6 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 lg:mb-10 lg:grid-cols-3 lg:gap-6">
          {mockContactPageLocations.map((location) => (
            <ContactLocationCard
              key={location.id}
              location={location}
              isActive={activeId === location.id}
              onSelect={() => setActiveId(location.id)}
            />
          ))}
        </div>
        <ContactMap
          locations={mockContactPageLocations}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </Container>
    </section>
  );
}
