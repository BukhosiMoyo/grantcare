"use client";

import Link from "next/link";
import { useCallback, useMemo, useState, type FormEvent } from "react";

import { SassaOfficeMap } from "@/components/sassa-office-map";
import { Card, Field, Input, Pill, Select, StatusMessage } from "@/components/ui";
import {
  getSassaOfficeCopy,
  getSassaOfficeRouteUrl,
  getSassaOfficeProvinces,
  searchSassaOffices,
  type SassaOfficeSearchResult,
} from "@/lib/sassa-offices";
import { buildLocalePath, type Locale } from "@/lib/site";

function formatDistance(value?: number) {
  if (typeof value !== "number") {
    return null;
  }

  if (value < 10) {
    return `${value.toFixed(1)} km`;
  }

  return `${Math.round(value)} km`;
}

function formatVerifiedDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function OfficeCard({
  locale,
  office,
  selected,
  onSelect,
  onDirections,
}: {
  locale: Locale;
  office: SassaOfficeSearchResult;
  selected: boolean;
  onSelect: (office: SassaOfficeSearchResult) => void;
  onDirections: (office: SassaOfficeSearchResult) => void;
}) {
  const copy = getSassaOfficeCopy(locale);
  const distance = formatDistance(office.distanceKm);

  return (
    <Card
      className={`space-y-4 transition-colors ${selected ? "border-primary/45 bg-surface" : ""}`}
    >
      <button
        type="button"
        onClick={() => onSelect(office)}
        className="focus-ring block w-full rounded-2xl text-left"
      >
        <div className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{office.name}</h2>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
                {office.city}, {office.province}
              </p>
            </div>
            {distance ? (
              <span className="self-start rounded-full bg-surface-strong px-3 py-1 text-sm font-semibold text-primary">
                {distance}
              </span>
            ) : null}
          </div>
          <p className="text-sm leading-7 text-muted">{office.address}</p>
        </div>
      </button>

      <div className="flex flex-wrap gap-2">
        {office.services.map((service) => (
          <Pill key={service}>{service}</Pill>
        ))}
        <Pill>{copy.noRecentReport}</Pill>
      </div>

      <div className="grid gap-2 text-sm text-muted">
        <p>
          <span className="font-semibold text-foreground">{copy.lastVerified}:</span>{" "}
          {formatVerifiedDate(office.lastVerified)}
        </p>
        <p>
          <span className="font-semibold text-foreground">{copy.phone}:</span>{" "}
          <a href={`tel:${office.phone.replace(/\D/g, "")}`} className="font-semibold text-primary hover:text-primary-strong">
            {office.phone}
          </a>
        </p>
        <p>
          <span className="font-semibold text-foreground">{copy.source}:</span>{" "}
          <a
            href={office.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary hover:text-primary-strong"
          >
            {office.sourceLabel}
          </a>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={`tel:${office.phone.replace(/\D/g, "")}`}
          className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-muted"
        >
          {copy.call}
        </a>
        <button
          type="button"
          onClick={() => onDirections(office)}
          className="primary-action focus-ring tap-target inline-flex items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold hover:bg-primary-strong"
        >
          {copy.directions}
        </button>
        <Link
          href={buildLocalePath(locale, `/sassa-office-locator/${office.slug}`)}
          className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-muted"
        >
          {copy.details}
        </Link>
      </div>
    </Card>
  );
}

function RoutePlanner({
  locale,
  office,
  onRouteRequest,
  userLocation,
}: {
  locale: Locale;
  office: SassaOfficeSearchResult;
  onRouteRequest: (origin: string) => void;
  userLocation: { latitude: number; longitude: number } | null;
}) {
  const copy = getSassaOfficeCopy(locale);
  const [origin, setOrigin] = useState("");
  const [submittedOrigin, setSubmittedOrigin] = useState("");
  const routeUrl = submittedOrigin
    ? getSassaOfficeRouteUrl({ office, origin: submittedOrigin })
    : "";

  function submitRoute(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextOrigin = origin.trim();

    if (nextOrigin) {
      setSubmittedOrigin(nextOrigin);
      onRouteRequest(nextOrigin);
    }
  }

  function useCurrentLocation() {
    if (!userLocation) {
      return;
    }

    const nextOrigin = `${userLocation.latitude},${userLocation.longitude}`;
    setOrigin(nextOrigin);
    setSubmittedOrigin(nextOrigin);
    onRouteRequest(nextOrigin);
  }

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
          {copy.routeTitle}
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{office.name}</h2>
      </div>

      <form onSubmit={submitRoute} className="space-y-3">
        <Field label={copy.routeFrom}>
          <Input
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            placeholder={copy.routePlaceholder}
            type="text"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="primary-action focus-ring tap-target inline-flex items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold hover:bg-primary-strong"
          >
            {copy.showRoute}
          </button>
          {userLocation ? (
            <button
              type="button"
              onClick={useCurrentLocation}
              className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-muted"
            >
              {copy.useMyLocation}
            </button>
          ) : null}
        </div>
      </form>

      {routeUrl ? (
        <div className="space-y-3">
          <a
            href={routeUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-muted"
          >
            {copy.openGoogleMaps}
          </a>
        </div>
      ) : null}
    </Card>
  );
}

export function SassaOfficeLocator({ locale }: { locale: Locale }) {
  const copy = getSassaOfficeCopy(locale);
  const provinces = useMemo(() => getSassaOfficeProvinces(), []);
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();
  const [routeOfficeSlug, setRouteOfficeSlug] = useState<string | undefined>();
  const [routeOrigin, setRouteOrigin] = useState("");
  const [routeStatus, setRouteStatus] = useState("");
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState("");

  const offices = useMemo(
    () => searchSassaOffices({ query, province, userLocation }),
    [province, query, userLocation],
  );
  const selectedOffice = offices.find((office) => office.slug === selectedSlug) ?? offices[0];
  const routeOffice = routeOfficeSlug
    ? offices.find((office) => office.slug === routeOfficeSlug)
    : undefined;

  const selectOffice = useCallback((office: SassaOfficeSearchResult) => {
    setSelectedSlug(office.slug);
  }, []);

  const selectOfficeBySlug = useCallback((slug: string) => {
    setSelectedSlug(slug);
  }, []);

  const planDirections = useCallback((office: SassaOfficeSearchResult) => {
    setSelectedSlug(office.slug);
    setRouteOfficeSlug(office.slug);
    setRouteStatus("");
  }, []);

  const submitRoute = useCallback((origin: string) => {
    setRouteOrigin(origin);
    setRouteStatus("");
  }, []);

  function requestLocation() {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Location unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLocationError("Location unavailable");
      },
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 },
    );
  }

  return (
    <div className="space-y-5">
      <Card className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_16rem_auto]">
          <Field label={copy.search}>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              type="search"
            />
          </Field>
          <Field label={copy.province}>
            <Select value={province} onChange={(event) => setProvince(event.target.value)}>
              <option value="">{copy.allProvinces}</option>
              {provinces.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </Select>
          </Field>
          <div className="flex items-end">
            <button
              type="button"
              onClick={requestLocation}
              className="primary-action focus-ring tap-target w-full rounded-full bg-primary px-5 text-sm font-semibold hover:bg-primary-strong lg:w-auto"
            >
              {copy.useMyLocation}
            </button>
          </div>
        </div>
        {locationError ? <StatusMessage tone="error">{locationError}</StatusMessage> : null}
      </Card>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          {offices.map((office) => (
            <OfficeCard
              key={office.slug}
              locale={locale}
              office={office}
              selected={office.slug === selectedOffice?.slug}
              onSelect={selectOffice}
              onDirections={planDirections}
            />
          ))}
          {offices.length === 0 ? <StatusMessage>{copy.noOfficesFound}</StatusMessage> : null}
        </div>

        <div className="lg:sticky lg:top-24">
          {routeOffice ? (
            <div className="mb-5">
              <RoutePlanner
                locale={locale}
                office={routeOffice}
                onRouteRequest={submitRoute}
                userLocation={userLocation}
              />
              {routeStatus ? <StatusMessage tone="error">{routeStatus}</StatusMessage> : null}
            </div>
          ) : null}
          <SassaOfficeMap
            offices={offices}
            routeRequest={
              routeOffice && routeOrigin
                ? { destinationSlug: routeOffice.slug, origin: routeOrigin }
                : undefined
            }
            selectedSlug={selectedOffice?.slug}
            onRouteStatus={setRouteStatus}
            onSelect={selectOfficeBySlug}
          />
        </div>
      </div>
    </div>
  );
}
