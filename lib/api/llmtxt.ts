import reportsData from '@/data/reports.json';
import blogsData from '@/data/blogs.json';
import consultingData from '@/data/consulting-services.json';
import categoriesData from '@/data/categories.json';

interface Report {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  region: string;
  marketSize2024?: string;
  marketSize2032?: string;
  cagr?: string;
  forecastPeriod?: string;
}

interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

interface ConsultingService {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  overview: string;
  servicesInclude: string[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export function generateLLMTxt(): string {
  const reports = reportsData as Report[];
  const blogs = blogsData as Blog[];
  const services = consultingData as ConsultingService[];
  const categories = categoriesData as Category[];

  const baseUrl = 'https://www.healthcareforesights.com';

  let content = '';

  // Site Overview
  content += '# Healthcare Market Research\n\n';
  content += '## Site Overview\n\n';
  content += 'A comprehensive healthcare market research and consulting firm delivering business insights, market research reports, and strategic advisory services to organizations across the healthcare and life sciences ecosystem. We provide data-driven intelligence covering pharmaceuticals, biotechnology, medical devices, diagnostics, healthcare IT, and therapeutic areas.\n\n';
  content += `Total Research Reports: ${reports.length}\n`;
  content += `Blog Articles: ${blogs.length}\n`;
  content += `Consulting Services: ${services.length}\n`;
  content += `Content Categories: ${categories.length}\n\n`;

  // Content Categories
  content += '## Content Categories\n\n';
  categories.forEach(cat => {
    const reportCount = reports.filter(r => r.category === cat.name).length;
    content += `### ${cat.name}\n`;
    content += `${cat.description}\n`;
    content += `Reports: ${reportCount} | URL: ${baseUrl}/categories/${cat.slug}\n\n`;
  });

  // Research Reports Summary
  content += '## Research Reports\n\n';
  content += `Our portfolio includes ${reports.length} comprehensive market research reports covering global healthcare markets with detailed forecasts, competitive analysis, and strategic insights.\n\n`;

  // Category breakdown
  content += '### Reports by Category\n\n';
  const categoryGroups = categories.map(cat => {
    const count = reports.filter(r => r.category === cat.name).length;
    return { category: cat.name, count };
  }).filter(g => g.count > 0).sort((a, b) => b.count - a.count);

  categoryGroups.forEach(group => {
    content += `- ${group.category}: ${group.count} reports\n`;
  });
  content += '\n';

  // Featured Reports (top 15 most recent)
  content += '### Featured Research Reports\n\n';
  const featuredReports = reports
    .slice(0, 15)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  featuredReports.forEach(report => {
    content += `#### ${report.title}\n`;
    content += `${report.description}\n`;
    content += `Category: ${report.category} | Region: ${report.region}\n`;
    if (report.cagr && report.forecastPeriod) {
      content += `Market Growth: ${report.cagr} CAGR | Forecast: ${report.forecastPeriod}\n`;
    }
    if (report.marketSize2024 && report.marketSize2032) {
      content += `Market Size: ${report.marketSize2024} (2024) → ${report.marketSize2032} (2032)\n`;
    }
    content += `URL: ${baseUrl}/reports/${report.slug}\n\n`;
  });

  // Blog Posts
  content += '## Blog & Insights\n\n';
  content += 'Expert analysis, industry insights, and thought leadership covering emerging trends in healthcare and life sciences.\n\n';

  blogs.forEach(blog => {
    content += `### ${blog.title}\n`;
    content += `${blog.excerpt}\n`;
    content += `Author: ${blog.author} | Category: ${blog.category} | Published: ${blog.date} | ${blog.readTime}\n`;
    content += `URL: ${baseUrl}/blog/${blog.slug}\n\n`;
  });

  // Consulting Services
  content += '## Consulting Services\n\n';
  content += 'Strategic advisory services for healthcare and life sciences organizations across market intelligence, R&D, regulatory affairs, and business development.\n\n';

  // Group services by category
  const serviceCategories = [...new Set(services.map(s => s.category))];

  serviceCategories.forEach(category => {
    content += `### ${category}\n\n`;
    const categoryServices = services.filter(s => s.category === category);

    categoryServices.forEach(service => {
      content += `#### ${service.title}\n`;
      content += `${service.description}\n\n`;
      content += `${service.overview}\n\n`;
      content += 'Key Services:\n';
      service.servicesInclude.slice(0, 5).forEach(item => {
        content += `- ${item}\n`;
      });
      content += `\nURL: ${baseUrl}/consulting/${service.slug}\n\n`;
    });
  });

  // Site Structure
  content += '## Site Structure\n\n';
  content += '### Main Pages\n\n';
  content += `- Home: ${baseUrl}/\n`;
  content += `- Research Reports: ${baseUrl}/reports\n`;
  content += `- Blog & Insights: ${baseUrl}/blog\n`;
  content += `- Consulting Services: ${baseUrl}/consulting\n`;
  content += `- About Us: ${baseUrl}/about\n`;
  content += `- Contact: ${baseUrl}/contact\n\n`;

  content += '### Report Categories\n\n';
  categories.forEach(cat => {
    content += `- ${cat.name}: ${baseUrl}/categories/${cat.slug}\n`;
  });
  content += '\n';

  // Footer metadata
  content += '---\n\n';
  content += `Generated: ${new Date().toISOString()}\n`;
  content += `Total Pages: ${reports.length + blogs.length + services.length + categories.length + 10}\n`;
  content += 'Content Type: Healthcare Market Research, Life Sciences, Pharmaceuticals, Medical Devices, Biotechnology\n';

  return content;
}
