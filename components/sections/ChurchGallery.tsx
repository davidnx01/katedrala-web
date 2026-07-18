"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { StrapiMedia } from "@/types/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi-media";

interface ChurchGalleryProps {
  title: string;
  churchName: string;
  images: StrapiMedia[];
}

export function ChurchGallery({ title, churchName, images }: ChurchGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl font-bold text-navy md:text-3xl">{title}</h2>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3.5 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative h-32 overflow-hidden rounded-xl border border-stone transition-opacity hover:opacity-90 md:h-40"
          >
            <Image
              src={getStrapiMediaUrl(image) ?? ""}
              alt={image.alternativeText ?? `${churchName} — foto ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Zavrieť"
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 flex min-h-12 min-w-12 items-center justify-center text-white/70 hover:text-white"
          >
            <X size={28} aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Predchádzajúca fotografia"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-2 flex min-h-12 min-w-12 items-center justify-center text-white/70 hover:text-white md:left-6"
              >
                <ChevronLeft size={32} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Nasledujúca fotografia"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 flex min-h-12 min-w-12 items-center justify-center text-white/70 hover:text-white md:right-6"
              >
                <ChevronRight size={32} aria-hidden="true" />
              </button>
            </>
          )}

          <div
            className="relative h-full max-h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getStrapiMediaUrl(images[activeIndex]) ?? ""}
              alt={images[activeIndex].alternativeText ?? `${churchName} — foto ${activeIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
