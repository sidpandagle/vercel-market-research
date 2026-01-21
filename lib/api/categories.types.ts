// Category types for API integration

/**
 * Category entity from API
 */
export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  created_at: string;
  updated_at: string;
  report_count?: number;
}

/**
 * Category filters for API queries
 */
export interface CategoryFilters {
  page?: number;
  limit?: number;
  parent_id?: number;
}

/**
 * Paginated list of categories from API
 */
export interface CategoriesListData {
  data: ApiCategory[];
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
 * Single category detail response from API
 */
export interface CategoryDetailData {
  data: ApiCategory;
}
