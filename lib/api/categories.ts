import { supabase } from '@/lib/supabase/client';
import type { ApiCategory, CategoryFilters } from './categories.types';
import type { Report, ReportFilters } from './reports.types';
import type { ApiResponse } from './config';

export async function getCategories(
  _filters?: CategoryFilters
): Promise<ApiResponse<ApiCategory[]>> {
  const { data, error } = await supabase
    .from('neograph_categories')
    .select('*')
    .order('id');

  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const categories: ApiCategory[] = (data ?? []).map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    created_at: '',
    updated_at: '',
  }));

  return { success: true, data: categories };
}

export async function getReportsByCategory(
  _slug: string,
  _filters?: ReportFilters
): Promise<ApiResponse<Report[]>> {
  return { success: true, data: [] };
}
