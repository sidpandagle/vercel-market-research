import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface IndustryHeroProps {
  activeCategory?: Category | null;
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

export default function IndustryHero({ activeCategory }: IndustryHeroProps) {
  const categoryIcon = activeCategory ? (CATEGORY_ICONS[activeCategory.name] || '📊') : null;

  return (
    <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
          <Link href="/" className="hover:text-[#2563A3] transition-colors">Home</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/industry" className="hover:text-[#2563A3] transition-colors">Reports</Link>
          {activeCategory && (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-slate-600 font-medium">{activeCategory.name}</span>
            </>
          )}
        </nav>

        <div className="flex items-start gap-4">
          {activeCategory && categoryIcon && (
            <div
              className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200 text-3xl shadow-sm shrink-0 mt-0.5"
              aria-hidden="true"
            >
              {categoryIcon}
            </div>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
              {activeCategory
                ? `${activeCategory.name} Market Research Reports`
                : 'Healthcare Research Reports'}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl mb-4">
              {activeCategory
                ? activeCategory.description
                : 'Browse comprehensive healthcare market research reports across all industry segments.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
