import { Section, Container, Grid, SkeletonCard, SkeletonText } from '@/components/ui';

export default function TestimonialsSectionSkeleton() {
  return (
    <Section padding="lg">
      <Container size="xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <SkeletonText lines={1} className="h-10 w-80 mx-auto" />
            <SkeletonText lines={1} className="h-6 w-64 mx-auto" />
          </div>

          <Grid cols={3} gap="lg">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} hasAvatar hasImage={false} />
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
