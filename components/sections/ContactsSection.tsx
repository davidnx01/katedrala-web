import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactCard } from "@/components/cards/ContactCard";
import type { ContactsSection as ContactsSectionData } from "@/types/strapi";

interface ContactsSectionProps {
  section?: ContactsSectionData;
}

export async function ContactsSection({ section }: ContactsSectionProps) {
  const t = await getTranslations("Contacts");
  const locations = section?.locations ?? [];

  if (locations.length === 0) return null;

  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={section?.eyebrow || t("eyebrow")}
          title={section?.title || t("title")}
          link={{ label: t("link"), href: "/kontakt" }}
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5">
          {locations.map((contact) => (
            <ContactCard key={contact.slug ?? contact.name} contact={contact} />
          ))}
        </div>
      </Container>
    </section>
  );
}
