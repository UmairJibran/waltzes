import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/scraped',
        destination: '/scraped/linkedin',
        permanent: false,
      },
      {
        source: '/',
        destination: '/applications',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
