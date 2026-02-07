import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container, Badge } from "@/components/ui";
import { getPressReleases, getPressReleaseBySlug, isApiError } from "@/lib/api";
import type { Metadata } from "next";

interface PressReleasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const response = await getPressReleases({ status: 'published', limit: 100 });

  if (isApiError(response)) {
    console.error('Failed to fetch press releases for static params:', response.message);
    return [];
  }

  return response.data.map((pressRelease) => ({
    slug: pressRelease.slug,
  }));
}

export async function generateMetadata({ params }: PressReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await getPressReleaseBySlug(slug);

  if (isApiError(response)) {
    return {
      title: "Press Release Not Found",
    };
  }

  const pressRelease = response.data;

  return {
    title: pressRelease.title,
    description: pressRelease.excerpt,
    keywords: ["healthcare press releases", "healthcare news", "industry announcements", "healthcare market updates"],
    openGraph: {
      title: pressRelease.title,
      description: pressRelease.excerpt,
      type: "article",
      publishedTime: pressRelease.date,
      authors: [pressRelease.author],
    },
  };
}

export default async function PressReleaseDetailPage({ params }: PressReleasePageProps) {
  const { slug } = await params;
  const response = await getPressReleaseBySlug(slug);

  if (isApiError(response)) {
    notFound();
  }

  const pressRelease = response.data;

  const paragraphs = pressRelease.content.split("\n\n");

  return (
    <>
      <Section className="bg-[var(--muted)]">
        <Container size="sm">
          <div className="mb-6">
            <Link
              href="/press-releases"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors inline-flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Press Releases
            </Link>
          </div>

          <div className="mb-6">
            <Badge variant="default">{pressRelease.category}</Badge>
          </div>

          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            {pressRelease.title}
          </h1>

          <p className="text-xl text-[var(--muted-foreground)] mb-8 leading-relaxed">
            {pressRelease.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)] pb-8 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold">
                {pressRelease.author.split(" ").map(n => n[0]).join("")}
              </div>
              <span className="font-medium text-[var(--foreground)]">{pressRelease.author}</span>
            </div>
            <span>•</span>
            <time>{pressRelease.date}</time>
            <span>•</span>
            <span>{pressRelease.readTime}</span>
            {pressRelease.location && (
              <>
                <span>•</span>
                <span>{pressRelease.location}</span>
              </>
            )}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <article className="prose prose-lg max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-[var(--foreground)] leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              >
              </p>
            ))}
          </article>

          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <Link
              href="/press-releases"
              className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6"/>
              </svg>
              View all press releases
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
