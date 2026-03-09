import React from 'react';
import { cn } from '@/lib/utils';

interface MarketSizeChartProps {
  marketSize2024: string;
  marketSize2032: string;
  cagr: string;
  className?: string;
}

export const MarketSizeChart = React.forwardRef<HTMLDivElement, MarketSizeChartProps>(
  ({ marketSize2024, marketSize2032, cagr, className }, ref) => {
    const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];

    const start = parseFloat(marketSize2024.replace(/[^0-9.]/g, ''));
    const end = parseFloat(marketSize2032.replace(/[^0-9.]/g, ''));

    const values = years.map((_, index) => {
      const value = start * Math.pow(end / start, index / (years.length - 1));
      return value;
    });

    const maxValue = Math.max(...values);

    return (
      <div ref={ref} className={cn('space-y-6', className)}>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Market Size 2024
            </p>
            <p className="text-3xl font-bold text-foreground">
              {marketSize2024}
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Market Size 2032
            </p>
            <p className="text-3xl font-bold text-primary">
              {marketSize2032}
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              CAGR (2025-2032)
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {cagr}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h4 className="text-lg font-semibold mb-6 text-foreground">
            Market Size Forecast (USD Billion)
          </h4>

          <div className="relative h-80">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {values.map((value, index) => {
                const height = (value / maxValue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full group">
                      <div
                        className="w-full bg-gradient-to-t from-navy-800 via-ocean-600 to-bright-500 rounded-t transition-all duration-300 hover:from-ocean-700 hover:via-ocean-600 hover:to-bright-400"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-[50%] group-hover:opacity-100 transition-opacity duration-200 bg-foreground text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                          ${value.toFixed(1)}B
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {years[index]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-navy-800 via-ocean-600 to-bright-500 rounded"></div>
              <span>Revenue (USD Billion)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MarketSizeChart.displayName = 'MarketSizeChart';
