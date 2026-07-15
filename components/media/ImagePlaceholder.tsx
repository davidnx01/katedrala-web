import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  label: string;
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}

export function ImagePlaceholder({
  label,
  src,
  alt,
  priority,
  className,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? label}
        fill
        priority={priority}
        className={cn(className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-start justify-center overflow-hidden bg-linear-to-br from-navy via-[#2E3347] to-[#3A3529]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,_rgba(197,164,78,0.1)_0%,_transparent_60%)]" />
      <span className="relative z-1 px-6 pt-6 text-center text-[11px] tracking-wide text-white/25 uppercase">
        {label}
      </span>
    </div>
  );
}
