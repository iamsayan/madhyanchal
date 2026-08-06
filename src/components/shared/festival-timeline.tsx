'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Clock,
  Eye,
  Flame,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from 'lucide-react';

const ICON_MAP = {
  sparkles: Sparkles,
  flame: Flame,
  eye: Eye,
  clock: Clock,
  heart: HeartHandshake,
  star: Star,
  utensils: Utensils,
  truck: Truck,
  lightbulb: Lightbulb,
  mappin: MapPin,
  calendar: Calendar,
};

export type IconName = keyof typeof ICON_MAP;

export interface TimelineHighlight {
  iconName: IconName;
  title: string;
  detail: string;
  time?: string;
  badge?: string;
}

export interface TimelineDay {
  day: string;
  dateLabel: string;
  subhead: string;
  badge: string;
  isFeatured?: boolean;
  isFullWidth?: boolean;
  highlights: TimelineHighlight[];
}

interface FestivalTimelineProps {
  days: TimelineDay[];
}

export function FestivalTimeline({ days }: FestivalTimelineProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeDay = days[activeIdx] || days[0];

  return (
    <div className="space-y-4">
      {/* 1. MOBILE NATIVE APP SEGMENTED CONTROL TRACK (sm:hidden) */}
      <div className="block sm:hidden">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase dark:text-amber-400">
            Select Puja Day
          </span>
        </div>

        <div className="flex w-full scrollbar-none gap-1.5 overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-stone-950/80">
          {days.map((item, idx) => {
            const isActive = activeIdx === idx;
            const isNabamiItem = item.isFeatured;
            const isBisarjanItem = item.isFullWidth;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'group relative flex min-h-[44px] flex-1 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2.5 py-1.5 text-center transition-all duration-200',
                  isNabamiItem
                    ? isActive
                      ? 'border border-amber-400 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 font-black text-slate-950'
                      : 'border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                    : isBisarjanItem
                      ? isActive
                        ? 'border border-rose-400 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 font-black text-white'
                        : 'border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                      : isActive
                        ? 'border border-slate-300 bg-white font-black text-slate-900 dark:border-white/20 dark:bg-stone-800 dark:text-white'
                        : 'border border-transparent text-slate-600 hover:bg-white/50 dark:text-slate-400 dark:hover:bg-stone-900'
                )}
              >
                {/* Icon */}
                {isNabamiItem ? (
                  <Star
                    className={cn(
                      'h-3.5 w-3.5 shrink-0',
                      isActive
                        ? 'fill-slate-950 text-slate-950'
                        : 'text-amber-500'
                    )}
                  />
                ) : isBisarjanItem ? (
                  <Flame
                    className={cn(
                      'h-3.5 w-3.5 shrink-0',
                      isActive ? 'animate-pulse text-white' : 'text-rose-500'
                    )}
                  />
                ) : (
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                )}

                <div className="flex flex-col text-left leading-none">
                  <span className="text-xs font-bold whitespace-nowrap">
                    {item.day.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-semibold whitespace-nowrap opacity-80">
                    {item.dateLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MOBILE ACTIVE CARD VIEW (sm:hidden) */}
      <div className="block sm:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={cn(
                'relative overflow-hidden rounded-2xl border p-4 backdrop-blur-2xl transition-all duration-300',
                activeDay.isFeatured
                  ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-amber-600/10 dark:border-amber-400/50 dark:bg-stone-900/95'
                  : activeDay.isFullWidth
                    ? 'border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent dark:border-rose-500/30 dark:bg-stone-900/95'
                    : 'border-slate-200/90 bg-white/95 dark:border-white/12 dark:bg-stone-900/95'
              )}
            >
              {activeDay.isFeatured && (
                <BorderBeam
                  size={200}
                  duration={6}
                  colorFrom="#f59e0b"
                  colorTo="#fef08a"
                />
              )}

              {/* Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-200/70 pb-3 dark:border-white/10">
                <div className="flex min-w-0 flex-1 items-start gap-2.5">
                  <div
                    className={cn(
                      'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-extrabold',
                      activeDay.isFeatured
                        ? 'bg-amber-500 text-slate-950'
                        : activeDay.isFullWidth
                          ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                          : 'bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                    )}
                  >
                    {activeDay.isFeatured ? (
                      <Star className="h-4.5 w-4.5 fill-slate-950" />
                    ) : activeDay.isFullWidth ? (
                      <Flame className="h-4.5 w-4.5 animate-pulse text-rose-500" />
                    ) : (
                      <Calendar className="h-4.5 w-4.5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-black tracking-wide whitespace-nowrap text-amber-600 uppercase dark:text-amber-400">
                      {activeDay.dateLabel}
                    </span>
                    <h3 className="font-paytone text-base leading-tight font-bold text-slate-900 dark:text-white">
                      {activeDay.day}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-tight font-medium text-slate-600 dark:text-slate-400">
                      {activeDay.subhead}
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights List */}
              <div className="mt-3.5 space-y-2.5">
                {activeDay.highlights.map((h, hIdx) => {
                  const Icon = ICON_MAP[h.iconName] || Sparkles;
                  return (
                    <div
                      key={hIdx}
                      className={cn(
                        'flex items-start gap-2.5 rounded-xl border p-2.5 transition-colors',
                        h.badge
                          ? 'border-amber-500/40 bg-amber-500/10 dark:border-amber-400/30 dark:bg-amber-950/40'
                          : 'border-slate-200/60 bg-slate-50/50 dark:border-white/5 dark:bg-stone-950/40'
                      )}
                    >
                      <div
                        className={cn(
                          'mt-0.5 flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg',
                          h.badge
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                            {h.title}
                          </h4>
                          {h.time && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[9.5px] font-bold text-amber-700 dark:text-amber-300">
                              <Clock className="h-3 w-3" />
                              {h.time}
                            </span>
                          )}
                          {h.badge && (
                            <span className="shrink-0 rounded-md bg-amber-500 px-1.5 py-0.5 text-[9px] font-black text-slate-950 uppercase">
                              {h.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                          {h.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. DESKTOP GRID VIEW (hidden sm:grid) */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-6">
        {days.map((item, idx) => {
          const isNabami = item.isFeatured;
          const isFullWidth = item.isFeatured || item.isFullWidth;

          return (
            <div
              key={item.day}
              className={cn('h-full', isFullWidth ? 'lg:col-span-2' : '')}
            >
              <div
                className={cn(
                  'group relative h-full overflow-hidden rounded-2xl border transition-all duration-300',
                  isNabami
                    ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-amber-600/10 p-7 backdrop-blur-2xl dark:border-amber-400/50 dark:bg-stone-900/90'
                    : item.isFullWidth
                      ? 'border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent p-7 backdrop-blur-xl dark:border-rose-500/30 dark:bg-stone-900/80'
                      : 'border-slate-200/90 bg-white/90 p-6 dark:border-white/12 dark:bg-stone-900/80'
                )}
              >
                {isNabami && (
                  <BorderBeam
                    size={220}
                    duration={6}
                    colorFrom="#f59e0b"
                    colorTo="#fef08a"
                  />
                )}

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-200/70 pb-3.5 dark:border-white/10">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div
                      className={cn(
                        'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-extrabold',
                        isNabami
                          ? 'bg-amber-500 text-slate-950'
                          : item.isFullWidth
                            ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                            : 'bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                      )}
                    >
                      {isNabami ? (
                        <Star className="h-5 w-5 fill-slate-950" />
                      ) : item.isFullWidth ? (
                        <Flame className="h-5 w-5 animate-pulse text-rose-500" />
                      ) : (
                        <Calendar className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-black tracking-wide whitespace-nowrap text-amber-600 uppercase dark:text-amber-400">
                        {item.dateLabel}
                      </span>
                      <h3
                        className={cn(
                          'font-paytone leading-tight font-bold text-slate-900 dark:text-white',
                          isFullWidth ? 'text-2xl' : 'text-lg'
                        )}
                      >
                        {item.day}
                      </h3>
                      <p className="mt-0.5 text-xs leading-tight font-medium text-slate-600 dark:text-slate-400">
                        {item.subhead}
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'mt-0.5 shrink-0 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wide uppercase',
                      isNabami
                        ? 'border border-amber-500/40 bg-amber-500/20 text-amber-900 dark:bg-amber-400/20 dark:text-amber-300'
                        : item.isFullWidth
                          ? 'border border-rose-500/40 bg-rose-500/15 text-rose-700 dark:text-rose-400'
                          : 'border border-slate-200/80 bg-slate-100/90 text-slate-700 dark:border-white/15 dark:bg-stone-800 dark:text-slate-300'
                    )}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Highlights List */}
                <div
                  className={cn(
                    'mt-4 grid gap-3',
                    isFullWidth ? 'grid-cols-2' : 'grid-cols-1'
                  )}
                >
                  {item.highlights.map((h, hIdx) => {
                    const Icon = ICON_MAP[h.iconName] || Sparkles;
                    return (
                      <div
                        key={hIdx}
                        className={cn(
                          'flex items-start gap-3 rounded-xl border p-3 transition-colors',
                          h.badge
                            ? 'border-amber-500/40 bg-amber-500/10 dark:border-amber-400/30 dark:bg-amber-950/40'
                            : 'border-slate-200/60 bg-slate-50/50 dark:border-white/5 dark:bg-stone-950/40'
                        )}
                      >
                        <div
                          className={cn(
                            'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                            h.badge
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                              {h.title}
                            </h4>
                            {h.time && (
                              <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                                <Clock className="h-3 w-3" />
                                {h.time}
                              </span>
                            )}
                            {h.badge && (
                              <span className="shrink-0 rounded-md bg-amber-500 px-2 py-0.5 text-[9.5px] font-black text-slate-950 uppercase">
                                {h.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                            {h.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
