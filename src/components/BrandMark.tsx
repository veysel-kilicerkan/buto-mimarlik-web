import Image from "next/image";

interface BrandMarkProps {
  size?: number;
  invert?: boolean;
  className?: string;
}

// The client's actual monogram (public/brand/buto-mark.png), background
// keyed out to transparent. `invert` flips it to white for dark contexts
// (e.g. over the villa video) — it's pure black artwork otherwise.
export default function BrandMark({ size = 60, invert = false, className }: BrandMarkProps) {
  return (
    <Image
      src="/brand/buto-mark.png"
      alt="BUTO Mimarlık"
      width={size}
      height={Math.round(size * 1.29)}
      className={className}
      style={invert ? { filter: "invert(1) brightness(1.3)" } : undefined}
      priority
    />
  );
}
