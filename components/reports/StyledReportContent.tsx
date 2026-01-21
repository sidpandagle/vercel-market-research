'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Download } from 'lucide-react';

interface StyledReportContentProps {
  htmlContent: string;
  reportSlug?: string;
}

export const StyledReportContent: React.FC<StyledReportContentProps> = ({
  htmlContent,
  reportSlug,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all images in the content
    const images = contentRef.current.querySelectorAll('img');

    images.forEach((img) => {
      // Skip if already wrapped
      if (img.parentElement?.classList.contains('image-wrapper')) return;

      // Create wrapper div for image
      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper';

      // Create image container with border (matching the commented code styling)
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';

      // Create CTA section (matching the commented code styling)
      const ctaSection = document.createElement('div');
      ctaSection.className = 'image-cta-section';
      ctaSection.innerHTML = `
        <div class="image-cta-content">
          <div class="image-cta-text">To learn more about this report,</div>
          <a href="/request-sample${reportSlug ? `?report=${reportSlug}` : ''}" class="image-cta-button">
            <svg class="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Free Sample
          </a>
        </div>
      `;

      // Wrap the image
      img.parentNode?.insertBefore(wrapper, img);
      imageContainer.appendChild(img);
      wrapper.appendChild(imageContainer);
      wrapper.appendChild(ctaSection);
    });
  }, [htmlContent, reportSlug]);

  return (
    <>
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none text-[var(--muted-foreground)] styled-report-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style jsx global>{`
        .image-wrapper {
          margin: 1.5rem 0;
          width: 100%;
        }

        .image-container {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border: 1px solid var(--border);
          padding: 1.5rem;
        }

        .image-container img {
          width: 100%;
          height: auto;
          max-width: 56rem;
          margin: 0 auto !important;
          display: block;
        }

        .image-cta-section {
          border-radius: 1rem;
          padding-top: 1.5rem;
        }

        .image-cta-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          text-align: center;
        }

        .image-cta-text {
          color: var(--muted-foreground);
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
        }

        .image-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          background: linear-gradient(to right, #0F2D52, #2563A3, #3B7CB8);
          color: white !important;
          padding: 0.875rem 1.75rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1.125rem;
          text-decoration: none;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 14px 0 rgba(37, 99, 163, 0.2);
          white-space: nowrap;
          transform: translateY(0);
        }

        // .image-cta-button:hover {
        //   background: linear-gradient(to right, #0A1F3D, #1B4B7F, #2563A3);
        //   box-shadow: 0 10px 25px -5px rgba(37, 99, 163, 0.25), 0 8px 10px -6px rgba(37, 99, 163, 0.15);
        //   transform: scale(1.02);
        // }

        .download-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        @media (min-width: 640px) {
          .image-cta-content {
            flex-direction: row;
            gap: 1rem;
            text-align: left;
          }

          .image-cta-text {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </>
  );
};
