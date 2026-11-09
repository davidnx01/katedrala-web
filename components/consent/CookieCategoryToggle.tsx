import { cn } from "@/lib/utils";

interface CookieCategoryToggleProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  /** Required categories render as permanently on, with this label instead of a switch. */
  lockedLabel?: string;
  onChange?: (checked: boolean) => void;
}

export function CookieCategoryToggle({
  id,
  title,
  description,
  checked,
  lockedLabel,
  onChange,
}: CookieCategoryToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-stone bg-white p-4">
      <div>
        <h3 id={`${id}-title`} className="text-base font-semibold text-navy">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-[#7A756B]">{description}</p>
      </div>
      {lockedLabel ? (
        <span className="shrink-0 text-sm font-semibold text-gold-dark">{lockedLabel}</span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={`${id}-title`}
          onClick={() => onChange?.(!checked)}
          className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-gold/50"
        >
          <span
            className={cn(
              "relative block h-7 w-12 rounded-full transition-colors",
              checked ? "bg-navy" : "bg-[#A39E94]",
            )}
          >
            <span
              className={cn(
                "absolute top-1 left-1 size-5 rounded-full bg-white transition-transform",
                checked && "translate-x-5",
              )}
            />
          </span>
        </button>
      )}
    </div>
  );
}
