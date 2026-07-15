import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  basePath: string;
  labels: { previous: string; next: string };
}

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export function Pagination({ currentPage, pageCount, basePath, labels }: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          aria-label={labels.previous}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-stone bg-white text-[#2C2A26] hover:border-gold"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-hidden="true"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-stone text-[#A39E94] opacity-40"
        >
          <ChevronLeft size={16} />
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(basePath, page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3.5 text-sm font-medium",
            page === currentPage
              ? "border-gold bg-gold text-navy"
              : "border-stone bg-white text-[#2C2A26] hover:border-gold"
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < pageCount ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          aria-label={labels.next}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-stone bg-white text-[#2C2A26] hover:border-gold"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-hidden="true"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-stone text-[#A39E94] opacity-40"
        >
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
