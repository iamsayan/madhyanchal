import type { Metadata } from 'next';

import { AdvertiserSlider } from '@/components/features/advertiser-slider';
import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';

import {
  Droplet,
  Heart,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Social Activities & Community Initiatives | Madhyanchal Sarbajanin',
  description:
    'Discover the year-round social initiatives of Madhyanchal Sarbajanin—from orphanage Kali Puja celebrations to COVID vaccination camps and blood donation drives.',
  keywords: [
    'madhyanchal social activities',
    'chandannagar community service',
    'blood donation camp chandannagar',
    'jagadhatri puja samity social work',
    'health camp chandannagar',
    'prabartak seba niketan',
  ],
  openGraph: {
    title: 'Social Activities | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Year-round social initiatives including healthcare camps, blood donation, youth art competitions, and orphanage outreach.',
    url: '/activities',
    type: 'website',
  },
  alternates: {
    canonical: '/activities',
  },
};

export default function ActivitiesPage() {
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
            name: 'Social Activities',
            item: 'https://www.madhyanchalsarbajanin.co.in/activities',
          },
        ],
      },
      {
        '@type': 'Service',
        name: 'Madhyanchal Social Activities & Community Welfare',
        provider: {
          '@type': 'Organization',
          name: 'Madhyanchal Sarbajanin',
        },
        description:
          'Health camps, blood & eye donation, COVID-19 vaccination drives, youth drawing competitions, and orphanage care.',
      },
    ],
  };

  const initiatives = [
    {
      title: 'Kali Puja Celebration with Orphanage Children',
      badge: 'Community Outreach',
      icon: Heart,
      badgeBg: 'bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-300',
      iconColor: 'text-red-500',
      description:
        'Every year during Kali Puja, our members celebrate with the children of Prabartak Seba Niketan orphanage, sharing festive joy, warmth, food, and memorable moments.',
      slides: [
        {
          name: 'Prabartak Seba Niketan Celebration',
          path: '/hero-pandal.png',
        },
        { name: 'Gift Distribution & Dinner', path: '/lighting-tableau.png' },
        {
          name: 'Festive Joy with Children',
          path: '/kaporerpatty-jagadhatri-1970',
        },
      ],
    },
    {
      title: 'Health Camps & Medical Assistance',
      badge: 'Healthcare & Vaccines',
      icon: Stethoscope,
      badgeBg:
        'bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300',
      iconColor: 'text-blue-500',
      description:
        'Free medical checkups and medicine distribution for the underprivileged. During COVID-19, we set up a mega Vaccination Camp with R. N. Tagore Hospital, serving 520+ individuals.',
      slides: [
        { name: 'Free Health Checkup Camp', path: '/lighting-tableau.png' },
        {
          name: 'R.N. Tagore Covid Vaccination Drive (520+ Served)',
          path: '/hero-pandal.png',
        },
        {
          name: 'Medicine Distribution',
          path: '/kaporerpatty-jagadhatri-1970',
        },
      ],
    },
    {
      title: 'Blood & Eye Donation Camps',
      badge: 'Life-Saving Drives',
      icon: Droplet,
      badgeBg:
        'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
      iconColor: 'text-emerald-500',
      description:
        'Running continuously since 2016, our voluntary Blood Donation and Eye Donation camps provide vital medical lifelines to local hospitals and emergency care units.',
      slides: [
        {
          name: 'Annual Blood Donation Camp',
          path: '/kaporerpatty-jagadhatri-1970',
        },
        { name: 'Eye Donation Pledge & Drive', path: '/lighting-tableau.png' },
        { name: 'Community Volunteer Support', path: '/hero-pandal.png' },
      ],
    },
    {
      title: 'Youth Drawing & Art Competitions',
      badge: 'Youth & Creativity',
      icon: Palette,
      badgeBg:
        'bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300',
      iconColor: 'text-purple-500',
      description:
        'Fostering young artistic talent through annual Sit & Draw competitions for children, encouraging creativity, cultural expression, and community camaraderie.',
      slides: [
        { name: 'Annual Children Art Competition', path: '/hero-pandal.png' },
        {
          name: 'Prize & Certificate Ceremony',
          path: '/kaporerpatty-jagadhatri-1970',
        },
        { name: 'Young Artists Showcase', path: '/lighting-tableau.png' },
      ],
    },
  ];

  const impactMetrics = [
    { label: 'Individuals Vaccinated', value: '520+', icon: ShieldCheck },
    { label: 'Donation Drives Active', value: 'Since 2016', icon: Droplet },
    { label: 'Orphanage Care Partners', value: 'Annual Event', icon: Heart },
    { label: 'Youth Art Participants', value: '200+ Yearly', icon: Users },
  ];

  return (
    <PageLayout
      title="Community & Social Activities"
      subtitle="At Madhyanchal, we believe true celebration lies in serving humanity. Discover our healthcare camps, blood donation drives, and youth programs."
      badge={{
        text: 'Year-Round Social Initiatives',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Social Activities"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-6 sm:space-y-14">
        {/* 4 IMPACT METRICS DOCK (Compact 2-Column Mobile Grid) */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {impactMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <AnimatedWrapper
                key={metric.label}
                direction="up"
                delay={i * 0.05}
              >
                <div className="card-glass card-hover-glow relative flex flex-col space-y-0.5 overflow-hidden rounded-xl border border-slate-200/90 p-2.5 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-5 dark:border-white/12">
                  <BorderBeam
                    size={100}
                    duration={6}
                    colorFrom="#f59e0b"
                    colorTo="#fef08a"
                  />
                  <div className="flex items-center gap-1">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-amber-500 sm:h-4 sm:w-4" />
                    <span className="font-paytone text-sm text-slate-900 sm:text-xl dark:text-white">
                      {metric.value}
                    </span>
                  </div>
                  <p className="truncate text-[9.5px] font-semibold text-slate-600 sm:text-xs dark:text-slate-300">
                    {metric.label}
                  </p>
                </div>
              </AnimatedWrapper>
            );
          })}
        </div>

        {/* 4 INITIATIVES CARDS (Compact Mobile Optimized Layout) */}
        <div className="space-y-4 sm:space-y-10">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <span className="text-[9px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Serving Humanity
            </span>
            <h2 className="font-paytone text-base text-slate-900 sm:text-3xl dark:text-white">
              Our Core Social Programs
            </h2>
          </AnimatedWrapper>

          <div className="grid grid-cols-1 gap-3.5 sm:gap-8 md:grid-cols-2">
            {initiatives.map((item, idx) => {
              const Icon = item.icon;
              return (
                <AnimatedWrapper
                  key={item.title}
                  direction="up"
                  delay={idx * 0.08}
                >
                  <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between space-y-3 overflow-hidden rounded-xl border border-slate-200/90 p-3.5 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-7 dark:border-white/12">
                    <BorderBeam
                      size={140}
                      duration={6}
                      colorFrom="#f59e0b"
                      colorTo="#fef08a"
                    />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-amber-400">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[8.5px] font-black tracking-wider uppercase sm:text-xs ${item.badgeBg}`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="font-paytone text-xs leading-snug text-slate-900 sm:text-xl dark:text-white">
                        {item.title}
                      </h3>

                      <p className="text-[11px] leading-relaxed font-normal text-slate-600 sm:text-sm dark:text-slate-300">
                        {item.description}
                      </p>
                    </div>

                    {/* Initiative Photo Carousel Slider */}
                    <div className="border-t border-slate-200/80 pt-2 dark:border-white/10">
                      <AdvertiserSlider slides={item.slides} />
                    </div>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>

        {/* LOOKING AHEAD MISSION BANNER */}
        <AnimatedWrapper direction="up" className="relative pt-1">
          <div className="relative space-y-2 overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-3.5 text-center backdrop-blur-2xl sm:space-y-3 sm:rounded-3xl sm:p-10 dark:from-amber-500/15 dark:via-stone-950 dark:to-amber-500/15">
            <Star className="mx-auto h-5 w-5 text-amber-500 sm:h-9 sm:w-9" />
            <h2 className="font-paytone text-sm text-slate-900 sm:text-3xl dark:text-white">
              Looking Ahead — Building a Better Tomorrow
            </h2>
            <p className="mx-auto max-w-2xl text-[11px] leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
              With the support of our community, we strive to expand our health
              camps, donation drives, and youth platforms every single year.
            </p>
            <span className="inline-block pt-0.5 text-[11px] font-black text-amber-600 sm:text-base dark:text-amber-400">
              Together, we can create a brighter future for all!
            </span>
          </div>
        </AnimatedWrapper>
      </div>
    </PageLayout>
  );
}
