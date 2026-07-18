import { useTranslations } from "next-intl";
import { Clock, CreditCard, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StrapiContactLocation } from "@/types/strapi";

interface ContactLocationCardProps {
  location: StrapiContactLocation;
  isActive: boolean;
  onSelect: () => void;
}

export function ContactLocationCard({
  location,
  isActive,
  onSelect,
}: ContactLocationCardProps) {
  const t = useTranslations("Contacts");

  const rows = [
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: [location.address, location.city].filter(Boolean).join(", "),
      href: undefined,
    },
    location.phone
      ? {
          icon: Phone,
          label: t("phoneLabel"),
          value: location.phone,
          href: `tel:${location.phone.replace(/\s/g, "")}`,
        }
      : undefined,
    location.email
      ? {
          icon: Mail,
          label: t("emailLabel"),
          value: location.email,
          href: `mailto:${location.email}`,
        }
      : undefined,
    location.iban
      ? {
          icon: CreditCard,
          label: t("ibanLabel"),
          value: location.iban,
          href: undefined,
        }
      : undefined,
  ].filter((row): row is Exclude<typeof row, undefined> => row !== undefined);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={cn(
        "relative flex flex-col items-start gap-3.5 overflow-hidden rounded-2xl border-2 bg-white p-5 text-left transition-colors md:p-6",
        isActive ? "border-gold" : "border-stone hover:border-gold/50",
      )}
    >
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-[3px]",
          isActive ? "bg-gold" : "bg-transparent",
        )}
        aria-hidden="true"
      />

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl border",
            isActive
              ? "border-gold/30 bg-gold-light text-gold"
              : "border-stone bg-surface text-[#A39E94]",
          )}
        >
          <MapPin size={22} aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-navy md:text-xl">
            {location.name}
          </h3>
          {location.description && (
            <p className="text-[13px] text-[#A39E94]">{location.description}</p>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col">
        {rows.map((row) => {
          const Icon = row.icon;
          const content = (
            <>
              <Icon
                size={16}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-gold" : "text-[#A39E94]",
                )}
                aria-hidden="true"
              />
              {row.value}
            </>
          );
          return row.href ? (
            <a
              key={row.label}
              href={row.href}
              onClick={(e) => e.stopPropagation()}
              aria-label={`${row.label}: ${row.value}`}
              className="flex min-h-8 items-center gap-2.5 py-1 text-sm text-[#7A756B] hover:text-navy"
            >
              {content}
            </a>
          ) : (
            <div
              key={row.label}
              className="flex min-h-8 items-center gap-2.5 py-1 text-sm text-[#7A756B]"
            >
              {content}
            </div>
          );
        })}
      </div>

      {location.hours && location.hours.length > 0 && (
        <div className="w-full rounded-xl bg-surface p-3.5">
          <div className="mb-2 flex items-center gap-1.5">
            <Clock
              size={14}
              className={cn(isActive ? "text-gold" : "text-[#A39E94]")}
              aria-hidden="true"
            />
            <span className="text-xs font-semibold tracking-wide text-navy">
              {t("hoursLabel")}
            </span>
          </div>
          {location.hours.map((row) => (
            <div
              key={row.dayLabel}
              className="flex items-center justify-between py-1 text-sm text-[#7A756B]"
            >
              <span>{row.dayLabel}</span>
              <span className="font-semibold text-[#2C2A26]">{row.time}</span>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}
