import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  breadcrumbItems: { label: string; href?: string }[];
  imageLabel: string;
  imageSrc?: string;
}

export function PageHero({
  eyebrow,
  title,
  breadcrumbItems,
  imageLabel,
  imageSrc,
}: PageHeroProps) {
  return (
    <section className="relative h-68 overflow-hidden md:h-72 lg:h-84">
      <ImagePlaceholder
        label={imageLabel}
        src={imageSrc}
        alt={imageLabel}
        className="h-full"
      />
      <div className="absolute inset-0 flex flex-col justify-end items-center bg-linear-to-b from-navy/40 to-navy/80 px-4 pb-6 md:px-8 md:pb-8 lg:px-12 lg:pb-10">
        <Container className="px-0">
          <Breadcrumb items={breadcrumbItems} light center />
          <div className="text-xs font-semibold tracking-[0.2em] text-gold uppercase w-full text-center mt-8">
            {eyebrow}
          </div>
          <h1 className="font-serif text-[32px] font-bold tracking-tight text-white lg:text-[48px] text-center">
            {title}
          </h1>
        </Container>
      </div>
    </section>
  );
}
