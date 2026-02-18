'use client';

interface StyledArticleContentProps {
  htmlContent: string;
}

export const StyledArticleContent: React.FC<StyledArticleContentProps> = ({
  htmlContent,
}) => {
  return (
    <>
      <div
        className="prose prose-lg max-w-none text-[#333333] styled-article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style jsx global>{`
        /* Typography overrides for article content */
        .styled-article-content {
          color: #333333;
        }

        /* H1 */
        .styled-article-content h1 {
          color: #22E1B0;
          color: var(--teal-bright, #22E1B0);
          font-weight: 700;
          margin-top: 2.5rem;
        }

        /* H2 - Major sections with bright teal */
        .styled-article-content h2 {
          color: #22E1B0;
          color: var(--teal-bright, #22E1B0);
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }

        /* H3 - Subsections with muted teal */
        .styled-article-content h3 {
          color: #29ADA4;
          color: var(--teal-primary, #29ADA4);
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        /* H5/H6 - Smallest headings with deep blue */
        .styled-article-content h5,
        .styled-article-content h6 {
          color: #37448C;
          color: var(--teal-deep, #37448C);
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        /* Ensure strong tags inside headings inherit heading color */
        .styled-article-content h1 strong,
        .styled-article-content h2 strong,
        .styled-article-content h3 strong,
        .styled-article-content h4 strong,
        .styled-article-content h5 strong,
        .styled-article-content h6 strong {
          color: inherit;
        }

        .styled-article-content p {
          color: #333333;
          line-height: 1.75;
        }

        .styled-article-content ul,
        .styled-article-content ol {
          color: #333333;
        }

        .styled-article-content li {
          color: #333333;
        }

        .styled-article-content strong {
          color: #37448C;
          color: var(--teal-deep, #37448C);
          font-weight: 600;
        }

        .styled-article-content table {
          color: #333333;
        }

        /* Table header styling - faint teal background with dark text */
        .styled-article-content th {
          background-color: #E0F5F3;
          background-color: var(--teal-subtle, #E0F5F3);
          color: #37448C;
          color: var(--teal-deep, #37448C);
          font-weight: 600;
          text-align: left;
          padding: 12px 15px;
          font-size: 0.875rem;
          border: 1px solid #b09ad5;
        }

        .styled-article-content td {
          color: #333333;
          padding: 10px 15px;
          font-size: 0.9375rem;
          background-color: #ffffff;
        }

        /* Table hover effects with teal */
        .styled-article-content.prose tbody tr {
          transition: background-color 0.2s ease;
        }

        .styled-article-content.prose tbody tr:hover {
          background-color: #E0F5F3 !important;
          background-color: var(--teal-subtle, #E0F5F3) !important;
        }

        /* Table header hover effect */
        .styled-article-content.prose th {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .styled-article-content.prose thead tr:hover th {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(41, 173, 164, 0.2);
        }

        /* Links with teal color */
        .styled-article-content a {
          color: #29ADA4;
          color: var(--teal-primary, #29ADA4);
          text-decoration: underline;
          text-decoration-color: #B0D9D5;
          text-decoration-color: var(--teal-border, #B0D9D5);
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }

        .styled-article-content a:hover {
          color: #22E1B0;
          color: var(--teal-bright, #22E1B0);
          text-decoration-color: #22E1B0;
          text-decoration-color: var(--teal-bright, #22E1B0);
        }

        /* Blockquotes with teal left border */
        .styled-article-content blockquote {
          border-left: 4px solid #29ADA4;
          border-left: 4px solid var(--teal-primary, #29ADA4);
          padding-left: 1.25rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: var(--muted-foreground);
          background: #E0F5F3;
          background: var(--teal-subtle, #E0F5F3);
          padding: 1rem 1.25rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        /* Section spacing */
        .styled-article-content > h2 + *,
        .styled-article-content > h3 + * {
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};
