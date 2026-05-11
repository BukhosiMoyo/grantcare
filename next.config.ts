import type { NextConfig } from "next";

import { getSeoRedirects } from "./src/lib/seo-redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return getSeoRedirects();
  },
};

export default nextConfig;
