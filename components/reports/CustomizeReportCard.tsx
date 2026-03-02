import React from 'react';
import Link from 'next/link';

interface CustomizeReportCardProps {
  reportTitle?: string;
  className?: string;
}

export const CustomizeReportCard = React.forwardRef<HTMLDivElement, CustomizeReportCardProps>(
  ({ reportTitle, className }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl p-5 ${className ?? ''}`}
        style={{ background: '#FAFAF9', border: '1px solid var(--border)' }}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
          style={{ background: '#E6F5F0', border: '1px solid #8DD5BC' }}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" style={{ color: '#1E7252' }}>
            <path d="M3 10h14M10 3v14M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <h3 className="font-semibold text-sm text-[var(--foreground)] mb-1.5">
          Need a Tailored Report?
        </h3>
        <p className="text-xs leading-relaxed mb-4" style={{ color: '#78716C' }}>
          Add regions, segments, or data points — with 20% free customization included.
        </p>

        <Link href={`/request-sample${reportTitle ? `?report=${encodeURIComponent(reportTitle)}&customize=true` : '?customize=true'}`} className="block">
          <button
            className="w-full py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ background: '#E6F5F0', color: '#1E7252', border: '1px solid #8DD5BC' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#C0E8DA' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#E6F5F0' }}
          >
            Customize This Report
          </button>
        </Link>
      </div>
    );
  }
);

CustomizeReportCard.displayName = 'CustomizeReportCard';
