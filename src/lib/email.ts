import nodemailer from 'nodemailer';

/**
 * Sends a generic email using Nodemailer & SMTP credentials.
 */
export async function sendMail(data: nodemailer.SendMailOptions) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('SMTP credentials missing. Email send skipped.');
    return { success: false, error: 'SMTP credentials missing' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Madhyanchal Sarbajanin" <${user}>`,
      ...data,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Email sending failed',
    };
  }
}

export interface DrawingEmailParticipant {
  id: string;
  name: string;
  category: string;
  age?: string;
  dob?: string;
}

/**
 * Sends Drawing Competition Registration Confirmation Pass to Guardian Email.
 */
export async function sendDrawingRegistrationEmail({
  toEmail,
  guardianName,
  phone,
  paymentId,
  orderId,
  paymentAmount,
  participants,
}: {
  toEmail: string;
  guardianName: string;
  phone: string;
  paymentId: string;
  orderId: string;
  paymentAmount: number;
  participants: DrawingEmailParticipant[];
}) {
  if (!toEmail || !toEmail.includes('@')) {
    console.warn(
      'Invalid or missing recipient email for drawing competition confirmation.'
    );
    return { success: false, error: 'Invalid recipient email' };
  }

  const participantsListHtml = participants
    .map(
      (p, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-weight: bold; color: #1e293b;">#${idx + 1} ${p.name}</td>
        <td style="padding: 10px; font-family: monospace; color: #b45309; font-weight: bold;">${p.id}</td>
        <td style="padding: 10px; font-weight: bold; color: #047857;">Category ${p.category || 'N/A'}</td>
        <td style="padding: 10px; color: #475569;">${p.age ? `${p.age} yrs` : p.dob || 'N/A'}</td>
      </tr>`
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Drawing Competition Registration Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #d97706; padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; text-transform: uppercase;">Madhyanchal Sarbajanin</h1>
            <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Annual Sit & Draw Competition - Registration Pass</p>
          </div>

          <!-- Notice Banner -->
          <div style="background-color: #fef3c7; border-bottom: 1px solid #fde68a; padding: 14px 20px; text-align: center; font-size: 13px; font-weight: bold; color: #92400e;">
            📌 IMPORTANT: Please show this email confirmation at the registration desk on competition day.
          </div>

          <!-- Content -->
          <div style="padding: 24px;">
            <p style="font-size: 15px; margin-top: 0;">Dear <strong>${guardianName || 'Guardian'}</strong>,</p>
            <p style="font-size: 14px; color: #334155; line-height: 1.5;">
              Thank you for registering your child for the <strong>Madhyanchal Sarbajanin Annual Sit & Draw Competition</strong>! We have successfully received your online registration and payment.
            </p>

            <!-- Payment Summary -->
            <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Payment ID:</td>
                  <td style="padding: 4px 0; text-align: right; font-family: monospace; font-weight: bold;">${paymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Order ID:</td>
                  <td style="padding: 4px 0; text-align: right; font-family: monospace;">${orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Guardian Name:</td>
                  <td style="padding: 4px 0; text-align: right; font-weight: bold;">${guardianName || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Contact Phone:</td>
                  <td style="padding: 4px 0; text-align: right;">${phone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Total Fee Paid:</td>
                  <td style="padding: 4px 0; text-align: right; font-weight: bold; color: #047857; font-size: 15px;">₹${paymentAmount}</td>
                </tr>
              </table>
            </div>

            <!-- Participants Table -->
            <h3 style="font-size: 15px; color: #0f172a; margin-bottom: 10px;">Registered Participant(s) & Registration IDs</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 2px solid #cbd5e1; color: #475569;">
                  <th style="padding: 10px;">Participant</th>
                  <th style="padding: 10px;">Reg ID</th>
                  <th style="padding: 10px;">Category</th>
                  <th style="padding: 10px;">Age/DOB</th>
                </tr>
              </thead>
              <tbody>
                ${participantsListHtml}
              </tbody>
            </table>

            <!-- Venue Info -->
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #475569; line-height: 1.5;">
              <p style="margin: 0 0 6px 0;"><strong>Venue:</strong> Madhyanchal Puja Ground, Station Road, Chandannagar, Hooghly - 712136</p>
              <p style="margin: 0;"><strong>Reporting:</strong> Please arrive 30 minutes prior to your category time slot with drawing board and materials.</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #0f172a; padding: 16px; text-align: center; color: #94a3b8; font-size: 12px;">
            Madhyanchal Sarbajanin • Chandannagar, West Bengal<br/>
            Email: madhyanchalsarbajanin@gmail.com
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail({
    to: toEmail,
    subject: `Official Registration Pass: Sit & Draw Competition - Madhyanchal Sarbajanin (${paymentId})`,
    html: htmlContent,
  });
}
