import { supabase } from '@/lib/supabase/client';
import type { Report, ReportFilters } from './reports.types';
import type { ApiResponse } from './config';

function rowToReport(row: Record<string, unknown>, index: number): Report {
  const ms = (row.market_size ?? {}) as Record<string, number>;
  const mo = (row.market_overview ?? {}) as Record<string, unknown>;
  const cl = (row.competitive_landscape ?? []) as Array<Record<string, string>>;

  return {
    id: index + 1,
    slug: row.slug as string,
    title: row.title as string,
    description: (row.meta_description as string) || (mo.summary as string) || '',
    summary: (mo.summary as string) || '',
    category: row.industry as string,
    date: String(row.published_year),
    price: '$2,995',
    discounted_price: '$2,495',
    region: 'Global',
    year: String(row.published_year),
    reportType: 'Market Analysis',
    pages: 150,
    reportCode: row.report_id as string,
    baseYear: String(row.base_year),
    forecastPeriod: row.forecast_period as string,
    marketSize2024: `$${(ms.current_value ?? 0).toFixed(1)}B`,
    marketSize2032: `$${(ms.forecast_value ?? 0).toFixed(1)}B`,
    cagr: `${ms.cagr ?? 0}%`,
    overview: (mo.summary as string) || '',
    keyFindings: (mo.key_trends as string[]) || [],
    meta_title: row.meta_title as string,
    meta_description: row.meta_description as string,
    meta_keywords: Array.isArray(row.meta_keywords)
      ? (row.meta_keywords as string[]).join(', ')
      : '',
    keyPlayers: cl.map(c => ({
      name: c.company,
      marketShare: 'N/A',
      headquarters: c.headquarters ?? '',
    })),
    faqs: (row.faqs as Array<{ question: string; answer: string }>) || [],
    authors: [],
    marketDetails: undefined,
    fullReportTOC: undefined,
  };
}

export async function getReports(filters?: ReportFilters): Promise<ApiResponse<Report[]>> {
  let query = supabase
    .from('neograph_reports')
    .select('*')
    .order('published_year', { ascending: false });

  if (filters?.search) {
    const q = filters.search;
    query = query.or(`title.ilike.%${q}%,meta_description.ilike.%${q}%,industry.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const reports = (data ?? []).map((row, i) =>
    rowToReport(row as Record<string, unknown>, i)
  );

  return { success: true, data: reports };
}

export async function getReportBySlug(slug: string): Promise<ApiResponse<Report>> {
  const { data: allData } = await supabase
    .from('neograph_reports')
    .select('slug')
    .order('published_year', { ascending: false });

  const slugIndex = (allData ?? []).findIndex(r => r.slug === slug);

  const { data, error } = await supabase
    .from('neograph_reports')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { success: false, error: 'not_found', message: 'Report not found' };
  }

  return { success: true, data: rowToReport(data as Record<string, unknown>, slugIndex >= 0 ? slugIndex : 0) };
}

export async function searchReports(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<Report[]>> {
  return getReports({ search: query, page, limit });
}
