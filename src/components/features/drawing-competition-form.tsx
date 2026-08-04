'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { submitModel } from '@/app/actions/model';
import { BorderBeam } from '@/components/ui/border-beam';
import { NativeModal } from '@/components/ui/native-modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useForm, useFieldArray } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Eye,
  Globe,
  Loader2,
  Palette,
  Plus,
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

const competitionDate = new Date('2025-09-21T10:00:00');

function calculateAgeAndCategory(dobString: string, language: 'en' | 'bn') {
  if (!dobString) return { age: '', category: '' };

  try {
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return { age: '', category: '' };

    const timeDiff = competitionDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));

    let years = competitionDate.getFullYear() - birthDate.getFullYear();
    let months = competitionDate.getMonth() - birthDate.getMonth();

    if (months < 0) {
      months += 12;
      years--;
    }

    if (years < 0) years = 0;
    if (months < 0) months = 0;

    let ageStr = `${years} yrs ${months} mos`;
    if (language === 'bn') {
      ageStr = `${years} বছর ${months} মাস`;
    }

    let category = '';
    if (totalDays <= 2922) {
      category = language === 'en' ? 'Group A (0-8 yrs)' : 'বিভাগ ক (০-৮ বছর)';
    } else if (totalDays <= 4383) {
      category =
        language === 'en' ? 'Group B (8-12 yrs)' : 'বিভাগ খ (৮-১২ বছর)';
    } else {
      category = language === 'en' ? 'Group C (12+ yrs)' : 'বিভাগ গ (১২+ বছর)';
    }

    return { age: ageStr, category };
  } catch {
    return { age: '', category: '' };
  }
}

export function DrawingCompetitionForm() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [previewData, setPreviewData] =
    useState<DrawingCompetitionFormData | null>(null);
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);

  const [success, setSuccess] = useState<{
    registrations: Array<{ name: string; id: string }>;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);



  const isDevelopment = process.env.NODE_ENV !== 'production';

  const defaultFormValues: DrawingCompetitionFormData = isDevelopment
    ? {
        guardianName: 'Subhasis Banerjee',
        email: 'subhasis.banerjee@example.com',
        phone: '9876543210',
        address: '42, Station Road, Near Sporting Club',
        city: 'Chandannagar',
        pinCode: '712136',
        participants: [
          {
            participantName: 'Aarav Banerjee',
            dateOfBirth: '2018-05-14',
            age: '',
            category: '',
          },
          {
            participantName: 'Ananya Banerjee',
            dateOfBirth: '2014-08-20',
            age: '',
            category: '',
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
    watch,
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

  const watchedParticipants = watch('participants');

  // Recalculate ages and categories when language changes
  useEffect(() => {
    if (!watchedParticipants) return;
    watchedParticipants.forEach((p, idx) => {
      if (p?.dateOfBirth) {
        const { age, category } = calculateAgeAndCategory(
          p.dateOfBirth,
          language
        );
        setValue(`participants.${idx}.age`, age, { shouldValidate: false });
        setValue(`participants.${idx}.category`, category, {
          shouldValidate: false,
        });
      }
    });
  }, [language, setValue]);

  const handleDobChange = (index: number, dobValue: string) => {
    const { age, category } = calculateAgeAndCategory(dobValue, language);
    setValue(`participants.${index}.age`, age);
    setValue(`participants.${index}.category`, category);
  };

  // Open Preview Modal on form validation success
  const onFormSubmit = (data: DrawingCompetitionFormData) => {
    setErrorMsg(null);
    setPreviewData(data);
  };

  // Perform actual API submission from Preview Modal
  const handleFinalSubmit = async () => {
    if (!previewData) return;
    setIsSubmittingFinal(true);
    setErrorMsg(null);

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
          }
        );

        if (!res.success) {
          throw new Error(
            res.error ||
              `Submission failed for participant #${i + 1}: ${p.participantName}`
          );
        }

        results.push({ name: p.participantName, id: regId });
      }

      setPreviewData(null);
      setSuccess({ registrations: results });
      reset(defaultFormValues);
    } catch (err) {
      setPreviewData(null);
      setErrorMsg(
        err instanceof Error ? err.message : 'Registration failed. Try again.'
      );
    } finally {
      setIsSubmittingFinal(false);
    }
  };

  const isBn = language === 'bn';
  const isProduction = process.env.NODE_ENV === 'production';

  // In production environment, display coming soon notice card
  if (isProduction) {
    return (
      <div
        className={cn(
          'relative mx-auto max-w-4xl space-y-6',
          isBn && 'font-bengali'
        )}
      >
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
              {isBn
                ? 'অনলাইন নাম নথিভুক্তকরণ শীঘ্রই শুরু হচ্ছে'
                : 'REGISTRATION OPENING SOON'}
            </span>

            <h2
              className={cn(
                'text-xl font-bold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white',
                isBn
                  ? 'font-bengali leading-snug font-extrabold sm:leading-tight'
                  : 'font-paytone'
              )}
            >
              {isBn
                ? 'মধ্যঞ্চল বার্ষিক বসে আঁকো প্রতিযোগিতা'
                : 'Madhyanchal Annual Sit & Draw Competition'}
            </h2>

            <p className="max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
              {isBn
                ? 'প্রতিযোগিতায় শিশুদের নাম নথিভুক্ত করার প্রক্রিয়া খুব শীঘ্রই শুরু হতে চলেছে। স্থান, সময় ও নিয়মাবলীর তথ্যের জন্য নজর রাখুন।'
                : 'Online registration for children’s Sit & Draw competition will open shortly. Please check back soon for schedule details and age category guidelines.'}
            </p>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100 p-1 dark:border-white/10 dark:bg-stone-900">
              <Globe className="ml-2 h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-bold transition-all',
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                )}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-bold transition-all',
                  language === 'bn'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                )}
              >
                বাংলা
              </button>
            </div>

            {/* TOPIC PREVIEW BANNER */}
            <div className="w-full max-w-xl rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center sm:p-4">
              <span className="text-[10px] font-extrabold tracking-widest text-amber-700 uppercase dark:text-amber-400">
                {isBn ? 'অঙ্কনের বিষয়' : 'Drawing Topic'}
              </span>
              <h4
                className={cn(
                  'text-base font-bold text-slate-900 sm:text-xl dark:text-white',
                  isBn ? 'font-bengali font-extrabold' : 'font-paytone'
                )}
              >
                {isBn
                  ? 'যেমন খুশি আঁকো (Draw As You Like)'
                  : 'Draw As You Like'}
              </h4>
              <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                {isBn
                  ? 'সকল বয়সের প্রতিযোগীদের জন্য (Group A, B & C)'
                  : 'Open theme for all age groups (Group A, B & C)'}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/durgapuja"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500 px-6 py-2.5 text-xs font-extrabold text-slate-950 shadow-md transition-all hover:bg-amber-400 active:scale-95"
              >
                <span>
                  {isBn
                    ? 'দুর্গাপূজা উৎসবে ফিরে যান'
                    : 'Explore Durga Puja Events'}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* RULES & GUIDELINES CARD */}
        <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
          <h4 className="font-paytone mb-2 text-sm font-bold text-slate-900 sm:text-base dark:text-white">
            {isBn ? 'নিয়মাবলী ও শর্তসমূহ:' : 'Rules & Guidelines:'}
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                {isBn
                  ? 'অংশগ্রহণের ফি ও রেজিস্ট্রেশনের নিয়মাবলী নাম নথিভুক্তকরণ চালু হলে প্রকাশ করা হবে।'
                  : 'Registration fee & guidelines will be announced when online portal opens.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                {isBn
                  ? 'আয়োজকদের পক্ষ থেকে শুধুমাত্র আর্ট পেপার দেওয়া হবে।'
                  : 'Drawing paper will be provided at the venue.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                {isBn
                  ? 'রং ও অন্যান্য আঁকার সরঞ্জাম প্রতিযোগীদের নিজেদের আনতে হবে।'
                  : 'Participants must bring their own colors and drawing kits.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                {isBn
                  ? 'বিচারকদের সিদ্ধান্তই চূড়ান্ত বলে গণ্য হবে।'
                  : 'Judges’ decision will be final.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                {isBn
                  ? 'প্রতিযোগিতার দিন বয়সের প্রমাণপত্রের ফটোকপি জমা দিতে হবে।'
                  : 'Please carry a photocopy of age proof on competition day.'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative mx-auto max-w-4xl space-y-6',
        isBn && 'font-bengali'
      )}
    >
      {/* UNIFIED NATIVE PREVIEW MODAL */}
      <NativeModal
        isOpen={previewData !== null}
        onClose={() => {
          if (!isSubmittingFinal) setPreviewData(null);
        }}
        variant="info"
        title={
          isBn ? 'রেজিস্ট্রেশনের বিবরণ রিভিউ করুন' : 'Review Registration Details'
        }
        description={
          isBn
            ? 'চূড়ান্ত জমা দেওয়ার আগে অভিভাবক ও সকল প্রতিযোগীর তথ্যগুলো ভালো করে দেখে নিন।'
            : 'Please review all details for the guardian and participant(s) before final submission.'
        }
        primaryButton={{
          label: isSubmittingFinal
            ? isBn
              ? 'জমা হচ্ছে...'
              : 'Submitting...'
            : isBn
              ? 'কনফার্ম করুন ও জমা দিন'
              : 'Confirm & Submit',
          onClick: handleFinalSubmit,
          icon: isSubmittingFinal ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          ),
        }}
        secondaryButton={{
          label: isBn ? 'সংশোধন করুন' : 'Edit Details',
          onClick: () => setPreviewData(null),
          variant: 'secondary',
        }}
      >
        {previewData && (
          <div className="space-y-3.5 text-left text-xs text-slate-700 dark:text-slate-200">
            {/* Guardian Info Box */}
            <div className="space-y-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-left">
              <div className="flex items-center gap-1.5 border-b border-amber-500/20 pb-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                <User className="h-4 w-4 shrink-0 text-amber-500" />
                <span>{isBn ? 'অভিভাবকের বিবরণ:' : 'Guardian Information:'}</span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                <div className="flex items-baseline gap-1.5 text-left">
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">
                    {isBn ? 'নাম:' : 'Name:'}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {previewData.guardianName}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 text-left">
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">
                    {isBn ? 'ফোন:' : 'Phone:'}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {previewData.phone}
                  </span>
                </div>
                <div className="col-span-1 flex items-baseline gap-1.5 text-left sm:col-span-2">
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">
                    {isBn ? 'ইমেইল:' : 'Email:'}
                  </span>
                  <span className="break-all font-semibold text-slate-900 dark:text-white">
                    {previewData.email}
                  </span>
                </div>
                <div className="col-span-1 flex items-baseline gap-1.5 text-left sm:col-span-2">
                  <span className="shrink-0 text-slate-500 dark:text-slate-400">
                    {isBn ? 'ঠিকানা:' : 'Address:'}
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
                  {isBn
                    ? `প্রতিযোগী তালিকা (${previewData.participants.length} জন):`
                    : `Participants List (${previewData.participants.length}):`}
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
                        {isBn ? 'জন্ম তারিখ: ' : 'DOB: '}{' '}
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
        title={isBn ? 'রেজিস্ট্রেশন সফল হয়েছে!' : 'Registration Successful!'}
        description={
          isBn
            ? `${success?.registrations.length || 1} জন প্রতিযোগীর রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে। একটি নিশ্চিতকরণ আইডি নিচে দেওয়া হলো।`
            : `Registration successful for ${success?.registrations.length || 1} participant(s). Registration details are below.`
        }
        details={
          success?.registrations.map((reg) => ({
            label: reg.name,
            value: reg.id,
            copyable: true,
          })) || []
        }
        primaryButton={{
          label: isBn ? 'ঠিক আছে' : 'Done',
          onClick: () => setSuccess(null),
        }}
      />

      {/* UNIFIED NATIVE ERROR MODAL */}
      <NativeModal
        isOpen={errorMsg !== null}
        onClose={() => setErrorMsg(null)}
        variant="error"
        title={isBn ? 'রেজিস্ট্রেশন ব্যর্থ হয়েছে' : 'Registration Failed'}
        description={errorMsg || ''}
        primaryButton={{
          label: isBn ? 'বন্ধ করুন' : 'Close',
          onClick: () => setErrorMsg(null),
        }}
      />

      {/* TOP EVENT SUMMARY BAR & LANGUAGE SWITCHER */}
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
              {isBn
                ? 'বার্ষিক অঙ্কন প্রতিযোগিতা'
                : 'ANNUAL DRAWING COMPETITION'}
            </span>
            <h2 className="font-paytone text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
              {isBn
                ? 'অনলাইন রেজিস্ট্রেশন ফরম'
                : 'Participant Registration Portal'}
            </h2>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100 p-1 dark:border-white/10 dark:bg-stone-900">
            <Globe className="ml-2 h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-bold transition-all',
                language === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-bold transition-all',
                language === 'bn'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              বাংলা
            </button>
          </div>
        </div>

        {/* TOPIC BANNER */}
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center sm:p-4">
          <span className="text-[10px] font-extrabold tracking-widest text-amber-700 uppercase dark:text-amber-400">
            {isBn ? 'অঙ্কনের বিষয়' : 'Drawing Topic'}
          </span>
          <h4 className="font-paytone text-base font-bold text-slate-900 sm:text-xl dark:text-white">
            {isBn ? 'যেমন খুশি আঁকো (Draw As You Like)' : 'Draw As You Like'}
          </h4>
          <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
            {isBn
              ? 'সকল বিভাগের জন্য প্রযোজ্য (Open to all categories)'
              : 'Open theme for all age groups (Group A, B & C)'}
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
              {isBn ? 'অভিভাবকের বিবরণ' : 'Guardian Details'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isBn
                ? 'যোগাযোগ ও নিশ্চিতকরণের জন্য অভিভাবকের প্রয়োজনীয় তথ্য লিখুন।'
                : 'Provide guardian contact details for confirmation and updates.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
            {/* Guardian Name */}
            <div className="col-span-1 space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isBn ? 'অভিভাবকের নাম' : 'Guardian Full Name'} *
              </label>
              <input
                type="text"
                {...register('guardianName', {
                  required: isBn
                    ? 'অভিভাবকের নাম আবশ্যক'
                    : 'Guardian name is required',
                })}
                placeholder={
                  isBn ? 'অভিভাবকের নাম লিখুন' : 'Enter guardian full name'
                }
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
                {isBn ? 'ইমেইল' : 'Email Address'} *
              </label>
              <input
                type="email"
                {...register('email', {
                  required: isBn ? 'ইমেইল আবশ্যক' : 'Email is required',
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
                {isBn ? 'ফোন নম্বর' : 'Phone Number'} *
              </label>
              <input
                type="tel"
                {...register('phone', {
                  required: isBn ? 'ফোন নম্বর আবশ্যক' : 'Phone is required',
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
                {isBn ? 'ঠিকানা' : 'Address'} *
              </label>
              <input
                type="text"
                {...register('address', {
                  required: isBn ? 'ঠিকানা আবশ্যক' : 'Address is required',
                })}
                placeholder={
                  isBn ? 'সম্পূর্ণ ঠিকানা লিখুন' : 'Enter street address'
                }
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
                {isBn ? 'শহর' : 'City'} *
              </label>
              <input
                type="text"
                {...register('city', {
                  required: isBn ? 'শহর আবশ্যক' : 'City is required',
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
                {isBn ? 'পিন কোড' : 'Pin Code'} *
              </label>
              <input
                type="text"
                {...register('pinCode', {
                  required: isBn ? 'পিন কোড আবশ্যক' : 'Pin code is required',
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
                {isBn
                  ? 'প্রতিযোগীদের (শিশুদের) বিবরণ'
                  : 'Participant(s) / Children Details'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isBn
                  ? 'এই অভিভাবকের অধীনে অংশগ্রহণকারী সকল শিশুর তথ্য যোগ করুন।'
                  : 'Add details for all children participating under this guardian.'}
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
              <span>{isBn ? '+ নতুন শিশু যোগ করুন' : '+ Add Child'}</span>
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
                        {isBn
                          ? `প্রতিযোগী #${index + 1}`
                          : `Child / Participant #${index + 1}`}
                      </span>

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[11px] font-bold text-rose-600 transition-all hover:bg-rose-500 hover:text-white dark:text-rose-400"
                          title="Remove this participant"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            {isBn ? 'রিমুভ করুন' : 'Remove'}
                          </span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                      {/* Participant Full Name */}
                      <div className="col-span-1 space-y-1 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          {isBn ? 'প্রতিযোগীর নাম' : 'Participant Full Name'} *
                        </label>
                        <input
                          type="text"
                          {...register(
                            `participants.${index}.participantName` as const,
                            {
                              required: isBn
                                ? 'নাম আবশ্যক'
                                : 'Full name is required',
                            }
                          )}
                          placeholder={
                            isBn
                              ? 'শিশুর সম্পূর্ণ নাম লিখুন'
                              : 'Enter child full name'
                          }
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
                          {isBn ? 'জন্ম তারিখ' : 'Date of Birth'} *
                        </label>
                        <input
                          type="date"
                          {...register(
                            `participants.${index}.dateOfBirth` as const,
                            {
                              required: isBn
                                ? 'জন্ম তারিখ আবশ্যক'
                                : 'Date of birth is required',
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
                            {isBn ? 'বয়স' : 'Age'}
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
                            {isBn ? 'বিভাগ' : 'Category'}
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
                <span>
                  {isBn
                    ? '+ আরও একজন শিশু / প্রতিযোগী যোগ করুন'
                    : '+ Add Another Child / Participant'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON (OPENS PREVIEW MODAL) */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="h-11 w-full rounded-full border border-amber-400/60 text-xs font-extrabold shadow-sm sm:text-sm"
          >
            <span className="flex items-center justify-center gap-1.5">
              <Eye className="h-4 w-4 text-amber-950" />
              {isBn
                ? `বিবরণ প্রিভিউ করুন (${fields.length} জন প্রতিযোগী)`
                : `Preview & Review Details (${fields.length} Participant${fields.length > 1 ? 's' : ''})`}
            </span>
          </Button>
        </div>
      </form>

      {/* RULES & GUIDELINES CARD */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <h4 className="font-paytone mb-2 text-sm font-bold text-slate-900 sm:text-base dark:text-white">
          {isBn ? 'নিয়মাবলী ও শর্তসমূহ:' : 'Rules & Guidelines:'}
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              {isBn
                ? 'একই অভিভাবক একাধিক শিশুর নাম নথিভুক্ত করতে পারবেন।'
                : 'Single guardian can register multiple children in one submission.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              {isBn
                ? 'আয়োজকদের পক্ষ থেকে শুধুমাত্র আর্ট পেপার দেওয়া হবে।'
                : 'Drawing paper will be provided by the organizers.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              {isBn
                ? 'রং ও অন্যান্য সামগ্রী প্রতিযোগীদের নিজেদের আনতে হবে।'
                : 'Participants must bring their own colors and drawing materials.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              {isBn
                ? 'বিচারকমণ্ডলীর সিদ্ধান্ত চূড়ান্ত বলে গণ্য হবে।'
                : 'The decision of the judges will be final.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>
              {isBn
                ? 'প্রতিযোগিতার দিন বয়সের প্রমাণপত্রের ফটোকপি আনতে হবে।'
                : 'Photocopy of age proof certificate must be produced on competition day.'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
