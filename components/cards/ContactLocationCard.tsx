import { useTranslations } from "next-intl";
import { Check, ChevronDown, Clock, CreditCard, ListChecks, Mail, MapPin, Phone, User } from "lucide-react";
import { cn, splitDescription } from "@/lib/utils";
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
    location.emergencyPhone
      ? {
          icon: Phone,
          label: t("emergencyPhoneLabel"),
          value: `${t("emergencyPhoneLabel")}: ${location.emergencyPhone}`,
          href: `tel:${location.emergencyPhone.replace(/\s/g, "")}`,
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

  const billingRows = [
    location.accountHolderName,
    location.ico ? `${t("icoLabel")}: ${location.ico}` : undefined,
    location.dic ? `${t("dicLabel")}: ${location.dic}` : undefined,
  ].filter((row): row is string => Boolean(row));

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
        <h3 className="font-serif text-lg font-semibold text-navy md:text-xl">
          {location.name}
        </h3>
      </div>

      {location.description && (
        <details
          className="group w-full rounded-xl border border-stone bg-surface open:border-gold/40"
          onClick={(e) => e.stopPropagation()}
        >
          <summary className="flex min-h-11 list-none items-center justify-between gap-2 p-3 [&::-webkit-details-marker]:hidden [&::marker]:content-none">
            <span className="flex items-center gap-2 text-sm font-semibold text-navy">
              <ListChecks
                size={16}
                className={cn("shrink-0", isActive ? "text-gold" : "text-[#A39E94]")}
                aria-hidden="true"
              />
              {t("whatsHereLabel")}
            </span>
            <ChevronDown
              size={16}
              className="shrink-0 text-[#A39E94] transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <ul className="flex flex-col gap-1.5 px-3 pb-4.5">
            {splitDescription(location.description).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#7A756B]">
                <Check size={14} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

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
            <div key={row.dayLabel} className="py-1">
              <div className="flex items-center justify-between text-sm text-[#7A756B]">
                <span>{row.dayLabel}</span>
                <span className="font-semibold text-[#2C2A26]">{row.time}</span>
              </div>
              {row.note && (
                <p className="text-xs text-[#A39E94]">{row.note}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {location.staff && location.staff.length > 0 && (
        <div className="w-full rounded-xl bg-surface p-3.5">
          <div className="mb-2 flex items-center gap-1.5">
            <User
              size={14}
              className={cn(isActive ? "text-gold" : "text-[#A39E94]")}
              aria-hidden="true"
            />
            <span className="text-xs font-semibold tracking-wide text-navy">
              {t("staffLabel")}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {location.staff.map((person) => (
              <div
                key={`${person.role}-${person.name}`}
                className="flex items-center justify-between gap-2 py-1 text-sm text-[#7A756B]"
              >
                <span>
                  <span className="font-semibold text-[#2C2A26]">{person.role}:</span>{" "}
                  {person.name}
                </span>
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${person.role} ${person.name}: ${person.email}`}
                    className="shrink-0 text-gold hover:text-navy"
                  >
                    <Mail size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {billingRows.length > 0 && (
        <div className="w-full rounded-xl bg-surface p-3.5">
          <div className="mb-1.5 text-xs font-semibold tracking-wide text-navy">
            {t("billingLabel")}
          </div>
          {billingRows.map((row) => (
            <p key={row} className="py-0.5 text-sm text-[#7A756B]">
              {row}
            </p>
          ))}
        </div>
      )}
    </button>
  );
}
