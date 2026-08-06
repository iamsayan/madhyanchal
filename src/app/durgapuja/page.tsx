import type { Metadata } from 'next';
import Link from 'next/link';

import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { HeroSlider } from '@/components/shared/hero-slider';
import {
  JsonLd,
  webpageSchema,
  durgaPujaEventSchema,
  durgaFaqSchema,
  breadcrumbSchema,
} from '@/lib/schema';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';

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

export default function DurgaPujaLandingPage() {
  const durgaWebpageSchema = webpageSchema({
    title: 'Madhyanchal Sarbajanin Durga Puja | Chandannagar',
    description:
      'Official Durga Puja landing page of Madhyanchal Sarbajanin. Explore Vedic rituals, Pushpanjali timings, 108 lotus Sandhi Puja, drawing contest, and gallery.',
    url: '/durgapuja',
  });

  const durgaBreadcrumbSchema = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Durga Puja', url: '/durgapuja' },
  ]);

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
      title: 'Sandhya Aarti & Devotion',
      description:
        'Traditional evening lamps, sacred incense, and reverberating Dhak drums during Sandhya Aarti.',
      icon: HeartHandshake,
    },
    {
      title: 'Sindoor Khela & Immersion',
      description:
        'Festive vermilion farewell, evening lamps, and solemn immersion procession with devotion.',
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
    <div className="bg-dot-mesh relative overflow-hidden pb-4 sm:pb-0">
      <JsonLd
        data={[
          durgaWebpageSchema,
          durgaPujaEventSchema(),
          durgaBreadcrumbSchema,
          durgaFaqSchema('/durgapuja'),
        ]}
      />

      {/* FULL-WIDTH HERO SLIDER (Identical to Home Page Hero) */}
      <HeroSlider images={[]}>
        <AnimatedWrapper
          direction="up"
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center space-y-6 text-center sm:space-y-8"
        >
          {/* Golden Emblem Badge */}
          <div className="gold-glow relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-amber-500/40 bg-amber-500/20 px-3.5 py-1 text-[10.5px] font-extrabold tracking-widest text-amber-900 uppercase sm:px-6 sm:py-2 sm:text-xs dark:text-amber-300">
            <BorderBeam
              size={120}
              duration={6}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />
            <Flame className="h-3.5 w-3.5 animate-pulse text-amber-600 sm:h-4 sm:w-4 dark:text-amber-400" />
            <span>Sharadotsav Festival</span>
          </div>

          {/* Tiered Home Hero Display Title Composition */}
          <div className="flex w-full flex-col items-center space-y-1 sm:space-y-2">
            <h1 className="font-paytone text-3xl leading-[0.95] tracking-tight drop-shadow-sm sm:text-5xl lg:text-7xl">
              <span className="animate-shimmer bg-[linear-gradient(110deg,#b45309,45%,#d97706,55%,#92400e)] bg-clip-text text-transparent dark:bg-[linear-gradient(110deg,#fef08a,45%,#f59e0b,55%,#d97706)]">
                MADHYANCHAL
              </span>
            </h1>

            <div className="py-0.5">
              <span className="flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.2em] text-amber-900 uppercase sm:gap-2.5 sm:text-xs sm:tracking-[0.25em] lg:text-sm dark:text-amber-300">
                <span className="h-0.5 w-6 bg-gradient-to-r from-transparent to-amber-600 sm:w-12 lg:w-16" />
                ✦ S A R B A J A N I N ✦
                <span className="h-0.5 w-6 bg-gradient-to-l from-transparent to-amber-600 sm:w-12 lg:w-16" />
              </span>
            </div>

            <h2 className="font-paytone text-xl leading-[1.05] tracking-tight drop-shadow-xs sm:text-3xl lg:text-4xl">
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                DURGA PUJA
              </span>
            </h2>
          </div>

          <p className="mx-auto max-w-xl px-4 text-xs leading-relaxed font-semibold text-slate-900 sm:text-sm lg:text-base dark:text-slate-300">
            Celebrating Bengal’s grand autumn festival with traditional Vedic
            rituals, Pushpanjali, Dhak rhythms, Sandhi Puja, and community
            cultural celebrations in Chandannagar.
          </p>

          <div className="flex w-full flex-wrap items-center justify-center gap-2.5 px-2 pt-1 sm:w-auto sm:gap-4 sm:px-0">
            <Button
              variant="primary"
              size="lg"
              asChild
              className="gold-glow relative min-h-[42px] w-auto shrink-0 overflow-hidden rounded-full px-5 py-2.5 text-xs font-extrabold whitespace-nowrap hover:scale-105 active:scale-95 sm:min-h-[44px] sm:px-6 sm:py-3 sm:text-sm lg:text-base"
            >
              <Link
                href="/durgapuja/schedule"
                className="flex items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2"
              >
                <BorderBeam
                  size={120}
                  duration={5}
                  colorFrom="#ffffff"
                  colorTo="#f59e0b"
                />
                <Calendar className="h-4 w-4" />
                <span>5-Day Schedule</span>{' '}
                <ChevronRight className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="min-h-[42px] w-auto shrink-0 rounded-full border-slate-300/90 bg-white/80 px-5 py-2.5 text-xs whitespace-nowrap text-slate-800 backdrop-blur-xl hover:scale-105 hover:bg-slate-100 active:scale-95 sm:min-h-[44px] sm:px-6 sm:py-3 sm:text-sm lg:text-base dark:border-white/40 dark:bg-transparent dark:text-white dark:hover:bg-white/15"
              asChild
            >
              <Link
                href="/durgapuja/drawing-competition"
                className="flex items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2"
              >
                <Palette className="h-4 w-4 text-amber-500" />
                <span>Drawing Contest</span>
              </Link>
            </Button>
          </div>

          {/* Centered Highlights Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-slate-300/80 pt-4 text-[10px] font-bold text-slate-700 sm:gap-x-6 sm:pt-5 sm:text-xs lg:text-sm dark:border-white/15 dark:text-slate-300">
            <span className="flex flex-row items-center justify-center gap-1.5 text-center sm:gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              <span>5 Days Festival</span>
            </span>
            <span className="flex flex-row items-center justify-center gap-1.5 text-center sm:gap-2">
              <Flame className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              <span>Pushpanjali & Sandhi Puja</span>
            </span>
            <span className="flex flex-row items-center justify-center gap-1.5 text-center sm:gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-400" />
              <span>Station Road, Chandannagar</span>
            </span>
          </div>
        </AnimatedWrapper>
      </HeroSlider>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 mx-auto max-w-6xl space-y-10 px-3.5 pt-8 pb-12 sm:space-y-16 sm:px-6 lg:px-8">
        {/* 5-DAY SACRED RITUAL SEQUENCE (Native Mobile Horizontal Swipe Track) */}
        <AnimatedWrapper direction="up" className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-500 sm:h-5 sm:w-5" />
            <h2 className="font-paytone text-base text-slate-900 sm:text-xl lg:text-2xl dark:text-white">
              5-Day Sacred Ritual Sequence
            </h2>
          </div>

          <div className="flex w-full snap-x snap-mandatory scrollbar-none items-stretch gap-2.5 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible lg:gap-3.5">
            {/* Day 1: Shashthi */}
            <div className="card-glass card-hover-glow relative flex h-full min-w-[160px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-white/12">
              <span className="text-[9.5px] font-black tracking-wider text-amber-600 uppercase sm:text-[10.5px] dark:text-amber-400">
                Day 1 • Shashthi
              </span>
              <div className="my-1.5 space-y-0.5">
                <span className="font-paytone block text-sm text-slate-900 sm:text-base lg:text-lg dark:text-white">
                  Bodhon
                </span>
                <span className="block text-[10px] leading-snug text-slate-600 sm:text-[11px] dark:text-slate-300">
                  Sacred awakening of Maa Durga under Bilva Tree with Dhak beats
                </span>
              </div>
              <span className="inline-flex items-center justify-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9.5px] font-bold text-amber-800 sm:text-[10.5px] dark:text-amber-300">
                ✦ Awaken Deity
              </span>
            </div>

            {/* Day 2: Saptami */}
            <div className="card-glass card-hover-glow relative flex h-full min-w-[160px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-white/12">
              <span className="text-[9.5px] font-black tracking-wider text-amber-600 uppercase sm:text-[10.5px] dark:text-amber-400">
                Day 2 • Saptami
              </span>
              <div className="my-1.5 space-y-0.5">
                <span className="font-paytone block text-sm text-slate-900 sm:text-base lg:text-lg dark:text-white">
                  Nabapatrika
                </span>
                <span className="block text-[10px] leading-snug text-slate-600 sm:text-[11px] dark:text-slate-300">
                  Bathing 9 holy plants at Ganges Ghat for Kolabou Snan
                </span>
              </div>
              <span className="inline-flex items-center justify-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9.5px] font-bold text-amber-800 sm:text-[10.5px] dark:text-amber-300">
                ✦ Saptami Aarti
              </span>
            </div>

            {/* Day 3: Ashtami */}
            <div className="card-glass card-hover-glow relative flex h-full min-w-[160px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-xl border border-amber-500/50 bg-amber-500/10 p-3 backdrop-blur-2xl transition-all duration-300 sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-amber-400/40 dark:bg-amber-500/15">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[9.5px] font-black tracking-wider text-amber-700 uppercase sm:text-[10.5px] dark:text-amber-300">
                  Day 3 • Ashtami
                </span>
                <span className="py-0.2 shrink-0 rounded-full bg-amber-500 px-1.5 text-[8px] font-black text-slate-950">
                  ⭐ PEAK
                </span>
              </div>
              <div className="my-1.5 space-y-0.5">
                <span className="font-paytone block text-sm text-slate-900 sm:text-base lg:text-lg dark:text-white">
                  Sandhi Puja
                </span>
                <span className="block text-[10px] leading-snug text-slate-700 sm:text-[11px] dark:text-slate-200">
                  108 lotus flowers & lamp offerings during auspicious juncture
                </span>
              </div>
              <span className="inline-flex items-center justify-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/20 px-2 py-0.5 text-[9.5px] font-black text-amber-900 sm:text-[10.5px] dark:text-amber-300">
                ✦ Auspicious Tithi
              </span>
            </div>

            {/* Day 4: Navami */}
            <div className="card-glass card-hover-glow relative flex h-full min-w-[160px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-white/12">
              <span className="text-[9.5px] font-black tracking-wider text-emerald-600 uppercase sm:text-[10.5px] dark:text-emerald-400">
                Day 4 • Navami
              </span>
              <div className="my-1.5 space-y-0.5">
                <span className="font-paytone block text-sm text-slate-900 sm:text-base lg:text-lg dark:text-white">
                  Maha Yajna
                </span>
                <span className="block text-[10px] leading-snug text-slate-600 sm:text-[11px] dark:text-slate-300">
                  Sacred Homa fire rituals, Chandi Path & Vedic oblations
                </span>
              </div>
              <span className="inline-flex items-center justify-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9.5px] font-bold text-emerald-800 sm:text-[10.5px] dark:text-emerald-300">
                ✦ Sacred Yajna
              </span>
            </div>

            {/* Day 5: Dashami */}
            <div className="card-glass card-hover-glow relative flex h-full min-w-[160px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:min-w-0 sm:rounded-2xl sm:p-4 dark:border-white/12">
              <span className="text-[9.5px] font-black tracking-wider text-rose-600 uppercase sm:text-[10.5px] dark:text-rose-400">
                Day 5 • Dashami
              </span>
              <div className="my-1.5 space-y-0.5">
                <span className="font-paytone block text-sm text-slate-900 sm:text-base lg:text-lg dark:text-white">
                  Immersion
                </span>
                <span className="block text-[10px] leading-snug text-slate-600 sm:text-[11px] dark:text-slate-300">
                  Vermilion Sindoor Khela farewell & Ganges Visarjan procession
                </span>
              </div>
              <span className="inline-flex items-center justify-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[9.5px] font-bold text-rose-800 sm:text-[10.5px] dark:text-rose-300">
                ✦ Visarjan Procession
              </span>
            </div>
          </div>
        </AnimatedWrapper>

        {/* DEVOTIONAL SERVICES & VISITOR GUIDE WIDGET */}
        <AnimatedWrapper direction="up">
          <div className="card-glass card-hover-glow relative overflow-hidden rounded-xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
            <BorderBeam
              size={180}
              duration={8}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />
            <div className="space-y-4">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-paytone text-base text-slate-900 sm:text-2xl dark:text-white">
                    Devotional Offerings & Devotee Services
                  </h3>
                  <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                    Mandap Pushpanjali arrangements, Sandhya Aarti, and
                    community cultural gatherings
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-[10.5px] font-black text-amber-700 dark:text-amber-300">
                  ✦ Authentic Vedic Services
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5">
                {/* Guide Card 1 */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 sm:p-5">
                  <span className="text-[10px] font-black tracking-wider text-amber-700 uppercase sm:text-xs dark:text-amber-300">
                    Morning Pushpanjali
                  </span>
                  <span className="font-paytone mt-1 block text-base text-slate-900 sm:text-xl dark:text-white">
                    Vedic Mantras & Flowers
                  </span>
                  <p className="mt-1 text-[11px] leading-tight text-slate-600 sm:text-xs dark:text-slate-300">
                    Fresh lotus flowers, sacred Bel leaves, and priest guidance
                    provided for all devotees
                  </p>
                </div>

                {/* Guide Card 2 */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 sm:p-5">
                  <span className="text-[10px] font-black tracking-wider text-emerald-700 uppercase sm:text-xs dark:text-emerald-300">
                    Sandhya Aarti & Lamps
                  </span>
                  <span className="font-paytone mt-1 block text-base text-slate-900 sm:text-xl dark:text-white">
                    Evening Lamp Rituals
                  </span>
                  <p className="mt-1 text-[11px] leading-tight text-slate-600 sm:text-xs dark:text-slate-300">
                    Reverberating Dhak drum rhythms and traditional evening lamp
                    offerings every evening
                  </p>
                </div>

                {/* Guide Card 3 */}
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-3.5 sm:p-5">
                  <span className="text-[10px] font-black tracking-wider text-purple-700 uppercase sm:text-xs dark:text-purple-300">
                    Community Gatherings
                  </span>
                  <span className="font-paytone mt-1 block text-base text-slate-900 sm:text-xl dark:text-white">
                    Devotional Union
                  </span>
                  <p className="mt-1 text-[11px] leading-tight text-slate-600 sm:text-xs dark:text-slate-300">
                    Warm community gatherings, cultural events, and traditional
                    Prasad distribution to all visitors
                  </p>
                </div>
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

        {/* HIGH-IMPACT BENTO EXPLORE SHOWCASE (Inspired by Home Page Artistry Section) */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[10px] font-black tracking-widest text-amber-700 uppercase sm:px-4 sm:py-1 sm:text-xs dark:text-amber-300">
              <Compass className="h-3 w-3 text-amber-500 sm:h-3.5 sm:w-3.5" />
              Quick Navigation
            </span>
            <h2 className="font-paytone text-xl text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              Explore Durga Puja
            </h2>
            <p className="mx-auto max-w-xl text-xs text-slate-600 sm:text-sm dark:text-slate-300">
              Navigate 5-day ritual itineraries, festive memories, and mandap
              venue directions
            </p>
          </AnimatedWrapper>

          <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-12">
            {/* Bento Box 1: 5-Day Schedule Primary Feature (7 cols) */}
            <AnimatedWrapper direction="up" className="md:col-span-7">
              <div className="group card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-amber-500/20 p-4.5 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-7 dark:border-white/15 dark:bg-stone-900/90">
                <BorderBeam
                  size={180}
                  duration={7}
                  colorFrom="#f59e0b"
                  colorTo="#fef08a"
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-0.5 text-[10px] font-bold text-amber-800 uppercase sm:text-xs dark:text-amber-300">
                      <Calendar className="h-3.5 w-3.5 text-amber-600" />
                      Day-by-Day Itinerary
                    </span>
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-black text-slate-950">
                      ⭐ 5 DAYS
                    </span>
                  </div>

                  <h3 className="font-paytone text-lg text-slate-900 sm:text-2xl lg:text-3xl dark:text-white">
                    5-Day Festival Ritual Schedule
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                    Explore complete ritual timelines from Shashthi Kalparambha
                    to Ashtami Sandhi Puja, Maha Yajna, and Dashami Visarjan
                    procession.
                  </p>

                  {/* Ritual Tithi Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      'Shashthi',
                      'Saptami',
                      'Ashtami ⭐ PEAK',
                      'Navami',
                      'Dashami',
                    ].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-md border border-slate-200/90 bg-white/70 px-2 py-0.5 text-[10px] font-bold text-slate-800 backdrop-blur-md sm:text-xs dark:border-white/10 dark:bg-stone-800/80 dark:text-slate-200"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="default"
                    asChild
                    className="gold-glow relative min-h-[38px] w-full rounded-full border border-amber-400/60 px-5 text-xs font-bold shadow-none sm:min-h-[42px] sm:w-auto sm:text-sm"
                  >
                    <Link
                      href="/durgapuja/schedule"
                      className="justify-center gap-2"
                    >
                      <span>View Full Schedule</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedWrapper>

            {/* Bento Box 2: Festive Photo Gallery Feature (5 cols) */}
            <AnimatedWrapper
              direction="up"
              delay={0.05}
              className="md:col-span-5"
            >
              <div className="group card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 p-4.5 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-7 dark:border-white/15">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-[10px] font-bold text-purple-800 uppercase sm:text-xs dark:text-purple-300">
                      <ImageIcon className="h-3.5 w-3.5 text-purple-500" />
                      Memories & Artistry
                    </span>
                  </div>

                  <h3 className="font-paytone text-lg text-slate-900 sm:text-2xl dark:text-white">
                    Festive Photo Gallery
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                    Immerse in idol craftsmanship, Sandhya Aarti, evening
                    illuminations, and previous puja celebrations.
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="default"
                    asChild
                    className="min-h-[38px] w-full rounded-full border-slate-300/90 bg-white/80 px-5 text-xs font-bold shadow-none backdrop-blur-md transition-all hover:bg-slate-100 sm:min-h-[42px] sm:text-sm dark:border-white/20 dark:bg-stone-900 dark:text-white dark:hover:bg-stone-800"
                  >
                    <Link href="/gallery" className="justify-center gap-2">
                      <span>Explore Gallery</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedWrapper>
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
    </div>
  );
}
