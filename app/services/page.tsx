import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Grid, Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Healthcare Research & Consulting Services | Healthcare Foresights",
  description: "Explore healthcare research services including market analysis, custom reports, consulting, forecasting, and strategic insights.",
  keywords: ["healthcare research services", "healthcare consulting", "custom healthcare reports", "market analysis services"],
  alternates: {
    canonical: 'https://www.healthcareforesights.com/services',
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Syndicated Research Reports</CardTitle>
                <CardDescription className="text-base">
                  Pre-published, ready-to-access market intelligence reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  Our syndicated reports provide comprehensive market analysis covering market size, trends, competitive landscape, and forecasts. Perfect for quick market insights and strategic planning.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      500+ market reports across healthcare sectors
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      5-10 year market forecasts with CAGR analysis
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Detailed segmentation and regional analysis
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Competitive landscape with key player profiles
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      PDF & Excel formats for easy analysis
                    </li>
                  </ul>
                </div>

                <Link href="/reports">
                  <Button variant="primary" className="mt-4">
                    Browse Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-600">
              <CardHeader>
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Custom Research</CardTitle>
                <CardDescription className="text-base">
                  Tailored research projects designed for your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  When off-the-shelf research is not enough, our custom research services provide targeted insights aligned with your unique business questions and strategic objectives.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">What We Offer:</h4>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Market opportunity assessments
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Competitive intelligence studies
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Product launch and positioning research
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      M&A target screening and due diligence
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Voice of customer and stakeholder research
                    </li>
                  </ul>
                </div>

                <Link href="/contact">
                  <Button variant="primary" className="mt-4">
                    Request Custom Research
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Consulting & Advisory</CardTitle>
                <CardDescription className="text-base">
                  Strategic guidance from our team of healthcare experts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  Leverage our deep industry expertise and analytical capabilities to support your strategic initiatives, from market entry strategies to portfolio optimization.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Consulting Services:</h4>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Market entry strategy development
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Business model innovation and validation
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Product portfolio optimization
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Commercial strategy and go-to-market planning
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Expert witness and litigation support
                    </li>
                  </ul>
                </div>

                <Link href="/contact">
                  <Button variant="primary" className="mt-4">
                    Explore Consulting
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-orange-600">
              <CardHeader>
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Data & Analytics</CardTitle>
                <CardDescription className="text-base">
                  Advanced data solutions and predictive analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[var(--muted-foreground)]">
                  Access our proprietary databases and leverage advanced analytics to uncover hidden patterns, forecast trends, and support data-driven decision making.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Analytics Services:</h4>
                  <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Market sizing and forecasting models
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Pricing analytics and optimization
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Epidemiological modeling and patient flow analysis
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Competitive benchmarking dashboards
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Scenario planning and risk analysis
                    </li>
                  </ul>
                </div>

                <Link href="/contact">
                  <Button variant="primary" className="mt-4">
                    Learn More
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
