import { BookOpen, Globe, LayoutGrid, Users } from 'lucide-react';
import type { ElementType } from 'react';

interface Stat {
  value: string;
  label: string;
  desc: string;
  icon: ElementType;
}

const stats: Stat[] = [
  {
    value: '2,500+',
    label: 'Research Reports',
    desc: 'Across all healthcare verticals',
    icon: BookOpen,
  },
  {
    value: '50+',
    label: 'Countries Covered',
    desc: 'Global research and market insights',
    icon: Globe,
  },
  {
    value: '20+',
    label: 'Industry Sectors',
    desc: 'From pharma to animal health',
    icon: LayoutGrid,
  },
  {
    value: '1,000+',
    label: 'Enterprise Clients',
    desc: 'Trusted by industry leaders worldwide',
    icon: Users,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-navy-950 border-y border-white/[0.04] relative overflow-hidden">

      {/* Architectural grid background */}
      <div className="absolute inset-0 line-grid opacity-60 pointer-events-none" />

      {/* Ambient orbs */}
      <div className="absolute left-0 top-0 w-[500px] h-[350px] bg-ocean-600/[0.12] rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-bright-500/[0.06] rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />


<div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.05]">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.value} className="px-8 md:px-10 py-16 md:py-20 text-center">

                {/* Icon chip */}
                <div className="flex justify-center mb-6">
                  <div className="w-11 h-11 rounded-xl bg-bright-500/[0.12] flex items-center justify-center shadow-[0_0_22px_-4px_rgba(132,204,22,0.28)]">
                    <Icon className="w-5 h-5 text-bright-400" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Big number */}
                <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight tabular-nums leading-none mb-3">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-xs font-bold text-ocean-300 uppercase tracking-[0.12em] mb-2">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs text-slate-500 leading-relaxed max-w-[160px] mx-auto">
                  {stat.desc}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
