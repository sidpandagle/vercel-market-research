import Link from 'next/link';
import {
  Dna,
  Microscope,
  Heart,
  FlaskConical,
  Monitor,
  Activity,
  Eye,
  Pill,
  Leaf,
  Smile,
  Atom,
  PawPrint,
  ArrowRight,
} from 'lucide-react';
import type { ElementType } from 'react';
import { Container } from '@/components/ui';
import categories from '@/data/categories.json';

interface CategoryStyle {
  icon: ElementType;
  bg: string;
  text: string;
  ring: string;
  wideBg: string;
  wideBorder: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  biotechnology:          { icon: Dna,          bg: 'bg-ocean-50',           text: 'text-ocean-700', ring: 'ring-ocean-100',          wideBg: 'from-ocean-50 to-white',        wideBorder: 'hover:border-ocean-200' },
  'clinical-diagnostics': { icon: Microscope,   bg: 'bg-ocean-50',           text: 'text-ocean-700', ring: 'ring-ocean-100',          wideBg: 'from-ocean-50 to-white',        wideBorder: 'hover:border-ocean-200' },
  'healthcare-services':  { icon: Heart,        bg: 'bg-bright-500/[0.10]',  text: 'text-ocean-700', ring: 'ring-bright-500/[0.20]',  wideBg: 'from-bright-500/[0.08] to-white', wideBorder: 'hover:border-bright-500/40' },
  'laboratory-equipment': { icon: FlaskConical, bg: 'bg-ocean-50',           text: 'text-ocean-700', ring: 'ring-ocean-100',          wideBg: 'from-ocean-50 to-white',        wideBorder: 'hover:border-ocean-200' },
  'healthcare-it':        { icon: Monitor,      bg: 'bg-ocean-50',           text: 'text-ocean-700', ring: 'ring-ocean-100',          wideBg: 'from-ocean-50 to-white',        wideBorder: 'hover:border-ocean-200' },
  'medical-devices':      { icon: Activity,     bg: 'bg-ocean-50',           text: 'text-ocean-700', ring: 'ring-ocean-100',          wideBg: 'from-ocean-50 to-white',        wideBorder: 'hover:border-ocean-200' },
  'medical-imaging':      { icon: Eye,          bg: 'bg-ocean-50',           text: 'text-ocean-700', ring: 'ring-ocean-100',          wideBg: 'from-ocean-50 to-white',        wideBorder: 'hover:border-ocean-200' },
  'therapeutic-area':     { icon: Pill,         bg: 'bg-bright-500/[0.10]',  text: 'text-ocean-700', ring: 'ring-bright-500/[0.20]',  wideBg: 'from-bright-500/[0.08] to-white', wideBorder: 'hover:border-bright-500/40' },
  'life-sciences':        { icon: Leaf,         bg: 'bg-ocean-50',           text: 'text-ocean-700', ring: 'ring-ocean-100',          wideBg: 'from-ocean-50 to-white',        wideBorder: 'hover:border-ocean-200' },
  dental:                 { icon: Smile,        bg: 'bg-bright-500/[0.10]',  text: 'text-ocean-700', ring: 'ring-bright-500/[0.20]',  wideBg: 'from-bright-500/[0.08] to-white', wideBorder: 'hover:border-bright-500/40' },
  pharmaceuticals:        { icon: Atom,         bg: 'bg-ocean-50',           text: 'text-ocean-700', ring: 'ring-ocean-100',          wideBg: 'from-ocean-50 to-white',        wideBorder: 'hover:border-ocean-200' },
  'animal-health':        { icon: PawPrint,     bg: 'bg-bright-500/[0.10]',  text: 'text-ocean-700', ring: 'ring-bright-500/[0.20]',  wideBg: 'from-bright-500/[0.08] to-white', wideBorder: 'hover:border-bright-500/40' },
};

const fallbackStyle: CategoryStyle = {
  icon: Activity,
  bg: 'bg-ocean-50',
  text: 'text-ocean-700',
  ring: 'ring-ocean-100',
  wideBg: 'from-ocean-50 to-white',
  wideBorder: 'hover:border-ocean-200',
};

export default function IndustryCategoriesSection() {
  return (
    <section className="bg-[var(--background)] py-24">
      <Container size="xl">
        <div className="space-y-14">

          {/* Section header */}
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600 px-3 py-1.5 rounded-full bg-ocean-50 border border-ocean-100">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 shrink-0" />
              Industry Coverage
            </span>
            <h2 className="font-display text-3xl md:text-[2.75rem] lg:text-5xl text-slate-900 tracking-tight leading-[1.1]">
              Every Healthcare Sector, Covered
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Deep-dive research across every major healthcare and life sciences vertical —
              from pharma to animal health.
            </p>
          </div>

          {/* 4×3 uniform grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const style = categoryStyles[category.slug] ?? fallbackStyle;
              const Icon = style.icon;

              return (
                <Link
                  key={category.id}
                  href={`/reports?category=${category.slug}`}
                  className="group flex flex-col gap-3.5 p-5 bg-white border border-slate-100 rounded-2xl hover:border-ocean-200 hover:shadow-lg hover:shadow-ocean-100/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${style.bg} ${style.text} ring-1 ${style.ring} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-ocean-700 transition-colors leading-snug">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-ocean-600 opacity-0 group-hover:opacity-100 translate-y-0.5 group-hover:translate-y-0 transition-all duration-200">
                    Explore
                    <ArrowRight className="w-3 h-3" />
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
