import Link from 'next/link';

const checkmarks = ['HIPAA Compliant', 'ISO Certified', 'FDA Compliant Data'];

const highlights = [
  { val: '2,500+', label: 'Reports Available' },
  { val: '48h', label: 'Avg. Delivery Time' },
  { val: '98%', label: 'Client Satisfaction' },
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 mesh-gradient-dark py-24 md:py-36">

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[450px] bg-ocean-500/[0.18] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-bright-500/[0.09] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Glassmorphism inner container */}
        <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-8 py-12 md:px-14 md:py-16 shadow-2xl shadow-black/30">
          {/* Top gradient highlight line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent rounded-t-3xl pointer-events-none" />

        <div className="flex flex-col items-center gap-8 text-center">

          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-300/80 px-4 py-1.5 rounded-full border border-ocean-500/20 bg-ocean-600/[0.12]">
            Get Started Today
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-[3.25rem] text-white leading-[1.12] tracking-[-0.02em] max-w-3xl">
            Ready to Make Data-Driven{' '}
            <span className="text-gradient-amber">Healthcare Decisions?</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg text-white/55 max-w-2xl leading-[1.85]">
            Join 1,000+ healthcare organizations that trust Synaptic Research for
            comprehensive market intelligence, strategic analysis, and actionable insights.
          </p>

          {/* Highlights row */}
          <div className="flex flex-wrap items-center justify-center gap-8 py-2">
            {highlights.map(({ val, label }) => (
              <div key={val} className="text-center">
                <p className="text-2xl font-bold text-white">{val}</p>
                <p className="text-xs text-white/40 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-white/[0.07]" />

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/reports">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl text-navy-950 bg-white hover:bg-white/95 shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 min-w-[200px]">
                Browse All Reports →
              </button>
            </Link>
            <Link href="/contact">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl text-white bg-transparent border-2 border-white/[0.18] hover:bg-white/[0.08] hover:border-white/[0.30] hover:-translate-y-0.5 transition-all duration-200 min-w-[200px]">
                Contact Sales
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {checkmarks.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/40">
                <svg className="w-3.5 h-3.5 text-ocean-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </div>
            ))}
          </div>

        </div>
        </div>{/* /glassmorphism container */}
      </div>
    </section>
  );
}
