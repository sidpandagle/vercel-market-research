import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui';
import type { Report } from '@/lib/api/reports.types';

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <Link href={`/reports/${report.slug}`} className="block h-full group">
      <Card className="h-full hover:shadow-primary-lg hover:border-ocean-500 transition-all duration-300 hover:-translate-y-1 overflow-hidden">

        {/* Card Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <CardHeader>
            {/* Badge Row */}
            <div className="flex items-center justify-between mb-3">
              <Badge variant="primary" size="sm" className="shadow-sm">
                {report.category}
              </Badge>
            </div>

            <CardTitle className="mb-2 text-lg group-hover:text-ocean-700 transition-colors">
              {report.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <CardDescription className="line-clamp-4 mb-4 text-slate-600">
              {report.summary}
            </CardDescription>

            {/* Metadata Row with Icons */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm mb-6 text-slate-500">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🌍</span>
                  <span>{report.region}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📄</span>
                  <span>{report.reportType}</span>
                </div>
              </div>
              <span className="text-sm font-medium text-ocean-600 group-hover:text-ocean-700 flex items-center gap-1 ml-auto">
                Read More
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
