'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ReportCard from './ReportCard';
import FilterSidebar, { type FilterState } from './FilterSidebar';
import Pagination from './Pagination';
import categories from '@/data/categories.json';
import { getReports, isApiError } from '@/lib/api';
import type { ReportType } from '@/lib/api/reports.types';

const ITEMS_PER_PAGE = 10;

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
  activeCategorySlug?: string;
  totalItems: number;
  totalPages: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  'Biotechnology': '🧬',
  'Clinical Diagnostics': '🔬',
  'Healthcare Services': '🏥',
  'Laboratory Equipment': '⚗️',
  'Healthcare IT': '💻',
  'Medical Devices': '🩺',
  'Medical Imaging': '🩻',
  'Therapeutic Area': '💊',
  'Life Sciences': '🧪',
  'Dental': '🦷',
  'Pharmaceuticals': '🏭',
  'Animal Health': '🐾',
};

export default function ReportsListingClient({
  reports: initialReports,
  activeCategorySlug,
  totalItems: initialTotalItems,
  totalPages: initialTotalPages,
}: ReportsListingClientProps) {
  const storageKey = activeCategorySlug ? `industry_${activeCategorySlug}_page` : 'industry_page';

  const [reports, setReports] = useState<Report[]>(initialReports);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    industries: [],
    regions: [],
    reportTypes: [],
    priceRanges: [],
  });

  // Restore page from sessionStorage and fetch that page on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    const savedPage = saved ? Math.max(1, parseInt(saved, 10) || 1) : 1;
    if (savedPage !== 1) {
      setCurrentPage(savedPage);
      fetchPage(savedPage, filters);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  async function fetchPage(page: number, currentFilters: FilterState) {
    setIsLoading(true);
    const response = await getReports({
      status: 'published',
      page,
      limit: ITEMS_PER_PAGE,
      ...(activeCategorySlug && { category: activeCategorySlug }),
      ...(currentFilters.regions.length > 0 && { geography: currentFilters.regions[0] }),
      ...(currentFilters.reportTypes.length > 0 && { report_type: currentFilters.reportTypes[0] as ReportType }),
    });
    if (!isApiError(response)) {
      setReports(response.data);
      if (response.meta) {
        setTotalPages(response.meta.totalPages);
        setTotalItems(response.meta.totalItems);
      }
    }
    setIsLoading(false);
  }

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem(storageKey, String(page));
    await fetchPage(page, filters);
    requestAnimationFrame(() => {
      document.getElementById('reports-list')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleFilterChange = async (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    sessionStorage.setItem(storageKey, '1');
    await fetchPage(1, newFilters);
  };

  const activeCategory = categories.find((c) => c.slug === activeCategorySlug) || null;
  const categoryCounts = activeCategory ? { [activeCategory.name]: totalItems } : {};

  const isPriceInRange = (price: string, range: string): boolean => {
    const n = parseInt(price.replace(/[^0-9]/g, ''));
    switch (range) {
      case 'Under $2,000': return n < 2000;
      case '$2,000 - $3,000': return n >= 2000 && n <= 3000;
      case '$3,000 - $4,000': return n >= 3000 && n <= 4000;
      case '$4,000+': return n >= 4000;
      default: return false;
    }
  };

  // Price range filtering is applied client-side on the current page's data
  const displayedReports = useMemo(() => {
    if (filters.priceRanges.length === 0) return reports;
    return reports.filter((report) =>
      filters.priceRanges.some((r) => isPriceInRange(report.price, r))
    );
  }, [reports, filters.priceRanges]);

  const categoryIcon = activeCategory ? (CATEGORY_ICONS[activeCategory.name] || '📊') : '📊';

  return (
    <>
      {/* ── Category Hero Banner ───────────────────────────────────── */}
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
            <Link href="/" className="hover:text-[#2563A3] transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/industry" className="hover:text-[#2563A3] transition-colors">Reports</Link>
            {activeCategory && (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-slate-600 font-medium">{activeCategory.name}</span>
              </>
            )}
          </nav>

          <div className="flex items-start gap-4">
            {activeCategory && (
              <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200 text-3xl shadow-sm shrink-0 mt-0.5">
                {categoryIcon}
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                {activeCategory ? `${activeCategory.name} Market Research Reports` : 'Healthcare Research Reports'}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl mb-4">
                {activeCategory
                  ? activeCategory.description
                  : 'Browse comprehensive healthcare market research reports across all industry segments.'}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563A3] bg-blue-100 px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  {`${totalItems} ${totalItems === 1 ? 'report' : 'reports'}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_288px] gap-10">

          {/* ── Main: Report List ──────────────────────────────────── */}
          <main id="reports-list">
            {/* Meta row */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-1">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                {`${totalItems} reports`}
              </p>
            </div>

            {/* Loading overlay */}
            {isLoading ? (
              <div className="space-y-4 mt-4">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : displayedReports.length > 0 ? (
              <>
                <div>
                  {displayedReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl mt-4">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No reports found</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Try adjusting your filters
                </p>
                {filters.regions.length > 0 && (
                  <button
                    onClick={() => handleFilterChange({ ...filters, regions: [] })}
                    className="text-sm font-medium text-[#2563A3] hover:underline"
                  >
                    Clear region filters
                  </button>
                )}
              </div>
            )}
          </main>

          {/* ── Right Sidebar ─────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                totalCount={totalItems}
                categoryCounts={categoryCounts}
                activeCategorySlug={activeCategorySlug}
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
