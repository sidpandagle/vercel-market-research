import { MetadataRoute } from 'next';
import { getReports } from '@/lib/api/reports';
import { getBlogs } from '@/lib/api/blogs';
import { getPressReleases } from '@/lib/api/press-releases';

const BASE_URL = 'https://www.healthcareforesights.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reports`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/press-releases`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  sitemap.push(...staticPages);

  // Fetch and add all published reports
  try {
    const reportsResponse = await getReports({
      status: 'published',
      limit: 10000, // Get all published reports
    });

    if (reportsResponse.success && reportsResponse.data) {
      const reportPages = reportsResponse.data.map((report) => ({
        url: `${BASE_URL}/reports/${report.slug}`,
        lastModified: new Date(report.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

      sitemap.push(...reportPages);
    }
  } catch (error) {
    console.error('Error fetching reports for sitemap:', error);
  }

  // Fetch and add all published blogs
  try {
    const blogsResponse = await getBlogs({
      status: 'published',
      limit: 10000, // Get all published blogs
    });

    if (blogsResponse.success && blogsResponse.data) {
      const blogPages = blogsResponse.data.map((blog) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

      sitemap.push(...blogPages);
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  // Fetch and add all published press releases
  try {
    const pressReleasesResponse = await getPressReleases({
      status: 'published',
      limit: 10000, // Get all published press releases
    });

    if (pressReleasesResponse.success && pressReleasesResponse.data) {
      const pressReleasePages = pressReleasesResponse.data.map((pressRelease) => ({
        url: `${BASE_URL}/press-releases/${pressRelease.slug}`,
        lastModified: new Date(pressRelease.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

      sitemap.push(...pressReleasePages);
    }
  } catch (error) {
    console.error('Error fetching press releases for sitemap:', error);
  }

  return sitemap;
}
