'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

interface CheckoutFormProps {
  reportSlug: string;
  reportTitle: string;
}

interface CustomerDetails {
  customer_name: string;
  customer_email: string;
  customer_company: string;
  customer_phone: string;
  customer_country: string;
}

const INITIAL_DETAILS: CustomerDetails = {
  customer_name: '',
  customer_email: '',
  customer_company: '',
  customer_phone: '',
  customer_country: '',
};

export function CheckoutForm({ reportSlug, reportTitle }: CheckoutFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState<CustomerDetails>(INITIAL_DETAILS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">Inquiry Received</h3>
        <p className="text-sm text-[var(--muted-foreground)] max-w-xs mx-auto">
          Thank you, <strong>{details.customer_name}</strong>. Our team will contact you at{' '}
          <strong>{details.customer_email}</strong> to complete your purchase of{' '}
          <em>{reportTitle}</em>.
        </p>
        <div className="pt-2">
          <Link href={`/reports/${reportSlug}`}>
            <Button variant="outline" size="sm">Back to Report</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="customer_name"
          value={details.customer_name}
          onChange={handleChange}
          required
          placeholder="John Smith"
          className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="customer_email"
          value={details.customer_email}
          onChange={handleChange}
          required
          placeholder="john@company.com"
          className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <p className="text-xs text-[var(--muted-foreground)] mt-1">We will reach out to this address to complete your order.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Company / Organization
        </label>
        <input
          type="text"
          name="customer_company"
          value={details.customer_company}
          onChange={handleChange}
          placeholder="Acme Corp"
          className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="customer_phone"
            value={details.customer_phone}
            onChange={handleChange}
            placeholder="+1 234 567 8900"
            className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Country
          </label>
          <input
            type="text"
            name="customer_country"
            value={details.customer_country}
            onChange={handleChange}
            placeholder="United States"
            className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" className="w-full">
          Submit Purchase Inquiry
        </Button>
      </div>

      <p className="text-xs text-center text-[var(--muted-foreground)]">
        Our team will contact you within 24 hours to complete your purchase.
      </p>
    </form>
  );
}
