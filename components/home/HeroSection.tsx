import Link from 'next/link';
import { ArrowRight, BarChart2, TrendingUp, Globe, Users, BookOpen } from 'lucide-react';
import { SearchBar } from '@/components/ui';

const heroStats = [
  { val: '2,500+', label: 'Reports', icon: BookOpen },
  { val: '50+', label: 'Countries', icon: Globe },
  { val: '1,000+', label: 'Clients', icon: Users },
];

const trustBadges = ['HIPAA Compliant', 'ISO Certified', 'FDA Compliant Data'];

const dashboardCards = [
  {
    tag: 'Pharmaceuticals',
    title: 'Pharmaceutical Industry Outlook 2025–2032',
    cagr: '7.9%',
    size: '$1.9T',
    bars: [40, 52, 47, 61, 68, 64, 76, 84, 79, 92],
    accent: 'ocean' as const,
  },
  {
    tag: 'Medical Devices',
    title: 'Medical Devices Innovation Report 2025',
    cagr: '6.1%',
    size: '$603B',
    bars: [35, 42, 50, 48, 58, 62, 55, 70, 75, 80],
    accent: 'bright' as const,
  },
  {
    tag: 'Healthcare IT',
    title: 'Telemedicine Market Analysis 2025–2032',
    cagr: '16.8%',
    size: '$286B',
    bars: [30, 38, 45, 52, 60, 68, 77, 85, 90, 96],
    accent: 'ocean' as const,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950 mesh-gradient-dark">

      {/* Line-grid texture */}
      <div className="absolute inset-0 line-grid pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1.5\' cy=\'1.5\' r=\'1.5\' fill=\'white\'/%3E%3C/svg%3E")',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-0 w-[800px] h-[650px] rounded-full bg-ocean-600/[0.18] blur-[120px] -translate-x-1/3 -translate-y-1/4 pointer-events-none animate-pulse-ambient" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full bg-bright-500/[0.06] blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 right-[42%] w-[400px] h-[280px] rounded-full bg-ocean-500/[0.07] blur-3xl -translate-y-1/2 pointer-events-none" />

      {/* Vertical separator — content / dashboard */}
      <div
        className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent pointer-events-none hidden lg:block"
        aria-hidden="true"
      />


<div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="lg:col-span-6 flex flex-col gap-6">

            {/* Eyebrow pill with live indicator */}
            <div className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full bg-ocean-600/[0.18] border border-ocean-500/25 animate-reveal-up-d1">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bright-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-bright-400" />
              </span>
              <span className="text-xs font-semibold text-ocean-300 tracking-wide">
                Trusted by 500+ Healthcare Organizations Worldwide
              </span>
            </div>

            {/* Headline */}
            <div className="animate-reveal-up-d2">
              <h1 className="font-display text-[3rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.75rem] text-white leading-[1.04] tracking-[-0.03em]">
                <em className="not-italic opacity-80">Behind</em> Healthcare&apos;s
              </h1>
              <h1 className="font-display text-[3rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.75rem] leading-[1.04] tracking-[-0.03em] text-gradient-amber">
                Biggest Decisions.
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/50 max-w-lg leading-[1.80] font-light animate-reveal-up-d2">
              Access 2,500+ research reports and strategic insights across every healthcare
              vertical — from oncology to medical devices to digital health.
            </p>

            {/* Inline stats strip */}
            <div className="flex items-stretch border border-white/[0.08] rounded-2xl overflow-hidden animate-reveal-up-d3">
              {heroStats.map(({ val, label, icon: Icon }, i) => (
                <div
                  key={val}
                  className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 ${
                    i < heroStats.length - 1 ? 'border-r border-white/[0.08]' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-ocean-600/[0.22] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-ocean-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block leading-tight">{val}</span>
                    <span className="text-[10px] text-white/35 block leading-tight">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Search bar */}
            <div className="max-w-lg w-full animate-reveal-up-d3">
              <SearchBar
                variant="hero"
                placeholder="Search 2,500+ reports, markets, regions..."
                className="w-full"
              />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-reveal-up-d4">
              <Link href="/reports">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-xl text-white bg-ocean-600 hover:bg-ocean-500 shadow-lg shadow-ocean-600/25 hover:shadow-ocean-500/35 hover:-translate-y-0.5 transition-all duration-200 min-w-[185px]">
                  Browse All Reports
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/request-sample">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-xl text-white/70 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] hover:border-white/[0.22] hover:text-white hover:-translate-y-0.5 transition-all duration-200 min-w-[185px]">
                  Request Free Sample
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 animate-reveal-up-d4">
              {trustBadges.map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-xs text-white/30">
                  <svg className="w-3 h-3 text-ocean-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: Intelligence Dashboard ── */}
          <div className="hidden lg:flex lg:col-span-6 flex-col gap-3.5">

            {/* Panel header */}
            <div className="flex items-center gap-2 mb-0.5 px-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-bright-500/25 bg-bright-500/[0.10]">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bright-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-bright-400" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-bright-400">
                  Current Intelligence
                </span>
              </div>
              <span className="text-[10px] text-white/20 font-mono">Updated Jan 2025</span>
            </div>

            {/* Stacked, cascading cards */}
            {dashboardCards.map((card, idx) => (
              <div
                key={idx}
                className="relative glass-dark rounded-2xl p-5 shadow-2xl shadow-black/50 hover:border-ocean-500/30 transition-all duration-300"
                style={{
                  marginLeft: `${idx * 22}px`,
                  animationName: idx === 0 ? 'float-gentle' : idx === 1 ? 'float-gentle-alt' : 'float-gentle-c',
                  animationDuration: `${8 + idx * 2}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${idx * 1.2}s`,
                  animationFillMode: 'both',
                }}
              >
                {/* Top gradient line */}
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] rounded-t-2xl ${
                    card.accent === 'bright'
                      ? 'bg-gradient-to-r from-transparent via-bright-400/70 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-ocean-400/55 to-transparent'
                  }`}
                />

                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      card.accent === 'bright'
                        ? 'bg-bright-500/[0.15] text-bright-400 border border-bright-500/25'
                        : 'bg-ocean-600/[0.22] text-ocean-300 border border-ocean-500/25'
                    }`}
                  >
                    {card.tag}
                  </span>
                  <TrendingUp
                    className={`w-3.5 h-3.5 mt-0.5 ${
                      card.accent === 'bright' ? 'text-bright-400' : 'text-ocean-400'
                    }`}
                  />
                </div>

                <h3 className="text-white text-xs font-semibold leading-snug mb-3 pr-4">
                  {card.title}
                </h3>

                <div className="flex items-center gap-8 mb-3">
                  <div>
                    <p className="text-xl font-bold text-white leading-tight">{card.size}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">Market Size 2032</p>
                  </div>
                  <div>
                    <p
                      className={`text-xl font-bold leading-tight ${
                        card.accent === 'bright' ? 'text-bright-400' : 'text-ocean-400'
                      }`}
                    >
                      {card.cagr}
                    </p>
                    <p className="text-[10px] text-white/30 mt-0.5">CAGR</p>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="flex items-end gap-[3px] h-8" aria-hidden="true">
                  {card.bars.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-[2px] ${
                        i >= 7
                          ? card.accent === 'bright'
                            ? 'bg-bright-500/70'
                            : 'bg-ocean-400/70'
                          : 'bg-white/[0.12]'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Footer badge */}
            <div
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03]"
              style={{ marginLeft: '44px' }}
            >
              <BarChart2 className="w-4 h-4 text-bright-400 shrink-0" />
              <span className="text-xs text-white/40">
                Updated monthly · Primary &amp; secondary research methodology
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
