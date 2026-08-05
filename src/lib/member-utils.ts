import { MembershipPayment } from '@/types';

/**
 * Normalizes phone numbers for Indian mobile formats (+91, 0, or 10 digits).
 */
export function normalizePhone(phone?: string | null): string {
  if (!phone) {
    return '';
  }
  // Remove all non-digits
  let cleaned = phone.replace(/\D/g, '');

  // If it starts with 91 and has 12 digits, strip 91
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    cleaned = cleaned.substring(2);
  }

  // If it starts with 0 and has 11 digits, strip 0
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  return cleaned;
}

/**
 * Calculates remaining membership amount due based on total fee and previous payments.
 */
export function calculateAmountDue(
  totalAmount: number | string,
  payments?: MembershipPayment[] | null
): number {
  let amountDue =
    typeof totalAmount === 'number'
      ? totalAmount
      : parseFloat(String(totalAmount || 0));

  if (payments && Array.isArray(payments)) {
    for (const payment of payments) {
      if (payment && payment.amount !== undefined && payment.amount !== null) {
        const pAmt =
          typeof payment.amount === 'number'
            ? payment.amount
            : parseFloat(String(payment.amount));
        if (!isNaN(pAmt)) {
          amountDue -= pAmt;
        }
      }
    }
  }

  return Math.max(0, Math.round(amountDue * 100) / 100);
}
