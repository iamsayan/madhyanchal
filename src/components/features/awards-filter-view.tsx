'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';


import { BorderBeam } from '@/components/ui/border-beam';
import type { Award, Awards } from '@/data/awards';
import { cn } from '@/lib/utils';

import {
  Award as AwardIcon,
  Building2,
  Calendar,
  Filter,
  Medal,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface AwardsFilterViewProps {
  awards: Awards;
}

export function AwardsFilterView({ awards }: AwardsFilterViewProps) {
  // Convert object structure into a flat array
  const flatAwards = useMemo(() => {
    return Object.entries(awards).flatMap(([yearStr, awardList]) => {
      const year = Number(yearStr);
      return (awardList as Award[]).map((award: Award) => ({
        ...award,
        year,
      }));
    });
  }, [awards]);

  // Extract sorted unique years
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(flatAwards.map((a) => a.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, [flatAwards]);

  const [selectedYear, setSelectedYear] = useState<number>(
    () => years[0] || 2024
  );

  // Filtered awards based on selected year
  const filteredAwards = useMemo(() => {
    return flatAwards.filter((award) => award.year === selectedYear);
  }, [flatAwards, selectedYear]);

  // Hall of fame summary stats
  const stats = useMemo(() => {
    const total = flatAwards.length;
    const firstPrizes = flatAwards.filter((a) => {
      const p = (a.position || '').toLowerCase();
      return (
        p.includes('1st') ||
        p.includes('first') ||
        p.includes('sarbik srestho') ||
        p.includes('srestho')
      );
    }).length;
    const lightAwards = flatAwards.filter((a) => {
      const c = (a.category || '').toLowerCase();
      const e = (a.event || '').toLowerCase();
      return (
        c.includes('light') ||
        c.includes('alok') ||
        c.includes('lighting') ||
        e.includes('light')
      );
    }).length;

    return {
      total,
      firstPrizes,
      lightAwards,
      editions: years.length,
    };
  }, [flatAwards, years]);

  // Award rank helper styling
  const getBadgeStyle = (position: string) => {
    const p = position.toLowerCase();
    if (
      p.includes('1st') ||
      p.includes('first') ||
      p.includes('sarbik srestho')
    ) {
      return {
        badgeBg:
          'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300',
        iconColor: 'text-amber-500',
        icon: Trophy,
      };
    }
    if (p.includes('2nd') || p.includes('second')) {
      return {
        badgeBg:
          'bg-slate-500/15 border-slate-500/30 text-slate-700 dark:text-slate-300',
        iconColor: 'text-slate-400',
        icon: Medal,
      };
    }
    return {
      badgeBg:
        'bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-300',
      iconColor: 'text-orange-500',
      icon: AwardIcon,
    };
  };

  return (
    <div className="space-y-6">
      {/* 1. HALL OF FAME MILESTONE DASHBOARD (Single Horizontal Scroll Row on Mobile) */}
      <div className="no-scrollbar flex w-full items-center justify-start gap-2.5 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible">
        {/* Total Accolades */}
        <div className="relative min-w-[140px] shrink-0 snap-center overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-2.5 backdrop-blur-xl sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-amber-500/20 dark:bg-stone-900/80">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 font-extrabold text-amber-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-amber-400">
              <Trophy className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8.5px] font-black tracking-wider text-amber-600 uppercase sm:text-[9.5px] dark:text-amber-400 truncate">
                Total Accolades
              </span>
              <span className="font-paytone text-sm font-bold text-slate-900 sm:text-2xl dark:text-white">
                {stats.total}+
              </span>
            </div>
          </div>
        </div>

        {/* 1st Rank Honors */}
        <div className="relative min-w-[140px] shrink-0 snap-center overflow-hidden rounded-xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent p-2.5 backdrop-blur-xl sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-rose-500/20 dark:bg-stone-900/80">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 font-extrabold text-rose-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-rose-400">
              <AwardIcon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8.5px] font-black tracking-wider text-rose-600 uppercase sm:text-[9.5px] dark:text-rose-400 truncate">
                1st Rank Honors
              </span>
              <span className="font-paytone text-sm font-bold text-slate-900 sm:text-2xl dark:text-white">
                {stats.firstPrizes}
              </span>
            </div>
          </div>
        </div>

        {/* Light Art Honors */}
        <div className="relative min-w-[140px] shrink-0 snap-center overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-2.5 backdrop-blur-xl sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-amber-500/20 dark:bg-stone-900/80">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 font-extrabold text-amber-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-amber-400">
              <Sparkles className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8.5px] font-black tracking-wider text-amber-600 uppercase sm:text-[9.5px] dark:text-amber-400 truncate">
                Light Art Honors
              </span>
              <span className="font-paytone text-sm font-bold text-slate-900 sm:text-2xl dark:text-white">
                {stats.lightAwards}
              </span>
            </div>
          </div>
        </div>

        {/* Awarded Editions */}
        <div className="relative min-w-[140px] shrink-0 snap-center overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent p-2.5 backdrop-blur-xl sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-blue-500/20 dark:bg-stone-900/80">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 font-extrabold text-blue-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-blue-400">
              <Building2 className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8.5px] font-black tracking-wider text-blue-600 uppercase sm:text-[9.5px] dark:text-blue-400 truncate">
                Awarded Years
              </span>
              <span className="font-paytone text-sm font-bold text-slate-900 sm:text-2xl dark:text-white">
                {stats.editions} Years
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* YEAR FILTER BAR */}
      <div className="card-glass relative overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <BorderBeam
          size={160}
          duration={8}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="flex flex-col items-start justify-between gap-3 xl:flex-row xl:items-center">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-amber-400">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h3 className="font-paytone text-sm font-bold text-slate-900 sm:text-xl dark:text-white">
                Honors & Recognition
              </h3>
              <p className="text-[10.5px] text-slate-600 sm:text-xs dark:text-slate-300">
                Celebrating excellence in Pandal Art, Lighting, Security & Public Choice
              </p>
            </div>
          </div>

          {/* Year Filter Buttons */}
          <div className="flex w-full items-center justify-start gap-1.5 overflow-x-auto scrollbar-none snap-x snap-mandatory xl:w-auto xl:overflow-visible">
            <span className="shrink-0 text-[11px] font-black text-slate-500 sm:text-xs dark:text-slate-400 mr-1">
              Filter:
            </span>
            {years.map((year) => {
              const isActive = selectedYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    'inline-flex shrink-0 snap-center items-center justify-center rounded-full px-3 py-1 text-[11px] font-extrabold transition-all duration-200 cursor-pointer shadow-none sm:px-3.5 sm:py-1.5 sm:text-xs',
                    isActive
                      ? 'bg-amber-500 text-slate-950 border border-amber-400/80 font-black'
                      : 'border border-slate-200/80 bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 dark:border-white/10 dark:bg-stone-800/80 dark:text-slate-300 dark:hover:bg-stone-700'
                  )}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Year Label */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-extrabold tracking-wider text-slate-500 uppercase dark:text-slate-400">
          Showing {selectedYear} Honors
        </span>
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
          {filteredAwards.length} Accolades
        </span>
      </div>

      {/* COMPACT 2-COLUMN MOBILE AWARDS GRID */}
      <motion.div
        key={selectedYear}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAwards.map((item, index) => {
            const badgeStyle = getBadgeStyle(item.position);
            const RankIcon = badgeStyle.icon;

            return (
              <div
                key={`${item.event}-${item.category}-${index}`}
                className="card-glass card-hover-glow group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-5 dark:border-white/12"
              >
                <BorderBeam
                  size={120}
                  duration={6}
                  colorFrom="#f59e0b"
                  colorTo="#fef08a"
                />

                <div className="space-y-2 sm:space-y-3">
                  {/* Header: Position Rank Badge & Year Pill */}
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 truncate rounded-md border px-1.5 py-0.5 text-[8.5px] font-black tracking-wider uppercase sm:text-[10px]',
                        badgeStyle.badgeBg
                      )}
                    >
                      <RankIcon
                        className={cn('h-3 w-3 shrink-0', badgeStyle.iconColor)}
                      />
                      <span className="truncate">{item.position}</span>
                    </span>

                    <span className="inline-flex shrink-0 items-center gap-0.5 text-[9px] font-extrabold text-slate-500 sm:text-[10px] dark:text-slate-400">
                      <Calendar className="h-2.5 w-2.5 text-amber-500" />{' '}
                      {item.year}
                    </span>
                  </div>

                  {/* Event Name Title */}
                  <h3 className="font-paytone line-clamp-2 text-xs leading-snug text-slate-900 sm:text-base dark:text-white">
                    {item.event}
                  </h3>

                  {/* Category Tag Pill */}
                  <div className="inline-flex items-center gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[9.5px] font-bold text-amber-700 sm:text-xs dark:text-amber-300">
                    <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                    <span className="truncate">{item.category}</span>
                  </div>
                </div>

                {/* Presented By Footer */}
                <div className="mt-3 border-t border-dashed border-slate-200/80 pt-2 text-[9.5px] text-slate-600 sm:text-xs dark:border-white/10 dark:text-slate-300">
                  <span className="mb-0.5 block text-[8px] font-black tracking-wider text-slate-400 uppercase sm:text-[9.5px]">
                    Presented By
                  </span>
                  <span className="line-clamp-2 flex items-start gap-1 font-semibold text-slate-800 dark:text-slate-200">
                    <Building2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                    {item.presentedBy}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
