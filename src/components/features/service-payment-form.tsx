'use client';

import * as React from 'react';

import { createRazorpayOrder } from '@/app/actions/razorpay';
import { BorderBeam } from '@/components/ui/border-beam';
import { loadRazorpay } from '@/lib/load-razorpay';

import {
  Check,
  CheckCircle2,
  Copy,
  IndianRupee,
  Loader2,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react';

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface ServicePaymentFormProps {
  type: string;
  year: string;
}

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  amount: string;
}

export function ServicePaymentForm({ type, year }: ServicePaymentFormProps) {
  const [success, setSuccess] = React.useState<{
    paymentId: string;
    amount: string;
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const [formData, setFormData] = React.useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    amount: '',
  });

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const quickAmounts = React.useMemo(
    () => [
      { label: 'Starter', value: 500 },
      { label: 'Popular', value: 1000 },
      { label: 'Silver', value: 2500 },
      { label: 'Gold', value: 5000 },
    ],
    []
  );

  const handleCopyPaymentId = React.useCallback((paymentId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(paymentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.amount
    ) {
      setError('Please complete all required fields.');
      return;
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
        ...formData,
        amount: amountInPaise,
        type,
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.error ?? 'Error creating payment order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amountInPaise.toString(),
        currency: 'INR',
        name: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
        description: `Payment of ₹${formData.amount} for ${formData.name}`,
        order_id: orderResponse.orderId,
        notes: {
          email: formData.email,
          name: formData.name,
          phone: formData.phone.replace(/\D+/g, ''),
          year,
          type,
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
          contact: formData.phone.replace(/\D+/g, ''),
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
      const message =
        err instanceof Error ? err.message : 'Payment processing failed';
      setError(message);
    }
  };

  return (
    <div className="space-y-6">
      {/* SUCCESS MODAL DIALOG */}
      {success && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md duration-300">
          <div className="card-glass relative w-full max-w-md space-y-5 overflow-hidden rounded-3xl border border-amber-500/40 bg-stone-950/95 p-6 text-center shadow-2xl backdrop-blur-2xl">
            <BorderBeam
              size={160}
              duration={6}
              colorFrom="#10b981"
              colorTo="#34d399"
            />

            <div className="mx-auto flex h-16 w-16 animate-bounce items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div className="space-y-1">
              <h3 className="font-paytone text-xl text-white">
                Payment Successful!
              </h3>
              <p className="text-xs text-slate-300">
                Thank you for your contribution to Madhyanchal Samity.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="space-y-2.5 rounded-xl border border-white/10 bg-white/5 p-4 text-left text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                  Amount Paid
                </span>
                <span className="font-paytone text-base text-emerald-400">
                  ₹{success.amount}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                  Transaction ID
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
                  <span>{success.paymentId}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyPaymentId(success.paymentId)}
                    className="p-1 transition-colors hover:text-white"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                  Gateway
                </span>
                <span className="text-[11px] font-bold text-slate-200">
                  Razorpay Secured SSL
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 py-3 text-xs font-black tracking-wider text-stone-950 uppercase transition-all hover:scale-[1.02]"
            >
              <RefreshCw className="h-4 w-4" /> Make Another Payment
            </button>
          </div>
        </div>
      )}

      {/* ERROR MODAL DIALOG */}
      {error && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md duration-300">
          <div className="card-glass relative w-full max-w-md space-y-4 overflow-hidden rounded-3xl border border-rose-500/40 bg-stone-950/95 p-6 text-center shadow-2xl backdrop-blur-2xl">
            <BorderBeam
              size={160}
              duration={6}
              colorFrom="#f43f5e"
              colorTo="#fb7185"
            />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/15 text-rose-400">
              <XCircle className="h-9 w-9" />
            </div>

            <div className="space-y-1">
              <h3 className="font-paytone text-xl text-white">Payment Error</h3>
              <p className="text-xs font-medium break-words text-rose-300">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setError(null)}
              className="w-full rounded-xl border border-rose-500/40 bg-rose-500/20 py-2.5 text-xs font-bold text-rose-200 transition-colors hover:bg-rose-500/30"
            >
              Close & Try Again
            </button>
          </div>
        </div>
      )}

      {/* MAIN FORM GLASS CARD */}
      <div className="card-glass card-hover-glow relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
        <BorderBeam
          size={140}
          duration={6}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="mb-6 space-y-1">
          <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
            Digital Payment Portal
          </span>
          <h2 className="font-paytone text-lg text-slate-900 sm:text-2xl dark:text-white">
            Make a {type === 'donation' ? 'Donation' : 'Contribution'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Fill in your details below to contribute securely to {year}{' '}
            activities.
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
              <User className="h-3.5 w-3.5 text-amber-500" /> Full Name{' '}
              <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
            />
          </div>

          {/* WhatsApp Mobile Number */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
              <Phone className="h-3.5 w-3.5 text-amber-500" /> WhatsApp Number{' '}
              <span className="text-amber-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="10-digit mobile number"
              className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 font-mono text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
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
              onChange={handleInputChange}
              required
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
            />
          </div>

          {/* Payment Amount */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
              <IndianRupee className="h-3.5 w-3.5 text-amber-500" /> Amount (₹){' '}
              <span className="text-amber-500">*</span>
            </label>

            {/* Quick Preset Amount Pills */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {quickAmounts.map((preset) => {
                const isActive = parseFloat(formData.amount) === preset.value;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: preset.value.toString(),
                      }))
                    }
                    className={`rounded-xl border p-2 text-center transition-all ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/20 font-bold text-amber-600 dark:text-amber-400'
                        : 'border-slate-300/80 bg-white/60 text-slate-700 hover:border-amber-500/50 dark:border-white/15 dark:bg-stone-900/60 dark:text-slate-300'
                    }`}
                  >
                    <span className="block text-[9px] font-semibold tracking-wider uppercase opacity-70">
                      {preset.label}
                    </span>
                    <span className="font-mono text-xs font-bold">
                      ₹{preset.value}
                    </span>
                  </button>
                );
              })}
            </div>

            <input
              type="number"
              name="amount"
              min="1"
              step="1"
              value={formData.amount}
              onChange={handleInputChange}
              required
              placeholder="Enter custom amount in ₹"
              className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 font-mono text-xs font-bold text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
            />
          </div>

          {/* SUBMIT PAY BUTTON */}
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
                  <span>Processing Razorpay Transaction...</span>
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

          {/* SSL Trust Footer */}
          <div className="flex items-center justify-center gap-4 pt-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Razorpay
              Verified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="h-3.5 w-3.5 text-amber-500" /> 256-Bit SSL
              Encrypted
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
