"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { Field, Input, Select } from "@/components/ui";
import {
  filterBrowsableGuides,
  GUIDE_TOPICS,
  type BrowsableGuide,
  type GuideTopic,
} from "@/lib/guide-browse";
import { buildLocalePath, type Locale } from "@/lib/site";

export function GuideLibrary({
  guides,
  locale,
}: {
  guides: BrowsableGuide[];
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<GuideTopic>("all");
  const deferredQuery = useDeferredValue(query);
  const visible = filterBrowsableGuides(guides, deferredQuery, topic);
  const copy =
    locale === "zu"
      ? {
          search: "Sesha imihlahlandlela",
          topic: "Isihloko",
          results: "Imihlahlandlela",
          reset: "Sula",
          empty: "Ayikho imihlahlandlela etholakele.",
          all: "Zonke izihloko",
          payments: "Izinkokhelo",
          status: "Isimo nezikhalazo",
          banking: "Imininingwane yasebhange",
          applications: "Izicelo",
          other: "Okunye",
        }
      : {
          search: "Search guides",
          topic: "Topic",
          results: "Guides",
          reset: "Clear filters",
          empty: "No guides found.",
          all: "All topics",
          payments: "Payments",
          status: "Status & appeals",
          banking: "Banking details",
          applications: "Applications",
          other: "Other guides",
        };

  return (
    <div className="space-y-5">
      <div className="library-controls">
        <Field label={copy.search}>
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Field>
        <Field label={copy.topic}>
          <Select
            value={topic}
            onChange={(event) => setTopic(event.target.value as GuideTopic)}
          >
            {GUIDE_TOPICS.map((key) => (
              <option key={key} value={key}>
                {copy[key]}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="flex min-h-11 items-center justify-between gap-3 text-sm text-muted">
        <p role="status" aria-live="polite">
          {copy.results}: {visible.length}
        </p>
        {query || topic !== "all" ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTopic("all");
            }}
            className="min-h-11 font-semibold text-primary underline underline-offset-4"
          >
            {copy.reset}
          </button>
        ) : null}
      </div>
      <div className="library-results" aria-busy={query !== deferredQuery}>
        {visible.map((guide) => (
          <Link
            className="library-result"
            href={buildLocalePath(locale, `/guides/${guide.slug}`)}
            key={guide.slug}
          >
            <div>
              <h2>{guide.title}</h2>
              <p>{guide.summary}</p>
            </div>
            <ArrowRightIcon />
          </Link>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="rounded-xl border border-border bg-white p-6 text-muted">
          {copy.empty}
        </p>
      ) : null}
    </div>
  );
}
