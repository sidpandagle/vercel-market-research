"use client"

import React, { useState } from 'react'
import { MarketForecastLineChart } from './charts/MarketForecastLineChart'
import { ComponentSharePieChart } from './charts/ComponentSharePieChart'
import { RegionalBarChart } from './charts/RegionalBarChart'
import type { JsonReport, SegmentItem } from '@/lib/jsonReports'

interface JsonReportSectionsProps {
  report: JsonReport
}

// ── Section counter ─────────────────────────────────────────────────────────
let _sectionIndex = 0
function resetSectionIndex() { _sectionIndex = 0 }
function nextSection() { return ++_sectionIndex }

// ── helpers ─────────────────────────────────────────────────────────────────

const SectionHeading = ({ id, num, children }: { id: string; num: number; children: React.ReactNode }) => (
  <div className="flex items-start gap-4 mb-7">
    <span
      className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
      style={{ background: 'rgba(29,78,216,0.10)', color: '#1D4ED8', border: '1px solid rgba(29,78,216,0.20)' }}
    >
      {String(num).padStart(2, '0')}
    </span>
    <h2
      id={id}
      className="font-display text-2xl font-bold scroll-mt-24"
      style={{ color: '#172554', letterSpacing: '-0.01em', lineHeight: '1.25' }}
    >
      {children}
    </h2>
  </div>
)

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#57534E', letterSpacing: '0.06em' }}>
    {children}
  </h3>
)


// ── market dynamics ──────────────────────────────────────────────────────────

const DYNAMICS_TABS = [
  {
    key: 'drivers',
    label: 'Growth Drivers',
    dot: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    text: '#15803d',
    accentBar: '#22c55e',
  },
  {
    key: 'restraints',
    label: 'Restraints',
    dot: '#dc2626',
    bg: '#fff1f2',
    border: '#fecdd3',
    text: '#b91c1c',
    accentBar: '#f87171',
  },
  {
    key: 'opportunities',
    label: 'Opportunities',
    dot: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    text: '#1d4ed8',
    accentBar: '#60a5fa',
  },
  {
    key: 'challenges',
    label: 'Challenges',
    dot: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    text: '#b45309',
    accentBar: '#fbbf24',
  },
] as const

type DynamicsKey = typeof DYNAMICS_TABS[number]['key']

function MarketDynamicsSection({ dynamics }: { dynamics: JsonReport['market_dynamics'] }) {
  const [active, setActive] = useState<DynamicsKey>('drivers')
  const tabInfo = DYNAMICS_TABS.find((t) => t.key === active)!
  const items = dynamics[active]

  return (
    <section className="mb-14">
      {/* Pill tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {DYNAMICS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            style={
              active === tab.key
                ? { background: tab.bg, color: tab.text, border: `1.5px solid ${tab.border}`, boxShadow: `0 0 0 3px ${tab.border}40` }
                : { background: '#F5F4F0', color: '#78716C', border: '1.5px solid #E7E5E4' }
            }
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
              style={{ background: active === tab.key ? tab.dot : '#A8A29E', verticalAlign: 'middle', marginTop: '-2px' }}
            />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        className="rounded-xl p-5"
        style={{ background: tabInfo.bg, border: `1px solid ${tabInfo.border}`, borderLeft: `4px solid ${tabInfo.accentBar}` }}
      >
        {items.length === 0 ? (
          <p className="text-sm" style={{ color: tabInfo.text }}>No data available.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: tabInfo.text }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tabInfo.accentBar }} />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

// ── segmentation ─────────────────────────────────────────────────────────────

const SEGMENT_COLORS: Record<string, { dot: string; bg: string; border: string }> = {
  'By Component': { dot: '#1D4ED8', bg: '#EFF6FF', border: '#93C5FD' },
  'By Type':      { dot: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  'By Application': { dot: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  'By End User':  { dot: '#d97706', bg: '#fffbeb', border: '#fde68a' },
}

function SegmentListCard({ title, items }: { title: string; items: string[] }) {
  const colors = SEGMENT_COLORS[title] ?? { dot: '#1D4ED8', bg: '#EFF6FF', border: '#93C5FD' }
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: colors.dot }}>
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors.dot }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function splitSegmentField(items: (SegmentItem | string)[]) {
  const segments = items.filter(
    (item): item is SegmentItem =>
      typeof item === 'object' && item !== null && 'market_share' in item
  )
  const strings = items.map((item) =>
    typeof item === 'string' ? item : (item as SegmentItem).name
  )
  return { segments, strings }
}

function MarketSegmentationSection({ segmentation }: { segmentation: JsonReport['market_segmentation'] }) {
  const comp = splitSegmentField(segmentation.by_component ?? [])
  const byType = splitSegmentField(segmentation.by_type ?? [])
  const byApp = splitSegmentField(segmentation.by_application ?? [])
  const byEnd = splitSegmentField(segmentation.by_end_user ?? [])

  return (
    <section className="mb-14">
      {comp.segments.length > 0 && (
        <div className="mb-8">
          <ComponentSharePieChart title="By Component" segments={comp.segments} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {comp.strings.length > 0 && comp.segments.length === 0 && (
          <SegmentListCard title="By Component" items={comp.strings} />
        )}
        {byType.strings.length > 0 && <SegmentListCard title="By Type" items={byType.strings} />}
        {byApp.strings.length > 0 && <SegmentListCard title="By Application" items={byApp.strings} />}
        {byEnd.strings.length > 0 && <SegmentListCard title="By End User" items={byEnd.strings} />}
      </div>
    </section>
  )
}

// ── country table ─────────────────────────────────────────────────────────────

function CountryTable({ countries }: { countries: JsonReport['country_analysis'] }) {
  if (!countries.length) return null
  const maxShare = Math.max(...countries.map((c) => c.market_share))

  return (
    <div className="mt-6">
      <SubHeading>Country-Level Analysis</SubHeading>
      <div className="rounded-xl overflow-hidden border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#F5F4F0' }}>
              <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Country</th>
              <th className="text-right py-3 px-4 font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Share</th>
              <th className="text-right py-3 px-4 font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Growth</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c, i) => (
              <tr key={i} className="border-t border-[var(--border)]" style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF9' }}>
                <td className="py-3 px-4 text-[var(--foreground)] font-medium">{c.country}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-20 h-1.5 rounded-full bg-[var(--border)]">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${(c.market_share / maxShare) * 100}%`, background: '#1D4ED8' }}
                      />
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">{c.market_share.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-semibold" style={{ color: '#1D4ED8' }}>
                  +{c.growth_rate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── regional analysis ─────────────────────────────────────────────────────────

function RegionalSection({ regions, countries }: { regions: JsonReport['regional_analysis']; countries: JsonReport['country_analysis'] }) {
  if (!regions.length) return null
  const maxShare = Math.max(...regions.map((r) => r.market_share))

  return (
    <section className="mb-14">
      <div className="space-y-3 mb-6">
        {regions.map((r, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{ background: '#fff', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: '#EFF6FF', color: '#1D4ED8' }}
                >
                  {i + 1}
                </span>
                <h4 className="font-semibold text-sm text-[var(--foreground)]">{r.region}</h4>
                {r.largest_country && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F5F4F0', color: '#78716C', border: '1px solid #E7E5E4' }}>
                    Lead: {r.largest_country}
                  </span>
                )}
              </div>
              <div className="flex gap-4 text-xs">
                <span className="text-[var(--muted-foreground)]">
                  CAGR: <span className="font-bold" style={{ color: '#1D4ED8' }}>{r.growth_rate.toFixed(1)}%</span>
                </span>
                <span className="text-[var(--muted-foreground)]">
                  Share: <span className="font-bold text-[var(--foreground)]">{r.market_share.toFixed(1)}%</span>
                </span>
              </div>
            </div>

            {/* Share progress bar */}
            <div className="w-full h-1.5 rounded-full mb-3" style={{ background: '#F5F4F0' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${(r.market_share / maxShare) * 100}%`, background: 'linear-gradient(90deg, #1D4ED8, #2563EB)' }}
              />
            </div>

            {r.description && (
              <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>{r.description}</p>
            )}
          </div>
        ))}
      </div>
      <CountryTable countries={countries} />
    </section>
  )
}

// ── competitive landscape ─────────────────────────────────────────────────────

const POSITION_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Leader:     { bg: '#EFF6FF', color: '#1E40AF', border: '#93C5FD' },
  Challenger: { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  Follower:   { bg: '#F5F4F0', color: '#57534E', border: '#D6D3D1' },
  Niche:      { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
}

function CompetitiveLandscapeSection({
  players,
  profiles,
}: {
  players: JsonReport['competitive_landscape']
  profiles: JsonReport['company_profiles']
}) {
  return (
    <section className="mb-14">
      <div className="grid gap-3">
        {players.map((p, i) => {
          const profile = profiles.find((pr) => pr.company === p.company)
          const posStyle = POSITION_STYLE[p.market_position ?? ''] ?? POSITION_STYLE.Follower

          return (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: '#fff', border: '1px solid var(--border)', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(29,78,216,0.10)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {/* Company initial avatar */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: '#EFF6FF', color: '#1D4ED8' }}
                  >
                    {p.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--foreground)]">{p.company}</h4>
                    {p.headquarters && (
                      <p className="text-xs" style={{ color: '#78716C' }}>{p.headquarters}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.market_position && (
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: posStyle.bg, color: posStyle.color, border: `1px solid ${posStyle.border}` }}
                    >
                      {p.market_position}
                    </span>
                  )}
                  {profile?.revenue && (
                    <span className="text-xs font-semibold" style={{ color: '#1D4ED8' }}>
                      {profile.revenue}
                    </span>
                  )}
                </div>
              </div>

              {p.description && (
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#57534E' }}>
                  {p.description}
                </p>
              )}

              {profile?.ai_healthcare_products && profile.ai_healthcare_products.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {profile.ai_healthcare_products.map((prod, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: '#F5F4F0', color: '#57534E', border: '1px solid #E7E5E4' }}
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── recent developments ───────────────────────────────────────────────────────

function RecentDevelopmentsSection({ developments }: { developments: JsonReport['recent_developments'] }) {
  const sorted = [...developments].sort((a, b) => b.year - a.year)

  return (
    <section className="mb-14">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, #1D4ED8 0%, rgba(29,78,216,0.15) 100%)' }} />

        <div className="space-y-6">
          {sorted.map((d, i) => (
            <div key={i} className="flex gap-5">
              {/* Year bubble */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold z-10"
                  style={{ background: i === 0 ? '#1D4ED8' : '#EFF6FF', color: i === 0 ? '#fff' : '#1D4ED8', border: `2px solid ${i === 0 ? '#1D4ED8' : '#93C5FD'}` }}
                >
                  {String(d.year).slice(2)}
                </div>
              </div>

              {/* Content card */}
              <div
                className="flex-1 rounded-xl p-4 mb-1"
                style={{ background: '#fff', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold" style={{ color: '#1D4ED8' }}>{d.year}</span>
                  <span className="text-xs font-semibold text-[var(--foreground)]">{d.company}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{d.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── regulatory landscape ──────────────────────────────────────────────────────

function RegulatorySection({ items }: { items: string[] }) {
  if (!items.length) return null

  return (
    <section className="mb-14">
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ background: '#F5F4F0', color: '#1C1917', border: '1px solid #D6D3D1' }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#1D4ED8' }} />
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

// ── FAQs ──────────────────────────────────────────────────────────────────────

function JsonFAQSection({ faqs }: { faqs: JsonReport['faqs'] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!faqs.length) return null

  return (
    <section className="mb-14">
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              style={{ background: open === i ? '#EFF6FF' : '#fff' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-medium text-sm text-[var(--foreground)] pr-4">{faq.question}</span>
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-200"
                style={{
                  background: open === i ? '#1D4ED8' : '#F5F4F0',
                  color: open === i ? '#fff' : '#78716C',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                }}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: open === i ? '500px' : '0', opacity: open === i ? 1 : 0 }}
            >
              <div
                className="px-5 pb-4 pt-3 text-sm leading-relaxed"
                style={{ color: '#57534E', background: '#FAFAF9', borderTop: '1px solid #E7E5E4' }}
              >
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── main export ───────────────────────────────────────────────────────────────

export function JsonReportSections({ report }: JsonReportSectionsProps) {
  resetSectionIndex()

  const forecastStart = report.forecast_period.split('-')[0]
  const forecastEnd = report.forecast_period.split('-')[1]

  const baseYearPoint = report.market_forecast.find(
    (p) => p.year === report.base_year || p.year === parseInt(forecastStart)
  )
  const displayCurrentValue = baseYearPoint?.value ?? report.market_size.current_value

  return (
    <div>
      {/* ── Market Overview ── */}
      <section className="mb-14">
        <SectionHeading id="json-overview" num={nextSection()}>Market Overview</SectionHeading>

        {/* Editorial summary */}
        <blockquote
          className="rounded-xl p-5 mb-6 text-base leading-relaxed"
          style={{ background: '#EFF6FF', borderLeft: '4px solid #1D4ED8', color: '#1E40AF', fontStyle: 'normal' }}
        >
          {report.market_overview.summary}
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Market Stage', value: report.market_overview.market_stage },
            { label: 'Adoption Level', value: report.market_overview.adoption_level },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: '#fff', border: '1px solid var(--border)' }}
            >
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#1D4ED8' }} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#78716C' }}>
                  {label}
                </p>
                <p className="font-semibold text-[var(--foreground)]">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {report.market_overview.key_trends.length > 0 && (
          <>
            <SubHeading>Key Trends</SubHeading>
            <div className="flex flex-wrap gap-2">
              {report.market_overview.key_trends.map((trend, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                  style={{ background: '#F5F4F0', color: '#1C1917', border: '1px solid #D6D3D1' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#1D4ED8' }} />
                  {trend}
                </span>
              ))}
            </div>
          </>
        )}
      </section>


      {/* ── Charts ── */}
      <section className="mb-14">
        <SectionHeading id="charts" num={nextSection()}>Market Forecast & Data</SectionHeading>
        <div className="space-y-6">
          {report.market_forecast.length > 0 && (
            <MarketForecastLineChart
              data={report.market_forecast}
              baseYear={report.base_year}
              forecastPeriod={report.forecast_period}
              currentValue={displayCurrentValue}
              forecastValue={report.market_size.forecast_value}
              cagr={report.market_size.cagr}
              unit={report.unit}
              currency={report.currency}
            />
          )}
          <div className="grid grid-cols-1 gap-6">
            {(report.market_segmentation.by_component ?? []).some(
              (item): item is SegmentItem =>
                typeof item === 'object' && item !== null && 'market_share' in item
            ) && (
              <ComponentSharePieChart
                title="Market Share by Component"
                segments={(report.market_segmentation.by_component ?? []).filter(
                  (item): item is SegmentItem =>
                    typeof item === 'object' && item !== null && 'market_share' in item
                )}
              />
            )}
            {report.regional_analysis.length > 0 && (
              <RegionalBarChart regions={report.regional_analysis} />
            )}
          </div>
        </div>
      </section>


      {/* ── Market Dynamics ── */}
      <section className="mb-14">
        <SectionHeading id="market-dynamics" num={nextSection()}>Market Dynamics</SectionHeading>
        <MarketDynamicsSection dynamics={report.market_dynamics} />
      </section>


      {/* ── Segmentation ── */}
      <section className="mb-14">
        <SectionHeading id="segmentation" num={nextSection()}>Market Segmentation</SectionHeading>
        <MarketSegmentationSection segmentation={report.market_segmentation} />
      </section>


      {/* ── Regional + Country ── */}
      {report.regional_analysis.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="regional" num={nextSection()}>Regional Analysis</SectionHeading>
          <RegionalSection regions={report.regional_analysis} countries={report.country_analysis} />
        </section>
      )}

      {/* ── Competitive Landscape ── */}
      {report.competitive_landscape.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="competitive" num={nextSection()}>Competitive Landscape</SectionHeading>
          <CompetitiveLandscapeSection
            players={report.competitive_landscape}
            profiles={report.company_profiles}
          />
        </section>
      )}

      {/* ── Recent Developments ── */}
      {report.recent_developments.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="developments" num={nextSection()}>Recent Developments</SectionHeading>
          <RecentDevelopmentsSection developments={report.recent_developments} />
        </section>
      )}

      {/* ── Regulatory ── */}
      {report.regulatory_landscape.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="regulatory" num={nextSection()}>Regulatory Landscape</SectionHeading>
          <RegulatorySection items={report.regulatory_landscape} />
        </section>
      )}

      {/* ── FAQs ── */}
      {report.faqs.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="faq" num={nextSection()}>Frequently Asked Questions</SectionHeading>
          <JsonFAQSection faqs={report.faqs} />
        </section>
      )}
    </div>
  )
}
