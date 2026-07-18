import { useTranslations } from "next-intl";
import { Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StrapiContactLocation } from "@/types/strapi";

interface ContactMapProps {
  locations: StrapiContactLocation[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

/** Schematic marker slots, cycled by array position — locations aren't geocoded. */
const MARKER_POSITIONS: { left: string; top: string }[] = [
  { left: "48%", top: "42%" },
  { left: "62%", top: "56%" },
  { left: "36%", top: "30%" },
  { left: "55%", top: "28%" },
];

export function ContactMap({ locations, activeIndex, onSelect }: ContactMapProps) {
  const t = useTranslations("ContactPage");
  const active = locations[activeIndex];

  return (
    <div className="relative h-75 w-full overflow-hidden rounded-2xl border border-stone bg-stone md:h-100 lg:h-115">
      <svg
        viewBox="0 0 500 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="500" height="400" fill="#EDE8DC" />
        <path
          d="M0 200 Q100 180 200 190 Q300 200 400 180 L500 170"
          stroke="#DDD8CC"
          strokeWidth="28"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M250 0 Q240 100 260 200 Q280 300 250 400"
          stroke="#DDD8CC"
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M100 0 Q120 100 110 200 Q100 300 120 400" stroke="#E5E0D6" strokeWidth="10" fill="none" />
        <path d="M380 0 Q370 150 390 300 L400 400" stroke="#E5E0D6" strokeWidth="10" fill="none" />
        <path d="M0 100 Q150 120 300 100 L500 90" stroke="#E5E0D6" strokeWidth="10" fill="none" />
        <path d="M0 310 Q200 290 350 320 L500 300" stroke="#E5E0D6" strokeWidth="10" fill="none" />
        <rect x="50" y="50" width="60" height="45" rx="4" fill="#E1DCCF" />
        <rect x="150" y="40" width="50" height="55" rx="4" fill="#E1DCCF" />
        <rect x="320" y="55" width="70" height="40" rx="4" fill="#E1DCCF" />
        <rect x="60" y="240" width="55" height="50" rx="4" fill="#E1DCCF" />
        <rect x="350" y="230" width="60" height="60" rx="4" fill="#E1DCCF" />
        <rect x="160" y="300" width="80" height="45" rx="4" fill="#E1DCCF" />
        <rect x="210" y="150" width="80" height="105" rx="6" fill="#1B1F2E" opacity="0.12" />
        <text
          x="250"
          y="278"
          textAnchor="middle"
          fontSize="9"
          fill="#A39E94"
          fontWeight="600"
          letterSpacing="1.5"
        >
          RUDNAYOVO NÁMESTIE
        </text>
      </svg>

      {locations.map((location, index) => {
        const isActive = index === activeIndex;
        const pos = MARKER_POSITIONS[index % MARKER_POSITIONS.length];
        return (
          <button
            key={location.slug ?? location.name}
            type="button"
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
            aria-label={location.name}
            style={{ left: pos.left, top: pos.top }}
            className={cn(
              "absolute flex -translate-x-1/2 -translate-y-full flex-col items-center transition-[filter,transform]",
              isActive ? "z-10 scale-110" : "z-0 scale-95 opacity-70 grayscale-[0.3]",
            )}
          >
            {isActive && (
              <span className="mb-1.5 whitespace-nowrap rounded-lg border border-gold bg-white px-3.5 py-2 text-left shadow-lg">
                <span className="block text-sm font-semibold text-navy">{location.name}</span>
                <span className="block text-xs text-[#A39E94]">{location.address}</span>
              </span>
            )}
            <svg width="30" height="38" viewBox="0 0 32 42" aria-hidden="true">
              <path
                d="M16 2C9.4 2 4 7.4 4 14c0 8.5 12 24 12 24s12-15.5 12-24C28 7.4 22.6 2 16 2z"
                fill={isActive ? "#C5A44E" : "#A39E94"}
                stroke="#fff"
                strokeWidth="2"
              />
              <circle cx="16" cy="14" r="5" fill="#fff" />
            </svg>
          </button>
        );
      })}

      {active && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            [active.address, active.city].filter(Boolean).join(", "),
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 bottom-4 flex min-h-11 items-center gap-2 rounded-lg bg-navy px-5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-navy/80"
        >
          <Navigation size={15} aria-hidden="true" />
          {t("navigate")}
        </a>
      )}
    </div>
  );
}
