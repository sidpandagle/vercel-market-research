// Author API client functions

import { apiFetch, buildQueryString, type ApiResponse } from './config';
import type { Report, ApiReport, ReportFilters } from './reports.types';
import type { ApiAuthor } from './common.types';
import { mapApiReportsToReports } from './mappers';

/**
 * Author detail response from API
 */
interface AuthorDetailData {
  data?: ApiAuthor;
  [key: string]: unknown;
}

/**
 * Author reports list response from API
 */
interface AuthorReportsData {
  data?: ApiReport[];
  [key: string]: unknown;
}

/**
 * Fetch author details by ID
 *
 * @param id - Author ID
 * @returns Promise<ApiResponse<ApiAuthor>>
 *
 * @example
 * const response = await getAuthorById(105);
 * if (!isApiError(response)) {
 *   const author = response.data;
 * }
 */
export async function getAuthorById(id: number): Promise<ApiResponse<ApiAuthor>> {
  const response = await apiFetch<AuthorDetailData>(`/api/v1/authors/${id}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let author: ApiAuthor;

  if (response.data && typeof response.data === 'object') {
    // Check if data is nested or direct
    if ('data' in response.data && response.data.data) {
      author = response.data.data as ApiAuthor;
    } else {
      // Assume response.data is the author itself
      author = response.data as unknown as ApiAuthor;
    }
  } else {
    console.error('Unexpected response structure for getAuthorById:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  return {
    success: true,
    data: author,
  };
}

/**
 * Fetch reports by author ID with optional filters
 *
 * @param authorId - Author ID
 * @param filters - Optional filters (page, limit, status, etc.)
 * @returns Promise<ApiResponse<Report[]>>
 *
 * @example
 * const response = await getReportsByAuthorId(105, { status: 'published', limit: 100 });
 * if (!isApiError(response)) {
 *   const reports = response.data;
 * }
 */
export async function getReportsByAuthorId(
  authorId: number,
  filters?: ReportFilters
): Promise<ApiResponse<Report[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 1000,
    status: filters?.status || 'published',
    ...(filters?.category_id && { category_id: filters.category_id }),
    ...(filters?.report_type && { report_type: filters.report_type }),
    ...(filters?.geography && { geography: filters.geography }),
    ...(filters?.search && { search: filters.search }),
    ...(filters?.is_featured !== undefined && { is_featured: filters.is_featured }),
  };

  const queryString = buildQueryString(params);
  // console.log(`/api/v1/reports/author/${authorId}${queryString}`);
  const response = await apiFetch<AuthorReportsData>(`/api/v1/reports/author/${authorId}${queryString}`);
  // console.log('getReportsByAuthorId response:', response);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiReports: ApiReport[];

  // Check if data is directly the array or nested
  if (Array.isArray(response.data)) {
    // API returned array directly
    apiReports = response.data;
  } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
    // API returned { data: [...], meta: {...} }
    apiReports = (response.data as { data: ApiReport[] }).data;
  } else {
    console.error('Unexpected response structure for getReportsByAuthorId:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  // Map API reports to UI format
  const mappedReports = mapApiReportsToReports(apiReports);

  return {
    success: true,
    data: mappedReports,
  };
}
