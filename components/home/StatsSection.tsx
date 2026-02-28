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
    <section className="bg-navy-950 border-y border-navy-900/80">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.value} className="px-6 md:px-10 py-10 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-12 h-12 rounded-xl bg-bright-500/15 flex items-center justify-center shadow-[0_0_24px_-4px_rgba(245,158,11,0.35)]">
                    <Icon className="w-5 h-5 text-bright-400" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-300 mt-2 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
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
