interface IconProps {
  size?: number;
  className?: string;
}

export function IconCross({ size = 40, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="20" y1="4" x2="20" y2="36" />
      <line x1="10" y1="14" x2="30" y2="14" />
    </svg>
  );
}

export function IconCathedral({ size = 36, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2v6" />
      <path d="M16 4h4" />
      <path d="M10 14l8-6 8 6" />
      <path d="M6 32V18l4-4" />
      <path d="M30 32V18l-4-4" />
      <path d="M6 32h24" />
      <path d="M10 32V18" />
      <path d="M26 32V18" />
      <path d="M15 32v-7a3 3 0 0 1 6 0v7" />
      <path d="M13 22h2v3h-2z" />
      <path d="M21 22h2v3h-2z" />
    </svg>
  );
}

export function IconHands({ size = 36, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6v3" />
      <path d="M14 9l1 1" />
      <path d="M22 9l-1 1" />
      <path d="M12 32l2-10c.3-1.5 1-3 2.5-4l1.5-1.2L19.5 18c1.5 1 2.2 2.5 2.5 4l2 10" />
      <path d="M14.5 22c1-.8 2.2-1.2 3.5-1.2s2.5.4 3.5 1.2" />
      <path d="M15 27h6" />
    </svg>
  );
}

export function IconTourist({ size = 36, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="18" cy="8" r="4" />
      <path d="M14 8h8" />
      <path d="M18 4v-1" />
      <path d="M12 32l2-14h8l2 14" />
      <path d="M14 18l-2 4h12l-2-4" />
      <path d="M15 25h6" />
      <path d="M8 28h4" />
      <path d="M24 28h4" />
    </svg>
  );
}
