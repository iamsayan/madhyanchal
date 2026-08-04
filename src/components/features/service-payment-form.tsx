'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { createRazorpayOrder } from '@/app/actions/razorpay';
import { BorderBeam } from '@/components/ui/border-beam';
import { NativeModal } from '@/components/ui/native-modal';
import { loadRazorpay } from '@/lib/load-razorpay';

import { AnimatePresence, motion } from 'framer-motion';

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
  const [success, setSuccess] = useState<{
    paymentId: string;
    amount: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    amount: '',
  });

  useEffect(() => {
    if (success !== null || error !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [success, error]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const quickAmounts = useMemo(
    () => [
      { label: 'Starter', value: 500 },
      { label: 'Popular', value: 1000 },
      { label: 'Silver', value: 2500 },
      { label: 'Gold', value: 5000 },
    ],
    []
  );

  const handleCopyPaymentId = useCallback((paymentId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(paymentId);
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
        accountType: 'jagadhatri',
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.error ?? 'Error creating payment order');
      }

      const options = {
        key: orderResponse.keyId,
        amount: amountInPaise.toString(),
        currency: 'INR',
        name: 'Madhyanchal Sarbajanin',
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
      {/* UNIFIED NATIVE SUCCESS MODAL */}
      <NativeModal
        isOpen={success !== null}
        onClose={() => setSuccess(null)}
        variant="success"
        title="Payment Successful!"
        description="Thank you for your contribution to Madhyanchal Samity."
        details={[
          {
            label: 'Amount Paid',
            value: `₹${success?.amount || ''}`,
            highlight: true,
          },
          {
            label: 'Transaction ID',
            value: success?.paymentId || '',
            copyable: true,
          },
          { label: 'Gateway Security', value: 'Razorpay' },
        ]}
        primaryButton={{
          label: 'Make Another Payment',
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
                  <span>Processing Transaction...</span>
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
