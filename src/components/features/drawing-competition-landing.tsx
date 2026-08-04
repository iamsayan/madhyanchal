'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BorderBeam } from '@/components/ui/border-beam';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Gift,
  Heart,
  MapPin,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
} from 'lucide-react';

export function DrawingCompetitionLanding() {
  const ageCategories = [
    {
      group: 'Group A',
      title: 'Budding Stars',
      age: 'Up to 6 Years',
      dob: 'Born on or after 12.10.2020',
      topic: 'Draw As You Like',
      badgeColor:
        'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
      prizes: '3 Trophies (1st, 2nd, 3rd) + 2 Medals (4th, 5th)',
      description:
        'Nurturing early imagination, color discovery, and joyful creative expression.',
    },
    {
      group: 'Group B',
      title: 'Rising Creators',
      age: '7 to 10 Years',
      dob: 'Born between 12.10.2016 & 11.10.2020',
      topic: 'Draw As You Like',
      badgeColor:
        'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      prizes: '3 Trophies (1st, 2nd, 3rd) + 2 Medals (4th, 5th)',
      description:
        'Fostering technical skills, spatial awareness, and visual storytelling.',
    },
    {
      group: 'Group C',
      title: 'Master Artists',
      age: '11 to 15 Years',
      dob: 'Born between 12.10.2011 & 11.10.2016',
      topic: 'Draw As You Like',
      badgeColor:
        'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
      prizes: '3 Trophies (1st, 2nd, 3rd) + 2 Medals (4th, 5th)',
      description:
        'Showcasing advanced artistic vision, composition, and individual mastery.',
    },
  ];

  const pridePillars = [
    {
      icon: Star,
      title: 'Stage Recognition & Pride',
      description:
        'A grand public platform where every child’s talent is celebrated in front of an encouraging community.',
    },
    {
      icon: Award,
      title: 'Official Certificate for Every Child',
      description:
        'Every participant receives an official Certificate of Participation to cherish forever.',
    },
    {
      icon: Palette,
      title: 'Creative Confidence & Exposure',
      description:
        'Nurturing artistic expression in a structured, supportive environment that boosts your child’s self-assurance.',
    },
    {
      icon: Trophy,
      title: '15 Prestigious Awards',
      description:
        'Top 5 performers per category are crowned on stage with magnificent Trophies and Medals.',
    },
  ];

  const rules = [
    'Registration Limit: Maximum of 5 participants are allowed per guardian registration.',
    'Registration Fee: ₹50 per participant (Payable online via UPI, Credit/Debit Cards, Net Banking).',
    'Drawing paper will be provided by the organizers only.',
    'Participants must bring their own colors and other required materials.',
    'Any type of color can be used for drawing, but sketch pen or scale cannot be used.',
    'The decision of the judges will be final.',
    'Age proof certificate photocopy must be brought on the competition day.',
    'Wrong information will lead to disqualification.',
    'An email with the registration ID will be sent, to be shown on registration day.',
    'Our seating capacity is limited, so registrations will be accepted on a priority basis.',
  ];

  return (
    <div className="relative mx-auto max-w-4xl space-y-6 sm:space-y-10">
      {/* HERO BANNER SECTION */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 text-center backdrop-blur-2xl sm:rounded-3xl sm:p-10 dark:border-white/12">
        <BorderBeam
          size={240}
          duration={7}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="flex flex-col items-center space-y-3.5 sm:space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3.5 py-1 text-[10.5px] font-extrabold tracking-wider text-amber-800 uppercase sm:px-4 sm:py-1.5 sm:text-xs dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-500" />
            CHANDANNAGAR’S MOST CELEBRATED ART FESTIVAL
          </span>

          <h1 className="font-paytone text-xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Give Your Child the Stage to Shine
          </h1>

          <p className="max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            More than a competition—a grand platform created to inspire
            confidence, celebrate artistic expression, and honor every young
            artist. Join 300+ proud families celebrating 3 years of creative
            excellence!
          </p>

          {/* TOPIC BANNER HIGHLIGHT */}
          <div className="w-full max-w-xl rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-center sm:p-4">
            <span className="text-[10px] font-extrabold tracking-widest text-amber-700 uppercase sm:text-[11px] dark:text-amber-400">
              Official Drawing Theme
            </span>
            <h3 className="font-paytone text-base font-bold text-slate-900 sm:text-2xl dark:text-white">
              Draw As You Like
            </h3>
            <p className="mt-0.5 text-[11px] font-medium text-slate-600 sm:text-xs dark:text-slate-300">
              Open creative freedom for all age categories (Group A, B & C)
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col items-center justify-center gap-2.5 pt-2 sm:flex-row sm:gap-4">
            <Link
              href="/durgapuja/drawing-competition/register"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 px-7 py-3 text-xs font-black tracking-wide text-slate-950 shadow-md transition-all hover:scale-105 active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
            >
              <span>Register Your Child (₹50)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/durgapuja/drawing-competition/list"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300/80 bg-white/80 px-5 py-2.5 text-xs font-bold text-slate-800 shadow-xs transition-all hover:bg-slate-100 sm:px-6 sm:py-3.5 sm:text-sm dark:border-white/15 dark:bg-stone-900/80 dark:text-slate-200 dark:hover:bg-stone-800"
            >
              <Users className="h-4 w-4 text-amber-500" />
              <span>Registered Participants List</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-slate-500 sm:text-xs dark:text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Instant Registration Confirmation via Email</span>
          </div>
        </div>
      </div>

      {/* WHY PARTICIPATING IS A MATTER OF PRIDE */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <div className="text-center sm:text-left">
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-amber-800 uppercase dark:text-amber-300">
            <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />A PROUD
            MOMENT FOR EVERY FAMILY
          </span>
          <h2 className="font-paytone mt-1 text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
            Why Every Participant is a Winner
          </h2>
          <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
            We believe every child who steps forward to express their art
            deserves unconditional applause and honor.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {pridePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/70 p-3.5 backdrop-blur-md transition-all hover:border-amber-500/40 dark:border-white/10 dark:bg-stone-900/70"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-paytone text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK EVENT HIGHLIGHTS GRID */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
        {/* Date */}
        <div className="card-glass flex flex-col items-center rounded-2xl border border-slate-200/90 p-3 text-center backdrop-blur-2xl sm:p-4 dark:border-white/12">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Calendar className="h-4.5 w-4.5" />
          </div>
          <span className="text-[9.5px] font-extrabold text-slate-400 uppercase">
            Competition Date
          </span>
          <span className="mt-0.5 text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
            Sunday, 11th Oct 2026
          </span>
        </div>

        {/* Time */}
        <div className="card-glass flex flex-col items-center rounded-2xl border border-slate-200/90 p-3 text-center backdrop-blur-2xl sm:p-4 dark:border-white/12">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Clock className="h-4.5 w-4.5" />
          </div>
          <span className="text-[9.5px] font-extrabold text-slate-400 uppercase">
            Reporting Time
          </span>
          <span className="mt-0.5 text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
            10:00 AM (Report 9:30 AM)
          </span>
        </div>

        {/* Total Prizes */}
        <div className="card-glass flex flex-col items-center rounded-2xl border border-slate-200/90 p-3 text-center backdrop-blur-2xl sm:p-4 dark:border-white/12">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Trophy className="h-4.5 w-4.5" />
          </div>
          <span className="text-[9.5px] font-extrabold text-slate-400 uppercase">
            Grand Awards
          </span>
          <span className="mt-0.5 text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
            15+ Trophies & Medals
          </span>
        </div>

        {/* Venue */}
        <div className="card-glass flex flex-col items-center rounded-2xl border border-slate-200/90 p-3 text-center backdrop-blur-2xl sm:p-4 dark:border-white/12">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <MapPin className="h-4.5 w-4.5" />
          </div>
          <span className="text-[9.5px] font-extrabold text-slate-400 uppercase">
            Venue Location
          </span>
          <span className="mt-0.5 truncate text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
            Madhyanchal Durga Puja Mandap
          </span>
        </div>
      </div>

      {/* 3-YEAR LEGACY & PAST EDITIONS SHOWCASE */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-amber-800 uppercase dark:text-amber-300">
              <Sparkles className="h-3 w-3 text-amber-500" />
              CELEBRATING 3 YEARS OF CREATIVE TRADITION
            </span>
            <h2 className="font-paytone mt-1 text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
              3 Years of Trust & Young Talent
            </h2>
            <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
              Started in 2024, our annual Sit & Draw competition has grown into
              a trusted community festival of art and youth talent in
              Chandannagar. 2026 marks our 3rd successful edition.
            </p>
          </div>
        </div>

        {/* STATS COUNTER BAR */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5 text-center sm:p-3">
            <div className="font-paytone text-lg font-extrabold text-amber-700 sm:text-2xl dark:text-amber-300">
              3rd Year
            </div>
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
              2024, 2025 & 2026
            </div>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5 text-center sm:p-3">
            <div className="font-paytone text-lg font-extrabold text-amber-700 sm:text-2xl dark:text-amber-300">
              300+
            </div>
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
              Past Participants
            </div>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5 text-center sm:p-3">
            <div className="font-paytone text-lg font-extrabold text-amber-700 sm:text-2xl dark:text-amber-300">
              30+
            </div>
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
              Trophies & Medals
            </div>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5 text-center sm:p-3">
            <div className="font-paytone text-lg font-extrabold text-amber-700 sm:text-2xl dark:text-amber-300">
              Assured
            </div>
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
              Certificates & Gifts
            </div>
          </div>
        </div>

        {/* PAST EDITIONS PHOTO GRID */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-900/10 sm:rounded-2xl dark:border-white/10">
            <Image
              src="/drawing_competition_past_1.png"
              alt="Past Drawing Competition Event Highlights"
              width={600}
              height={400}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-52"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent p-3 text-white">
              <span className="text-[10px] font-extrabold tracking-wider text-amber-400 uppercase">
                Past Highlights
              </span>
              <h4 className="font-paytone text-sm font-bold sm:text-base">
                Young Artists at Work
              </h4>
              <p className="text-[11px] text-slate-300">
                Enthusiastic children painting on floor mats with colors
                provided by our team.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-900/10 sm:rounded-2xl dark:border-white/10">
            <Image
              src="/drawing_competition_past_2.png"
              alt="Past Prize Distribution Ceremony"
              width={600}
              height={400}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-52"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent p-3 text-white">
              <span className="text-[10px] font-extrabold tracking-wider text-amber-400 uppercase">
                Prize Ceremony
              </span>
              <h4 className="font-paytone text-sm font-bold sm:text-base">
                Celebrating Our Champions
              </h4>
              <p className="text-[11px] text-slate-300">
                Proud winners receiving mementos, medals & certificates on
                stage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AGE CATEGORIES SHOWCASE */}
      <div className="space-y-3 sm:space-y-4">
        <div className="text-center sm:text-left">
          <h2 className="font-paytone text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
            Age Groups & Categories
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            Check the age criteria for each category as on competition date
            (11th Oct 2026).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {ageCategories.map((cat) => (
            <div
              key={cat.group}
              className="card-glass relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 p-4 transition-all hover:scale-[1.02] dark:border-white/12"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full border px-3 py-0.5 text-xs font-extrabold ${cat.badgeColor}`}
                  >
                    {cat.group}
                  </span>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    {cat.title}
                  </span>
                </div>

                <div className="pt-1">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase">
                    Age Limit
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {cat.age} ({cat.dob})
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 border-t border-slate-200/60 pt-2.5 dark:border-white/10">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>{cat.prizes}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRIZES, GIFTS & CEREMONY HIGHLIGHTS */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <h3 className="font-paytone mb-3.5 flex items-center gap-2 text-base font-bold text-slate-900 sm:text-xl dark:text-white">
          <Trophy className="h-5 w-5 text-amber-500" />
          <span>Grand Prize & Ceremony Recognition</span>
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {/* Category Prizes */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Trophy className="h-5 w-5" />
            </div>
            <div className="min-w-0 space-y-0.5 text-left">
              <div className="text-[10px] font-extrabold text-amber-800 uppercase dark:text-amber-300">
                5 Champions Per Group
              </div>
              <div className="text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                3 Trophies (1st, 2nd, 3rd) + 2 Medals (4th, 5th)
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                15 Total Champions crowned across Group A, B & C
              </div>
            </div>
          </div>

          {/* Certificate for All */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Award className="h-5 w-5" />
            </div>
            <div className="min-w-0 space-y-0.5 text-left">
              <div className="text-[10px] font-extrabold text-amber-800 uppercase dark:text-amber-300">
                Official Recognition
              </div>
              <div className="text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                Certificate of Participation for All
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                Every child is honored with an official certificate recognizing
                their artistic effort
              </div>
            </div>
          </div>

          {/* Prize Distribution Ceremony */}
          <div className="col-span-1 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 sm:col-span-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Award className="h-5 w-5" />
            </div>
            <div className="min-w-0 space-y-0.5 text-left">
              <div className="text-[10px] font-extrabold text-amber-800 uppercase dark:text-amber-300">
                Grand Stage Prize Distribution Ceremony
              </div>
              <div className="text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                Saturday, 17th October 2026 at 5:00 PM
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                Venue: Madhyanchal Durga Puja Mandap, Chandannagar, Hooghly
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RULES & GUIDELINES CARD */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <h3 className="font-paytone mb-3 flex items-center gap-2 text-base font-bold text-slate-900 sm:text-xl dark:text-white">
          <FileText className="h-5 w-5 text-amber-500" />
          <span>Rules & Guidelines</span>
        </h3>
        <ul className="space-y-2 text-xs text-slate-600 sm:space-y-2.5 sm:text-sm dark:text-slate-300">
          {rules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* LOCATION & VENUE MAP BANNER */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                Competition Venue
              </div>
              <h4 className="font-paytone text-sm font-bold text-slate-900 sm:text-lg dark:text-white">
                Madhyanchal Durga Puja Mandap
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Chandannagar, Hooghly, West Bengal
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Madhyanchal+Sarbajanin+Chandannagar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-2 text-xs font-extrabold text-amber-700 transition-all hover:bg-amber-500 hover:text-slate-950 dark:text-amber-300 dark:hover:text-slate-950"
          >
            <span>Navigate on Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* BOTTOM CTA CALLOUT */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-amber-500/20 p-5 text-center shadow-lg backdrop-blur-2xl sm:rounded-3xl sm:p-8 dark:border-white/15 dark:bg-stone-900/90">
        <BorderBeam
          size={200}
          duration={8}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="mx-auto max-w-xl space-y-3">
          <h3 className="font-paytone text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
            Give Your Child the Gift of Recognition
          </h3>
          <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-300">
            Seating capacity is limited to ensure personal care for every
            participant. Register your child online today to guarantee their
            spot on this prestigious stage!
          </p>

          <div className="pt-2">
            <Link
              href="/durgapuja/drawing-competition/register"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/60 bg-amber-500 px-7 py-3 text-xs font-black tracking-wide text-slate-950 shadow-md transition-all hover:scale-105 active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
            >
              <span>Proceed to Registration Form</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
