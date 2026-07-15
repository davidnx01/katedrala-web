import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactCard } from "@/components/cards/ContactCard";
import { mockContacts } from "@/lib/mock-data";

export function ContactsSection() {
  const t = useTranslations("Contacts");

  return (
    <section className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} center />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5">
          {mockContacts.map((contact) => (
            <ContactCard key={contact.name} contact={contact} />
          ))}
        </div>
      </Container>
    </section>
  );
}
