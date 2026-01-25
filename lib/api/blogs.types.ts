// Blog types for API integration

/**
 * Blog status from API
 */
export type BlogStatus = 'draft' | 'review' | 'published';

/**
 * Blog metadata from API
 */
export interface ApiBlogMetadata {
  keywords?: string[];
  description?: string;
  author?: string;
  [key: string]: string | string[] | undefined;
}

/**
 * Author entity from API
 */
export interface ApiAuthor {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Category entity from API
 */
export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Blog entity from API (matches actual API response)
 */
export interface ApiBlog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId?: number;
  authorId?: number;
  author?: ApiAuthor;
  category?: ApiCategory;
  tags?: string;
  status: BlogStatus;
  publishDate?: string | null;
  location?: string;
  metadata?: ApiBlogMetadata;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string | null;
  reviewedBy?: number | null;
}

/**
 * UI Blog interface (used by components)
 */
export interface Blog {
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
 * Blog filters for API queries
 */
export interface BlogFilters {
  page?: number;
  limit?: number;
  status?: BlogStatus;
  categoryId?: number;
  authorId?: number;
  search?: string;
}

/**
 * Paginated list of blogs from API
 */
export interface BlogsListData {
  blogs: ApiBlog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Single blog detail response from API
 */
export interface BlogDetailData {
  blog: ApiBlog;
}
