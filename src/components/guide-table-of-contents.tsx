"use client";

import { useEffect, useMemo, useState } from "react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  label: string;
};

export function GuideTableOfContents({
  title,
  items,
}: {
  title: string;
  items: TocItem[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const resolveActiveId = () => {
      const hashId = window.location.hash.replace(/^#/, "");
      let currentId = hashId && sectionIds.includes(hashId) ? hashId : sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top <= 180) {
          currentId = id;
        } else {
          break;
        }
      }

      return currentId;
    };

    const updateActiveId = () => {
      setActiveId(resolveActiveId());
    };

    const handleHashChange = () => {
      window.requestAnimationFrame(updateActiveId);
    };

    updateActiveId();
    window.addEventListener("scroll", updateActiveId, { passive: true });
    window.addEventListener("resize", updateActiveId);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", updateActiveId);
      window.removeEventListener("resize", updateActiveId);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [sectionIds]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="space-y-3 p-4 sm:p-4">
      <div className="space-y-1 px-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
          {title}
        </p>
      </div>
      <nav aria-label={title}>
        <ol className="scrollbar-hidden space-y-1 lg:max-h-[24rem] lg:overflow-y-auto">
          {items.map((item, index) => {
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "flex items-start gap-2 rounded-xl px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-primary/[0.08] text-foreground"
                      : "text-muted hover:bg-surface-muted hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex min-h-6 min-w-6 items-center justify-center rounded-full border text-[0.68rem] font-semibold",
                      isActive
                        ? "border-primary/20 bg-primary text-white"
                        : "border-border bg-surface text-muted",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 leading-5">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </Card>
  );
}
