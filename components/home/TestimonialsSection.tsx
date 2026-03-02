'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const dim = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${dim} ${i < rating ? 'text-bright-500' : 'text-white/[0.12]'}`}
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

  const [featured, ...secondary] = currentTestimonials;

  return (
    <section className="bg-stone-50 py-24 relative overflow-hidden">

      {/* Background textures */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-ocean-500/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-bright-500/[0.07] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600 px-3 py-1.5 rounded-full bg-ocean-500/[0.10] border border-ocean-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 shrink-0" />
            Client Stories
          </span>
          <h2 className="font-display text-3xl md:text-[2.75rem] lg:text-5xl text-stone-900 tracking-tight leading-[1.1]">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base text-stone-500 max-w-2xl mx-auto leading-relaxed">
            What healthcare executives and research teams say about Synaptic Research.
          </p>
        </div>

        {/* Featured + secondary layout */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Featured testimonial ── */}
          {featured && (
            <div className="lg:col-span-7 relative bg-white border border-stone-200 rounded-3xl p-8 md:p-10 overflow-hidden flex flex-col shadow-sm">
              {/* Top gradient line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-ocean-400/40 to-transparent rounded-t-3xl" />

              {/* Large decorative quote mark */}
              <svg
                className="w-20 h-20 text-bright-500/[0.30] mb-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              {/* Quote */}
              <p className="font-display italic text-lg md:text-xl text-stone-700 leading-[1.80] flex-1 mb-8">
                &ldquo;{featured.quote}&rdquo;
              </p>

              {/* Rating */}
              <StarRating rating={featured.rating} size="md" />

              {/* Author */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-600 to-ocean-400 flex items-center justify-center text-white text-sm font-bold shrink-0 ring-2 ring-ocean-500/30 shadow-lg shadow-ocean-600/20">
                  {getInitials(featured.company)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-stone-900">{featured.role}</p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {featured.company} &middot; {featured.location}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Secondary testimonials ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondary.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-1 bg-white border border-stone-200 rounded-2xl p-6 overflow-hidden relative flex flex-col shadow-sm"
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-bright-400/40 to-transparent rounded-t-2xl" />

                <div className="flex items-start justify-between mb-4">
                  <StarRating rating={testimonial.rating} />
                  <svg
                    className="w-8 h-8 text-stone-200 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>

                <p className="font-display italic text-sm text-stone-600 leading-[1.82] flex-1 mb-5">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ocean-600 to-ocean-400 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-1 ring-ocean-500/25">
                    {getInitials(testimonial.company)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-stone-800 truncate">{testimonial.role}</p>
                    <p className="text-[11px] text-stone-400 truncate mt-0.5">
                      {testimonial.company} &middot; {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-400 hover:bg-ocean-50 hover:border-ocean-400/50 hover:text-ocean-600 transition-all duration-200 shadow-sm"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-ocean-500 to-bright-400'
                    : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-400 hover:bg-ocean-50 hover:border-ocean-400/50 hover:text-ocean-600 transition-all duration-200 shadow-sm"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
