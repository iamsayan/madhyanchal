import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

import cockpit from '@/lib/client';
import { currentYear, getMemberById } from '@/lib/data';
import { calculateAmountDue, normalizePhone } from '@/lib/member-utils';
import { sendDrawingRegistrationEmail } from '@/lib/email';
import { sendWhatsAppMessage, type TwilioMessageResult } from '@/lib/twilio';
import type {
  DrawingCompetitionRecord,
  DressOrder,
  MembershipPayment,
} from '@/types';

interface RazorpayPaymentEntity {
  id: string;
  order_id: string;
  amount: number;
  email?: string;
  contact?: string;
  notes?: Record<string, any>;
}

function formatTimestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

async function handleMembershipPayment(
  payment: RazorpayPaymentEntity,
  paymentYear: string,
  paymentAmount: number,
  phone: string
): Promise<{
  messageResult: TwilioMessageResult | null;
  duplicate: boolean;
  error?: string;
}> {
  const collectionName = `membershippayments${paymentYear}`;
  const existing = await cockpit.listContentItems<MembershipPayment[]>(
    collectionName,
    { filter: { payment_id: payment.id } }
  );

  if (Array.isArray(existing) && existing.length > 0) {
    return { messageResult: null, duplicate: true };
  }

  await cockpit.saveContentItem(collectionName, {
    member: { _id: payment.notes?.member_id, model: 'members' },
    amount: paymentAmount,
    timestamp: formatTimestamp(),
    mode: 'razorpay',
    payment_id: payment.id,
    order_id: payment.order_id,
    phone,
    email: payment.notes?.email || '',
  });

  const memberId = payment.notes?.member_id;
  const member = await getMemberById(memberId, paymentYear);

  if (!member) {
    return { messageResult: null, duplicate: false, error: 'Member not found' };
  }

  const amountDue = calculateAmountDue(member.amount, member.payments);
  const memberName = (payment.notes?.name || member.name || '').trim();

  const contentVariables: Record<string, string> = {
    memberName,
    paymentAmount: String(paymentAmount),
    memberId: String(memberId).trim(),
  };

  let contentSid = process.env.TWILIO_TEMPLATE_ACKNOWLEDGEMENT_NO_DUE || '';
  if (amountDue > 0) {
    contentVariables.dueAmount = String(amountDue);
    contentSid = process.env.TWILIO_TEMPLATE_ACKNOWLEDGEMENT_DUE || '';
  }

  let messageResult: TwilioMessageResult | null = null;
  if (phone && contentSid) {
    messageResult = await sendWhatsAppMessage(
      phone,
      contentSid,
      contentVariables
    );
  }

  return { messageResult, duplicate: false };
}

async function handleDressPayment(
  payment: RazorpayPaymentEntity,
  paymentYear: string,
  paymentAmount: number,
  phone: string
): Promise<{ duplicate: boolean }> {
  const collectionName = `dress${paymentYear}`;
  const existing = await cockpit.listContentItems<DressOrder[]>(
    collectionName,
    { filter: { payment_id: payment.id } }
  );

  if (Array.isArray(existing) && existing.length > 0) {
    return { duplicate: true };
  }

  const notes = payment.notes || {};
  const sizes = ['kid', 'small', 'medium', 'large', 'xl', 'xxl'];
  const quantities = sizes
    .filter((size) => Number(notes[size]) > 0)
    .map((size) => `${size.toUpperCase()} - ${notes[size]}`);

  await cockpit.saveContentItem(collectionName, {
    name: notes.name || '',
    amount: paymentAmount,
    timestamp: formatTimestamp(),
    mode: 'razorpay',
    payment_id: payment.id,
    order_id: payment.order_id,
    phone,
    email: notes.email || '',
    quantity: quantities,
  });

  return { duplicate: false };
}

async function handleDrawingPayment(
  payment: RazorpayPaymentEntity,
  paymentYear: string,
  paymentAmount: number,
  phone: string
): Promise<{ messageResult: TwilioMessageResult | null; duplicate: boolean }> {
  const collectionName = `drawingcompetition${paymentYear}`;

  const alreadyProcessed = await cockpit.listContentItems<
    DrawingCompetitionRecord[]
  >(collectionName, { filter: { payment_id: payment.id } });

  if (Array.isArray(alreadyProcessed) && alreadyProcessed.length > 0) {
    return { messageResult: null, duplicate: true };
  }

  const notes = payment.notes || {};
  const count = Number(notes.participants_count) || 1;

  const participants: Array<{
    id: string;
    name: string;
    dob: string;
    age: string;
    category: string;
  }> = [];

  for (let i = 1; i <= count; i++) {
    const rawP = notes[`p${i}`] || '';
    const parts = typeof rawP === 'string' && rawP ? rawP.split('|') : [];

    const name = parts[0]?.trim() || '';
    const dob = parts[1]?.trim() || '';
    const age = parts[2]?.trim() || '';
    const category = parts[3]?.trim() || '';
    const id = parts[4]?.trim() || '';

    if (name || id) {
      participants.push({ name, dob, age, category, id });
    }
  }

  const feePerParticipant = Math.round(
    paymentAmount / (participants.length || 1)
  );

  for (const p of participants) {
    await cockpit.saveContentItem(collectionName, {
      registration_id: p.id,
      mode: 'online',
      name: p.name,
      dob: p.dob,
      age: p.age,
      category: p.category,
      guardian_name: notes.guardian_name || '',
      email: notes.email || payment.email || '',
      phone: phone || '',
      address: notes.address || '',
      city: notes.city || '',
      pincode: notes.pincode || '',
      payment_id: payment.id,
      order_id: payment.order_id,
      amount: String(feePerParticipant),
      timestamp: formatTimestamp(),
    });
  }

  const guardianEmail = (notes.email || payment.email || '').trim();
  if (guardianEmail) {
    try {
      await sendDrawingRegistrationEmail({
        toEmail: guardianEmail,
        guardianName: notes.guardian_name || '',
        phone: phone || '',
        paymentId: payment.id,
        orderId: payment.order_id,
        paymentAmount,
        participants: participants.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          age: p.age,
          dob: p.dob,
        })),
      });
    } catch (emailErr) {
      console.error('Error sending drawing registration email:', emailErr);
    }
  }

  return { messageResult: null, duplicate: false };
}

export async function POST(req: NextRequest) {
  try {
    const rawPayload = await req.text();
    const webhookSignature = req.headers.get('x-razorpay-signature') || '';

    if (!rawPayload || !webhookSignature) {
      return NextResponse.json(
        { success: false, error: 'Missing payload or signature' },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, error: 'Server webhook secret misconfigured' },
        { status: 500 }
      );
    }

    const isValidSignature = Razorpay.validateWebhookSignature(
      rawPayload,
      webhookSignature,
      secret
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { success: false, error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    const webhookData = JSON.parse(rawPayload);
    const event = webhookData.event;
    const payment = webhookData.payload?.payment?.entity;

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment entity missing' },
        { status: 400 }
      );
    }

    const paymentAmount = Math.round((payment.amount / 100) * 100) / 100;
    const paymentType = payment.notes?.type || null;
    const paymentYear = payment.notes?.year || currentYear;
    const phone = normalizePhone(payment.notes?.phone || payment.contact);

    let messageResult: TwilioMessageResult | null = null;

    if (event === 'payment.captured') {
      if (paymentType === 'membership') {
        const res = await handleMembershipPayment(
          payment,
          paymentYear,
          paymentAmount,
          phone
        );
        if (res.duplicate) {
          return NextResponse.json({
            success: true,
            message: 'Payment already processed (duplicate webhook)',
            payment_id: payment.id,
          });
        }
        if (res.error) {
          return NextResponse.json(
            { success: false, error: res.error },
            { status: 404 }
          );
        }
        messageResult = res.messageResult;
      } else if (paymentType === 'monthly-subscription') {
        const contentSid = process.env.TWILIO_TEMPLATE_MONTHLY_SUBSCRIPTION!;
        if (phone) {
          messageResult = await sendWhatsAppMessage(phone, contentSid, {
            Payment: String(paymentAmount),
            Name: (payment.notes?.name || '').trim(),
          });
        }
      } else if (paymentType === 'dress') {
        const res = await handleDressPayment(
          payment,
          paymentYear,
          paymentAmount,
          phone
        );
        if (res.duplicate) {
          return NextResponse.json({
            success: true,
            message: 'Dress order already processed (duplicate webhook)',
            payment_id: payment.id,
          });
        }
      } else if (paymentType === 'drawing') {
        const res = await handleDrawingPayment(
          payment,
          paymentYear,
          paymentAmount,
          phone
        );
        if (res.duplicate) {
          return NextResponse.json({
            success: true,
            message:
              'Drawing competition order already processed (duplicate webhook)',
            payment_id: payment.id,
          });
        }
        messageResult = res.messageResult;
      }
    } else if (event === 'payment.failed') {
      const contentSid = process.env.TWILIO_TEMPLATE_FAILED_PAYMENT!;
      if (phone) {
        messageResult = await sendWhatsAppMessage(phone, contentSid, {});
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      payment_id: payment.id || null,
      amount: paymentAmount,
      message_sid: messageResult?.sid || null,
    });
  } catch (error: unknown) {
    console.error('Error processing Razorpay webhook:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Webhook error',
      },
      { status: 400 }
    );
  }
}
