'use client';

import { Fragment, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  if (!isMounted) {
    return (
      <div className="flex justify-center gap-3 py-4">
        {['DAYS', 'HOURS', 'MINS', 'SECS'].map((label, idx) => (
          <div key={idx} className="h-16 w-20 rounded-2xl border border-slate-200/80 bg-slate-100/50 animate-pulse dark:border-white/10 dark:bg-slate-900/50" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center gap-1 sm:gap-2 md:gap-3 py-1 sm:py-2 shrink-0', className)}>
      {units.map((unit, idx) => (
        <Fragment key={unit.label}>
          <div className="group relative flex flex-col items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/5 p-1.5 backdrop-blur-xl transition-transform duration-300 shadow-none sm:rounded-2xl sm:p-2.5 md:p-3 dark:border-white/15 dark:bg-stone-900/90 min-w-[44px] sm:min-w-[60px] md:min-w-[72px] lg:min-w-[80px]">
            <div className="relative z-10 flex flex-col items-center">
              <span className="font-paytone text-sm sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-amber-400 tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="mt-0.5 text-[7px] font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase sm:text-[9px]">
                {unit.label}
              </span>
            </div>
          </div>
          {idx < units.length - 1 && (
            <span className="font-paytone text-xs font-bold text-amber-500 animate-pulse dark:text-amber-400 sm:text-lg pb-2 sm:pb-3">
              :
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
