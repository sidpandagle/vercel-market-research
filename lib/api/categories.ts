// Category API client functions

import { apiFetch, buildQueryString, type ApiResponse } from './config';
import type {
  CategoryFilters,
  CategoriesListData,
  ApiCategory,
} from './categories.types';
import type { ReportsListData, Report, ReportFilters } from './reports.types';
import { mapApiReportsToReports } from './mappers';

/**
 * Fetch all categories from the API
 *
 * @param filters - Optional filters (page, limit, parent_id)
 * @returns Promise<ApiResponse<ApiCategory[]>>
 *
 * @example
 * const response = await getCategories({ limit: 100 });
 * if (!isApiError(response)) {
 *   const categories = response.data;
 * }
 */
export async function getCategories(
  filters?: CategoryFilters
): Promise<ApiResponse<ApiCategory[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 100,
    ...(filters?.parent_id && { parent_id: filters.parent_id }),
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<CategoriesListData>(`/api/v1/categories${queryString}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  return {
    success: true,
    data: response.data.data,
    meta: response.data.meta,
  };
}

/**
 * Fetch reports by category slug
 *
 * @param slug - Category slug (e.g., 'healthcare')
 * @param filters - Optional filters (page, limit, status, etc.)
 * @returns Promise<ApiResponse<Report[]>>
 *
 * @example
 * const response = await getReportsByCategory('healthcare', { limit: 20 });
 * if (!isApiError(response)) {
 *   const reports = response.data;
 * }
 */
export async function getReportsByCategory(
  slug: string,
  filters?: ReportFilters
): Promise<ApiResponse<Report[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 100,
    ...(filters?.status && { status: filters.status }),
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<ReportsListData>(
    `/api/v1/categories/${slug}/reports${queryString}`
  );

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Map API reports to UI format
  const mappedReports = mapApiReportsToReports(response.data.data);

  return {
    success: true,
    data: mappedReports,
    meta: response.data.meta,
  };
}
