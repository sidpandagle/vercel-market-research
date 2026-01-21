import { Section, Container, Grid, Skeleton } from "@/components/ui";

export default function PressReleasesLoading() {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-6 w-[600px]" />
        </div>

        <Grid cols={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-8 w-full mb-3" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-4/5 mb-4" />
              <div className="flex items-center justify-between mt-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
