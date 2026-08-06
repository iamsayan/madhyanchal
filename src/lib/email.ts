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
      replyTo: user,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        Importance: 'Normal',
      },
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
 * Includes both plain text and HTML to ensure maximum inbox deliverability and prevent Spam flagging.
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

  const displayPaymentId =
    paymentId && paymentId.length > 5 ? paymentId : 'DC-ONLINE';

  const formatAgeDisplay = (age?: string, dob?: string) => {
    if (!age || !age.trim()) return dob || 'N/A';
    const cleanAge = age.trim();
    if (/yrs?|mos?|month|year/i.test(cleanAge)) {
      return cleanAge;
    }
    return `${cleanAge} yrs`;
  };

  const participantsListHtml = participants
    .map(
      (p, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-weight: bold; color: #1e293b;">#${idx + 1} ${p.name}</td>
        <td style="padding: 10px; font-family: monospace; color: #b45309; font-weight: bold;">${p.id}</td>
        <td style="padding: 10px; font-weight: bold; color: #047857;">Category ${p.category || 'N/A'}</td>
        <td style="padding: 10px; color: #475569;">${formatAgeDisplay(p.age, p.dob)}</td>
      </tr>`
    )
    .join('');

  const participantsListText = participants
    .map(
      (p, idx) =>
        `${idx + 1}. ${p.name} - Reg ID: ${p.id} (Category ${p.category || 'N/A'}, Age/DOB: ${formatAgeDisplay(p.age, p.dob)})`
    )
    .join('\n');

  const textContent = `Madhyanchal Sarbajanin - Annual Sit & Draw Competition Registration Pass

Dear ${guardianName || 'Guardian'},

Thank you for registering your child for the Madhyanchal Sarbajanin Annual Sit & Draw Competition. We have successfully received your online registration and payment.

PLEASE SHOW THIS EMAIL CONFIRMATION AT THE DESK ON COMPETITION DAY.

Payment Details:
- Payment ID: ${displayPaymentId}
- Order ID: ${orderId}
- Guardian Name: ${guardianName || 'N/A'}
- Contact Phone: ${phone || 'N/A'}
- Amount Paid: Rs. ${paymentAmount}

Registered Participants:
${participantsListText}

Venue: Madhyanchal Puja Ground, Station Road, Chandannagar, Hooghly - 712136
Reporting Time: Please arrive 30 minutes prior to your category time slot with drawing board and materials.

Madhyanchal Sarbajanin, Chandannagar, West Bengal`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sit and Draw Competition Registration Confirmation</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          body, table, td, p, a, li, blockquote {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
          }
        </style>
      </head>
      <body style="font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #0f172a; -webkit-font-smoothing: antialiased;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01);">
          <!-- Premium Header -->
          <div style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">Madhyanchal Sarbajanin</h1>
            <p style="margin: 6px 0 0 0; font-size: 13.5px; font-weight: 600; color: #fef3c7; letter-spacing: 0.2px;">Annual Sit & Draw Competition Pass</p>
          </div>

          <!-- Notice Banner -->
          <div style="background-color: #fffbeb; border-bottom: 1px solid #fef3c7; padding: 14px 20px; text-align: center; font-size: 12.5px; font-weight: 700; color: #92400e;">
            📢 Please present this digital pass / printout at the registration desk on competition day.
          </div>

          <!-- Content -->
          <div style="padding: 28px 24px;">
            <p style="font-size: 15px; margin-top: 0; font-weight: 700; color: #0f172a;">Respected <span>${guardianName || 'Guardian'}</span>,</p>
            <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
              Thank you for registering for the <strong>Madhyanchal Sarbajanin Annual Sit & Draw Competition</strong>! We have successfully received your online registration details and payment.
            </p>

            <!-- Payment Summary Card -->
            <div style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; padding: 18px 20px; margin-bottom: 28px;">
              <div style="font-size: 12px; font-weight: 800; uppercase; tracking: 0.5px; color: #d97706; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                PAYMENT & REGISTRATION SUMMARY
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 5px 0; color: #64748b; font-weight: 500;">Payment ID:</td>
                  <td style="padding: 5px 0; text-align: right; font-family: monospace; font-weight: 700; color: #0f172a;">${displayPaymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #64748b; font-weight: 500;">Order ID:</td>
                  <td style="padding: 5px 0; text-align: right; font-family: monospace; color: #475569;">${orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #64748b; font-weight: 500;">Guardian Name:</td>
                  <td style="padding: 5px 0; text-align: right; font-weight: 700; color: #0f172a;">${guardianName || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #64748b; font-weight: 500;">Contact Phone:</td>
                  <td style="padding: 5px 0; text-align: right; color: #334155; font-weight: 600;">${phone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 0 0; color: #64748b; font-weight: 600; border-top: 1px dashed #cbd5e1;">Total Fee Paid:</td>
                  <td style="padding: 8px 0 0 0; text-align: right; font-weight: 800; color: #047857; font-size: 16px; border-top: 1px dashed #cbd5e1;">₹${paymentAmount}</td>
                </tr>
              </table>
            </div>

            <!-- Participants Table -->
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.3px;">Registered Participant(s)</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
              <thead>
                <tr style="background-color: #f1f5f9; color: #475569; font-size: 12px; font-weight: 700; text-transform: uppercase;">
                  <th style="padding: 12px;">Participant</th>
                  <th style="padding: 12px;">Reg ID</th>
                  <th style="padding: 12px;">Category</th>
                  <th style="padding: 12px;">Age/DOB</th>
                </tr>
              </thead>
              <tbody>
                ${participantsListHtml}
              </tbody>
            </table>

            <!-- Venue & Instructions Info -->
            <div style="margin-top: 28px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 20px; font-size: 13px; color: #166534; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; font-weight: 700;">📍 Venue Details:</p>
              <p style="margin: 0 0 8px 0;">Madhyanchal Puja Ground, Station Road, Chandannagar, Hooghly - 712136</p>
              <p style="margin: 0; font-size: 12.5px; color: #15803d;"><strong>Reporting Time:</strong> Please report 30 minutes prior to your category time slot with drawing board and art supplies.</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; font-weight: 500; line-height: 1.6;">
            <strong style="color: #f8fafc;">Madhyanchal Sarbajanin Durga Puja Samity</strong><br/>
            Chandannagar, Hooghly, West Bengal • Contact: madhyanchalsarbajanin@gmail.com
          </div>
        </div>
      </body>
    </html>
  `;

  return sendMail({
    to: toEmail,
    subject: `Registration Pass: Sit & Draw Competition - Madhyanchal Sarbajanin`,
    text: textContent,
    html: htmlContent,
  });
}
