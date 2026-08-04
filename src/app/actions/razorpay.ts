'use server';

import { RazorpayOrder } from '@/types';
import Razorpay from 'razorpay';

export async function createRazorpayOrder(formData: RazorpayOrder) {
  try {
    const accountType = formData.accountType;
    if (!accountType) {
      return {
        success: false,
        error: 'Missing account type',
      };
    }

    const amount = formData.amount;
    const email = formData.email;
    const name = formData.name;
    const phone = formData.phone;

    if (!amount || !email || !name || !phone) {
      return {
        success: false,
        error: 'Missing required fields',
      };
    }

    const isDurga = accountType === 'durga';

    const key_id = isDurga
      ? process.env.NEXT_PUBLIC_DURGA_RAZORPAY_KEY_ID
      : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    const key_secret = isDurga
      ? process.env.DURGA_RAZORPAY_KEY_SECRET
      : process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return {
        success: false,
        error: 'Missing Razorpay keys',
      };
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        email,
        name,
        phone,
      },
    });

    return {
      success: true,
      orderId: order.id,
      keyId: key_id,
    };
  } catch (error) {
    console.error('Error creating order:', error);

    return {
      success: false,
      error: 'Error creating payment order',
    };
  }
}
