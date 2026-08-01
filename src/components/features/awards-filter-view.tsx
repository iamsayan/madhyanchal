'use client';

import { useMemo, useState, ViewTransition } from 'react';


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
      {/* YEAR FILTER BAR */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <BorderBeam
          size={160}
          duration={8}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-paytone text-base font-bold text-slate-900 sm:text-xl dark:text-white">
                Honors & Recognition ({filteredAwards.length} Awards in{' '}
                {selectedYear})
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Celebrating excellence in Pandal Art, Lighting, Security & Public Choice
              </p>
            </div>
          </div>
        </div>

        {/* Year Filter Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200/80 dark:border-white/10">
          <span className="mr-1 inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <Filter className="h-3 w-3" /> Select Edition Year:
          </span>
          {years.map((year) => {
            const isActive = selectedYear === year;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={cn(
                  'rounded-xl px-3 py-1 text-xs font-bold transition-all duration-200 min-h-[36px] cursor-pointer',
                  isActive
                    ? 'border border-amber-400 bg-amber-500 font-black text-slate-950 shadow-xs'
                    : 'border border-slate-200/80 bg-white/80 text-slate-700 hover:border-amber-500/30 hover:bg-amber-500/10 dark:border-white/10 dark:bg-stone-900 dark:text-slate-300 dark:hover:bg-stone-800'
                )}
              >
                {year} Edition
              </button>
            );
          })}
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

      {/* COMPACT 2-COLUMN MOBILE AWARDS GRID WITH VIEW TRANSITION */}
      <ViewTransition
        key={selectedYear}
        name="awards-grid"
        share="auto"
        enter="auto"
        default="none"
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
      </ViewTransition>
    </div>
  );
}
