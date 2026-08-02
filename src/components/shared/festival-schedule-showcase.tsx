'use client';

import { useState } from 'react';
import { motion } from 'motion/react';


import Image from 'next/image';

import { CountdownTimer } from '@/components/shared/countdown-timer';
import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import type { EventDate } from '@/types';

import { Calendar as CalendarIcon, Flame } from 'lucide-react';

interface FestivalScheduleShowcaseProps {
  dates: EventDate[];
  targetPujaDate: string;
}

export function FestivalScheduleShowcase({
  dates,
  targetPujaDate,
}: FestivalScheduleShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeEvent = dates[activeIdx] || dates[0];

  const checkIsProcession = (eventTitle: string) => {
    const lower = (eventTitle || '').toLowerCase();
    return (
      lower.includes('procession') ||
      lower.includes('shobhajatra') ||
      lower.includes('immersion') ||
      lower.includes('bisarjan') ||
      lower.includes('visarjan')
    );
  };

  const formatCompactDate = (dateStr: string | undefined): string => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return dateStr || '';
    }
  };

  return (
    <div className="relative mx-auto max-w-6xl space-y-3">
      {/* FLAT NATIVE APP DASHBOARD CONTAINER (Zero Shadows on Mobile) */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-none backdrop-blur-2xl sm:rounded-3xl sm:p-6 sm:shadow-lg dark:border-white/12 dark:bg-stone-900/95">
        <BorderBeam
          size={180}
          duration={8}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        {/* 1. HEADER & COUNTDOWN TIMER BAR */}
        <div className="flex flex-col items-center justify-between gap-2.5 border-b border-slate-200/70 pb-3 text-center sm:flex-row sm:pb-4 sm:text-left dark:border-white/10">
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-700 sm:text-xs dark:text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              LIVE FESTIVAL COUNTDOWN
            </span>
            <h3 className="font-paytone hidden text-base font-bold text-slate-900 sm:block sm:text-xl dark:text-slate-100">
              Counting Down to Jagadhatri Puja 2026
            </h3>
          </div>

          <CountdownTimer targetDate={targetPujaDate} />
        </div>

        {/* 2. NATIVE APP SEGMENTED CONTROL DAY TRACK */}
        <div className="pt-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase sm:text-xs dark:text-slate-400">
              Puja Day
            </span>
            <span className="text-[10px] font-extrabold text-amber-600 sm:text-xs dark:text-amber-400">
              {dates.length} Days Showcase
            </span>
          </div>

          <div className="flex w-full scrollbar-none flex-nowrap gap-1.5 overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-100/70 p-1.5 shadow-none dark:border-white/10 dark:bg-stone-950/80">
            {dates.map((item, idx) => {
              const isActive = activeIdx === idx;
              const isProcessionItem = checkIsProcession(item.event);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={cn(
                    'group relative flex min-h-[42px] min-w-[120px] flex-1 shrink-0 cursor-pointer items-center gap-2 rounded-xl px-2.5 py-1.5 text-left transition-all duration-200 sm:min-h-[46px]',
                    isProcessionItem
                      ? isActive
                        ? 'min-w-[130px] border border-rose-400 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 font-black text-white shadow-sm'
                        : 'min-w-[130px] border border-rose-500/30 bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 dark:border-rose-500/30 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/50'
                      : isActive
                        ? 'border border-amber-400 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 font-black text-slate-950 shadow-sm'
                        : 'border border-slate-200/80 bg-white/90 text-slate-700 hover:border-amber-500/40 hover:bg-amber-500/10 dark:border-white/10 dark:bg-stone-900/90 dark:text-slate-200 dark:hover:border-amber-500/40 dark:hover:bg-stone-800'
                  )}
                >
                  {/* High-Contrast Icon Badge */}
                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105 sm:h-8 sm:w-8',
                      isProcessionItem
                        ? isActive
                          ? 'bg-white text-rose-600 shadow-xs'
                          : 'bg-rose-500/15 text-rose-600 dark:bg-rose-500/25 dark:text-rose-400'
                        : isActive
                          ? 'bg-slate-950 text-amber-400 shadow-xs'
                          : 'bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                    )}
                  >
                    {isProcessionItem ? (
                      <Flame className="h-4 w-4 animate-pulse" />
                    ) : (
                      <Image
                        src={`/dates/${idx}.png`}
                        alt={item.event}
                        width={22}
                        height={22}
                        className="h-4.5 w-4.5 object-contain"
                      />
                    )}
                  </div>

                  {/* High-Contrast Text Labels */}
                  <div className="flex min-w-0 flex-1 flex-col leading-none">
                    <span
                      className={cn(
                        'text-xs whitespace-nowrap',
                        isActive
                          ? isProcessionItem
                            ? 'font-black text-white'
                            : 'font-black text-slate-950'
                          : 'font-bold text-slate-800 dark:text-slate-100'
                      )}
                    >
                      {item.event}
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 text-[10px]',
                        isActive
                          ? isProcessionItem
                            ? 'font-bold text-white/90'
                            : 'font-extrabold text-slate-900'
                          : 'font-semibold text-slate-500 dark:text-slate-400'
                      )}
                    >
                      {formatCompactDate(item.date)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. FLAT NATIVE APP ACTIVE DAY HIGHLIGHT CARD */}
        {activeEvent && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-3.5 shadow-none backdrop-blur-md transition-all duration-300 sm:p-5 dark:border-white/12 dark:bg-stone-950/60">
              {/* Header Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-1 text-[11px] font-extrabold text-amber-900 sm:text-xs dark:text-amber-300">
                    <CalendarIcon className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                    {formatDate(activeEvent.date)}
                  </span>
                  <h4 className="font-paytone text-sm font-bold text-slate-900 sm:text-lg dark:text-white">
                    {activeEvent.event}
                  </h4>
                </div>

                {checkIsProcession(activeEvent.event) && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-black text-rose-700 dark:text-rose-400">
                    <Flame className="h-3 w-3 animate-pulse text-rose-500" />
                    Immersion Night
                  </span>
                )}
              </div>

              {/* Event Description */}
              <p className="text-xs leading-relaxed font-normal text-slate-700 sm:text-sm dark:text-slate-300">
                {checkIsProcession(activeEvent.event)
                  ? 'Chandannagar’s world-renowned nocturnal immersion procession featuring 100+ illuminated moving tableaux created by Bengal’s master light artisans.'
                  : activeEvent.information}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
