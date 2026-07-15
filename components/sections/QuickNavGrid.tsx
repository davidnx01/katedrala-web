import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";

interface QuickNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface QuickNavGridProps {
  eyebrow: string;
  items: QuickNavItem[];
}

export function QuickNavGrid({ eyebrow, items }: QuickNavGridProps) {
  return (
    <section className="py-8 md:py-10 lg:py-12">
      <Container>
        <div className="mb-4 text-xs font-semibold tracking-widest text-gold uppercase">
          {eyebrow}
        </div>
        <div className="grid grid-cols-3 gap-2.5 md:grid-cols-5 md:gap-3 lg:gap-3.5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-stone bg-white px-2 py-4 text-center transition-colors hover:border-gold hover:bg-gold-light md:py-5 lg:py-6"
              >
                <Icon size={28} className="text-gold" aria-hidden="true" />
                <span className="text-xs font-medium text-navy md:text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
