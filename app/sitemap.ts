import { MetadataRoute } from 'next';
import { getAllJsonReports } from '@/lib/jsonReports';
import { getBlogs } from '@/lib/api/blogs';
import { getPressReleases } from '@/lib/api/press-releases';

const BASE_URL = 'https://www.synapticresearch.com';
const ITEMS_PER_SITEMAP = 500;

/**
 * Sitemap Index
 *
 * This is the main sitemap that references all sub-sitemaps.
 *
 * Sub-sitemaps:
 * - /sitemap-pages.xml - Static pages (home, about, services, etc.)
 * - /sitemap-reports-1.xml, /sitemap-reports-2.xml, ... - Published research reports (500 per file)
 * - /sitemap-blogs-1.xml, /sitemap-blogs-2.xml, ... - Published blog posts (500 per file)
 * - /sitemap-press-releases-1.xml, /sitemap-press-releases-2.xml, ... - Published press releases (500 per file)
 * - /sitemap-consulting.xml - Consulting services pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Get reports count from local JSON; fetch blogs/press-releases from API
  const [blogsRes, prRes] = await Promise.all([
    getBlogs({ status: 'published', page: 1, limit: ITEMS_PER_SITEMAP }),
    getPressReleases({ status: 'published', page: 1, limit: ITEMS_PER_SITEMAP }),
  ]);

  const reportsTotalPages = Math.max(
    1,
    Math.ceil(getAllJsonReports().length / ITEMS_PER_SITEMAP)
  );
  const blogsTotalPages =
    blogsRes.success && blogsRes.meta?.totalPages ? blogsRes.meta.totalPages : 1;
  const prTotalPages =
    prRes.success && prRes.meta?.totalPages ? prRes.meta.totalPages : 1;

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/sitemap-pages.xml`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sitemap-consulting.xml`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ];

  // Reports paginated sitemaps: sitemap-reports-1.xml, sitemap-reports-2.xml, ...
  for (let i = 1; i <= reportsTotalPages; i++) {
    entries.push({
      url: `${BASE_URL}/sitemap-reports-${i}.xml`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    });
  }

  // Blogs paginated sitemaps: sitemap-blogs-1.xml, sitemap-blogs-2.xml, ...
  for (let i = 1; i <= blogsTotalPages; i++) {
    entries.push({
      url: `${BASE_URL}/sitemap-blogs-${i}.xml`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    });
  }

  // Press releases paginated sitemaps: sitemap-press-releases-1.xml, sitemap-press-releases-2.xml, ...
  for (let i = 1; i <= prTotalPages; i++) {
    entries.push({
      url: `${BASE_URL}/sitemap-press-releases-${i}.xml`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    });
  }

  return entries;
}
