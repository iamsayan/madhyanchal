import * as React from 'react';

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

export const metadata: Metadata = {
  title: 'About Us | Madhyanchal Sarbajanin Chandannagar',
  description:
    'Discover the heart of Madhyanchal Sarbajanin Jagadhatri Puja Samity, a beacon of cultural, sports, and social heritage since 1971 in Chandannagar.',
  keywords: [
    'madhyanchal history',
    'jagadhatri puja samity chandannagar',
    'chandannagar puja committee',
    'madhyanchal sarbajanin about',
    'chandannagar cultural heritage',
    'madhyanchal sporting club',
  ],
  openGraph: {
    title: 'About Us | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Discover the heart of Madhyanchal Sarbajanin Jagadhatri Puja Samity, promoting sports, culture, and community welfare since 1971.',
    url: '/about-us',
    type: 'website',
  },
  alternates: {
    canonical: '/about-us',
  },
};

interface Person {
  name: string;
  designation: string;
}

export default function AboutUsPage() {
  const curYear = new Date().getFullYear();
  const yearsActive = curYear - 1971 + 1;

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
            item: 'https://www.madhyanchalsarbajanin.co.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: 'https://www.madhyanchalsarbajanin.co.in/about-us',
          },
        ],
      },
      {
        '@type': 'Organization',
        name: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
        url: 'https://www.madhyanchalsarbajanin.co.in',
        foundingDate: '1971',
        description:
          'Promoting sports, culture, and community welfare in Chandannagar since 1971.',
      },
    ],
  };

  const coreHighlights = [
    {
      title: 'Established 1971',
      description: `${yearsActive} glorious years of unbroken cultural legacy and social harmony.`,
      icon: ShieldCheck,
    },
    {
      title: '500,000+ Footfall',
      description:
        'Devotees and international tourists flocking to Station Road every year.',
      icon: Globe2,
    },
    {
      title: '45+ Prestigious Awards',
      description:
        'Recognized for road lighting, idol craftsmanship, and theme architecture.',
      icon: Trophy,
    },
    {
      title: 'Sports & Community Club',
      description:
        'Own playground, modern sports, and year-round youth welfare initiatives.',
      icon: HeartHandshake,
    },
  ];

  return (
    <PageLayout
      title="About Madhyanchal Samity"
      subtitle="A beacon of cultural heritage, sports excellence, and community welfare in Chandannagar for over five decades."
      badge={{
        text: `Heritage Since 1971 (${yearsActive} Years)`,
        icon: Sparkles,
      }}
      breadcrumbCurrent="About Us"
      scriptJsonLd={jsonLd}
    >
      <div className="space-y-6 sm:space-y-14">
        {/* 4 CORE STAT HIGHLIGHT CARDS (2x2 Balanced Mobile Grid & 4-Column Desktop Grid) */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {coreHighlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedWrapper key={item.title} direction="up" delay={i * 0.08}>
                <div className="card-glass card-hover-glow relative flex h-full flex-col items-start gap-2 overflow-hidden rounded-xl border border-slate-200/90 p-2.5 backdrop-blur-2xl transition-all duration-300 sm:flex-row sm:gap-3 sm:rounded-2xl sm:p-6 dark:border-white/12">
                  <BorderBeam
                    size={100}
                    duration={6}
                    colorFrom="#f59e0b"
                    colorTo="#fef08a"
                  />
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-600 sm:h-10 sm:w-10 sm:rounded-xl dark:text-amber-400">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="font-paytone text-xs leading-tight text-slate-900 sm:text-lg dark:text-white">
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

        {/* ORGANIZATIONAL STORY NARRATIVE */}
        <AnimatedWrapper direction="up">
          <div className="card-glass relative space-y-3 overflow-hidden rounded-xl border border-slate-200/90 p-3.5 text-[11px] leading-relaxed text-slate-700 backdrop-blur-2xl sm:space-y-4 sm:rounded-3xl sm:p-10 sm:text-base dark:border-white/12 dark:text-slate-300">
            <div className="border-b border-slate-200/80 pb-2.5 dark:border-white/10">
              <span className="text-[9px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
                Our Story & Purpose
              </span>
              <h2 className="font-paytone text-base text-slate-900 sm:text-3xl dark:text-white">
                Preserving Tradition, Empowering Community
              </h2>
            </div>

            <p className="text-justify">
              <strong>Jagadhatri Puja</strong>, the festival of Chandannagar, is
              as famous as Kolkata’s Durga Puja. Situated with all its glory and
              pride amidst West Bengal’s densely populated district of Hooghly
              and the recognized French Colony of Chandannagar, just one
              kilometer away from the railway station, is the renowned{' '}
              <strong>Madhyanchal Sarbajanin Jagadhatri Puja Samity</strong>.
              Since its inception in 1971, a remarkable {yearsActive} years ago,
              the committee’s benevolent presence has been ever-expanding.
            </p>

            <p className="text-justify">
              Thousands of spectators from all over India and abroad flock to
              this grand festival, drawn by its unique arts, culture,
              decorations, pandals, and idols. The Madhyanchal Jagadhatri Puja
              has become a major attraction for people from all walks of life.
            </p>

            <p className="text-justify">
              <strong>Madhyanchal</strong>, a renowned sports and cultural club
              located in Chandannagar (Hooghly – 712136), boasts its own
              playground and modern facilities. Over the past {yearsActive}{' '}
              years, Madhyanchal Sporting Club has become a cornerstone of the
              community, fostering a spirit of camaraderie, peace, and unity.
            </p>

            <p className="text-justify">
              What sets the Jagadhatri Puja organized by Madhyanchal Sporting
              Club apart is the sense of inclusivity and harmony it brings to
              the community. The festival is a symbol of unity, attracting
              people from all walks of life, irrespective of their faiths and
              beliefs.
            </p>
          </div>
        </AnimatedWrapper>

        {/* MEMBERS TEAM SHOWCASE */}
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-1 text-center">
            <span className="text-[9.5px] font-black tracking-widest text-amber-600 uppercase sm:text-xs dark:text-amber-400">
              The Dedicated People
            </span>
            <h2 className="font-paytone text-lg text-slate-900 sm:text-3xl dark:text-white">
              Meet Our Organizing Committee
            </h2>
            <p className="mx-auto max-w-xl text-xs text-slate-600 dark:text-slate-400">
              Discover the leadership team, working secretaries, and citizens
              driving Madhyanchal’s cultural pride.
            </p>
          </div>

          <MembersList members={members} />
        </div>
      </div>
    </PageLayout>
  );
}
