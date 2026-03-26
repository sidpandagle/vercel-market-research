// Report data functions — reads from static JSON via lib/jsonReports

import { getAllJsonReports, getJsonReportBySlug, jsonReportToUIReport } from '@/lib/jsonReports';
import type { Report, ReportFilters } from './reports.types';
import type { ApiResponse } from './config';

export async function getReports(filters?: ReportFilters): Promise<ApiResponse<Report[]>> {
  let reports = getAllJsonReports().map((r, i) => jsonReportToUIReport(r, i)) as Report[];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    reports = reports.filter(
      r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    );
  }

  return { success: true, data: reports };
}

export async function getReportBySlug(slug: string): Promise<ApiResponse<Report>> {
  const jsonReport = getJsonReportBySlug(slug);
  if (!jsonReport) {
    return { success: false, error: 'not_found', message: 'Report not found' };
  }
  const all = getAllJsonReports();
  const index = all.findIndex(r => r.slug === slug);
  const report = jsonReportToUIReport(jsonReport, index >= 0 ? index : 0) as Report;
  return { success: true, data: report };
}

export async function searchReports(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<Report[]>> {
  return getReports({ search: query, page, limit });
}
