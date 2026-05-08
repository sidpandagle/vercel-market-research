import { supabase } from '@/lib/supabase/client';
import type { ApiAuthor } from './common.types';
import type { Report, ReportFilters } from './reports.types';
import type { ApiResponse } from './config';

export async function getAuthorById(id: number): Promise<ApiResponse<ApiAuthor>> {
  const { data, error } = await supabase
    .from('neograph_team_members')
    .select('*')
    .order('id');

  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const members = data ?? [];
  const index = id - 1;
  if (index < 0 || index >= members.length) {
    return { success: false, error: 'not_found', message: 'Author not found' };
  }

  const m = members[index];
  return {
    success: true,
    data: {
      id,
      name: m.name,
      role: m.role,
      bio: m.short_bio,
      imageUrl: m.image_url || undefined,
      createdAt: '',
      updatedAt: '',
    },
  };
}

export async function getReportsByAuthorId(
  _authorId: number,
  _filters?: ReportFilters
): Promise<ApiResponse<Report[]>> {
  return { success: true, data: [] };
}
