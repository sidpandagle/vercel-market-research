import { Skeleton } from '@/components/ui';

export default function ReportsSkeleton() {
  return (
    <>
      {/* ── Hero Banner Skeleton ───────────────────────────────────── */}
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-2" />
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-2" />
            <Skeleton className="h-3 w-28" />
          </div>

          <div className="flex items-start gap-4">
            {/* Icon box */}
            <Skeleton className="hidden sm:block h-14 w-14 rounded-2xl shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-8 w-80 mb-3" />
              <Skeleton className="h-4 w-full max-w-lg mb-1.5" />
              <Skeleton className="h-4 w-2/3 max-w-md mb-4" />
              <Skeleton className="h-7 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_288px] gap-10">

          {/* ── Main: Report List ──────────────────────────────────── */}
          <main>
            {/* Search bar */}
            <Skeleton className="h-11 w-full rounded-lg mb-5" />

            {/* Meta row */}
            <div className="flex items-center pb-3 border-b border-slate-200 mb-1">
              <Skeleton className="h-3 w-36" />
            </div>

            {/* Report list items */}
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="py-6 pl-5 -ml-5 border-b border-slate-100">
                {/* Category + date */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-2 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
                {/* Title */}
                <Skeleton className="h-5 w-full mb-1.5" />
                <Skeleton className={`h-5 mb-3 ${i % 3 === 0 ? 'w-3/4' : i % 3 === 1 ? 'w-5/6' : 'w-2/3'}`} />
                {/* Excerpt */}
                <Skeleton className="h-3.5 w-full mb-1.5" />
                <Skeleton className="h-3.5 w-4/5 mb-3" />
                {/* Footer */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-1" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </main>

          {/* ── Right Sidebar ─────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* Browse by Industry card */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="py-2">
                  {Array.from({ length: 13 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2">
                      <Skeleton className={`h-3.5 ${i === 0 ? 'w-24' : i % 4 === 1 ? 'w-28' : i % 4 === 2 ? 'w-20' : 'w-32'}`} />
                      <Skeleton className="h-4 w-7 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-gradient-to-br from-[#1B4B7F] to-[#0F2D52] rounded-xl p-5">
                <Skeleton className="h-4 w-36 mb-2 bg-white/20" />
                <Skeleton className="h-3 w-full mb-1.5 bg-white/10" />
                <Skeleton className="h-3 w-4/5 mb-4 bg-white/10" />
                <Skeleton className="h-8 w-40 rounded-lg bg-white/20" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
