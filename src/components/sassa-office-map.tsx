"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { SassaOfficeSearchResult } from "@/lib/sassa-offices";

type RouteRequest = {
  destinationSlug: string;
  origin: string;
};

declare global {
  interface Window {
    __grantcareGoogleMaps?: Promise<typeof google>;
    __grantcareInitGoogleMaps?: () => void;
  }
}

const GOOGLE_MAPS_SCRIPT_ID = "grantcare-google-maps";
let googleMapsRuntimeKey = "";

async function getGoogleMapsKey() {
  const publicKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (publicKey) {
    return publicKey;
  }

  const response = await fetch("/api/maps/config", {
    cache: "no-store",
  });

  if (!response.ok) {
    return "";
  }

  const data = (await response.json()) as { key?: string };

  return data.key ?? "";
}

async function loadGoogleMaps() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps unavailable"));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google);
  }

  if (window.__grantcareGoogleMaps) {
    return window.__grantcareGoogleMaps;
  }

  const key = await getGoogleMapsKey();

  if (!key) {
    return Promise.reject(new Error("Google Maps key missing"));
  }

  googleMapsRuntimeKey = key;

  window.__grantcareGoogleMaps = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Google Maps failed")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    window.__grantcareInitGoogleMaps = () => resolve(window.google);
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places,routes&loading=async&v=weekly&callback=__grantcareInitGoogleMaps`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Google Maps failed"));
    document.head.appendChild(script);
  });

  return window.__grantcareGoogleMaps;
}

function getStreetViewUrl(office: SassaOfficeSearchResult) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || googleMapsRuntimeKey;

  if (!key) {
    return "";
  }

  const params = new URLSearchParams({
    fov: "80",
    key,
    location: `${office.latitude},${office.longitude}`,
    pitch: "0",
    size: "360x160",
  });

  return `https://maps.googleapis.com/maps/api/streetview?${params.toString()}`;
}

function createInfoWindowContent(office: SassaOfficeSearchResult) {
  const imageUrl = getStreetViewUrl(office);
  const safeName = office.name.replace(/[&<>"']/g, "");
  const safeAddress = office.address.replace(/[&<>"']/g, "");
  const safePhone = office.phone.replace(/[&<>"']/g, "");

  return `
    <div style="width: 260px; font-family: system-ui, sans-serif; color: #18241f;">
      ${
        imageUrl
          ? `<img src="${imageUrl}" alt="" style="width: 100%; height: 116px; object-fit: cover; border-radius: 12px; margin-bottom: 10px; background: #efe2c7;" />`
          : ""
      }
      <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">${safeName}</div>
      <div style="font-size: 13px; line-height: 1.5; color: #5d685f; margin-bottom: 6px;">${safeAddress}</div>
      <a href="tel:${office.phone.replace(/\D/g, "")}" style="font-weight: 700; font-size: 13px; color: #174c3c; text-decoration: none;">${safePhone}</a>
    </div>
  `;
}

export function SassaOfficeMap({
  offices,
  routeRequest,
  selectedSlug,
  onRouteStatus,
  onSelect,
}: {
  offices: SassaOfficeSearchResult[];
  routeRequest?: RouteRequest;
  selectedSlug?: string;
  onRouteStatus?: (message: string) => void;
  onSelect: (slug: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const routePolylineRef = useRef<google.maps.Polyline | null>(null);
  const [loadError, setLoadError] = useState("");

  const selectedOffice = useMemo(
    () => offices.find((office) => office.slug === selectedSlug) ?? offices[0],
    [offices, selectedSlug],
  );

  useEffect(() => {
    let cancelled = false;

    async function setupMap() {
      try {
        const googleApi = await loadGoogleMaps();

        if (cancelled || !containerRef.current || mapRef.current) {
          return;
        }

        const map = new googleApi.maps.Map(containerRef.current, {
          center: { lat: -29.0, lng: 24.0 },
          clickableIcons: false,
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          zoom: 5,
        });

        mapRef.current = map;
        infoWindowRef.current = new googleApi.maps.InfoWindow();
      } catch {
        if (!cancelled) {
          setLoadError("Google Maps unavailable");
        }
      }
    }

    setupMap();

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      routePolylineRef.current?.setMap(null);
      routePolylineRef.current = null;
      mapRef.current = null;
      infoWindowRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const infoWindow = infoWindowRef.current;

    if (!map || !infoWindow) {
      return;
    }

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = offices.map((office) => {
      const marker = new google.maps.Marker({
        map,
        position: { lat: office.latitude, lng: office.longitude },
        title: office.name,
      });

      marker.addListener("click", () => {
        onSelect(office.slug);
        infoWindow.setContent(createInfoWindowContent(office));
        infoWindow.open({ anchor: marker, map });
      });

      return marker;
    });

    if (offices.length === 0) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    offices.forEach((office) => bounds.extend({ lat: office.latitude, lng: office.longitude }));
    map.fitBounds(bounds, 48);
  }, [offices, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    const infoWindow = infoWindowRef.current;

    if (!map || !selectedOffice) {
      return;
    }

    const selectedMarker = markersRef.current.find(
      (marker) => marker.getTitle() === selectedOffice.name,
    );

    map.panTo({ lat: selectedOffice.latitude, lng: selectedOffice.longitude });

    if (selectedMarker && infoWindow) {
      infoWindow.setContent(createInfoWindowContent(selectedOffice));
      infoWindow.open({ anchor: selectedMarker, map });
    }
  }, [selectedOffice]);

  useEffect(() => {
    let cancelled = false;
    const map = mapRef.current;
    const office = routeRequest
      ? offices.find((entry) => entry.slug === routeRequest.destinationSlug)
      : undefined;

    if (!map) {
      return;
    }

    routePolylineRef.current?.setMap(null);
    routePolylineRef.current = null;

    if (!routeRequest || !office) {
      return;
    }

    const routeOffice = office;
    const routeOrigin = routeRequest.origin;
    const routeMap = map;

    async function renderRoute() {
      try {
        onRouteStatus?.("");
        const routesLibrary = (await google.maps.importLibrary(
          "routes",
        )) as google.maps.RoutesLibrary;
        const response = await routesLibrary.Route.computeRoutes({
          destination: { lat: routeOffice.latitude, lng: routeOffice.longitude },
          fields: ["path", "viewport"],
          origin: routeOrigin,
          travelMode: "DRIVING",
        });
        const route = response.routes?.[0];

        if (cancelled || !route?.path) {
          return;
        }

        const polyline = new google.maps.Polyline({
          map: routeMap,
          path: route.path,
          strokeColor: "#174c3c",
          strokeOpacity: 0.88,
          strokeWeight: 5,
        });

        routePolylineRef.current = polyline;

        if (route.viewport) {
          routeMap.fitBounds(route.viewport);
        }

        onRouteStatus?.("");
      } catch {
        if (!cancelled) {
          onRouteStatus?.("Route unavailable");
        }
      }
    }

    renderRoute();

    return () => {
      cancelled = true;
    };
  }, [offices, onRouteStatus, routeRequest]);

  if (loadError) {
    return (
      <div className="grid h-[22rem] place-items-center rounded-[var(--radius-card)] border border-border bg-surface-strong px-4 text-center text-sm font-semibold text-primary lg:h-[38rem]">
        {loadError}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="sassa-office-map overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-strong"
      style={{ height: "min(38rem, max(22rem, calc(100vh - 8rem)))" }}
      aria-label="SASSA office map"
    />
  );
}
