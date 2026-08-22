interface IconProps {
  size?: number;
  className?: string;
}

const LOGO_ASPECT_RATIO = 778 / 895;

export function Logo({ size = 40, className }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative vector mark, no benefit from next/image optimization
    <img
      src="/images/logo.svg"
      alt=""
      width={Math.round(size * LOGO_ASPECT_RATIO)}
      height={size}
      className={className}
    />
  );
}
