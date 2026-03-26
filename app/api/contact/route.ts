import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { ContactFormData } from '@/lib/api/forms.types';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'support@neographanalytics.com';
const FROM_EMAIL = 'support@neographanalytics.com';

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    const subjectMap: Record<string, string> = {
      general: 'General Inquiry',
      research: 'Research Report Question',
      custom: 'Custom Research Request',
      partnership: 'Partnership Opportunity',
      support: 'Technical Support',
      other: 'Other',
    };

    const subjectLabel = subjectMap[data.subject] ?? data.subject;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `[Contact] ${subjectLabel} — ${data.fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td><td>${data.fullName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td>${data.company}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td>${data.phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;"><strong>Country</strong></td><td>${data.country}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Subject</strong></td><td>${subjectLabel}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong style="color: #666;">Message</strong>
            <p style="white-space: pre-wrap; margin: 8px 0 0;">${data.message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data: {
        success: true,
        submissionId: crypto.randomUUID(),
        category: 'contact',
        message: 'Thank you for your inquiry. We will get back to you shortly.',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[contact/route] Resend error:', err);
    return NextResponse.json(
      { success: false, error: 'send_failed', message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
