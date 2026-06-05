import { DEFAULT_LOCALE, type Locale } from "@/lib/site";

export type SassaOfficeType = "head" | "regional";

export type SassaOffice = {
  slug: string;
  type: SassaOfficeType;
  name: string;
  province: string;
  city: string;
  suburb?: string;
  address: string;
  phone: string;
  email?: string;
  services: string[];
  latitude: number;
  longitude: number;
  sourceLabel: string;
  sourceUrl: string;
  lastVerified: string;
};

export type SassaOfficeSearchResult = SassaOffice & {
  distanceKm?: number;
};

export const SASSA_OFFICE_SOURCE = {
  label: "SASSA Services contact page",
  href: "https://services.sassa.gov.za/portal/r/sassa/sassa/contact-us-pu",
} as const;

const GOVERNMENT_DIRECTORY_SOURCE = {
  label: "South African Government SASSA directory",
  href: "https://www.gov.za/about-government/contact-directory/soe/south-african-social-security-agency-sassa",
} as const;

export const SASSA_OFFICES: SassaOffice[] = [
  {
    slug: "sassa-head-office-pretoria",
    type: "head",
    name: "SASSA Head Office",
    province: "Gauteng",
    city: "Pretoria",
    address: "501 Prodinsa Building, Cnr Beatrix and Pretorius Street, Pretoria",
    phone: "0800 60 10 11",
    email: "GrantEnquiries@sassa.gov.za",
    services: ["National support", "Grant enquiries"],
    latitude: -25.7461,
    longitude: 28.2111,
    sourceLabel: GOVERNMENT_DIRECTORY_SOURCE.label,
    sourceUrl: GOVERNMENT_DIRECTORY_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-eastern-cape-east-london",
    type: "regional",
    name: "SASSA Eastern Cape",
    province: "Eastern Cape",
    city: "East London",
    suburb: "Chiselhurst",
    address: "1st Floor, Waverley Office Park, 3-33 Phillip Frame Road, Chiselhurst, East London, 5200",
    phone: "043 707 6335",
    email: "GrantsEnquiriesEC@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -33.0153,
    longitude: 27.9036,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-free-state-bloemfontein",
    type: "regional",
    name: "SASSA Free State",
    province: "Free State",
    city: "Bloemfontein",
    address: "African Life Building, 75 St Andrew Street, Bloemfontein, 9300",
    phone: "051 410 8339",
    email: "GrantsEnquiriesFS@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -29.116,
    longitude: 26.2182,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-gauteng-johannesburg",
    type: "regional",
    name: "SASSA Gauteng",
    province: "Gauteng",
    city: "Johannesburg",
    address: "28 Harrison Street, Johannesburg, 2000",
    phone: "011 241 8320",
    email: "GrantsEnquiriesGP@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -26.2041,
    longitude: 28.041,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-kwazulu-natal-pietermaritzburg",
    type: "regional",
    name: "SASSA KwaZulu-Natal",
    province: "KwaZulu-Natal",
    city: "Pietermaritzburg",
    address: "1 Bank Street, Pietermaritzburg, 3201",
    phone: "033 846 3400",
    email: "GrantsEnquiriesKZN@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -29.6006,
    longitude: 30.3794,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-limpopo-polokwane",
    type: "regional",
    name: "SASSA Limpopo",
    province: "Limpopo",
    city: "Polokwane",
    address: "43 Landros Mare Street, Polokwane, 0699",
    phone: "015 291 7509",
    email: "GrantsEnquiriesLIM@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -23.9059,
    longitude: 29.459,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-mpumalanga-mbombela",
    type: "regional",
    name: "SASSA Mpumalanga",
    province: "Mpumalanga",
    city: "Mbombela",
    address: "18 Ferreira Street, Nelspruit, 1200",
    phone: "013 754 9446",
    email: "GrantsEnquiriesMP@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -25.4753,
    longitude: 30.97,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-north-west-mmabatho",
    type: "regional",
    name: "SASSA North West",
    province: "North West",
    city: "Mmabatho",
    address: "SASSA House, University Drive, Mmabatho, 2735",
    phone: "018 388 4006",
    email: "GrantsEnquiriesnw@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -25.8357,
    longitude: 25.6145,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-northern-cape-kimberley",
    type: "regional",
    name: "SASSA Northern Cape",
    province: "Northern Cape",
    city: "Kimberley",
    address: "95-97 Du Toitspan Road, Kimberley, 8300",
    phone: "053 802 4919",
    email: "GrantsEnquiriesNC@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -28.7407,
    longitude: 24.7653,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
  {
    slug: "sassa-western-cape-cape-town",
    type: "regional",
    name: "SASSA Western Cape",
    province: "Western Cape",
    city: "Cape Town",
    address: "Golden Acre, Adderley Street, Cape Town, 8000",
    phone: "021 469 0235",
    email: "GrantsEnquiriesWC@sassa.gov.za",
    services: ["Regional support", "Grant enquiries"],
    latitude: -33.9233,
    longitude: 18.4235,
    sourceLabel: SASSA_OFFICE_SOURCE.label,
    sourceUrl: SASSA_OFFICE_SOURCE.href,
    lastVerified: "2026-06-05",
  },
];

const COPY: Partial<
  Record<
    Locale,
    {
      allProvinces: string;
      call: string;
      directions: string;
      details: string;
      lastVerified: string;
      noOfficesFound: string;
      noRecentReport: string;
      openGoogleMaps: string;
      phone: string;
      province: string;
      routeFrom: string;
      routePlaceholder: string;
      routeTitle: string;
      search: string;
      searchPlaceholder: string;
      showRoute: string;
      source: string;
      useMyLocation: string;
    }
  >
> = {
  zu: {
    allProvinces: "Zonke izifundazwe",
    call: "Shayela",
    directions: "Izikhombisi-ndlela",
    details: "Imininingwane",
    lastVerified: "Kuqinisekiswe",
    noOfficesFound: "Awekho amahhovisi atholakele",
    noRecentReport: "Awukho umbiko wakamuva",
    openGoogleMaps: "Vula ku-Google Maps",
    phone: "Ucingo",
    province: "Isifundazwe",
    routeFrom: "Kusuka",
    routePlaceholder: "Ikheli noma indawo",
    routeTitle: "Izikhombisi-ndlela",
    search: "Sesha",
    searchPlaceholder: "Idolobhana, idolobha, ihhovisi",
    showRoute: "Bonisa indlela",
    source: "Umthombo",
    useMyLocation: "Sebenzisa indawo yami",
  },
};

export function getSassaOfficeCopy(locale: Locale = DEFAULT_LOCALE) {
  return {
    allProvinces: "All provinces",
    call: "Call",
    directions: "Directions",
    details: "Details",
    lastVerified: "Verified",
    noOfficesFound: "No offices found",
    noRecentReport: "No recent report",
    openGoogleMaps: "Open Google Maps",
    phone: "Phone",
    province: "Province",
    routeFrom: "From",
    routePlaceholder: "Address or suburb",
    routeTitle: "Directions",
    search: "Search",
    searchPlaceholder: "Suburb, city, office",
    showRoute: "Show route",
    source: "Source",
    useMyLocation: "Use my location",
    ...(COPY[locale] ?? {}),
  };
}

export function getSassaOfficeBySlug(slug: string) {
  return SASSA_OFFICES.find((office) => office.slug === slug) ?? null;
}

export function getSassaOfficeProvinces() {
  return Array.from(new Set(SASSA_OFFICES.map((office) => office.province))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getSassaOfficeDirectionsUrl(office: Pick<SassaOffice, "address" | "name">) {
  const destination = encodeURIComponent(`${office.name}, ${office.address}`);

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export function getSassaOfficeRouteUrl(input: {
  office: Pick<SassaOffice, "address" | "name">;
  origin: string;
}) {
  const origin = encodeURIComponent(input.origin);
  const destination = encodeURIComponent(`${input.office.name}, ${input.office.address}`);

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
}

export function getSassaOfficeRouteEmbedUrl(input: {
  office: Pick<SassaOffice, "address" | "name">;
  origin: string;
}) {
  const origin = encodeURIComponent(input.origin);
  const destination = encodeURIComponent(`${input.office.name}, ${input.office.address}`);

  return `https://www.google.com/maps?output=embed&saddr=${origin}&daddr=${destination}`;
}

export function getSassaOfficeMapSearchUrl(office: Pick<SassaOffice, "address" | "name">) {
  const query = encodeURIComponent(`${office.name}, ${office.address}`);

  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getDistanceKm(
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
) {
  const earthRadiusKm = 6371;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latDelta = toRadians(destination.latitude - origin.latitude);
  const lonDelta = toRadians(destination.longitude - origin.longitude);
  const originLat = toRadians(origin.latitude);
  const destinationLat = toRadians(destination.latitude);
  const haversine =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(originLat) * Math.cos(destinationLat) * Math.sin(lonDelta / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function searchSassaOffices(input: {
  query?: string;
  province?: string;
  userLocation?: { latitude: number; longitude: number } | null;
}) {
  const query = input.query?.trim().toLowerCase() ?? "";
  const province = input.province?.trim();

  const results = SASSA_OFFICES.filter((office) => {
    const matchesProvince = !province || office.province === province;
    const haystack = [
      office.name,
      office.province,
      office.city,
      office.suburb,
      office.address,
      office.phone,
      office.email,
      ...office.services,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesProvince && (!query || haystack.includes(query));
  }).map((office) => ({
    ...office,
    distanceKm: input.userLocation
      ? getDistanceKm(input.userLocation, office)
      : undefined,
  }));

  return results.sort((a, b) => {
    if (typeof a.distanceKm === "number" && typeof b.distanceKm === "number") {
      return a.distanceKm - b.distanceKm;
    }

    return `${a.province} ${a.city}`.localeCompare(`${b.province} ${b.city}`);
  });
}
