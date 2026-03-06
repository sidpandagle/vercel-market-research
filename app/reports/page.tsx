import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ReportsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  if (category) {
    redirect(`/industry/${category}`);
  }
  redirect('/industry');
}
