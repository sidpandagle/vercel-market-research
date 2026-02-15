'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Section, Container, Grid } from '@/components/ui';
import ReportCard from './ReportCard';
import FilterSidebar, { FilterState } from './FilterSidebar';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import categories from '@/data/categories.json';

interface Report {
  id: number;
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  date: string;
  price: string;
  region: string;
  year: string;
  reportType: string;
  pages: number;
}

interface ReportsListingClientProps {
  reports: Report[];
}

const ITEMS_PER_PAGE = 12;

export default function ReportsListingClient({ reports }: ReportsListingClientProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    industries: [],
    regions: [],
    reportTypes: [],
    priceRanges: [],
    searchQuery: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<Report[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Handle URL category and search parameters on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    setFilters(prev => {
      const newFilters = { ...prev };

      // Handle category parameter
      if (categoryParam) {
        // Find category by slug
        const category = categories.find(c => c.slug === categoryParam);
        if (category) {
          newFilters.industries = [category.name];
        }
      }

      // Handle search parameter
      if (searchParam) {
        newFilters.searchQuery = searchParam;
      }

      return newFilters;
    });
  }, [searchParams]);

  // Handle search results from SearchBar
  const handleSearchResults = useCallback((results: Report[] | null, loading: boolean) => {
    setSearchResults(results);
    setIsSearching(loading);
    setCurrentPage(1); // Reset to first page when search changes
  }, []);

  // Helper function to check if price is in range
  const isPriceInRange = (price: string, range: string): boolean => {
    const priceNum = parseInt(price.replace(/[^0-9]/g, ''));

    switch (range) {
      case 'Under $2,000':
        return priceNum < 2000;
      case '$2,000 - $3,000':
        return priceNum >= 2000 && priceNum <= 3000;
      case '$3,000 - $4,000':
        return priceNum >= 3000 && priceNum <= 4000;
      case '$4,000+':
        return priceNum >= 4000;
      default:
        return false;
    }
  };

  // Filter reports based on active filters
  // Use search results if available, otherwise use all reports
  const filteredReports = useMemo(() => {
    const dataSource = searchResults !== null ? searchResults : reports;
    return dataSource.filter((report) => {
      // Search query filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const titleMatch = report.title.toLowerCase().includes(searchLower);
        const descMatch = report.description.toLowerCase().includes(searchLower);
        if (!titleMatch && !descMatch) {
          return false;
        }
      }

      // Industry filter (maps to category)
      if (filters.industries.length > 0 && !filters.industries.includes(report.category)) {
        return false;
      }

      // Region filter
      if (filters.regions.length > 0 && !filters.regions.includes(report.region)) {
        return false;
      }

      // Report Type filter
      if (filters.reportTypes.length > 0 && !filters.reportTypes.includes(report.reportType)) {
        return false;
      }

      // Price Range filter
      if (filters.priceRanges.length > 0) {
        const matchesPriceRange = filters.priceRanges.some((range) =>
          isPriceInRange(report.price, range)
        );
        if (!matchesPriceRange) {
          return false;
        }
      }

      return true;
    });
  }, [reports, filters, searchResults]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);

  // Paginate filtered reports
  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredReports.slice(startIndex, endIndex);
  }, [filteredReports, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Handle page change with smooth scroll
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Scroll to top of results grid
    const resultsGrid = document.getElementById('reports-grid');
    if (resultsGrid) {
      resultsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Section padding="lg">
      <Container size="xl">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar - Sticky on Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                totalCount={filteredReports.length}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main>
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                onSearchResults={handleSearchResults}
                placeholder="Search reports by title, description, or keywords..."
              />
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">
                Research Reports
              </h1>
              <p className="text-lg text-[var(--muted-foreground)]">
                {isSearching ? 'Searching...' : `${filteredReports.length} ${filteredReports.length === 1 ? 'report' : 'reports'} available`}
              </p>
            </div>

            {/* Results Grid */}
            {paginatedReports.length > 0 ? (
              <>
                <Grid cols={1} gap="lg" id="reports-grid">
                  {paginatedReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </Grid>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-[var(--muted-foreground)] opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">
                  No reports found
                </h3>
                <p className="text-[var(--muted-foreground)] mb-6">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </main>
        </div>
      </Container>
    </Section>
  );
}
