// Category data functions — reads from static JSON

import categoriesData from '@/data/categories.json';
import type { ApiCategory, CategoryFilters } from './categories.types';
import type { Report, ReportFilters } from './reports.types';
import type { ApiResponse } from './config';

interface StaticCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

function toApiCategory(cat: StaticCategory): ApiCategory {
  return {
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    created_at: '',
    updated_at: '',
  };
}

export async function getCategories(
  _filters?: CategoryFilters
): Promise<ApiResponse<ApiCategory[]>> {
  const categories = (categoriesData as StaticCategory[]).map(toApiCategory);
  return { success: true, data: categories };
}

export async function getReportsByCategory(
  _slug: string,
  _filters?: ReportFilters
): Promise<ApiResponse<Report[]>> {
  return { success: true, data: [] };
}
