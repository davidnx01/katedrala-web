import { useTranslations } from "next-intl";
import { Mail, User } from "lucide-react";
import type { StrapiContactLocation, StrapiStaffMember } from "@/types/strapi";

interface ContactStaffBannerProps {
  staff: StrapiStaffMember[];
  billing?: Pick<StrapiContactLocation, "accountHolderName" | "iban" | "ico" | "dic">;
}

export function ContactStaffBanner({ staff, billing }: ContactStaffBannerProps) {
  const t = useTranslations("Contacts");

  const billingRows = [
    billing?.accountHolderName,
    billing?.iban ? `${t("ibanLabel")}: ${billing.iban}` : undefined,
    billing?.ico ? `${t("icoLabel")}: ${billing.ico}` : undefined,
    billing?.dic ? `${t("dicLabel")}: ${billing.dic}` : undefined,
  ].filter((row): row is string => Boolean(row));

  if (staff.length === 0 && billingRows.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border-2 border-stone bg-white p-5 md:mb-8 md:p-6 lg:mb-10">
      {staff.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <User size={16} className="text-gold" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-wide text-navy uppercase">
              {t("staffLabel")}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
            {staff.map((person) => (
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
        <div className={staff.length > 0 ? "mt-4 border-t border-stone pt-4" : undefined}>
          <div className="mb-1.5 text-xs font-semibold tracking-wide text-navy uppercase">
            {t("billingLabel")}
          </div>
          {billingRows.map((row) => (
            <p key={row} className="py-0.5 text-sm text-[#7A756B]">
              {row}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
