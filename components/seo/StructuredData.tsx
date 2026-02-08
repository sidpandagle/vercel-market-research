import { FC } from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * StructuredData component for adding JSON-LD structured data to pages
 *
 * @example
 * <StructuredData data={{
 *   "@context": "https://schema.org",
 *   "@type": "Article",
 *   "headline": "Article Title",
 *   ...
 * }} />
 */
export const StructuredData: FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

/**
 * Generate Organization schema for root layout
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Healthcare Foresights',
  url: 'https://www.healthcareforesights.com',
  logo: 'https://www.healthcareforesights.com/assets/images/logo.png',
  description: 'Healthcare Foresights delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'info@healthcareforesights.com',
  },
  sameAs: [
    'https://twitter.com/HealthcareForesights',
    'https://www.linkedin.com/company/healthcare-foresights',
  ],
});

/**
 * Generate WebSite schema with search action
 */
export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Healthcare Foresights',
  url: 'https://www.healthcareforesights.com',
  description: 'Healthcare Foresights delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.healthcareforesights.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Generate Article schema for reports, blogs, and press releases
 */
export const generateArticleSchema = (params: {
  type: 'Article' | 'Report' | 'NewsArticle';
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string | string[];
  image?: string;
  keywords?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': params.type,
  headline: params.title,
  description: params.description,
  url: params.url,
  datePublished: params.datePublished,
  dateModified: params.dateModified || params.datePublished,
  author: Array.isArray(params.author)
    ? params.author.map((name) => ({
        '@type': 'Person',
        name,
      }))
    : params.author
    ? {
        '@type': 'Person',
        name: params.author,
      }
    : {
        '@type': 'Organization',
        name: 'Healthcare Foresights',
      },
  publisher: {
    '@type': 'Organization',
    name: 'Healthcare Foresights',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.healthcareforesights.com/assets/images/logo.png',
    },
  },
  ...(params.image && {
    image: {
      '@type': 'ImageObject',
      url: params.image,
    },
  }),
  ...(params.keywords && params.keywords.length > 0 && {
    keywords: params.keywords.join(', '),
  }),
});

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Generate FAQPage schema
 */
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
