import Link from 'next/link';

import {
  JsonLd,
  webpageSchema,
  jagadhatriPujaEventSchema,
  jagadhatriFaqSchema,
  breadcrumbSchema,
} from '@/lib/schema';

import {
  AnimatedWrapper,
  StaggerContainer,
  StaggerItem,
} from '@/components/shared/animated-wrapper';
import { FestivalScheduleShowcase } from '@/components/shared/festival-schedule-showcase';
import { GallerySlider } from '@/components/shared/gallery-slider';
import { HeroSlider } from '@/components/shared/hero-slider';
import { Section } from '@/components/shared/section';
import { Videos } from '@/components/shared/videos';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { NumberTicker } from '@/components/ui/number-ticker';
import type { EventDate } from '@/types';

import {
  Award,
  Calendar,
  ChevronRight,
  Compass,
  Flame,
  Footprints,
  History,
  MapPin,
  Sparkles,
  Train,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  celebratingYear,
  currentYear,
  getHomePage,
  getSettings,
} from '@/lib/data';
import CockpitImage from '@/components/shared/cockpit-image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Madhyanchal Sarbajanin Jagadhatri Puja ${currentYear} | Chandannagar`,
  description: `Official website of Madhyanchal Sarbajanin Jagadhatri Puja, Chandannagar. Celebrating ${celebratingYear} years since 1971. Explore the puja schedule, gallery, events, committee details, and latest updates for ${currentYear}.`,
  alternates: { canonical: '/' },
  keywords: [
    'madhyanchal',
    'jagadhatri',
    'puja',
    'jagadhatri puja',
    'chandannagar',
    'jagadhatri puja chandannagar',
    'chandannagar jagadhatri puja',
    'west bengal festival',
    'madhyanchal sarbajanin',
    'madhyanchal sporting club',
    'jagadhatri puja 2026',
    'chandannagar puja committee',
    'hooghly festival',
    'bengal cultural festival',
    'chandannagar lighting',
    'jagadhatri puja procession',
  ],
};

export default async function HomePage() {
  // Fetch CMS singletons with fallback data safety
  const [homepage, settings] = await Promise.all([
    getHomePage(),
    getSettings(),
  ]);

  const currentYear = 2026;
  const legacyYears = currentYear - 1971 + 1;

  const dates: EventDate[] = settings?.dates || [];

  const heroImages = homepage?.hero_images || [];
  const sliderImages = homepage?.slider_images || [];
  const videos = homepage?.videos || [];

  const targetPujaDate = dates[0]?.date || `${currentYear}-11-16`;

  const statItems = [
    {
      title: 'Annual Footfall',
      stat: '1.2M+',
      icon: Footprints,
      color: 'from-pink-500 to-rose-600',
      badgeColor: 'bg-pink-500/10 text-pink-500 dark:bg-pink-500/20',
      description: 'Highest footfall in 2024 on Ashtami night',
    },
    {
      title: 'Prestigious Awards',
      stat: '100+',
      icon: Award,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20',
      description: 'Won 32 top awards in 2026 alone',
    },
    {
      title: 'Social Community',
      stat: '8.2K',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      badgeColor: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20',
      description: 'Active digital diaspora community',
    },
    {
      title: 'Post Reach',
      stat: '38.4K',
      icon: TrendingUp,
      color: 'from-amber-500 to-yellow-600',
      badgeColor: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20',
      description: 'Global reach across social channels',
    },
  ];

  const homepageWebpageSchema = webpageSchema({
    title: `Madhyanchal Sarbajanin Jagadhatri Puja ${currentYear} | Chandannagar`,
    description: `Official website of Madhyanchal Sarbajanin Jagadhatri Puja, Chandannagar. Celebrating ${legacyYears} years since 1971.`,
    url: '/',
  });

  const homepageBreadcrumbSchema = breadcrumbSchema([
    { name: 'Home', url: '/' },
  ]);

  return (
    <div className="bg-dot-mesh relative overflow-hidden">
      <JsonLd
        data={[
          homepageWebpageSchema,
          jagadhatriPujaEventSchema(),
          homepageBreadcrumbSchema,
          jagadhatriFaqSchema(),
        ]}
      />

      {/* HERO SECTION WITH PHOTO SLIDER & SHIMMER TITLE */}
      <HeroSlider images={heroImages}>
        <AnimatedWrapper
          direction="up"
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center space-y-6 text-center sm:space-y-8"
        >
          {/* Golden Emblem Badge with Magic UI BorderBeam */}
          <div className="gold-glow relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-[10px] font-extrabold tracking-widest text-amber-800 uppercase backdrop-blur-xl sm:px-6 sm:py-2 sm:text-xs dark:text-amber-300">
            <BorderBeam
              size={120}
              duration={6}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />
            <Flame className="h-3.5 w-3.5 shrink-0 animate-pulse text-amber-500 sm:h-4 sm:w-4 dark:text-amber-400" />
            <span className="hidden sm:inline">
              {legacyYears} Years of Tradition
            </span>
            <span className="sm:hidden">{legacyYears} Years of Tradition</span>
          </div>

          {/* Unique Tiered Display Title Composition */}
          <div className="flex w-full flex-col items-center space-y-1 sm:space-y-2">
            {/* Line 1: MADHYANCHAL (Main Display Title 1) */}
            <h1 className="font-paytone text-3xl leading-[0.95] tracking-tight drop-shadow-sm sm:text-5xl lg:text-7xl">
              <span className="animate-shimmer bg-[linear-gradient(110deg,#b45309,45%,#d97706,55%,#92400e)] bg-clip-text text-transparent dark:bg-[linear-gradient(110deg,#fef08a,45%,#f59e0b,55%,#d97706)]">
                MADHYANCHAL
              </span>
            </h1>

            {/* Line 2: SARBAJANIN (Supporting Sub-heading Badge) */}
            <div className="py-0.5">
              <span className="flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.2em] text-amber-900 uppercase sm:gap-2.5 sm:text-xs sm:tracking-[0.25em] lg:text-sm dark:text-amber-300">
                <span className="h-0.5 w-6 bg-gradient-to-r from-transparent to-amber-600 sm:w-12 lg:w-16" />
                ✦ S A R B A J A N I N ✦
                <span className="h-0.5 w-6 bg-gradient-to-l from-transparent to-amber-600 sm:w-12 lg:w-16" />
              </span>
            </div>

            {/* Line 3: JAGADHATRI PUJA (Main Display Title 2) */}
            <h2 className="font-paytone text-xl leading-[1.05] tracking-tight drop-shadow-xs sm:text-3xl lg:text-4xl">
              <span className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-slate-100 dark:to-amber-200">
                JAGADHATRI PUJA
              </span>
            </h2>
          </div>

          <p className="mx-auto max-w-xl px-4 text-xs leading-relaxed font-semibold text-slate-900 sm:text-sm lg:text-base dark:text-slate-300">
            Chandannagar’s crown jewel of majestic pandal art, legendary
            illumination, and sacred cultural heritage.
          </p>

          {/* Action Buttons with Magic UI Glow Effect (Side-by-Side Mobile & Desktop Layout) */}
          <div className="flex w-full flex-wrap items-center justify-center gap-2.5 px-2 pt-1 sm:w-auto sm:gap-4 sm:px-0">
            <Button
              variant="primary"
              size="lg"
              asChild
              className="gold-glow relative min-h-[42px] w-auto shrink-0 overflow-hidden rounded-full px-5 py-2.5 text-xs font-extrabold whitespace-nowrap hover:scale-105 active:scale-95 sm:min-h-[44px] sm:px-6 sm:py-3 sm:text-sm lg:text-base"
            >
              <Link
                href="/puja-history"
                className="flex items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2"
              >
                <BorderBeam
                  size={120}
                  duration={5}
                  colorFrom="#ffffff"
                  colorTo="#f59e0b"
                />
                <span>Explore History</span>{' '}
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
                href="#schedule"
                className="flex items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2"
              >
                <Calendar className="h-3.5 w-3.5 text-amber-600 sm:h-4 sm:w-4 dark:text-amber-400" />{' '}
                <span>Puja Schedule</span>
              </Link>
            </Button>
          </div>

          {/* Centered Mobile Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-slate-300/80 pt-4 text-[10px] font-bold text-slate-700 sm:gap-x-6 sm:pt-5 sm:text-xs lg:text-sm dark:border-white/15 dark:text-slate-300">
            <span className="flex flex-row items-center justify-center gap-1.5 text-center sm:gap-2">
              <Footprints className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
              <span>1.2M+ Footfalls</span>
            </span>
            <span className="flex flex-row items-center justify-center gap-1.5 text-center sm:gap-2">
              <Award className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span>100+ Awards</span>
            </span>
            <span className="flex flex-row items-center justify-center gap-1.5 text-center sm:gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-400" />
              <span>Station Road, Chandannagar</span>
            </span>
          </div>
        </AnimatedWrapper>
      </HeroSlider>

      {/* HIGH-IMPACT BENTO GRID SHOWCASE SECTION */}
      <Section
        badge="The Madhyanchal Experience"
        title="Artistry, Tradition & Celebration"
        subtitle="Explore what makes our Jagadhatri Puja celebration world-famous"
        className="bg-transparent py-10 sm:py-16 md:py-20"
      >
        <StaggerContainer className="grid grid-cols-1 gap-3.5 sm:gap-6 md:grid-cols-12">
          {/* Bento Box 1: Chandannagar Illumination Showcase (Wide 8-col) */}
          <StaggerItem className="md:col-span-8">
            <div className="group card-glass card-hover-glow relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl border border-slate-200/90 p-4 sm:min-h-[300px] sm:rounded-3xl sm:p-7 dark:border-white/15">
              <BorderBeam
                size={220}
                duration={8}
                colorFrom="#f59e0b"
                colorTo="#fef08a"
              />

              <CockpitImage
                asset="6a27a7be35d02787960e45f0"
                fill
                loaderPlaceholder={false}
                containerClassName="absolute inset-0 size-full"
                className="object-cover object-center brightness-90 filter transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />

              <div className="relative z-10 space-y-2 text-white sm:space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-amber-300 uppercase backdrop-blur-md sm:text-xs">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Iconic
                  Light Tableaux
                </span>

                <h3 className="font-paytone text-lg leading-tight font-bold tracking-tight text-white sm:text-3xl">
                  World-Famous Chandannagar Light Tapestries
                </h3>

                <p className="line-clamp-3 max-w-xl text-xs leading-relaxed font-normal text-slate-300 sm:line-clamp-none sm:text-sm">
                  Chandannagar is globally renowned for its revolutionary light
                  dynamic 3D light illumination art. Every year, Madhyanchal
                  presents spectacular moving light tableaux created by master
                  light artisans of Bengal.
                </p>

                <div className="pt-1 sm:pt-2">
                  <Button
                    variant="primary"
                    size="default"
                    asChild
                    className="min-h-[36px] rounded-full border border-amber-400/60 px-4 text-xs font-bold sm:min-h-[40px] sm:px-5"
                  >
                    <Link href="/gallery" className="gap-1.5 sm:gap-2">
                      Explore Photo Gallery{' '}
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Bento Box 2: Awards & Accolades (4-col) */}
          <StaggerItem className="md:col-span-4">
            <div className="group card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 sm:rounded-3xl sm:p-6 dark:border-white/15">
              <div className="relative z-10 space-y-2 sm:space-y-3">
                {/* Desktop Standalone Top Icon Row */}
                <div className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/15 text-amber-500 transition-transform group-hover:scale-110 sm:flex">
                  <Award className="h-5.5 w-5.5" />
                </div>

                {/* Desktop Stat Row */}
                <div className="hidden items-baseline gap-1 pt-1 sm:flex">
                  <NumberTicker
                    value={100}
                    className="font-paytone bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-3xl font-extrabold text-transparent"
                  />
                  <span className="font-paytone text-3xl font-extrabold text-amber-500">
                    +
                  </span>
                  <span className="ml-1 text-sm font-bold text-slate-400">
                    Trophies
                  </span>
                </div>

                {/* Desktop Title */}
                <h3 className="font-paytone hidden text-base font-bold text-slate-900 sm:block dark:text-slate-100">
                  Prestigious Awards & Honors
                </h3>

                {/* Mobile Compact Inline Title Bar */}
                <div className="flex items-center justify-between sm:hidden">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/15 text-amber-500">
                      <Award className="h-4 w-4" />
                    </div>
                    <h3 className="font-paytone text-xs font-bold text-slate-900 dark:text-slate-100">
                      Awards & Honors
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-0.5">
                    <NumberTicker
                      value={100}
                      className="font-paytone bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-xl font-extrabold text-transparent"
                    />
                    <span className="font-paytone text-xl font-extrabold text-amber-500">
                      +
                    </span>
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed font-normal text-slate-600 sm:text-xs dark:text-slate-400">
                  Recognized repeatedly for artistic excellence, best pandal
                  architecture, eco-conscious initiatives, and cultural impact.
                </p>
              </div>

              <div className="relative z-10 pt-2.5 sm:pt-4">
                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="min-h-[34px] w-full justify-center rounded-full border-slate-300 text-[11px] font-bold sm:min-h-[40px] sm:text-xs dark:border-white/20"
                >
                  <Link href="/awards">View Trophies Showcase</Link>
                </Button>
              </div>
            </div>
          </StaggerItem>

          {/* Bento Box 3: History & Tradition (4-col) */}
          <StaggerItem className="md:col-span-4">
            <div className="group card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 sm:rounded-3xl sm:p-6 dark:border-white/15">
              <div className="space-y-2 sm:space-y-3">
                {/* Desktop Standalone Top Icon Row */}
                <div className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-rose-500/40 bg-rose-500/15 text-rose-500 transition-transform group-hover:scale-110 sm:flex">
                  <History className="h-5.5 w-5.5" />
                </div>

                {/* Desktop Badge */}
                <span className="hidden rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-xs font-bold tracking-wider text-rose-500 uppercase sm:inline-block">
                  Heritage Since 1971
                </span>

                {/* Desktop Title */}
                <h3 className="font-paytone hidden text-base font-bold text-slate-900 sm:block dark:text-slate-100">
                  Over 50 Years of Legacy
                </h3>

                {/* Mobile Compact Inline Title Bar */}
                <div className="flex items-center justify-between sm:hidden">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-500/40 bg-rose-500/15 text-rose-500">
                      <History className="h-4 w-4" />
                    </div>
                    <h3 className="font-paytone text-xs font-bold text-slate-900 dark:text-slate-100">
                      Over 50 Years Legacy
                    </h3>
                  </div>

                  <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-rose-500 uppercase">
                    Since 1971
                  </span>
                </div>

                <p className="text-[11px] leading-relaxed font-normal text-slate-600 sm:text-xs dark:text-slate-400">
                  Discover how Madhyanchal Sarbajanin evolved from a
                  neighborhood gathering into Chandannagar’s most celebrated
                  committee.
                </p>
              </div>

              <div className="pt-2.5 sm:pt-4">
                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="min-h-[34px] w-full justify-center rounded-full border-slate-300 text-[11px] font-bold sm:min-h-[40px] sm:text-xs dark:border-white/20"
                >
                  <Link href="/puja-history">Read Full History</Link>
                </Button>
              </div>
            </div>
          </StaggerItem>

          {/* Bento Box 4: Pandal Location & Travel Guide (Wide 8-col) */}
          <StaggerItem className="md:col-span-8">
            <div
              id="location"
              className="group card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 p-3.5 sm:rounded-3xl sm:p-7 dark:border-white/15"
            >
              <div className="space-y-2 sm:space-y-3">
                {/* Desktop Top Icon Row */}
                <div className="hidden items-center justify-between sm:flex">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-500 transition-transform group-hover:scale-110">
                    <MapPin className="h-5.5 w-5.5" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 backdrop-blur-md dark:text-emerald-400">
                    <Train className="h-3.5 w-3.5" /> 800m from Station
                  </span>
                </div>

                {/* Desktop Title */}
                <h3 className="font-paytone hidden text-xl font-bold text-slate-900 sm:block dark:text-slate-100">
                  Station Road, Chandannagar Puja Ground
                </h3>

                {/* Mobile Compact Inline Title Bar */}
                <div className="flex items-center justify-between sm:hidden">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/15 text-emerald-500">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <h3 className="font-paytone text-xs font-bold text-slate-900 dark:text-slate-100">
                      Station Road, Chandannagar
                    </h3>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[9.5px] font-bold text-emerald-600 backdrop-blur-md dark:text-emerald-400">
                    <Train className="h-3 w-3" /> 800m
                  </span>
                </div>

                <p className="max-w-xl text-[11px] leading-relaxed font-normal text-slate-600 sm:text-xs dark:text-slate-400">
                  Conveniently situated on Station Road, Madhyanchal is easily
                  reachable by local train from Howrah. Continuous toto &
                  rickshaw services operate during festival days.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2.5 sm:gap-3 sm:pt-4">
                <Button
                  variant="primary"
                  size="default"
                  asChild
                  className="min-h-[34px] flex-1 rounded-full border border-amber-400/60 px-3.5 text-[11px] font-bold shadow-none sm:min-h-[40px] sm:flex-initial sm:px-5 sm:text-xs"
                >
                  <a
                    href="https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-center gap-1.5"
                  >
                    <Compass className="h-3.5 w-3.5" />{' '}
                    <span className="sm:hidden">Google Maps</span>
                    <span className="hidden sm:inline">
                      Open in Google Maps
                    </span>
                  </a>
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  asChild
                  className="min-h-[34px] flex-1 rounded-full border-slate-300 px-3.5 text-[11px] font-bold sm:min-h-[40px] sm:flex-initial sm:px-5 sm:text-xs dark:border-white/20"
                >
                  <Link href="/contact-us">
                    <span className="sm:hidden">Contact Us</span>
                    <span className="hidden sm:inline">Contact Organizers</span>
                  </Link>
                </Button>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Section>

      {/* HIGH-IMPACT STATISTICS COUNTER CONSOLE SECTION */}
      <Section
        badge="Madhyanchal At A Glance"
        title="Impact, Grandeur & Global Reach"
        subtitle="Quantifying five decades of cultural heritage, community devotion, and artistic acclaim"
        className="relative overflow-hidden bg-transparent py-14 sm:py-20 md:py-24"
      >
        <AnimatedWrapper
          direction="up"
          className="relative z-10 mx-auto max-w-7xl"
        >
          {/* Main Floating Glass Console Capsule */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/80 backdrop-blur-2xl transition-all duration-500 sm:rounded-3xl dark:border-white/15 dark:bg-stone-900/80">
            <BorderBeam
              size={250}
              duration={10}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />

            <div className="grid grid-cols-2 divide-x divide-y divide-slate-200/80 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 dark:divide-white/10">
              {statItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between p-3.5 transition-colors duration-300 hover:bg-amber-500/10 sm:p-7 dark:hover:bg-amber-500/15"
                  >
                    <div className="space-y-1.5 sm:space-y-3">
                      {/* Top Accent Pill Indicator */}
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/80 sm:h-11 sm:w-11 sm:rounded-2xl dark:border-white/10 ${item.badgeColor} transition-transform group-hover:scale-110`}
                        >
                          <Icon className="h-4 w-4 sm:h-5.5 sm:w-5.5" />
                        </div>
                        <span className="text-[9px] font-extrabold tracking-wider text-slate-400 uppercase sm:text-[10px] dark:text-slate-500">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Display Stat Number */}
                      <div className="pt-1 sm:pt-2">
                        <span
                          className={`bg-gradient-to-r ${item.color} font-paytone bg-clip-text text-2xl font-bold text-transparent sm:text-4xl`}
                        >
                          {item.stat}
                        </span>
                      </div>

                      {/* Stat Title */}
                      <h3 className="font-paytone text-xs font-semibold text-slate-900 sm:text-base dark:text-slate-100">
                        {item.title}
                      </h3>

                      {/* Stat Description */}
                      <p className="text-[10px] leading-tight text-slate-500 sm:text-xs sm:leading-relaxed dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedWrapper>
      </Section>

      {/* 1. COUNTDOWN 2026 STANDALONE SECTION WITH DISTINCT BACKGROUND */}
      <Section
        id="schedule"
        badge="✦ FESTIVAL CALENDAR & CHRONOMETER ✦"
        title={`Countdown ${currentYear}`}
        subtitle="Mark your calendars for Chandannagar's grandest festival experience."
        className="border-y border-amber-500/20 bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-amber-50/50 py-14 backdrop-blur-md transition-colors sm:py-20 md:py-24 dark:border-amber-500/20 dark:from-amber-950/40 dark:via-stone-900/90 dark:to-stone-950"
      >
        <AnimatedWrapper
          direction="up"
          className="relative z-10 mx-auto max-w-7xl"
        >
          <FestivalScheduleShowcase
            dates={dates}
            targetPujaDate={targetPujaDate}
          />

          <div className="mt-6 flex justify-center sm:mt-8">
            <Button
              variant="primary"
              size="default"
              asChild
              className="min-h-[40px] rounded-full border border-amber-400/60 px-6 text-xs font-bold shadow-none sm:min-h-[44px] sm:px-8 sm:text-sm"
            >
              <Link href="/schedule" className="gap-2">
                <Calendar className="h-4 w-4 text-slate-950" />
                <span>Explore Full Festival Schedule</span>
                <ChevronRight className="h-4 w-4 text-slate-950" />
              </Link>
            </Button>
          </div>
        </AnimatedWrapper>
      </Section>

      {/* 2. PHOTOS & VIDEOS SHOWCASE SECTION (TOGETHER RIGHT AFTER COUNTDOWN) */}
      <Section
        badge="✦ VISUAL & VIDEO GALLERY ✦"
        title="Pandal Architecture & Celebrations"
        subtitle="Explore our iconic craftsmanship, light tapestries, and video archives"
        className="relative bg-transparent pt-10 pb-20 sm:pt-20 sm:pb-24 lg:py-24"
      >
        {/* Gallery Slider Highlights */}
        {sliderImages.length > 0 && (
          <AnimatedWrapper
            direction="up"
            className="relative z-10 mx-auto max-w-7xl"
          >
            <GallerySlider slides={sliderImages} />
          </AnimatedWrapper>
        )}

        {/* Video Showcase */}
        <AnimatedWrapper direction="up" delay={0.2} className="mt-12 sm:mt-20">
          {/* Sub-Header for Video Archive */}
          <div className="mb-6 space-y-1 text-center sm:mb-8">
            <span className="text-[10px] font-extrabold tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Official Video Archive
            </span>
            <h3 className="font-paytone text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
              Glimpses of Celebrations
            </h3>
          </div>
          <Videos items={videos} />
        </AnimatedWrapper>
      </Section>
    </div>
  );
}
