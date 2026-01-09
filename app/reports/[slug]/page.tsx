import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import reports from "@/data/reports.json";
import teamMembers from "@/data/team-members.json";
import { Breadcrumb, Badge, Card, CardContent, Button } from "@/components/ui";
import { Download } from "lucide-react";
import { ReportContentWrapper } from "@/components/reports/ReportContentWrapper";
import {
  MarketGrowthChart,
  MarketSharePieChart,
  RegionalAnalysisChart,
} from "@/components/reports/charts";
import MeetTheTeam from "@/components/reports/MeetTheTeam";
import FAQ from "@/components/reports/FAQ";

export async function generateStaticParams() {
  return reports.map((report) => ({
    slug: report.slug,
  }));
}

interface Report {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  price: string;
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
  overview?: string;
  keyFindings?: string[];
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
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = reports.find((r) => r.slug === slug) as Report | undefined;

  if (!report) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Reports', href: '/reports' },
    { label: report.title },
  ];

  const hasFullContent = !!(report.tableOfContents && report.overview);

  const baseYearLabel = report.baseYear || '2024';
  const forecastEndYear = report.forecastPeriod?.split('-')[1] || '2032';
  const forecastRangeLabel = report.forecastPeriod || `${baseYearLabel}-${forecastEndYear}`;

  const metricCards = [
    {
      label: `Revenue, ${baseYearLabel}`,
      value: report.marketSize2024 || '—',
      bg: 'bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB]',
      labelColor: 'text-[#1565C0]',
      valueColor: 'text-[#0D47A1]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10 text-[#2196F3]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 44c0-6.627 5.373-12 12-12s12 5.373 12 12"
            stroke="#2196F3"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M12 48h40" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M28 28V18c0-3.314 2.686-6 6-6s6 2.686 6 6v2"
            stroke="#2196F3"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M24 36v-6" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 32v-4" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="20" r="2" fill="#2196F3" />
        </svg>
      ),
    },
    {
      label: `Forecast, ${forecastEndYear}`,
      value: report.marketSize2032 || '—',
      bg: 'bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB]',
      labelColor: 'text-[#00897B]',
      valueColor: 'text-[#00695C]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10 text-[#26A69A]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 46l10-18 10 12 12-22 12 28"
            stroke="#26A69A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 52h44" stroke="#26A69A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="28" r="2" fill="#26A69A" />
          <circle cx="30" cy="40" r="2" fill="#26A69A" />
          <circle cx="42" cy="20" r="2" fill="#26A69A" />
          <circle cx="54" cy="48" r="2" fill="#26A69A" />
        </svg>
      ),
    },
    {
      // label: `CAGR, ${forecastRangeLabel}`,
      label: `CAGR, ${'2025'}`,
      value: report.cagr || '—',
      bg: 'bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9]',
      labelColor: 'text-[#43A047]',
      valueColor: 'text-[#2E7D32]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10 text-[#66BB6A]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 40h6v-8h-6v8zm12 0h6V20h-6v20zm12 0h6V28h-6v12zm12 0h6V16h-6v24z"
            fill="#66BB6A"
            opacity="0.3"
          />
          <path d="M12 44h40" stroke="#66BB6A" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M12 34c6-4 10-6 16-6s10 2 16 6 10 6 16 6"
            stroke="#66BB6A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40 18l4-4 4 4"
            stroke="#66BB6A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: 'Report Coverage',
      value: 'Global',
      bg: 'bg-gradient-to-br from-[#F3E5F5] to-[#E1BEE7]',
      labelColor: 'text-[#8E24AA]',
      valueColor: 'text-[#6A1B9A]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10 text-[#AB47BC]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="28" r="14" stroke="#AB47BC" strokeWidth="3" />
          <path d="M32 14v4m0 28v4m14-14h4M14 32h4" stroke="#AB47BC" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 44l-6 6" stroke="#AB47BC" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 44l6 6" stroke="#AB47BC" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Fetch team members for this report
  const reportTeamMembers = report.teamMemberIds
    ? teamMembers.filter((tm) => report.teamMemberIds!.includes(tm.id))
    : [];

  // Fetch related reports
  const relatedReports = report.relatedReportIds
    ? reports
        .filter((r) => report.relatedReportIds!.includes(r.id))
        .slice(0, 4)
        .map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          date: r.date,
          price: r.price,
        }))
    : [];

  return (
    <div className="bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="px-4 py-8 md:px-6">
        <ReportContentWrapper
          tableOfContents={report.tableOfContents}
          fullReportTOC={report.fullReportTOC}
          hasFullContent={hasFullContent}
          price={report.price}
          reportTitle={report.title}
        >
          <article>
              <header className="mb-8 pb-8 border-b border-[var(--border)]">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="default">{report.category}</Badge>
                  <Badge variant="outline">{report.region}</Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                  {report.title}
                </h1>

                <p className="text-xl text-[var(--muted-foreground)] mb-6">
                  {report.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-[var(--muted-foreground)] mb-1">Report Code</p>
                    <p className="font-semibold text-[var(--foreground)]">
                      {report.reportCode || `HC-${report.id}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--muted-foreground)] mb-1">Published</p>
                    <p className="font-semibold text-[var(--foreground)]">{report.date}</p>
                  </div>
                  <div>
                    <p className="text-[var(--muted-foreground)] mb-1">Pages</p>
                    <p className="font-semibold text-[var(--foreground)]">{report.pages}</p>
                  </div>
                  <div>
                    <p className="text-[var(--muted-foreground)] mb-1">Format</p>
                    <p className="font-semibold text-[var(--foreground)]">PDF, Excel</p>
                  </div>
                </div>
              </header>

              <section className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {metricCards.map((card) => (
                    <Card key={card.label} className={`${card.bg} border-none`}>
                      <CardContent className="flex items-center gap-3" style={{padding: '8px'}}>
                        {card.icon}
                        <div>
                          <p className={`text-sm font-semibold ${card.labelColor}`}>{card.label}</p>
                          <p className={`text-lg font-bold ${card.valueColor}`}>{card.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {hasFullContent ? (
                <>
                  <section id="overview" className="mb-12 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                      Market Overview
                    </h2>
                    <div className="prose prose-lg max-w-none text-[var(--muted-foreground)]">
                      <p>{report.overview}</p>
                    </div>

                    {report.keyFindings && report.keyFindings.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                          Key Findings
                        </h3>
                        <div className="bg-[#ede9fe] rounded-lg py-4 px-6">
                          <ul className="list-disc list-outside ml-5 space-y-0">
                            {report.keyFindings.map((finding, index) => (
                              <li key={index} className="text-[var(--foreground)] py-4 border-b border-gray-300 last:border-b-0">
                                {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </section>

                  {report.marketSize2024 && report.marketSize2032 && report.cagr && (
                    <section id="market-size" className="mb-12 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                        Market Size & Forecast
                      </h2>
                      <p className="text-[var(--muted-foreground)] mb-8">
                        The market is projected to grow from {report.marketSize2024} in{' '}
                        {report.baseYear || '2024'} to {report.marketSize2032} by{' '}
                        {report.forecastPeriod?.split('-')[1] || '2032'}, at a CAGR of{' '}
                        {report.cagr} during the forecast period.
                      </p>

                      {/* Market Analysis Charts */}
                      <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-[var(--border)] p-6">
                          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                            Market Size by Segment (2020-2024)
                          </h3>
                          <Image
                            src="/assets/images/chart1.png"
                            alt="Global Medical Device Market - Bar Chart showing market size by segment from 2020-2024"
                            width={1200}
                            height={600}
                            className="w-full h-auto max-w-4xl mx-auto"
                            priority
                          />
                          
                        {/* Download Sample Report CTA */}
                        <div className="rounded-2xl pt-6">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                            <p className="text-[var(--muted-foreground)] text-base sm:text-lg font-medium">
                              To learn more about this report,
                            </p>
                            <Link href={`/request-sample?report=${report.slug}`}>
                              <Button
                                variant="primary"
                                size="lg"
                                className="gap-2 shadow-primary hover:shadow-primary-lg whitespace-nowrap"
                              >
                                <Download className="w-5 h-5" />
                                Download Free Sample
                              </Button>
                            </Link>
                          </div>
                        </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-[var(--border)] p-6">
                          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                            Market Distribution by Segment
                          </h3>
                          <Image
                            src="/assets/images/chart2.png"
                            alt="Global Medical Device Market - Pie Chart showing market distribution by segment 2020-2024"
                            width={1200}
                            height={600}
                            className="w-full h-auto max-w-4xl mx-auto"
                          />
                      </div>
                        </div>

                    </section>
                  )}

                  {/* {report.segmentation && (
                    <section id="segmentation" className="mb-12 scroll-mt-24">
                      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                        Market Segmentation
                      </h2>
                      <div className="space-y-8">
                        {report.segmentation.byType && (
                          <div id="seg-type" className="scroll-mt-24">
                            <MarketSharePieChart
                              title="Market Share by Service Type"
                              segments={report.segmentation.byType}
                            />
                          </div>
                        )}

                        {report.segmentation.byApplication && (
                          <div id="seg-application" className="scroll-mt-24">
                            <MarketSharePieChart
                              title="Market Share by Application"
                              segments={report.segmentation.byApplication}
                            />
                          </div>
                        )}

                        {report.segmentation.byEndUser && (
                          <div id="seg-end-user" className="scroll-mt-24">
                            <MarketSharePieChart
                              title="Market Share by End User"
                              segments={report.segmentation.byEndUser}
                            />
                          </div>
                        )}

                        {report.segmentation.byRegion && (
                          <div id="seg-region" className="scroll-mt-24">
                            <RegionalAnalysisChart
                              regions={report.segmentation.byRegion}
                            />
                          </div>
                        )}
                      </div>
                    </section>
                  )} */}

                  <section id="competitive" className="mb-12 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                      Competitive Landscape
                    </h2>
                    <p className="text-[var(--muted-foreground)] mb-8">
                      The market is characterized by intense competition among established players
                      and emerging companies. Strategic partnerships, mergers and acquisitions, and
                      product innovation are key strategies employed by market participants.
                    </p>

                    {report.keyPlayers && report.keyPlayers.length > 0 && (
                      <div id="key-players" className="scroll-mt-24">
                        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                          Key Market Players
                        </h3>
                        <div className="grid gap-4">
                          {report.keyPlayers.map((player, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardContent className="">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-semibold text-[var(--foreground)] text-lg mb-2">
                                      {player.name}
                                    </h4>
                                    {/* <p className="text-sm text-[var(--muted-foreground)]">
                                      Headquarters: {player.headquarters}
                                    </p> */}
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-[var(--muted-foreground)] mb-1">
                                      Market Share
                                    </p>
                                    <p className="text-2xl font-bold text-[var(--primary)]">
                                      {player.marketShare}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>

                  <section id="drivers" className="mb-12 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                      Market Drivers & Opportunities
                    </h2>
                    <div className="prose prose-lg max-w-none text-[var(--muted-foreground)]">
                      <ul className="space-y-3">
                        <li>Increasing adoption of digital health technologies</li>
                        <li>Growing investment in healthcare infrastructure</li>
                        <li>Favorable government policies and reimbursement frameworks</li>
                        <li>Rising healthcare expenditure in emerging markets</li>
                        <li>Technological advancements and innovation</li>
                      </ul>
                    </div>
                  </section>

                  <section id="challenges" className="mb-12 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                      Challenges & Restraints
                    </h2>
                    <div className="prose prose-lg max-w-none text-[var(--muted-foreground)]">
                      <ul className="space-y-3">
                        <li>Data privacy and security concerns</li>
                        <li>Regulatory compliance complexity</li>
                        <li>High initial implementation costs</li>
                        <li>Integration challenges with legacy systems</li>
                        <li>Limited digital literacy in certain regions</li>
                      </ul>
                    </div>
                  </section>

                  {/* NEW SECTIONS */}
                  <MeetTheTeam teamMembers={reportTeamMembers} />

                  {/* FAQ Section */}
                  {report.faqs && <FAQ faqs={report.faqs} />}
                </>
              ) : (
                <section className="prose prose-lg max-w-none">
                  <h2>Executive Summary</h2>
                  <p>
                    This report provides comprehensive analysis of the {report.category.toLowerCase()}
                    sector in the healthcare industry. Our research covers market trends, key players,
                    growth opportunities, and strategic recommendations.
                  </p>

                  <h2>Key Findings</h2>
                  <ul>
                    <li>Market size and growth projections</li>
                    <li>Competitive landscape analysis</li>
                    <li>Regulatory environment overview</li>
                    <li>Technology trends and innovations</li>
                  </ul>

                  <h2>Market Overview</h2>
                  <p>
                    The healthcare market continues to evolve with new technologies, changing
                    regulations, and shifting patient demographics. This section provides detailed
                    insights into current market conditions.
                  </p>
                </section>
              )}
            </article>
        </ReportContentWrapper>
      </div>
    </div>
  );
}
