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
  title: "Healthcare Foresights | Healthcare Market Insights & Research Reports",
  description: "Healthcare Foresights delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  keywords: ["healthcare foresights", "healthcare market research", "healthcare insights", "healthcare industry trends", "medical market analysis", "healthcare reports"],
  alternates: {
    canonical: 'https://www.healthcareforesights.com',
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
