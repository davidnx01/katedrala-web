import { Mail, MapPin, Phone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Church } from "@/types/content";

interface ChurchInfoCardLabels {
  addressLabel: string;
  rectorLabel: string;
  phoneLabel: string;
  emailLabel: string;
  directions: string;
  massScheduleTitle: string;
}

interface ChurchInfoCardProps {
  church: Church;
  labels: ChurchInfoCardLabels;
}

function getDirectionsUrl(church: Church): string {
  if (church.latitude !== null && church.longitude !== null) {
    return `https://www.google.com/maps?q=${church.latitude},${church.longitude}`;
  }
  return `https://www.google.com/maps?q=${encodeURIComponent(church.address)}`;
}

export function ChurchInfoCard({ church, labels }: ChurchInfoCardProps) {
  return (
    <div className="rounded-2xl border border-stone bg-white p-6 lg:sticky lg:top-24 h-fit">
      <div className="flex flex-col gap-3.5 text-sm text-[#2C2A26] md:text-[15px]">
        <div className="flex items-start gap-2.5">
          <MapPin
            size={18}
            className="mt-0.5 shrink-0 text-gold"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs font-medium tracking-wide text-[#A39E94] uppercase">
              {labels.addressLabel}
            </p>
            <p className="font-medium">{church.address}</p>
            <a
              href={getDirectionsUrl(church)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-block text-sm font-medium text-gold hover:underline"
            >
              {labels.directions} →
            </a>
          </div>
        </div>

        {church.rector && (
          <div className="flex items-center gap-2.5">
            <User size={18} className="shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium tracking-wide text-[#A39E94] uppercase">
                {labels.rectorLabel}
              </p>
              <p className="font-medium">{church.rector}</p>
            </div>
          </div>
        )}

        {church.phone && (
          <a
            href={`tel:${church.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2.5"
          >
            <Phone
              size={18}
              className="shrink-0 text-gold"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium tracking-wide text-[#A39E94] uppercase">
                {labels.phoneLabel}
              </p>
              <p className="font-medium hover:text-gold">{church.phone}</p>
            </div>
          </a>
        )}

        {church.email && (
          <a
            href={`mailto:${church.email}`}
            className="flex items-center gap-2.5"
          >
            <Mail size={18} className="shrink-0 text-gold" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium tracking-wide text-[#A39E94] uppercase">
                {labels.emailLabel}
              </p>
              <p className="font-medium hover:text-gold">{church.email}</p>
            </div>
          </a>
        )}
      </div>

      {church.massSchedule.length > 0 && (
        <div className="mt-5 border-t border-stone pt-5">
          <h3 className="mb-3 text-sm font-semibold text-navy">
            {labels.massScheduleTitle}
          </h3>
          <div className="flex flex-col gap-2.5">
            {church.massSchedule.map((row) => (
              <div
                key={row.dayLabel}
                className="flex flex-wrap items-center justify-between gap-2"
              >
                <span className="text-sm text-[#2C2A26]">{row.dayLabel}</span>
                <div className="flex flex-wrap gap-1.5">
                  {row.times.map((time) => (
                    <Badge
                      key={time}
                      className="rounded-lg bg-gold-light px-2.5 py-0.5 text-xs font-semibold text-gold-dark"
                    >
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
