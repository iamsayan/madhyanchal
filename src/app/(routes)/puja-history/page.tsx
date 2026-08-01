import * as React from 'react';

import type { Metadata } from 'next';
import Image from 'next/image';

import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';

import {
  Calendar,
  Compass,
  Crown,
  Feather,
  Flame,
  Globe2,
  Lightbulb,
  Quote,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'History of Jagadhatri Puja | Madhyanchal Sarbajanin Chandannagar',
  description:
    'Discover the centuries-old history of Chandannagar Jagadhatri Puja through an interactive golden timeline—from French colonial origins to Bankim Chandra’s Anandamath and master LED light craftsmanship.',
  keywords: [
    'jagadhatri puja history',
    'chandannagar jagadhatri puja origin',
    'indranarayan chowdhury jagadhatri',
    'king krishnachandra jagadhatri',
    'anandamath jagadhatri puja',
    'chandannagar light industry history',
    'sridhar das light artist',
    'history of chandannagar puja',
  ],
  openGraph: {
    title: 'History of Jagadhatri Puja | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Discover the centuries-old history of Chandannagar Jagadhatri Puja through an interactive golden timeline chronicle.',
    url: '/puja-history',
    type: 'article',
  },
  alternates: {
    canonical: '/puja-history',
  },
};

export default function PujaHistoryPage() {
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
            name: 'Puja History',
            item: 'https://www.madhyanchalsarbajanin.co.in/puja-history',
          },
        ],
      },
      {
        '@type': 'Article',
        headline: 'History of Jagadhatri Puja in Chandannagar',
        description:
          'Comprehensive timeline account of Chandannagar Jagadhatri Puja, French colonial influence, iconography, Anandamath literary ties, and master light artisans.',
        publisher: {
          '@type': 'Organization',
          name: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
          url: 'https://www.madhyanchalsarbajanin.co.in',
        },
      },
    ],
  };

  const timelineChapters = [
    {
      id: 'origins',
      era: '1750s CE',
      number: '01',
      title: 'Colonial Origins & French Heritage',
      subtitle: 'The 18th Century Genesis in Chandannagar',
      icon: Crown,
      image: '/kaporerpatty-jagadhatri-1970.jpg',
      imageCaption: 'The Kaporerpatty Mata - by Supratim Karmakar',
      tag: '1750s Origin',
      highlights: [
        { label: 'Era', value: 'French Colonial Period' },
        { label: 'Pioneer', value: 'Indranarayan Chowdhury' },
        { label: 'Origin', value: 'Predates 1750 CE' },
      ],
      content: [
        'During British colonial rule in India, even though Chandannagar was governed by the French, it developed its own unique socio-cultural traditions. One of the most significant celebrations in this region is the grand Jagadhatri Puja.',
        'It is widely believed that Indranarayan Chowdhury introduced the Jagadhatri Puja in Chandannagar, inspired by the customs of King Krishnachandra of Krishnanagar.',
        'While records show Jagadhatri Puja began in Krishnanagar in 1762, Indranarayan Chowdhury passed away in 1756. Historical evidence indicates that Jagadhatri Puja in Chandannagar likely predates 1750, initiated by Indranarayan Chowdhury at his residence during visits by Maharaja Krishnachandra.',
      ],
    },
    {
      id: 'iconography',
      era: 'SCRIPTURES',
      number: '02',
      title: 'Sacred Iconography & Sankhya Philosophy',
      subtitle: 'The Slayer of Karindrasura & Sattva Guna',
      icon: Flame,
      image: '',
      imageCaption: 'Traditional Sola & Painted Canvas Artwork (Chalchitra)',
      tag: 'Sattva Guna',
      highlights: [
        { label: 'Tantra Texts', value: 'Mayatantra & Tantrasaar' },
        { label: 'Deity Form', value: 'Four-Armed Sattva Guna' },
        { label: 'Philosophy', value: 'Slayer of Karindrasura' },
      ],
      content: [
        'The distinction between Goddess Durga and Goddess Jagadhatri is documented in the ancient text "Mayatantra", and Jagadhatri is referenced alongside Durga in Krishnananda’s "Tantrasaar". Worship on the ninth lunar day of Kartick is cited in "Krityatattarnab" by Srinath Acharyachuramoni (15th–16th century).',
        'The idol of Jagadhatri is portrayed with four arms—holding a conch (Sankha), discus (Chakra), bow (Dhanush), and arrow (Bana)—riding a lion standing victorious on an elephant (Karindrasura). The deity is traditionally adorned with exquisite sola decorations and vibrant painted canvas mats (Chalchitra).',
        'In Sankhya philosophy, Jagadhatri signifies "Sattva Guna" (calmness, harmony, and purity). While Durga embodies "Rajas" (activity) and Kali embodies "Tamas" (inertia), Jagadhatri represents pure creation. As Sri Ramakrishnadev observed, Jagadhatri awakens in the hearts of those who conquer the inner elephant of ego.',
      ],
    },
    {
      id: 'literature',
      era: '1882 CE',
      number: '03',
      title: 'Literary Legacy & Anandamath',
      subtitle: 'The Mother India Triad in Vande Mataram',
      icon: Feather,
      image: '',
      imageCaption: 'Bankim Chandra Chatterjee’s Anandamath Inspiration',
      tag: 'Anandamath Connection',
      highlights: [
        { label: 'Novel', value: 'Anandamath (1882)' },
        { label: 'Author', value: 'Bankim Chandra' },
        { label: 'Symbolism', value: 'Glorious Past of Bharat Mata' },
      ],
      content: [
        'In Indian literature, Jagadhatri holds a monumental place within Bankim Chandra Chatterjee’s celebrated semi-historical novel "Anandamath" (1882), which gave birth to India’s national song "Vande Mataram".',
        'In Anandamath, Kali, Durga, and Jagadhatri are presented as three distinct temporal manifestations of Bharat Mata (Mother India): Jagadhatri represents the glorious Past, Kali represents the troubled Present, and Durga represents the empowered Future.',
        'This divine trinity was revered by the patriot ascetics (Santan) in the story, embedding Jagadhatri deeply into the fabric of India’s freedom movement and cultural consciousness.',
      ],
    },
    {
      id: 'procession',
      era: '1788 CE',
      number: '04',
      title: 'The 2nd Largest Procession in the World',
      subtitle: '190+ Community Pujas & Bose Family Legacy',
      icon: Globe2,
      image: '',
      imageCaption: 'The Grand Nocturnal Immersion Procession',
      tag: 'World Record Procession',
      highlights: [
        { label: 'Oldest Puja', value: 'Bose Family (1788 CE)' },
        { label: 'Total Pujas', value: '190+ Community Pujas' },
        { label: 'Global Rank', value: '2nd Largest Procession' },
      ],
      content: [
        'Among historical pujas, the Jagadhatri Puja of the Bose family in Palpara is especially legendary. Believed to have originated around 1788 (with family lineage records tracing back to 1640), it remains a cornerstone of heritage.',
        'Today, across Chandannagar, Bhadreswar, and Champdany, community pujas have surpassed 190. Of these, 161 puja committees are affiliated with the Chandannagar Central Jagadhatri Puja Committee.',
        'The festival’s grand immersion procession is celebrated as the 2nd largest street procession in the world (following the Rio de Janeiro Carnival), featuring soaring 30-foot decorated idols paraded through historic avenues.',
      ],
    },
    {
      id: 'light-industry',
      era: 'MODERN CRAFT',
      number: '05',
      title: 'World-Famous Chandannagar Light Industry',
      subtitle: 'Tamaso Ma Jyotirgamaya • 5,000+ Master Artisans',
      icon: Lightbulb,
      image: '',
      imageCaption:
        'Master Light Artisans Sridhar Das & Kashinath Neogie Tapestry',
      tag: '5,000+ Artisans',
      highlights: [
        { label: 'Artisans', value: '5,000+ Light Craftsmen' },
        { label: 'Pioneers', value: 'Sridhar Das & Kashinath' },
        { label: 'Innovation', value: '3D Dynamic Illumination' },
      ],
      content: [
        'The Sanskrit invocation "Tamaso ma jyotirgamaya" ("Oh Mother! Lead me from darkness to light") finds its ultimate artistic expression in Chandannagar. Over 5,000 light artisans thrive in this region, creating dynamic 3D illuminations that depict moving trains, cars, current affairs, and global icons.',
        'Pioneering master light artists such as Sridhar Das and Kashinath Neogie transformed simple bulbs into animated LED tapestries that are now commissioned worldwide for national events, royal weddings, and international carnivals.',
        'The illuminated tableaux that precede the immersion procession stand as a testament to Chandannagar’s unmatched innovation, passion, and light craftsmanship.',
      ],
    },
  ];

  return (
    <PageLayout
      title="History of Jagadhatri Puja"
      subtitle="An interactive historical chronicle of Chandannagar’s divine festival—from 18th-century French colonial roots to iconic LED light tapestries."
      badge={{
        text: 'Heritage & Legacy Timeline',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Puja History"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-6 sm:space-y-12">
        {timelineChapters.map((chapter, index) => {
          const Icon = chapter.icon;

          return (
            <AnimatedWrapper
              key={chapter.id}
              direction="up"
              delay={index * 0.05}
              className="group relative"
            >
              {/* Chapter Glass Card */}
              <div className="card-glass card-hover-glow relative overflow-hidden rounded-xl border border-slate-200/90 p-4 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-8 dark:border-white/12">
                <BorderBeam
                  size={160}
                  duration={8}
                  colorFrom="#f59e0b"
                  colorTo="#fef08a"
                />

                {/* Era & Chapter Header */}
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3 sm:mb-6 sm:pb-5 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/15 font-black text-amber-600 shadow-xs sm:h-11 sm:w-11 dark:text-amber-400">
                      <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[9.5px] font-black tracking-widest text-amber-700 uppercase sm:text-xs dark:text-amber-300">
                          <Calendar className="h-3 w-3 text-amber-500" />{' '}
                          {chapter.era}
                        </span>
                        <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase sm:text-[10px] dark:text-slate-400">
                          Chapter {chapter.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-300/80 bg-slate-100/80 px-2.5 py-0.5 text-[9.5px] font-bold text-slate-700 backdrop-blur-md sm:px-3 sm:py-1 sm:text-xs dark:border-white/15 dark:bg-stone-900/80 dark:text-slate-300">
                    {chapter.tag}
                  </span>
                </div>

                {/* Titles */}
                <h2 className="font-paytone mb-1 text-base leading-snug text-slate-900 sm:text-2xl dark:text-white">
                  {chapter.title}
                </h2>
                <h3 className="mb-4 text-xs font-bold text-amber-700 sm:mb-6 sm:text-base dark:text-amber-300">
                  ✦ {chapter.subtitle}
                </h3>

                {/* Side-by-Side Grid: Left Image or Fact Card / Right Text */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start lg:gap-8">
                  {/* Left Column: Image Card or Heritage Highlights Card (Reduced Height Aspect 16/10) */}
                  {chapter.image ? (
                    <div className="group/img relative aspect-[16/10] min-h-[175px] w-full overflow-hidden rounded-xl border border-slate-200/80 sm:rounded-2xl lg:col-span-4 lg:aspect-[16/10] dark:border-white/12">
                      <Image
                        src={chapter.image}
                        alt={chapter.imageCaption || chapter.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center brightness-[0.92] contrast-[1.05] filter transition-transform duration-700 ease-out group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                      <div className="absolute right-2.5 bottom-2.5 left-2.5 flex items-center justify-between rounded-lg border border-white/15 bg-stone-950/60 px-2.5 py-1.5 text-[10px] font-medium text-white/90 backdrop-blur-md sm:px-3 sm:text-xs">
                        <span className="line-clamp-1 flex items-center gap-1">
                          <Compass className="h-3 w-3 shrink-0 text-amber-400" />{' '}
                          {chapter.imageCaption}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex aspect-[16/10] min-h-[175px] w-full flex-col justify-between overflow-hidden rounded-xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-amber-100/40 to-amber-50/60 p-3.5 shadow-sm sm:rounded-2xl lg:col-span-4 lg:aspect-[16/10] dark:border-amber-400/30 dark:from-amber-500/15 dark:via-stone-900/90 dark:to-stone-950">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 dark:border-amber-400/20">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/20 px-2.5 py-0.5 text-[9.5px] font-black text-amber-900 uppercase dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300">
                          <Sparkles className="h-3 w-3 text-amber-600 dark:text-amber-400" />{' '}
                          Key Facts
                        </span>
                        <Icon className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                      </div>

                      <div className="space-y-1.5 py-2">
                        {chapter.highlights?.map((item, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-center justify-between border-b border-amber-500/15 pb-1 text-[10.5px] sm:text-[11.5px] dark:border-white/10"
                          >
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {item.label}
                            </span>
                            <span className="font-black text-amber-800 dark:text-amber-300">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-0.5 text-[9.5px] font-bold text-slate-500 dark:text-slate-400">
                        <span>Chandannagar Archives</span>
                        <span className="font-extrabold text-amber-700 dark:text-amber-400">
                          {chapter.era}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Right Column: Paragraph Content */}
                  <div className="space-y-3 text-justify text-xs leading-relaxed font-normal text-slate-700 sm:space-y-4 sm:text-sm lg:col-span-8 dark:text-slate-300">
                    {chapter.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          );
        })}

        {/* SACRED QUOTE & INSPIRATION HIGHLIGHT DOCK */}
        <AnimatedWrapper direction="up" className="relative mt-8 sm:mt-12">
          <div className="relative space-y-2.5 overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-4 text-center backdrop-blur-2xl sm:space-y-4 sm:rounded-3xl sm:p-8 dark:from-amber-500/15 dark:via-stone-950 dark:to-amber-500/15">
            <Quote className="mx-auto h-6 w-6 text-amber-500 opacity-60 sm:h-8 sm:w-8" />
            <blockquote className="font-paytone text-base leading-snug text-slate-900 sm:text-2xl dark:text-slate-100">
              &quot;Tamaso Ma Jyotirgamaya&quot;
            </blockquote>
            <p className="mx-auto max-w-xl text-[11px] font-medium text-amber-800 sm:text-sm dark:text-amber-300">
              &quot;Oh Divine Mother! Lead us from darkness to light.&quot; This
              timeless Vedic philosophy fuels Chandannagar’s world-renowned
              light craftsmanship and sacred festival devotion.
            </p>
          </div>
        </AnimatedWrapper>
      </div>
    </PageLayout>
  );
}
