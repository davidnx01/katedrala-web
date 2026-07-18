import { Globe, Landmark, Clock, Accessibility } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import type { StrapiStatItem } from "@/types/strapi";

const STAT_ICONS: LucideIcon[] = [Globe, Landmark, Clock, Accessibility];

interface VisitStatsProps {
  stats: StrapiStatItem[];
}

export function VisitStats({ stats }: VisitStatsProps) {
  if (stats.length === 0) return null;

  return (
    <section className="bg-navy">
      <Container className="grid grid-cols-2 gap-4 py-6 md:grid-cols-4 md:gap-5 md:py-8 lg:gap-6 lg:py-9">
        {stats.map((stat, i) => {
          const Icon = STAT_ICONS[i % STAT_ICONS.length];
          return (
            <div key={stat.label} className="flex items-center gap-3.5">
              <span className="shrink-0 text-gold">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <div className="text-2xl leading-none font-bold text-white md:text-[26px] lg:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[13px] text-white/40">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
