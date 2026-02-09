import type { ApiResponse } from './config';
import type { LegalPageFilters, LegalPage, ApiLegalPage } from './legal-pages.types';
import legalPagesData from '@/data/legal-pages.json';

// Cast imported data to correct type
const allLegalPages = legalPagesData as ApiLegalPage[];

export async function getLegalPages(
  filters?: LegalPageFilters
): Promise<ApiResponse<LegalPage[]>> {
  try {
    // Apply pagination if needed
    const page = filters?.page || 1;
    const limit = filters?.limit || 100;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedPages = allLegalPages.slice(start, end);

    return {
      success: true,
      data: paginatedPages
    };
  } catch (error) {
    return {
      success: false,
      error: 'load_error',
      message: 'Failed to load legal pages',
    };
  }
}

export async function getLegalPageBySlug(slug: string): Promise<ApiResponse<LegalPage>> {
  try {
    const page = allLegalPages.find(p => p.slug === slug);

    if (!page) {
      return {
        success: false,
        error: 'not_found',
        message: `Legal page with slug "${slug}" not found`,
      };
    }

    return {
      success: true,
      data: page
    };
  } catch (error) {
    return {
      success: false,
      error: 'load_error',
      message: 'Failed to load legal page',
    };
  }
}
