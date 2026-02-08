# Report Metadata Field Mapping - Quick Reference

This document shows the exact mapping between API metadata fields and their display locations on the report detail page.

## Visual Mapping

```
┌─────────────────────────────────────────────────────────────────┐
│ SEO / HEAD                                                      │
├─────────────────────────────────────────────────────────────────┤
│ <title>                 ← meta_title || title                   │
│ <meta description>      ← meta_description || description       │
│ <meta keywords>         ← meta_keywords (split by comma)        │
│                           || [category_name, ...geography]      │
│ <meta og:title>         ← meta_title || title                   │
│ <meta og:description>   ← meta_description || description       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                      │
├─────────────────────────────────────────────────────────────────┤
│ Home > Reports > {title}                                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ HEADER SECTION                                                  │
├─────────────────────────────────────────────────────────────────┤
│ [category_name] [geography[0]]  ← Badges                        │
│                                                                 │
│ {title} ← H1 Heading                                            │
│                                                                 │
│ {description} ← Subtitle                                        │
│                                                                 │
│ ┌──────────┬──────────┬──────────┬──────────┐                  │
│ │ HF{id}   │ {date}   │ {pages}+ │ PDF,Excel│                  │
│ └──────────┴──────────┴──────────┴──────────┘                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ MARKET METRICS CARDS (4 cards in a row)                        │
├─────────────────────────────────────────────────────────────────┤
│ ┌────────────────┬────────────────┬────────────────┬──────────┐│
│ │ Revenue, 2026  │ Forecast, 2035 │ CAGR, 26-35    │ Coverage ││
│ │ $5.3 billion   │ $14.5 billion  │ 10.3%          │ Global   ││
│ │      ↑         │       ↑        │      ↑         │    ↑     ││
│ │ currentRevenue │ forecastRevenue│     cagr       │geography ││
│ │ currentYear    │ forecastYear   │ cagrStartYear  │   [0]    ││
│ │                │                │ cagrEndYear    │          ││
│ └────────────────┴────────────────┴────────────────┴──────────┘│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ MARKET OVERVIEW SECTION                                         │
├─────────────────────────────────────────────────────────────────┤
│ Market Overview                                                 │
│ ───────────────────                                             │
│ {sections.marketDetails} ← HTML content rendered               │
│                                                                 │
│ Key Findings (if available)                                     │
│ ────────────                                                    │
│ • {keyFindings[0]}                                              │
│ • {keyFindings[1]}                                              │
│ • ...                                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ COMPETITIVE LANDSCAPE SECTION                                   │
├─────────────────────────────────────────────────────────────────┤
│ Competitive Landscape                                           │
│ ─────────────────────                                           │
│ [Static description text]                                       │
│                                                                 │
│ Key Market Players                                              │
│ ──────────────────                                              │
│ ┌───────────────────────────────────────────────────┐           │
│ │ FIS                              Market Share: 12%│           │
│ └───────────────────────────────────────────────────┘           │
│ ┌───────────────────────────────────────────────────┐           │
│ │ Finastra                         Market Share: —  │           │
│ └───────────────────────────────────────────────────┘           │
│        ↑                                    ↑                   │
│   keyPlayers[].name            keyPlayers[].marketShare        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ MEET THE TEAM SECTION                                           │
├─────────────────────────────────────────────────────────────────┤
│ Meet the Team                                                   │
│ ─────────────                                                   │
│ ┌─────────────────────┬─────────────────────┐                   │
│ │ [Avatar]            │ [Avatar]            │                   │
│ │ {authors[0].name}   │ {authors[1].name}   │                   │
│ │ {authors[0].role}   │ {authors[1].role}   │                   │
│ │ {authors[0].bio}    │ {authors[1].bio}    │                   │
│ └─────────────────────┴─────────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FAQ SECTION                                                     │
├─────────────────────────────────────────────────────────────────┤
│ Frequently Asked Questions                                      │
│ ──────────────────────────                                      │
│ ▼ {faqs[0].question}                                            │
│   {faqs[0].answer}                                              │
│                                                                 │
│ ▼ {faqs[1].question}                                            │
│   {faqs[1].answer}                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SIDEBAR (Fixed on desktop, toggleable on mobile)                │
├─────────────────────────────────────────────────────────────────┤
│ Table of Contents                                               │
│ ─────────────────                                               │
│ • Overview          ← Auto-generated from marketDetails HTML    │
│   - Reports Description                                         │
│   - Overview                                                    │
│ • Competitive Landscape  ← Static section                       │
│   - Key Players                                                 │
│ • Meet the Team     ← Added if authors exist                    │
│ • FAQs              ← Added if faqs exist                       │
│                                                                 │
│ ─────────────────────────────────────────                       │
│                                                                 │
│ Purchase This Report                                            │
│ ────────────────────                                            │
│ {price}             ← Formatted price                           │
│ {discounted_price}  ← Sale price (if exists)                    │
│ [Buy Now Button]                                                │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Field Mapping Table

| API Field | Type | Display Location | Transformation | Example |
|-----------|------|------------------|----------------|---------|
| `meta_title` | string | `<title>` tag, Open Graph | None | "Global Cell Therapy Raw Materials Market Size 2026-2035dddd" |
| `meta_description` | string | `<meta description>`, Open Graph | None | "Global Cell Therapy Raw Materials Market size was valued at $6.1 billion in 2026 and it will grow $29.3 billion at a CAGR of 18.9kdjfkasjdk" |
| `meta_keywords` | string | `<meta keywords>` | Split by comma, trim whitespace | "Cell Therapy Raw Materials Market, Global Cell Therapy Raw Materials Market, ..." |
| `title` | string | H1 heading, breadcrumb | None | "Global Commercial Loan Origination Systems Market 2025 – 2034" |
| `description` | string | Subtitle text | None | Long description text |
| `id` | number | Report code | Add "HF" prefix | 8 → "HF8" |
| `category_name` | string | Badge (header) | None | "Therapeutic Area" |
| `geography[0]` | string | Badge, metric card | None | "Global" |
| `publish_date` | datetime | Published date | Format to "Month D, YYYY" | "2026-01-31..." → "January 31, 2026" |
| `page_count` | number | Pages display | Add "+" suffix | 0 → "0+" |
| `price` | number | Sidebar, price display | Format as currency | 3490 → "$3,490" |
| `discounted_price` | number | Sidebar, price display | Format as currency | 3090 → "$3,090" |
| `currency` | string | Used in price formatting | None | "USD" |
| `formats` | string[] | Format display | Join with comma | ["PDF", "Excel"] → "PDF, Excel" |
| `market_metrics.currentRevenue` | string | Metric card 1 value | Format with unit | "5.3Bn" → "$5.3 billion" |
| `market_metrics.currentYear` | number | Metric card 1 label | None | 2026 → "Revenue, 2026" |
| `market_metrics.forecastRevenue` | string | Metric card 2 value | Format with unit | "14.5Bn" → "$14.5 billion" |
| `market_metrics.forecastYear` | number | Metric card 2 label | None | 2035 → "Forecast, 2035" |
| `market_metrics.cagr` | string | Metric card 3 value | Add "%" if missing | "10.3" → "10.3%" |
| `market_metrics.cagrStartYear` | number | Metric card 3 label | Combine with end year | 2026 → "CAGR, 2026-2035" |
| `market_metrics.cagrEndYear` | number | Metric card 3 label | Combine with start year | 2035 → "CAGR, 2026-2035" |
| `sections.marketDetails` | HTML string | Market Overview section | Add IDs to headings for TOC | HTML content |
| `sections.keyPlayers` | JSON string | Key Players cards | Parse JSON to array | `[{"name":"FIS","marketShare":"12%"}]` |
| `sections.tableOfContents` | JSON string | Sidebar TOC | Parse nested JSON, flatten | Complex nested structure |
| `faqs[]` | array | FAQ accordion | None | Array of {question, answer} |
| `faqs[].question` | string | FAQ heading | None | "Who are the key players?" |
| `faqs[].answer` | string | FAQ content | None | "The key players are..." |
| `authors[]` | array | Meet the Team section | None | Array of author objects |
| `authors[].name` | string | Author card name | None | "Siddhant Pandagle" |
| `authors[].role` | string | Author card role | None | "Software Dev 1" |
| `authors[].bio` | string | Author card bio | None | "Software Dev 1" |

## JSON Structure Examples

### sections.keyPlayers

```json
[
  {
    "name": "FIS",
    "marketShare": "12%",
    "headquarters": "Jacksonville, FL" // Optional
  },
  {
    "name": "Finastra",
    "marketShare": "",
    "headquarters": "London, UK"
  }
]
```

**Maps to:**
```typescript
keyPlayers: [
  { name: "FIS", marketShare: "12%", headquarters: "Jacksonville, FL" },
  { name: "Finastra", marketShare: "—", headquarters: "London, UK" }
]
```

### sections.tableOfContents

```json
{
  "chapters": [
    {
      "id": "intro-chapter",
      "title": "Introduction",
      "sections": [
        {
          "id": "report-desc",
          "title": "Report Description",
          "subsections": [
            {
              "id": "purpose",
              "title": "Purpose of the Report"
            }
          ]
        }
      ]
    }
  ]
}
```

**Maps to (flattened):**
```typescript
[
  { id: "intro-chapter", title: "Introduction", number: "1" },
  { id: "report-desc", title: "Report Description", number: "1.1" },
  { id: "purpose", title: "Purpose of the Report", number: "1.1.1" }
]
```

### faqs

```json
[
  {
    "question": "Who are the key players in the Commercial Loan Origination Systems market?",
    "answer": "The key players in the market are FIS, Finastra, Newgen Software..."
  },
  {
    "question": "What Are the Challenges?",
    "answer": "High implementation costs, legacy system integration..."
  }
]
```

**Used directly** in FAQ component with accordion UI.

### authors

```json
[
  {
    "id": 1,
    "name": "Siddhant Pandagle",
    "role": "Software Dev 1",
    "bio": "Software Dev 1",
    "createdAt": "2026-01-05T23:42:14.246384+05:30",
    "updatedAt": "2026-01-17T21:59:28.926661+05:30"
  }
]
```

**Maps to** author cards in MeetTheTeam component.

## Special Handling

### 1. Price Formatting

```typescript
// Input: price = 3490, currency = "USD"
formatPrice(3490, "USD")
// Output: "$3,490"

// Input: discounted_price = 3090, currency = "USD"
formatPrice(3090, "USD")
// Output: "$3,090"

// Discount calculation:
const discount = ((3490 - 3090) / 3490) * 100
// 11.46% OFF
```

### 2. Revenue Formatting

```typescript
// Input from API: "5.3Bn"
formatRevenue("5.3Bn")
// Already formatted, return as-is: "$5.3Bn"

// Or if numeric input: "5.3"
formatRevenue("5.3")
// Output: "$5.3 billion"
```

### 3. Date Formatting

```typescript
// Input: "2026-01-31T05:30:00+05:30"
formatDate("2026-01-31T05:30:00+05:30")
// Output: "January 31, 2026"
```

### 4. CAGR Formatting

```typescript
// Input: "10.3"
cagr.includes('%') ? cagr : `${cagr}%`
// Output: "10.3%"

// Input: "10.3%"
cagr.includes('%') ? cagr : `${cagr}%`
// Output: "10.3%" (unchanged)
```

### 5. Meta Keywords Processing

```typescript
// Input from API: "Cell Therapy Raw Materials Market, Global Cell Therapy Raw Materials Market, Cell Therapy Raw Materials Market Share"
const keywords = report.meta_keywords
  ? report.meta_keywords.split(',').map(k => k.trim()).filter(Boolean)
  : ["healthcare market research", "healthcare industry analysis", report.category, report.region];

// Output: [
//   "Cell Therapy Raw Materials Market",
//   "Global Cell Therapy Raw Materials Market",
//   "Cell Therapy Raw Materials Market Share"
// ]

// If meta_keywords is not provided:
// Output: ["healthcare market research", "healthcare industry analysis", "Therapeutic Area", "Global"]
```

### 6. HTML Content Processing

The `marketDetails` HTML content goes through:

1. **ID Injection:** Adds IDs to H2/H3 headings for scroll linking
2. **TOC Generation:** Extracts headings to build sidebar TOC
3. **Style Application:** Wrapped in `StyledReportContent` component

```typescript
// Input: sections.marketDetails (HTML with headings)
const { toc, htmlWithIds } = parseHTMLAndGenerateTOC(marketDetails);

// htmlWithIds: HTML with id="..." added to headings
// toc: Array of { id, title, level } for sidebar
```

## Testing Checklist

When verifying metadata bindings:

- [ ] SEO title appears in browser tab (check `meta_title`)
- [ ] Meta description shows in Google search preview
- [ ] Report title displays as H1 heading
- [ ] Category and region badges show correctly
- [ ] Report code shows as "HF{id}"
- [ ] Published date is formatted correctly
- [ ] All 4 metric cards show correct values
- [ ] Market overview HTML renders correctly
- [ ] Key players cards appear with correct data
- [ ] Authors display in "Meet the Team" section
- [ ] FAQs show in accordion format
- [ ] Sidebar TOC links work correctly
- [ ] Price and discount display correctly
- [ ] "Buy Now" modal opens with correct report title

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Metric cards show "—" | `market_metrics` is null/undefined | Check API response includes this field |
| Key players not showing | JSON parsing error | Validate `sections.keyPlayers` is valid JSON |
| TOC links don't work | IDs not added to headings | Verify `parseHTMLAndGenerateTOC` function |
| Wrong price format | Currency code mismatch | Check `currency` field matches `Intl.NumberFormat` |
| CAGR missing "%" | Mapper not adding suffix | Verify mapper adds "%" if missing |
| Authors not showing | `authors` array is empty | Check API includes populated `authors` field |

## File References

- **Page:** `app/reports/[slug]/page.tsx`
- **Types:** `lib/api/reports.types.ts`
- **Mapper:** `lib/api/mappers.ts` (lines 201-305)
- **Components:**
  - Sidebar: `components/reports/ReportContentWrapper.tsx`
  - Content: `components/reports/StyledReportContent.tsx`
  - Team: `components/reports/MeetTheTeam.tsx`
  - FAQ: `components/reports/FAQ.tsx`
