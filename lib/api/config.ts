// API response types and utilities

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}

/**
 * API Success Response with data
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

/**
 * Generic API Response wrapper
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Type guard to check if response is an error
 */
export function isApiError<T>(
  response: ApiResponse<T>
): response is ApiErrorResponse {
  return response.success === false;
}
