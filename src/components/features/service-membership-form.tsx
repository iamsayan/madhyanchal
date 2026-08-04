'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';

import { createRazorpayOrder } from '@/app/actions/razorpay';
import { BorderBeam } from '@/components/ui/border-beam';
import { NativeModal } from '@/components/ui/native-modal';
import { loadRazorpay } from '@/lib/load-razorpay';

import { AnimatePresence, motion } from 'framer-motion';

import {
  Check,
  CheckCircle2,
  Copy,
  History,
  Loader2,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  XCircle,
} from 'lucide-react';
import type {
  Member,
  MembershipPayment,
  RazorpaySuccessResponse,
} from '@/types';

interface ServiceMembershipFormProps {
  memberData: Member & { payments?: MembershipPayment[] };
  year: string;
}

export function ServiceMembershipForm({
  memberData,
  year,
}: ServiceMembershipFormProps) {
  const [success, setSuccess] = useState<{
    paymentId: string;
    amount: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    member_id: memberData._id,
    name: memberData.name || '',
    phone: (memberData.phone || '').replace(/\D+/g, ''),
    email: '',
    amount: '',
  });

  useEffect(() => {
    if (success !== null || Boolean(error)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [success, error]);

  const amountData = useMemo(() => {
    const total = Number(memberData.amount || 0);
    const totalPaid = (memberData.payments || []).reduce(
      (acc: number, curr: MembershipPayment) =>
        acc + parseFloat(String(curr.amount || 0)),
      0
    );
    return {
      totalAmount: total,
      monthlyAmount: Math.round(total / 12),
      totalPaidAmount: totalPaid,
    };
  }, [memberData]);

  const dueAmount = amountData.totalAmount - amountData.totalPaidAmount;
  const isFullyPaid = dueAmount <= 0;

  const paidPercent = useMemo(() => {
    if (!amountData.totalAmount) return 0;
    return Math.min(
      Math.round((amountData.totalPaidAmount / amountData.totalAmount) * 100),
      100
    );
  }, [amountData]);

  const quickSuggestions = useMemo(() => {
    const arr = [];
    const monthly = amountData.monthlyAmount;
    if (monthly && monthly <= dueAmount) {
      arr.push({ label: '1 Month', value: monthly });
      if (monthly * 3 <= dueAmount && monthly * 3 !== dueAmount) {
        arr.push({ label: '3 Months', value: monthly * 3 });
      }
      if (monthly * 6 <= dueAmount && monthly * 6 !== dueAmount) {
        arr.push({ label: '6 Months', value: monthly * 6 });
      }
    }
    arr.push({ label: 'Full Due', value: dueAmount });
    return arr;
  }, [amountData.monthlyAmount, dueAmount]);

  const handleCopy = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.amount
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (amountData.monthlyAmount > 0) {
      const amt = parseFloat(formData.amount);
      if (amt % amountData.monthlyAmount !== 0) {
        setError(
          `Amount must be a multiple of ₹${amountData.monthlyAmount} (monthly unit)`
        );
        return;
      }
    }

    const loaded = await loadRazorpay();
    if (!loaded || !window.Razorpay) {
      setError('Failed to load Razorpay payment gateway script.');
      return;
    }

    try {
      setProcessing(true);
      const amountInPaise = Math.round(parseFloat(formData.amount) * 100);

      const orderResponse = await createRazorpayOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: amountInPaise,
        type: 'membership',
        accountType: 'jagadhatri',
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.error ?? 'Error creating order');
      }

      const options = {
        key: orderResponse.keyId,
        amount: amountInPaise.toString(),
        currency: 'INR',
        name: 'Madhyanchal Sarbajanin',
        description: `Payment of ₹${formData.amount} for ${formData.name}`,
        order_id: orderResponse.orderId,
        notes: {
          member_id: formData.member_id,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          type: 'membership',
          year,
        },
        handler: function (response: RazorpaySuccessResponse) {
          setSuccess({
            paymentId: response.razorpay_payment_id,
            amount: formData.amount,
          });
          setProcessing(false);
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        readonly: {
          email: true,
          contact: true,
        },
        send_sms_hash: true,
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: unknown) {
      setProcessing(false);
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
    }
  };

  return (
    <div className="space-y-6">
      {/* UNIFIED NATIVE SUCCESS MODAL */}
      <NativeModal
        isOpen={success !== null}
        onClose={() => setSuccess(null)}
        variant="success"
        title="Payment Successful!"
        description="Your subscription contribution has been recorded."
        details={[
          {
            label: 'Amount Paid',
            value: `₹${success?.amount || ''}`,
            highlight: true,
          },
          {
            label: 'Payment ID',
            value: success?.paymentId || '',
            copyable: true,
          },
        ]}
        secondaryButton={{
          label: 'Check Status',
          href: `/services/${year}/membership/${memberData._id}/status`,
          icon: <History className="h-4 w-4" />,
        }}
        primaryButton={{
          label: 'Pay Again',
          onClick: () => window.location.reload(),
          icon: <RefreshCw className="h-4 w-4" />,
        }}
      />

      {/* UNIFIED NATIVE ERROR MODAL */}
      <NativeModal
        isOpen={error !== null}
        onClose={() => setError(null)}
        variant="error"
        title="Payment Error"
        description={error || ''}
        primaryButton={{
          label: 'Close & Retry',
          onClick: () => setError(null),
        }}
      />

      {/* FULLY PAID VIEW BANNER */}
      {isFullyPaid ? (
        <div className="card-glass relative space-y-4 overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-amber-500/15 p-6 text-center backdrop-blur-2xl sm:rounded-3xl sm:p-10">
          <BorderBeam
            size={160}
            duration={6}
            colorFrom="#f59e0b"
            colorTo="#fef08a"
          />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/20 text-amber-500">
            <Trophy className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[10px] font-black tracking-widest text-amber-600 uppercase dark:text-amber-400">
              <Sparkles className="h-3 w-3" /> Fully Cleared Tier
            </span>
            <h2 className="font-paytone text-xl text-slate-900 sm:text-3xl dark:text-white">
              Membership Fully Paid
            </h2>
            <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
              Congratulations {memberData.name}! You have successfully cleared
              your subscription for year {year}.
            </p>
          </div>

          <div className="mx-auto grid max-w-md grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl border border-slate-200/80 bg-white/70 p-3 dark:border-white/10 dark:bg-stone-900/70">
              <span className="block text-[9.5px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Total Contributed
              </span>
              <span className="font-paytone text-base text-emerald-600 sm:text-xl dark:text-emerald-400">
                ₹{amountData.totalPaidAmount}
              </span>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white/70 p-3 dark:border-white/10 dark:bg-stone-900/70">
              <span className="block text-[9.5px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Outstanding Due
              </span>
              <span className="font-paytone text-base text-slate-400 sm:text-xl">
                ₹0
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/services/${year}/membership/${memberData._id}/status`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 px-6 py-3 text-xs font-black tracking-wider text-stone-950 uppercase shadow-md transition-transform hover:scale-[1.02]"
            >
              <History className="h-4 w-4" /> View Payment History
            </Link>
          </div>
        </div>
      ) : (
        /* MEMBERSHIP PAYMENT FORM CARD */
        <div className="card-glass card-hover-glow relative space-y-5 overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
          <BorderBeam
            size={140}
            duration={6}
            colorFrom="#f59e0b"
            colorTo="#fef08a"
          />

          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-white/10">
            <div>
              <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
                Year {year} Subscription
              </span>
              <h2 className="font-paytone text-lg text-slate-900 sm:text-2xl dark:text-white">
                Member Payment
              </h2>
            </div>
            <Link
              href={`/services/${year}/membership/${memberData._id}/status`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-600 transition-colors hover:bg-amber-500/20 dark:text-amber-400"
            >
              <History className="h-3.5 w-3.5" /> History
            </Link>
          </div>

          {/* Progress Tracker Bar */}
          <div className="space-y-2 rounded-xl border border-slate-200/80 bg-white/60 p-3.5 dark:border-white/10 dark:bg-stone-900/60">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Annual Progress</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {paidPercent}% (₹{amountData.totalPaidAmount} / ₹
                {amountData.totalAmount})
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-stone-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                style={{ width: `${paidPercent}%` }}
              />
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            {/* Read-Only Member Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
                <User className="h-3.5 w-3.5 text-amber-500" /> Member Name
              </label>
              <input
                type="text"
                value={formData.name}
                disabled
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-slate-300/80 bg-slate-100/80 px-3.5 py-2.5 text-xs font-bold text-slate-900 opacity-90 dark:border-white/15 dark:bg-stone-900/80 dark:text-white"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
                <Mail className="h-3.5 w-3.5 text-amber-500" /> Email Address{' '}
                <span className="text-amber-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
              />
            </div>

            {/* Amount Selection */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
                <span>
                  Select Amount <span className="text-amber-500">*</span>
                </span>
                <span className="font-mono font-bold text-rose-500">
                  Due: ₹{dueAmount}
                </span>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {quickSuggestions.map((sug) => {
                  const isActive = parseFloat(formData.amount) === sug.value;
                  return (
                    <button
                      key={sug.label}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          amount: sug.value.toString(),
                        }))
                      }
                      className={`rounded-xl border p-2 text-center transition-all ${
                        isActive
                          ? 'border-amber-500 bg-amber-500/20 font-bold text-amber-600 dark:text-amber-400'
                          : 'border-slate-300/80 bg-white/60 text-slate-700 hover:border-amber-500/50 dark:border-white/15 dark:bg-stone-900/60 dark:text-slate-300'
                      }`}
                    >
                      <span className="block text-[9px] font-semibold tracking-wider uppercase opacity-70">
                        {sug.label}
                      </span>
                      <span className="font-mono text-xs font-bold">
                        ₹{sug.value}
                      </span>
                    </button>
                  );
                })}
              </div>

              <input
                type="number"
                name="amount"
                min={amountData.monthlyAmount || 1}
                max={dueAmount}
                step={amountData.monthlyAmount || 1}
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
                required
                placeholder="Enter amount in ₹"
                className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 font-mono text-xs font-bold text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={
                  processing ||
                  !formData.amount ||
                  parseFloat(formData.amount) <= 0
                }
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 px-4 py-3 text-xs font-black tracking-wider text-stone-950 uppercase shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-stone-950" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>
                      Proceed to Pay{' '}
                      {formData.amount ? `₹${formData.amount}` : ''}
                    </span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />{' '}
                Razorpay Secured
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="h-3.5 w-3.5 text-amber-500" /> SSL Encrypted
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
