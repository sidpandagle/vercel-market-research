// Data mappers to convert API responses to UI format

import type { ApiReport, Report } from './reports.types';
import type { ApiBlog, Blog } from './blogs.types';
import type { ApiPressRelease, PressRelease } from './press-releases.types';

/**
 * Parse HTML list to array of strings
 */
function parseHTMLList(html: string): string[] {
  if (!html) return [];

  // Extract content between <li> tags
  const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
  const matches = html.matchAll(liRegex);
  const items: string[] = [];

  for (const match of matches) {
    // Remove HTML tags from content
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (text) {
      items.push(text);
    }
  }

  return items;
}

/**
 * Parse key players from JSON string
 * Extracts company data from JSON array
 */
function parseKeyPlayers(jsonString?: string): Array<{ name: string; marketShare: string; headquarters: string }> {
  if (!jsonString) return [];

  try {
    const players = JSON.parse(jsonString);

    if (!Array.isArray(players)) {
      console.error('parseKeyPlayers: Expected array, got:', typeof players);
      return [];
    }

    return players.map((player: any) => ({
      name: player.name || 'Unknown Company',
      marketShare: player.marketShare || '0%',
      headquarters: player.headquarters || player.description || 'N/A',
    }));
  } catch (error) {
    console.error('Failed to parse key players JSON:', error);
    return [];
  }
}

/**
 * Parse table of contents JSON string and flatten nested structure
 */
function parseTableOfContents(tocString?: string): any[] {
  if (!tocString) return [];

  try {
    const toc = JSON.parse(tocString);
    if (!toc.chapters || !Array.isArray(toc.chapters)) {
      return [];
    }

    // Flatten the nested structure into a flat array with proper numbering
    const flatTOC: any[] = [];

    toc.chapters.forEach((chapter: any, chapterIndex: number) => {
      const chapterNumber = (chapterIndex + 1).toString();

      // Add chapter
      flatTOC.push({
        id: chapter.id || `ch${chapterNumber}`,
        title: chapter.title,
        number: chapterNumber,
      });

      // Add sections if they exist
      if (chapter.sections && Array.isArray(chapter.sections)) {
        chapter.sections.forEach((section: any, sectionIndex: number) => {
          const sectionNumber = `${chapterNumber}.${sectionIndex + 1}`;

          flatTOC.push({
            id: section.id || `sec${sectionNumber}`,
            title: section.title,
            number: sectionNumber,
          });

          // Add subsections if they exist
          if (section.subsections && Array.isArray(section.subsections)) {
            section.subsections.forEach((subsection: any, subsectionIndex: number) => {
              const subsectionNumber = `${sectionNumber}.${subsectionIndex + 1}`;

              flatTOC.push({
                id: subsection.id || `subsec${subsectionNumber}`,
                title: subsection.title,
                number: subsectionNumber,
              });
            });
          }
        });
      }
    });

    return flatTOC;
  } catch (error) {
    console.error('Failed to parse table of contents:', error);
    return [];
  }
}

/**
 * Format price from number to currency string
 */
function formatPrice(price: number, currency: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price);
}

/**
 * Format revenue with billions/millions suffix
 * Handles both plain numbers and already-formatted strings from API
 */
function formatRevenue(revenue: string, currency: string = 'USD'): string {
  if (!revenue) return '';

  // If revenue already contains "Billion" or "Million" or currency symbols, return as-is
  if (revenue.includes('Billion') || revenue.includes('Million') || revenue.includes('USD') || revenue.includes('$')) {
    return revenue;
  }

  // Otherwise, parse and format the number
  const num = parseFloat(revenue);
  if (isNaN(num)) return revenue;

  if (num >= 1000) {
    return `$${num} billion`;
  } else {
    return `$${num} million`;
  }
}

/**
 * Extract year from date string
 */
function extractYear(dateString?: string | null): string {
  if (!dateString) {
    return new Date().getFullYear().toString();
  }

  try {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  } catch (error) {
    return new Date().getFullYear().toString();
  }
}

/**
 * Maps API report response to UI Report interface
 *
 * This function handles field name transformations and provides defaults
 * for fields that may not exist in the API response.
 *
 * @param apiReport - Report data from API
 * @returns Report formatted for UI components
 */
export function mapApiReportToReport(apiReport: ApiReport): Report {
  // Map geography array to region string (use first geography or default)
  const region = apiReport.geography && apiReport.geography.length > 0
    ? apiReport.geography[0]
    : 'Global';

  // Extract year from publish_date or created_at
  const year = extractYear(apiReport.publish_date || apiReport.created_at);

  // Map report_type to reportType (convert to readable format)
  const reportTypeMap: Record<string, string> = {
    'market-research': 'Market Research',
    'industry-analysis': 'Industry Analysis',
    'competitive-intelligence': 'Competitive Intelligence',
    'custom': 'Custom Report'
  };
  const reportType = apiReport.report_type
    ? reportTypeMap[apiReport.report_type] || apiReport.report_type
    : 'Market Research';

  // Format price
  const price = formatPrice(apiReport.price, apiReport.currency);

  // Parse key findings from JSON string
  let keyFindings: string[] | undefined;
  if (apiReport.sections?.keyFindings) {
    try {
      const parsed = JSON.parse(apiReport.sections.keyFindings);
      keyFindings = Array.isArray(parsed) ? parsed : undefined;
    } catch (error) {
      // If JSON parsing fails, try HTML parsing as fallback
      console.warn('Failed to parse keyFindings as JSON, trying HTML parsing:', error);
      keyFindings = parseHTMLList(apiReport.sections.keyFindings);
    }
  }

  // Parse table of contents
  const fullReportTOC = parseTableOfContents(apiReport.sections?.tableOfContents);

  // Parse key players from JSON string
  const keyPlayers = apiReport.sections?.keyPlayers
    ? parseKeyPlayers(apiReport.sections.keyPlayers)
    : undefined;

  // Extract market metrics
  const metrics = apiReport.market_metrics;
  const baseYear = metrics?.currentYear?.toString() || year;
  const forecastYear = metrics?.forecastYear?.toString() || '2031';
  const forecastPeriod = metrics?.cagrStartYear && metrics?.cagrEndYear
    ? `${metrics.cagrStartYear}-${metrics.cagrEndYear}`
    : `${baseYear}-${forecastYear}`;

  // Format market size values
  const marketSize2024 = metrics?.currentRevenue
    ? formatRevenue(metrics.currentRevenue, apiReport.currency)
    : undefined;

  const marketSize2032 = metrics?.forecastRevenue
    ? formatRevenue(metrics.forecastRevenue, apiReport.currency)
    : undefined;

  // Format CAGR (check if % is already included)
  const cagr = metrics?.cagr
    ? (metrics.cagr.includes('%') ? metrics.cagr : `${metrics.cagr}%`)
    : undefined;

  // Build the report object
  const report: Report = {
    id: apiReport.id,
    slug: apiReport.slug,
    title: apiReport.title,
    description: apiReport.description,
    category: apiReport.category_name || 'Uncategorized',
    date: apiReport.publish_date || apiReport.created_at,
    price,
    region,
    year,
    reportType,
    pages: apiReport.page_count || 150,

    // Extended fields for detail page
    reportCode: `HC-${apiReport.id}`,
    baseYear,
    forecastPeriod,
    marketSize2024,
    marketSize2032,
    cagr,
    marketDetails: apiReport.sections?.marketDetails,
    keyFindings,
    keyPlayers,
    faqs: apiReport.faqs,
    fullReportTOC,

    // Additional metadata
    // Note: teamMemberIds and relatedReportIds would need to come from the API
    // if they're available in a different endpoint or field
  };

  return report;
}

/**
 * Maps array of API reports to UI Report array
 *
 * @param apiReports - Array of reports from API
 * @returns Array of reports formatted for UI
 */
export function mapApiReportsToReports(apiReports: ApiReport[]): Report[] {
  // Safety check
  if (!apiReports || !Array.isArray(apiReports)) {
    console.error('mapApiReportsToReports received invalid input:', apiReports);
    return [];
  }

  return apiReports.map(mapApiReportToReport);
}

/**
 * Calculate estimated read time based on content length
 * Average reading speed: 200 words per minute
 */
function calculateReadTime(content: string): string {
  if (!content) return '5 min read';

  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);

  return `${minutes} min read`;
}

/**
 * Format date to readable string
 */
function formatDate(dateString?: string | null): string {
  if (!dateString) {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Parse tags string to array
 */
function parseTags(tagsString?: string): string[] {
  if (!tagsString) return [];

  // Handle comma-separated tags
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
}

/**
 * Maps API blog response to UI Blog interface
 *
 * @param apiBlog - Blog data from API
 * @returns Blog formatted for UI components
 */
export function mapApiBlogToBlog(apiBlog: ApiBlog): Blog {
  // Get author name from metadata or default
  const author = apiBlog.metadata?.author || 'Healthcare Foresights';

  // Format date
  const date = formatDate(apiBlog.publishDate || apiBlog.createdAt);

  // Calculate read time
  const readTime = calculateReadTime(apiBlog.content);

  // Get category (would need to be fetched from categories API or passed in)
  // For now, using a default
  const category = 'Healthcare Insights';

  // Parse tags
  const tags = parseTags(apiBlog.tags);

  return {
    id: apiBlog.id,
    slug: apiBlog.slug,
    title: apiBlog.title,
    excerpt: apiBlog.excerpt,
    category,
    author,
    date,
    readTime,
    content: apiBlog.content,
    tags,
    location: apiBlog.location,
  };
}

/**
 * Maps array of API blogs to UI Blog array
 *
 * @param apiBlogs - Array of blogs from API
 * @returns Array of blogs formatted for UI
 */
export function mapApiBlogsToblogs(apiBlogs: ApiBlog[]): Blog[] {
  // Safety check
  if (!apiBlogs || !Array.isArray(apiBlogs)) {
    console.error('mapApiBlogsToblogs received invalid input:', apiBlogs);
    return [];
  }

  return apiBlogs.map(mapApiBlogToBlog);
}

/**
 * Maps API press release response to UI PressRelease interface
 *
 * @param apiPressRelease - Press release data from API
 * @returns PressRelease formatted for UI components
 */
export function mapApiPressReleaseToPressRelease(apiPressRelease: ApiPressRelease): PressRelease {
  // Get author name from metadata or default
  const author = apiPressRelease.metadata?.author || 'Media Relations';

  // Format date
  const date = formatDate(apiPressRelease.publishDate || apiPressRelease.createdAt);

  // Calculate read time
  const readTime = calculateReadTime(apiPressRelease.content);

  // Get category (would need to be fetched from categories API or passed in)
  // For now, using a default
  const category = 'Press Release';

  // Parse tags
  const tags = parseTags(apiPressRelease.tags);

  return {
    id: apiPressRelease.id,
    slug: apiPressRelease.slug,
    title: apiPressRelease.title,
    excerpt: apiPressRelease.excerpt,
    category,
    author,
    date,
    readTime,
    content: apiPressRelease.content,
    tags,
    location: apiPressRelease.location,
  };
}

/**
 * Maps array of API press releases to UI PressRelease array
 *
 * @param apiPressReleases - Array of press releases from API
 * @returns Array of press releases formatted for UI
 */
export function mapApiPressReleasesToPressReleases(apiPressReleases: ApiPressRelease[]): PressRelease[] {
  // Safety check
  if (!apiPressReleases || !Array.isArray(apiPressReleases)) {
    console.error('mapApiPressReleasesToPressReleases received invalid input:', apiPressReleases);
    return [];
  }

  return apiPressReleases.map(mapApiPressReleaseToPressRelease);
}
