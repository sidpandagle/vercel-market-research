import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getReports } from '@/lib/api/reports';
import { ReportsListingClient } from '@/components/reports';
import ReportsSkeleton from '@/components/reports/ReportsSkeleton';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Neograph Analytics Reports & Industry Analysis",
  description: "Browse in-depth neograph analytics reports covering industry trends, competitive analysis, forecasts, and strategic insights.",
  keywords: ["healthcare reports", "neograph analytics", "medical industry reports", "healthcare forecast", "healthcare industry analysis"],
  alternates: {
    canonical: '/reports',
  },
};

async function ReportsContent() {
  const result = await getReports();
  const reports = result.success ? result.data : [];
  return <ReportsListingClient reports={reports} />;
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<ReportsSkeleton />}>
      <ReportsContent />
    </Suspense>
  );
}
