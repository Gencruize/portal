import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://api-staging.optisage.ai/api/:path*",
      },
    ];
  },
};

export default nextConfig;
