/**
 * Seed all Supabase tables from local JSON files.
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env (get from dashboard > Settings > API).
 *
 * Run: npx ts-node --skip-project scripts/seed-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function readJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

async function seed<T extends object>(table: string, rows: T[], label: string) {
  const { error } = await supabase.from(table).upsert(rows as never[], { onConflict: 'id' });
  if (error) {
    console.error(`✗ ${label}:`, error.message);
  } else {
    console.log(`✓ ${label}: ${rows.length} rows`);
  }
}

async function main() {
  console.log('Seeding Supabase...\n');

  // Categories
  const categories = readJson<Array<{ id: number; name: string; slug: string; description: string }>>('categories.json');
  await seed('neograph_categories', categories, 'categories');

  // Testimonials
  const testimonials = readJson<Array<{
    id: number; quote: string; name: string; role: string; company: string; location: string; rating: number;
  }>>('testimonials.json');
  await seed('neograph_testimonials', testimonials, 'testimonials');

  // Team members (rename imageUrl → image_url, shortBio → short_bio, etc.)
  const rawTeam = readJson<Array<{
    id: string; name: string; role: string; imageUrl: string;
    shortBio: string; fullBio: string; expertise: string[]; credentials: string[];
  }>>('team-members.json');
  const team = rawTeam.map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    image_url: m.imageUrl,
    short_bio: m.shortBio,
    full_bio: m.fullBio,
    expertise: m.expertise,
    credentials: m.credentials,
  }));
  await seed('neograph_team_members', team, 'team_members');

  // Consulting services (rename camelCase → snake_case)
  const rawConsulting = readJson<Array<{
    id: number; title: string; slug: string; category: string;
    description: string; overview: string; keyHighlights: string[]; servicesInclude: string[];
  }>>('consulting-services.json');
  const consulting = rawConsulting.map(s => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    category: s.category,
    description: s.description,
    overview: s.overview,
    key_highlights: s.keyHighlights,
    services_include: s.servicesInclude,
  }));
  await seed('neograph_consulting_services', consulting, 'consulting_services');

  // Legal pages (rename lastUpdated → last_updated)
  const rawLegal = readJson<Array<{
    id: number; slug: string; title: string; excerpt: string;
    content: string; lastUpdated: string; category: string;
    metadata: { metaTitle: string; metaDescription: string; keywords: string[] };
  }>>('legal-pages.json');
  const legal = rawLegal.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    last_updated: p.lastUpdated,
    category: p.category,
    metadata: p.metadata,
  }));
  await seed('neograph_legal_pages', legal, 'legal_pages');

  // Blogs (rename readTime → read_time)
  const rawBlogs = readJson<Array<{
    id: number; slug: string; title: string; excerpt: string;
    category: string; author: string; date: string; readTime: string; location: string; content: string;
  }>>('blogs.json');
  const blogs = rawBlogs.map(b => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category,
    author: b.author,
    date: b.date,
    read_time: b.readTime,
    location: b.location,
    content: b.content,
  }));
  await seed('neograph_blogs', blogs, 'blogs');

  // Press releases (rename readTime → read_time)
  const rawPress = readJson<Array<{
    id: number; slug: string; title: string; excerpt: string;
    category: string; author: string; date: string; readTime: string; location: string; content: string;
  }>>('press-releases.json');
  const press = rawPress.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date,
    read_time: p.readTime,
    location: p.location,
    content: p.content,
  }));
  await seed('neograph_press_releases', press, 'press_releases');

  // Reports (from all_reports.json)
  const rawReports = readJson<Array<{
    report_id: string; slug: string; title: string; industry: string;
    published_year: number; base_year: number; forecast_period: string; historical_period: string;
    currency: string; unit: string; executive_summary?: string; market_context?: string;
    forecast_analysis?: string; key_highlights?: string[]; reader_takeaways?: string[];
    seo: { meta_title: string; meta_description: string; keywords: string[] };
    market_size: object; market_overview: object; market_dynamics: object;
    market_segmentation: object; regional_analysis: object[]; country_analysis: object[];
    market_forecast: object[]; charts: object[]; competitive_landscape: object[];
    company_profiles: object[]; recent_developments: object[];
    regulatory_landscape: string[]; research_methodology: object; faqs: object[];
  }>>('all_reports.json');
  const reports = rawReports.map(r => ({
    report_id: r.report_id,
    slug: r.slug,
    title: r.title,
    industry: r.industry,
    published_year: r.published_year,
    base_year: r.base_year,
    forecast_period: r.forecast_period,
    historical_period: r.historical_period,
    currency: r.currency,
    unit: r.unit,
    executive_summary: r.executive_summary ?? null,
    market_context: r.market_context ?? null,
    forecast_analysis: r.forecast_analysis ?? null,
    meta_title: r.seo.meta_title,
    meta_description: r.seo.meta_description,
    meta_keywords: r.seo.keywords,
    market_size: r.market_size,
    market_overview: r.market_overview,
    market_dynamics: r.market_dynamics,
    market_segmentation: r.market_segmentation,
    regional_analysis: r.regional_analysis,
    country_analysis: r.country_analysis,
    market_forecast: r.market_forecast,
    charts: r.charts,
    competitive_landscape: r.competitive_landscape,
    company_profiles: r.company_profiles,
    recent_developments: r.recent_developments,
    regulatory_landscape: r.regulatory_landscape,
    research_methodology: r.research_methodology,
    faqs: r.faqs,
    key_highlights: r.key_highlights ?? null,
    reader_takeaways: r.reader_takeaways ?? null,
  }));
  // Reports upsert on report_id (primary key)
  const { error: rErr } = await supabase
    .from('neograph_reports')
    .upsert(reports as never[], { onConflict: 'report_id' });
  if (rErr) {
    console.error('✗ reports:', rErr.message);
  } else {
    console.log(`✓ reports: ${reports.length} rows`);
  }

  console.log('\nSeeding complete.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
