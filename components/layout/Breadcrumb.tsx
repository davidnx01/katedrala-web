import { Link } from "@/i18n/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export function Breadcrumb({ items, light }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1.5">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className={light ? "text-white/30" : "text-[#A39E94]"} aria-hidden="true">
                /
              </span>
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={
                  light
                    ? "text-[13px] text-white/45 hover:text-white/70"
                    : "text-[13px] text-[#A39E94] hover:text-navy"
                }
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={
                  light
                    ? "text-[13px] font-medium text-white/85"
                    : "text-[13px] font-medium text-[#2C2A26]"
                }
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
