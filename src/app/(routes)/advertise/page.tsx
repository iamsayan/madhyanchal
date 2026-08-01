import type { Metadata } from 'next';

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
  title: 'Advertise with Us | Madhyanchal Sarbajanin Chandannagar',
  description:
    'Partner with Madhyanchal Sarbajanin in Chandannagar. Elevate your brand with 500,000+ footfall, prime Station Road location, and 60-day pre-event branding.',
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
      'Partner with Madhyanchal Sarbajanin to reach 500,000+ visitors on Chandannagar’s busiest festival corridor.',
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
      metric: '500,000+',
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
      title: 'Pre-Event Exposure',
      subtitle: '60-Day Pandal Wrapper Ads',
      description:
        'Get noticed 2 months before the festival with pandal wrapper branding during construction.',
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

  const pastAdvertisers = [
    { name: 'Illuminated Gate Branding', path: '/lighting-tableau.png' },
    { name: 'Station Road Hoardings', path: '/hero-pandal.png' },
    { name: 'Pandal Wrapper Branding', path: '/chandannagar-tableau.png' },
  ];

  return (
    <PageLayout
      title="Amplify Your Brand With Us"
      subtitle="Since 1971, Madhyanchal Sarbajanin has drawn massive audiences on Chandannagar’s Station Road. Partner with us to reach over 500,000+ engaged attendees."
      badge={{
        text: 'Brand Sponsorship & Media Kit',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Advertise"
      headerContent={
        <div className="flex w-full flex-col items-center gap-3 pt-2 sm:w-auto sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            asChild
            className="min-h-[42px] w-full rounded-full px-6 text-xs font-bold sm:w-auto sm:text-sm"
          >
            <a
              href="#brochure"
              className="flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" /> Download Media Kit
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="min-h-[42px] w-full rounded-full border-slate-300 px-6 text-xs font-bold sm:w-auto sm:text-sm dark:border-white/20"
          >
            <a
              href="#contact-desk"
              className="flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4 text-amber-500" /> Contact Sponsorship
              Desk
            </a>
          </Button>
        </div>
      }
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-10 sm:space-y-16">
        {/* AUDIENCE DEMOGRAPHICS DASHBOARD DOCK */}
        <AnimatedWrapper direction="up">
          <div className="card-glass card-hover-glow relative overflow-hidden rounded-xl border border-slate-200/90 p-5 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
            <BorderBeam
              size={180}
              duration={8}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />

            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              {/* Left Demographics Visual */}
              <div className="w-full space-y-4 md:w-1/2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  <h2 className="font-paytone text-lg text-slate-900 sm:text-2xl dark:text-white">
                    Audience Demographics & Reach
                  </h2>
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
                    500,000+
                  </span>
                  <span className="mt-0.5 block text-[10px] font-bold tracking-wider text-slate-700 uppercase sm:text-xs dark:text-slate-300">
                    Annual Footfall
                  </span>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center sm:p-5">
                  <span className="font-paytone text-xl text-emerald-700 sm:text-3xl dark:text-emerald-300">
                    60 Days
                  </span>
                  <span className="mt-0.5 block text-[10px] font-bold tracking-wider text-slate-700 uppercase sm:text-xs dark:text-slate-300">
                    Pre-Event Ads
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

        {/* PAST ADVERTISERS & BRAND SHOWCASE (Horizontal Touch Carousel) */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <h3 className="font-paytone text-base text-slate-900 sm:text-xl dark:text-white">
              Previous Brand Showcase
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Explore illuminated gates, hoardings, and wrapper branding from
              past editions.
            </p>
          </AnimatedWrapper>

          <AdvertiserSlider slides={pastAdvertisers} />
        </div>

        {/* OFFICIAL BROCHURE & CONTACT DOCK */}
        <div id="contact-desk" className="pt-4">
          <AnimatedWrapper direction="up">
            <div className="relative space-y-6 overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-5 backdrop-blur-2xl sm:space-y-8 sm:rounded-3xl sm:p-10 dark:from-amber-500/15 dark:via-stone-950 dark:to-amber-500/15">
              <div className="mx-auto max-w-xl space-y-2 text-center">
                <h2 className="font-paytone text-xl text-slate-900 sm:text-3xl dark:text-white">
                  Let’s Create Something{' '}
                  <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
                    Extraordinary
                  </span>{' '}
                  Together
                </h2>
                <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                  Connect directly with our festival sponsorship desk to reserve
                  premium hoardings, gate branding, or custom brand stalls.
                </p>
              </div>

              <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 md:grid-cols-2">
                {/* Left Column: Direct Contacts */}
                <div className="flex flex-col justify-between space-y-4 rounded-xl border border-slate-200/90 bg-white/70 p-4 backdrop-blur-xl sm:rounded-2xl sm:p-6 dark:border-white/12 dark:bg-stone-900/70">
                  <h3 className="font-paytone flex items-center gap-2 text-base text-slate-900 sm:text-lg dark:text-white">
                    <Phone className="h-4 w-4 text-amber-500" /> Direct
                    Sponsorship Desk
                  </h3>

                  <div className="space-y-3 text-xs text-slate-700 sm:text-sm dark:text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">
                          Address
                        </strong>
                        <span>
                          Station Road, Chandannagar, Hooghly – 712136
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
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

                    <div className="space-y-1.5 pt-1">
                      <strong className="block text-slate-900 dark:text-white">
                        Phone Contacts
                      </strong>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <a
                          href="tel:+919051300020"
                          className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-bold text-amber-700 hover:bg-amber-500/20 dark:text-amber-300"
                        >
                          Raja Dutta: +91-9051300020
                        </a>
                        <a
                          href="tel:+918599918394"
                          className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-bold text-amber-700 hover:bg-amber-500/20 dark:text-amber-300"
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
                  className="flex flex-col justify-between space-y-4 rounded-xl border border-slate-200/90 bg-white/70 p-4 backdrop-blur-xl sm:rounded-2xl sm:p-6 dark:border-white/12 dark:bg-stone-900/70"
                >
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <FileText className="h-5 w-5" />
                      <h3 className="font-paytone text-base text-slate-900 sm:text-lg dark:text-white">
                        Download Media Kit
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                      Get our official sponsorship brochure detailing floor
                      plans, illuminated gate dimensions, wrapper advertising
                      schedules, and package pricing.
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    asChild
                    className="min-h-[44px] w-full rounded-xl px-2.5 text-[11px] font-bold shadow-md sm:px-6 sm:text-sm"
                  >
                    <a
                      href="https://assets.madhyanchalsarbajanin.co.in/brochure.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2"
                    >
                      <Download className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />{' '}
                      Download Brochure (PDF){' '}
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                    </a>
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
