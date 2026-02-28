import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, Container, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { getReports, isApiError } from '@/lib/api';

const accentBars = [
  'bg-gradient-to-r from-ocean-700 to-ocean-500',
  'bg-gradient-to-r from-bright-500 to-bright-400',
  'bg-gradient-to-r from-violet-700 to-violet-500',
];

export default async function FeaturedReportsSection() {
  const response = await getReports({
    status: 'published',
    limit: 3,
  });

  if (isApiError(response) || response.data.length === 0) {
    return null;
  }

  const featuredReports = response.data;

  return (
    <Section background="muted" padding="lg">
      <Container size="xl">
        <div className="space-y-10">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600 px-3 py-1.5 rounded-full bg-ocean-50 border border-ocean-100">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 shrink-0" />
                Featured Research
              </span>
              <h2 className="text-3xl md:text-4xl text-slate-900 tracking-tight">
                Latest Market Intelligence
              </h2>
              <p className="text-base text-slate-500">
                High-impact reports updated with the latest data and trends.
              </p>
            </div>
            <Link
              href="/reports"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 hover:text-ocean-700 transition-colors shrink-0 group"
            >
              View all reports
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Report cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReports.map((report, idx) => (
              <Link
                key={report.id}
                href={`/reports/${report.slug}`}
                className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-ocean-200 hover:shadow-2xl hover:shadow-ocean-100/60 hover:-translate-y-1 transition-all duration-250"
              >
                {/* Gradient accent bar — cycles indigo / amber / violet */}
                <div className={`h-[3px] shrink-0 ${accentBars[idx % accentBars.length]}`} />

                <div className="flex flex-col flex-1 p-6">
                  {/* Meta row */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Badge
                      variant="outline"
                      size="sm"
                      className="text-xs font-medium border-slate-200 text-slate-600 bg-slate-50 shrink-0 max-w-[140px] truncate"
                    >
                      {report.category}
                    </Badge>
                    <span className="text-xs text-slate-400 shrink-0">
                      {formatDate(report.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-ocean-700 transition-colors line-clamp-2 leading-snug mb-3">
                    {report.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 line-clamp-3 flex-1 leading-relaxed">
                    {report.summary}
                  </p>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      <span className="text-xs text-slate-400">
                        {report.region ?? 'Global'}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-ocean-600 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-150">
                      View Report
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}
