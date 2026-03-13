import { NextResponse } from 'next/server';
import { apiFetch } from '@/lib/api/config';

const BASE_URL = 'https://www.healthcareforesights.com';
const ITEMS_PER_SITEMAP = 1000;

interface SitemapItem {
  slug: string;
  updated_at: string;
  publish_date?: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page?: string }> }
) {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam ?? '', 10);

  if (isNaN(page) || page < 1) {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const res = await apiFetch<SitemapItem[]>(
      `/api/v1/sitemap/reports?page=${page}&limit=${ITEMS_PER_SITEMAP}`
    );

    if (!res.success || !res.data) {
      console.error('Error fetching reports for sitemap');
      return new NextResponse('Error generating sitemap', { status: 500 });
    }

    if (res.data.length === 0) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${res.data
  .map((item) => {
    const lastmod = new Date(item.publish_date || item.updated_at).toISOString();
    return `  <url>
    <loc>${BASE_URL}/reports/${item.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating reports sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
