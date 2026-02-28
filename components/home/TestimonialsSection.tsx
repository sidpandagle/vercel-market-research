'use client';

import { useState } from 'react';
import { Section, Container, Card, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui';
import testimonialsData from '@/data/testimonials.json';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = testimonialsData;
const ITEMS_PER_SLIDE = 3;

function getCompanyInitials(company: string): string {
  return company
    .split(' ')
    .filter(word => word.length > 0 && !['of', 'the', 'and'].includes(word.toLowerCase()))
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / ITEMS_PER_SLIDE);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonials = testimonials.slice(
    currentIndex * ITEMS_PER_SLIDE,
    (currentIndex + 1) * ITEMS_PER_SLIDE
  );

  return (
    <Section padding="sm">
      <Container size="xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              What our clients say about our research
            </p>
          </div>

          {/* Testimonials Slider */}
          <div className="relative">
            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border h-full">
                  <CardContent className="space-y-4 flex flex-col h-full">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-8 h-8 text-[var(--primary)] opacity-50"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>

                    <CardDescription className="text-base leading-relaxed flex-grow">
                      {testimonial.quote}
                    </CardDescription>

                    <div className="flex-shrink-0 pt-4 border-t border-[var(--border)] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-semibold">
                            {getCompanyInitials(testimonial.company)}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-sm truncate">
                            {testimonial.role}
                          </CardTitle>
                          <CardDescription className="text-sm font-medium truncate">
                            {testimonial.company}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.location}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors duration-200"
                aria-label="Previous testimonials"
              >
                <svg
                  className="w-5 h-5 text-[var(--foreground)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'w-8 bg-[var(--primary)]'
                        : 'w-2 bg-[var(--muted-foreground)] opacity-30 hover:opacity-50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors duration-200"
                aria-label="Next testimonials"
              >
                <svg
                  className="w-5 h-5 text-[var(--foreground)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
