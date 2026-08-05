'use client';

import { useState } from 'react';
import Link from 'next/link';

import { createRazorpayOrder } from '@/app/actions/razorpay';
import { BorderBeam } from '@/components/ui/border-beam';
import { NativeModal } from '@/components/ui/native-modal';
import { Button } from '@/components/ui/button';
import { loadRazorpay } from '@/lib/load-razorpay';
import { RazorpaySuccessResponse } from '@/types';

import { useForm, useFieldArray } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import {
  AlertCircle,
  Award,
  Calendar,
  Clock,
  CreditCard,
  ExternalLink,
  Eye,
  FileText,
  Gift,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Pencil,
  Phone,
  Plus,
  ShieldCheck,
  Trash2,
  Trophy,
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

import {
  DRAWING_COMPETITION_CONFIG,
  isRegistrationClosed,
} from '@/config/drawing-competition';
const currentYear = new Date().getFullYear();

const REGISTRATION_FEE_PER_PARTICIPANT =
  DRAWING_COMPETITION_CONFIG.registrationFee;
const MAX_PARTICIPANTS_PER_GUARDIAN =
  DRAWING_COMPETITION_CONFIG.maxParticipantsPerGuardian;
const COMPETITION_DATE = new Date(
  DRAWING_COMPETITION_CONFIG.competitionDateISO
);

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
  const isClosed = isRegistrationClosed();
  const config = DRAWING_COMPETITION_CONFIG;

  const [previewData, setPreviewData] =
    useState<DrawingCompetitionFormData | null>(null);
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);

  const [success, setSuccess] = useState<{
    registrations: Array<{ name: string; id: string }>;
    paymentId?: string;
    totalAmount?: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isDevelopment = process.env.NODE_ENV !== 'test';

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

  // Perform Razorpay Order creation & popup from Preview Modal
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

      const dateSuffix = Date.now().toString().slice(-4);

      const participantNotes: Record<string, string> = {
        type: 'drawing',
        guardian_name: previewData.guardianName,
        email: previewData.email,
        phone: previewData.phone.replace(/\D+/g, ''),
        address: previewData.address,
        city: previewData.city,
        pincode: previewData.pinCode,
        participants_count: previewData.participants.length.toString(),
      };

      const registrations: Array<{ name: string; id: string }> = [];

      previewData.participants.forEach((p, i) => {
        const idx = i + 1;
        const regId = `DC/${dateSuffix}${idx}`;
        participantNotes[`p${idx}`] =
          `${p.participantName}|${p.dateOfBirth}|${p.age}|${p.category}|${regId}`;
        registrations.push({ name: p.participantName, id: regId });
      });

      const options = {
        key: orderResponse.keyId,
        amount: amountInPaise.toString(),
        currency: 'INR',
        name: 'Madhyanchal Sarbajanin',
        description: `Drawing Competition Fee ${currentYear} (${previewData.participants.length} participant${previewData.participants.length > 1 ? 's' : ''})`,
        order_id: orderResponse.orderId,
        notes: participantNotes,
        theme: {
          color: '#0C1930',
          backdrop_color: '#0C1930',
        },
        handler: function (response: RazorpaySuccessResponse) {
          setPreviewData(null);
          setSuccess({
            registrations,
            paymentId: response.razorpay_payment_id,
            totalAmount,
          });
          reset(defaultFormValues);
          setIsSubmittingFinal(false);
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

  return (
    <div className="relative mx-auto max-w-4xl space-y-4 sm:space-y-6">
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
          onClick: () => {
            setPreviewData(null);
            setTimeout(() => {
              const formElement = document.getElementById(
                'drawing-form-container'
              );
              if (formElement) {
                formElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }
            }, 100);
          },
          icon: <Pencil className="h-3.5 w-3.5" />,
          variant: 'secondary',
        }}
      >
        {previewData && (
          <div className="space-y-2 text-left text-xs text-slate-700 sm:space-y-3 dark:text-slate-200">
            {/* Payment Breakdown Box */}
            <div className="space-y-1 rounded-xl border border-amber-500/40 bg-amber-500/15 p-2.5 text-left sm:p-3">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-1 font-bold text-slate-900 sm:pb-1.5 dark:text-white">
                <span className="flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300">
                  <CreditCard className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Registration Fee Summary:</span>
                </span>
                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-black text-slate-950 sm:px-2.5">
                  Total ₹
                  {previewData.participants.length *
                    REGISTRATION_FEE_PER_PARTICIPANT}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10.5px] text-slate-600 sm:text-[11.5px] dark:text-slate-300">
                <span>Fee per Participant:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  ₹50
                </span>
              </div>
              <div className="flex items-center justify-between text-[10.5px] text-slate-600 sm:text-[11.5px] dark:text-slate-300">
                <span>Total Registered Participants:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {previewData.participants.length} Child
                  {previewData.participants.length > 1 ? 'ren' : ''}
                </span>
              </div>
            </div>

            {/* Guardian Info Card */}
            <div className="space-y-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-left sm:space-y-2 sm:p-3">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-1 sm:pb-1.5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <User className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Guardian Details</span>
                </span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-2 py-0.5 text-[9px] font-extrabold text-amber-800 sm:text-[9.5px] dark:text-amber-200">
                  Primary Contact
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-xs sm:gap-2">
                {/* Name */}
                <div className="col-span-1 flex items-start gap-1.5 rounded-lg bg-white/60 p-1.5 sm:gap-2 sm:p-2 dark:bg-stone-900/60">
                  <User className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-[8.5px] font-extrabold text-slate-400 uppercase sm:text-[9.5px]">
                      Guardian Name
                    </div>
                    <div className="truncate text-[11px] font-bold text-slate-900 sm:text-xs dark:text-white">
                      {previewData.guardianName}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-span-1 flex items-start gap-1.5 rounded-lg bg-white/60 p-1.5 sm:gap-2 sm:p-2 dark:bg-stone-900/60">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-[8.5px] font-extrabold text-slate-400 uppercase sm:text-[9.5px]">
                      Phone Number
                    </div>
                    <div className="truncate text-[11px] font-bold text-slate-900 sm:text-xs dark:text-white">
                      {previewData.phone}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="col-span-2 flex items-start gap-1.5 rounded-lg bg-white/60 p-1.5 sm:gap-2 sm:p-2 dark:bg-stone-900/60">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-[8.5px] font-extrabold text-slate-400 uppercase sm:text-[9.5px]">
                      Email Address
                    </div>
                    <div className="truncate text-[11px] font-bold text-slate-900 sm:text-xs dark:text-white">
                      {previewData.email}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="col-span-2 flex items-start gap-1.5 rounded-lg bg-white/60 p-1.5 sm:gap-2 sm:p-2 dark:bg-stone-900/60">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-[8.5px] font-extrabold text-slate-400 uppercase sm:text-[9.5px]">
                      Address
                    </div>
                    <div className="text-[11px] font-semibold text-slate-900 sm:text-xs dark:text-white">
                      {previewData.address}, {previewData.city} -{' '}
                      {previewData.pinCode}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants Summary List */}
            <div className="space-y-1 text-left sm:space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <Users className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>
                  Participants List ({previewData.participants.length}):
                </span>
              </div>

              <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
                {previewData.participants.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white/80 p-2 text-left shadow-2xs dark:border-white/10 dark:bg-stone-900/80"
                  >
                    <div className="min-w-0 space-y-0.5 text-left">
                      <div className="flex items-center gap-1.5 font-extrabold text-slate-900 dark:text-white">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-slate-950">
                          {idx + 1}
                        </span>
                        <span className="truncate text-[11px] sm:text-xs">
                          {p.participantName}
                        </span>
                      </div>
                      <div className="pl-5 text-[9.5px] text-slate-500 sm:text-[10px] dark:text-slate-400">
                        DOB:{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {p.dateOfBirth}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 text-[9.5px] font-bold sm:gap-1.5 sm:text-[10px]">
                      <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-amber-700 dark:text-amber-300">
                        {p.age}
                      </span>
                      <span className="rounded-md border border-amber-500/40 bg-amber-500/20 px-2 py-0.5 text-amber-800 dark:text-amber-200">
                        {p.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Razorpay Trust & Security Badge */}
            <div className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-center text-[10.5px] font-semibold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>256-bit Encrypted • Secured by Razorpay</span>
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

      {/* EXPIRED / REGISTRATION CLOSED ALERT */}
      {isClosed && (
        <div className="card-glass relative overflow-hidden rounded-2xl border border-amber-500/40 bg-amber-500/15 p-4 text-center backdrop-blur-2xl sm:rounded-3xl sm:p-5 dark:border-amber-500/30 dark:bg-stone-900/90">
          <div className="flex flex-col items-center justify-center gap-2 text-amber-900 dark:text-amber-300">
            <AlertCircle className="h-6 w-6 text-amber-500" />
            <h3 className="font-paytone text-base font-bold sm:text-lg">
              Registrations Closed for {config.year}
            </h3>
            <p className="max-w-xl text-xs text-slate-600 dark:text-slate-300">
              Online registration for the {config.year} Drawing Competition is
              officially closed as the competition date has passed. Thank you
              for your support! We look forward to seeing you in{' '}
              {config.year + 1}.
            </p>
            <Link
              href="/durgapuja/drawing-competition/list"
              className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-amber-400"
            >
              <Users className="h-3.5 w-3.5" />
              <span>View Registered Participants List</span>
            </Link>
          </div>
        </div>
      )}

      {/* TOP EVENT SUMMARY BAR */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <BorderBeam
          size={180}
          duration={8}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="flex flex-col items-center justify-between gap-3 border-b border-slate-200/80 pb-3 text-center sm:flex-row sm:gap-4 sm:pb-4 sm:text-left dark:border-white/10">
          <div className="space-y-0.5 sm:space-y-1">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[9.5px] font-extrabold text-amber-700 sm:gap-1.5 sm:px-3 sm:text-[10px] dark:text-amber-400">
              <Palette className="h-3 w-3" />
              ANNUAL DRAWING COMPETITION
            </span>
            <h2 className="font-paytone text-base font-bold text-slate-900 sm:text-2xl dark:text-white">
              Participant Registration Portal
            </h2>
          </div>

          {/* Fee Badge */}
          <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-800 sm:rounded-2xl sm:px-4 sm:py-2 dark:text-amber-300">
            <span>₹50 / Participant</span>
          </div>
        </div>

        {/* TOPIC BANNER */}
        <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-center sm:mt-4 sm:p-4">
          <span className="text-[9.5px] font-extrabold tracking-widest text-amber-700 uppercase sm:text-[10px] dark:text-amber-400">
            Drawing Topic
          </span>
          <h4 className="font-paytone text-sm font-bold text-slate-900 sm:text-xl dark:text-white">
            Draw As You Like
          </h4>
          <p className="mt-0.5 text-[10.5px] font-medium text-slate-600 sm:text-[11px] dark:text-slate-300">
            Open theme for all age groups (Group A, B & C)
          </p>
        </div>
      </div>

      {/* EVENT SCHEDULE & LOCATION DETAILS CARD */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 backdrop-blur-2xl sm:rounded-3xl sm:p-5 dark:border-white/12">
        <div className="grid grid-cols-1 divide-y divide-slate-200/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/10">
          {/* Date */}
          <div className="flex items-center gap-3 pb-2.5 sm:pr-4 sm:pb-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="text-[9.5px] font-extrabold tracking-wider text-slate-400 uppercase sm:text-[10px]">
                Date
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Sunday, 11th Oct 2026
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3 py-2.5 sm:px-4 sm:py-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="text-[9.5px] font-extrabold tracking-wider text-slate-400 uppercase sm:text-[10px]">
                Time
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                10:00 AM Onwards
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                (Reporting: 9:30 AM)
              </div>
            </div>
          </div>

          {/* Venue & Map Link */}
          <div className="flex items-center justify-between gap-2 pt-2.5 sm:pt-0 sm:pl-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="text-[9.5px] font-extrabold tracking-wider text-slate-400 uppercase sm:text-[10px]">
                  Venue
                </div>
                <div className="truncate text-xs font-bold text-slate-900 dark:text-white">
                  Madhyanchal Durga Puja Mandap
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Chandannagar, Hooghly
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Madhyanchal+Sarbajanin+Chandannagar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-[10.5px] font-extrabold text-amber-700 transition-all hover:bg-amber-500 hover:text-slate-950 dark:text-amber-300 dark:hover:text-slate-950"
            >
              <span>Map</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* PRIZES, GIFTS & CEREMONY HIGHLIGHTS CARD */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 backdrop-blur-2xl sm:rounded-3xl sm:p-5 dark:border-white/12">
        <h4 className="font-paytone mb-3 flex items-center gap-2 text-xs font-bold text-slate-900 sm:text-base dark:text-white">
          <Trophy className="h-4 w-4 text-amber-500" />
          <span>Prizes, Gifts & Ceremony Details:</span>
        </h4>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3.5">
          {/* Category Prizes */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Trophy className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 space-y-0.5 text-left">
              <div className="text-[10px] font-extrabold text-amber-800 uppercase dark:text-amber-300">
                5 Prizes Per Group
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                3 Mementos (1st, 2nd, 3rd) + 2 Medals (4th, 5th)
              </div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">
                Awarded across Group A, B & C
              </div>
            </div>
          </div>

          {/* Certificate & Gift Kit */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Gift className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 space-y-0.5 text-left">
              <div className="text-[10px] font-extrabold text-amber-800 uppercase dark:text-amber-300">
                Gifts & Refreshments for All
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Participation Certificate & Gift Hamper
              </div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">
                Complimentary Refreshments & Special Gift Package for All
              </div>
            </div>
          </div>

          {/* Prize Distribution Ceremony */}
          <div className="col-span-1 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 sm:col-span-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Award className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 space-y-0.5 text-left">
              <div className="text-[10px] font-extrabold text-amber-800 uppercase dark:text-amber-300">
                Prize Distribution Ceremony
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Saturday, 17th October 2026 at 5:00 PM
              </div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400">
                Venue: Madhyanchal Durga Puja Mandap, Chandannagar
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REGISTRATION FORM */}
      <form
        id="drawing-form-container"
        onSubmit={handleSubmit(onFormSubmit)}
        className="card-glass relative space-y-4 rounded-2xl border border-slate-200/90 p-3.5 backdrop-blur-2xl sm:space-y-8 sm:rounded-3xl sm:p-8 dark:border-white/12"
      >
        {/* GUARDIAN INFORMATION SECTION */}
        <div className="space-y-3 sm:space-y-4">
          <div className="border-b border-slate-200/80 pb-2 sm:pb-3 dark:border-white/10">
            <h3 className="font-paytone flex items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2 sm:text-lg dark:text-white">
              <User className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
              Guardian Details
            </h3>
            <p className="text-[10.5px] text-slate-500 sm:text-[11px] dark:text-slate-400">
              Provide guardian contact details for confirmation and updates.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-5">
            {/* Guardian Name */}
            <div className="col-span-1 space-y-0.5 sm:col-span-2 sm:space-y-1">
              <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
                Guardian Full Name *
              </label>
              <input
                type="text"
                {...register('guardianName', {
                  required: 'Guardian name is required',
                })}
                placeholder="Enter guardian full name"
                className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.guardianName && (
                <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                  {errors.guardianName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
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
                className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.email && (
                <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
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
                className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.phone && (
                <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="col-span-1 space-y-0.5 sm:col-span-2 sm:space-y-1">
              <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
                Address *
              </label>
              <input
                type="text"
                {...register('address', {
                  required: 'Address is required',
                })}
                placeholder="Enter street address"
                className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.address && (
                <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
                City *
              </label>
              <input
                type="text"
                {...register('city', {
                  required: 'City is required',
                })}
                placeholder="Chandannagar"
                className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.city && (
                <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Pin Code */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
                Pin Code *
              </label>
              <input
                type="text"
                {...register('pinCode', {
                  required: 'Pin code is required',
                })}
                placeholder="712136"
                className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
              />
              {errors.pinCode && (
                <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                  {errors.pinCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* REPEATABLE PARTICIPANTS SECTION */}
        <div className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
          <div className="flex flex-col justify-between gap-1.5 border-b border-slate-200/80 pb-2.5 sm:flex-row sm:items-center sm:pb-3 dark:border-white/10">
            <div>
              <h3 className="font-paytone flex items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2 sm:text-lg dark:text-white">
                <User className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
                Participant Details ({fields.length}/
                {MAX_PARTICIPANTS_PER_GUARDIAN})
              </h3>
              <p className="text-[10.5px] text-slate-500 sm:text-[11px] dark:text-slate-400">
                Add details for up to 5 participants registered under this
                guardian.
              </p>
            </div>

            {fields.length < MAX_PARTICIPANTS_PER_GUARDIAN && (
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
                className="hidden items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-700 transition-all hover:bg-amber-500 hover:text-slate-950 active:scale-95 sm:inline-flex dark:text-amber-300 dark:hover:text-slate-950"
              >
                <Plus className="h-4 w-4" />
                <span>Add Participant</span>
              </button>
            )}
          </div>

          <div className="space-y-3 sm:space-y-4">
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
                    className="relative space-y-2.5 rounded-xl border border-slate-200/80 bg-white/60 p-3 shadow-xs backdrop-blur-md sm:space-y-3 sm:p-5 dark:border-white/10 dark:bg-stone-900/60"
                  >
                    {/* Participant Card Header */}
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 dark:border-white/10">
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-wide text-amber-700 uppercase sm:gap-1.5 sm:text-xs dark:text-amber-400">
                        <User className="h-3 w-3 text-amber-500 sm:h-3.5 sm:w-3.5" />
                        Participant #{index + 1}
                      </span>

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 transition-all hover:bg-rose-500 hover:text-white sm:py-1 sm:text-[11px] dark:text-rose-400"
                          title="Remove this participant"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
                      {/* Participant Full Name */}
                      <div className="col-span-1 space-y-0.5 sm:col-span-2 sm:space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
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
                          className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
                        />
                        {pError?.participantName && (
                          <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                            {pError.participantName.message}
                          </p>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div className="space-y-0.5 sm:space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
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
                          className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
                        />
                        {pError?.dateOfBirth && (
                          <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                            {pError.dateOfBirth.message}
                          </p>
                        )}
                      </div>

                      {/* Auto Age / Category Display */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        <div className="space-y-0.5 sm:space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
                            Age
                          </label>
                          <input
                            type="text"
                            {...register(`participants.${index}.age` as const)}
                            readOnly
                            placeholder="Auto"
                            className="h-9 w-full rounded-xl border border-slate-200/80 bg-slate-100/70 px-2.5 text-xs font-bold text-amber-700 sm:h-10 sm:px-3 dark:border-white/10 dark:bg-stone-900 dark:text-amber-400"
                          />
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
                            Category
                          </label>
                          <input
                            type="text"
                            {...register(
                              `participants.${index}.category` as const
                            )}
                            readOnly
                            placeholder="Auto"
                            className="h-9 w-full rounded-xl border border-slate-200/80 bg-slate-100/70 px-2.5 text-xs font-bold text-amber-700 sm:h-10 sm:px-3 dark:border-white/10 dark:bg-stone-900 dark:text-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Bottom Add Participant Button */}
            {fields.length < MAX_PARTICIPANTS_PER_GUARDIAN ? (
              <div className="pt-0.5 text-center">
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
                  className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-amber-500/50 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-700 transition-all hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 active:scale-95 sm:gap-2 sm:px-5 sm:py-2 dark:text-amber-300 dark:hover:text-slate-950"
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Add Another Participant</span>
                </button>
              </div>
            ) : (
              <div className="pt-1 text-center text-[11px] font-bold text-amber-600 dark:text-amber-400">
                ⚠️ Maximum 5 participants allowed per guardian.
              </div>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON (OPENS PREVIEW & PAY MODAL) */}
        <div className="space-y-2 pt-2 sm:pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || isClosed}
            variant="primary"
            size="lg"
            className="h-10 w-full rounded-full border border-amber-400/60 text-xs font-extrabold shadow-sm sm:h-11 sm:text-sm"
          >
            <span className="flex items-center justify-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-amber-950 sm:h-4 sm:w-4" />
              <span>
                {isClosed
                  ? `Registrations Closed for ${config.year}`
                  : 'Preview Submission'}
              </span>
            </span>
          </Button>
        </div>
      </form>

      {/* RULES & GUIDELINES CARD */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <h4 className="font-paytone mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-900 sm:mb-3 sm:gap-2 sm:text-base dark:text-white">
          <FileText className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
          <span>Rules & Guidelines:</span>
        </h4>
        <ul className="space-y-1.5 text-[11px] text-slate-600 sm:space-y-2.5 sm:text-xs dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              <strong>Registration Fee:</strong> ₹50 per participant (Payable
              online via UPI, Cards, Net Banking).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>Drawing paper will be provided by the organizers only.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Participants must bring their own colors and other required
              materials.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Any type of color can be used for drawing, but sketch pen or scale
              cannot be used.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>The decision of the judges will be final.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Age proof certificate photocopy must be brought on the competition
              day.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>Wrong information will lead to disqualification.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              An email with the registration ID will be sent, to be shown on
              registration day.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Our seating capacity is limited, so it will be accepted on a
              priority basis.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              No applications will be accepted after the seating capacity is
              full before the specified date.
            </span>
          </li>
        </ul>
      </div>

      {/* CONTACT INFORMATION CARD */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <h4 className="font-paytone mb-1 text-xs font-bold text-slate-900 sm:text-base dark:text-white">
          Contact Information
        </h4>
        <p className="mb-3 text-[11px] text-slate-500 sm:mb-4 sm:text-xs dark:text-slate-400">
          For any queries about the drawing competition, please contact us:
        </p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3.5">
          <a
            href="mailto:madhyanchalsarbajanin@gmail.com"
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/70 p-2.5 transition-all hover:border-amber-500/50 hover:bg-amber-500/10 sm:gap-3.5 sm:p-3.5 dark:border-white/10 dark:bg-stone-900/70"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-amber-400">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-extrabold text-slate-400 uppercase sm:text-[10px]">
                Email
              </div>
              <div className="truncate text-xs font-bold text-slate-900 dark:text-white">
                madhyanchalsarbajanin@gmail.com
              </div>
            </div>
          </a>

          <a
            href="https://wa.me/917686943894"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/70 p-2.5 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 sm:gap-3.5 sm:p-3.5 dark:border-white/10 dark:bg-stone-900/70"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-emerald-400">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-extrabold text-slate-400 uppercase sm:text-[10px]">
                WhatsApp / Phone
              </div>
              <div className="truncate text-xs font-bold text-slate-900 dark:text-white">
                +91 76869 43894
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
