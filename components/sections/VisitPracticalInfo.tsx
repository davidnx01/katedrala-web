import { Clock, Ticket, Globe } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { StrapiHoursRow, StrapiTicketRow } from "@/types/strapi";

interface VisitPracticalInfoProps {
  eyebrow: string;
  title: string;
  hours: StrapiHoursRow[];
  tickets: StrapiTicketRow[];
  reservationTitle?: string;
  reservationBody?: string;
  reservationCtaLabel?: string;
  mainSquareUrl?: string;
}

export function VisitPracticalInfo({
  eyebrow,
  title,
  hours,
  tickets,
  reservationTitle,
  reservationBody,
  reservationCtaLabel,
  mainSquareUrl,
}: VisitPracticalInfoProps) {
  return (
    <section id="info" className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} center />
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3 md:gap-4.5 lg:gap-5">
          <div className="rounded-[20px] border border-stone bg-white p-6 md:p-7 lg:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-gold">
              <Clock size={24} aria-hidden="true" />
            </div>
            <h3 className="mb-3.5 font-serif text-xl font-semibold text-navy md:text-2xl">Otváracie hodiny</h3>
            {hours.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-stone py-1.5 text-sm last:border-b-0"
              >
                <span className={row.dayLabel ? "font-medium text-[#7A756B]" : "text-[#7A756B]"}>
                  {row.dayLabel}
                </span>
                <span className="font-semibold text-[#2C2A26]">{row.time}</span>
              </div>
            ))}
          </div>

          <div className="rounded-[20px] border border-stone bg-white p-6 md:p-7 lg:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-gold">
              <Ticket size={24} aria-hidden="true" />
            </div>
            <h3 className="mb-3.5 font-serif text-xl font-semibold text-navy md:text-2xl">Vstupné</h3>
            {tickets.map((ticket) => (
              <div
                key={ticket.label}
                className="flex items-center justify-between border-b border-stone py-1.5 text-sm last:border-b-0"
              >
                <span className="text-[#7A756B]">{ticket.label}</span>
                <span className="font-semibold text-gold">{ticket.price}</span>
              </div>
            ))}
            <p className="mt-2.5 text-xs text-[#A39E94] italic">Ceny sú orientačné — presné ceny v Martineum.</p>
          </div>

          <div className="flex flex-col rounded-[20px] border border-white/6 bg-navy p-6 md:p-7 lg:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <Globe size={24} aria-hidden="true" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-semibold text-white md:text-2xl">{reservationTitle}</h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">{reservationBody}</p>
            {reservationCtaLabel && mainSquareUrl && (
              <a
                href={mainSquareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-gold px-7 py-3.5 text-center text-base font-semibold text-navy"
              >
                {reservationCtaLabel}
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
