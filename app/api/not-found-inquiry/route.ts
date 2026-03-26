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
      subject: `[404 Lead] ${data.name} — ${data.company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">New Inquiry from 404 Page</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Name</strong></td><td>${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td>${data.company}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Interest</strong></td><td>${data.interest}</td></tr>
            ${data.attemptedUrl ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Attempted URL</strong></td><td>${data.attemptedUrl}</td></tr>` : ''}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[not-found-inquiry/route] Resend error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to send. Please try again.' },
      { status: 500 }
    );
  }
}
