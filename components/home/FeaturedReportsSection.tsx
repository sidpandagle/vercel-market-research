import Link from 'next/link';
import { Section, Container, Grid, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { getReports, isApiError } from '@/lib/api';

export default async function FeaturedReportsSection() {
  const response = await getReports({
    status: 'published',
    limit: 3,
  });

  if (isApiError(response) || response.data.length === 0) {
    return null;
  }

  const featuredReports = response.data;

  return (
    <Section background="muted" padding="sm">
      <Container size="xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              Featured Research
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Explore our latest market research reports and gain actionable insights
            </p>
          </div>

          <Grid cols={3} gap="lg">
            {featuredReports.map((report) => (
              <Link key={report.id} href={`/reports/${report.slug}`} className="block h-full">
                <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="primary" size="sm">
                        {report.category}
                      </Badge>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {formatDate(report.date)}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1" style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <CardDescription className="line-clamp-4">{report.summary}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">
                      Read More →
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </Grid>

          <div className="text-center mt-8">
            <Link href="/industry">
              <Button variant="outline" size="md">
                View All Reports
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
