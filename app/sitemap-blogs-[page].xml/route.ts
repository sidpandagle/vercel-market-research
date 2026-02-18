import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/api/blogs';

const BASE_URL = 'https://www.healthcareforesights.com';
const ITEMS_PER_SITEMAP = 500;

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
    const blogsResponse = await getBlogs({
      status: 'published',
      page,
      limit: ITEMS_PER_SITEMAP,
    });

    if (!blogsResponse.success || !blogsResponse.data) {
      console.error('Error fetching blogs for sitemap');
      return new NextResponse('Error generating sitemap', { status: 500 });
    }

    if (blogsResponse.data.length === 0) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const blogUrls = blogsResponse.data.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.date).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
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
    console.error('Error generating blogs sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
