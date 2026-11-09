"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
}

interface HeroSlideshowProps {
  slides: HeroSlide[];
}

interface SlideshowState {
  active: number;
  /** Increments each time a slide becomes active, which remounts it and restarts its zoom. */
  runs: number[];
}

const SLIDE_DURATION_MS = 4000;

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [{ active, runs }, setState] = useState<SlideshowState>(() => ({
    active: 0,
    runs: slides.map(() => 0),
  }));

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setState(({ active: current, runs: counts }) => {
        const next = (current + 1) % slides.length;
        return {
          active: next,
          runs: counts.map((count, index) => (index === next ? count + 1 : count)),
        };
      });
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      {slides.map((slide, index) => (
        <div
          key={`${index}-${slide.src}`}
          aria-hidden={index !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
            index === active ? "opacity-100" : "opacity-0",
          )}
        >
          <div key={runs[index]} className="animate-hero-zoom absolute inset-0">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

