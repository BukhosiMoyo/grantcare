"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import { usePathname } from "next/navigation";

export function NavigationDetails(props: ComponentProps<"details">) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  return <details {...props} ref={ref} onKeyDown={event => {
    if (event.key === "Escape") {
      ref.current?.removeAttribute("open");
      ref.current?.querySelector("summary")?.focus();
    }
  }} />;
}
