export default function StatsSectionSkeleton() {
  return (
    <section className="bg-navy-950 border-y border-navy-900/80">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="px-6 md:px-10 py-10 text-center">
              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse" />
              </div>
              <div className="h-12 w-24 mx-auto rounded-lg bg-white/5 animate-pulse mb-2" />
              <div className="h-4 w-32 mx-auto rounded bg-white/5 animate-pulse mb-1.5" />
              <div className="h-3 w-28 mx-auto rounded bg-white/5 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
