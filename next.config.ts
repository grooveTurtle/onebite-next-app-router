import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    // domains: ["https://shopping-phinf.pstatic.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
