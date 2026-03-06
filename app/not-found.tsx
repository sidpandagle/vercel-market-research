"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Section, Container, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from "@/components/ui";

export default function NotFoundPage() {
  const [attemptedUrl, setAttemptedUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    attemptedUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Capture the URL that was attempted
    if (typeof window !== "undefined") {
      const url = window.location.pathname;
      setAttemptedUrl(url);
      setFormData(prev => ({ ...prev, attemptedUrl: url }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold">Page Not Found</h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              The report or page you are looking for does not exist or may have been moved. Let us help you find what you need.
            </p>
          </div>
        </Container>
      </Section>

      <Section padding="xl">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Quick Links Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                <p className="text-[var(--muted-foreground)] mb-6">
                  You might find what you are looking for in these sections:
                </p>
              </div>

              <div className="space-y-4">
                <Link href="/industry">
                  <Card hover className="cursor-pointer transition-all">
                    <CardContent className="flex items-start gap-4 pt-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Browse All Reports</h4>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          Explore our complete library of healthcare market research reports
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/services">
                  <Card hover className="cursor-pointer transition-all">
                    <CardContent className="flex items-start gap-4 pt-6">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Our Services</h4>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          Learn about our custom research and consulting services
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/contact">
                  <Card hover className="cursor-pointer transition-all">
                    <CardContent className="flex items-start gap-4 pt-6">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Contact Us</h4>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          Get in touch with our team for personalized assistance
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/">
                  <Card hover className="cursor-pointer transition-all">
                    <CardContent className="flex items-start gap-4 pt-6">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Back to Home</h4>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          Return to our homepage to start fresh
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Help Form Section */}
            <div>
              <Card>
                <CardHeader>
                  <Badge variant="primary" size="sm" className="mb-2 w-fit">
                    We Can Help
                  </Badge>
                  <CardTitle>Cannot Find What You Are Looking For?</CardTitle>
                  <CardDescription>
                    Tell us what you are searching for and we will help you find the right research report.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="py-8 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                      <p className="text-[var(--muted-foreground)]">
                        We have received your request. Our team will reach out within 24 hours to help you find what you need.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <label htmlFor="interest" className="block text-sm font-medium mb-2">
                          What Are You Looking For? *
                        </label>
                        <textarea
                          id="interest"
                          name="interest"
                          required
                          rows={4}
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none bg-[var(--background)]"
                          placeholder="E.g., Telemedicine market trends, AI in healthcare diagnostics, medical devices industry analysis..."
                        />
                        {attemptedUrl && (
                          <p className="text-xs text-[var(--muted-foreground)] mt-1">
                            You were trying to access: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{attemptedUrl}</code>
                          </p>
                        )}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Our team will review your request and send you relevant report recommendations within 24 hours.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Help Me Find It"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
