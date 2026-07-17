import { MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { Badge } from "@/components/ui/badge";
import type { StrapiMedia } from "@/types/strapi";
import { Container } from "@/components/layout/Container";

interface ChurchHeroProps {
  name: string;
  address: string;
  typeLabel: string;
  breadcrumbItems: { label: string; href?: string }[];
  photo: StrapiMedia | null;
}

export function ChurchHero({
  name,
  address,
  typeLabel,
  breadcrumbItems,
  photo,
}: ChurchHeroProps) {
  return (
    <section className="w-full mx-auto max-w-7xl px-4 md:px-8 lg:px-12 overflow-hidden">
      <Container className="relative h-105 overflow-hidden md:h-120 lg:h-140">
        <ImagePlaceholder
          label={`Foto: ${name}`}
          src={photo?.url}
          alt={photo?.alternativeText ?? name}
          priority
          className="h-full absolute w-full object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-b from-navy/20 via-navy/30 to-navy/85 px-4 pb-6 md:px-8 md:pb-8 lg:px-12 lg:pb-10">
          <div className="w-full max-w-7xl">
            <Breadcrumb items={breadcrumbItems} light />
            <Badge className="mb-3 w-fit rounded-lg border border-gold/40 bg-navy/60 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold uppercase">
              {typeLabel}
            </Badge>
            <h1 className="font-serif text-[32px] font-bold tracking-tight text-white lg:text-[48px]">
              {name}
            </h1>
            <div className="mt-2.5 flex items-center gap-2 text-sm text-white/70 md:text-base">
              <MapPin
                size={16}
                className="shrink-0 text-gold"
                aria-hidden="true"
              />
              {address}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
