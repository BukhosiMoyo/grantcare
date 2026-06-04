"use client";

import React, { useState, useTransition, useEffect, useCallback } from "react";
import { saveGscCredentials, disconnectGsc, getGscDashboardReport } from "@/actions/gsc-actions";
import { type GscPerformanceSummary } from "@/lib/google-gsc";
import type { Locale } from "@/lib/site";

interface SeoDashboardProps {
  initialConfig: {
    propertyUrl: string;
    isConnected: boolean;
  };
  locale: Locale;
}

const ZU_SEO_COPY: Record<string, string> = {
  "Failed to retrieve Search Console data.": "Kuhlulekile ukulanda idatha ye-Search Console.",
  "An unexpected error occurred.": "Kuvele iphutha elingalindelekile.",
  "Please complete both Property URL and Service Account JSON credentials.":
    "Gcwalisa kokubili i-Property URL nemininingwane ye-Service Account JSON.",
  "Connection failed. Please verify credentials format.": "Ukuxhuma kuhlulekile. Sicela uqinisekise ifomethi yemininingwane.",
  "Are you sure you want to disconnect Google Search Console?": "Uqinisekile ukuthi ufuna ukunqamula i-Google Search Console?",
  "Failed to disconnect.": "Kuhlulekile ukunqamula.",
  Unauthorized: "Awugunyaziwe.",
  "Property URL is required.": "I-Property URL iyadingeka.",
  "Invalid Service Account JSON credentials (JSON parse error).":
    "Imininingwane ye-Service Account JSON ayivumelekile (iphutha lokufunda i-JSON).",
  "Google Search Console is not connected yet.": "I-Google Search Console ayikaxhunywa.",
  "Failed to query Google Search Console API.": "Kuhlulekile ukubuza i-Google Search Console API.",
  "Connect Google Search Console": "Xhuma i-Google Search Console",
  "Analyze keyword impressions, Google rankings, organic click-through rates (CTR), and average positions. GrantCare uses secure Google Cloud Service Accounts to retrieve data without requiring manual login.":
    "Hlaziya ukuvela kwamagama okusesha, ukukleliswa ku-Google, amazinga okuchofoza kwe-organic (CTR), nezindawo ezimaphakathi. I-GrantCare isebenzisa ama-Google Cloud Service Accounts avikelekile ukuze ilande idatha ngaphandle kokudinga ukungena mathupha.",
  "Quick Setup Instructions:": "Izinyathelo ezisheshayo zokumisa:",
  "Go to the Google Cloud Console and create a Service Account.": "Iya ku-Google Cloud Console bese udala i-Service Account.",
  "Download the Service Account key in JSON format.": "Landa ukhiye we-Service Account ngefomethi ye-JSON.",
  "Go to your Google Search Console property and add the Service Account email (e.g.": "Iya ku-property yakho ye-Google Search Console bese ungeza i-imeyili ye-Service Account (isb.",
  ") as a": ") njengomsebenzisi",
  Full: "ogcwele",
  or: "noma",
  Restricted: "okhawulelwe",
  "user.": ".",
  "Enter your Search Console Property URL (e.g.,": "Faka i-Search Console Property URL yakho (isb.,",
  ") below and upload the JSON key file.": ") ngezansi bese ulayisha ifayela lokhiye le-JSON.",
  "Google Search Console Property URL": "I-Google Search Console Property URL",
  "e.g. sc-domain:grantcare.co.za or https://www.grantcare.co.za/": "isb. sc-domain:grantcare.co.za noma https://www.grantcare.co.za/",
  "Service Account JSON Key File": "Ifayela likakhiye we-Service Account JSON",
  "or paste raw JSON below": "noma namathisela i-JSON eluhlaza ngezansi",
  "Connecting...": "Kuyaxhunywa...",
  "Connect Credentials": "Xhuma imininingwane",
  "Click & Impression Trend": "Umkhuba wokuchofoza nokuvela",
  Clicks: "Ukuchofoza",
  Impressions: "Ukuvela",
  Max: "Okukhulu",
  "Connected Property": "I-property exhunyiwe",
  "7 days": "Izinsuku ezi-7",
  "30 days": "Izinsuku ezingama-30",
  "90 days": "Izinsuku ezingama-90",
  "Disconnecting...": "Kuyanqanyulwa...",
  Disconnect: "Nqamula",
  "Organic Clicks": "Ukuchofoza kwe-organic",
  "Total user visits via Google Search": "Ukuvakasha okuphelele okuvela ku-Google Search",
  "How often site link appeared in search": "Ukuthi isixhumanisi sesayithi sivele kangaki ekusesheni",
  "Average CTR": "I-CTR emaphakathi",
  "Ratio of impressions that resulted in clicks": "Isilinganiso sokuvela okuholele ekuchofozeni",
  "Average Position": "Indawo emaphakathi",
  "Average search result ranking of site": "Ukukleliswa okumaphakathi kwesayithi emiphumeleni yokusesha",
  "Top Search Queries": "Imibuzo yokusesha ephezulu",
  Query: "Umbuzo",
  Imps: "Ukuv.",
  Pos: "Ind.",
  "No query data available yet.": "Ayikho idatha yemibuzo okwamanje.",
  "Top Target Pages": "Amakhasi aqondiwe aphezulu",
  "Page Path": "Indlela yekhasi",
  "No page performance data available yet.": "Ayikho idatha yokusebenza kwamakhasi okwamanje.",
  "No organic keyword stats returned. Please verify that this property url possesses search traffic.":
    "Azikho izibalo zamagama okusesha e-organic ezibuyile. Sicela uqinisekise ukuthi le property url inethrafikhi yokusesha.",
  "Retry Fetching Data": "Zama ukulanda idatha futhi",
};

function seoCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_SEO_COPY[text] ?? text) : text;
}

function seoDays(locale: Locale, days: number) {
  return seoCopy(locale, `${days} days`);
}

function seoMaxCopy(locale: Locale, label: "Clicks" | "Impressions", max: number) {
  return locale === "zu"
    ? `${seoCopy(locale, label)} (${seoCopy(locale, "Max")}: ${max})`
    : `${label} (Max: ${max})`;
}

export function SeoDashboard({ initialConfig, locale }: SeoDashboardProps) {
  const [config, setConfig] = useState(initialConfig);
  const [days, setDays] = useState(30);
  const [report, setReport] = useState<GscPerformanceSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Connection form state
  const [propertyUrl, setPropertyUrl] = useState("");
  const [credentialsJson, setCredentialsJson] = useState("");

  const [isPending, startTransition] = useTransition();
  const [isDisconnectPending, startDisconnectTransition] = useTransition();

  // Load report data
  const loadReport = useCallback(async (targetDays: number) => {
    if (!config.isConnected) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getGscDashboardReport(targetDays);
      if (res.success && res.report) {
        setReport(res.report);
      } else {
        setError(res.error || "Failed to retrieve Search Console data.");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [config.isConnected]);

  useEffect(() => {
    loadReport(days);
  }, [loadReport, days]);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!propertyUrl || !credentialsJson) {
      setError("Please complete both Property URL and Service Account JSON credentials.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await saveGscCredentials(propertyUrl, credentialsJson);
        if (res.success) {
          setConfig({ propertyUrl, isConnected: true });
          setPropertyUrl("");
          setCredentialsJson("");
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Connection failed. Please verify credentials format.";
        setError(errorMsg);
      }
    });
  };

  const handleDisconnect = () => {
    if (!confirm(seoCopy(locale, "Are you sure you want to disconnect Google Search Console?"))) return;
    setError(null);

    startDisconnectTransition(async () => {
      try {
        const res = await disconnectGsc();
        if (res.success) {
          setConfig({ propertyUrl: "", isConnected: false });
          setReport(null);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to disconnect.";
        setError(errorMsg);
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setCredentialsJson(result);
      }
    };
    reader.readAsText(file);
  };

  // Render Setup/Form when disconnected
  if (!config.isConnected) {
    return (
      <div className="space-y-6">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
          <div className="max-w-2xl space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-foreground">{seoCopy(locale, "Connect Google Search Console")}</h3>
            <p className="text-sm leading-relaxed text-muted">
              {seoCopy(locale, "Analyze keyword impressions, Google rankings, organic click-through rates (CTR), and average positions. GrantCare uses secure Google Cloud Service Accounts to retrieve data without requiring manual login.")}
            </p>

            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-xs text-primary leading-relaxed">
              <span className="font-bold uppercase tracking-wider block mb-1">{seoCopy(locale, "Quick Setup Instructions:")}</span>
              <ol className="list-decimal pl-4 space-y-1">
                <li>{seoCopy(locale, "Go to the Google Cloud Console and create a Service Account.")}</li>
                <li>{seoCopy(locale, "Download the Service Account key in JSON format.")}</li>
                <li>
                  {seoCopy(locale, "Go to your Google Search Console property and add the Service Account email (e.g.")}{" "}
                  <code>my-service-account@project.iam.gserviceaccount.com</code>
                  {seoCopy(locale, ") as a")} <strong>{seoCopy(locale, "Full")}</strong> {seoCopy(locale, "or")}{" "}
                  <strong>{seoCopy(locale, "Restricted")}</strong> {seoCopy(locale, "user.")}
                </li>
                <li>
                  {seoCopy(locale, "Enter your Search Console Property URL (e.g.,")} <code>sc-domain:grantcare.co.za</code>{" "}
                  {seoCopy(locale, "or")} <code>https://www.grantcare.co.za/</code>
                  {seoCopy(locale, ") below and upload the JSON key file.")}
                </li>
              </ol>
            </div>

            {error && (
              <div className="rounded-2xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger">
                {seoCopy(locale, error)}
              </div>
            )}

            <form onSubmit={handleConnect} className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">{seoCopy(locale, "Google Search Console Property URL")}</label>
                <input
                  type="text"
                  placeholder={seoCopy(locale, "e.g. sc-domain:grantcare.co.za or https://www.grantcare.co.za/")}
                  value={propertyUrl}
                  onChange={(e) => setPropertyUrl(e.target.value)}
                  className="focus-ring tap-target w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm"
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">{seoCopy(locale, "Service Account JSON Key File")}</label>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="focus-ring w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    disabled={isPending}
                  />
                  <span className="text-xs text-muted text-center sm:text-left">{seoCopy(locale, "or paste raw JSON below")}</span>
                </div>
                <textarea
                  placeholder='{"type": "service_account", "project_id": ...}'
                  value={credentialsJson}
                  onChange={(e) => setCredentialsJson(e.target.value)}
                  className="focus-ring min-h-32 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-xs font-mono leading-relaxed"
                  disabled={isPending}
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="focus-ring tap-target inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-strong transition-colors cursor-pointer"
              >
                {isPending ? seoCopy(locale, "Connecting...") : seoCopy(locale, "Connect Credentials")}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Visual SVG chart logic
  const renderTrendChart = () => {
    if (!report || !report.trend || report.trend.length === 0) return null;

    const data = report.trend;
    const padding = 40;
    const width = 800;
    const height = 180;

    const clicksArray = data.map((d) => d.clicks);
    const impsArray = data.map((d) => d.impressions);

    const maxClicks = Math.max(...clicksArray, 10);
    const maxImps = Math.max(...impsArray, 10);

    const pointsClicks = data
      .map((d, i) => {
        const x = padding + (i * (width - padding * 2)) / (data.length - 1);
        const y = height - padding - (d.clicks * (height - padding * 2)) / maxClicks;
        return `${x},${y}`;
      })
      .join(" ");

    const pointsImps = data
      .map((d, i) => {
        const x = padding + (i * (width - padding * 2)) / (data.length - 1);
        const y = height - padding - (d.impressions * (height - padding * 2)) / maxImps;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="w-full overflow-x-auto rounded-[var(--radius-card)] border border-border bg-surface p-5">
        <div className="min-w-[650px] space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">{seoCopy(locale, "Click & Impression Trend")}</span>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="inline-block h-3 w-3 rounded-full bg-primary" />
                {seoMaxCopy(locale, "Clicks", maxClicks)}
              </span>
              <span className="flex items-center gap-1.5 text-amber-500">
                <span className="inline-block h-3 w-3 rounded-full bg-amber-500" />
                {seoMaxCopy(locale, "Impressions", maxImps)}
              </span>
            </div>
          </div>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding + ratio * (height - padding * 2);
              return (
                <line
                  key={ratio}
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              );
            })}
            
            {/* Area under clicks */}
            <path
              d={`M ${padding},${height - padding} L ${pointsClicks} L ${width - padding},${height - padding} Z`}
              fill="url(#clickGrad)"
              opacity="0.1"
            />

            {/* Area under impressions */}
            <path
              d={`M ${padding},${height - padding} L ${pointsImps} L ${width - padding},${height - padding} Z`}
              fill="url(#impGrad)"
              opacity="0.05"
            />

            {/* Click Line */}
            <polyline fill="none" stroke="var(--color-primary)" strokeWidth="2.5" points={pointsClicks} strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Impression Line */}
            <polyline fill="none" stroke="#f59e0b" strokeWidth="2" points={pointsImps} strokeLinecap="round" strokeLinejoin="round" />

            {/* Definitions for Gradients */}
            <defs>
              <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Date Labels (Start and End) */}
            <text x={padding} y={height - 10} fontSize="10" fill="var(--color-muted)" textAnchor="start">
              {data[0].date}
            </text>
            <text x={width - padding} y={height - 10} fontSize="10" fill="var(--color-muted)" textAnchor="end">
              {data[data.length - 1].date}
            </text>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Property and Disconnect status header */}
      <div className="flex flex-col gap-4 justify-between sm:flex-row sm:items-center rounded-[var(--radius-card)] border border-border bg-surface p-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">{seoCopy(locale, "Connected Property")}</p>
          <p className="text-lg font-bold tracking-tight text-foreground break-all">{config.propertyUrl}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`focus-ring tap-target inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-semibold transition-all ${
                  days === d
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-foreground hover:bg-surface-muted"
                }`}
              >
                {seoDays(locale, d)}
              </button>
            ))}
          </div>
          <button
            onClick={handleDisconnect}
            disabled={isDisconnectPending}
            className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-danger/30 bg-danger/5 px-4 py-1.5 text-xs font-semibold text-danger hover:bg-danger/10 transition-colors cursor-pointer"
          >
            {isDisconnectPending ? seoCopy(locale, "Disconnecting...") : seoCopy(locale, "Disconnect")}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger">
          {seoCopy(locale, error)}
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse space-y-2 rounded-[var(--radius-card)] border border-border bg-surface p-6">
              <div className="h-4 w-2/3 rounded bg-foreground/10" />
              <div className="h-8 w-1/3 rounded bg-foreground/15" />
            </div>
          ))}
        </div>
      ) : report ? (
        <>
          {/* Key Analytics Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">{seoCopy(locale, "Organic Clicks")}</p>
              <p className="text-3xl font-black text-foreground">{report.totals.clicks.toLocaleString()}</p>
              <p className="text-xs text-muted">{seoCopy(locale, "Total user visits via Google Search")}</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">{seoCopy(locale, "Impressions")}</p>
              <p className="text-3xl font-black text-foreground">{report.totals.impressions.toLocaleString()}</p>
              <p className="text-xs text-muted">{seoCopy(locale, "How often site link appeared in search")}</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">{seoCopy(locale, "Average CTR")}</p>
              <p className="text-3xl font-black text-foreground">{(report.totals.ctr * 100).toFixed(2)}%</p>
              <p className="text-xs text-muted">{seoCopy(locale, "Ratio of impressions that resulted in clicks")}</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">{seoCopy(locale, "Average Position")}</p>
              <p className="text-3xl font-black text-foreground">{report.totals.position.toFixed(1)}</p>
              <p className="text-xs text-muted">{seoCopy(locale, "Average search result ranking of site")}</p>
            </div>
          </div>

          {/* Trend Chart */}
          {renderTrendChart()}

          {/* Detailed Lists */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Keywords Table */}
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 space-y-4">
              <h3 className="text-base font-bold tracking-tight text-foreground uppercase tracking-widest">{seoCopy(locale, "Top Search Queries")}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted uppercase font-semibold">
                      <th className="py-2.5 pr-4 font-semibold">{seoCopy(locale, "Query")}</th>
                      <th className="py-2.5 px-3 text-right font-semibold">{seoCopy(locale, "Clicks")}</th>
                      <th className="py-2.5 px-3 text-right font-semibold">{seoCopy(locale, "Imps")}</th>
                      <th className="py-2.5 pl-4 text-right font-semibold">{seoCopy(locale, "Pos")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.queries.slice(0, 12).map((q) => (
                      <tr key={q.query} className="border-b border-border/40 hover:bg-surface-muted/40 transition-colors">
                        <td className="py-3 pr-4 font-semibold text-foreground break-all">{q.query}</td>
                        <td className="py-3 px-3 text-right text-muted">{q.clicks}</td>
                        <td className="py-3 px-3 text-right text-muted">{q.impressions}</td>
                        <td className="py-3 pl-4 text-right font-semibold text-primary">{q.position.toFixed(1)}</td>
                      </tr>
                    ))}
                    {report.queries.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted">{seoCopy(locale, "No query data available yet.")}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Performing Pages Table */}
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 space-y-4">
              <h3 className="text-base font-bold tracking-tight text-foreground uppercase tracking-widest">{seoCopy(locale, "Top Target Pages")}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted uppercase font-semibold">
                      <th className="py-2.5 pr-4 font-semibold">{seoCopy(locale, "Page Path")}</th>
                      <th className="py-2.5 px-3 text-right font-semibold">{seoCopy(locale, "Clicks")}</th>
                      <th className="py-2.5 px-3 text-right font-semibold">{seoCopy(locale, "Imps")}</th>
                      <th className="py-2.5 pl-4 text-right font-semibold">{seoCopy(locale, "Pos")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.pages.slice(0, 12).map((p) => {
                      const cleanPath = p.page.replace(/https?:\/\/[^\/]+/, "") || "/";
                      return (
                        <tr key={p.page} className="border-b border-border/40 hover:bg-surface-muted/40 transition-colors">
                          <td className="py-3 pr-4 font-semibold text-foreground break-all text-xs max-w-[200px]" title={p.page}>
                            {cleanPath}
                          </td>
                          <td className="py-3 px-3 text-right text-muted">{p.clicks}</td>
                          <td className="py-3 px-3 text-right text-muted">{p.impressions}</td>
                          <td className="py-3 pl-4 text-right font-semibold text-primary">{p.position.toFixed(1)}</td>
                        </tr>
                      );
                    })}
                    {report.pages.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted">{seoCopy(locale, "No page performance data available yet.")}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-8 text-center space-y-2">
          <p className="text-muted">{seoCopy(locale, "No organic keyword stats returned. Please verify that this property url possesses search traffic.")}</p>
          <button
            onClick={() => loadReport(days)}
            className="focus-ring tap-target inline-flex items-center justify-center rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-all cursor-pointer"
          >
            {seoCopy(locale, "Retry Fetching Data")}
          </button>
        </div>
      )}
    </div>
  );
}
