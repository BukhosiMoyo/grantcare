import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GrantCare",
    short_name: "GrantCare",
    description:
      "Independent SASSA grant help for payment dates, status checks, eligibility, and reminders.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f0e2",
    theme_color: "#174c3c",
    icons: [
      {
        src: "/grantcare-icon.png",
        sizes: "445x446",
        type: "image/png",
      },
    ],
  };
}
