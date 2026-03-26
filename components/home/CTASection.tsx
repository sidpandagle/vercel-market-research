import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const checkmarks = ['HIPAA Compliant', 'ISO Certified', 'FDA Compliant Data'];

const metrics = [
  { val: '2,500+', label: 'Reports Available',    bar: 94, color: 'from-ocean-500 to-ocean-400' },
  { val: '48h',    label: 'Avg. Delivery Time',   bar: 88, color: 'from-ocean-400 to-bright-400' },
  { val: '98%',    label: 'Client Satisfaction',  bar: 98, color: 'from-bright-500 to-bright-400' },
];

const features = [
  'Primary & secondary research methodology',
  'Expert analyst interviews included',
  'Custom segment analysis available',
  'Excel datasets with every report',
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 mesh-gradient-dark py-24 md:py-32">

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Background grid */}
      <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-ocean-500/[0.16] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/5 w-[500px] h-[400px] bg-bright-500/[0.07] rounded-full blur-3xl pointer-events-none" />


<div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">

          {/* ── Left: Text + CTAs ── */}
          <div className="lg:col-span-7 flex flex-col gap-7">

            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-widest text-ocean-300/80 px-4 py-1.5 rounded-full border border-ocean-500/20 bg-ocean-600/[0.12]">
              Get Started Today
            </span>

            {/* Headline */}
            <div>
              <h2 className="font-display text-3xl md:text-[2.75rem] lg:text-5xl text-white leading-[1.08] tracking-[-0.025em]">
                Ready to Make Data-Driven
              </h2>
              <h2 className="font-display text-3xl md:text-[2.75rem] lg:text-5xl leading-[1.08] tracking-[-0.025em] text-gradient-amber">
                Healthcare Decisions?
              </h2>
            </div>

            {/* Subtext */}
            <p className="text-lg text-white/50 max-w-xl leading-[1.80]">
              Join 1,000+ healthcare organizations that trust NeoGraph Analytics for
              comprehensive market intelligence, strategic analysis, and actionable insights.
            </p>

            {/* Feature list */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/50">
                  <CheckCircle2 className="w-4 h-4 text-ocean-400 shrink-0" strokeWidth={1.75} />
                  {f}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/reports">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold rounded-xl text-navy-950 bg-white hover:bg-white/95 shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 min-w-[210px]">
                  Browse All Reports
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold rounded-xl text-white bg-transparent border-2 border-white/[0.18] hover:bg-white/[0.08] hover:border-white/[0.30] hover:-translate-y-0.5 transition-all duration-200 min-w-[210px]">
                  Contact Sales
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              {checkmarks.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/35">
                  <svg className="w-3.5 h-3.5 text-ocean-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: Intelligence metrics panel ── */}
          <div className="lg:col-span-5">
            <div className="relative glass-dark rounded-3xl p-8 overflow-hidden shadow-2xl shadow-black/40">

              {/* Top gradient accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-bright-400/65 to-transparent rounded-t-3xl" />

              {/* Panel header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white font-semibold text-base">Why NeoGraph Analytics?</h3>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bright-500/[0.12] border border-bright-500/20">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bright-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-bright-400" />
                  </span>
                  <span className="text-[10px] font-bold text-bright-400 uppercase tracking-wide">Live</span>
                </div>
              </div>

              {/* Metric rows with progress bars */}
              <div className="space-y-6">
                {metrics.map(({ val, label, bar, color }) => (
                  <div key={val}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/55 font-medium">{label}</span>
                      <span className="text-sm font-bold text-white">{val}</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${color}`}
                        style={{ width: `${bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-white/[0.07] my-7" />

              {/* Compliance chips */}
              <div className="flex flex-wrap gap-2">
                {['HIPAA', 'ISO Certified', 'SOC 2', 'FDA Compliant'].map((c) => (
                  <span
                    key={c}
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-ocean-600/[0.22] text-ocean-300 border border-ocean-500/20"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* CTA micro-link */}
              <div className="mt-7 pt-6 border-t border-white/[0.07]">
                <Link href="/about" className="inline-flex items-center gap-1.5 text-xs font-semibold text-ocean-300 hover:text-ocean-200 transition-colors group">
                  Learn about our methodology
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
