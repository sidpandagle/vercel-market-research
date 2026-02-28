import { Section, Container, Grid, Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { truncate } from '@/lib/utils';
import categories from '@/data/categories.json';

export default function IndustryCategoriesSection() {
  return (
    <Section padding="sm">
      <Container size="xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              Industry Coverage
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Comprehensive research across key healthcare sectors
            </p>
          </div>

          <Grid cols={3} gap="md">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>
                    {truncate(category.description, 80)}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
