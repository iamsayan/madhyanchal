import type { Metadata } from 'next';

import { AdvertiserSlider } from '@/components/features/advertiser-slider';
import { AwardsFilterView } from '@/components/features/awards-filter-view';
import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { awards } from '@/data/awards';

import {
  Heart,
  HeartHandshake,
  Landmark,
  Leaf,
  Palette,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Awards & Accolades',
  description:
    'Explore the 100+ Prestigious Awards and recognitions earned by Madhyanchal Sarbajanin in Chandannagar—from Best Road Lighting to Idol Mukhasree and Cultural Heritage.',
  keywords: [
    'madhyanchal awards',
    'jagadhatri puja awards chandannagar',
    'puja committee awards',
    'chandannagar puja recognition',
    'best jagadhatri puja awards',
    'road lighting awards chandannagar',
  ],
  openGraph: {
    title: 'Our Awards & Accolades | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Recognized for excellence in creativity, road lighting, and cultural heritage with 100+ awards since 2016.',
    url: '/awards',
    type: 'website',
  },
  alternates: {
    canonical: '/awards',
  },
};

export default function AwardsPage() {
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
            name: 'Our Awards',
            item: 'https://www.madhyanchalsarbajanin.co.in/awards',
          },
        ],
      },
      {
        '@type': 'ItemPage',
        name: 'Our Awards & Recognitions',
        description:
          '100+ Prestigious Awards recognized across artistic excellence, road lighting, idol craftsmanship, and environmental responsibility.',
        url: 'https://www.madhyanchalsarbajanin.co.in/awards',
      },
    ],
  };

  const pillars = [
    {
      title: 'Artistic Excellence',
      subtitle: 'Creative Pandals & Idol Mukhasree',
      description:
        'Celebrating intricate decorations, unique idol craftsmanship, and thematic pandal art.',
      icon: Palette,
      badge: 'Art & Craft',
    },
    {
      title: 'Cultural Impact',
      subtitle: 'Heritage & Tradition Revival',
      description:
        'Honoring our commitment to preserving the centuries-old Jagadhatri Puja traditions.',
      icon: Landmark,
      badge: 'Heritage',
    },
    {
      title: 'Social Initiatives',
      subtitle: 'Community Unity & Inclusivity',
      description:
        'Recognizing work in community service, senior citizen support, and accessible pandal layout.',
      icon: HeartHandshake,
      badge: 'Community',
    },
    {
      title: 'Eco Responsibility',
      subtitle: 'Green & Sustainable Celebrations',
      description:
        'Commending eco-friendly practices, non-toxic colors, and green pandal initiatives.',
      icon: Leaf,
      badge: 'Green Puja',
    },
  ];

  const awardsSlides = [
    { name: 'Road Lighting 1st Prize 2024', path: '/lighting-tableau.png' },
    { name: 'Sarbik Srestho Jagadhatri Somman 2023', path: '/hero-pandal.png' },
    {
      name: 'Idol Mukhasree 2nd Prize 2024',
      path: '/kaporerpatty-jagadhatri-1970',
    },
    { name: 'Alok Ananda ABP Ananda Award', path: '/lighting-tableau.png' },
    {
      name: 'Best Procession & Light Tableau',
      path: '/kaporerpatty-jagadhatri-1970',
    },
  ];

  return (
    <PageLayout
      title="Our Awards & Recognitions"
      subtitle="Recognized for excellence in creativity, road lighting, idol craftsmanship, and environmental responsibility by Bengal’s premier cultural organizations."
      badge={{
        text: '100+ Prestigious Accolades',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Awards"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-8 sm:space-y-14">
        {/* 4 PILLARS OF EXCELLENCE (Compact 2-Column Mobile Grid) */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              Pillars of Excellence
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-2xl dark:text-white">
              What We Are Honored For
            </h2>
          </AnimatedWrapper>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <AnimatedWrapper
                  key={pillar.title}
                  direction="up"
                  delay={idx * 0.05}
                >
                  <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-5 dark:border-white/12">
                    <div className="space-y-1.5 sm:space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/15 font-black text-amber-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-amber-400">
                          <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
                        </div>
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-1.5 py-0.5 text-[8.5px] font-black text-amber-700 uppercase sm:text-[10px] dark:text-amber-300">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="font-paytone text-xs leading-snug text-slate-900 sm:text-base dark:text-white">
                        {pillar.title}
                      </h3>
                      <span className="block truncate text-[8.5px] font-bold text-amber-600 sm:text-[10px] dark:text-amber-400">
                        ✦ {pillar.subtitle}
                      </span>
                      <p className="text-[10px] leading-tight font-normal text-slate-600 sm:text-xs sm:leading-relaxed dark:text-slate-300">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE YEAR-WISE AWARDS SHOWCASE */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatedWrapper direction="up" className="space-y-1 text-center">
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Year-wise Accolades Archive
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Filter through 100+ awards by year since 2016.
            </p>
          </AnimatedWrapper>

          <AwardsFilterView awards={awards} />
        </div>

        {/* COMMUNITY GRATITUDE DOCK */}
        <AnimatedWrapper direction="up" className="relative pt-2">
          <div className="relative space-y-2.5 overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-4 text-center backdrop-blur-2xl sm:space-y-4 sm:rounded-3xl sm:p-8 dark:from-amber-500/15 dark:via-stone-950 dark:to-amber-500/15">
            <Heart className="mx-auto h-6 w-6 text-amber-500 opacity-80 sm:h-8 sm:w-8" />
            <blockquote className="font-paytone text-base leading-snug text-slate-900 sm:text-2xl dark:text-slate-100">
              Dedicated to Our Artisans & Devotees
            </blockquote>
            <p className="mx-auto max-w-2xl text-[11px] leading-relaxed font-medium text-amber-800 sm:text-sm dark:text-amber-300">
              These awards reflect the hard work, passion, and dedication of our
              team, master light artisans, and the entire Madhyanchal family.
              Each accolade inspires us to keep elevating Chandannagar’s
              cultural pride.
            </p>
          </div>
        </AnimatedWrapper>
      </div>
    </PageLayout>
  );
}
