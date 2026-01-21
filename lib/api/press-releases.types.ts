// Press Release types for API integration

/**
 * Press Release status from API
 */
export type PressReleaseStatus = 'draft' | 'review' | 'published';

/**
 * Press Release metadata from API
 */
export interface ApiPressReleaseMetadata {
  keywords?: string[];
  description?: string;
  author?: string;
  [key: string]: string | string[] | undefined;
}

/**
 * Press Release entity from API (matches actual API response)
 */
export interface ApiPressRelease {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId?: number;
  authorId?: number;
  tags?: string;
  status: PressReleaseStatus;
  publishDate?: string | null;
  location?: string;
  metadata?: ApiPressReleaseMetadata;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string | null;
  reviewedBy?: number | null;
}

/**
 * UI Press Release interface (used by components)
 */
export interface PressRelease {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;

  // Extended fields for detail page
  tags?: string[];
  location?: string;
}

/**
 * Press Release filters for API queries
 */
export interface PressReleaseFilters {
  page?: number;
  limit?: number;
  status?: PressReleaseStatus;
  categoryId?: number;
  authorId?: number;
  search?: string;
}

/**
 * Paginated list of press releases from API
 */
export interface PressReleasesListData {
  pressReleases: ApiPressRelease[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Single press release detail response from API
 */
export interface PressReleaseDetailData {
  pressRelease: ApiPressRelease;
}
