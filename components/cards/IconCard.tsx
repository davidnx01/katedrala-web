import { Ticket, Headphones, Gift, Images } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconCardIcon } from "@/types/strapi";

const ICON_MAP: Record<IconCardIcon, LucideIcon> = {
  ticket: Ticket,
  headphones: Headphones,
  gift: Gift,
  gallery: Images,
};

interface IconCardProps {
  icon: IconCardIcon;
  title: string;
  description: string;
}

export function IconCard({ icon, title, description }: IconCardProps) {
  const Icon = ICON_MAP[icon];

  return (
    <div className="group rounded-[20px] border border-stone bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] md:p-7 lg:p-8">
      <div className="mx-auto mb-4.5 flex h-16 w-16 items-center justify-center rounded-2xl border border-stone bg-surface text-[#A39E94] transition-all duration-300 group-hover:border-gold/25 group-hover:bg-gold-light group-hover:text-gold">
        <Icon size={32} aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-serif text-xl font-semibold text-navy md:text-2xl">{title}</h3>
      <p className="m-0 text-sm leading-relaxed text-[#7A756B]">{description}</p>
    </div>
  );
}
