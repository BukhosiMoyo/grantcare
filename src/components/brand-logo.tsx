import Image from "next/image";

import { cn } from "@/lib/utils";

const BRAND_ASSETS = {
  full: {
    src: "/grantcare-logo.png",
    width: 1940,
    height: 474,
  },
  icon: {
    src: "/grantcare-icon.png",
    width: 445,
    height: 446,
  },
} as const;

export function BrandLogo({
  variant = "full",
  className,
  priority = false,
}: {
  variant?: keyof typeof BRAND_ASSETS;
  className?: string;
  priority?: boolean;
}) {
  const asset = BRAND_ASSETS[variant];

  return (
    <Image
      src={asset.src}
      alt="GrantCare"
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={variant === "full" ? "220px" : "160px"}
      className={cn("h-auto w-auto", className)}
    />
  );
}
