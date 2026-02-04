'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button } from '@/components/ui';
import type { Report } from '@/lib/api/reports.types';

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <Link href={`/reports/${report.slug}`} className="block h-full group">
      <Card className="h-full flex flex-col hover:shadow-primary-lg hover:border-ocean-500 transition-all duration-300 hover:-translate-y-1">
        <CardHeader>
          {/* Badge + Price Row */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="primary" size="sm" className="shadow-sm">
              {report.category}
            </Badge>
            <div className="text-right">
              {report.discounted_price &&
                <div className="text-sm text-slate-500 line-through">
                  {report.price}/-
                </div>
              }
              <div className="text-lg font-bold bg-gradient-to-r from-ocean-700 via-ocean-600 to-bright-500 bg-clip-text text-transparent">
                {report.discounted_price ? report.discounted_price : report.price}/-
              </div>
            </div>
          </div>

          <CardTitle className="mb-2 text-lg group-hover:text-ocean-700 transition-colors">
            {report.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <CardDescription className="line-clamp-4 mb-4 text-slate-600">
            {report.description}
          </CardDescription>

          {/* Metadata Row with Icons */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="text-base">🌍</span>
              <span>{report.region}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">📄</span>
              <span>{report.reportType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">📅</span>
              <span>{report.year}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-slate-200 pt-4 mt-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-slate-500">
              {report.pages} pages
            </span>
            <span className="text-sm font-medium text-ocean-600 group-hover:text-ocean-700 flex items-center gap-1">
              View Details
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
