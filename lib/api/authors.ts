// Author data functions — reads from static JSON (team-members.json)

import teamMembersData from '@/data/team-members.json';
import type { ApiAuthor } from './common.types';
import type { Report, ReportFilters } from './reports.types';
import type { ApiResponse } from './config';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  shortBio: string;
  fullBio: string;
  expertise: string[];
  credentials: string[];
}

function toApiAuthor(member: TeamMember, numericId: number): ApiAuthor {
  return {
    id: numericId,
    name: member.name,
    role: member.role,
    bio: member.shortBio,
    imageUrl: member.imageUrl || undefined,
    createdAt: '',
    updatedAt: '',
  };
}

export async function getAuthorById(id: number): Promise<ApiResponse<ApiAuthor>> {
  const members = teamMembersData as TeamMember[];
  const index = id - 1;
  if (index < 0 || index >= members.length) {
    return { success: false, error: 'not_found', message: 'Author not found' };
  }
  return { success: true, data: toApiAuthor(members[index], id) };
}

export async function getReportsByAuthorId(
  _authorId: number,
  _filters?: ReportFilters
): Promise<ApiResponse<Report[]>> {
  return { success: true, data: [] };
}
