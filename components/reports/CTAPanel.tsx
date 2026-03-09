import React from 'react';
import Link from 'next/link';

interface CTAPanelProps {
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
}

const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" stroke="#1D4ED8" strokeOpacity="0.3" />
    <path d="M5 8l2 2 4-4" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CTAPanel = React.forwardRef<HTMLDivElement, CTAPanelProps>(
  ({ price, discounted_price, reportTitle, reportSlug }, ref) => {
    const displayPrice = discounted_price || price;
    const hasDiscount = Boolean(discounted_price);

    return (
      <div ref={ref} className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(29,78,216,0.10)' }}>
        {/* Dark navy/blue pricing header */}
        <div
          className="px-5 pt-6 pb-5 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #0F172A 0%, #172554 55%, #1e3a8a 100%)' }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute top-0 left-1/2 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }}
          />

          <p className="text-xs uppercase tracking-widest mb-3 relative" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Single User License
          </p>

          <div className="relative mb-1">
            {hasDiscount && (
              <p className="text-sm line-through mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {price}
              </p>
            )}
            <p className="font-display text-4xl font-bold" style={{ color: '#fff', letterSpacing: '-0.02em' }}>
              {displayPrice}
            </p>
          </div>

          {hasDiscount && (
            <span
              className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mt-2"
              style={{ background: 'rgba(56,189,248,0.20)', color: '#7DD3FC', border: '1px solid rgba(56,189,248,0.30)' }}
            >
              20% off
            </span>
          )}

          <p className="text-xs mt-3 relative" style={{ color: 'rgba(255,255,255,0.40)' }}>
            Save more with multi-user license
          </p>
        </div>

        {/* CTAs + included */}
        <div className="p-5 space-y-3" style={{ background: '#fff' }}>
          <Link href={reportSlug ? `/checkout/${reportSlug}` : '/contact'} className="block">
            <button
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #2563EB)', boxShadow: '0 4px 14px rgba(29,78,216,0.30)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(29,78,216,0.40)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(29,78,216,0.30)' }}
            >
              Buy Report Now
            </button>
          </Link>

          <Link href={`/request-sample${reportTitle ? `?report=${encodeURIComponent(reportTitle)}` : ''}`} className="block">
            <button
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #93C5FD' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#BFDBFE' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#EFF6FF' }}
            >
              Request Free Sample
            </button>
          </Link>

          {/* Included features */}
          <div className="pt-3 mt-1" style={{ borderTop: '1px solid #F0EDEB' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#78716C' }}>
              What&apos;s Included
            </p>
            <ul className="space-y-2.5">
              {['PDF & Excel Formats', 'Free Report Updates', 'Analyst Support (60 days)', 'Data Customization (20%)'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#44403C' }}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div
            className="flex justify-center gap-4 pt-3 mt-1"
            style={{ borderTop: '1px solid #F0EDEB' }}
          >
            {['Secure Checkout', 'Instant Access'].map((badge) => (
              <span key={badge} className="flex items-center gap-1 text-xs" style={{ color: '#78716C' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1D4ED8' }} />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

CTAPanel.displayName = 'CTAPanel';
