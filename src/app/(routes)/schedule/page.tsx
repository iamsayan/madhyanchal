import type { Metadata } from 'next';
import Link from 'next/link';

import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { FestivalScheduleShowcase } from '@/components/shared/festival-schedule-showcase';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import type { EventDate } from '@/types';
import { getSettings } from '@/lib/data';

import {
  Calendar,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  HeartHandshake,
  Image as ImageIcon,
  Info,
  Lightbulb,
  MapPin,
  Sparkles,
  Train,
} from 'lucide-react';

import { getJagadhatriScheduleSchema } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Puja Schedule & Event Timings | Madhyanchal Sarbajanin',
  description:
    'Complete 5-day Jagadhatri Puja schedule of Madhyanchal Sarbajanin in Chandannagar—including Kalparambha, Pushpanjali, Sandhi Puja, Bhog distribution, and world-famous night immersion procession.',
  keywords: [
    'jagadhatri puja schedule chandannagar',
    'madhyanchal puja timing',
    'chandannagar immersion procession time',
    'sandhi puja timing chandannagar',
    'pushpanjali timings madhyanchal',
    'chandannagar light procession schedule',
  ],
  openGraph: {
    title: 'Puja Schedule & Event Timings | Madhyanchal Sarbajanin',
    description:
      'Explore the official 5-day Jagadhatri Puja itinerary, pushpanjali timings, cultural events, and grand shobhajatra procession.',
    url: '/schedule',
    type: 'website',
  },
  alternates: {
    canonical: '/schedule',
  },
};

const DEFAULT_SCHEDULE_DATES: EventDate[] = [
  {
    event: 'Sasthi',
    date: '2026-11-16',
    information:
      'Invocation of Goddess Jagadhatri with Kalparambha, Bodhon, Adhibas, and evening Aarti accompanied by solemn Dhak beats.',
  },
  {
    event: 'Saptami',
    date: '2026-11-17',
    information:
      'Nabapatrika Pravesh & Holy Bath at Ganga ghats, Saptami Puja, Morning Pushpanjali, and evening cultural inaugurations.',
  },
  {
    event: 'Ashtami',
    date: '2026-11-18',
    information:
      'Mahashtami Puja, sacred Kumari Puja, 108-lamp Sandhi Puja ritual, and evening classical musical performances.',
  },
  {
    event: 'Nabami',
    date: '2026-11-19',
    information:
      'Mahanabami Puja, sacred Maha Yajna & Homa, grand Prasad distribution to over 10,000+ devotees, and LED light showcases.',
  },
  {
    event: 'Dashami',
    date: '2026-11-20',
    information:
      'Darpan Visarjan, traditional Sindoor Khela, Dhunuchi Naach, Shanti Jal blessing, and final immersion preparations.',
  },
  {
    event: 'Shobhajatra',
    date: '2026-11-21',
    information:
      'World-famous Nocturnal Immersion Procession featuring 100+ illuminated 3D tableaux moving through Station Road avenues.',
  },
];

const DETAILED_DAILY_TIMINGS = [
  {
    day: 'Sasthi (Mahasasthi)',
    subtitle: 'Kalparambha & Divine Awakening',
    icon: Sparkles,
    badge: 'Day 1',
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30',
    iconColor: 'text-amber-500',
    events: [
      { time: '07:00 AM', text: 'Kalparambha & Sacred Water Consecration' },
      { time: '06:30 PM', text: 'Bodhon & Adhibas Rituals' },
      {
        time: '07:30 PM',
        text: 'Grand Evening Aarti & Royal Dhak Performance',
      },
      { time: '09:00 PM', text: 'Illuminated Pandal Opening & Public Viewing' },
    ],
  },
  {
    day: 'Saptami (Mahasaptami)',
    subtitle: 'Nabapatrika Pravesh & Worship',
    icon: Calendar,
    badge: 'Day 2',
    color: 'from-orange-500/20 to-amber-500/10 border-orange-500/30',
    iconColor: 'text-orange-500',
    events: [
      {
        time: '06:00 AM',
        text: 'Nabapatrika Holy Bath (Kolabou Snan) at Ghat',
      },
      {
        time: '08:30 AM',
        text: 'Mahasaptami Puja & Devotee Pushpanjali Batch 1',
      },
      { time: '01:00 PM', text: 'Bhog Prasad Distribution Begins' },
      { time: '07:00 PM', text: 'Cultural Night Showcase & Vocal Concert' },
    ],
  },
  {
    day: 'Ashtami (Mahashtami)',
    subtitle: 'Kumari Puja & Sandhi Puja',
    icon: Flame,
    badge: 'Day 3',
    color: 'from-rose-500/20 to-amber-500/10 border-rose-500/30',
    iconColor: 'text-rose-500',
    events: [
      { time: '08:00 AM', text: 'Mahashtami Morning Worship & Anjali' },
      { time: '11:30 AM', text: 'Sacred Kumari Puja Ceremony' },
      {
        time: '06:15 PM',
        text: 'Sandhi Puja (Lighting of 108 Sacred Diya Lamps)',
      },
      { time: '08:30 PM', text: 'Gala Musical Performance & Devotional Songs' },
    ],
  },
  {
    day: 'Nabami (Mahanabami)',
    subtitle: 'Maha Yajna & Community Feast',
    icon: HeartHandshake,
    badge: 'Day 4',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    iconColor: 'text-emerald-500',
    events: [
      { time: '08:30 AM', text: 'Mahanabami Puja & Chandi Path' },
      { time: '11:00 AM', text: 'Maha Yajna & Sacred Fire Homa Ritual' },
      { time: '01:30 PM', text: 'Grand Community Feast (Mahaprasad)' },
      { time: '07:30 PM', text: 'Chandannagar Master Light Tapestry Display' },
    ],
  },
  {
    day: 'Dashami (Vijayadashami)',
    subtitle: 'Sindoor Khela & Farewell Rituals',
    icon: Clock,
    badge: 'Day 5',
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30',
    iconColor: 'text-purple-500',
    events: [
      {
        time: '09:00 AM',
        text: 'Vijayadashami Puja & Ritualistic Darpan Visarjan',
      },
      { time: '11:00 AM', text: 'Traditional Sindoor Khela & Dhunuchi Dance' },
      { time: '04:00 PM', text: 'Shanti Jal Consecration & Farewell Chants' },
      { time: '08:00 PM', text: 'Tableau Setup for Nocturnal Immersion' },
    ],
  },
  {
    day: 'Grand Procession',
    subtitle: 'World-Famous Night Light Immersion',
    icon: Lightbulb,
    badge: 'Final Night',
    color: 'from-amber-600/30 to-rose-600/20 border-amber-500/50',
    iconColor: 'text-amber-400',
    events: [
      {
        time: '08:30 PM',
        text: 'Assembly of 100+ Illuminated Tableaux on Station Road',
      },
      {
        time: '09:30 PM',
        text: 'Procession Flag-off by Central Puja Committee',
      },
      {
        time: '02:00 AM',
        text: 'Arrival at Rani Ghat for Sacred Ganga Immersion',
      },
      { time: '04:00 AM', text: 'Conclusion of Festival Celebrations' },
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

  const targetPujaDate = dates[0]?.date || `${currentYear}-11-16`;

  const jsonLd = getJagadhatriScheduleSchema();

  return (
    <PageLayout
      title="Festival & Ritual Schedule"
      subtitle="Complete 5-day chronicle of Jagadhatri Puja celebrations—sacred morning rituals, Pushpanjali, Bhog distribution, and Chandannagar’s world-renowned night immersion procession."
      badge={{
        text: 'Official Festival Timetable',
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

        {/* DETAILED DAILY TIMINGS GRID */}
        <div className="space-y-4 sm:space-y-8">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Hour-By-Hour Guide
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Daily Ritual & Program Breakdown
            </h2>
          </AnimatedWrapper>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {DETAILED_DAILY_TIMINGS.map((daily, idx) => {
              const Icon = daily.icon;

              return (
                <AnimatedWrapper
                  key={daily.day}
                  direction="up"
                  delay={idx * 0.05}
                >
                  <div
                    className={`card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-gradient-to-br p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-6 ${daily.color}`}
                  >
                    <BorderBeam
                      size={120}
                      duration={7}
                      colorFrom="#f59e0b"
                      colorTo="#fef08a"
                    />

                    <div className="space-y-3">
                      {/* Day Header & Badge */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5 dark:border-white/10">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 ${daily.iconColor}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-paytone text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                              {daily.day}
                            </h3>
                            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                              {daily.subtitle}
                            </span>
                          </div>
                        </div>

                        <span className="rounded-md border border-slate-200/80 bg-slate-100/90 px-2 py-0.5 text-[9.5px] font-extrabold text-slate-700 uppercase dark:border-white/15 dark:bg-stone-900 dark:text-slate-300">
                          {daily.badge}
                        </span>
                      </div>

                      {/* Event Time Slots */}
                      <div className="space-y-2 pt-1">
                        {daily.events.map((ev, evIdx) => (
                          <div
                            key={evIdx}
                            className="flex items-start gap-2 text-xs"
                          >
                            <span className="shrink-0 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-700 dark:text-amber-300">
                              {ev.time}
                            </span>
                            <span className="leading-tight font-medium text-slate-700 dark:text-slate-300">
                              {ev.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>

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
                  on Ashtami & Nabami to avoid crowds.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white/70 p-3.5 backdrop-blur-md sm:p-5 dark:border-white/10 dark:bg-stone-900/70">
                <div className="mb-2 flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
                  <Info className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Prasad & Anjali</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 sm:text-xs dark:text-slate-300">
                  Morning Pushpanjali takes place in batches between 8:30 AM and
                  10:30 AM on Saptami, Ashtami, and Nabami. Bhog coupons are
                  distributed at the committee desk.
                </p>
              </div>
            </div>

            {/* QUICK ACTION BUTTONS */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4 dark:border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  asChild
                  className="rounded-full px-4 text-xs font-bold shadow-none"
                >
                  <Link href="/gallery" className="gap-1.5">
                    <ImageIcon className="h-3.5 w-3.5" /> View Photo Archives
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="rounded-full border-slate-300 px-4 text-xs font-bold shadow-none dark:border-white/20"
                >
                  <Link href="/puja-history" className="gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Puja
                    History
                  </Link>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400"
              >
                <Link href="/contact-us" className="gap-1">
                  Contact Committee Desk{' '}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </PageLayout>
  );
}
