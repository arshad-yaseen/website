import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  transpilePackages: ["@fyi/ui", "@fyi/shared"],
  async redirects() {
    return [
      // renamed 2026-08
      {
        source: "/writings/engineering-high-performance-parsers",
        destination: "/writings/data-oriented-design-in-yukus-parser",
        permanent: true,
      },
      {
        source: "/writings/engineering-high-performance-parsers/:path*",
        destination: "/writings/data-oriented-design-in-yukus-parser/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
