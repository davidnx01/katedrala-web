import { useTranslations } from "next-intl";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { StrapiContactLocation } from "@/types/strapi";
import { Badge } from "@/components/ui/badge";

interface ContactCardProps {
  contact: StrapiContactLocation;
}

export function ContactCard({ contact }: ContactCardProps) {
  const t = useTranslations("Contacts");

  const hoursText = contact.hours?.length
    ? contact.hours.map((row) => `${row.dayLabel}: ${row.time}`).join(", ")
    : undefined;

  const rows = [
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: contact.address,
      href: undefined,
    },
    contact.phone
      ? {
          icon: Phone,
          label: t("phoneLabel"),
          value: contact.phone,
          href: `tel:${contact.phone.replace(/\s/g, "")}`,
        }
      : undefined,
    contact.email
      ? {
          icon: Mail,
          label: t("emailLabel"),
          value: contact.email,
          href: `mailto:${contact.email}`,
        }
      : undefined,
    hoursText
      ? {
          icon: Clock,
          label: t("hoursLabel"),
          value: hoursText,
          href: undefined,
        }
      : undefined,
  ].filter((row): row is Exclude<typeof row, undefined> => row !== undefined);

  return (
    <div className="rounded-2xl border border-stone bg-white overflow-hidden">
      <div className="w-full h-30 md:h-32.5 lg:h-58 relative overflow-hidden">
        <ImagePlaceholder
          src={getStrapiMediaUrl(contact.photo) ?? ""}
          label={`Foto: ${contact.name}`}
          className="absolute w-full h-full inset-0 object-cover object-center"
        />
        {contact.tags && contact.tags.length > 0 && (
          <div className="absolute inset-x-0 top-0 flex flex-wrap items-start justify-start gap-1 bg-linear-to-b from-navy/70 to-transparent p-3">
            {contact.tags.map((tag) => (
              <Badge
                key={tag}
                className="rounded-lg border border-gold/40 bg-navy/70 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-gold uppercase backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
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
