import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.neographanalytics.com',
      },
    ],
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
            value: 'neographanalytics.com',
          },
        ],
        destination: 'https://www.neographanalytics.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;