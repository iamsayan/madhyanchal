'use client';

import { useState } from 'react';
import Link from 'next/link';

import { submitModel } from '@/app/actions/model';
import { createRazorpayOrder } from '@/app/actions/razorpay';
import { BorderBeam } from '@/components/ui/border-beam';
import { NativeModal } from '@/components/ui/native-modal';
import { Button } from '@/components/ui/button';
import { loadRazorpay } from '@/lib/load-razorpay';
import { RazorpaySuccessResponse } from '@/types';

import { useForm, useFieldArray } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import {
  ChevronRight,
  CreditCard,
  Eye,
  IndianRupee,
  Loader2,
  Palette,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
  Users,
} from 'lucide-react';

export interface ParticipantItem {
  participantName: string;
  dateOfBirth: string;
  age: string;
  category: string;
}

export interface DrawingCompetitionFormData {
  guardianName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
  participants: ParticipantItem[];
}

const REGISTRATION_FEE_PER_PARTICIPANT = 50; // ₹50 per participant
const COMPETITION_DATE = new Date('2026-10-11T10:00:00');

function calculateAgeAndCategory(dobString: string) {
  if (!dobString) return { age: '', category: '' };

  try {
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return { age: '', category: '' };

    const timeDiff = COMPETITION_DATE.getTime() - birthDate.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));

    let years = COMPETITION_DATE.getFullYear() - birthDate.getFullYear();
    let months = COMPETITION_DATE.getMonth() - birthDate.getMonth();

    if (months < 0) {
      months += 12;
      years--;
    }

    if (years < 0) years = 0;
    if (months < 0) months = 0;

    const ageStr = `${years} yrs ${months} mos`;

    let category = '';
    if (totalDays <= 2922) {
      category = 'Group A (0-8 yrs)';
    } else if (totalDays <= 4383) {
      category = 'Group B (8-12 yrs)';
    } else {
      category = 'Group C (12+ yrs)';
    }

    return { age: ageStr, category };
  } catch {
    return { age: '', category: '' };
  }
}

export function DrawingCompetitionForm() {
  const [previewData, setPreviewData] =
    useState<DrawingCompetitionFormData | null>(null);
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);

  const [success, setSuccess] = useState<{
    registrations: Array<{ name: string; id: string }>;
    paymentId?: string;
    totalAmount?: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isDevelopment = process.env.NODE_ENV !== 'production';

  const defaultFormValues: DrawingCompetitionFormData = isDevelopment
    ? {
        guardianName: 'Sayan Datta',
        email: 'sayandatta.in@gmail.com',
        phone: '7686943894',
        address: '42, Station Road, Near Sporting Club',
        city: 'Chandannagar',
        pinCode: '712136',
        participants: [
          {
            participantName: 'Aarav Banerjee',
            dateOfBirth: '2018-05-14',
            age: '7 yrs 4 mos',
            category: 'Group A (0-8 yrs)',
          },
          {
            participantName: 'Ananya Banerjee',
            dateOfBirth: '2014-08-20',
            age: '11 yrs 1 mos',
            category: 'Group B (8-12 yrs)',
          },
        ],
      }
    : {
        guardianName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pinCode: '',
        participants: [
          { participantName: '', dateOfBirth: '', age: '', category: '' },
        ],
      };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DrawingCompetitionFormData>({
    defaultValues: defaultFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'participants',
  });

  const handleDobChange = (index: number, dobValue: string) => {
    const { age, category } = calculateAgeAndCategory(dobValue);
    setValue(`participants.${index}.age`, age);
    setValue(`participants.${index}.category`, category);
  };

  // Open Preview Modal on form validation success
  const onFormSubmit = (data: DrawingCompetitionFormData) => {
    setErrorMsg(null);
    setPreviewData(data);
  };

  // Perform Razorpay Order creation & API submission from Preview Modal
  const handleFinalSubmit = async () => {
    if (!previewData) return;
    setIsSubmittingFinal(true);
    setErrorMsg(null);

    const totalAmount =
      previewData.participants.length * REGISTRATION_FEE_PER_PARTICIPANT;
    const amountInPaise = totalAmount * 100;

    try {
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        throw new Error('Failed to load Razorpay payment gateway.');
      }

      const orderResponse = await createRazorpayOrder({
        amount: amountInPaise,
        name: previewData.guardianName,
        email: previewData.email,
        phone: previewData.phone.replace(/\D+/g, ''),
        accountType: 'durga',
      });

      if (!orderResponse.success) {
        throw new Error(
          orderResponse.error ?? 'Failed to create payment order'
        );
      }

      const options = {
        key: orderResponse.keyId,
        amount: amountInPaise.toString(),
        currency: 'INR',
        name: 'Madhyanchal Sarbajanin',
        description: `Drawing Competition Fee (${previewData.participants.length} participant${previewData.participants.length > 1 ? 's' : ''})`,
        order_id: orderResponse.orderId,
        notes: {
          guardian_name: previewData.guardianName,
          email: previewData.email,
          phone: previewData.phone.replace(/\D+/g, ''),
          participants_count: previewData.participants.length.toString(),
        },
        handler: async function (response: RazorpaySuccessResponse) {
          try {
            const results: Array<{ name: string; id: string }> = [];

            for (let i = 0; i < previewData.participants.length; i++) {
              const p = previewData.participants[i];
              const regId = `DC/${Date.now().toString().slice(-6)}${i + 1}`;

              const res = await submitModel(
                `drawingcompetition${new Date().getFullYear()}`,
                {
                  registration_id: regId,
                  mode: 'online',
                  name: p.participantName,
                  dob: p.dateOfBirth,
                  age: p.age || '',
                  category: p.category || '',
                  guardian_name: previewData.guardianName,
                  email: previewData.email,
                  phone: previewData.phone,
                  address: previewData.address,
                  city: previewData.city,
                  pincode: previewData.pinCode,
                  payment_id: response.razorpay_payment_id,
                  fee_paid: `${REGISTRATION_FEE_PER_PARTICIPANT}`,
                }
              );

              if (!res.success) {
                throw new Error(
                  res.error || `Registration failed for ${p.participantName}`
                );
              }

              results.push({ name: p.participantName, id: regId });
            }

            setPreviewData(null);
            setSuccess({
              registrations: results,
              paymentId: response.razorpay_payment_id,
              totalAmount,
            });
            reset(defaultFormValues);
          } catch (err) {
            setPreviewData(null);
            setErrorMsg(
              err instanceof Error
                ? err.message
                : 'Failed to record registration. Please contact support with Payment ID: ' +
                    response.razorpay_payment_id
            );
          } finally {
            setIsSubmittingFinal(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmittingFinal(false);
          },
        },
        prefill: {
          name: previewData.guardianName,
          email: previewData.email,
          contact: previewData.phone.replace(/\D+/g, ''),
        },
        readonly: {
          email: true,
          contact: true,
        },
        send_sms_hash: true,
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setIsSubmittingFinal(false);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Failed to launch payment gateway. Try again.'
      );
    }
  };

  const isProduction = process.env.NODE_ENV === 'production';

  // In production environment, display coming soon notice card
  if (isProduction) {
    return (
      <div className="relative mx-auto max-w-4xl space-y-6">
        {/* TOP EVENT SUMMARY & COMING SOON BANNER */}
        <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-6 text-center backdrop-blur-2xl sm:rounded-3xl sm:p-10 dark:border-white/12">
          <BorderBeam
            size={220}
            duration={7}
            colorFrom="#f59e0b"
            colorTo="#fef08a"
          />

          <div className="flex flex-col items-center space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/20 px-3.5 py-1 text-[11px] font-extrabold tracking-widest text-amber-800 uppercase dark:text-amber-300">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-500" />
              REGISTRATION OPENING SOON
            </span>

            <h2 className="font-paytone text-xl font-bold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              Madhyanchal Annual Sit & Draw Competition
            </h2>

            <p className="max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
              Online registration for children’s Sit & Draw competition will
              open shortly. Registration fee is ₹50 per participant.
            </p>

            {/* TOPIC PREVIEW BANNER */}
            <div className="w-full max-w-xl rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center sm:p-4">
              <span className="text-[10px] font-extrabold tracking-widest text-amber-700 uppercase dark:text-amber-400">
                Drawing Topic
              </span>
              <h4 className="font-paytone text-base font-bold text-slate-900 sm:text-xl dark:text-white">
                Draw As You Like
              </h4>
              <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Open theme for all age groups (Group A, B & C)
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/durgapuja"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500 px-6 py-2.5 text-xs font-extrabold text-slate-950 shadow-md transition-all hover:bg-amber-400 active:scale-95"
              >
                <span>Explore Durga Puja Events</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* RULES & GUIDELINES CARD */}
        <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
          <h4 className="font-paytone mb-2 text-sm font-bold text-slate-900 sm:text-base dark:text-white">
            Rules & Guidelines:
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                Registration Fee: ₹50 per participant (Payable online via UPI,
                Cards, Net Banking).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>Drawing paper will be provided at the venue.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                Participants must bring their own colors and drawing kits.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>Judges’ decision will be final.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                Please carry a photocopy of age proof on competition day.
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const currentTotalAmount = fields.length * REGISTRATION_FEE_PER_PARTICIPANT;

  return (
    <div className="relative mx-auto max-w-4xl space-y-6">
      {/* UNIFIED NATIVE PREVIEW MODAL */}
      <NativeModal
        isOpen={previewData !== null}
        onClose={() => {
          if (!isSubmittingFinal) setPreviewData(null);
        }}
        variant="info"
        title="Review Registration Details"
        description="Please review all details and payment summary before proceeding to payment."
        primaryButton={{
          label: isSubmittingFinal
            ? 'Processing Payment...'
            : `Pay ₹${(previewData?.participants.length || 1) * REGISTRATION_FEE_PER_PARTICIPANT} & Register`,
          onClick: handleFinalSubmit,
          icon: isSubmittingFinal ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CreditCard className="h-4 w-4" />
          ),
        }}
        secondaryButton={{
          label: 'Edit Details',
          onClick: () => setPreviewData(null),
          variant: 'secondary',
        }}
      >
        {previewData && (
          <div className="space-y-3.5 text-left text-xs text-slate-700 dark:text-slate-200">
            {/* Payment Breakdown Box */}
            <div className="space-y-1.5 rounded-xl border border-amber-500/40 bg-amber-500/15 p-3.5 text-left">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 font-bold text-slate-900 dark:text-white">
                <span className="flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300">
                  <CreditCard className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>Registration Fee Summary:</span>
                </span>
                <span className="rounded-full bg-amber-500 px-3 py-0.5 text-xs font-black text-slate-950">
                  Total ₹
                  {previewData.participants.length *
                    REGISTRATION_FEE_PER_PARTICIPANT}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>Fee Rate per Participant:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  ₹50
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>Total Registered Participants:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {previewData.participants.length} Child
                  {previewData.participants.length > 1 ? 'ren' : ''}
                </span>
              </div>
            </div>

            {/* Guardian Info Box */}
            <div className="space-y-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-left">
              <div className="flex items-center gap-1.5 border-b border-amber-500/20 pb-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                <User className="h-4 w-4 shrink-0 text-amber-500" />
                <span>Guardian Information:</span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                <div className="flex items-baseline gap-1.5 text-left">
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">
                    Name:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {previewData.guardianName}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 text-left">
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">
                    Phone:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {previewData.phone}
                  </span>
                </div>
                <div className="col-span-1 flex items-baseline gap-1.5 text-left sm:col-span-2">
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">
                    Email:
                  </span>
                  <span className="font-semibold break-all text-slate-900 dark:text-white">
                    {previewData.email}
                  </span>
                </div>
                <div className="col-span-1 flex items-baseline gap-1.5 text-left sm:col-span-2">
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">
                    Address:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {previewData.address}, {previewData.city} -{' '}
                    {previewData.pinCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Participants Summary List */}
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <Users className="h-4 w-4 shrink-0 text-amber-500" />
                <span>
                  Participants List ({previewData.participants.length}):
                </span>
              </div>

              <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                {previewData.participants.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-white/80 p-3 text-left shadow-2xs sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-stone-900/80"
                  >
                    <div className="space-y-0.5 text-left">
                      <div className="flex items-center gap-1.5 font-extrabold text-slate-900 dark:text-white">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-slate-950">
                          {idx + 1}
                        </span>
                        <span className="text-xs">{p.participantName}</span>
                      </div>
                      <div className="pl-6 text-[10.5px] text-slate-500 dark:text-slate-400">
                        DOB:{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {p.dateOfBirth}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-start text-[10.5px] font-bold sm:self-center">
                      <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-amber-700 dark:text-amber-300">
                        {p.age}
                      </span>
                      <span className="rounded-md border border-amber-500/40 bg-amber-500/20 px-2.5 py-0.5 text-amber-800 dark:text-amber-200">
                        {p.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </NativeModal>

      {/* UNIFIED NATIVE SUCCESS MODAL */}
      <NativeModal
        isOpen={success !== null}
        onClose={() => setSuccess(null)}
        variant="success"
        title="Registration & Payment Successful!"
        description={`Payment of ₹${success?.totalAmount || 0} received successfully (Payment ID: ${success?.paymentId || 'N/A'}). Registration details for ${success?.registrations.length || 1} participant(s) are below.`}
        details={
          success?.registrations.map((reg) => ({
            label: reg.name,
            value: reg.id,
            copyable: true,
          })) || []
        }
        primaryButton={{
          label: 'Done',
          onClick: () => setSuccess(null),
        }}
      />

      {/* UNIFIED NATIVE ERROR MODAL */}
      <NativeModal
        isOpen={errorMsg !== null}
        onClose={() => setErrorMsg(null)}
        variant="error"
        title="Registration Failed"
        description={errorMsg || ''}
        primaryButton={{
          label: 'Close',
          onClick: () => setErrorMsg(null),
        }}
      />

      {/* TOP EVENT SUMMARY BAR */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <BorderBeam
          size={180}
          duration={8}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-200/80 pb-4 text-center sm:flex-row sm:text-left dark:border-white/10">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[10px] font-extrabold text-amber-700 dark:text-amber-400">
              <Palette className="h-3 w-3" />
              ANNUAL DRAWING COMPETITION
            </span>
            <h2 className="font-paytone text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
              Participant Registration Portal
            </h2>
          </div>

          {/* Fee Badge */}
          <div className="flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-800 dark:text-amber-300">
            <IndianRupee className="h-4 w-4 text-amber-500" />
            <span>₹50 / Participant</span>
          </div>
        </div>

        {/* TOPIC BANNER */}
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center sm:p-4">
          <span className="text-[10px] font-extrabold tracking-widest text-amber-700 uppercase dark:text-amber-400">
            Drawing Topic
          </span>
          <h4 className="font-paytone text-base font-bold text-slate-900 sm:text-xl dark:text-white">
            Draw As You Like
          </h4>
          <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
            Open theme for all age groups (Group A, B & C)
          </p>
        </div>
      </div>

      {/* REGISTRATION FORM */}
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="card-glass relative space-y-6 rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:space-y-8 sm:rounded-3xl sm:p-8 dark:border-white/12"
      >
        {/* GUARDIAN INFORMATION SECTION */}
        <div className="space-y-4">
          <div className="border-b border-slate-200/80 pb-3 dark:border-white/10">
            <h3 className="font-paytone flex items-center gap-2 text-sm font-bold text-slate-900 sm:text-lg dark:text-white">
              <User className="h-4 w-4 text-amber-500" />
              Guardian Details
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Provide guardian contact details for confirmation and updates.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
            {/* Guardian Name */}
            <div className="col-span-1 space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Guardian Full Name *
              </label>
              <input
                type="text"
                {...register('guardianName', {
                  required: 'Guardian name is required',
                })}
                placeholder="Enter guardian full name"
                className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.guardianName && (
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.guardianName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="example@mail.com"
                className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.email && (
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone is required',
                  minLength: {
                    value: 10,
                    message: 'Must be 10 digits',
                  },
                })}
                placeholder="+91 9876543210"
                className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.phone && (
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="col-span-1 space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Address *
              </label>
              <input
                type="text"
                {...register('address', {
                  required: 'Address is required',
                })}
                placeholder="Enter street address"
                className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.address && (
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                City *
              </label>
              <input
                type="text"
                {...register('city', {
                  required: 'City is required',
                })}
                placeholder="Chandannagar"
                className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.city && (
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Pin Code */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Pin Code *
              </label>
              <input
                type="text"
                {...register('pinCode', {
                  required: 'Pin code is required',
                })}
                placeholder="712136"
                className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.pinCode && (
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.pinCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* REPEATABLE PARTICIPANTS (CHILDREN) SECTION */}
        <div className="space-y-4 border-t border-slate-200/80 pt-2 dark:border-white/10">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200/80 pb-3 sm:flex-row sm:items-center dark:border-white/10">
            <div>
              <h3 className="font-paytone flex items-center gap-2 text-sm font-bold text-slate-900 sm:text-lg dark:text-white">
                <Users className="h-4 w-4 text-amber-500" />
                Participant(s) / Children Details
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Add details for all children participating under this guardian.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  participantName: '',
                  dateOfBirth: '',
                  age: '',
                  category: '',
                })
              }
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-700 transition-all hover:bg-amber-500 hover:text-slate-950 active:scale-95 sm:self-auto dark:text-amber-300 dark:hover:text-slate-950"
            >
              <Plus className="h-4 w-4" />
              <span>+ Add Child</span>
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {fields.map((field, index) => {
                const pError = errors.participants?.[index];

                return (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="relative space-y-3 rounded-xl border border-slate-200/80 bg-white/60 p-3.5 shadow-xs backdrop-blur-md sm:p-5 dark:border-white/10 dark:bg-stone-900/60"
                  >
                    {/* Participant Card Header */}
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 dark:border-white/10">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wide text-amber-700 uppercase dark:text-amber-400">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        Child / Participant #{index + 1}
                      </span>

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[11px] font-bold text-rose-600 transition-all hover:bg-rose-500 hover:text-white dark:text-rose-400"
                          title="Remove this participant"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                      {/* Participant Full Name */}
                      <div className="col-span-1 space-y-1 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          Participant Full Name *
                        </label>
                        <input
                          type="text"
                          {...register(
                            `participants.${index}.participantName` as const,
                            {
                              required: 'Full name is required',
                            }
                          )}
                          placeholder="Enter child full name"
                          className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
                        />
                        {pError?.participantName && (
                          <p className="text-[11px] font-semibold text-rose-500">
                            {pError.participantName.message}
                          </p>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          max={COMPETITION_DATE.toISOString().split('T')[0]}
                          {...register(
                            `participants.${index}.dateOfBirth` as const,
                            {
                              required: 'Date of birth is required',
                              max: {
                                value:
                                  COMPETITION_DATE.toISOString().split('T')[0],
                                message:
                                  'Date of birth cannot be after competition date',
                              },
                              onChange: (e) =>
                                handleDobChange(index, e.target.value),
                            }
                          )}
                          className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
                        />
                        {pError?.dateOfBirth && (
                          <p className="text-[11px] font-semibold text-rose-500">
                            {pError.dateOfBirth.message}
                          </p>
                        )}
                      </div>

                      {/* Auto Age / Category Display */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                            Age
                          </label>
                          <input
                            type="text"
                            {...register(`participants.${index}.age` as const)}
                            readOnly
                            placeholder="Auto"
                            className="h-10 w-full rounded-xl border border-slate-200/80 bg-slate-100/70 px-3 text-xs font-bold text-amber-700 dark:border-white/10 dark:bg-stone-900 dark:text-amber-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                            Category
                          </label>
                          <input
                            type="text"
                            {...register(
                              `participants.${index}.category` as const
                            )}
                            readOnly
                            placeholder="Auto"
                            className="h-10 w-full rounded-xl border border-slate-200/80 bg-slate-100/70 px-3 text-xs font-bold text-amber-700 dark:border-white/10 dark:bg-stone-900 dark:text-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Bottom Add Participant Button */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() =>
                  append({
                    participantName: '',
                    dateOfBirth: '',
                    age: '',
                    category: '',
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-amber-500/50 bg-amber-500/10 px-5 py-2 text-xs font-bold text-amber-700 transition-all hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 active:scale-95 dark:text-amber-300 dark:hover:text-slate-950"
              >
                <Plus className="h-4 w-4" />
                <span>+ Add Another Child / Participant</span>
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON (OPENS PREVIEW & PAY MODAL) */}
        <div className="space-y-2 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="h-11 w-full rounded-full border border-amber-400/60 text-xs font-extrabold shadow-sm sm:text-sm"
          >
            <span className="flex items-center justify-center gap-1.5">
              <Eye className="h-4 w-4 text-amber-950" />
              Preview & Pay ₹{currentTotalAmount} ({fields.length} Participant
              {fields.length > 1 ? 's' : ''})
            </span>
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>
              Secured via Razorpay (UPI, Credit/Debit Cards, Net Banking)
            </span>
          </div>
        </div>
      </form>

      {/* RULES & GUIDELINES CARD */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <h4 className="font-paytone mb-2 text-sm font-bold text-slate-900 sm:text-base dark:text-white">
          Rules & Guidelines:
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Registration Fee: ₹50 per participant (Payable online via UPI,
              Cards, Net Banking).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Single guardian can register multiple children in one submission.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>Drawing paper will be provided by the organizers.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Participants must bring their own colors and drawing materials.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>The decision of the judges will be final.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Photocopy of age proof certificate must be produced on competition
              day.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
