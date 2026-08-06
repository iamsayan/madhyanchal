'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import { createRazorpayOrder } from '@/app/actions/razorpay';
import { sendDrawingEmailAction } from '@/app/actions/email';
import { BorderBeam } from '@/components/ui/border-beam';
import { NativeModal } from '@/components/ui/native-modal';
import { loadRazorpay } from '@/lib/load-razorpay';
import { RazorpaySuccessResponse } from '@/types';
import {
  DrawingCompetitionList,
  ParticipantRecord,
} from '@/components/features/drawing-competition-list';
import {
  DRAWING_COMPETITION_CONFIG,
  getAgeCategoryLimits,
  getOrdinalSuffix,
  isRegistrationClosed,
} from '@/config/drawing-competition';
import {
  AlertCircle,
  ArrowRight,
  Award,
  Calendar,
  Clock,
  CreditCard,
  ExternalLink,
  FileText,
  Gift,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
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

interface DrawingCompetitionLandingProps {
  initialParticipants?: ParticipantRecord[];
}

export function DrawingCompetitionLanding({
  initialParticipants = [],
}: DrawingCompetitionLandingProps) {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const isClosed = isRegistrationClosed();
  const config = DRAWING_COMPETITION_CONFIG;
  const ageCategories = getAgeCategoryLimits(config.year);
  const editionOrdinal = getOrdinalSuffix(config.edition);

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

  const onFormSubmit = (data: DrawingCompetitionFormData) => {
    setErrorMsg(null);
    setPreviewData(data);
  };

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

      if (process.env.NODE_ENV !== 'production' && previewData) {
        try {
          await sendDrawingEmailAction({
            toEmail: previewData.email,
            guardianName: previewData.guardianName,
            phone: previewData.phone.replace(/\D+/g, ''),
            paymentId: `pay_TEST_${dateSuffix}`,
            orderId: `order_TEST_${dateSuffix}`,
            paymentAmount: totalAmount,
            participants: previewData.participants.map((p, idx) => ({
              id: registrations[idx]?.id || `DC/${dateSuffix}${idx + 1}`,
              name: p.participantName,
              category: p.category,
              age: p.age,
              dob: p.dateOfBirth,
            })),
          });
        } catch (devEmailErr) {
          console.error('Dev mode email trigger error:', devEmailErr);
        }
      }

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
        handler: async function (response: RazorpaySuccessResponse) {
          const currentData = previewData;
          setPreviewData(null);
          setSuccess({
            registrations,
            paymentId: response.razorpay_payment_id,
            totalAmount,
          });
          reset(defaultFormValues);
          setIsSubmittingFinal(false);

          if (process.env.NODE_ENV !== 'production' && currentData) {
            try {
              await sendDrawingEmailAction({
                toEmail: currentData.email,
                guardianName: currentData.guardianName,
                phone: currentData.phone.replace(/\D+/g, ''),
                paymentId: response.razorpay_payment_id,
                orderId:
                  response.razorpay_order_id || orderResponse.orderId || '',
                paymentAmount: totalAmount,
                participants: currentData.participants.map((p, idx) => ({
                  id: registrations[idx]?.id || `DC/${dateSuffix}${idx + 1}`,
                  name: p.participantName,
                  category: p.category,
                  age: p.age,
                  dob: p.dateOfBirth,
                })),
              });
            } catch (devEmailErr) {
              console.error('Dev mode email trigger error:', devEmailErr);
            }
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

  const scrollToForm = () => {
    const el = document.getElementById('drawing-form-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative mx-auto max-w-6xl space-y-4 sm:space-y-6">
      {/* REGISTRATION CLOSED NOTICE BANNER (IF EXPIRED) */}
      {isClosed && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/15 p-4 text-center sm:flex-row sm:text-left dark:border-amber-500/30 dark:bg-stone-900/90">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-paytone text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                Registrations Closed for {config.year}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Thank you for the overwhelming response! Online registrations
                for the {config.year} edition are officially closed. We look
                forward to welcoming you in {config.year + 1}!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsListModalOpen(true)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:bg-amber-400"
          >
            <Users className="h-3.5 w-3.5" />
            <span>View Registered List</span>
          </button>
        </div>
      )}

      {/* TOP ACTION & TOPIC BANNER SECTION */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 text-center backdrop-blur-2xl sm:rounded-3xl sm:p-8 dark:border-white/12">
        <BorderBeam
          size={240}
          duration={7}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="flex flex-col items-center space-y-2.5 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-0.5 text-[9.5px] font-extrabold tracking-wider text-amber-800 uppercase sm:px-4 sm:py-1.5 sm:text-xs dark:text-amber-300">
            <Sparkles className="h-3 w-3 animate-pulse text-amber-500 sm:h-3.5 sm:w-3.5" />
            {editionOrdinal} ANNUAL SIT & DRAW COMPETITION {config.year}
          </span>

          {/* TOPIC BANNER HIGHLIGHT */}
          <div className="w-full max-w-xl rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center sm:px-5 sm:py-3">
            <span className="block text-[9.5px] leading-none font-extrabold tracking-widest text-amber-700 uppercase sm:text-[11px] dark:text-amber-400">
              Drawing Theme
            </span>
            <h3 className="font-paytone mt-0.5 text-sm leading-tight font-bold text-slate-900 sm:text-xl dark:text-white">
              {config.topic}
            </h3>
            <p className="mt-0.5 text-[10px] leading-relaxed font-medium text-slate-600 sm:text-xs dark:text-slate-300">
              Open creative freedom for all age categories (Group A, B & C)
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex w-full flex-row flex-nowrap items-center justify-center gap-1.5 pt-0.5 sm:gap-3">
            {!isClosed ? (
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 px-3 py-1.5 text-[11px] font-extrabold tracking-tight whitespace-nowrap text-slate-950 transition-all hover:scale-105 active:scale-95 sm:px-5 sm:py-2 sm:text-xs sm:tracking-wide"
              >
                <span>Register Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <div className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-[11px] font-bold whitespace-nowrap text-amber-700 sm:px-5 sm:py-2 sm:text-xs dark:text-amber-300">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Registrations Closed ({config.year})</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsListModalOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full border border-slate-300/80 bg-white/80 px-3 py-1.5 text-[11px] font-bold whitespace-nowrap text-slate-800 transition-all hover:bg-slate-100 sm:px-4.5 sm:py-2 sm:text-xs dark:border-white/15 dark:bg-stone-900/80 dark:text-slate-200 dark:hover:bg-stone-800"
            >
              <Users className="h-3.5 w-3.5 text-amber-500" />
              <span>Participants List</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. AGE CATEGORIES CARDS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {ageCategories.map((cat) => (
          <div
            key={cat.group}
            className="card-glass relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 p-4 transition-all hover:scale-[1.01] dark:border-white/12"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-extrabold ${cat.badgeColor}`}
                >
                  {cat.group}
                </span>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  {cat.title}
                </span>
              </div>

              <div className="pt-1">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase">
                  Age Limit
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {cat.age} ({cat.dob})
                </div>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                {cat.description}
              </p>
            </div>

            <div className="mt-4 border-t border-slate-200/60 pt-2.5 dark:border-white/10">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                <Trophy className="h-3.5 w-3.5" />
                <span>{cat.prizes}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. EVENT SCHEDULE, VENUE & CEREMONY HIGHLIGHTS CARD */}
      <div className="card-glass relative space-y-3 overflow-hidden rounded-2xl border border-slate-200/90 p-3 backdrop-blur-2xl sm:rounded-3xl sm:p-4.5 dark:border-white/12">
        {/* Row 1: Date, Time & Venue */}
        <div className="grid grid-cols-1 divide-y divide-slate-200/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/10">
          {/* Date */}
          <div className="flex items-center gap-2.5 pb-2 sm:pr-3 sm:pb-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="text-[9.5px] font-extrabold tracking-wider text-slate-400 uppercase">
                Date
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Sunday, 11th Oct 2026
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2.5 py-2 sm:px-3 sm:py-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="text-[9.5px] font-extrabold tracking-wider text-slate-400 uppercase">
                Time
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                10:00 AM Onwards{' '}
                <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
                  (Report: 9:30 AM)
                </span>
              </div>
            </div>
          </div>

          {/* Venue & Map Link */}
          <div className="flex items-center justify-between gap-2 pt-2 sm:pt-0 sm:pl-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="text-[9.5px] font-extrabold tracking-wider text-slate-400 uppercase">
                  Venue
                </div>
                <div className="truncate text-xs font-bold text-slate-900 dark:text-white">
                  Madhyanchal Mandap, Chandannagar
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Madhyanchal+Sarbajanin+Chandannagar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-700 transition-all hover:bg-amber-500 hover:text-slate-950 dark:text-amber-300 dark:hover:text-slate-950"
            >
              <span>Map</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Row 2: Gifts & Stage Ceremony */}
        <div className="grid grid-cols-1 gap-2 border-t border-slate-200/80 pt-2.5 sm:grid-cols-2 sm:gap-3 dark:border-white/10">
          {/* Certificate & Gift Kit */}
          <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Gift className="h-4 w-4" />
            </div>
            <div className="min-w-0 space-y-0.5 text-left">
              <div className="text-[9.5px] font-extrabold text-amber-800 uppercase dark:text-amber-300">
                Gifts & Refreshments for All
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Participation Certificate & Gift Hamper
              </div>
            </div>
          </div>

          {/* Prize Distribution Ceremony */}
          <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Award className="h-4 w-4" />
            </div>
            <div className="min-w-0 space-y-0.5 text-left">
              <div className="text-[9.5px] font-extrabold text-amber-800 uppercase dark:text-amber-300">
                Prize Distribution Ceremony
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Saturday, 17th October 2026 at 5:00 PM
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
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="guardian@example.com"
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
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: '10-digit valid Indian phone number required',
                  },
                })}
                placeholder="10-digit mobile number"
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
                Street Address *
              </label>
              <input
                type="text"
                {...register('address', {
                  required: 'Address is required',
                })}
                placeholder="House / Flat No, Street, Landmark"
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
                City / Town *
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

            {/* Pincode */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
                Pincode *
              </label>
              <input
                type="text"
                {...register('pinCode', {
                  required: 'Pincode is required',
                  pattern: {
                    value: /^\d{6}$/,
                    message: '6-digit pincode required',
                  },
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

        {/* PARTICIPANTS INFORMATION SECTION */}
        <div className="space-y-3 pt-2 sm:space-y-4 sm:pt-4">
          <div className="flex flex-nowrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2 sm:gap-3 sm:pb-3 dark:border-white/10">
            <div className="min-w-0 flex-1">
              <h3 className="font-paytone flex items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2 sm:text-lg dark:text-white">
                <Users className="h-3.5 w-3.5 shrink-0 text-amber-500 sm:h-4 sm:w-4" />
                <span className="truncate">
                  Participant Details ({fields.length}/
                  {MAX_PARTICIPANTS_PER_GUARDIAN})
                </span>
              </h3>
              <p className="truncate text-[10px] text-slate-500 sm:text-[11px] dark:text-slate-400">
                You can add up to {MAX_PARTICIPANTS_PER_GUARDIAN} children per
                registration.
              </p>
            </div>

            {fields.length < MAX_PARTICIPANTS_PER_GUARDIAN && !isClosed && (
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
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-amber-700 transition-all hover:bg-amber-500 hover:text-slate-950 sm:px-3.5 sm:py-1.5 dark:text-amber-300 dark:hover:text-slate-950"
              >
                <Plus className="h-3.5 w-3.5 shrink-0" />
                <span className="whitespace-nowrap">Add Child</span>
              </button>
            )}
          </div>

          <div className="space-y-3 sm:space-y-4">
            <AnimatePresence initial={false}>
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative rounded-2xl border border-slate-200/80 bg-white/70 p-3 sm:p-5 dark:border-white/10 dark:bg-stone-900/60"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 text-xs font-bold text-slate-900 sm:pb-3 dark:border-white/10 dark:text-white">
                    <span className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-slate-950">
                        {index + 1}
                      </span>
                      <span>Participant #{index + 1}</span>
                    </span>

                    {fields.length > 1 && !isClosed && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-rose-500 transition-colors hover:bg-rose-500/10 dark:text-rose-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
                    {/* Participant Name */}
                    <div className="col-span-1 space-y-0.5 sm:col-span-2 sm:space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 sm:text-xs dark:text-slate-200">
                        Child’s Full Name *
                      </label>
                      <input
                        type="text"
                        {...register(
                          `participants.${index}.participantName` as const,
                          { required: 'Child name is required' }
                        )}
                        placeholder="Enter participant full name"
                        className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
                      />
                      {errors.participants?.[index]?.participantName && (
                        <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                          {errors.participants[index]?.participantName?.message}
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
                        {...register(
                          `participants.${index}.dateOfBirth` as const,
                          {
                            required: 'Date of birth is required',
                            onChange: (e) =>
                              handleDobChange(index, e.target.value),
                          }
                        )}
                        className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none sm:h-10 sm:px-3.5 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
                      />
                      {errors.participants?.[index]?.dateOfBirth && (
                        <p className="text-[10px] font-semibold text-rose-500 sm:text-[11px]">
                          {errors.participants[index]?.dateOfBirth?.message}
                        </p>
                      )}
                    </div>

                    {/* Auto Computed Age & Category */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-0.5 sm:space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 sm:text-[11px] dark:text-slate-400">
                          Age
                        </label>
                        <input
                          type="text"
                          readOnly
                          {...register(`participants.${index}.age` as const)}
                          placeholder="Auto-calculated"
                          className="h-9 w-full rounded-xl border border-slate-200/80 bg-slate-100/80 px-3 text-xs font-semibold text-slate-700 sm:h-10 sm:px-3.5 dark:border-white/10 dark:bg-stone-950/40 dark:text-slate-300"
                        />
                      </div>

                      <div className="space-y-0.5 sm:space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 sm:text-[11px] dark:text-slate-400">
                          Group
                        </label>
                        <input
                          type="text"
                          readOnly
                          {...register(
                            `participants.${index}.category` as const
                          )}
                          placeholder="Auto-assigned"
                          className="h-9 w-full rounded-xl border border-slate-200/80 bg-slate-100/80 px-3 text-xs font-semibold text-slate-700 sm:h-10 sm:px-3.5 dark:border-white/10 dark:bg-stone-950/40 dark:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* SUBMIT REGISTRATION BUTTON */}
        <div className="relative">
          {!isClosed ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 py-2.5 text-xs font-black tracking-wide text-slate-950 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 sm:rounded-2xl sm:py-3.5 sm:text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Validating Form...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  <span>
                    Proceed to Review (Pay ₹
                    {fields.length * REGISTRATION_FEE_PER_PARTICIPANT})
                  </span>
                </>
              )}
            </button>
          ) : (
            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/15 p-3 text-center text-xs font-bold text-amber-800 dark:text-amber-300">
              Registrations Closed for {config.year}
            </div>
          )}
        </div>
      </form>

      {/* TERMS & RULES LIST CARD */}
      <div className="card-glass relative space-y-2 rounded-2xl border border-slate-200/90 p-3.5 backdrop-blur-2xl sm:space-y-3 sm:rounded-3xl sm:p-6 dark:border-white/12">
        <h4 className="font-paytone flex items-center gap-1.5 text-xs font-bold text-slate-900 sm:gap-2 sm:text-base dark:text-white">
          <FileText className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
          Terms & Guidelines
        </h4>
        <ul className="space-y-1.5 text-[11px] text-slate-600 sm:space-y-2 sm:text-xs dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Registration Limit: Maximum of {MAX_PARTICIPANTS_PER_GUARDIAN}{' '}
              participants are allowed per guardian registration.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              Registration Fee: ₹{REGISTRATION_FEE_PER_PARTICIPANT} per
              participant (Payable online via UPI, Credit/Debit Cards, Net
              Banking).
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
                    className="flex flex-row items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white/80 p-2 text-left dark:border-white/10 dark:bg-stone-900/80"
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

      {/* NATIVE MODAL FOR REGISTERED PARTICIPANTS LIST */}
      <NativeModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        variant="info"
        title="Registered Participants"
        description={`Final list of confirmed registrations for the ${config.year} Drawing Competition.`}
        badgeIcon={<Users className="h-7 w-7 text-amber-500 sm:h-9 sm:w-9" />}
        maxWidthClass="sm:max-w-2xl md:max-w-3xl"
        // primaryButton={{
        //   label: 'Close',
        //   onClick: () => setIsListModalOpen(false),
        // }}
        // hideCloseIcon
      >
        <DrawingCompetitionList initialData={initialParticipants} />
      </NativeModal>
    </div>
  );
}
