import { CONTACT_DIRECTORY_SOURCE, getOfficialSassaContacts } from "@/lib/official-resources";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site";

import { Card } from "@/components/ui";

const COPY: Partial<Record<Locale, { directorySource: string }>> = {
  zu: {
    directorySource: "Umthombo wohla lwemibhalo lokuxhumana olusemthethweni",
  },
  tn: {
    directorySource: "Motswedi wa semmuso wa lenaane la dikgokagano",
  },
  xh: {
    directorySource: "Umthombo woluhlu lonxibelelwano olusemthethweni",
  },
};

function getCopy(locale: Locale) {
  return {
    directorySource: "Official contact directory source",
    ...(COPY[locale] ?? {}),
  };
}

export function OfficialContactGrid({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const copy = getCopy(locale);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {getOfficialSassaContacts(locale).map((item) => {
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
        {copy.directorySource}
      </a>
    </div>
  );
}
