import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Required for Railway deployment
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap-reports-:page.xml',
          destination: '/api/sitemap-reports/:page',
        },
        {
          source: '/sitemap-blogs-:page.xml',
          destination: '/api/sitemap-blogs/:page',
        },
        {
          source: '/sitemap-press-releases-:page.xml',
          destination: '/api/sitemap-press-releases/:page',
        },
      ],
    };
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