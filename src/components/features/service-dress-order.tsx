'use client';

import * as React from 'react';

import { createRazorpayOrder } from '@/app/actions/razorpay';
import { AdvertiserSlider } from '@/components/features/advertiser-slider';
import { BorderBeam } from '@/components/ui/border-beam';
import { loadRazorpay } from '@/lib/load-razorpay';

import {
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Lock,
  Mail,
  Minus,
  Phone,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  User,
  XCircle,
} from 'lucide-react';

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const DRESS_DATA = {
  kid: {
    name: 'Kid',
    price: 240,
    description: 'Round Neck Pure Cotton (7-9 years)',
    stock: 7,
  },
  small: {
    name: 'Small',
    price: 450,
    description: 'Size 36',
    stock: 5,
  },
  medium: {
    name: 'Medium',
    price: 450,
    description: 'Size 38',
    stock: 18,
  },
  large: {
    name: 'Large',
    price: 450,
    description: 'Size 40',
    stock: 16,
  },
  xl: {
    name: 'XL',
    price: 450,
    description: 'Size 42',
    stock: 32,
  },
  xxl: {
    name: 'XXL',
    price: 450,
    description: 'Size 44',
    stock: 25,
  },
} as const;

interface ServiceDressOrderProps {
  stockTotals: { [key: string]: number };
  year: string;
}

export function ServiceDressOrder({
  stockTotals,
  year,
}: ServiceDressOrderProps) {
  const [success, setSuccess] = React.useState<{
    paymentId: string;
    amount: string;
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    kid: 0,
    small: 0,
    medium: 0,
    large: 0,
    xl: 0,
    xxl: 0,
  });

  const updatedDressData = React.useMemo(() => {
    return Object.fromEntries(
      Object.entries(DRESS_DATA).map(([key, item]) => [
        key,
        {
          ...item,
          ordered: stockTotals[key] || 0,
          available: Math.max(item.stock - (stockTotals[key] || 0), 0),
        },
      ])
    );
  }, [stockTotals]);

  const adjustQuantity = React.useCallback(
    (field: keyof typeof formData, change: number) => {
      setFormData((prev) => ({
        ...prev,
        [field]: Math.max(0, Number(prev[field]) + change),
      }));
    },
    []
  );

  const totalAmount = React.useMemo(() => {
    return Object.entries(formData)
      .filter(
        ([key]) =>
          key in updatedDressData &&
          updatedDressData[key as keyof typeof updatedDressData].available > 0
      )
      .reduce((sum, [key, qty]) => {
        return (
          sum +
          updatedDressData[key as keyof typeof updatedDressData].price *
            Number(qty)
        );
      }, 0);
  }, [formData, updatedDressData]);

  const handleCopy = React.useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required contact details.');
      return;
    }

    if (totalAmount === 0) {
      setError('Please select at least one dress item quantity.');
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded || !window.Razorpay) {
      setError('Failed to load Razorpay payment gateway script.');
      return;
    }

    try {
      setProcessing(true);
      const amountInPaise = totalAmount * 100;

      const orderResponse = await createRazorpayOrder({
        ...formData,
        amount: amountInPaise,
        type: 'dress',
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.error ?? 'Error creating order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amountInPaise.toString(),
        currency: 'INR',
        name: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
        description: `Payment of Dress Order ₹${totalAmount} for ${formData.name}`,
        order_id: orderResponse.orderId,
        notes: {
          ...formData,
          type: 'dress',
          year,
        },
        handler: function (response: RazorpaySuccessResponse) {
          setSuccess({
            paymentId: response.razorpay_payment_id,
            amount: totalAmount.toString(),
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
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
    }
  };

  const dressSlides = [
    { name: 'Committee Dress Front', path: '/hero-pandal.png' },
    {
      name: 'Committee Dress Fabric Details',
      path: '/chandannagar-tableau.png',
    },
  ];

  return (
    <div className="space-y-6">
      {/* SUCCESS MODAL */}
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
                Dress Order Placed!
              </h3>
              <p className="text-xs text-slate-300">
                Thank you for ordering Madhyanchal Committee Dress.
              </p>
            </div>

            <div className="space-y-2.5 rounded-xl border border-white/10 bg-white/5 p-4 text-left text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                  Total Paid
                </span>
                <span className="font-paytone text-base text-emerald-400">
                  ₹{success.amount}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                  Payment ID
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
                  <span>{success.paymentId}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(success.paymentId)}
                    className="p-1 hover:text-white"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 py-3 text-xs font-black tracking-wider text-stone-950 uppercase transition-all hover:scale-[1.02]"
            >
              <RefreshCw className="h-4 w-4" /> Place Another Order
            </button>
          </div>
        </div>
      )}

      {/* ERROR MODAL */}
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
              <h3 className="font-paytone text-xl text-white">Order Error</h3>
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

      {/* DRESS PREVIEW CAROUSEL SLIDER */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-3 backdrop-blur-2xl sm:rounded-3xl dark:border-white/12">
        <AdvertiserSlider slides={dressSlides} />
      </div>

      {/* MAIN DRESS ORDER FORM CARD */}
      <div className="card-glass card-hover-glow relative space-y-5 overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
        <BorderBeam
          size={140}
          duration={6}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="space-y-1">
          <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
            Official Merchandise
          </span>
          <h2 className="font-paytone text-lg text-slate-900 sm:text-2xl dark:text-white">
            Puja Committee Dress {year}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Select your size quantities below to complete your order.
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              placeholder="name@example.com"
              className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-3.5 py-2.5 text-xs text-slate-900 transition-colors placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
            />
          </div>

          {/* Quantity Selectors for Sizes */}
          <div className="space-y-2 pt-2">
            <h3 className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
              <ShoppingBag className="h-3.5 w-3.5 text-amber-500" /> Select
              Quantities & Sizes <span className="text-amber-500">*</span>
            </h3>

            <div className="space-y-2 rounded-xl border border-slate-200/80 bg-white/50 p-2.5 sm:p-3 dark:border-white/10 dark:bg-stone-900/50">
              {Object.entries(updatedDressData).map(([size, item]) => {
                const qtyKey = size as keyof typeof formData;
                const currentQty = Number(formData[qtyKey] || 0);

                return (
                  <div
                    key={size}
                    className="flex items-center justify-between border-b border-slate-200/60 pt-2 pb-2 first:pt-0 last:border-b-0 last:pb-0 dark:border-white/10"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-paytone text-xs text-slate-900 sm:text-sm dark:text-white">
                          {item.name}
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                      <span
                        className={`text-[9px] font-bold tracking-wider uppercase ${
                          item.available > 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-500'
                        }`}
                      >
                        {item.available > 0
                          ? `${item.available} Left in Stock`
                          : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => adjustQuantity(qtyKey, -1)}
                        disabled={currentQty <= 0}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300/80 bg-white text-slate-700 transition-all disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/15 dark:bg-stone-800 dark:text-slate-300"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-slate-900 dark:text-white">
                        {currentQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjustQuantity(qtyKey, 1)}
                        disabled={currentQty >= item.available}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300/80 bg-white text-slate-700 transition-all disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/15 dark:bg-stone-800 dark:text-slate-300"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total Payable Summary */}
          <div className="flex items-center justify-between border-t border-slate-200/80 pt-2 dark:border-white/10">
            <span className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
              Total Payable Amount
            </span>
            <span className="font-paytone font-mono text-xl text-amber-600 dark:text-amber-400">
              ₹{totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={processing || totalAmount === 0}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 px-4 py-3 text-xs font-black tracking-wider text-stone-950 uppercase shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-stone-950" />
                  <span>Processing Razorpay Order...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Pay ₹{totalAmount.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Razorpay
              Verified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="h-3.5 w-3.5 text-amber-500" /> 100% Encrypted SSL
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
