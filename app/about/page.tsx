import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Grid, Card, CardContent, Badge, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Healthcare Foresights | Healthcare Research Experts",
  description: "Learn about Healthcare Foresights, our expertise in healthcare market research, industry analysis, and data-driven intelligence.",
  keywords: ["about healthcare foresights", "healthcare research company", "healthcare market experts", "healthcare consulting"],
  alternates: {
    canonical: 'https://www.healthcareforesights.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-4">
            <Badge variant="primary" size="md">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Empowering Healthcare Decisions with Trusted Intelligence
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto">
              For over a decade, we have been the go-to source for healthcare market intelligence, helping organizations make informed strategic decisions.
            </p>
          </div>
        </Container>
      </Section>

      <Section padding="xl">
        <Container size="lg">
          <div className="max-w-3xl mx-auto space-y-8 text-lg text-[var(--muted-foreground)]">
            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                Healthcare Foresights is dedicated to delivering comprehensive, data-driven market intelligence that empowers healthcare organizations, investors, and industry leaders to make confident strategic decisions. We bridge the gap between complex market dynamics and actionable insights.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Who We Are</h2>
              <p className="leading-relaxed mb-4">
                We are a team of healthcare industry experts, research analysts, and data scientists passionate about uncovering market trends and providing strategic guidance. Our multidisciplinary approach combines clinical expertise, business acumen, and advanced analytics to deliver unparalleled market intelligence.
              </p>
              <p className="leading-relaxed">
                With offices across major healthcare hubs and a global network of industry contacts, we maintain a pulse on emerging trends, regulatory changes, and technological innovations shaping the healthcare landscape.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="muted" padding="xl">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              What sets us apart in the healthcare research industry
            </p>
          </div>

          <Grid cols={3} gap="lg">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Rigorous Methodology</h3>
                <p className="text-[var(--muted-foreground)]">
                  Our research methodology combines primary research with extensive secondary sources, ensuring accuracy and reliability in every report.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Analysts</h3>
                <p className="text-[var(--muted-foreground)]">
                  Our team comprises seasoned healthcare professionals, MBAs, and PhDs with deep domain expertise across all healthcare sectors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
                <p className="text-[var(--muted-foreground)]">
                  We track healthcare markets across 50+ countries, providing both global perspectives and regional deep dives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Timely Updates</h3>
                <p className="text-[var(--muted-foreground)]">
                  Stay ahead with quarterly updates on market developments, regulatory changes, and emerging trends in your sector.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom Solutions</h3>
                <p className="text-[var(--muted-foreground)]">
                  Beyond syndicated reports, we offer bespoke research tailored to your specific strategic questions and needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Client Support</h3>
                <p className="text-[var(--muted-foreground)]">
                  Dedicated account managers and post-purchase analyst support ensure you extract maximum value from our research.
                </p>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Section padding="xl">
        <Container size="lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Impact</h2>
            
            <Grid cols={4} gap="lg" className="mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">500+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Research Reports</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">1000+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">50+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Countries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">10+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Years Experience</div>
              </div>
            </Grid>

            <div className="space-y-6 text-lg text-[var(--muted-foreground)]">
              <p className="leading-relaxed">
                Our research has informed strategic decisions at leading pharmaceutical companies, medical device manufacturers, healthcare providers, private equity firms, and consulting organizations worldwide.
              </p>
              <p className="leading-relaxed">
                From guiding multi-million dollar investments to shaping product development roadmaps, our insights have tangible impact on the healthcare industrys evolution.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="muted" padding="xl">
        <Container size="md">
          <Card className="border-l-4 border-l-[var(--primary)]">
            <CardContent className="py-8">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">Ready to Work With Us?</h2>
                <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                  Join leading healthcare organizations that trust our research to drive their strategic initiatives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/reports">
                    <Button variant="outline" size="lg">
                      Browse Reports
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
