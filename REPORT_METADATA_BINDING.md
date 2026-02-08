# Report Metadata Binding Guide

This document explains how the report metadata from the API is bound to the report detail page (`/reports/[slug]`).

## Overview

The report detail page (`app/reports/[slug]/page.tsx`) fetches report data from the API and displays it using various components. The data flow is:

```
API Response → Mapper Function → UI Component
```

## API Response Structure

The API returns report data with the following key fields:

```typescript
{
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  discounted_price?: number;
  currency: string;
  page_count: number;
  formats: string[];
  geography: string[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  market_metrics: {
    currentRevenue: string;      // e.g., "5.3Bn"
    currentYear: number;          // e.g., 2026
    forecastRevenue: string;      // e.g., "14.5Bn"
    forecastYear: number;         // e.g., 2035
    cagr: string;                 // e.g., "10.3"
    cagrStartYear: number;        // e.g., 2026
    cagrEndYear: number;          // e.g., 2035
  };
  sections: {
    keyPlayers: string;           // JSON string of key players array
    marketDetails: string;        // HTML content
    tableOfContents: string;      // JSON string of TOC structure
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  authors: Array<{
    id: number;
    name: string;
    role: string;
    bio: string;
  }>;
}
```

## Metadata Field Bindings

### 1. SEO Metadata (generateMetadata function)

**Location:** `app/reports/[slug]/page.tsx:31-57`

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const report = response.data;

  return {
    title: report.meta_title || report.title,
    description: report.meta_description || report.description,
    keywords: [...],
    openGraph: {
      title: report.meta_title || report.title,
      description: report.meta_description || report.description,
    },
  };
}
```

**Bindings:**
- `meta_title` → `<title>` tag and Open Graph title (fallback to `title`)
- `meta_description` → meta description and Open Graph description (fallback to `description`)
- `meta_keywords` → meta keywords (comma-separated string, split into array)
  - If `meta_keywords` not provided: fallback to `["healthcare market research", "healthcare industry analysis", category, region]`

### 2. Report Header Section

**Location:** `app/reports/[slug]/page.tsx:316-350`

```jsx
<header className="mb-8 pb-8 border-b">
  <Badge variant="default">{report.category}</Badge>
  <Badge variant="outline">{report.region}</Badge>
  <h1>{report.title}</h1>
  <p>{report.description}</p>

  <div className="grid grid-cols-4">
    <div>Report Code: {report.reportCode || `HF${report.id}`}</div>
    <div>Published: {report.date}</div>
    <div>Pages: {report.pages}+</div>
    <div>Format: PDF, Excel</div>
  </div>
</header>
```

**Bindings:**
- `category_name` → Category badge
- `geography[0]` → Region badge (via mapper: `region`)
- `title` → H1 heading
- `description` → Subtitle text
- `id` → Report code (HF prefix)
- `publish_date` → Published date (formatted)
- `page_count` → Pages count
- `formats` → Format display (hardcoded for now)

### 3. Market Metrics Cards

**Location:** `app/reports/[slug]/page.tsx:170-292`

The metric cards display market size and growth data:

```jsx
const metricCards = [
  {
    label: `Revenue, ${baseYearLabel}`,
    value: report.marketSize2024 || '—',
  },
  {
    label: `Forecast, ${forecastEndYear}`,
    value: report.marketSize2032 || '—',
  },
  {
    label: `CAGR, ${forecastRangeLabel}`,
    value: report.cagr || '—',
  },
  {
    label: 'Report Coverage',
    value: report.region,
  },
];
```

**Bindings (via mapper):**
- `market_metrics.currentRevenue` → First card value (formatted as "$5.3 billion")
- `market_metrics.currentYear` → First card label year
- `market_metrics.forecastRevenue` → Second card value (formatted)
- `market_metrics.forecastYear` → Second card label year
- `market_metrics.cagr` → Third card value (with % suffix)
- `market_metrics.cagrStartYear` + `cagrEndYear` → CAGR period label
- `geography[0]` → Fourth card value

### 4. Market Overview Section

**Location:** `app/reports/[slug]/page.tsx:370-395`

```jsx
<section className="mb-12">
  <h2>Market Overview</h2>
  <StyledReportContent htmlContent={marketDetailsWithIds} />

  {report.keyFindings && (
    <div>
      <h3>Key Findings</h3>
      <ul>
        {report.keyFindings.map((finding) => (
          <li>{finding}</li>
        ))}
      </ul>
    </div>
  )}
</section>
```

**Bindings:**
- `sections.marketDetails` → HTML content (with IDs added for TOC linking)
- `sections.keyFindings` → Parsed as JSON array and displayed as bullet list (if available)

### 5. Competitive Landscape Section

**Location:** `app/reports/[slug]/page.tsx:399-442`

```jsx
<section className="mb-12">
  <h2>Competitive Landscape</h2>

  {report.keyPlayers && (
    <div>
      <h3>Key Market Players</h3>
      {report.keyPlayers.map((player) => (
        <Card>
          <h4>{player.name}</h4>
          <p>Market Share: {player.marketShare}</p>
        </Card>
      ))}
    </div>
  )}
</section>
```

**Bindings (via mapper):**
- `sections.keyPlayers` → Parsed as JSON array
  - Each player has: `name`, `marketShare`, `headquarters` (optional)

**Example keyPlayers JSON:**
```json
[
  {"name": "FIS", "marketShare": "12%"},
  {"name": "Finastra", "marketShare": ""},
  {"name": "Newgen Software", "marketShare": ""}
]
```

### 6. Meet the Team Section

**Location:** `app/reports/[slug]/page.tsx:475`

```jsx
<MeetTheTeam teamMembers={report.authors} />
```

**Bindings:**
- `authors` → Array of author objects with:
  - `id`, `name`, `role`, `bio`, `imageUrl`, `linkedinUrl`

### 7. FAQ Section

**Location:** `app/reports/[slug]/page.tsx:478`

```jsx
{report.faqs && <FAQ faqs={report.faqs} />}
```

**Bindings:**
- `faqs` → Array of FAQ objects with `question` and `answer`

### 8. Sidebar Table of Contents

**Location:** `app/reports/[slug]/page.tsx:134-164`

The sidebar TOC is generated from:
1. Parsed HTML headings from `marketDetails` (using `parseHTMLAndGenerateTOC`)
2. Static sections (Competitive Landscape, Meet the Team, FAQ)
3. Structured TOC from `sections.tableOfContents` (if available)

**Bindings:**
- `sections.marketDetails` → Auto-generated TOC from H2/H3 headings
- `sections.tableOfContents` → Parsed JSON structure (optional)
- Static sections → Added based on data availability

### 9. Price Display (Sidebar)

**Location:** `components/reports/ReportContentWrapper.tsx`

```jsx
<ReportContentWrapper
  price={report.price}
  discounted_price={report.discounted_price}
  reportTitle={report.title}
/>
```

**Bindings:**
- `price` → Original price (formatted as currency)
- `discounted_price` → Sale price (formatted as currency)
- Shows discount percentage if both prices exist

## Data Transformation (Mapper)

The `mapApiReportToReport` function in `lib/api/mappers.ts` transforms API data to UI format:

### Key Transformations:

1. **Price Formatting:**
   ```typescript
   price: formatPrice(apiReport.price, apiReport.currency)
   // 3490 → "$3,490"
   ```

2. **Revenue Formatting:**
   ```typescript
   marketSize2024: formatRevenue(metrics.currentRevenue)
   // "5.3Bn" → "$5.3 billion"
   ```

3. **CAGR Formatting:**
   ```typescript
   cagr: metrics.cagr.includes('%') ? metrics.cagr : `${metrics.cagr}%`
   // "10.3" → "10.3%"
   ```

4. **Key Players Parsing:**
   ```typescript
   keyPlayers: parseKeyPlayers(apiReport.sections.keyPlayers)
   // JSON string → Array of {name, marketShare, headquarters}
   ```

5. **Table of Contents Parsing:**
   ```typescript
   fullReportTOC: parseTableOfContents(apiReport.sections.tableOfContents)
   // Nested JSON → Flat array with numbering
   ```

6. **Date Formatting:**
   ```typescript
   date: formatDate(apiReport.publish_date || apiReport.created_at)
   // "2026-01-31T05:30:00+05:30" → "January 31, 2026"
   ```

## Example: Complete Data Flow

For the "Commercial Loan Origination Systems Market" report:

```
API Response:
{
  id: 8,
  slug: "commercial-loan-origination-systems-market",
  title: "Global Commercial Loan Origination Systems Market 2025 – 2034",
  meta_title: "Commercial Loan Origination Systems Market Size 2025 - 2034",
  market_metrics: {
    currentRevenue: "5.3Bn",
    currentYear: 2026,
    forecastRevenue: "14.5Bn",
    forecastYear: 2035,
    cagr: "10.3"
  }
}

↓ Mapper (mapApiReportToReport)

UI Report:
{
  id: 8,
  slug: "commercial-loan-origination-systems-market",
  title: "Global Commercial Loan Origination Systems Market 2025 – 2034",
  reportCode: "HF8",
  marketSize2024: "$5.3 billion",
  marketSize2032: "$14.5 billion",
  cagr: "10.3%",
  baseYear: "2026",
  forecastPeriod: "2026-2035"
}

↓ Component

<Card>
  <p>Revenue, 2026</p>
  <p>$5.3 billion</p>
</Card>
```

## Adding New Metadata Fields

To add a new metadata field:

1. **Update API type** (`lib/api/reports.types.ts`):
   ```typescript
   export interface ApiReport {
     // ... existing fields
     new_field?: string;
   }
   ```

2. **Update UI type** (if needed):
   ```typescript
   export interface Report {
     // ... existing fields
     newField?: string;
   }
   ```

3. **Update mapper** (`lib/api/mappers.ts`):
   ```typescript
   export function mapApiReportToReport(apiReport: ApiReport): Report {
     return {
       // ... existing mappings
       newField: apiReport.new_field,
     };
   }
   ```

4. **Use in component** (`app/reports/[slug]/page.tsx`):
   ```jsx
   <div>{report.newField}</div>
   ```

## Debugging Tips

1. **Check API response:** Log `response.data` in the page component
2. **Check mapper output:** Log the result of `mapApiReportToReport`
3. **Check component props:** Use React DevTools to inspect props
4. **Verify JSON parsing:** Check browser console for parsing errors

## Related Files

- **Page Component:** `app/reports/[slug]/page.tsx`
- **API Types:** `lib/api/reports.types.ts`
- **Mapper:** `lib/api/mappers.ts`
- **API Functions:** `lib/api/reports.ts`
- **UI Components:**
  - `components/reports/ReportContentWrapper.tsx`
  - `components/reports/StyledReportContent.tsx`
  - `components/reports/MeetTheTeam.tsx`
  - `components/reports/FAQ.tsx`
