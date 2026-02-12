import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Grid, Card, CardContent, Badge, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Healthcare Foresights | Healthcare Consulting Experts",
  description: "Healthcare Foresights is a specialized healthcare consulting firm offering comprehensive advisory services to healthcare providers, life sciences companies, payers, and health technology organizations.",
  keywords: ["about healthcare foresights", "healthcare consulting firm", "healthcare advisory services", "healthcare transformation", "healthcare analytics"],
  alternates: {
    canonical: '/about',
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
              Sustainable Healthcare Transformation Through an Integrated Approach
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-3xl mx-auto">
              We are a specialized healthcare consulting firm offering comprehensive advisory services to healthcare providers, life sciences companies, payers, and health technology organizations.
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
                Our mission is to enable healthcare stakeholders to utilize data for their decision-making process, leading to improved system resilience and providing high-quality healthcare services to patients at a reasonable cost throughout many locations. We use innovative methods and maintain ethical standards to assist healthcare organizations facing challenges from new reimbursement methods, digital technology changes, and increased patient demands.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Who We Are</h2>
              <p className="leading-relaxed mb-4">
                Our firm was founded on the belief that sustainable healthcare transformation requires an integrated approach that combines clinical expertise, regulatory intelligence, operational excellence, and advanced analytics. We assist healthcare providers throughout their operational process by helping them understand regulatory requirements, manage expenses, enhance patient care, and develop strategies for future growth in a market that demands better results.
              </p>
              <p className="leading-relaxed">
                Our team consists of experts who possess multiple professional competencies in clinical practice, healthcare management, health economics, data science, and policy advisory. Our consulting method establishes a direct link between strategic planning and execution, delivering operational recommendations that staff members implement during transformation projects while assisting executives in managing organizational changes and developing new competencies.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Our Services</h2>
              <p className="leading-relaxed">
                Our portfolio includes a range of services that cover strategic planning, market assessment, operational efficiency improvement, revenue cycle management, digital health transformation, regulatory compliance advisory, and performance enhancement programs. We collaborate with hospitals, diagnostic centers, specialty clinics, pharmaceutical and medical device companies, insurers, and emerging health tech firms to create tailored solutions that meet their specific business objectives.
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
                <h3 className="text-xl font-semibold mb-3">Integrated Approach</h3>
                <p className="text-[var(--muted-foreground)]">
                  We combine clinical expertise, regulatory intelligence, operational excellence, and advanced analytics to deliver comprehensive healthcare solutions.
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
                <h3 className="text-xl font-semibold mb-3">Multidisciplinary Experts</h3>
                <p className="text-[var(--muted-foreground)]">
                  Our team possesses professional competencies spanning clinical practice, healthcare management, health economics, data science, and policy advisory.
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
                <h3 className="text-xl font-semibold mb-3">Data-Driven Insights</h3>
                <p className="text-[var(--muted-foreground)]">
                  We apply real-world data, benchmarking insights, and international best practices to achieve better financial outcomes and improved patient care.
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
                <h3 className="text-xl font-semibold mb-3">Execution Focused</h3>
                <p className="text-[var(--muted-foreground)]">
                  Our consulting method establishes a direct link between strategic planning and execution, ensuring recommendations translate into real results.
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
                <h3 className="text-xl font-semibold mb-3">Tailored Solutions</h3>
                <p className="text-[var(--muted-foreground)]">
                  We collaborate with hospitals, clinics, pharmaceutical companies, insurers, and health tech firms to create solutions that meet their specific business objectives.
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
                <h3 className="text-xl font-semibold mb-3">Sustainable Value</h3>
                <p className="text-[var(--muted-foreground)]">
                  We focus on achieving measurable results, reducing potential risks, and creating lasting value across clinical, business, and customer service operations.
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
                <div className="text-sm text-[var(--muted-foreground)]">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">1000+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Healthcare Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">50+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Specialists on Team</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">10+</div>
                <div className="text-sm text-[var(--muted-foreground)]">Years Experience</div>
              </div>
            </Grid>

            <div className="space-y-6 text-lg text-[var(--muted-foreground)]">
              <p className="leading-relaxed">
                We assist clients in achieving operational improvement through the application of real-world data and benchmarking insights and international best practices, resulting in better financial outcomes and improved patient care systems.
              </p>
              <p className="leading-relaxed">
                Our organization assists healthcare providers throughout their operational process by helping them understand regulatory requirements, manage expenses, enhance patient care, and develop strategies for future growth in a market that demands better results.
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
