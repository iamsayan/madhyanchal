import type { Metadata } from 'next';
import Link from 'next/link';

import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';

import {
  Calendar,
  ChevronRight,
  Clock,
  Flame,
  HeartHandshake,
  MapPin,
  Palette,
  Sparkles,
  Sun,
} from 'lucide-react';

import { getDurgaPujaScheduleSchema } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Durga Puja Festival Schedule & Timings | Madhyanchal Sarbajanin',
  description:
    'Complete 5-day ritual itinerary and event timings for Durga Puja celebrations at Madhyanchal, Chandannagar.',
  keywords: [
    'durga puja schedule chandannagar',
    'madhyanchal durga puja timings',
    'sandhi puja timing chandannagar',
    'sindoor khela chandannagar',
    'madhyanchal festival itinerary',
  ],
  openGraph: {
    title: 'Durga Puja Festival Schedule | Madhyanchal Sarbajanin',
    description:
      'Explore the official 5-day festival schedule, Pushpanjali timings, and cultural programs at Madhyanchal Durga Puja.',
    url: '/durgapuja/schedule',
    type: 'website',
  },
  alternates: {
    canonical: '/durgapuja/schedule',
  },
};

export default function DurgaPujaSchedulePage() {
  const jsonLd = getDurgaPujaScheduleSchema();

  const festivalHighlights = [
    {
      title: 'Traditional Rituals',
      description:
        'Authentic Vedic mantras, Pushpanjali, Sandhi Puja, and dhak rhythms performed with reverence.',
      icon: Sun,
    },
    {
      title: 'Youth Drawing Contest',
      description:
        'Annual Sit & Draw competition for young artists across 3 age categories.',
      icon: Palette,
    },
    {
      title: 'Community Feast',
      description:
        'Bhog and Prasad distribution bringing together families and devotees from all walks of life.',
      icon: HeartHandshake,
    },
    {
      title: 'Cultural Evenings',
      description:
        'Captivating musical performances, dance dramas, and local talent showcases every night.',
      icon: Sparkles,
    },
  ];

  const pujaSchedule = [
    {
      day: 'Shashthi',
      title: 'Kalparambha & Bodhon',
      description: 'Invocation of Goddess Durga with evening Aarti and Dhak.',
      events: ['Kalparambha Puja', 'Akhanda Jyoti', 'Evening Aarti & Dhak'],
      badge: 'Day 1',
    },
    {
      day: 'Saptami',
      title: 'Nabapatrika & Kolabou Snan',
      description: 'Sacred bath ceremony and ritualistic morning offerings.',
      events: ['Kolabou Snan', 'Nabapatrika Pravesh', 'Cultural Evening'],
      badge: 'Day 2',
    },
    {
      day: 'Ashtami',
      title: 'Sandhi Puja & Kumari Puja',
      description: 'The pinnacle of worship during the auspicious juncture.',
      events: ['Pushpanjali', 'Sandhi Puja', 'Evening Bhajan Performance'],
      badge: 'Day 3',
    },
    {
      day: 'Navami',
      title: 'Mahasnan & Homa',
      description: 'Sacred fire rituals and grand evening cultural gala.',
      events: ['Maha Yajna & Homa', 'Bhog Prasad', 'Gala Music Night'],
      badge: 'Day 4',
    },
    {
      day: 'Dashami',
      title: 'Sindoor Khela & Visarjan',
      description: 'Festive farewell rituals and solemn immersion procession.',
      events: ['Sindoor Khela', 'Darpan Visarjan', 'Grand Procession'],
      badge: 'Day 5',
    },
  ];

  return (
    <PageLayout
      title="Durga Puja Festival Schedule"
      subtitle="Complete 5-day itinerary — experience traditional Vedic rituals, cultural evenings, and sacred prasad distribution."
      badge={{
        text: 'Rituals & Timings',
        icon: Flame,
      }}
      breadcrumbCurrent="Puja Schedule"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-8 sm:space-y-14">
        {/* 4 FEATURE HIGHLIGHT CARDS */}
        <div id="highlights" className="scroll-mt-24 grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {festivalHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedWrapper
                key={item.title}
                direction="up"
                delay={idx * 0.06}
              >
                <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between space-y-2 overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-5 dark:border-white/12">
                  <BorderBeam
                    size={100}
                    duration={6}
                    colorFrom="#f59e0b"
                    colorTo="#fef08a"
                  />
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-amber-400">
                    <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-paytone text-xs text-slate-900 sm:text-base dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] font-normal leading-tight text-slate-600 sm:text-xs sm:leading-relaxed dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedWrapper>
            );
          })}
        </div>

        {/* FEATURED CTA BANNER: YOUTH DRAWING COMPETITION */}
        <AnimatedWrapper direction="up">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-amber-500/15 p-4 shadow-sm backdrop-blur-2xl sm:rounded-3xl sm:p-8 dark:border-white/15 dark:bg-stone-900/90">
            <BorderBeam
              size={180}
              duration={8}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  <Palette className="h-3 w-3" /> Special Event Showcase
                </span>
                <h3 className="font-paytone text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
                  Youth Drawing Competition
                </h3>
                <p className="max-w-xl text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                  Encouraging creative expression among children across 3 age
                  groups (Category A, B & C) with exciting trophies and
                  certificates.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="primary"
                  size="default"
                  asChild
                  className="h-10 rounded-full border border-amber-400/60 px-5 text-xs font-bold shadow-none"
                >
                  <Link
                    href="/durgapuja/drawing-competition"
                    className="gap-1.5"
                  >
                    View Registration <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedWrapper>

        {/* 5-DAY PUJA SCHEDULE CARDS */}
        <div id="schedule" className="scroll-mt-24 space-y-4 sm:space-y-6">
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 sm:text-xs dark:text-amber-400">
              Rituals & Timings
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              5-Day Festival Itinerary
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {pujaSchedule.map((item, idx) => (
              <AnimatedWrapper
                key={item.day}
                direction="up"
                delay={idx * 0.05}
              >
                <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between space-y-3 overflow-hidden rounded-xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-6 dark:border-white/12">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                        <Calendar className="h-3 w-3" /> {item.day}
                      </span>
                      <span className="rounded-md border border-slate-200/80 bg-slate-100/80 px-2 py-0.5 text-[9.5px] font-extrabold uppercase text-slate-600 dark:border-white/10 dark:bg-stone-900 dark:text-slate-400">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-paytone text-base text-slate-900 sm:text-lg dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>

                    <ul className="space-y-1 pt-1 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      {item.events.map((ev, evIdx) => (
                        <li key={evIdx} className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </div>

        {/* VENUE & LOCATION DOCK */}
        <AnimatedWrapper direction="up">
          <div className="relative space-y-3 overflow-hidden rounded-xl border border-slate-200/90 bg-white/80 p-4 backdrop-blur-2xl sm:space-y-4 sm:rounded-3xl sm:p-8 dark:border-white/12 dark:bg-stone-900/90">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <h3 className="font-paytone text-base font-bold text-slate-900 sm:text-xl dark:text-white">
                    Madhyanchal Durga Puja Venue
                  </h3>
                </div>
                <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                  Station Road, Chandannagar, Hooghly, West Bengal - 712136
                </p>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                  <Clock className="h-3 w-3" /> Just 800m from Chandannagar
                  Railway Station
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9 rounded-full border-slate-300 px-4 text-xs font-bold shadow-none dark:border-white/20"
              >
                <Link href="/contact-us" className="gap-1">
                  Contact Committee <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </PageLayout>
  );
}
