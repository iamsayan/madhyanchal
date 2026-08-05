import { NextRequest, NextResponse } from 'next/server';

import { verifySecret } from '@/src/lib/verify';
import cockpit from '@/lib/client';
import { getMembershipYear } from '@/lib/data';
import { calculateAmountDue, normalizePhone } from '@/lib/member-utils';
import { sendWhatsAppMessage } from '@/lib/twilio';
import type { MemberWithPayments } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (!verifySecret(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const rawSendNumbers = searchParams.get('s');
  const sendNumbers = rawSendNumbers
    ? rawSendNumbers.split(',').map(Number).filter(Boolean)
    : [];

  const skip = Number(searchParams.get('skip')) || 0;
  const yearParam = searchParams.get('year');
  const force = searchParams.get('force') === 'true';

  const currentDay = new Date().getDate();
  const scheduledDays = [2, 15];

  if (!force && !scheduledDays.includes(currentDay)) {
    return NextResponse.json({
      success: true,
      message: `Skipped reminder. Current day (${currentDay}) is not in scheduled days [${scheduledDays.join(
        ', '
      )}]. Pass ?force=true to override.`,
      processedCount: 0,
    });
  }

  try {
    const year = await getMembershipYear(yearParam);
    const queryOptions: Record<string, unknown> = {
      skip,
      limit: 500,
      payments: year,
      sort: { name: 1 },
      ...(sendNumbers.length > 0
        ? { filter: { phone: { $in: sendNumbers } } }
        : {}),
    };

    const members = await cockpit.listContentItems<MemberWithPayments>(
      'members',
      queryOptions
    );

    if (!Array.isArray(members) || members.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No members found.',
        processedCount: 0,
      });
    }

    const templateSid = process.env.TWILIO_TEMPLATE_MEMBERSHIP_REMINDER!;
    const processedIds = new Set<string>();
    const logs: Array<{
      status: 'SUCCESS' | 'FAILED';
      memberId: string;
      name: string;
      phone: string;
      sid?: string;
      error?: string;
    }> = [];

    for (const item of members) {
      const normalizedPhone = normalizePhone(item.phone);
      if (!item.phone || !normalizedPhone || processedIds.has(item._id)) {
        continue;
      }

      const totalAmountNum = Number(item.amount) || 0;
      const amountDue = calculateAmountDue(totalAmountNum, item.payments);

      if (amountDue > 0) {
        const id = item._id.trim();
        const name = (item.name || '').trim();
        const dueAmount = (totalAmountNum / 12).toFixed(2);

        try {
          const result = await sendWhatsAppMessage(
            normalizedPhone,
            templateSid,
            {
              memberName: name,
              dueAmount,
              totalAmountDue: String(amountDue),
              memberId: id,
            }
          );

          processedIds.add(id);
          logs.push({
            status: 'SUCCESS',
            memberId: id,
            name,
            phone: normalizedPhone,
            sid: result.sid,
          });
        } catch (err: unknown) {
          logs.push({
            status: 'FAILED',
            memberId: id,
            name,
            phone: normalizedPhone,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      membershipYear: year,
      processedCount: processedIds.size,
      totalFetched: members.length,
      logs,
    });
  } catch (error: unknown) {
    console.error('Error sending membership reminders:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
