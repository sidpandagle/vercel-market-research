import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/api/blogs';

const BASE_URL = 'https://www.healthcareforesights.com';

export async function GET() {
  try {
    const blogsResponse = await getBlogs({
      status: 'published',
      limit: 10000, // Get all published blogs
    });

    if (!blogsResponse.success || !blogsResponse.data) {
      console.error('Error fetching blogs for sitemap');
      return new NextResponse('Error generating sitemap', { status: 500 });
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
    console.error('Error generating blogs sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
