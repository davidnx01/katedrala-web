import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  link?: { label: string; href: string };
  light?: boolean;
  center?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  link,
  light,
  center,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-start gap-3 md:mb-8 lg:mb-10",
        link
          ? "justify-between"
          : center
            ? "flex-col items-center text-center"
            : "justify-start",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2",
          center && "items-center text-center",
        )}
      >
        <div className="mb-2.5 text-xs font-bold tracking-widest text-gold uppercase bg-white w-fit py-1 px-2.5 rounded-[8px]">
          {eyebrow}
        </div>
        <h2
          className={cn(
            "font-serif text-4xl leading-tight font-bold tracking-tight lg:text-5xl",
            light ? "text-white" : "text-navy",
          )}
        >
          {title}
        </h2>
      </div>
      {link && (
        <Button
          className={cn("hidden sm:flex")}
          size={"lg"}
          variant={"dark"}
          render={<Link href={link.href} />}
          nativeButton={false}
        >
          {link.label}
        </Button>
      )}
    </div>
  );
}
