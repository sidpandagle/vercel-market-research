import Link from 'next/link';
import type { Report } from '@/lib/api/reports.types';

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  let formattedDate = '';
  try {
    if (report.date) {
      const d = new Date(report.date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
    }
  } catch {
    formattedDate = report.year || '';
  }
  if (!formattedDate) formattedDate = report.year || '';

  return (
    <Link href={`/reports/${report.slug}`} className="group block">
      <article className="relative py-6 pl-5 -ml-5
        before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px]
        before:rounded-full before:bg-transparent before:transition-all before:duration-300
        group-hover:before:bg-[#2563A3]
        transition-colors duration-200">

        {/* Category + Date */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563A3]">
            {report.category}
          </span>
          {formattedDate && (
            <>
              <span className="text-slate-300 text-xs">·</span>
              <time className="text-xs text-slate-400">{formattedDate}</time>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-bold text-slate-800 leading-snug mb-2
          group-hover:text-[#2563A3] transition-colors duration-200">
          {report.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">
          {report.summary}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              {report.region}
            </span>
            <span className="text-slate-200">|</span>
            <span>{report.reportType}</span>
            {report.pages > 0 && (
              <>
                <span className="text-slate-200">|</span>
                <span>{report.pages} pages</span>
              </>
            )}
          </div>

          <span className="text-xs font-semibold text-[#2563A3] flex items-center gap-1
            opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0
            transition-all duration-200">
            Read Report
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
