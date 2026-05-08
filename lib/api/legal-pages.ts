import { supabase } from '@/lib/supabase/client';
import type { ApiResponse } from './config';
import type { LegalPageFilters, LegalPage } from './legal-pages.types';

export async function getLegalPages(
  filters?: LegalPageFilters
): Promise<ApiResponse<LegalPage[]>> {
  const { data, error } = await supabase
    .from('neograph_legal_pages')
    .select('*')
    .order('id');

  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const pages: LegalPage[] = (data ?? []).map(row => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    lastUpdated: row.last_updated,
    category: row.category,
    metadata: row.metadata,
  }));

  const page = filters?.page ?? 1;
  const limit = filters?.limit ?? 100;
  const start = (page - 1) * limit;

  return { success: true, data: pages.slice(start, start + limit) };
}

export async function getLegalPageBySlug(slug: string): Promise<ApiResponse<LegalPage>> {
  const { data, error } = await supabase
    .from('neograph_legal_pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { success: false, error: 'not_found', message: `Legal page "${slug}" not found` };
  }

  return {
    success: true,
    data: {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      lastUpdated: data.last_updated,
      category: data.category,
      metadata: data.metadata,
    },
  };
}
