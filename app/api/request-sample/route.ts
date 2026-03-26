import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { RequestSampleFormData } from '@/lib/api/forms.types';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'support@neographanalytics.com';
const FROM_EMAIL = 'support@neographanalytics.com';

export async function POST(request: NextRequest) {
  try {
    const data: RequestSampleFormData = await request.json();

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `[Sample Request] ${data.reportTitle} — ${data.fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">New Sample Report Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td><td>${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td>${data.company}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Job Title</strong></td><td>${data.jobTitle}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td>${data.phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;"><strong>Country</strong></td><td>${data.country}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Report</strong></td><td>${data.reportTitle}</td></tr>
          </table>
          ${data.additionalInfo ? `
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong style="color: #666;">Additional Information</strong>
            <p style="white-space: pre-wrap; margin: 8px 0 0;">${data.additionalInfo}</p>
          </div>` : ''}
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data: {
        success: true,
        submissionId: crypto.randomUUID(),
        category: 'request-sample',
        message: 'Thank you for your request. We will send you the sample shortly.',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[request-sample/route] Resend error:', err);
    return NextResponse.json(
      { success: false, error: 'send_failed', message: 'Failed to send request. Please try again.' },
      { status: 500 }
    );
  }
}
