import Link from 'next/link';
import { ArrowRight, TrendingUp, Globe, Users, BookOpen } from 'lucide-react';
import { SearchBar } from '@/components/ui';

const quickStats = [
  { val: '2,500+', label: 'Research Reports', icon: BookOpen },
  { val: '50+', label: 'Countries', icon: Globe },
  { val: '1,000+', label: 'Enterprise Clients', icon: Users },
];

const trustBadges = ['HIPAA Compliant', 'ISO Certified', 'FDA Compliant Data'];

const chartBars = [40, 55, 48, 62, 70, 65, 78, 85, 80, 92];

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy-950 mesh-gradient-dark">

      {/* Line-grid texture */}
      <div className="absolute inset-0 line-grid pointer-events-none" />

      {/* Dot grid (subtle, on top of line-grid) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow orbs — pulsing */}
      <div className="absolute top-0 left-0 w-[700px] h-[600px] rounded-full bg-ocean-600/[0.18] blur-3xl -translate-x-1/3 -translate-y-1/4 pointer-events-none animate-pulse-ambient" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-bright-500/[0.07] blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-[350px] h-[250px] rounded-full bg-ocean-500/[0.07] blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* Left: Content */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Live trust pill */}
            <div className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full bg-ocean-600/[0.18] border border-ocean-500/30 text-ocean-300 text-sm font-medium">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ocean-400" />
              </span>
              Trusted by 500+ Healthcare Organizations Worldwide
            </div>

            {/* Headline — Playfair Display applied via globals.css h1 rule */}
            <h1 className="text-[3rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.75rem] text-white leading-[1.04] tracking-[-0.025em]">
              The Intelligence<br />
              Behind Healthcare's<br />
              <span className="text-gradient-amber">Biggest Decisions.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/55 max-w-xl leading-[1.75] font-light">
              Access 2,500+ research reports and strategic insights across every
              healthcare vertical — from oncology to medical devices to digital health.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {quickStats.map(({ val, label, icon: Icon }) => (
                <div key={val} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-ocean-600/[0.20] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-ocean-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-white">{val}</span>
                    <span className="text-sm text-white/45 ml-1.5">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Search bar */}
            <div className="max-w-xl w-full">
              <SearchBar
                variant="hero"
                placeholder="Search 2,500+ reports, markets, regions..."
                className="w-full"
              />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/reports">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl text-white bg-ocean-600 hover:bg-ocean-500 shadow-lg shadow-ocean-600/30 hover:shadow-ocean-500/40 hover:-translate-y-0.5 transition-all duration-200 min-w-[190px]">
                  Browse All Reports
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/request-sample">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl text-white/75 bg-white/[0.07] border border-white/[0.14] hover:bg-white/[0.12] hover:border-white/[0.24] hover:text-white hover:-translate-y-0.5 transition-all duration-200 min-w-[190px]">
                  Request Free Sample
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {trustBadges.map((label) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-white/35">
                  <svg className="w-3.5 h-3.5 text-ocean-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {label}
                </div>
              ))}
            </div>

          </div>

          {/* Right: Decorative floating report preview cards */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
            <div className="relative w-full max-w-[400px] h-[520px]">

              {/* Soft glow behind primary card */}
              <div className="absolute top-0 right-0 w-[345px] h-[300px] bg-ocean-600/[0.10] blur-2xl rounded-3xl pointer-events-none" />

              {/* Primary report card — glassmorphism */}
              <div className="absolute top-0 right-0 w-[345px] glass-dark rounded-2xl p-6 shadow-2xl shadow-black/60 animate-float-gentle">
                {/* Gradient top-border highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ocean-400/40 to-transparent rounded-t-2xl" />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-ocean-600/[0.22] text-ocean-300 border border-ocean-500/20">
                    Pharmaceuticals
                  </span>
                  <span className="text-xs text-white/25">Jan 2025</span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug mb-4">
                  Global Oncology Drug Market: Size, Share &amp; Growth 2025–2032
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/[0.05] rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-white">$847B</p>
                    <p className="text-[10px] text-white/35 mt-0.5">Market Size 2032</p>
                  </div>
                  <div className="bg-white/[0.05] rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-bright-400">8.4%</p>
                    <p className="text-[10px] text-white/35 mt-0.5">CAGR (2025–2032)</p>
                  </div>
                </div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1 h-10 mb-4" aria-hidden="true">
                  {chartBars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-ocean-500/30"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="h-px bg-white/[0.07] mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {['N. America', 'Europe', 'APAC'].map((r) => (
                      <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-white/35 border border-white/[0.07]">
                        {r}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-ocean-400 font-medium">View →</span>
                </div>
              </div>

              {/* Secondary report card — glassmorphism */}
              <div className="absolute bottom-6 left-0 w-[295px] glass-dark rounded-2xl p-5 shadow-2xl shadow-black/50 animate-float-alt">
                {/* Gradient top-border highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bright-400/40 to-transparent rounded-t-2xl" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-bright-500/[0.14] text-bright-400 border border-bright-500/20">
                    Medical Devices
                  </span>
                  <span className="text-xs text-white/25">Dec 2024</span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug mb-3">
                  Cardiovascular Devices: Global Analysis &amp; Regional Forecast
                </h3>
                <div className="flex gap-2.5">
                  <div className="flex-1 bg-white/[0.05] rounded-lg p-2.5 text-center">
                    <p className="text-base font-bold text-white">$312B</p>
                    <p className="text-[10px] text-white/35">Market Value</p>
                  </div>
                  <div className="flex-1 bg-white/[0.05] rounded-lg p-2.5 text-center">
                    <p className="text-base font-bold text-bright-400">6.1%</p>
                    <p className="text-[10px] text-white/35">CAGR</p>
                  </div>
                </div>
              </div>

              {/* Floating accent badge */}
              <div className="absolute top-[235px] left-[68px] z-10 bg-ocean-600 rounded-2xl px-4 py-3 shadow-xl shadow-ocean-600/40 flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-white shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold leading-tight">Updated Monthly</p>
                  <p className="text-ocean-200 text-[10px]">Latest market data</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
