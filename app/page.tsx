import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  HeroSection,
  FeaturedReportsSection,
  IndustryCategoriesSection,
  StatsSection,
  TrustedPartnersSection,
  TestimonialsSection,
  CTASection,
  StatsSectionSkeleton,
  TestimonialsSectionSkeleton,
} from '@/components/home';

export const metadata: Metadata = {
  title: "Synaptic Research | Healthcare Market Insights & Research Reports",
  description: "Synaptic Research delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  keywords: ["synaptic research", "healthcare market research", "healthcare insights", "healthcare industry trends", "medical market analysis", "healthcare reports"],
  alternates: {
    canonical: 'https://www.synapticresearch.com',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedReportsSection />
      <IndustryCategoriesSection />

      <Suspense fallback={<StatsSectionSkeleton />}>
        <StatsSection />
      </Suspense>

      <TrustedPartnersSection />

      <Suspense fallback={<TestimonialsSectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <CTASection />
    </>
  );
}
