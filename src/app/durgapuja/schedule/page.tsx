import type { Metadata } from 'next';
import Link from 'next/link';

import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { Button } from '@/components/ui/button';

import {
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  HeartHandshake,
  MapPin,
  Palette,
  Sparkles,
  Star,
  Sun,
  Award,
  Users,
  CheckCircle2,
} from 'lucide-react';

import { getDurgaPujaScheduleSchema } from '@/lib/seo-schemas';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Durga Puja Festival Schedule & Timings',
    description:
      'Complete 5-day ritual itinerary and event timings for Durga Puja celebrations at Madhyanchal, Chandannagar.',
    canonical: '/durgapuja/schedule',
  }),
  keywords: [
    'durga puja schedule chandannagar',
    'madhyanchal durga puja timings',
    'sandhi puja timing chandannagar',
    'sindoor khela chandannagar',
    'madhyanchal festival itinerary',
  ],
};

export default function DurgaPujaSchedulePage() {
  const jsonLd = getDurgaPujaScheduleSchema();

  const festivalHighlights = [
    {
      title: 'Traditional Rituals',
      description:
        'Authentic Vedic mantras, Pushpanjali, Sandhi Puja, and dhak rhythms performed with reverence.',
      icon: Sun,
      color: 'amber',
    },
    {
      title: 'Youth Drawing Contest',
      description:
        'Annual Sit & Draw competition for young artists across 3 age categories.',
      icon: Palette,
      color: 'rose',
    },
    {
      title: 'Community Feast',
      description:
        'Bhog and Prasad distribution bringing together families and devotees from all walks of life.',
      icon: HeartHandshake,
      color: 'emerald',
    },
    {
      title: 'Cultural Evenings',
      description:
        'Captivating musical performances, dance dramas, and local talent showcases every night.',
      icon: Sparkles,
      color: 'blue',
    },
  ];

  const pujaSchedule = [
    {
      day: 'Mahalaya',
      title: 'Chandi Path & Tarpan',
      description:
        'Dawn recitation of Birendra Krishna Bhadra, Ganga Tarpan rituals, and welcoming Ma Durga.',
      events: [
        'Dawn Chandi Path & Aarti',
        'Ganga Ghat Tarpan Rituals',
        'Festival Invocation',
      ],
      badge: 'Dawn Ritual 🌅',
      date: '10th Oct 2026',
      accentColor:
        'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300',
      tagColor:
        'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40 font-extrabold',
      icon: Sun,
      isFeatured: false,
    },
    {
      day: 'Maha Shashthi',
      title: 'Kalparambha & Bodhon',
      description:
        'Invocation of Goddess Durga with evening Aarti and traditional Dhak beats.',
      events: [
        'Kalparambha Puja',
        'Akhanda Jyoti Sthapana',
        'Evening Aarti & Dhak Performance',
      ],
      badge: 'Day 1',
      date: '17th Oct 2026',
      accentColor:
        'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300',
      tagColor:
        'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
      icon: Flame,
      isFeatured: false,
    },
    {
      day: 'Maha Saptami',
      title: 'Nabapatrika & Kolabou Snan',
      description:
        'Sacred morning bath ceremony and ritualistic offerings at Ganges ghats.',
      events: [
        'Kolabou Snan Ghat Yatra',
        'Nabapatrika Pravesh',
        'Saptami Sandhya Aarti',
      ],
      badge: 'Day 2',
      date: '18th Oct 2026',
      accentColor:
        'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
      tagColor:
        'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      icon: Sun,
      isFeatured: false,
    },
    {
      day: 'Maha Ashtami',
      title: 'Sandhi Puja & Kumari Puja',
      description:
        'The sacred juncture of Ashtami & Navami with 108 lotus flowers & 108 lamps.',
      events: [
        'Morning Pushpanjali',
        '108 Lotus Sandhi Puja',
        'Evening Devotional Bhajan Night',
      ],
      badge: 'Pinnacle Highlight ⭐',
      date: '19th Oct 2026',
      accentColor:
        'border-rose-500/50 bg-rose-500/15 text-rose-900 dark:text-rose-200',
      tagColor:
        'bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/40 font-extrabold',
      icon: Star,
      isFeatured: true,
    },
    {
      day: 'Maha Navami',
      title: 'Mahasnan & Homa Yajna',
      description:
        'Sacred fire Yajna, grand Bhog distribution, and evening mega cultural show.',
      events: [
        'Maha Yajna & Homa',
        'Grand Bhog Prasad Distribution',
        'Musical Gala Night',
      ],
      badge: 'Day 4',
      date: '20th Oct 2026',
      accentColor:
        'border-yellow-500/40 bg-yellow-500/10 text-yellow-800 dark:text-yellow-300',
      tagColor:
        'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30',
      icon: Sparkles,
      isFeatured: false,
    },
    {
      day: 'Vijaya Dashami',
      title: 'Sindoor Khela & Farewell',
      description:
        'Traditional Sindoor Khela celebrations and solemn Darpan Visarjan farewell.',
      events: [
        'Darpan Visarjan Ritual',
        'Traditional Sindoor Khela',
        'Shantijatya Prasad',
      ],
      badge: 'Day 5',
      date: '21st Oct 2026',
      accentColor:
        'border-orange-500/40 bg-orange-500/10 text-orange-800 dark:text-orange-300',
      tagColor:
        'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30',
      icon: Award,
      isFeatured: false,
    },
  ];

  return (
    <PageLayout
      title="Festival Schedule & Timings"
      subtitle="Experience 5 days of divine Vedic rituals, Sandhi Puja, Pushpanjali, and traditional Dhak immersion."
      badge={{
        text: 'Rituals & Timings',
        icon: Flame,
      }}
      breadcrumbCurrent="Puja Schedule"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* QUICK STATS & FESTIVAL HIGHLIGHTS STRIP */}
        <AnimatedWrapper direction="up">
          <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-3 backdrop-blur-2xl sm:grid-cols-4 sm:gap-4 sm:rounded-2xl sm:p-6 dark:border-white/15 dark:from-stone-900 dark:to-stone-950">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-amber-400">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <div className="font-paytone text-xs font-bold text-slate-900 sm:text-xl dark:text-white">
                  5 Days
                </div>
                <div className="text-[9.5px] font-semibold text-slate-600 sm:text-xs dark:text-slate-300">
                  Sacred Rituals
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-rose-400">
                <Star className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <div className="font-paytone text-xs font-bold text-slate-900 sm:text-xl dark:text-white">
                  108 Lotus
                </div>
                <div className="text-[9.5px] font-semibold text-slate-600 sm:text-xs dark:text-slate-300">
                  Sandhi Puja
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-emerald-400">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <div className="font-paytone text-xs font-bold text-slate-900 sm:text-xl dark:text-white">
                  1.5M+
                </div>
                <div className="text-[9.5px] font-semibold text-slate-600 sm:text-xs dark:text-slate-300">
                  Devotees
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-indigo-400">
                <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <div className="font-paytone text-xs font-bold text-slate-900 sm:text-xl dark:text-white">
                  Dhak Beats
                </div>
                <div className="text-[9.5px] font-semibold text-slate-600 sm:text-xs dark:text-slate-300">
                  Visarjan Dance
                </div>
              </div>
            </div>
          </div>
        </AnimatedWrapper>

        {/* 4 FEATURE HIGHLIGHT CARDS */}
        <div
          id="highlights"
          className="grid scroll-mt-24 grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
        >
          {festivalHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedWrapper
                key={item.title}
                direction="up"
                delay={idx * 0.06}
                className="h-full"
              >
                <div className="card-glass relative flex h-full flex-col space-y-2 overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-5 dark:border-white/12">
                  <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-amber-400">
                    <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className="font-paytone text-xs leading-tight font-bold text-slate-900 sm:text-base dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[10px] leading-tight font-normal text-slate-600 sm:text-xs sm:leading-relaxed dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedWrapper>
            );
          })}
        </div>

        {/* SYMMETRICAL 6-CARD PUJA SCHEDULE GRID (3x2 Desktop Layout) */}
        <div
          id="schedule"
          className="mt-8 scroll-mt-24 space-y-4 sm:mt-16 sm:space-y-6"
        >
          <div className="space-y-1 text-center">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-[9.5px] font-extrabold tracking-wider text-amber-800 uppercase sm:px-3 sm:text-[10.5px] dark:text-amber-300">
              <Sparkles className="h-3 w-3 text-amber-500" /> Rituals & Schedule
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Grand Festival Itinerary
            </h2>
            <p className="mx-auto max-w-xl text-[11.5px] text-slate-600 sm:text-sm dark:text-slate-300">
              Follow our day-by-day festival rituals, Aarti timings, Anjali
              batches, and evening cultural highlights.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {pujaSchedule.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <AnimatedWrapper
                  key={item.day}
                  direction="up"
                  delay={idx * 0.05}
                  className="h-full"
                >
                  <div
                    className={`card-glass relative flex h-full flex-col justify-between overflow-hidden rounded-xl border p-3.5 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-6 ${
                      item.isFeatured
                        ? 'border-amber-500/60'
                        : 'border-slate-200/90 dark:border-white/12'
                    }`}
                  >
                    <div className="space-y-2.5 sm:space-y-3">
                      {/* CARD HEADER: DAY & BADGE */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2 sm:pb-3 dark:border-white/10">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-600 sm:h-7 sm:w-7 dark:text-amber-400">
                            <ItemIcon className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <span className="font-paytone text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                              {item.day}
                            </span>
                            <span className="block font-mono text-[9px] text-slate-500 sm:text-[9.5px] dark:text-slate-400">
                              {item.date}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[8.5px] font-extrabold uppercase sm:px-2.5 sm:text-[9.5px] ${item.tagColor}`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* TITLE & DESCRIPTION */}
                      <div>
                        <h3 className="font-paytone text-[13px] font-bold text-slate-900 sm:text-lg dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-[11px] leading-snug text-slate-600 sm:mt-1 sm:text-xs sm:leading-relaxed dark:text-slate-300">
                          {item.description}
                        </p>
                      </div>

                      {/* EVENT TIMELINE BULLETS */}
                      <div className="pt-0.5">
                        <span className="mb-1 block text-[9px] font-extrabold tracking-wider text-slate-400 uppercase sm:mb-1.5 sm:text-[10px] dark:text-slate-500">
                          Highlights & Timings:
                        </span>
                        <ul className="space-y-1 text-[11px] font-semibold text-slate-700 sm:space-y-1.5 sm:text-xs dark:text-slate-200">
                          {item.events.map((ev, evIdx) => (
                            <li
                              key={evIdx}
                              className="flex items-center gap-1.5 rounded-md bg-slate-100/70 px-2 py-0.5 sm:rounded-lg sm:px-2.5 sm:py-1 dark:bg-stone-800/60"
                            >
                              <CheckCircle2 className="h-3 w-3 shrink-0 text-amber-500 sm:h-3.5 sm:w-3.5" />
                              <span>{ev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>

        {/* VENUE & LOCATION DOCK WITH GOOGLE MAPS DIRECT NAVIGATION */}
        <AnimatedWrapper direction="up">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-8 dark:border-white/15 dark:from-stone-900 dark:to-stone-950">
            <div className="flex flex-col items-start justify-between gap-3.5 sm:flex-row sm:items-center">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5 shrink-0 text-amber-500 sm:h-5 sm:w-5" />
                  <h3 className="font-paytone text-sm font-bold text-slate-900 sm:text-xl dark:text-white">
                    Madhyanchal Durga Puja Ground
                  </h3>
                </div>
                <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                  Station Road, Chandannagar, Hooghly, West Bengal - 712136
                </p>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    <Clock className="h-3.5 w-3.5" /> 800m from Railway Station
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-row items-center gap-2.5 pt-1 sm:w-auto sm:pt-0">
                <Button
                  variant="primary"
                  size="default"
                  asChild
                  className="h-9 flex-1 items-center justify-center rounded-full bg-amber-500 px-4 text-xs font-bold text-slate-950 hover:bg-amber-400 sm:h-10 sm:flex-initial sm:px-5"
                >
                  <a
                    href="https://maps.google.com/?q=Madhyanchal+Puja+Ground+Chandannagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-1.5"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="h-9 flex-1 items-center justify-center rounded-full border-slate-300 px-4 text-xs font-bold shadow-none sm:h-10 sm:flex-initial sm:px-5 dark:border-white/20"
                >
                  <Link href="/contact-us" className="gap-1.5">
                    <span>Contact</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </PageLayout>
  );
}
