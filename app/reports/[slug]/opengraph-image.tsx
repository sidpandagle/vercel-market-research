import { ImageResponse } from 'next/og';
import { getReportBySlug, isApiError } from '@/lib/api';

export const alt = 'Healthcare Market Research Report';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = 'Healthcare Market Research Report';
  let category = 'Market Research';
  let region = 'Global';
  let reportCode = '';
  let description = '';

  try {
    const response = await getReportBySlug(slug);
    if (!isApiError(response)) {
      const report = response.data;
      title = report.title;
      category = report.category || 'Market Research';
      region = report.region || 'Global';
      reportCode = report.reportCode || `HF${report.id}`;
      description = report.meta_description || report.description || '';
    }
  } catch {
    // Use defaults
  }

  const fontSize = title.length > 90 ? 34 : title.length > 60 ? 40 : 48;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a2540 0%, #0d3d55 60%, #0a4a5a 100%)',
          padding: '56px 64px 48px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top teal accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #26A69A 0%, #00BCD4 100%)',
          }}
        />

        {/* Decorative circle — top right */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'rgba(38, 166, 154, 0.08)',
          }}
        />

        {/* Decorative circle — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-60px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'rgba(38, 166, 154, 0.06)',
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '22px',
              background: '#26A69A',
              borderRadius: '2px',
            }}
          />
          <div
            style={{
              color: '#26A69A',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Healthcare Foresights
          </div>
        </div>

        {/* Category + Region badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              background: 'rgba(38, 166, 154, 0.18)',
              border: '1px solid rgba(38, 166, 154, 0.5)',
              borderRadius: '6px',
              padding: '5px 14px',
              color: '#4DD0C4',
              fontSize: '15px',
              fontWeight: '600',
            }}
          >
            {category}
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '5px 14px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '15px',
            }}
          >
            {region}
          </div>
        </div>

        {/* Report title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: `${fontSize}px`,
            fontWeight: '800',
            lineHeight: '1.25',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title}
        </div>

        {/* Description — only if short enough */}
        {description && description.length < 140 && (
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.45)',
              fontSize: '17px',
              lineHeight: '1.5',
              marginTop: '16px',
              marginBottom: '8px',
            }}
          >
            {description}
          </div>
        )}

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            marginTop: '20px',
          }}
        >
          <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '15px' }}>
            Market Research Report{reportCode ? ` · ${reportCode}` : ''}
          </div>
          <div style={{ color: 'rgba(38, 166, 154, 0.8)', fontSize: '15px', fontWeight: '600' }}>
            healthcareforesights.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
