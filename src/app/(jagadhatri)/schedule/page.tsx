import type { Metadata } from 'next';

import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { FestivalScheduleShowcase } from '@/components/shared/festival-schedule-showcase';
import type { EventDate } from '@/types';
import { getSettings } from '@/lib/data';

import { Calendar, Compass, Info, MapPin, Train } from 'lucide-react';

import {
  FestivalTimeline,
  type TimelineDay,
} from '@/components/shared/festival-timeline';
import {
  QuickCalendarShareDock,
  GrandProcessionRouteCard,
} from '@/components/shared/schedule-utilities';

import { getJagadhatriScheduleSchema } from '@/lib/seo-schemas';
import { createMetadata } from '@/src/lib/metadata';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Festival Timeline & Puja Guide',
    description:
      'Official festival timeline for Jagadhatri Puja at Madhyanchal Sarbajanin in Chandannagar—including daily worship, Pushpanjali, Nabami Bhog distribution, and world-famous night immersion procession.',
    canonical: '/schedule',
  }),
  keywords: [
    'jagadhatri puja schedule chandannagar',
    'madhyanchal puja timing',
    'nabami bhog timing chandannagar',
    'sandhya aarti timing madhyanchal',
    'pushpanjali timings madhyanchal',
    'chandannagar light procession schedule',
  ],
};

const DEFAULT_SCHEDULE_DATES: EventDate[] = [
  {
    event: 'Saptami',
    date: '2026-11-17',
    information:
      'Opening of Jagadhatri Puja, initiation of daily worship rituals, devotee darshan, and Sandhya Aarti from 9:30 PM onwards.',
  },
  {
    event: 'Ashtami',
    date: '2026-11-18',
    information:
      'Mahashtami worship, sacred Pushpanjali offerings, continuous devotee darshan, and Sandhya Aarti from 9:30 PM onwards.',
  },
  {
    event: 'Nabami',
    date: '2026-11-19',
    information:
      'Mahanabami Puja, exclusive Bhog Prasad distribution, peak visitor footfall, and Grand Sandhya Aarti from 9:30 PM onwards.',
  },
  {
    event: 'Dashami',
    date: '2026-11-20',
    information:
      'Vijayadashami final worship, farewell rituals, peace blessings, and preparations for the Bisarjan procession.',
  },
  {
    event: 'Shobhajatra',
    date: '2026-11-21',
    information:
      'World-famous Nocturnal Immersion Procession featuring 100+ illuminated 3D tableaux moving through Station Road avenues.',
  },
];

const FESTIVAL_TIMELINE_DAYS: TimelineDay[] = [
  {
    day: 'Saptami',
    dateLabel: 'Day 1',
    subhead: 'Opening & Daily Worship',
    badge: 'Puja Begins',
    highlights: [
      {
        iconName: 'sparkles',
        title: 'Opening of Jagadhatri Puja',
        detail:
          'Formal inauguration of the pandal and initiation of festival rituals.',
      },
      {
        iconName: 'flame',
        title: 'Daily Worship Begins',
        detail: 'Sacred morning rituals performed by traditional priests.',
      },
      {
        iconName: 'eye',
        title: 'Devotee Darshan',
        detail: 'Pandal doors open for visitors and neighborhood families.',
      },
      {
        iconName: 'clock',
        title: 'Sandhya Aarti',
        detail: 'Divine evening lamp lighting and chants.',
        time: '9:30 PM onwards',
      },
    ],
  },
  {
    day: 'Ashtami',
    dateLabel: 'Day 2',
    subhead: 'Sacred Worship & Anjali',
    badge: 'Sacred Anjali',
    highlights: [
      {
        iconName: 'sparkles',
        title: 'Mahashtami Puja',
        detail:
          'Solemn morning worship service dedicated to Goddess Jagadhatri.',
      },
      {
        iconName: 'heart',
        title: 'Pushpanjali Batches',
        detail: 'Devotees gather to offer flowers and recite morning prayers.',
      },
      {
        iconName: 'eye',
        title: 'Devotee Darshan',
        detail:
          'Continuous viewing throughout the day with rising visitor counts.',
      },
      {
        iconName: 'clock',
        title: 'Sandhya Aarti',
        detail: 'Evening Aarti ritual accompanied by devotional atmosphere.',
        time: '9:30 PM onwards',
      },
    ],
  },
  {
    day: 'Nabami',
    dateLabel: 'Day 3',
    subhead: 'Grand Celebration & Bhog Prasad',
    badge: 'Grand Highlight ⭐',
    isFeatured: true,
    highlights: [
      {
        iconName: 'star',
        title: 'Mahanabami Puja',
        detail: 'The primary and most sacred worship of the 4-day festival.',
      },
      {
        iconName: 'utensils',
        title: 'Bhog Prasad (Coupon System)',
        detail:
          'Organized exclusively on Nabami day. Coupons can be collected/purchased from the committee desk.',
        badge: 'COUPON AT DESK',
      },
      {
        iconName: 'eye',
        title: 'Peak Visitor Footfall',
        detail: 'The biggest and most vibrant crowd of the entire festival.',
      },
      {
        iconName: 'flame',
        title: 'Grand Sandhya Aarti',
        detail: 'Spectacular evening Aarti with grand illumination.',
        time: '9:30 PM onwards',
      },
    ],
  },
  {
    day: 'Dashami & Grand Bisarjan Procession (Shobhajatra)',
    dateLabel: 'Day 4',
    subhead: 'Dashami Farewell & Nocturnal Light Immersion',
    badge: 'Grand Shobhajatra',
    isFullWidth: true,
    highlights: [
      {
        iconName: 'sparkles',
        title: 'Vijayadashami Final Worship',
        detail:
          'Closing prayers, sacred farewell rituals, and peace blessings.',
      },
      {
        iconName: 'lightbulb',
        title: 'Illuminated 3D Light Tableaux',
        detail:
          '100+ magnificent moving light displays by Bengal’s master artisans.',
      },
      {
        iconName: 'mappin',
        title: 'Station Road Procession Avenues',
        detail:
          'World-famous nocturnal procession traversing Station Road avenues through the night.',
      },
      {
        iconName: 'flame',
        title: 'Sacred Rani Ghat Immersion',
        detail:
          'Traditional Ganga immersion ceremony concluding the grand festival celebrations.',
      },
    ],
  },
];

export default async function SchedulePage() {
  let dates: EventDate[] = DEFAULT_SCHEDULE_DATES;
  const currentYear = 2026;

  try {
    const settings = await getSettings();
    if (settings?.dates && settings.dates.length > 0) {
      dates = settings.dates;
    }
  } catch {
    dates = DEFAULT_SCHEDULE_DATES;
  }

  const targetPujaDate = dates[0]?.date || `${currentYear}-11-17`;

  const jsonLd = getJagadhatriScheduleSchema();

  return (
    <PageLayout
      title="Festival & Ritual Schedule"
      subtitle="Official visitor guide for daily worship, Pushpanjali, Nabami Bhog, and night immersion procession."
      badge={{
        text: 'Official Festival Guide',
        icon: Calendar,
      }}
      breadcrumbCurrent="Schedule"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-10 sm:space-y-16">
        {/* INTERACTIVE COMPACT SCHEDULE SHOWCASE DASHBOARD */}
        <AnimatedWrapper direction="up">
          <FestivalScheduleShowcase
            dates={dates}
            targetPujaDate={targetPujaDate}
          />
        </AnimatedWrapper>

        {/* AUTHENTIC FESTIVAL TIMELINE */}
        <div className="space-y-6 sm:space-y-10">
          <AnimatedWrapper direction="up" className="space-y-1.5 text-center">
            <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Official Visitor Timeline
            </span>
            <h2 className="font-paytone text-xl text-slate-900 sm:text-3xl dark:text-white">
              Festival Timeline
            </h2>
            <p className="mx-auto max-w-2xl text-xs text-slate-600 sm:text-sm dark:text-slate-300">
              Essential highlights for devotees planning their visit to
              Madhyanchal Sarbajanin Jagadhatri Puja Samity.
            </p>
          </AnimatedWrapper>

          <AnimatedWrapper direction="up">
            <QuickCalendarShareDock />
          </AnimatedWrapper>

          <AnimatedWrapper direction="up">
            <FestivalTimeline days={FESTIVAL_TIMELINE_DAYS} />
          </AnimatedWrapper>
        </div>

        {/* GRAND BISARJAN PROCESSION ROUTE CARD */}
        <AnimatedWrapper direction="up">
          <GrandProcessionRouteCard />
        </AnimatedWrapper>

        {/* VISITOR TRAVEL & PLANNING TIPS DOCK */}
        <AnimatedWrapper direction="up">
          <div className="card-glass relative overflow-hidden rounded-xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-8 dark:border-white/12">
            <div className="mb-4 space-y-1">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Compass className="h-5 w-5" />
                <h3 className="font-paytone text-base font-bold text-slate-900 sm:text-xl dark:text-white">
                  Visitor Travel & Planning Tips
                </h3>
              </div>
              <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                Essential guidelines for devotees and visitors attending
                Madhyanchal Jagadhatri Puja.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
              <div className="rounded-xl border border-slate-200/80 bg-white/70 p-3.5 backdrop-blur-md sm:p-5 dark:border-white/10 dark:bg-stone-900/70">
                <div className="mb-2 flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
                  <Train className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">By Train</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 sm:text-xs dark:text-slate-300">
                  Board Howrah-Bandel local train to Chandannagar Railway
                  Station. Our pandal on Station Road is just a 5-minute walk
                  (800 meters) from the station.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white/70 p-3.5 backdrop-blur-md sm:p-5 dark:border-white/10 dark:bg-stone-900/70">
                <div className="mb-2 flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Best Viewing Spots</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 sm:text-xs dark:text-slate-300">
                  Station Road offers optimal viewing for illuminated gates and
                  the night immersion shobhajatra tableaux. Arrive before 7 PM
                  on Ashtami & Nabami to avoid heavy crowds.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white/70 p-3.5 backdrop-blur-md sm:p-5 dark:border-white/10 dark:bg-stone-900/70">
                <div className="mb-2 flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
                  <Info className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Prasad & Anjali</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 sm:text-xs dark:text-slate-300">
                  Morning Pushpanjali takes place on Ashtami and Nabami. Please
                  note that Bhog Prasad distribution is organized exclusively on
                  Nabami day via coupons from the committee desk.
                </p>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </PageLayout>
  );
}
