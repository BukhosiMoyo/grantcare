import { Card } from "@/components/ui";
import { getReportedCheckMethods } from "@/lib/official-resources";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site";

const COPY: Partial<Record<Locale, { quickCheckRoutes: string }>> = {
  zu: {
    quickCheckRoutes: "Izindlela zokuhlola ngokushesha.",
  },
  tn: {
    quickCheckRoutes: "Ditsela tsa go tlhola ka bonako.",
  },
  xh: {
    quickCheckRoutes: "Iindlela zokujonga ngokukhawuleza.",
  },
};

function getCopy(locale: Locale) {
  return {
    quickCheckRoutes: "Quick check routes.",
    ...(COPY[locale] ?? {}),
  };
}

export function QuickCheckOptions({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const copy = getCopy(locale);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">{copy.quickCheckRoutes}</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {getReportedCheckMethods(locale).map((item) => {
          const content = (
            <Card className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{item.title}</p>
              <p className="font-mono text-xl font-semibold text-primary">{item.value}</p>
              <p className="text-sm text-muted">{item.detail}</p>
            </Card>
          );

          if (!("href" in item) || !item.href) {
            return (
              <div key={item.title} className={item.title === "USSD code" ? "md:col-span-2" : undefined}>
                {content}
              </div>
            );
          }

          return (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
}
