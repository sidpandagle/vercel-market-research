import { notFound } from 'next/navigation';
import { getAuthorById, getReportsByAuthorId, isApiError } from '@/lib/api';
import { Breadcrumb } from '@/components/ui';
import AuthorProfile from '@/components/authors/AuthorProfile';
import AuthorReportsListing from '@/components/authors/AuthorReportsListing';
import type { Metadata } from 'next';

// Enable ISR with 10-minute revalidation
export const revalidate = 600;

export async function generateStaticParams() {
  // Generate static pages for top 50 authors
  // In production, fetch from API or database
  const authorIds = Array.from({ length: 50 }, (_, i) => i + 1);

  return authorIds.map((id) => ({
    id: id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const authorId = parseInt(id);

    if (isNaN(authorId)) {
      return {
        title: 'Author Not Found',
      };
    }

    const response = await getAuthorById(authorId);

    if (isApiError(response)) {
      return {
        title: 'Author Not Found',
      };
    }

    const author = response.data;

    return {
      title: `Healthcare Articles by ${author.name}`,
      description: `Browse healthcare market articles, insights, and research content published by ${author.name}.`,
      keywords: ["healthcare articles", "healthcare research blogs", "market insights", "medical industry content"],
      openGraph: {
        title: `Healthcare Articles by ${author.name}`,
        description: `Browse healthcare market articles, insights, and research content published by ${author.name}.`,
        images: author.imageUrl ? [{ url: author.imageUrl }] : [],
      },
    };
  } catch {
    return { title: 'Author Not Found' };
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const authorId = parseInt(id);

  // Validate numeric ID
  if (isNaN(authorId)) {
    notFound();
  }

  // Parallel fetch: author + reports
  let authorResponse;
  let reportsResponse;
  try {
    [authorResponse, reportsResponse] = await Promise.all([
      getAuthorById(authorId),
      getReportsByAuthorId(authorId, { status: 'published', limit: 1000 }),
    ]);
  } catch {
    notFound();
  }

  // Error handling
  if (isApiError(authorResponse)) {
    console.error('Failed to fetch author:', authorResponse.message);
    notFound();
  }

  const author = authorResponse.data;
  const reports = isApiError(reportsResponse) ? [] : reportsResponse.data;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Authors', href: '/authors' },
    { label: author.name },
  ];

  return (
    <div className="bg-[var(--background)]">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <AuthorProfile author={author} totalReports={reports.length} />
        <AuthorReportsListing reports={reports} authorName={author.name} />
      </div>
    </div>
  );
}
