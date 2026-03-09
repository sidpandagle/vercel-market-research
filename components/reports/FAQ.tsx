"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-[var(--blue-deep)] mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-start gap-4 group"
                aria-expanded={openIndex === index}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[var(--primary)] text-white transition-colors duration-200 group-hover:bg-[var(--primary)]/90`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    {openIndex === index ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14m-7-7h14"
                      />
                    )}
                  </svg>
                </div>
                <span className="font-semibold text-[var(--foreground)] text-lg group-hover:text-[var(--primary)] transition-colors flex-1">
                  {faq.question}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-[var(--muted-foreground)]">
                  {faq.answer}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
