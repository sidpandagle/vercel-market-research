import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Grid, Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Healthcare Research & Consulting Services | Healthcare Foresights",
  description: "Explore healthcare research services including market analysis, custom reports, consulting, forecasting, and strategic insights.",
  keywords: ["healthcare research services", "healthcare consulting", "custom healthcare reports", "market analysis services"],
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-4">
            <Badge variant="primary" size="md">
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Comprehensive Healthcare Market Intelligence
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto">
              From syndicated reports to bespoke research solutions, we provide the insights you need to make confident strategic decisions.
            </p>
          </div>
        </Container>
      </Section>

      <Section padding="xl">
        <Container size="xl">
          <Grid cols={2} gap="xl">
            <Card className="border-t-4 border-t-blue-600">
              <CardHeader>
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Competitive Intelligence Services</CardTitle>
                <CardDescription className="text-base">
                  Competitor profiling, market and pipeline analysis, pricing and positioning assessment, and business model benchmarking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  The competitive intelligence services include competitor profiling, market and pipeline analysis, pricing and positioning assessment, and product service and business model benchmarking. Consultants use public data, proprietary data, regulatory filings, clinical trial data, patent information, and commercial strategies to develop practical solutions.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Services Include:</h4>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    {[
                      "Competitor profiling and company benchmarking",
                      "Market and pipeline analysis",
                      "Pricing and positioning assessment",
                      "Product, service, and business model benchmarking",
                      "Regulatory filings and clinical trial data analysis",
                      "Patent information and IP landscape review",
                      "Strategic planning and investment decision support",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact">
                  <Button variant="primary" className="mt-4">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-600">
              <CardHeader>
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Forecasting Services</CardTitle>
                <CardDescription className="text-base">
                  Precise forecasts using historical data analysis, statistical modeling, scenario planning, and expert judgment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  Forecasting services use historical data analysis with statistical modeling together with scenario planning and expert judgment to produce precise forecasts. Consultants combine epidemiological trends with policy changes, technology adoption rates, and competitive dynamics to reflect real-world complications.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Services Include:</h4>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    {[
                      "Market size and growth forecasting",
                      "Demand and utilization forecasting",
                      "Revenue and pricing projections",
                      "Capacity planning and supply chain forecasting",
                      "Scenario planning (best-case, base-case, worst-case)",
                      "Product lifecycle and launch planning forecasts",
                      "Pipeline development and investment feasibility assessment",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact">
                  <Button variant="primary" className="mt-4">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Desktop Research Partnership Services</CardTitle>
                <CardDescription className="text-base">
                  Ongoing or project-based research partnerships delivering market landscapes, competitive analysis, and trend tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  The organization delivers desktop research services through ongoing relationships or specific project-based partnerships. Consultants function as additional members of the client team to develop market research products, including market landscapes, competitive analysis, trend tracking, technology assessments, policy and regulatory reviews, and data validation.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Services Include:</h4>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    {[
                      "Market landscape development",
                      "Competitive analysis and benchmarking",
                      "Trend tracking and monitoring",
                      "Technology assessments",
                      "Policy and regulatory reviews",
                      "Market entry studies and therapeutic area evaluation",
                      "Pricing and reimbursement assessment",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact">
                  <Button variant="primary" className="mt-4">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-orange-600">
              <CardHeader>
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Customized/Adhoc Services</CardTitle>
                <CardDescription className="text-base">
                  Tailored solutions addressing immediate operational needs and unique challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  The Customized/Adhoc Services offer businesses specific solutions that address their immediate operational needs and help them overcome unique challenges. The service provides customized support allowing organizations to address their needs through specific operational requirements and project delivery timelines.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Services Include:</h4>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    {[
                      "Custom research and analysis projects",
                      "Targeted market intelligence reports",
                      "Adhoc competitive landscape assessments",
                      "Specific operational and strategic advisory",
                      "Tailored data collection and synthesis",
                      "Quick-turnaround strategic briefings",
                      "Bespoke forecasting and modeling support",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact">
                  <Button variant="primary" className="mt-4">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Section background="muted" padding="xl">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Research Process</h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              A rigorous methodology ensuring accuracy and actionable insights
            </p>
          </div>

          <Grid cols={4} gap="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Data Collection</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Primary and secondary research from multiple verified sources
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Analysis</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Expert analysis using advanced statistical and qualitative methods
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Validation</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Multi-layer validation by domain experts and quality assurance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Delivery</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Comprehensive reporting with actionable recommendations
              </p>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section padding="xl">
        <Container size="md">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
            <CardContent className="py-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
                <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                  Whether you need a syndicated report or a comprehensive custom research project, we are here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Contact Our Team
                    </Button>
                  </Link>
                  <Link href="/request-demo">
                    <Button variant="outline" size="lg">
                      Schedule a Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
}
