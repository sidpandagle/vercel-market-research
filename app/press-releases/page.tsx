import { Section, Container, Grid } from "@/components/ui";
import { PressReleaseCard } from "@/components/press-releases/PressReleaseCard";
import { getPressReleases, isApiError } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Press Releases & Industry News",
  description: "Stay updated with the latest healthcare press releases, research announcements, and industry developments.",
  keywords: ["healthcare press releases", "healthcare news", "industry announcements", "healthcare market updates"],
  alternates: {
    canonical: '/press-releases',
  },
};

// Enable ISR with 5-minute revalidation
export const revalidate = 300;

export default async function PressReleasesPage() {
  // Fetch press releases from API
  const response = await getPressReleases({ status: 'published', limit: 100 });

  // Handle API errors
  if (isApiError(response)) {
    console.error('Failed to fetch press releases:', response.message);
    return (
      <Section>
        <Container>
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Press Releases</h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
              Unable to load press releases at this time. Please try again later.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  const pressReleases = response.data;

  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Press Releases</h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
            Latest news and announcements from Healthcare Foresights. Stay informed about our research publications and industry insights.
          </p>
        </div>

        <Grid cols={3}>
          {pressReleases.map((pressRelease) => (
            <PressReleaseCard
              key={pressRelease.id}
              slug={pressRelease.slug}
              title={pressRelease.title}
              excerpt={pressRelease.excerpt}
              category={pressRelease.category}
              author={pressRelease.author}
              date={pressRelease.date}
              readTime={pressRelease.readTime}
              location={pressRelease.location}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
