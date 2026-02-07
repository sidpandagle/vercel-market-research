import { Section, Container, Grid } from "@/components/ui";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogs, isApiError } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Insights Blog | Trends, News & Analysis",
  description: "Read expert blogs on healthcare trends, innovations, policy updates, market developments, and industry insights.",
  keywords: ["healthcare blog", "healthcare insights", "healthcare trends", "medical industry news", "healthcare analysis"],
};

// Enable ISR with 5-minute revalidation
export const revalidate = 300;

export default async function BlogPage() {
  // Fetch blogs from API
  const response = await getBlogs({ status: 'published', limit: 100 });

  // Handle API errors
  if (isApiError(response)) {
    console.error('Failed to fetch blogs:', response.message);
    return (
      <Section>
        <Container>
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Insights & Analysis</h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
              Unable to load blog posts at this time. Please try again later.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  const blogs = response.data;

  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Insights & Analysis</h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
            Expert perspectives on healthcare market trends, emerging technologies, and industry transformations.
          </p>
        </div>

        <Grid cols={3}>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              slug={blog.slug}
              title={blog.title}
              excerpt={blog.excerpt}
              category={blog.category}
              author={blog.author}
              date={blog.date}
              readTime={blog.readTime}
              location={blog.location}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
