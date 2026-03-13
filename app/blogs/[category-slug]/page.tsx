import { Suspense } from "react";
import BlogListingClient from "@/components/blog/BlogListingClient";
import { getBlogsByCategory, getCategories, isApiError } from "@/lib/api";
import BlogLoading from "@/app/blog/loading";
import type { Metadata } from "next";

export const revalidate = 300;

function formatSlug(slug: string): string {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

interface PageProps {
  params: Promise<{ "category-slug": string }>;
}

export async function generateStaticParams() {
  const response = await getCategories({ limit: 200 });
  if (isApiError(response) || !response.data) return [];
  return response.data.map((cat) => ({ "category-slug": cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "category-slug": categorySlug } = await params;
  const response = await getCategories({ limit: 200 });
  const categoryName = isApiError(response) || !response.data
    ? formatSlug(categorySlug)
    : (response.data.find((c) => c.slug === categorySlug)?.name ?? formatSlug(categorySlug));

  return {
    title: `${categoryName} Blog Articles | Healthcare Foresights`,
    description: `Read expert blog articles on ${categoryName} — healthcare trends, innovations, and industry analysis.`,
    alternates: {
      canonical: `/blogs/${categorySlug}`,
    },
  };
}

async function BlogCategoryContent({ categorySlug }: { categorySlug: string }) {
  const response = await getBlogsByCategory(categorySlug, { page: 1, limit: 10 });

  if (isApiError(response)) {
    console.error("Failed to fetch blogs by category:", response.message);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Articles</h2>
          <p className="text-gray-600">{response.message}</p>
        </div>
      </div>
    );
  }

  const totalItems = response.meta?.totalItems ?? response.data.length;
  const totalPages = response.meta?.totalPages ?? 1;

  return (
    <BlogListingClient
      blogs={response.data}
      totalItems={totalItems}
      totalPages={totalPages}
      activeCategorySlug={categorySlug}
    />
  );
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { "category-slug": categorySlug } = await params;

  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogCategoryContent categorySlug={categorySlug} />
    </Suspense>
  );
}
