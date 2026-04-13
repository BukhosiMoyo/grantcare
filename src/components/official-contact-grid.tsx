import { CONTACT_DIRECTORY_SOURCE, OFFICIAL_SASSA_CONTACTS } from "@/lib/official-resources";

import { Card } from "@/components/ui";

export function OfficialContactGrid() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {OFFICIAL_SASSA_CONTACTS.map((item) => {
          const isHttp = item.href.startsWith("http");

          return (
            <Card key={item.title} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{item.title}</p>
              <a
                href={item.href}
                target={isHttp ? "_blank" : undefined}
                rel={isHttp ? "noreferrer" : undefined}
                className="text-sm leading-7 text-foreground hover:text-primary"
              >
                {item.value}
              </a>
            </Card>
          );
        })}
      </div>
      <a href={CONTACT_DIRECTORY_SOURCE.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">
        Official contact directory source
      </a>
    </div>
  );
}
