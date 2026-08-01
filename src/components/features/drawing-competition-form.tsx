'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { submitModel } from '@/app/actions/model';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useForm } from 'react-hook-form';

import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Globe,
  Loader2,
  Palette,
  Sparkles,
  User,
} from 'lucide-react';

export interface DrawingCompetitionFormData {
  participantName: string;
  dateOfBirth: string;
  age: string;
  category: string;
  guardianName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
}

const competitionDate = new Date('2025-09-21T10:00:00');

export function DrawingCompetitionForm() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [success, setSuccess] = useState<{
    registrationId: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DrawingCompetitionFormData>({
    defaultValues: {
      participantName: '',
      dateOfBirth: '',
      age: '',
      category: '',
      guardianName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pinCode: '',
    },
  });

  const watchedDateOfBirth = watch('dateOfBirth');

  // Auto-calculate age and category when date of birth changes
  useEffect(() => {
    if (!watchedDateOfBirth) return;

    try {
      const birthDate = new Date(watchedDateOfBirth);
      if (isNaN(birthDate.getTime())) return;

      const timeDiff = competitionDate.getTime() - birthDate.getTime();
      const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));

      let years = competitionDate.getFullYear() - birthDate.getFullYear();
      let months = competitionDate.getMonth() - birthDate.getMonth();

      if (months < 0) {
        months += 12;
        years--;
      }

      let ageStr = `${years} yrs ${months} mos`;
      if (language === 'bn') {
        ageStr = `${years} বছর ${months} মাস`;
      }

      let category = 'Group A (0-8 yrs)';
      if (totalDays <= 2922) {
        category = language === 'en' ? 'Category A' : 'বিভাগ ক';
      } else if (totalDays <= 4383) {
        category = language === 'en' ? 'Category B' : 'বিভাগ খ';
      } else {
        category = language === 'en' ? 'Category C' : 'বিভাগ গ';
      }

      setValue('age', ageStr);
      setValue('category', category);
    } catch {
      // Fallback
    }
  }, [watchedDateOfBirth, language, setValue]);

  const onSubmit = async (data: DrawingCompetitionFormData) => {
    setErrorMsg(null);
    try {
      const regId = `DC/${Date.now().toString().slice(-8)}`;
      const res = await submitModel(
        `drawingcompetition${new Date().getFullYear()}`,
        {
          registration_id: regId,
          mode: 'online',
          name: data.participantName,
          dob: data.dateOfBirth,
          age: data.age || '',
          category: data.category || '',
          guardian_name: data.guardianName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          pincode: data.pinCode,
        }
      );

      if (!res.success) {
        throw new Error(res.error || 'Submission failed');
      }

      setSuccess({ registrationId: regId });
      reset();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Registration failed. Try again.'
      );
    }
  };

  const isBn = language === 'bn';

  return (
    <div className="relative mx-auto max-w-4xl space-y-6">
      {/* SUCCESS MODAL DIALOG */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="card-glass relative w-full max-w-md space-y-4 rounded-3xl border border-emerald-500/40 bg-white p-6 text-center shadow-2xl dark:bg-stone-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-paytone text-xl font-bold text-slate-900 dark:text-white">
              {isBn ? 'রেজিস্ট্রেশন সফল হয়েছে!' : 'Registration Successful!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isBn ? 'আপনার রেজিস্ট্রেশন আইডি:' : 'Your Registration ID:'}
            </p>
            <span className="inline-block rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-lg font-black text-emerald-700 dark:text-emerald-300">
              {success.registrationId}
            </span>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {isBn
                ? 'একটি নিশ্চিতকরণ মেল আপনার ইমেল ঠিকানায় পাঠানো হয়েছে। প্রতিযোগিতার দিনে এটি দেখান।'
                : 'A confirmation email has been sent. Please present this ID at the venue on competition day.'}
            </p>
            <Button
              variant="primary"
              onClick={() => setSuccess(null)}
              className="h-10 w-full rounded-full border border-emerald-400/60 bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
            >
              {isBn ? 'ঠিক আছে' : 'Done'}
            </Button>
          </div>
        </div>
      )}

      {/* ERROR MODAL DIALOG */}
      {errorMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="card-glass relative w-full max-w-md space-y-4 rounded-3xl border border-rose-500/40 bg-white p-6 text-center shadow-2xl dark:bg-stone-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="font-paytone text-lg font-bold text-slate-900 dark:text-white">
              Registration Failed
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {errorMsg}
            </p>
            <Button
              variant="outline"
              onClick={() => setErrorMsg(null)}
              className="h-10 w-full rounded-full border-slate-300 text-xs font-bold dark:border-white/20"
            >
              Close
            </Button>
          </div>
        </div>
      )}

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
              {isBn ? 'বার্ষিক অঙ্কন প্রতিযোগিতা' : 'ANNUAL DRAWING COMPETITION'}
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
        onSubmit={handleSubmit(onSubmit)}
        className="card-glass relative space-y-4 rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:space-y-6 sm:rounded-3xl sm:p-8 dark:border-white/12"
      >
        <div className="border-b border-slate-200/80 pb-3 dark:border-white/10">
          <h3 className="font-paytone flex items-center gap-2 text-sm font-bold text-slate-900 sm:text-lg dark:text-white">
            <User className="h-4 w-4 text-amber-500" />
            {isBn ? 'প্রতিযোগীর বিবরণ' : 'Participant Details'}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
          {/* Participant Name */}
          <div className="col-span-1 space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isBn ? 'প্রতিযোগীর নাম' : 'Participant Full Name'} *
            </label>
            <input
              type="text"
              {...register('participantName', {
                required: isBn ? 'নাম আবশ্যক' : 'Full name is required',
              })}
              placeholder={
                isBn ? 'সম্পূর্ণ নাম লিখুন' : 'Enter participant full name'
              }
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
            />
            {errors.participantName && (
              <p className="text-[11px] font-semibold text-rose-500">
                {errors.participantName.message}
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
              {...register('dateOfBirth', {
                required: isBn
                  ? 'জন্ম তারিখ আবশ্যক'
                  : 'Date of birth is required',
              })}
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
            />
            {errors.dateOfBirth && (
              <p className="text-[11px] font-semibold text-rose-500">
                {errors.dateOfBirth.message}
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
                {...register('age')}
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
                {...register('category')}
                readOnly
                placeholder="Auto"
                className="h-10 w-full rounded-xl border border-slate-200/80 bg-slate-100/70 px-3 text-xs font-bold text-amber-700 dark:border-white/10 dark:bg-stone-900 dark:text-amber-400"
              />
            </div>
          </div>

          {/* Guardian Name */}
          <div className="col-span-1 space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {isBn ? 'অভিভাবকের নাম' : 'Guardian Name'} *
            </label>
            <input
              type="text"
              {...register('guardianName', {
                required: isBn
                  ? 'অভিভাবকের নাম আবশ্যক'
                  : 'Guardian name is required',
              })}
              placeholder={
                isBn ? 'অভিভাবকের নাম লিখুন' : 'Enter guardian name'
              }
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
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
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
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
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
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
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
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
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
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
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 px-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
            />
            {errors.pinCode && (
              <p className="text-[11px] font-semibold text-rose-500">
                {errors.pinCode.message}
              </p>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="h-11 w-full rounded-full border border-amber-400/60 text-xs font-extrabold shadow-sm sm:text-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isBn ? 'জমা হচ্ছে...' : 'Submitting Registration...'}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-950" />
                {isBn ? 'রেজিস্টার করুন' : 'Submit Registration'}
              </span>
            )}
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
                ? 'কোনো প্রবেশ মূল্য নেই (Free Entry).'
                : 'No entry fee required.'}
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

        <div className="mt-4 flex justify-end border-t border-slate-200/60 pt-2 dark:border-white/10">
          <Link
            href="/durgapuja/drawing-competition/list"
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline dark:text-amber-400"
          >
            View Registered Participants List{' '}
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
