import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { IconCross } from "@/components/icons";
import { Container } from "@/components/layout/Container";
import { getContactPage } from "@/lib/api";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const locale = await getLocale();
  const contactPage = await getContactPage({ locale }).catch(() => null);
  const primaryContact = contactPage?.locations?.[0];

  const address = primaryContact
    ? [primaryContact.address, primaryContact.city].filter(Boolean).join(", ")
    : t("address");
  const phone = primaryContact?.phone || t("phone");
  const email = primaryContact?.email || t("email");

  const columns = [
    {
      title: t("parishColumn"),
      links: [
        { label: t("announcements"), href: "/farnost/oznamy" },
        { label: t("wedding"), href: "/farnost#sobas" },
        { label: t("baptism"), href: "/farnost#krst" },
        { label: t("lectioDivina"), href: "/farnost#lectio-divina" },
      ],
    },
    {
      title: t("visitColumn"),
      links: [
        { label: t("openingHours"), href: "/navsteva#info" },
        { label: t("reservation"), href: "/navsteva#info" },
        { label: t("audioguides"), href: "/navsteva#sluzby" },
        { label: t("martineum"), href: "/navsteva#martineum" },
      ],
    },
    {
      title: t("moreColumn"),
      links: [
        { label: t("churchesAndChapels"), href: "/kostoly" },
        { label: t("musicAndConcerts"), href: "#" },
        { label: t("kapitulska"), href: "#" },
        { label: t("privacy"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-gold/25 bg-navy px-4 pt-14 pb-6 text-white/50 md:px-8 md:pt-16 md:pb-8 lg:px-12 lg:pt-20 lg:pb-10">
      <Container className="grid grid-cols-1 gap-10 border-b border-white/10 px-0 pb-10 md:grid-cols-2 md:gap-12 md:pb-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10 lg:pb-14">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-gold">
              <IconCross size={48} />
            </span>
            <span className="font-serif text-xl font-semibold text-white/90">
              {tNav("brand")}
            </span>
          </div>
          <p className="max-w-[320px] text-base leading-relaxed text-white/60">
            {t("tagline")}
          </p>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
            <h4 className="mb-1 text-sm font-semibold tracking-wide text-gold uppercase">
              {t("contactColumn")}
            </h4>
            <div className="flex items-start gap-2.5 text-base text-white/65">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-gold"
                aria-hidden="true"
              />
              <span>{address}</span>
            </div>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2.5 text-base text-white/65 hover:text-white"
            >
              <Phone
                size={18}
                className="shrink-0 text-gold"
                aria-hidden="true"
              />
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2.5 text-base text-white/65 hover:text-white"
            >
              <Mail
                size={18}
                className="shrink-0 text-gold"
                aria-hidden="true"
              />
              {email}
            </a>
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h4 className="mb-4 text-base lg:text-lg font-semibold tracking-wide text-gold uppercase">
              {column.title}
            </h4>
            <ul className="flex flex-col gap-1">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block py-2 text-base leading-snug text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-wrap justify-between gap-3 px-0 pt-6 text-sm text-white/35">
        <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        <span>{t("diocese")}</span>
      </Container>
    </footer>
  );
}
