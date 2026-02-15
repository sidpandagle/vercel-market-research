import { NextResponse } from 'next/server';
import { getPressReleases } from '@/lib/api/press-releases';

const BASE_URL = 'https://www.healthcareforesights.com';

export async function GET() {
  try {
    const pressReleasesResponse = await getPressReleases({
      status: 'published',
      limit: 10000, // Get all published press releases
    });

    if (!pressReleasesResponse.success || !pressReleasesResponse.data) {
      console.error('Error fetching press releases for sitemap');
      return new NextResponse('Error generating sitemap', { status: 500 });
    }

    const pressReleaseUrls = pressReleasesResponse.data.map((pressRelease) => ({
      url: `${BASE_URL}/press-releases/${pressRelease.slug}`,
      lastModified: new Date(pressRelease.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pressReleaseUrls
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating press releases sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
