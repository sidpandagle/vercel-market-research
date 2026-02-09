export interface ApiLegalPage {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  lastUpdated: string;
  category: string;
  metadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export type LegalPage = ApiLegalPage;

export interface LegalPageFilters {
  page?: number;
  limit?: number;
  slug?: string;
}

