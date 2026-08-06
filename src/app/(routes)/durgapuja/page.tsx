import type { Metadata } from 'next';
import Link from 'next/link';

import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { getDurgaPujaEntrySchema } from '@/lib/seo-schemas';

import {
  Calendar,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  HeartHandshake,
  Image as ImageIcon,
  MapPin,
  Palette,
  Sparkles,
  Sun,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Durga Puja Celebrations & Sacred Heritage | Madhyanchal Sarbajanin',
  description:
    'Welcome to Madhyanchal Durga Puja in Chandannagar. Explore our 5-day festival schedule, traditional Vedic rituals, Pushpanjali, Sandhi Puja, and festive photo gallery.',
  keywords: [
    'durga puja chandannagar',
    'madhyanchal durga puja',
    'durga puja entry point',
    'chandannagar durga puja 2026',
    'sandhi puja chandannagar',
    'pushpanjali timing chandannagar',
  ],
  openGraph: {
    title: 'Durga Puja Celebrations | Madhyanchal Sarbajanin',
    description:
      'Experience the divine autumn homecoming of Maa Durga at Madhyanchal, Chandannagar — traditional rituals, Sandhi Puja, and community festivities.',
    url: '/durgapuja',
    type: 'website',
  },
  alternates: {
    canonical: '/durgapuja',
  },
};

export default function DurgaPujaLandingPage() {
  const jsonLd = getDurgaPujaEntrySchema();

  const festivalPillars = [
    {
      title: 'Vedic Rituals & Aarti',
      description:
        'Sacred Bodhon, Kalparambha, 108 lotus Pushpanjali, and Sandhi Puja performed with Vedic purity.',
      icon: Sun,
    },
    {
      title: 'Idol Artistry & Mukhasree',
      description:
        'Intricate traditional idol craftsmanship, sola decorations, and thematic pandal architecture.',
      icon: Palette,
    },
    {
      title: 'Community Prasad & Bhog',
      description:
        'Grand Bhog and Prasad distribution connecting families, neighbors, and visiting devotees.',
      icon: HeartHandshake,
    },
    {
      title: 'Sindoor Khela & Immersion',
      description:
        'Festive vermilion farewell, dhunuchi dance, and solemn immersion procession with devotion.',
      icon: Sparkles,
    },
  ];

  const quickExploreCards = [
    {
      title: '5-Day Festival Schedule',
      desc: 'Check ritual timings from Shashthi to Dashami',
      href: '/durgapuja/schedule',
      icon: Calendar,
      badge: 'Itinerary',
      cta: 'View Schedule',
    },
    {
      title: 'Festive Photo Gallery',
      desc: 'Browse moments from previous puja celebrations',
      href: '/gallery',
      icon: ImageIcon,
      badge: 'Memories',
      cta: 'Explore Gallery',
    },
    {
      title: 'Puja Venue & Directions',
      desc: 'Station Road, Chandannagar (800m from station)',
      href: '#venue',
      icon: MapPin,
      badge: 'Location',
      cta: 'Get Directions',
    },
  ];

  const ritualSpotlights = [
    {
      tag: 'Day 1 • Shashthi',
      title: 'Kalparambha & Bodhon',
      desc: 'Invocation of Maa Durga under the Bilva tree, awakening the divine mother with dhak beats.',
    },
    {
      tag: 'Day 2 • Saptami',
      title: 'Nabapatrika & Kolabou Snan',
      desc: 'Sacred bath of 9 holy plants at the Ganges ghat followed by morning Pushpanjali.',
    },
    {
      tag: 'Day 3 • Ashtami',
      title: 'Sandhi Puja & 108 Lotuses',
      desc: 'The most auspicious 48-minute juncture between Ashtami and Navami marked by 108 lamps.',
    },
    {
      tag: 'Day 4 & 5 • Navami & Dashami',
      title: 'Maha Yajna & Sindoor Khela',
      desc: 'Sacred fire offerings, joyous vermilion farewell ritual, and solemn immersion procession.',
    },
  ];

  return (
    <PageLayout
      title="Durga Puja Festival"
      subtitle="Experience the autumn homecoming of Mother Durga at Madhyanchal — traditional Vedic rituals, Pushpanjali, Dhak rhythms, and community festivities."
      badge={{
        text: 'Autumn Sacred Festival',
        icon: Flame,
      }}
      breadcrumbCurrent="Durga Puja"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-8 sm:space-y-14">
        {/* HERO CTA HEADER CARD */}
        <AnimatedWrapper direction="up">
          <div className="card-glass card-hover-glow relative overflow-hidden rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-amber-500/20 p-5 backdrop-blur-2xl sm:rounded-3xl sm:p-10 dark:border-white/15 dark:bg-stone-900/90">
            <BorderBeam
              size={220}
              duration={7}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />
            <div className="flex flex-col items-center space-y-3.5 text-center sm:space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-0.5 text-[10.5px] font-black tracking-widest text-amber-900 uppercase sm:px-4 sm:py-1 sm:text-xs dark:text-amber-300">
                <Flame className="h-3.5 w-3.5 animate-pulse text-amber-600" />
                Sharadotsav Celebrations
              </span>

              <h1 className="font-paytone text-xl leading-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                Welcome to Madhyanchal <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Durga Puja Celebrations
                </span>
              </h1>

              <p className="max-w-2xl text-xs leading-relaxed font-normal text-slate-600 sm:text-base dark:text-slate-300">
                Celebrating Bengal’s grand autumn festival with traditional
                Vedic rituals, Pushpanjali, Dhak rhythms, Sandhi Puja, and
                community dining in Chandannagar.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <Button
                  variant="primary"
                  size="default"
                  asChild
                  className="min-h-[40px] rounded-full border border-amber-400/60 px-6 text-xs font-bold shadow-none sm:min-h-[44px] sm:text-sm"
                >
                  <Link href="/durgapuja/schedule" className="gap-2">
                    <Calendar className="h-4 w-4" /> Explore 5-Day Schedule
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="min-h-[40px] rounded-full border-slate-300/90 bg-white/80 px-6 text-xs font-bold shadow-none backdrop-blur-md transition-all hover:bg-slate-100 sm:min-h-[44px] sm:text-sm dark:border-white/20 dark:bg-stone-900 dark:hover:bg-stone-800"
                >
                  <Link href="/puja-history" className="gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" /> Sacred Heritage
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedWrapper>

        {/* 4 FESTIVAL PILLARS GRID */}
        <div className="space-y-4">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Essence of Festivity
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Festive Traditions & Heritage
            </h2>
          </AnimatedWrapper>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {festivalPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <AnimatedWrapper
                  key={pillar.title}
                  direction="up"
                  delay={idx * 0.05}
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
                        {pillar.title}
                      </h3>
                      <p className="mt-0.5 text-[10px] leading-tight font-normal text-slate-600 sm:text-xs sm:leading-relaxed dark:text-slate-300">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>

        {/* QUICK EXPLORE CARDS GRID */}
        <div className="space-y-4">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Quick Navigation
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Explore Durga Puja Hub
            </h2>
          </AnimatedWrapper>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5">
            {quickExploreCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <AnimatedWrapper
                  key={card.title}
                  direction="up"
                  delay={idx * 0.05}
                >
                  <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between space-y-3 overflow-hidden rounded-xl border border-slate-200/90 p-3.5 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-6 dark:border-white/12">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                          <Icon className="h-3 w-3" /> {card.badge}
                        </span>
                      </div>
                      <h3 className="font-paytone text-sm text-slate-900 sm:text-lg dark:text-white">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 sm:text-xs dark:text-slate-300">
                        {card.desc}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-8 w-full rounded-full border-amber-500/40 text-xs font-bold text-amber-900 shadow-none hover:bg-amber-500/15 dark:text-amber-300"
                    >
                      <Link href={card.href} className="justify-between">
                        <span>{card.cta}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>

        {/* RITUAL SPOTLIGHT CARDS */}
        <div className="space-y-4">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Devotional Highlights
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Sacred Ritual Spotlights
            </h2>
          </AnimatedWrapper>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {ritualSpotlights.map((item, idx) => (
              <AnimatedWrapper
                key={item.title}
                direction="up"
                delay={idx * 0.05}
              >
                <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between space-y-2.5 overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-5 dark:border-white/12">
                  <div className="space-y-1.5">
                    <span className="inline-block rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9.5px] font-extrabold text-amber-800 sm:text-[10px] dark:text-amber-300">
                      {item.tag}
                    </span>
                    <h3 className="font-paytone text-xs font-bold text-slate-900 sm:text-base dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-[10px] leading-tight text-slate-600 sm:text-xs sm:leading-relaxed dark:text-slate-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </div>

        {/* VENUE & LOCATION DOCK */}
        <AnimatedWrapper direction="up">
          <div
            id="venue"
            className="card-glass card-hover-glow relative scroll-mt-24 space-y-3 overflow-hidden rounded-xl border border-slate-200/90 p-3.5 backdrop-blur-2xl sm:space-y-4 sm:rounded-3xl sm:p-8 dark:border-white/12 dark:bg-stone-900/90"
          >
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <h3 className="font-paytone text-sm font-bold text-slate-900 sm:text-xl dark:text-white">
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

              <div className="flex w-full items-center gap-2 sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-9 flex-1 rounded-full border-slate-300 px-4 text-xs font-bold shadow-none sm:flex-initial dark:border-white/20"
                >
                  <Link href="/contact-us" className="justify-center gap-1">
                    Contact Committee <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  asChild
                  className="h-9 flex-1 rounded-full border-amber-400/60 px-4 text-xs font-bold shadow-none sm:flex-initial"
                >
                  <a
                    href="https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-center gap-1"
                  >
                    Open Map <Compass className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </PageLayout>
  );
}

