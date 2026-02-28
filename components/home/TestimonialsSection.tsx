'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, Container } from '@/components/ui';
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

function getInitials(company: string): string {
  return company
    .split(' ')
    .filter((w) => w.length > 0 && !['of', 'the', 'and'].includes(w.toLowerCase()))
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'text-bright-500' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / ITEMS_PER_SLIDE);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const currentTestimonials = testimonials.slice(
    currentIndex * ITEMS_PER_SLIDE,
    (currentIndex + 1) * ITEMS_PER_SLIDE
  );

  return (
    <Section padding="xl" background="muted">
      <Container size="xl">
        <div className="space-y-14">

          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600 px-3 py-1.5 rounded-full bg-ocean-50 border border-ocean-100">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 shrink-0" />
              Client Stories
            </span>
            <h2 className="text-3xl md:text-4xl text-slate-900 tracking-tight">
              Trusted by Industry Leaders
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">
              What healthcare executives and research teams say about Synaptic Research.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-ocean-50/70 hover:border-ocean-100 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Gradient accent stripe */}
                <div className="h-[3px] bg-gradient-to-r from-ocean-600 via-ocean-400 to-ocean-300 shrink-0" />

                <div className="flex flex-col flex-1 p-6">
                  {/* Top row: rating */}
                  <div className="flex items-center justify-between mb-5">
                    <StarRating rating={testimonial.rating} />
                    <svg
                      className="w-9 h-9 text-ocean-200/70"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-600 leading-[1.8] flex-1 mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-500 to-ocean-700 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                      {getInitials(testimonial.company)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {testimonial.company} · {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-ocean-50 hover:border-ocean-200 hover:text-ocean-600 transition-all duration-200"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-ocean-600 to-ocean-400'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-ocean-50 hover:border-ocean-200 hover:text-ocean-600 transition-all duration-200"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </Container>
    </Section>
  );
}
