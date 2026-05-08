import { supabase } from '@/lib/supabase/client';
import type { PressRelease, PressReleaseFilters } from './press-releases.types';
import type { ApiResponse } from './config';

export async function getPressReleases(
  filters?: PressReleaseFilters
): Promise<ApiResponse<PressRelease[]>> {
  let query = supabase
    .from('neograph_press_releases')
    .select('*')
    .order('id', { ascending: false });

  if (filters?.search) {
    const q = filters.search;
    query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const pressReleases: PressRelease[] = (data ?? []).map(row => ({
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

  return { success: true, data: pressReleases };
}

export async function getPressReleaseBySlug(slug: string): Promise<ApiResponse<PressRelease>> {
  const { data, error } = await supabase
    .from('neograph_press_releases')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { success: false, error: 'not_found', message: 'Press release not found' };
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

export async function searchPressReleases(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<PressRelease[]>> {
  return getPressReleases({ search: query, page, limit });
}
