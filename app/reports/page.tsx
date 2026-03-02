import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllJsonReports, jsonReportToUIReport } from '@/lib/jsonReports';
import { ReportsListingClient } from '@/components/reports';
import ReportsSkeleton from '@/components/reports/ReportsSkeleton';

export const metadata: Metadata = {
  title: "Healthcare Market Research Reports & Industry Analysis",
  description: "Browse in-depth healthcare market research reports covering industry trends, competitive analysis, forecasts, and strategic insights.",
  keywords: ["healthcare reports", "healthcare market research", "medical industry reports", "healthcare forecast", "healthcare industry analysis"],
  alternates: {
    canonical: '/reports',
  },
};

function ReportsContent() {
  const reports = getAllJsonReports().map(jsonReportToUIReport);
  return <ReportsListingClient reports={reports} />;
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<ReportsSkeleton />}>
      <ReportsContent />
    </Suspense>
  );
}
