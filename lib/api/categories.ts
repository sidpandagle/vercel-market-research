// Category API client functions

import { apiFetch, buildQueryString, type ApiResponse } from './config';
import type {
  CategoryFilters,
  CategoriesListData,
  ApiCategory,
} from './categories.types';
import type { ReportsListData, Report, ReportFilters } from './reports.types';
import type { BlogsListData, Blog, BlogFilters } from './blogs.types';
import type { PressReleasesListData, PressRelease, PressReleaseFilters } from './press-releases.types';
import { mapApiReportsToReports, mapApiBlogsToblogs, mapApiPressReleasesToPressReleases } from './mappers';

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

/**
 * Fetch blogs by category slug
 *
 * @param slug - Category slug (e.g., 'healthcare-it')
 * @param filters - Optional filters (page, limit, status, etc.)
 * @returns Promise<ApiResponse<Blog[]>>
 */
export async function getBlogsByCategory(
  slug: string,
  filters?: BlogFilters
): Promise<ApiResponse<Blog[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 100,
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<BlogsListData>(
    `/api/v1/categories/${slug}/blogs${queryString}`
  );

  if (!response.success) {
    return response;
  }

  const rawData = response.data as unknown as { blogs?: BlogsListData['blogs']; total?: number; page?: number; limit?: number; totalPages?: number };
  const apiBlogs = rawData.blogs ?? [];
  const mappedBlogs = mapApiBlogsToblogs(apiBlogs);

  const mappedMeta = rawData.total !== undefined
    ? {
        currentPage: rawData.page ?? 1,
        totalPages: rawData.totalPages ?? 1,
        totalItems: Number(rawData.total ?? 0),
        itemsPerPage: rawData.limit ?? 10,
        hasNextPage: (rawData.page ?? 1) < (rawData.totalPages ?? 1),
        hasPreviousPage: (rawData.page ?? 1) > 1,
      }
    : undefined;

  return {
    success: true,
    data: mappedBlogs,
    meta: mappedMeta,
  };
}

/**
 * Fetch press releases by category slug
 *
 * @param slug - Category slug (e.g., 'healthcare-it')
 * @param filters - Optional filters (page, limit, etc.)
 * @returns Promise<ApiResponse<PressRelease[]>>
 */
export async function getPressReleasesByCategory(
  slug: string,
  filters?: PressReleaseFilters
): Promise<ApiResponse<PressRelease[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 100,
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<PressReleasesListData>(
    `/api/v1/categories/${slug}/press-releases${queryString}`
  );

  if (!response.success) {
    return response;
  }

  const rawPRData = response.data as unknown as { pressReleases?: PressReleasesListData['pressReleases']; total?: number; page?: number; limit?: number; totalPages?: number };
  const apiPressReleases = rawPRData.pressReleases ?? [];
  const mappedPressReleases = mapApiPressReleasesToPressReleases(apiPressReleases);

  const mappedPRMeta = rawPRData.total !== undefined
    ? {
        currentPage: rawPRData.page ?? 1,
        totalPages: rawPRData.totalPages ?? 1,
        totalItems: Number(rawPRData.total ?? 0),
        itemsPerPage: rawPRData.limit ?? 10,
        hasNextPage: (rawPRData.page ?? 1) < (rawPRData.totalPages ?? 1),
        hasPreviousPage: (rawPRData.page ?? 1) > 1,
      }
    : undefined;

  return {
    success: true,
    data: mappedPressReleases,
    meta: mappedPRMeta,
  };
}
