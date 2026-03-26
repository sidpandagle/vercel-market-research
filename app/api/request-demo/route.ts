import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'support@neographanalytics.com';
const FROM_EMAIL = 'support@neographanalytics.com';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `[Demo Request] ${data.name} — ${data.company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">New Demo Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Name</strong></td><td>${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td>${data.company}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Job Title</strong></td><td>${data.jobTitle}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td>${data.phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;"><strong>Company Size</strong></td><td>${data.companySize}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Interests</strong></td><td>${data.interests}</td></tr>
            ${data.preferredDate ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Preferred Date</strong></td><td>${data.preferredDate}</td></tr>` : ''}
            ${data.preferredTime ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Preferred Time</strong></td><td>${data.preferredTime} EST</td></tr>` : ''}
          </table>
          ${data.message ? `
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong style="color: #666;">Additional Information</strong>
            <p style="white-space: pre-wrap; margin: 8px 0 0;">${data.message}</p>
          </div>` : ''}
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[request-demo/route] Resend error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to send request. Please try again.' },
      { status: 500 }
    );
  }
}
