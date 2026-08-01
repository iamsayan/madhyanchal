'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { createRazorpayOrder } from '@/app/actions/razorpay';
import { AdvertiserSlider } from '@/components/features/advertiser-slider';
import { BorderBeam } from '@/components/ui/border-beam';
import { NativeModal } from '@/components/ui/native-modal';
import { loadRazorpay } from '@/lib/load-razorpay';

import { AnimatePresence, motion } from 'framer-motion';

import {
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Info,
  Loader2,
  Lock,
  Mail,
  Minus,
  Phone,
  Plus,
  RefreshCw,
  ShieldCheck,
  Shirt,
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
  const [success, setSuccess] = useState<{
    paymentId: string;
    amount: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
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

  const updatedDressData = useMemo(() => {
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

  const adjustQuantity = useCallback(
    (field: keyof typeof formData, change: number) => {
      setFormData((prev) => ({
        ...prev,
        [field]: Math.max(0, Number(prev[field]) + change),
      }));
    },
    []
  );

  const totalAmount = useMemo(() => {
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

  const handleCopy = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handlePayment = async (e: FormEvent) => {
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
        name: 'Madhyanchal Sarbajanin',
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
      path: '/kaporerpatty-jagadhatri-1970',
    },
  ];

  return (
    <div className="space-y-6">
      {/* UNIFIED NATIVE SUCCESS MODAL */}
      <NativeModal
        isOpen={success !== null}
        onClose={() => setSuccess(null)}
        variant="success"
        title="Dress Order Placed!"
        description="Thank you for ordering Madhyanchal Committee Dress."
        details={[
          {
            label: 'Total Paid',
            value: `₹${success?.amount || ''}`,
            highlight: true,
          },
          {
            label: 'Payment ID',
            value: success?.paymentId || '',
            copyable: true,
          },
        ]}
        primaryButton={{
          label: 'Place Another Order',
          onClick: () => window.location.reload(),
          icon: <RefreshCw className="h-4 w-4" />,
        }}
      />

      {/* UNIFIED NATIVE ERROR MODAL */}
      <NativeModal
        isOpen={error !== null}
        onClose={() => setError(null)}
        variant="error"
        title="Order Error"
        description={error || ''}
        primaryButton={{
          label: 'Close & Retry',
          onClick: () => setError(null),
        }}
      />

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
                  <span>Processing...</span>
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
