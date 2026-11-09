import { MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { SplitHero } from "@/components/sections/SplitHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStrapiMediaUrl } from "@/lib/strapi-media";
import type { StrapiMedia } from "@/types/strapi";

interface ChurchHeroProps {
  name: string;
  address: string;
  typeLabel: string;
  breadcrumbItems: { label: string; href?: string }[];
  photo: StrapiMedia | null;
  directionsUrl: string;
  directionsLabel: string;
}

export function ChurchHero({
  name,
  address,
  typeLabel,
  breadcrumbItems,
  photo,
  directionsUrl,
  directionsLabel,
}: ChurchHeroProps) {
  return (
    <SplitHero
      size="page"
      media={
        <ImagePlaceholder
          label={`Foto: ${name}`}
          src={getStrapiMediaUrl(photo) ?? undefined}
          alt={photo?.alternativeText ?? name}
          priority
          className="h-full w-full"
        />
      }
    >
      <Breadcrumb items={breadcrumbItems} light />
      <Badge className="mb-3 w-fit rounded-lg border border-gold/40 bg-transparent px-2.5 py-1 text-xs font-semibold tracking-wide text-gold uppercase">
        {typeLabel}
      </Badge>
      <h1 className="font-serif text-[32px] leading-tight font-bold tracking-tight text-balance text-white lg:text-[40px] xl:text-[44px]">
        {name}
      </h1>
      <p className="mt-3 flex items-start gap-2 text-base text-white/80 lg:text-lg">
        <MapPin size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
        {address}
      </p>
      <Button
        variant="outline"
        className="mt-8 w-full whitespace-nowrap border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-fit lg:w-full"
        render={<a href={directionsUrl} target="_blank" rel="noopener noreferrer" />}
        nativeButton={false}
      >
        {directionsLabel}
      </Button>
    </SplitHero>
  );
}
