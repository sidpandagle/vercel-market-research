import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface CTAPanelProps {
  price: string;
  discounted_price: string;
  reportTitle?: string;
  className?: string;
}

export const CTAPanel = React.forwardRef<HTMLDivElement, CTAPanelProps>(
  ({ price, discounted_price, reportTitle, className }, ref) => {
    return (
      <Card ref={ref}>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-[var(--muted-foreground)] mb-2">
              Single User License
            </p>
            <div className="mb-2">
              <p className="text-lg text-[var(--muted-foreground)] line-through">
                {price}/-
              </p>
              <p className="text-4xl font-bold text-[var(--foreground)]">
                {discounted_price}/-
              </p>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">
              Save 20% with multi-user license
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/contact">
              <Button className="w-full" size="lg">
                Buy Now
              </Button>
            </Link>
            <Link href={`/request-sample${reportTitle ? `?report=${encodeURIComponent(reportTitle)}` : ''}`}>
              <Button variant="outline" className="w-full mt-4" size="lg">
                Request Sample
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-[var(--border)]">
            <h4 className="text-sm font-semibold mb-3">What&apos;s Included</h4>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>PDF & Excel Formats</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Free Report Updates</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Analyst Support</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Data Customization</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }
);

CTAPanel.displayName = 'CTAPanel';
