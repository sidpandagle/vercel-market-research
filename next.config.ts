import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.synapticresearch.com',
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
            value: 'synapticresearch.com',
          },
        ],
        destination: 'https://www.synapticresearch.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;