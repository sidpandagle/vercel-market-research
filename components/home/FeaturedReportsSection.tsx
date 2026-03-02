import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import allReportsData from '@/data/all_reports.json';
import type { JsonReport } from '@/lib/jsonReports';

const accentColors = [
  {
    bar: 'from-ocean-700 to-ocean-500',
    badge: 'text-ocean-700 bg-ocean-50 border-ocean-100',
    dot: 'bg-ocean-500',
  },
  {
    bar: 'from-bright-500 to-bright-400',
    badge: 'text-slate-600 bg-slate-50 border-slate-200',
    dot: 'bg-bright-500',
  },
  {
    bar: 'from-ocean-400 to-ocean-300',
    badge: 'text-slate-600 bg-slate-50 border-slate-200',
    dot: 'bg-ocean-400',
  },
];

// Pick three reports for the section — first 3 from all_reports.json
const reports = (allReportsData as JsonReport[]).slice(0, 3);

export default function FeaturedReportsSection() {
  const [featured, ...secondary] = reports;
  const featAccent = accentColors[0];

  return (
    <section className="bg-[var(--muted)] py-24">
      <Container size="xl">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600 px-3 py-1.5 rounded-full bg-ocean-50 border border-ocean-100">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 shrink-0" />
              Featured Research
            </span>
            <h2 className="font-display text-3xl md:text-[2.75rem] lg:text-5xl text-slate-900 tracking-tight leading-[1.1]">
              Latest Market Intelligence
            </h2>
            <p className="text-base text-slate-500 max-w-xl leading-relaxed">
              High-impact reports updated with the latest data, trends, and forecasts.
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

        {/* Magazine layout: featured (left) + 2 stacked (right) */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Featured card ── */}
          <Link
            href={`/reports/${featured.slug}`}
            className="group lg:flex-[1.35] flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden hover:border-ocean-200 hover:shadow-2xl hover:shadow-ocean-100/50 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Thin top accent bar */}
            <div className={`h-1.5 shrink-0 bg-gradient-to-r ${featAccent.bar}`} />

            {/* Dark visual header */}
            <div className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-ocean-700 px-8 pt-8 pb-10 overflow-hidden">
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              {/* Glow */}
              <div className="absolute top-0 right-0 w-80 h-64 bg-ocean-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="relative">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-ocean-300 bg-ocean-600/30 border border-ocean-500/25 px-2.5 py-1 rounded-full mb-5">
                  {featured.industry}
                </span>
                <h3 className="font-display text-2xl md:text-[1.65rem] text-white leading-[1.22] tracking-tight mb-5 group-hover:text-ocean-100 transition-colors">
                  {featured.title}
                </h3>
                {/* Meta chips */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/55 bg-white/[0.08] border border-white/[0.10] rounded-lg px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-bright-400 shrink-0" />
                    {featured.regional_analysis[0]?.region ?? 'Global'} Coverage
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/55 bg-white/[0.08] border border-white/[0.10] rounded-lg px-3 py-1.5">
                    {featured.published_year}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-bright-400/80 bg-bright-500/[0.10] border border-bright-500/20 rounded-lg px-3 py-1.5">
                    {featured.market_size.cagr}% CAGR
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-8">
              <p className="text-sm text-slate-500 leading-[1.85] flex-1 mb-6 line-clamp-4">
                {featured.market_overview.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Full Report Available
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ocean-600 bg-ocean-50 border border-ocean-100 px-4 py-2 rounded-xl group-hover:bg-ocean-600 group-hover:text-white group-hover:border-ocean-600 transition-all duration-200">
                  View Report
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* ── Secondary stacked cards ── */}
          <div className="lg:flex-1 flex flex-col gap-6">
            {secondary.map((report, idx) => {
              const accent = accentColors[idx + 1];
              return (
                <Link
                  key={report.report_id}
                  href={`/reports/${report.slug}`}
                  className="group flex flex-col flex-1 bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-ocean-200 hover:shadow-xl hover:shadow-ocean-100/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`h-1 shrink-0 bg-gradient-to-r ${accent.bar}`} />
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <Badge
                        variant="outline"
                        size="sm"
                        className={`text-xs font-medium shrink-0 max-w-[150px] truncate border ${accent.badge}`}
                      >
                        {report.industry}
                      </Badge>
                      <span className="text-xs text-slate-400 shrink-0">{report.published_year}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-ocean-700 transition-colors line-clamp-2 leading-snug mb-3 flex-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {report.market_overview.summary}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${accent.dot} shrink-0`} />
                        <span className="text-xs text-slate-400">{report.regional_analysis[0]?.region ?? 'Global'}</span>
                      </div>
                      <span className="text-sm font-semibold text-ocean-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-150">
                        View Report
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
