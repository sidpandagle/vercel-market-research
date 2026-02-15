import { NextResponse } from 'next/server';
import { getReports } from '@/lib/api/reports';

const BASE_URL = 'https://www.healthcareforesights.com';

export async function GET() {
  try {
    const reportsResponse = await getReports({
      status: 'published',
      limit: 10000, // Get all published reports
    });

    if (!reportsResponse.success || !reportsResponse.data) {
      console.error('Error fetching reports for sitemap');
      return new NextResponse('Error generating sitemap', { status: 500 });
    }

    const reportUrls = reportsResponse.data.map((report) => ({
      url: `${BASE_URL}/reports/${report.slug}`,
      lastModified: new Date(report.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${reportUrls
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
    console.error('Error generating reports sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
