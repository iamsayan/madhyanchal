import type { Metadata } from 'next';

import { MembersList } from '@/components/features/members-list';
import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';

import {
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { celebratingYear, celebratingYearDurga } from '@/lib/data';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'About Us',
    description:
      'Celebrating culture, sports, and community service in Chandannagar',
    canonical: '/about-us',
  }),
  keywords: [
    'madhyanchal history',
    'jagadhatri puja samity chandannagar',
    'chandannagar puja committee',
    'madhyanchal sarbajanin about',
    'chandannagar cultural heritage',
    'madhyanchal sporting club',
  ],
};

interface Person {
  name: string;
  designation: string;
}

interface AboutUsPageProps {
  isDurgaPuja?: boolean;
}

export default function AboutUsPage({ isDurgaPuja = false }: AboutUsPageProps) {
  const members: Person[] = [
    { name: 'Shri Swapan Kumar Bayen', designation: 'President' },
    {
      name: 'Shri Debjit Banerjee, Pransanta Dutta, Rajib Ray',
      designation: 'Vice President',
    },
    { name: 'Dr. Shantanu Mukherjee', designation: 'General Secretary' },
    {
      name: 'Shri Asish Datta, Sankar Ghosh, Utpal Dutta, Subhodip Ghosh, Raja Dutta, Saikat Chakraborty, Trisan Ganguly',
      designation: 'Working Secretary',
    },
    {
      name: 'Shri Pijush Narayan Das & Somnath Nandi',
      designation: 'Joint Treasurer',
    },
    {
      name: 'Shri Saurav Biswas & Pradyut Guha',
      designation: 'Assistant Treasurer',
    },
    {
      name: 'Abhisek Mukherjee, Abhishek Modok, Abhishek Singh, Adipata Biswas, Amarnath Dhara, Aman Gupta, Amit Das, Amit Kumar Neogi, Anamika Ghosh, Ananda, Anirban Dey, Anushka Saha, Anannya Das, Arijit Dutta, Arijit Majhi, Arindam Mukherjee, Arnendu Ghosh, Ashish Chatterjee, Ashok Mama, Avik Sarkar, Avijit Chakraborty, Bikram Basu, Brojo gopal chattopadhyay, Chabi Das, Chaiti Mallick, Chaitali Das, Deb Kumar Das, Debabrata Ghara, Debroop Datta, Debolina Sarkar, Dibboshree Banerjee, Deep Swarnakar, Dhiman Saha, Indrani Dey, Jeet Singha Roy, Joyita Mitra Dutta, Kajol Ghosh, Kakoli Das, Kallol Mukherjee, Kartik Bhattacharya, Kuramjit Bhattacharya, Kushal Bose, Lalu Swarnakar, Lisa Dutta, Mohul Guha, Moupiya Chakraborty, Mukesh Paswan, Munmum Karmakar, Nabamita Sarkar, Nabomita Mallik, Nebadan Sikdar, Neel Bhattacharya, Nirmala Mukherjee, Oyendrila Basak, Pankaj Das, Parikshit Sur, Paromita Ganguly, Pinaki Ghosh, Piyali Chakraborty, Pradip Biswas, Pranjali Chakraborty, Raja Bhowmick, Reshmi Das, Rimo, Rumela Chakraborty, Rumsu Mukherjee, Rupam Banerjee, Sagar Patra, Saikat Das, Sajal Ghosh, Samrat Ghosh, Sandip Paul, Sanchita Roy, Sanjay Langal, Santu Ghosh, Saurav Das, Sayan Chatterjee, Sayan Datta, Sayan Pal, Sayantan Bhattacharya, Shampa Ghosh, Shampa Kundu, Shantanu Mukherjee, Sharanya Dutta, Sharvani Ghosh, Shubhodeep Hazra, Shuvankar Shadukhan, Soham Bhattacharya, Sougata Ghosh, Soumitra Dutta, Soumodeep Goswami, Soumick Mazumdar, Soumya Sankha Pal, Sourav Banerjee, Sourav Das (Boro), Sreeparna Ganguly, Sudipta Datta, Sudipta Ghosh, Sujan Ganguly, Sujata Banerjee, Sujit Dutta, Sumanta Neogi, Suman Banerjee, Suman Panda, Suman Swarnakar, Sumit Paramanick, Sunil Das, Swapan Banerjee, Tamal Ghosh, Tamal Kanti Dhar, Tarun Nandy, Tathagata Ghosh, Tushar Kanti Ghosh, Udita Singha, Uttam Dutta and all the citizens of Madhyanchal.',
      designation: 'Members',
    },
  ];

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
            item: isDurgaPuja
              ? 'https://www.madhyanchalsarbajanin.co.in/durgapuja'
              : 'https://www.madhyanchalsarbajanin.co.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: isDurgaPuja
              ? 'https://www.madhyanchalsarbajanin.co.in/durgapuja/about-us'
              : 'https://www.madhyanchalsarbajanin.co.in/about-us',
          },
        ],
      },
      {
        '@type': 'Organization',
        name: isDurgaPuja
          ? 'Madhyanchal Sarbajanin Durga Puja Samity'
          : 'Madhyanchal Sarbajanin',
        url: 'https://www.madhyanchalsarbajanin.co.in',
        foundingDate: isDurgaPuja ? '1995' : '1971',
        description: isDurgaPuja
          ? 'Organizing Durga Puja, Sit & Draw competition, sports, and community welfare in Chandannagar since 1995.'
          : 'Promoting sports, culture, and community welfare in Chandannagar since 1971.',
      },
    ],
  };

  const coreHighlights = [
    {
      title: isDurgaPuja ? 'Established 1995' : 'Established 1971',
      description: isDurgaPuja
        ? `${celebratingYearDurga} years of continuous Sharad Utsav celebrations, sports, and community welfare.`
        : `${celebratingYear} years of continuous community celebrations, sports, and social work.`,
      icon: ShieldCheck,
    },
    {
      title: isDurgaPuja ? 'Grand Pandal & Idols' : '1.2M+ Visitors',
      description: isDurgaPuja
        ? 'Exquisite pandal artwork, traditional Durga pratima, and festive celebrations on Station Road.'
        : 'Pandal hoppers and visitors from across Bengal gathering on Station Road during Puja.',
      icon: Globe2,
    },
    {
      title: isDurgaPuja ? 'Sit & Draw Contest' : '100+ Awards & Honors',
      description: isDurgaPuja
        ? "Annual children's art competition drawing hundreds of young talents across 3 age categories."
        : 'Recognized for exceptional light displays, idol craftsmanship, and pandal design.',
      icon: Trophy,
    },
    {
      title: 'Sports & Cultural Club',
      description:
        'Our own playground, local sports tournaments, and year-round youth activities.',
      icon: HeartHandshake,
    },
  ];

  return (
    <PageLayout
      title={isDurgaPuja ? 'About Durga Puja' : 'About Madhyanchal'}
      subtitle={
        isDurgaPuja
          ? 'Bringing community together through autumn’s grandest festival — Madhyanchal Sarbajanin Durga Puja, Annual Sit & Draw Competition, sports, and year-round social welfare in Chandannagar.'
          : 'Bringing people together through grand Jagadhatri & Durga Pujas, sports, and year-round social welfare in Chandannagar.'
      }
      badge={{
        text: isDurgaPuja ? 'Durga Puja Heritage • Since 1995' : 'Heritage Since 1971',
        icon: Sparkles,
      }}
      breadcrumbCurrent="About Us"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-8 sm:space-y-14">
        {/* 4 CORE STAT HIGHLIGHT CARDS (2x2 Balanced Mobile Grid & 4-Column Desktop Grid) */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {coreHighlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedWrapper key={item.title} direction="up" delay={i * 0.08}>
                <div className="card-glass card-hover-glow relative flex h-full flex-col items-start gap-2 overflow-hidden rounded-xl border border-slate-200/90 p-2.5 backdrop-blur-2xl transition-all duration-300 sm:flex-row sm:gap-3 sm:rounded-2xl sm:p-4.5 dark:border-white/12">
                  <BorderBeam
                    size={100}
                    duration={6}
                    colorFrom="#f59e0b"
                    colorTo="#fef08a"
                  />
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-amber-400">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-paytone text-xs leading-snug text-slate-900 sm:text-sm dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-[10px] leading-relaxed font-normal text-slate-600 sm:text-xs dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedWrapper>
            );
          })}
        </div>

        {/* ORGANIZATIONAL STORY NARRATIVE */}
        <AnimatedWrapper direction="up">
          <div className="card-glass relative space-y-3 overflow-hidden rounded-xl border border-slate-200/90 p-3.5 text-xs leading-relaxed text-slate-700 backdrop-blur-2xl sm:space-y-4 sm:rounded-3xl sm:p-7 sm:text-sm sm:leading-relaxed dark:border-white/12 dark:text-slate-300">
            <div className="border-b border-slate-200/80 pb-2.5 dark:border-white/10">
              <span className="text-[9.5px] font-extrabold tracking-widest text-amber-600 uppercase sm:text-[11px] dark:text-amber-400">
                {isDurgaPuja
                  ? 'Sharad Utsav & Community Spirit'
                  : 'Our Journey & Community Spirit'}
              </span>
              <h2 className="font-paytone mt-0.5 text-base text-slate-900 sm:text-xl dark:text-white">
                {isDurgaPuja
                  ? 'Preserving Culture, Celebrating Sharad Utsav'
                  : 'Preserving Local Culture, Serving People'}
              </h2>
            </div>

            {isDurgaPuja ? (
              <>
                <p className="leading-relaxed">
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    Durga Puja (Sharad Utsav)
                  </strong>{' '}
                  is the most cherished autumn festival in Bengal. Located just one kilometer
                  from Chandannagar railway station along Station Road,{' '}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    Madhyanchal Sarbajanin Durga Puja Samity (MSDPS)
                  </strong>{' '}
                  has been organizing grand Durga Puja celebrations since 1995. Over the past{' '}
                  {celebratingYearDurga} years, our committee has grown into a vibrant family of local
                  residents, youth volunteers, and organizers.
                </p>

                <p className="leading-relaxed">
                  Every year during Sharad Utsav, thousands of visitors from across Bengal and India
                  come to experience our unique pandal artwork, traditional idols, and festive atmosphere.
                  We organize traditional rituals, Dhunuchi Naach, Pushpanjali, and community Mahaprasad distribution.
                </p>

                <p className="leading-relaxed">
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    Madhyanchal Sporting Club
                  </strong>{' '}
                  is not just a Puja organizer — it is a local sports and cultural hub with its own playground.
                  Throughout the year, we host sports tournaments, the Annual Sit & Draw Competition, blood donation camps,
                  and social welfare programs for our neighborhood.
                </p>
              </>
            ) : (
              <>
                <p className="leading-relaxed">
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    Jagadhatri Puja
                  </strong>{' '}
                  is the soul of Chandannagar. Located just one kilometer from Chandannagar railway
                  station along Station Road,{' '}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    Madhyanchal Sarbajanin
                  </strong>{' '}
                  has been at the heart of this grand festival since 1971. Over the past{' '}
                  {celebratingYear} years, our committee has grown into a vibrant family of local
                  residents, youth volunteers, and organizers.
                </p>

                <p className="leading-relaxed">
                  Every year, thousands of visitors from across Bengal and India come to experience
                  our unique pandal artwork, traditional idols, and the world-famous light illumination of Chandannagar.
                </p>

                <p className="leading-relaxed">
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    Madhyanchal Sporting Club
                  </strong>{' '}
                  is not just a Puja organizer — it is a local sports and cultural hub with its own playground.
                  Throughout the year, we host sports tournaments, blood donation camps, youth competitions, and social
                  welfare programs for our neighborhood.
                </p>
              </>
            )}
          </div>
        </AnimatedWrapper>

        {/* MEMBERS TEAM SHOWCASE */}
        <div className="space-y-3.5 sm:space-y-5">
          <div className="space-y-1 text-center">
            <span className="text-[9.5px] font-extrabold tracking-widest text-amber-600 uppercase sm:text-[11px] dark:text-amber-400">
              {isDurgaPuja ? 'Durga Puja Samity' : 'The Dedicated People'}
            </span>
            <h2 className="font-paytone text-base text-slate-900 sm:text-xl dark:text-white">
              {isDurgaPuja
                ? 'Meet Our Durga Puja Committee'
                : 'Meet Our Organizing Committee'}
            </h2>
            <p className="mx-auto max-w-xl text-[11px] text-slate-600 sm:text-xs dark:text-slate-400">
              {isDurgaPuja
                ? 'Discover the leadership team, working secretaries, and citizens driving Madhyanchal’s Durga Puja.'
                : 'Discover the leadership team, working secretaries, and citizens driving Madhyanchal’s cultural pride.'}
            </p>
          </div>

          <MembersList members={members} />
        </div>
      </div>
    </PageLayout>
  );
}
