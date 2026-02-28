import { Section, Container, Grid } from '@/components/ui';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '500+', label: 'Research Reports' },
  { value: '50+', label: 'Countries Covered' },
  { value: '20+', label: 'Industry Sectors' },
  { value: '1000+', label: 'Enterprise Clients' },
];

export default function StatsSection() {
  return (
    <Section background="card" padding="sm">
      <Container size="xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              Why Choose Us
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Trusted by healthcare organizations worldwide
            </p>
          </div>

          <Grid cols={4} gap="lg">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-[var(--primary)]">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg text-[var(--muted-foreground)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
