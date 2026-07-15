import { useTranslations } from "next-intl";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import type { ContactLocation } from "@/types/content";

interface ContactCardProps {
  contact: ContactLocation;
}

export function ContactCard({ contact }: ContactCardProps) {
  const t = useTranslations("Contacts");

  const rows = [
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: contact.address,
      href: undefined,
    },
    {
      icon: Phone,
      label: t("phoneLabel"),
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: t("emailLabel"),
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Clock,
      label: t("hoursLabel"),
      value: contact.hours,
      href: undefined,
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-stone bg-white overflow-hidden">
      <div className="w-full h-30 md:h-32.5 lg:h-58 relative overflow-hidden">
        <ImagePlaceholder
          src={contact.photo?.url ?? ""}
          label={`Foto: ${contact.name}`}
          className="absolute w-full h-full inset-0 object-cover object-center"
        />
      </div>
      <div className="w-full p-5 md:p-6 lg:p-6 flex flex-col items-start justify-start gap-4">
        <h3 className="font-serif text-lg font-bold text-navy md:text-xl lg:text-2xl">
          {contact.name}
        </h3>
        <div className="w-full flex flex-col items-start justify-start">
          {rows.map((row) => {
            const Icon = row.icon;
            const content = (
              <>
                <Icon
                  size={20}
                  className="mt-0.5 shrink-0 text-gold"
                  aria-hidden="true"
                />
                {row.value}
              </>
            );
            return row.href ? (
              <a
                key={row.label}
                href={row.href}
                aria-label={`${row.label}: ${row.value}`}
                className="flex min-h-8 items-center gap-2 py-1.5 text-sm lg:text-base leading-relaxed text-[#7A756B] hover:text-navy"
              >
                {content}
              </a>
            ) : (
              <div
                key={row.label}
                className="flex min-h-8 items-center gap-2 py-1.5 text-sm lg:text-base leading-relaxed text-[#7A756B]"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
