import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SplitHeroProps {
  /** Photo or slideshow shown in the wider (70 %) column; first on mobile. */
  media: ReactNode;
  /** Text content of the navy panel (30 %). */
  children: ReactNode;
  size?: "home" | "page";
}

export function SplitHero({ media, children, size = "home" }: SplitHeroProps) {
  return (
    <section
      className={cn(
        "mt-11 grid grid-cols-1 md:mt-12 lg:mt-[50px] lg:grid-cols-[minmax(360px,30%)_1fr]",
        size === "home"
          ? "lg:min-h-[clamp(620px,80svh,780px)]"
          : "lg:min-h-[clamp(520px,70svh,640px)]",
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden lg:order-2 lg:aspect-auto">
        {media}
      </div>
      <div className="flex flex-col justify-center bg-navy px-4 py-10 md:px-8 md:py-12 lg:order-1 lg:px-12 lg:pt-16 lg:pb-12">
        {children}
      </div>
    </section>
  );
}
