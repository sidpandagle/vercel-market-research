import Link from 'next/link';
import { ArrowUpRight, Globe, Calendar } from 'lucide-react';

interface ReportCardReport {
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

interface ReportCardProps {
  report: ReportCardReport;
  index?: number;
}

const CATEGORY_PALETTE: Record<string, { bar: string; badge: string; text: string }> = {
  'Biotechnology':        { bar: '#059669', badge: '#ECFDF5', text: '#065F46' },
  'Clinical Diagnostics': { bar: '#0891B2', badge: '#F0F9FF', text: '#0E7490' },
  'Healthcare Services':  { bar: '#7C3AED', badge: '#F5F3FF', text: '#5B21B6' },
  'Laboratory Equipment': { bar: '#D97706', badge: '#FFFBEB', text: '#92400E' },
  'Healthcare IT':        { bar: '#10B981', badge: '#ECFDF5', text: '#047857' },
  'Medical Devices':      { bar: '#1E7252', badge: '#E6F5F0', text: '#1A5C44' },
  'Medical Imaging':      { bar: '#2563EB', badge: '#EFF6FF', text: '#1D4ED8' },
  'Therapeutic Area':     { bar: '#DB2777', badge: '#FDF2F8', text: '#9D174D' },
  'Life Sciences':        { bar: '#6D28D9', badge: '#F5F3FF', text: '#4C1D95' },
  'Dental':               { bar: '#0284C7', badge: '#F0F9FF', text: '#075985' },
  'Pharmaceuticals':      { bar: '#DC2626', badge: '#FEF2F2', text: '#991B1B' },
  'Animal Health':        { bar: '#78716C', badge: '#FAFAF8', text: '#44403C' },
};

const DEFAULT_PALETTE = { bar: '#1E7252', badge: '#E6F5F0', text: '#1A5C44' };

export default function ReportCard({ report, index }: ReportCardProps) {
  const palette = CATEGORY_PALETTE[report.category] ?? DEFAULT_PALETTE;
  const indexLabel = index !== undefined ? String(index).padStart(2, '0') : null;

  return (
    <Link href={`/reports/${report.slug}`} className="group block h-full">
      <article
        className="relative h-full flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          border: '1px solid #F0EDEA',
        }}
      >
        {/* Category accent bar */}
        <div
          className="h-[3px] w-full flex-shrink-0 transition-all duration-300"
          style={{ background: palette.bar }}
        />

        <div className="flex flex-col flex-1 p-5">
          {/* Header: badge + index */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <span
              className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase leading-none flex-shrink-0"
              style={{ background: palette.badge, color: palette.text }}
            >
              {report.category}
            </span>
            {indexLabel && (
              <span
                className="font-display font-bold tabular-nums leading-none flex-shrink-0 select-none"
                style={{ color: '#EAE7E4', fontSize: '1.625rem', letterSpacing: '-0.03em' }}
              >
                {indexLabel}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold leading-snug line-clamp-2 mb-3 transition-colors duration-200"
            style={{ color: '#1C1917', fontSize: '0.9375rem', letterSpacing: '-0.01em' }}
          >
            <span
              style={{ transition: 'color 0.2s' }}
              className="group-hover:text-[#1E7252]"
            >
              {report.title}
            </span>
          </h3>

          {/* Summary */}
          <p
            className="text-sm leading-relaxed line-clamp-3 flex-1"
            style={{ color: '#78716C' }}
          >
            {report.summary || report.description}
          </p>

          {/* Divider */}
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #F5F2EF' }}>
            <div className="flex items-center justify-between gap-2">
              {/* Metadata */}
              <div
                className="flex items-center gap-3 flex-wrap"
                style={{ color: '#B5B0AC', fontSize: '11px' }}
              >
                {report.region && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 flex-shrink-0" />
                    {report.region}
                  </span>
                )}
                {report.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    {report.year}
                  </span>
                )}
              </div>

              {/* CTA */}
              <span
                className="flex items-center gap-1 text-xs font-semibold flex-shrink-0 transition-all duration-200"
                style={{ color: palette.bar }}
              >
                View
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
