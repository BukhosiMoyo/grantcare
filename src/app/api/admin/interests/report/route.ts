import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-guards";
import { getInterestReport } from "@/lib/interests";
import { csvCell, interestLabel } from "@/lib/interest-schema";

export async function GET(request: Request) {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
  const days = new URL(request.url).searchParams.get("days") === "7" ? 7 : 30;
  try {
    const report = await getInterestReport(days);
    const rows = [
      ["GrantCare demand report", "Active interests, not qualified leads"],
      ["Generated at", new Date().toISOString()], ["Period starts", report.since.toISOString()],
      ["Window days", days], ["Unique contact details", report.uniqueContacts],
      ["Interest", "Active submissions", "Personally confirmed"],
      ...report.topics.map((row) => [interestLabel(row.topic), row.submitted, row.confirmed]),
      ["Notes", "No names, phone numbers or emails included. Payment-update interest is not banking interest. Confirmed means manual follow-up, not identity or product-eligibility verification. No permission to share contacts with partners."],
    ];
    return new Response(rows.map((row) => row.map(csvCell).join(",")).join("\r\n"), { headers: {
      "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="grantcare-demand-${days}d.csv"`,
      "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex",
    } });
  } catch {
    return NextResponse.json({ error: "Interest reporting is unavailable." }, { status: 503 });
  }
}
