import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";

interface QuickLinkCardProps {
  icon: React.ReactNode;
  title: string;
  imageLabel: string;
  href: string;
}

export function QuickLinkCard({
  icon,
  title,
  imageLabel,
  href,
}: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-42 overflow-hidden md:h-52 lg:h-64"
    >
      <ImagePlaceholder
        label={title}
        src={imageLabel}
        className="absolute w-full h-full inset-0 z-0 object-cover object-center group-hover:scale-105 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy/35 to-navy/80 transition-colors duration-400 group-hover:to-navy/75" />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-0 flex-col gap-1.5 p-4 transition-transform duration-300 group-hover:-translate-y-1 md:gap-2 md:p-6 lg:gap-2.5 lg:p-7">
        <span className="text-white">{icon}</span>
        <span className="font-serif text-2xl font-semibold text-white  lg:text-3xl">
          {title}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-gold transition-[width] group-hover:w-full duration-300" />
    </Link>
  );
}
