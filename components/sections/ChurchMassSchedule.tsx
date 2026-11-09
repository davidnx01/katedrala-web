import type { MassTime } from "@/types/content";

interface ChurchMassScheduleProps {
  title: string;
  schedule: MassTime[];
  className?: string;
}

export function ChurchMassSchedule({ title, schedule, className }: ChurchMassScheduleProps) {
  if (schedule.length === 0) return null;

  return (
    <section
      aria-labelledby="church-masses"
      className={className}
    >
      <div className="rounded-2xl border border-stone bg-white p-5 md:p-6 lg:p-8">
        <h2
          id="church-masses"
          className="mb-2 font-serif text-2xl font-bold text-navy md:text-3xl"
        >
          {title}
        </h2>
        <dl className="divide-y divide-stone">
          {schedule.map((row) => (
            <div
              key={row.dayLabel}
              className="grid grid-cols-1 gap-2 py-4 last:pb-0 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-6"
            >
              <dt className="text-base font-semibold text-navy md:text-lg">{row.dayLabel}</dt>
              <dd className="flex flex-wrap gap-2">
                {row.times.map((time) => (
                  <span
                    key={time}
                    className="rounded-lg bg-gold-light px-3 py-1 text-base font-semibold text-navy tabular-nums"
                  >
                    {time}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
