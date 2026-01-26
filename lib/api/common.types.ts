// Common types shared across API modules

/**
 * Author entity from API
 */
export interface ApiAuthor {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
}
