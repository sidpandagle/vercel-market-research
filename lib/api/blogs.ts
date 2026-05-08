import { supabase } from '@/lib/supabase/client';
import type { Blog, BlogFilters } from './blogs.types';
import type { ApiResponse } from './config';

export async function getBlogs(filters?: BlogFilters): Promise<ApiResponse<Blog[]>> {
  let query = supabase
    .from('neograph_blogs')
    .select('*')
    .order('id');

  if (filters?.search) {
    const q = filters.search;
    query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const blogs: Blog[] = (data ?? []).map(row => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    content: row.content,
    location: row.location,
  }));

  return { success: true, data: blogs };
}

export async function getBlogBySlug(slug: string): Promise<ApiResponse<Blog>> {
  const { data, error } = await supabase
    .from('neograph_blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { success: false, error: 'not_found', message: 'Blog not found' };
  }

  return {
    success: true,
    data: {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      author: data.author,
      date: data.date,
      readTime: data.read_time,
      content: data.content,
      location: data.location,
    },
  };
}

export async function searchBlogs(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<Blog[]>> {
  return getBlogs({ search: query, page, limit });
}
