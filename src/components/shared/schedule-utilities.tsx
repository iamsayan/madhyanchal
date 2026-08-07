'use client';

import { useState } from 'react';
import {
  CalendarPlus,
  Check,
  ChevronRight,
  ExternalLink,
  Flame,
  Lightbulb,
  MapPin,
  Share2,
  Sparkles,
  Waves,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function QuickCalendarShareDock() {
  const [copied, setCopied] = useState(false);

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Madhyanchal Jagadhatri Puja & Nabami Reminders'
  )}&dates=20261119T060000Z/20261119T180000Z&details=${encodeURIComponent(
    'Mahanabami Puja, Sandhya Aarti & Bhog Prasad at Madhyanchal Sarbajanin Jagadhatri Puja Samity, Chandannagar. Note: Bhog Prasad distribution requires coupons from committee desk.'
  )}&location=${encodeURIComponent(
    'Madhyanchal Sarbajanin Jagadhatri Puja Pandal, Station Road, Chandannagar, West Bengal'
  )}`;

  const handleShare = async () => {
    const shareData = {
      title: 'Madhyanchal Jagadhatri Puja Schedule',
      text: 'Check out the official Jagadhatri Puja schedule & Nabami details for Madhyanchal Sarbajanin, Chandannagar!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        openWhatsApp();
      }
    } else {
      openWhatsApp();
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Check out the official Jagadhatri Puja schedule & Nabami details for Madhyanchal Sarbajanin, Chandannagar:\n' +
        window.location.href
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-rose-500/10 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:p-4 dark:border-amber-400/20 dark:bg-stone-900/90">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 font-black text-slate-950">
          <CalendarPlus className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-slate-900 sm:text-sm dark:text-slate-100">
            Save Jagadhatri Puja Reminders
          </h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Add Nabami Puja & Sandhya Aarti reminders to your phone calendar.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="h-9 flex-1 rounded-xl border-amber-500/40 bg-white/80 px-3 text-xs font-bold text-slate-800 hover:bg-amber-500/10 sm:flex-initial dark:border-amber-400/30 dark:bg-stone-800 dark:text-slate-100"
        >
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-1.5"
          >
            <CalendarPlus className="h-3.5 w-3.5 text-amber-500" />
            <span>Add to Calendar</span>
          </a>
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={handleShare}
          className="h-9 flex-1 gap-1.5 rounded-xl px-3.5 text-xs font-bold text-slate-950 shadow-none sm:flex-initial"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Link Shared!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Schedule</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function GrandProcessionRouteCard() {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=Madhyanchal+Jagadhatri+Puja+Pandal+Chandannagar&destination=Rani+Ghat+Chandannagar&travelmode=walking`;

  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-500/40 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 p-3 backdrop-blur-xl sm:rounded-2xl sm:p-7 dark:border-indigo-500/30 dark:bg-stone-900/90">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-2.5 sm:gap-3 sm:pb-4 dark:border-white/10">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 font-extrabold text-indigo-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-indigo-400">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <span className="block text-[9px] font-extrabold tracking-widest text-indigo-600 uppercase sm:text-[10px] dark:text-indigo-400">
              Official Shobhajatra Route
            </span>
            <h3 className="font-paytone text-sm font-bold text-slate-900 sm:text-xl dark:text-white">
              Grand Procession Route
            </h3>
          </div>
        </div>
      </div>

      {/* Modern Connected Route Path Track with Mobile Horizontal Scroll */}
      <div className="mt-2.5 space-y-2.5 sm:mt-4 sm:space-y-3.5">
        <div className="flex w-full snap-x snap-mandatory scrollbar-none items-center gap-2.5 overflow-x-auto rounded-xl border border-slate-200/80 bg-white/90 p-2.5 backdrop-blur-md sm:flex-wrap sm:justify-between sm:overflow-visible sm:rounded-2xl sm:p-5 dark:border-white/10 dark:bg-stone-950/70">
          {/* Stage 1 */}
          <div className="flex min-w-[155px] shrink-0 snap-center items-center gap-2 sm:min-w-0">
            <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-600 sm:h-7 sm:w-7 dark:text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-[8.5px] font-black tracking-wider whitespace-nowrap text-indigo-600 uppercase sm:text-[9px] dark:text-indigo-400">
                01 • Start
              </span>
              <span className="text-[11px] font-extrabold whitespace-nowrap text-slate-900 sm:text-xs dark:text-slate-100">
                Madhyanchal Barowari
              </span>
            </div>
          </div>

          <span className="shrink-0 text-xs font-black text-slate-400 dark:text-stone-600">
            ➔
          </span>

          {/* Stage 2 */}
          <div className="flex min-w-[155px] shrink-0 snap-center items-center gap-2 sm:min-w-0">
            <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-600 sm:h-7 sm:w-7 dark:text-purple-400">
              <MapPin className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-[8.5px] font-black tracking-wider whitespace-nowrap text-purple-600 uppercase sm:text-[9px] dark:text-purple-400">
                02 • Sequence Entry
              </span>
              <span className="text-[11px] font-extrabold whitespace-nowrap text-slate-900 sm:text-xs dark:text-slate-100">
                Bagbazar More
              </span>
            </div>
          </div>

          <span className="shrink-0 text-xs font-black text-slate-400 dark:text-stone-600">
            ➔
          </span>

          {/* Stage 3 */}
          <div className="flex min-w-[155px] shrink-0 snap-center items-center gap-2 sm:min-w-0">
            <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 sm:h-7 sm:w-7 dark:text-amber-400">
              <Lightbulb className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-[8.5px] font-black tracking-wider whitespace-nowrap text-amber-600 uppercase sm:text-[9px] dark:text-amber-400">
                03 • 3D Light Tableaux
              </span>
              <span className="text-[11px] font-extrabold whitespace-nowrap text-slate-900 sm:text-xs dark:text-slate-100">
                GT Road (Jyotir More)
              </span>
            </div>
          </div>

          <span className="shrink-0 text-xs font-black text-slate-400 dark:text-stone-600">
            ➔
          </span>

          {/* Stage 4 */}
          <div className="flex min-w-[155px] shrink-0 snap-center items-center gap-2 sm:min-w-0">
            <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-rose-600 sm:h-7 sm:w-7 dark:text-rose-400">
              <Flame className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-[8.5px] font-black tracking-wider whitespace-nowrap text-rose-600 uppercase sm:text-[9px] dark:text-rose-400">
                04 • Riverfront Circuit
              </span>
              <span className="text-[11px] font-extrabold whitespace-nowrap text-slate-900 sm:text-xs dark:text-slate-100">
                Strand & Taldanga
              </span>
            </div>
          </div>

          <span className="shrink-0 text-xs font-black text-slate-400 dark:text-stone-600">
            ➔
          </span>

          {/* Stage 5 */}
          <div className="flex min-w-[155px] shrink-0 snap-center items-center gap-2 sm:min-w-0">
            <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-600 sm:h-7 sm:w-7 dark:text-blue-400">
              <Waves className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-[8.5px] font-black tracking-wider whitespace-nowrap text-blue-600 uppercase sm:text-[9px] dark:text-blue-400">
                05 • Ganga Immersion
              </span>
              <span className="text-[11px] font-extrabold whitespace-nowrap text-slate-900 sm:text-xs dark:text-slate-100">
                Rani Ghat
              </span>
            </div>
          </div>
        </div>

        <p className="rounded-lg border border-slate-200/60 bg-white/60 p-2.5 text-[11px] leading-relaxed text-slate-600 backdrop-blur-sm sm:rounded-xl sm:p-3 sm:text-xs dark:border-white/5 dark:bg-stone-950/40 dark:text-slate-300">
          <strong className="font-extrabold text-slate-900 dark:text-slate-100">
            Official Immersion Circuit:
          </strong>{' '}
          Starts from Madhyanchal Barowari, meets at Bagbazar More junction to
          enter the official procession sequence, marches along GT Road up to
          Jyotir More showcasing 100+ illuminated 3D light tableaux, traverses
          Strand Road, Rathtala More, and Taldanga along the riverfront, and
          returns via Bagbazar More for Ganga immersion at Rani Ghat.
        </p>
      </div>
    </div>
  );
}
