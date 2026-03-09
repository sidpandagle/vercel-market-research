import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";
// import { Download } from "lucide-react";
import { ReportContentWrapper } from "@/components/reports/ReportContentWrapper";
import type { SidebarTOCItem } from "@/lib/toc-utils";
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, generateProductSchema, generateDatasetSchema } from "@/components/seo/StructuredData";
import { getJsonReportBySlug, getAllJsonReportSlugs, jsonReportToUIReport } from "@/lib/jsonReports";
import { JsonReportSections } from "@/components/reports/JsonReportSections";

export async function generateStaticParams() {
  return getAllJsonReportSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const jsonReport = getJsonReportBySlug(slug);

  if (!jsonReport) return { title: "Report Not Found" };

  const title = jsonReport.seo.meta_title || jsonReport.title;
  const description = jsonReport.seo.meta_description || jsonReport.market_overview.summary;
  const keywords = jsonReport.seo.keywords;
  const region = jsonReport.regional_analysis[0]?.region ?? 'Global';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: String(jsonReport.published_year),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/reports/${slug}`,
    },
  };
}

interface Report {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  price: string;
  discounted_price: string;
  region: string;
  year: string;
  reportType: string;
  pages: number;
  reportCode?: string;
  baseYear?: string;
  forecastPeriod?: string;
  marketSize2024?: string;
  marketSize2032?: string;
  cagr?: string;
  marketDetails?: string;
  keyFindings?: string[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  segmentation?: {
    byType?: Array<{ name: string; share: string; description?: string }>;
    byApplication?: Array<{ name: string; share: string }>;
    byEndUser?: Array<{ name: string; share: string }>;
    byRegion?: Array<{ name: string; share: string; cagr?: string }>;
  };
  keyPlayers?: Array<{ name: string; marketShare: string; headquarters: string }>;
  tableOfContents?: Array<{ id: string; title: string; level: number }>;
  fullReportTOC?: Array<{ id: string; title: string; number?: string; children?: Array<{ id: string; title: string; number?: string }> }>;
  teamMemberIds?: string[];
  relatedReportIds?: number[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  authors: Array<{
    id: number;
    name: string;
    role?: string;
    bio?: string;
    imageUrl?: string;
    linkedinUrl?: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const jsonReport = getJsonReportBySlug(slug);
  if (!jsonReport) notFound();

  // Build the report object from JSON data
  const report = jsonReportToUIReport(jsonReport, 0) as Report;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Reports', href: '/reports' },
    { label: report.title },
  ];

  const hasFullContent = false;
  const sidebarTOC: SidebarTOCItem[] = [];

  const baseYearLabel = String(jsonReport.base_year);
  const forecastEndYear = jsonReport.forecast_period.split('-')[1];
  const forecastRangeLabel = jsonReport.forecast_period;

  const displayMarketSizeCurrent = `$${jsonReport.market_size.current_value.toFixed(1)}B`;
  const displayMarketSizeForecast = `$${jsonReport.market_size.forecast_value.toFixed(1)}B`;
  const displayCAGR = `${jsonReport.market_size.cagr}%`;

  const metricCards = [
    {
      label: `Revenue, ${baseYearLabel}`,
      value: displayMarketSizeCurrent,
      bg: 'bg-[var(--blue-subtle)]',
      labelColor: 'text-[var(--blue-primary)]',
      valueColor: 'text-[var(--blue-deep)]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10 text-[var(--blue-steel)]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 44c0-6.627 5.373-12 12-12s12 5.373 12 12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M12 48h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M28 28V18c0-3.314 2.686-6 6-6s6 2.686 6 6v2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M24 36v-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 32v-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="20" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: `Forecast, ${forecastEndYear}`,
      value: displayMarketSizeForecast,
      bg: 'bg-[var(--blue-subtle)]',
      labelColor: 'text-[var(--blue-primary)]',
      valueColor: 'text-[var(--blue-deep)]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10 text-[var(--blue-steel)]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 46l10-18 10 12 12-22 12 28"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 52h44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="28" r="2" fill="currentColor" />
          <circle cx="30" cy="40" r="2" fill="currentColor" />
          <circle cx="42" cy="20" r="2" fill="currentColor" />
          <circle cx="54" cy="48" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: `CAGR, ${forecastRangeLabel}`,
      value: displayCAGR,
      bg: 'bg-[var(--blue-subtle)]',
      labelColor: 'text-[var(--blue-primary)]',
      valueColor: 'text-[var(--blue-deep)]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10 text-[var(--blue-steel)]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 40h6v-8h-6v8zm12 0h6V20h-6v20zm12 0h6V28h-6v12zm12 0h6V16h-6v24z"
            fill="currentColor"
            opacity="0.3"
          />
          <path d="M12 44h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M12 34c6-4 10-6 16-6s10 2 16 6 10 6 16 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40 18l4-4 4 4"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: 'Report Coverage',
      value: report.region,
      bg: 'bg-[var(--blue-subtle)]',
      labelColor: 'text-[var(--blue-primary)]',
      valueColor: 'text-[var(--blue-deep)]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10 text-[var(--blue-steel)]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="28" r="14" stroke="currentColor" strokeWidth="3" />
          <path d="M32 14v4m0 28v4m14-14h4M14 32h4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 44l-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 44l6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Fetch related reports
  // TODO: Fetch related reports from API when relatedReportIds are provided
  // const relatedReports: Report[] = [];

  const reportUrl = `https://www.synapticresearch.com/reports/${report.slug}`;
  const reportKeywords = report.meta_keywords?.split(',').map(k => k.trim()).filter(Boolean);

  // Generate structured data schemas
  const articleSchema = generateArticleSchema({
    type: 'Report',
    title: report.title,
    description: report.description,
    url: reportUrl,
    datePublished: report.date,
    author: report.authors && report.authors.length > 0 ? report.authors.map((author) => author.name) : undefined,
    keywords: reportKeywords,
  });

  const productSchema = generateProductSchema({
    name: report.title,
    description: report.description,
    url: reportUrl,
    price: report.price,
    discountedPrice: report.discounted_price,
    category: report.category,
    reportCode: report.reportCode || `HF${report.id}`,
    keywords: reportKeywords,
    datePublished: report.date,
  });

  const datasetSchema = generateDatasetSchema({
    name: `${report.title} - Market Data`,
    description: `Market research dataset for ${report.title}. Includes market size, CAGR, and forecast data for ${report.forecastPeriod || `${baseYearLabel}–${forecastEndYear}`}.`,
    url: reportUrl,
    datePublished: report.date,
    keywords: reportKeywords,
    temporalCoverage: report.forecastPeriod
      ? report.forecastPeriod.replace('-', '/')
      : `${baseYearLabel}/${forecastEndYear}`,
    variableMeasured: [
      ...(report.marketSize2024 ? [`Market Size (${baseYearLabel}): ${report.marketSize2024}`] : []),
      ...(report.marketSize2032 ? [`Market Size (${forecastEndYear}): ${report.marketSize2032}`] : []),
      ...(report.cagr ? [`CAGR (${report.forecastPeriod || `${baseYearLabel}–${forecastEndYear}`}): ${report.cagr}`] : []),
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.synapticresearch.com' },
    { name: 'Reports', url: 'https://www.synapticresearch.com/reports' },
    { name: report.title, url: reportUrl },
  ]);

  const faqSchema = report.faqs && report.faqs.length > 0 ? generateFAQSchema(report.faqs) : null;

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={productSchema} />
      <StructuredData data={datasetSchema} />
      <StructuredData data={breadcrumbSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}

      <div className="bg-[var(--background)]">
        <div className="border-b border-[var(--border)] bg-[var(--card)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          <ReportContentWrapper
            tableOfContents={sidebarTOC}
            fullReportTOC={report.fullReportTOC}
            hasFullContent={hasFullContent}
            price={report.price}
            discounted_price={report.discounted_price}
            reportTitle={report.title}
            reportSlug={report.slug}
          >
            <article>
              {/* ── Dark Forest Hero Header ── */}
              <header className="relative overflow-hidden rounded-2xl mb-10" style={{ background: 'linear-gradient(145deg, #0F172A 0%, #172554 55%, #1e3a8a 100%)' }}>
                {/* Crosshatch texture overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%)',
                    backgroundSize: '24px 24px',
                  }}
                />
                {/* Ambient glow orbs */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                <div className="relative z-10 p-7 md:p-10">
                  {/* Category + Region chips */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border" style={{ background: 'rgba(56,189,248,0.15)', color: '#7DD3FC', borderColor: 'rgba(56,189,248,0.30)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7DD3FC]" />
                      {report.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.60)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      {report.region}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.10)' }}>
                      {baseYearLabel} – {forecastEndYear}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-display text-2xl md:text-4xl font-bold leading-tight mb-4" style={{ color: '#fff', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                    {report.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(255,255,255,0.62)' }}>
                    {report.description}
                  </p>

                  {/* Metric stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                    {metricCards.map((card) => (
                      <div
                        key={card.label}
                        className="rounded-xl p-4"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}
                      >
                        <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          {card.label}
                        </p>
                        <p className="font-display text-2xl font-bold" style={{ color: '#fff', letterSpacing: '-0.01em' }}>
                          {card.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Metadata strip */}
                  <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                    {[
                      ['Code', report.reportCode || `HF${report.id}`],
                      ['Published', report.date],
                      ['Pages', `${report.pages}+`],
                      ['Format', 'PDF + Excel'],
                    ].map(([label, val]) => (
                      <span key={label} className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>
                        {label}:{' '}
                        <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{val}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </header>

              <JsonReportSections report={jsonReport} />
            </article>
          </ReportContentWrapper>
        </div>
      </div>
    </>
  );
}



// Images Section - To be added within the full content condition
// {report.marketSize2024 && report.marketSize2032 && report.cagr && (
//   <section className="mb-12">
//     <h2 id="market-size" className="text-3xl font-bold text-[var(--foreground)] mb-6 scroll-mt-24">
//       Market Size & Forecast
//     </h2>
//     <p className="text-[var(--muted-foreground)] mb-8">
//       The market is projected to grow from {report.marketSize2024} in{' '}
//       {report.baseYear || '2024'} to {report.marketSize2032} by{' '}
//       {report.forecastPeriod?.split('-')[1] || '2032'}, at a CAGR of{' '}
//       {report.cagr} during the forecast period.
//     </p>

//     {/* Market Analysis Charts */}
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg shadow-sm border border-[var(--border)] p-6">
//         <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
//           Market Size by Segment (2020-2024)
//         </h3>
//         <Image
//           src="/assets/images/chart1.png"
//           alt="Global Medical Device Market - Bar Chart showing market size by segment from 2020-2024"
//           width={1200}
//           height={600}
//           className="w-full h-auto max-w-4xl mx-auto"
//           priority
//         />
        
//       {/* Download Sample Report CTA */}
//       <div className="rounded-2xl pt-6">
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
//           <p className="text-[var(--muted-foreground)] text-base sm:text-lg font-medium">
//             To learn more about this report,
//           </p>
//           <Link href={`/request-sample?report=${report.slug}`}>
//             <Button
//               variant="primary"
//               size="lg"
//               className="gap-2 shadow-primary hover:shadow-primary-lg whitespace-nowrap"
//             >
//               <Download className="w-5 h-5" />
//               Download Free Sample
//             </Button>
//           </Link>
//         </div>
//       </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-[var(--border)] p-6">
//         <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
//           Market Distribution by Segment
//         </h3>
//         <Image
//           src="/assets/images/chart2.png"
//           alt="Global Medical Device Market - Pie Chart showing market distribution by segment 2020-2024"
//           width={1200}
//           height={600}
//           className="w-full h-auto max-w-4xl mx-auto"
//         />
//     </div>
//       </div>

//   </section>
// )}