// Blog data functions — reads from static JSON

import blogsData from '@/data/blogs.json';
import type { Blog, BlogFilters } from './blogs.types';
import type { ApiResponse } from './config';

export async function getBlogs(filters?: BlogFilters): Promise<ApiResponse<Blog[]>> {
  let blogs = blogsData as unknown as Blog[];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    blogs = blogs.filter(
      b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
    );
  }

  return { success: true, data: blogs };
}

export async function getBlogBySlug(slug: string): Promise<ApiResponse<Blog>> {
  const blog = (blogsData as unknown as Blog[]).find(b => b.slug === slug);
  if (!blog) {
    return { success: false, error: 'not_found', message: 'Blog not found' };
  }
  return { success: true, data: blog };
}

export async function searchBlogs(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<Blog[]>> {
  return getBlogs({ search: query, page, limit });
}
