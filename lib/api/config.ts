// API configuration and shared utilities

/**
 * Base API URL from environment variables
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * Pagination metadata returned by the API
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

/**
 * Generic fetch wrapper with error handling
 *
 * @param endpoint - API endpoint path (e.g., '/api/v1/reports')
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Promise<ApiResponse<T>>
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'api_error',
        message: result.message || `API request failed with status ${response.status}`,
        statusCode: response.status,
      };
    }

    // If the API returns a success field, use it; otherwise wrap the data
    if ('success' in result && result.success === true) {
      return result;
    }

    // Wrap the response data in our standard format
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('API fetch error:', error);
    return {
      success: false,
      error: 'network_error',
      message: error instanceof Error ? error.message : 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Build query string from params object
 *
 * @param params - Object with query parameters
 * @returns Query string (e.g., '?page=1&limit=10')
 */
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
