import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.healthcareforesights.com';

/**
 * Sitemap Index
 *
 * This is the main sitemap that references all sub-sitemaps.
 * Similar to the structure used by towardshealthcare.com.
 *
 * Sub-sitemaps:
 * - /sitemap-pages.xml - Static pages (home, about, services, etc.)
 * - /sitemap-reports.xml - All published research reports
 * - /sitemap-blogs.xml - All published blog posts
 * - /sitemap-press-releases.xml - All published press releases
 * - /sitemap-consulting.xml - Consulting services pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${BASE_URL}/sitemap-pages.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sitemap-reports.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sitemap-blogs.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sitemap-press-releases.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sitemap-consulting.xml`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ];
}
