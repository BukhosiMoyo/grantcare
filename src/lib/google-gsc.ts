import crypto from "crypto";
import { db } from "@/lib/prisma";

export interface GscCredentials {
  client_email: string;
  private_key: string;
  project_id?: string;
}

export interface GscPerformanceRow {
  keys: string[]; // [query, page] or [date]
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscPerformanceSummary {
  totals: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  queries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  pages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  trend: Array<{
    date: string;
    clicks: number;
    impressions: number;
  }>;
}

/**
 * Creates a signed JWT assertion using built-in Node.js crypto
 */
function createSignedJwt(clientEmail: string, privateKey: string): string {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const nowSecs = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: nowSecs + 3600,
    iat: nowSecs,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${encodedHeader}.${encodedPayload}`);
  
  // Format private key properly if double newlines exist
  const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");
  const signature = sign.sign(formattedPrivateKey, "base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Exchanges service account signed JWT for a Google Access Token
 */
async function fetchAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const jwt = createSignedJwt(clientEmail, privateKey);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString(),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google OAuth token exchange failed: ${response.statusText} - ${errText}`);
  }

  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Google OAuth token response did not contain access_token.");
  }

  return data.access_token;
}

/**
 * Helper to get active GSC settings from database
 */
export async function getGscConfig() {
  const [propertyUrlSetting, saKeySetting] = await Promise.all([
    db.siteSetting.findUnique({ where: { key: "gsc_property_url" } }),
    db.siteSetting.findUnique({ where: { key: "gsc_service_account_key" } }),
  ]);

  return {
    propertyUrl: propertyUrlSetting?.value || "",
    serviceAccountKey: saKeySetting?.value || "",
    isConnected: !!(propertyUrlSetting?.value && saKeySetting?.value),
  };
}

/**
 * Connects and queries Google Search Console API for organic keyword metrics
 */
export async function queryGscData(days: number = 7): Promise<GscPerformanceSummary> {
  const { propertyUrl, serviceAccountKey, isConnected } = await getGscConfig();

  if (!isConnected) {
    throw new Error("Google Search Console credentials are not fully configured.");
  }

  let credentials: GscCredentials;
  try {
    credentials = JSON.parse(serviceAccountKey);
  } catch {
    throw new Error("Invalid Service Account JSON key stored in database.");
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("Service Account JSON must contain client_email and private_key.");
  }

  // Obtain access token
  const accessToken = await fetchAccessToken(credentials.client_email, credentials.private_key);

  // Formulate dates: GSC usually has a 2-3 day lag in data
  const end = new Date();
  end.setDate(end.getDate() - 2); // 2 days ago lag
  
  const start = new Date();
  start.setDate(start.getDate() - 2 - days);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const startDateStr = formatDate(start);
  const endDateStr = formatDate(end);

  // Double url encode the site url property as required by GSC API
  const encodedProperty = encodeURIComponent(propertyUrl);
  const apiUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodedProperty}/searchAnalytics/query`;

  const queryApi = async (body: object): Promise<GscPerformanceRow[]> => {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Google Search Console query failed: ${res.statusText} - ${text}`);
    }

    const json = await res.json();
    return json.rows || [];
  };

  // 1. Query Overall totals (No dimensions)
  const totalsRows = await queryApi({
    startDate: startDateStr,
    endDate: endDateStr,
    rowLimit: 1,
  });

  const totals = totalsRows.length > 0
    ? {
        clicks: totalsRows[0].clicks,
        impressions: totalsRows[0].impressions,
        ctr: totalsRows[0].ctr,
        position: totalsRows[0].position,
      }
    : { clicks: 0, impressions: 0, ctr: 0, position: 0 };

  // 2. Query Top Keywords
  const keywordRows = await queryApi({
    startDate: startDateStr,
    endDate: endDateStr,
    dimensions: ["query"],
    rowLimit: 25,
  });

  const queries = keywordRows.map((row) => ({
    query: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));

  // 3. Query Top Pages
  const pageRows = await queryApi({
    startDate: startDateStr,
    endDate: endDateStr,
    dimensions: ["page"],
    rowLimit: 25,
  });

  const pages = pageRows.map((row) => ({
    page: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));

  // 4. Query Daily Trends
  const trendRows = await queryApi({
    startDate: startDateStr,
    endDate: endDateStr,
    dimensions: ["date"],
    rowLimit: 60,
  });

  const trend = trendRows
    .map((row) => ({
      date: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totals,
    queries,
    pages,
    trend,
  };
}
