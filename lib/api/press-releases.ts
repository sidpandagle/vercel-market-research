// Press Release data functions — reads from static JSON

import pressReleasesData from '@/data/press-releases.json';
import type { PressRelease, PressReleaseFilters } from './press-releases.types';
import type { ApiResponse } from './config';

export async function getPressReleases(
  filters?: PressReleaseFilters
): Promise<ApiResponse<PressRelease[]>> {
  let pressReleases = pressReleasesData as unknown as PressRelease[];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    pressReleases = pressReleases.filter(
      pr => pr.title.toLowerCase().includes(q) || pr.excerpt.toLowerCase().includes(q)
    );
  }

  return { success: true, data: pressReleases };
}

export async function getPressReleaseBySlug(slug: string): Promise<ApiResponse<PressRelease>> {
  const pressRelease = (pressReleasesData as unknown as PressRelease[]).find(
    pr => pr.slug === slug
  );
  if (!pressRelease) {
    return { success: false, error: 'not_found', message: 'Press release not found' };
  }
  return { success: true, data: pressRelease };
}

export async function searchPressReleases(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<PressRelease[]>> {
  return getPressReleases({ search: query, page, limit });
}
