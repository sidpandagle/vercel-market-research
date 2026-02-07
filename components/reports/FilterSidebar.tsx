'use client';

import { Button } from '@/components/ui';
import FilterSection from './FilterSection';
import categories from '@/data/categories.json';

export interface FilterState {
  industries: string[];
  regions: string[];
  reportTypes: string[];
  priceRanges: string[];
  searchQuery: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
}

const REGIONS = [
  'Global',
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East & Africa'
];

// Reserved for future use
// const REPORT_TYPES = [
//   'Market Analysis',
//   'Industry Report',
//   'Competitive Landscape',
//   'Strategic Outlook',
//   'Technology Assessment',
//   'Regulatory Analysis'
// ];

// const PRICE_RANGES = [
//   'Under $2,000',
//   '$2,000 - $3,000',
//   '$3,000 - $4,000',
//   '$4,000+'
// ];

export default function FilterSidebar({ filters, onFilterChange, totalCount }: FilterSidebarProps) {
  const handleCheckboxChange = (filterType: keyof Omit<FilterState, 'searchQuery'>, value: string) => {
    const currentValues = filters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onFilterChange({
      ...filters,
      [filterType]: newValues
    });
  };

  const handleSearchChange = (query: string) => {
    onFilterChange({
      ...filters,
      searchQuery: query
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      industries: [],
      regions: [],
      reportTypes: [],
      priceRanges: [],
      searchQuery: ''
    });
  };

  const hasActiveFilters =
    filters.industries.length > 0 ||
    filters.regions.length > 0 ||
    filters.reportTypes.length > 0 ||
    filters.priceRanges.length > 0 ||
    filters.searchQuery.length > 0;

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Filters</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          {totalCount} {totalCount === 1 ? 'report' : 'reports'}
        </p>
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <label htmlFor="search" className="sr-only">
          Search reports
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search reports..."
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
        />
      </div>

      {/* Industry Filter */}
      <FilterSection title="Industry">
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={filters.industries.includes(category.name)}
              onChange={() => handleCheckboxChange('industries', category.name)}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
            />
            <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {category.name}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Region Filter */}
      <FilterSection title="Region">
        {REGIONS.map((region) => (
          <label
            key={region}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={filters.regions.includes(region)}
              onChange={() => handleCheckboxChange('regions', region)}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
            />
            <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {region}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Report Type Filter */}
      {/* <FilterSection title="Report Type">
        {REPORT_TYPES.map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={filters.reportTypes.includes(type)}
              onChange={() => handleCheckboxChange('reportTypes', type)}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
            />
            <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {type}
            </span>
          </label>
        ))}
      </FilterSection> */}

      {/* Price Range Filter */}
      {/* <FilterSection title="Price Range">
        {PRICE_RANGES.map((range) => (
          <label
            key={range}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={filters.priceRanges.includes(range)}
              onChange={() => handleCheckboxChange('priceRanges', range)}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
            />
            <span className="text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {range}
            </span>
          </label>
        ))}
      </FilterSection> */}

      {/* Clear All Filters Button */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <Button
            variant="outline"
            fullWidth
            onClick={clearAllFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
