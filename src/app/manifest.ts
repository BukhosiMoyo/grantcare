import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GrantCare",
    short_name: "GrantCare",
    description:
      "Independent mobile-first grant-help platform for payment dates, status guidance, and reminders.",
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
