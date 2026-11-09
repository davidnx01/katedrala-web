import type { LucideIcon } from "lucide-react";
import { ExternalLink, Mail, MapPin, Phone, User } from "lucide-react";
import type { Church } from "@/types/content";

interface ChurchInfoCardLabels {
  title: string;
  addressLabel: string;
  rectorLabel: string;
  phoneLabel: string;
  emailLabel: string;
  directions: string;
  announcementsCta: string;
}

interface ChurchInfoCardProps {
  church: Church;
  directionsUrl: string;
  labels: ChurchInfoCardLabels;
  className?: string;
}

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

function InfoRow({ icon: Icon, label, value, href }: InfoRowProps) {
  const content = (
    <>
      <Icon size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
      <span>
        <span className="block text-xs font-semibold tracking-wide text-[#7A756B] uppercase">
          {label}
        </span>
        <span className="block text-base font-medium break-words text-[#2C2A26] group-hover:text-gold-dark">{value}</span>
      </span>
    </>
  );

  return href ? (
    <a href={href} className="group flex items-start gap-3 py-3">
      {content}
    </a>
  ) : (
    <div className="flex items-start gap-3 py-3">{content}</div>
  );
}

export function ChurchInfoCard({ church, directionsUrl, labels, className }: ChurchInfoCardProps) {
  return (
    <aside className={className}>
      <div className="rounded-2xl border border-stone bg-white p-5 md:p-6 lg:sticky lg:top-24">
        <h2 className="mb-2 font-serif text-2xl font-bold text-navy">{labels.title}</h2>
        <div className="divide-y divide-stone">
          {church.rector && (
            <InfoRow icon={User} label={labels.rectorLabel} value={church.rector} />
          )}
          {church.phone && (
            <InfoRow
              icon={Phone}
              label={labels.phoneLabel}
              value={church.phone}
              href={`tel:${church.phone.replace(/\s+/g, "")}`}
            />
          )}
          {church.email && (
            <InfoRow
              icon={Mail}
              label={labels.emailLabel}
              value={church.email}
              href={`mailto:${church.email}`}
            />
          )}
          <div className="pb-2">
            <InfoRow icon={MapPin} label={labels.addressLabel} value={church.address} />
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-8 inline-flex min-h-12 items-center text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
            >
              {labels.directions} →
            </a>
          </div>
        </div>
        {church.announcementsUrl && (
          <a
            href={church.announcementsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-navy px-4 text-base font-bold text-white hover:bg-navy/80"
          >
            {labels.announcementsCta}
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </aside>
  );
}
