import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Required for Railway deployment
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'healthcareforesights.com',
          },
        ],
        destination: 'https://www.healthcareforesights.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;