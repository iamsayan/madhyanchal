'use client';

import { useState } from 'react';

import { BorderBeam } from '@/components/ui/border-beam';
import { NativeModal } from '@/components/ui/native-modal';
import { DrawingCompetitionForm } from '@/components/features/drawing-competition-form';
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
  ExternalLink,
  Gift,
  MapPin,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';

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

  const scrollToForm = () => {
    const el = document.getElementById('drawing-form-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl space-y-4 sm:space-y-6">
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
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-xs transition-all hover:bg-amber-400"
          >
            <Users className="h-3.5 w-3.5" />
            <span>View Registered List</span>
          </button>
        </div>
      )}

      {/* TOP ACTION & TOPIC BANNER SECTION */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-3 text-center backdrop-blur-2xl sm:rounded-3xl sm:p-8 dark:border-white/12">
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
          <div className="w-full max-w-xl rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-center sm:px-4 sm:py-2.5">
            <span className="block text-[9.5px] leading-none font-extrabold tracking-widest text-amber-700 uppercase sm:text-[11px] dark:text-amber-400">
              Drawing Theme
            </span>
            <h3 className="font-paytone mt-0.5 text-sm leading-tight font-bold text-slate-900 sm:text-xl dark:text-white">
              {config.topic}
            </h3>
            <p className="mt-0.5 text-[10px] leading-tight font-medium text-slate-600 sm:text-xs dark:text-slate-300">
              Open creative freedom for all age categories (Group A, B & C)
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col items-center justify-center gap-2 pt-0.5 sm:flex-row sm:gap-4">
            {!isClosed ? (
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 px-5 py-2 text-xs font-black tracking-wide text-slate-950 shadow-md transition-all hover:scale-105 active:scale-95 sm:gap-2 sm:px-8 sm:py-3.5 sm:text-sm"
              >
                <span>Register Now</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            ) : (
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-2 text-xs font-bold text-amber-700 sm:px-6 sm:py-3 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                <span>
                  Registrations Closed for {config.year} (See You in{' '}
                  {config.year + 1}!)
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsListModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-[11.5px] font-bold text-slate-800 shadow-xs transition-all hover:bg-slate-100 sm:gap-2 sm:px-6 sm:py-3.5 sm:text-sm dark:border-white/15 dark:bg-stone-900/80 dark:text-slate-200 dark:hover:bg-stone-800"
            >
              <Users className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
              <span>Registered Participants List</span>
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

      {/* REGISTRATION FORM SECTION */}
      <DrawingCompetitionForm
        onOpenListModal={() => setIsListModalOpen(true)}
      />

      {/* NATIVE MODAL FOR REGISTERED PARTICIPANTS LIST */}
      <NativeModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        variant="info"
        title="Registered Participants"
        description={`Official directory of confirmed registrations for the ${config.year} Drawing Competition.`}
        badgeIcon={<Users className="h-7 w-7 text-amber-500 sm:h-9 sm:w-9" />}
        maxWidthClass="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl"
        primaryButton={{
          label: 'Close List',
          onClick: () => setIsListModalOpen(false),
        }}
      >
        <DrawingCompetitionList initialData={initialParticipants} />
      </NativeModal>
    </div>
  );
}
