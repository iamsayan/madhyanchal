import type { Metadata } from 'next';

import Link from 'next/link';

import { AdvertiserSlider } from '@/components/features/advertiser-slider';
import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';

import {
  ArrowUpRight,
  Building,
  Download,
  FileText,
  Footprints,
  Gift,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advertise with Us',
  description:
    'Partner with Madhyanchal Sarbajanin in Chandannagar. Elevate your brand with 1.2M+ footfall and prime Station Road festival branding.',
  keywords: [
    'advertise jagadhatri puja',
    'chandannagar puja sponsorship',
    'madhyanchal advertising',
    'jagadhatri puja sponsor',
    'chandannagar festival advertising',
    'station road sponsorship',
  ],
  openGraph: {
    title: 'Advertise with Us | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Partner with Madhyanchal Sarbajanin to reach 1.2M+ visitors on Chandannagar’s busiest festival corridor.',
    url: '/advertise',
    type: 'website',
  },
  alternates: {
    canonical: '/advertise',
  },
};

export default function AdvertisePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.madhyanchalsarbajanin.co.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Advertise with Us',
            item: 'https://www.madhyanchalsarbajanin.co.in/advertise',
          },
        ],
      },
      {
        '@type': 'Service',
        name: 'Brand Sponsorship & Advertising - Madhyanchal Sarbajanin Jagadhatri Puja',
        provider: {
          '@type': 'Organization',
          name: 'Madhyanchal Sarbajanin',
          url: 'https://www.madhyanchalsarbajanin.co.in',
        },
        areaServed: 'Chandannagar, Hooghly, West Bengal',
        description:
          'Sponsorship, illuminated gate branding, pandal wrapper ads, and direct marketing stalls during Chandannagar Jagadhatri Puja.',
      },
    ],
  };

  const whyChooseUs = [
    {
      title: 'High Footfall',
      metric: '1.2M+',
      description:
        'Over 5 lakh visitors attend our pandal each year, creating unmatched visibility for your brand.',
      icon: Footprints,
    },
    {
      title: 'Prime Location',
      metric: 'Station Road',
      description:
        'Situated on Chandannagar’s bustling Station Road, our pandal guarantees consistent foot traffic.',
      icon: MapPin,
    },
    {
      title: 'Brand Visibility',
      metric: 'Max Reach',
      description:
        'Expand your reach to a diverse, engaged audience across physical and digital media channels.',
      icon: TrendingUp,
    },
    {
      title: 'Enhanced Credibility',
      metric: 'Heritage 1971',
      description:
        'Partnering with an iconic 50+ year heritage festival boosts consumer trust and brand recall.',
      icon: ShieldCheck,
    },
    {
      title: 'Cost-Effective ROI',
      metric: 'High Value',
      description:
        'Maximize marketing ROI by delivering direct impressions at competitive sponsorship tiers.',
      icon: Zap,
    },
    {
      title: 'Real-Time Interaction',
      metric: 'Direct Stalls',
      description:
        'Engage directly with visitors through sampling, live product demos, and promotional activities.',
      icon: Target,
    },
  ];

  const sponsorshipBenefits = [
    {
      title: 'Prominent Placement',
      subtitle: 'Banners, Gates & Hoardings',
      description:
        'Your illuminated gates, banners, and hoardings placed in high-visibility festival corridors.',
      icon: Building,
    },
    {
      title: 'Festival Exposure',
      subtitle: 'Pandal Wrapper & Banner Ads',
      description:
        'Get maximum visibility during festival days with custom pandal wrapper and banner placement.',
      icon: Sparkles,
    },
    {
      title: 'Interactive Spaces',
      subtitle: 'Exclusive Brand Stalls',
      description:
        'Dedicated promotional zones allowing direct customer interaction and sample distribution.',
      icon: Users,
    },
    {
      title: 'Branding Opportunities',
      subtitle: 'Merchandise & Gift Partners',
      description:
        'Distribute co-branded merchandise, special offers, and digital vouchers to attendees.',
      icon: Gift,
    },
  ];

  const advertisingZones = [
    {
      zone: 'Zone A',
      badge: 'Zone A • Station Entrance',
      title: 'Station Road Welcome Gate',
      highlight: 'Grand Station Entrance Gate',
      description:
        'Situated at Chandannagar Station Road entry point. Guarantees 100% immediate crowd visibility for every festival visitor entering the zone.',
      features: [
        'Grand Illuminated Gate',
        '100% Entry Footfall Exposure',
        'High Eye-Level Dwell Time',
      ],
      accentColor:
        'border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent dark:border-amber-500/30 dark:bg-stone-900/90',
      badgeColor:
        'border-amber-500/40 bg-amber-500/20 text-amber-700 dark:text-amber-300',
    },
    {
      zone: 'Zone B',
      badge: 'Zone B • Approach Corridor',
      title: 'Station Road Main Corridor',
      highlight: 'High-Density Banners & Hoardings',
      description:
        'Continuous high-traffic festival approach corridor where visitors move at walking speed, offering ~15 mins eye-level contact time.',
      features: [
        'Double-Sided Roadside Hoardings',
        'High-Density Banner Arrays',
        '1.2M+ Total Dwell Exposure',
      ],
      accentColor:
        'border-rose-500/40 bg-gradient-to-br from-rose-500/15 via-rose-500/5 to-transparent dark:border-rose-500/30 dark:bg-stone-900/90',
      badgeColor:
        'border-rose-500/40 bg-rose-500/20 text-rose-700 dark:text-rose-300',
    },
    {
      zone: 'Zone C',
      badge: 'Zone C • Main Pandal Arena',
      title: 'Main Pandal & Direct Brand Stalls',
      highlight: 'Main Pandal Area & Direct Stalls',
      description:
        'Direct customer engagement area surrounding the main pandal structure with options for wrapper ads, sampling & live product demo stalls.',
      features: [
        'Custom Pandal Wrapper Branding',
        'Direct Interactive Brand Stalls',
        'Live Product Sampling & Demos',
      ],
      accentColor:
        'border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent dark:border-emerald-500/30 dark:bg-stone-900/90',
      badgeColor:
        'border-emerald-500/40 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
    },
  ];

  const pastAdvertisers = [
    { name: 'Illuminated Gate Branding', path: '/lighting-tableau.png' },
    { name: 'Station Road Hoardings', path: '/hero-pandal.png' },
    { name: 'Pandal Wrapper Branding', path: '/kaporerpatty-jagadhatri-1970' },
  ];

  return (
    <PageLayout
      title="Amplify Your Brand With Us"
      subtitle="Since 1971, Madhyanchal Sarbajanin has drawn massive audiences on Chandannagar’s Station Road. Partner with us to reach over 1.2M+ engaged attendees."
      badge={{
        text: 'Brand Sponsorship & Media Kit',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Advertise"

      scriptJsonLd={jsonLd}
    >
      <div className="space-y-10 sm:space-y-16">
        {/* AUDIENCE DEMOGRAPHICS DASHBOARD DOCK */}
        <AnimatedWrapper direction="up">
          <div className="card-glass card-hover-glow relative overflow-hidden rounded-xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
            <BorderBeam
              size={180}
              duration={8}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />

            <div className="flex flex-col items-center justify-between gap-4 sm:gap-8 md:flex-row">
              {/* Left Demographics Visual */}
              <div className="w-full space-y-3.5 md:w-1/2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  <h3 className="font-paytone text-base text-slate-900 sm:text-2xl dark:text-white">
                    Audience Demographics & Reach
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                  Our festival attracts a balanced mix of tech-savvy youth and
                  purchasing family decision-makers across West Bengal.
                </p>

                {/* Progress Bars */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span>Youth & Gen-Z (Tech-Savvy Target)</span>
                      <span className="font-extrabold text-amber-600 dark:text-amber-400">
                        58%
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full border border-amber-500/20 bg-slate-200 p-0.5 dark:bg-stone-900">
                      <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-amber-500 to-yellow-400" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span>Family Groups (Household Decision Makers)</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                        42%
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full border border-emerald-500/20 bg-slate-200 p-0.5 dark:bg-stone-900">
                      <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Key Metrics Grid */}
              <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:w-1/2">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-center sm:p-5">
                  <span className="font-paytone text-xl text-amber-700 sm:text-3xl dark:text-amber-300">
                    1.2M+
                  </span>
                  <span className="mt-0.5 block text-[10px] font-bold tracking-wider text-slate-700 uppercase sm:text-xs dark:text-slate-300">
                    Annual Footfall
                  </span>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center sm:p-5">
                  <span className="font-paytone text-xl text-emerald-700 sm:text-3xl dark:text-emerald-300">
                    5+ Days
                  </span>
                  <span className="mt-0.5 block text-[10px] font-bold tracking-wider text-slate-700 uppercase sm:text-xs dark:text-slate-300">
                    Peak Visibility
                  </span>
                </div>

                <div className="col-span-2 rounded-xl border border-slate-300/80 bg-slate-100/80 p-3.5 text-center sm:p-5 dark:border-white/15 dark:bg-stone-900/80">
                  <span className="font-paytone text-base text-slate-900 sm:text-xl dark:text-white">
                    Station Road Corridor
                  </span>
                  <span className="mt-0.5 block text-[10px] font-medium text-slate-600 sm:text-xs dark:text-slate-400">
                    High-density festival corridor with maximum brand dwell time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedWrapper>

        {/* 5-DAY FESTIVAL PEAK FOOTFALL BAR CHART DOCK */}
        <AnimatedWrapper direction="up">
          <div className="card-glass card-hover-glow relative overflow-hidden rounded-xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
            <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                  <h3 className="font-paytone text-base text-slate-900 sm:text-2xl dark:text-white">
                    5-Day Festival Peak Footfall
                  </h3>
                </div>
                <p className="mt-0.5 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                  Daily visitor distribution across Jagadhatri Puja festival
                  days on Station Road
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-[11px] font-black text-amber-700 dark:text-amber-300">
                ⭐ Peak: Nabami (350K+ Visitors)
              </span>
            </div>

            {/* BAR CHART GRAPH DISPLAY */}
            <div className="relative pt-4">
              {/* Background Grid Lines */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-15">
                <div className="border-b border-dashed border-slate-400 dark:border-slate-500" />
                <div className="border-b border-dashed border-slate-400 dark:border-slate-500" />
                <div className="border-b border-dashed border-slate-400 dark:border-slate-500" />
                <div className="border-b border-dashed border-slate-400 dark:border-slate-500" />
              </div>

              {/* 5 Bars Grid */}
              <div className="relative grid grid-cols-5 gap-2 text-center sm:gap-6">
                {/* Shasthi */}
                <div className="group flex flex-col items-center">
                  <div className="flex h-9 flex-col items-center justify-end pb-1">
                    <span className="text-[10px] font-extrabold text-slate-600 sm:text-xs dark:text-slate-300">
                      150K
                    </span>
                  </div>
                  <div className="relative flex h-36 w-full items-end sm:h-44">
                    <div className="relative h-[43%] w-full rounded-t-xl bg-gradient-to-t from-amber-500/20 via-amber-500/60 to-amber-500 transition-all duration-500 group-hover:brightness-125" />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-slate-800 sm:text-xs dark:text-slate-200">
                    Shasthi
                  </span>
                </div>

                {/* Saptami */}
                <div className="group flex flex-col items-center">
                  <div className="flex h-9 flex-col items-center justify-end pb-1">
                    <span className="text-[10px] font-extrabold text-slate-600 sm:text-xs dark:text-slate-300">
                      220K
                    </span>
                  </div>
                  <div className="relative flex h-36 w-full items-end sm:h-44">
                    <div className="relative h-[63%] w-full rounded-t-xl bg-gradient-to-t from-amber-500/20 via-amber-500/70 to-amber-500 transition-all duration-500 group-hover:brightness-125" />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-slate-800 sm:text-xs dark:text-slate-200">
                    Saptami
                  </span>
                </div>

                {/* Ashtami */}
                <div className="group flex flex-col items-center">
                  <div className="flex h-9 flex-col items-center justify-end pb-1">
                    <span className="text-[10px] font-black text-amber-600 sm:text-xs dark:text-amber-400">
                      320K
                    </span>
                  </div>
                  <div className="relative flex h-36 w-full items-end sm:h-44">
                    <div className="relative h-[90%] w-full rounded-t-xl bg-gradient-to-t from-amber-500/30 via-amber-500 to-amber-400 transition-all duration-500 group-hover:brightness-125" />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-slate-800 sm:text-xs dark:text-slate-200">
                    Ashtami
                  </span>
                </div>

                {/* Nabami (Peak) */}
                <div className="group flex flex-col items-center">
                  <div className="flex h-9 flex-col items-center justify-end pb-1">
                    <span className="py-0.2 rounded-full bg-amber-500 px-1.5 text-[8px] font-black text-slate-950 shadow-none sm:text-[9.5px]">
                      PEAK
                    </span>
                    <span className="text-[10px] font-black text-amber-600 sm:text-xs dark:text-amber-400">
                      350K+
                    </span>
                  </div>
                  <div className="relative flex h-36 w-full items-end sm:h-44">
                    <div className="relative h-[100%] w-full rounded-t-xl bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-300 transition-all duration-500 group-hover:brightness-125" />
                  </div>
                  <span className="mt-2 text-[10px] font-extrabold text-amber-600 sm:text-xs dark:text-amber-400">
                    Nabami
                  </span>
                </div>

                {/* Dashami */}
                <div className="group flex flex-col items-center">
                  <div className="flex h-9 flex-col items-center justify-end pb-1">
                    <span className="text-[10px] font-extrabold text-slate-600 sm:text-xs dark:text-slate-300">
                      210K
                    </span>
                  </div>
                  <div className="relative flex h-36 w-full items-end sm:h-44">
                    <div className="relative h-[60%] w-full rounded-t-xl bg-gradient-to-t from-amber-500/20 via-amber-500/65 to-amber-500 transition-all duration-500 group-hover:brightness-125" />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-slate-800 sm:text-xs dark:text-slate-200">
                    Dashami
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Chart Footer Summary */}
            <div className="mt-5 flex flex-col items-center justify-between gap-2.5 border-t border-slate-200/80 pt-4 sm:flex-row dark:border-white/10">
              <span className="text-xs text-slate-600 sm:text-xs dark:text-slate-300">
                ✦ Continuous foot traffic along Chandannagar Station Road
                throughout day & night
              </span>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                Total Estimated Reach: 1.25M+ Visitors
              </span>
            </div>
          </div>
        </AnimatedWrapper>

        {/* WHY CHOOSE US GRID (Compact 2-Column Mobile Grid) */}
        <div className="space-y-4 sm:space-y-8">
          <AnimatedWrapper
            direction="up"
            className="space-y-1 text-center sm:space-y-2"
          >
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Strategic Advantage
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Why Partner With Madhyanchal?
            </h2>
          </AnimatedWrapper>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <AnimatedWrapper
                  key={item.title}
                  direction="up"
                  delay={idx * 0.05}
                >
                  <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-6 dark:border-white/12">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/15 font-black text-amber-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-amber-400">
                          <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        </div>
                        <span className="truncate rounded-full border border-amber-500/30 bg-amber-500/15 px-1.5 py-0.5 text-[8.5px] font-black text-amber-700 uppercase sm:text-[10px] dark:text-amber-300">
                          {item.metric}
                        </span>
                      </div>
                      <h3 className="font-paytone text-xs leading-snug text-slate-900 sm:text-lg dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-[10px] leading-tight font-normal text-slate-600 sm:text-xs sm:leading-relaxed dark:text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>

        {/* EXCLUSIVE SPONSORSHIP BENEFITS GRID (Compact 2-Column Mobile Grid) */}
        <div className="space-y-4 sm:space-y-8">
          <AnimatedWrapper
            direction="up"
            className="space-y-1 text-center sm:space-y-2"
          >
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Placement & Visibility
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Exclusive Sponsorship Assets
            </h2>
          </AnimatedWrapper>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {sponsorshipBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <AnimatedWrapper
                  key={benefit.title}
                  direction="up"
                  delay={idx * 0.05}
                >
                  <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-6 dark:border-white/12">
                    <div className="space-y-1.5 sm:space-y-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/15 font-black text-emerald-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-emerald-400">
                        <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                      </div>
                      <h3 className="font-paytone text-xs leading-snug text-slate-900 sm:text-base dark:text-white">
                        {benefit.title}
                      </h3>
                      <span className="block truncate text-[8.5px] font-bold text-amber-600 sm:text-[10px] dark:text-amber-400">
                        ✦ {benefit.subtitle}
                      </span>
                      <p className="text-[10px] leading-tight font-normal text-slate-600 sm:text-xs sm:leading-relaxed dark:text-slate-300">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>

        {/* PRIME ADVERTISING HOTSPOTS & ZONE MAP */}
        <div className="space-y-4 sm:space-y-8">
          <AnimatedWrapper
            direction="up"
            className="space-y-1 text-center sm:space-y-2"
          >
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Corridors & Hotspots
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Prime Advertising Zones
            </h2>
            <p className="mx-auto max-w-xl text-xs text-slate-600 sm:text-sm dark:text-slate-300">
              Strategic high-visibility branding locations across Chandannagar
              Station Road
            </p>
          </AnimatedWrapper>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
            {advertisingZones.map((zoneItem, idx) => (
              <AnimatedWrapper
                key={zoneItem.zone}
                direction="up"
                delay={idx * 0.08}
              >
                <div
                  className={`card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-xl border p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-6 ${zoneItem.accentColor}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[9.5px] font-black uppercase sm:text-xs ${zoneItem.badgeColor}`}
                      >
                        {zoneItem.badge}
                      </span>
                      <MapPin className="h-4 w-4 shrink-0 text-amber-500" />
                    </div>

                    <div>
                      <h3 className="font-paytone text-sm text-slate-900 sm:text-lg dark:text-white">
                        {zoneItem.title}
                      </h3>
                      <p className="mt-1 text-[11px] font-extrabold text-amber-600 sm:text-xs dark:text-amber-400">
                        ✦ {zoneItem.highlight}
                      </p>
                    </div>

                    <p className="text-[11px] leading-relaxed text-slate-600 sm:text-xs dark:text-slate-300">
                      {zoneItem.description}
                    </p>

                    <div className="space-y-1.5 border-t border-slate-200/60 pt-3 dark:border-white/10">
                      {zoneItem.features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-center gap-2 text-[10.5px] font-bold text-slate-800 dark:text-slate-200"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </div>

        {/* OFFICIAL BROCHURE & CONTACT DOCK (NATIVE COMPACT ON MOBILE) */}
        <div id="contact-desk" className="pt-2 sm:pt-4">
          <AnimatedWrapper direction="up">
            <div className="relative space-y-4 overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-3.5 backdrop-blur-2xl sm:space-y-8 sm:rounded-3xl sm:p-10 dark:from-amber-500/15 dark:via-stone-950 dark:to-amber-500/15">
              <div className="mx-auto max-w-xl space-y-1.5 text-center">
                <h2 className="font-paytone text-base text-slate-900 sm:text-3xl dark:text-white">
                  Let’s Create Something{' '}
                  <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
                    Extraordinary
                  </span>{' '}
                  Together
                </h2>
                <p className="text-[10.5px] leading-tight text-slate-600 sm:text-sm dark:text-slate-300">
                  Connect directly with our festival sponsorship desk to reserve
                  premium hoardings, gate branding, or custom brand stalls.
                </p>
              </div>

              <div className="grid grid-cols-1 items-stretch gap-3 sm:gap-8 md:grid-cols-2">
                {/* Left Column: Direct Contacts */}
                <div className="flex flex-col justify-between space-y-3 rounded-xl border border-slate-200/90 bg-white/70 p-3 backdrop-blur-xl sm:rounded-2xl sm:p-6 dark:border-white/12 dark:bg-stone-900/70">
                  <h3 className="font-paytone flex items-center gap-2 text-sm text-slate-900 sm:text-lg dark:text-white">
                    <Phone className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />{' '}
                    Direct Sponsorship Desk
                  </h3>

                  <div className="space-y-2 text-[11px] text-slate-700 sm:space-y-3 sm:text-sm dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Address
                        </strong>
                        <span>
                          Station Road, Chandannagar, Hooghly – 712136
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Email
                        </strong>
                        <a
                          href="mailto:jagatdhatri.madhyanchal@gmail.com"
                          className="break-all text-amber-600 hover:underline dark:text-amber-400"
                        >
                          jagatdhatri.madhyanchal@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="space-y-1 pt-0.5">
                      <strong className="block text-slate-900 dark:text-white">
                        Phone Contacts
                      </strong>
                      <div className="flex flex-wrap gap-1.5 text-[10.5px] sm:text-xs">
                        <a
                          href="tel:+919051300020"
                          className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-bold text-amber-700 hover:bg-amber-500/20 dark:text-amber-300"
                        >
                          Raja Dutta: +91-9051300020
                        </a>
                        <a
                          href="tel:+918599918394"
                          className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-bold text-amber-700 hover:bg-amber-500/20 dark:text-amber-300"
                        >
                          Avik Sarkar: +91-8599918394
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Official Brochure Download */}
                <div
                  id="brochure"
                  className="flex flex-col justify-between space-y-3 rounded-xl border border-slate-200/90 bg-white/70 p-3 backdrop-blur-xl sm:rounded-2xl sm:p-6 dark:border-white/12 dark:bg-stone-900/70"
                >
                  <div>
                    <div className="mb-1.5 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                      <h3 className="font-paytone text-sm text-slate-900 sm:text-lg dark:text-white">
                        Download Media Kit
                      </h3>
                    </div>
                    <p className="text-[10.5px] leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                      Get our official sponsorship brochure detailing floor
                      plans, illuminated gate dimensions, and souvenir
                      advertising options (available on request).
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    asChild
                    className="min-h-[38px] w-full rounded-xl px-2.5 text-[10.5px] font-bold shadow-none sm:min-h-[44px] sm:px-6 sm:text-sm"
                  >
                    <Link
                      href="/contact-us"
                      className="flex items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2"
                    >
                      <Download className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />{' '}
                      Request Media Kit (Contact Us){' '}
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </PageLayout>
  );
}
