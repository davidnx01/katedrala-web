import Image from "next/image";

interface HeroSlide {
  src: string;
  alt: string;
}

interface HeroSlideshowProps {
  slides: [HeroSlide, HeroSlide];
}

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="animate-hero-kenburns absolute inset-0"
          style={index === 1 ? { animationDelay: "-6s" } : undefined}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
