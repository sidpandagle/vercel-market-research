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
import { Section, Container } from '@/components/ui';
import categories from '@/data/categories.json';

interface CategoryStyle {
  icon: ElementType;
  bg: string;
  text: string;
  ring: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  biotechnology:        { icon: Dna,          bg: 'bg-ocean-50',  text: 'text-ocean-700', ring: 'ring-ocean-100' },
  'clinical-diagnostics': { icon: Microscope,  bg: 'bg-ocean-50',  text: 'text-ocean-700', ring: 'ring-ocean-100' },
  'healthcare-services':  { icon: Heart,        bg: 'bg-amber-50',  text: 'text-amber-600', ring: 'ring-amber-100' },
  'laboratory-equipment': { icon: FlaskConical, bg: 'bg-ocean-50',  text: 'text-ocean-700', ring: 'ring-ocean-100' },
  'healthcare-it':        { icon: Monitor,      bg: 'bg-ocean-50',  text: 'text-ocean-700', ring: 'ring-ocean-100' },
  'medical-devices':      { icon: Activity,     bg: 'bg-ocean-50',  text: 'text-ocean-700', ring: 'ring-ocean-100' },
  'medical-imaging':      { icon: Eye,          bg: 'bg-ocean-50',  text: 'text-ocean-700', ring: 'ring-ocean-100' },
  'therapeutic-area':     { icon: Pill,         bg: 'bg-amber-50',  text: 'text-amber-600', ring: 'ring-amber-100' },
  'life-sciences':        { icon: Leaf,         bg: 'bg-ocean-50',  text: 'text-ocean-700', ring: 'ring-ocean-100' },
  dental:                 { icon: Smile,        bg: 'bg-amber-50',  text: 'text-amber-600', ring: 'ring-amber-100' },
  pharmaceuticals:        { icon: Atom,         bg: 'bg-ocean-50',  text: 'text-ocean-700', ring: 'ring-ocean-100' },
  'animal-health':        { icon: PawPrint,     bg: 'bg-amber-50',  text: 'text-amber-600', ring: 'ring-amber-100' },
};

const fallbackStyle: CategoryStyle = {
  icon: Activity,
  bg: 'bg-slate-50',
  text: 'text-slate-600',
  ring: 'ring-slate-100',
};

export default function IndustryCategoriesSection() {
  return (
    <Section padding="xl" background="default">
      <Container size="xl">
        <div className="space-y-14">

          {/* Section header */}
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600 px-3 py-1.5 rounded-full bg-ocean-50 border border-ocean-100">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 shrink-0" />
              Industry Coverage
            </span>
            <h2 className="text-3xl md:text-4xl text-slate-900 tracking-tight">
              Every Healthcare Sector, Covered
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">
              Deep-dive research across every major healthcare and life sciences vertical.
            </p>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const style = categoryStyles[category.slug] ?? fallbackStyle;
              const Icon = style.icon;
              return (
                <Link
                  key={category.id}
                  href={`/reports?category=${category.slug}`}
                  className="group flex flex-col gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-ocean-200 hover:shadow-xl hover:shadow-ocean-100/50 hover:-translate-y-1 transition-all duration-200"
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
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-ocean-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Explore
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </Container>
    </Section>
  );
}
