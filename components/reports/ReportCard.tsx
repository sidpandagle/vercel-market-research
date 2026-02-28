import Link from 'next/link';
import { ArrowRight, Globe, FileText } from 'lucide-react';
import type { Report } from '@/lib/api/reports.types';

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <Link href={`/reports/${report.slug}`} className="group flex flex-col h-full">
      <div className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-ocean-200 hover:shadow-xl hover:shadow-ocean-50 hover:-translate-y-0.5 transition-all duration-200">
        {/* Accent stripe */}
        <div className="h-[3px] bg-ocean-600 shrink-0" />

        <div className="flex flex-col flex-1 p-6">
          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-ocean-50 text-ocean-700 border border-ocean-100">
              {report.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-ocean-700 transition-colors line-clamp-2 leading-snug mb-3">
            {report.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-slate-500 line-clamp-4 flex-1 leading-relaxed">
            {report.summary}
          </p>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
              {report.region && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 shrink-0" />
                  <span>{report.region}</span>
                </div>
              )}
              {report.reportType && (
                <div className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>{report.reportType}</span>
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-ocean-600 inline-flex items-center gap-1.5 shrink-0 group-hover:gap-2 transition-all duration-150">
              Read More
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
