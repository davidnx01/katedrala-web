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
