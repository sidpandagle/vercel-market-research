// Report types for API integration

/**
 * Report status from API
 */
export type ReportStatus = 'draft' | 'published' | 'archived';

/**
 * Report type from API
 */
export type ReportType = 'market-research' | 'industry-analysis' | 'competitive-intelligence' | 'custom';

/**
 * FAQ item from API
 */
export interface ApiFaq {
  question: string;
  answer: string;
}

/**
 * Market metrics from API
 */
export interface ApiMarketMetrics {
  currentRevenue?: string;
  currentYear?: number;
  forecastRevenue?: string;
  forecastYear?: number;
  cagr?: string;
  cagrStartYear?: number;
  cagrEndYear?: number;
}

/**
 * Report sections from API (HTML content)
 */
export interface ApiReportSections {
  executiveSummary?: string;
  marketOverview?: string;
  marketSize?: string;
  competitive?: string;
  keyPlayers?: string;
  regional?: string;
  trends?: string;
  conclusion?: string;
  marketDetails?: string;
  keyFindings?: string;
  tableOfContents?: string;
  [key: string]: any;
}

/**
 * Report entity from API (matches actual API response)
 */
export interface ApiReport {
  id: number;
  slug: string;
  title: string;
  description: string;
  summary?: string;
  thumbnail_url?: string;
  price: number;
  discounted_price?: number;
  currency?: string;
  page_count: number;
  formats?: string[];
  geography?: string[];
  status: ReportStatus;
  is_featured?: boolean;
  publish_date?: string | null;
  view_count?: number;
  download_count?: number;
  category_id?: number;
  category_name?: string;
  report_type?: ReportType;
  market_metrics?: ApiMarketMetrics;
  sections?: ApiReportSections;
  faqs?: ApiFaq[];
  created_by?: number;
  updated_by?: number;
  created_at: string;
  updated_at: string;
}

/**
 * UI Report interface (used by components)
 */
export interface Report {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  price: string;
  region: string;
  year: string;
  reportType: string;
  pages: number;

  // Extended fields for detail page
  reportCode?: string;
  baseYear?: string;
  forecastPeriod?: string;
  marketSize2024?: string;
  marketSize2032?: string;
  cagr?: string;
  overview?: string;
  keyFindings?: string[];
  segmentation?: {
    byType?: Array<{ name: string; share: string; description?: string }>;
    byApplication?: Array<{ name: string; share: string }>;
    byEndUser?: Array<{ name: string; share: string }>;
    byRegion?: Array<{ name: string; share: string; cagr?: string }>;
  };
  keyPlayers?: Array<{ name: string; marketShare: string; headquarters: string }>;
  tableOfContents?: Array<{ id: string; title: string; level: number }>;
  fullReportTOC?: Array<{
    id: string;
    title: string;
    number?: string;
    children?: Array<{ id: string; title: string; number?: string }>
  }>;
  teamMemberIds?: string[];
  relatedReportIds?: number[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Report filters for API queries
 */
export interface ReportFilters {
  page?: number;
  limit?: number;
  status?: ReportStatus;
  category_id?: number;
  report_type?: ReportType;
  geography?: string;
  search?: string;
  is_featured?: boolean;
}

/**
 * Paginated list of reports from API
 */
export interface ReportsListData {
  data: ApiReport[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Single report detail response from API
 */
export interface ReportDetailData {
  data: ApiReport;
}

/**
 * Search results from API
 */
export interface SearchResultsData {
  data: ApiReport[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    query?: string;
  };
}
