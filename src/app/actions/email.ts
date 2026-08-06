'use server';

import {
  sendDrawingRegistrationEmail,
  sendMail as sendMailLib,
  type DrawingEmailParticipant,
} from '@/lib/email';
import type nodemailer from 'nodemailer';

export async function sendMail(data: nodemailer.SendMailOptions) {
  return sendMailLib(data);
}

/**
 * Server Action triggered in development mode (when process.env.NODE_ENV !== 'production')
 * directly from the Razorpay payment handler on client-side success.
 */
export async function sendDrawingEmailAction(data: {
  toEmail: string;
  guardianName: string;
  phone: string;
  paymentId: string;
  orderId: string;
  paymentAmount: number;
  participants: DrawingEmailParticipant[];
}) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      '[Dev Mode] Client Razorpay payment handler triggering Drawing Registration Email...'
    );
    return await sendDrawingRegistrationEmail(data);
  }
  return {
    success: true,
    message: 'In production mode, email is triggered via Razorpay Webhook.',
  };
}
