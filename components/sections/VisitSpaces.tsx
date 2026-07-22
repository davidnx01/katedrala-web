"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Link } from "@/i18n/navigation";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import { cn } from "@/lib/utils";
import type { StrapiVenueSpace } from "@/types/strapi";

interface VisitSpacesProps {
  eyebrow: string;
  title: string;
  spaces: StrapiVenueSpace[];
  imageLabel: string;
}

const FEATURE_GRID_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

export function VisitSpaces({ eyebrow, title, spaces, imageLabel }: VisitSpacesProps) {
  const [activeSlug, setActiveSlug] = useState(spaces[0]?.slug);

  if (spaces.length === 0) return null;
  const active = spaces.find((space) => space.slug === activeSlug) ?? spaces[0];

  return (
    <section id="sluzby" className="bg-surface py-12 md:py-16 lg:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} center />

        <div className="mb-6 flex flex-wrap justify-center gap-2 md:mb-8 md:gap-2.5 lg:mb-10 lg:gap-3">
          {spaces.map((space) => (
            <button
              key={space.slug}
              type="button"
              onClick={() => setActiveSlug(space.slug)}
              aria-pressed={active.slug === space.slug}
              className={cn(
                "min-h-12 rounded-[10px] border px-4 text-sm transition-colors md:px-5.5 md:text-[15px] lg:px-7",
                active.slug === space.slug
                  ? "border-gold bg-gold-light font-semibold text-gold-dark"
                  : "border-stone bg-white text-[#7A756B] hover:border-gold/40",
              )}
            >
              {space.label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-stone bg-white p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-10">
            <div>
              <h3 className="mb-3 font-serif text-2xl font-bold text-navy md:text-3xl lg:text-[32px]">
                {active.label}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#7A756B] md:text-base lg:text-[17px]">
                {active.description}
              </p>

              {active.ctaLabel && active.ctaHref && (
                <Link
                  href={active.ctaHref}
                  className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg bg-gold px-7 text-sm font-semibold text-navy transition-colors hover:bg-gold/85"
                >
                  {active.ctaLabel}
                </Link>
              )}

              {active.hours && active.hours.length > 0 && (
                <div className="mt-5 flex flex-col gap-1.5 rounded-xl bg-surface p-4">
                  {active.hours.map((row) => (
                    <div key={row.dayLabel} className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-navy">{row.dayLabel}</span>
                      <span className="text-[#7A756B]">{row.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative h-50 overflow-hidden rounded-2xl md:h-65 lg:h-75">
              <ImagePlaceholder
                label={imageLabel}
                src={getStrapiMediaUrl(active.image) ?? undefined}
                alt={active.label}
                className="h-full"
              />
            </div>
          </div>

          {active.features.length > 0 && (
            <div
              className={cn(
                "mt-6 grid grid-cols-1 gap-3 border-t border-stone pt-6 sm:grid-cols-2 md:mt-8 md:gap-4 md:pt-8 lg:mt-10 lg:pt-10",
                FEATURE_GRID_COLS[Math.min(active.features.length, 4)],
              )}
            >
              {active.features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-stone bg-surface p-4 md:p-5">
                  <span className="mb-2.5 block text-2xl" aria-hidden="true">
                    {feature.icon}
                  </span>
                  <h4 className="mb-1 text-[15px] font-semibold text-navy md:text-base">{feature.title}</h4>
                  <p className="m-0 text-[13px] leading-relaxed text-[#7A756B]">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
