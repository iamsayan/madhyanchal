'use client';

import { useMemo } from 'react';
import { Users, UserCheck, Heart, Sparkles } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

interface Person {
  name: string;
  designation: string;
}

interface MembersListProps {
  members: Person[];
}

const EXECUTIVE_DESIGNATIONS = [
  'President',
  'Vice President',
  'General Secretary',
  'Working Secretary',
  'Joint Treasurer',
  'Assistant Treasurer',
];

export function MembersList({ members = [] }: MembersListProps) {
  const executiveRoles = useMemo(() => {
    return EXECUTIVE_DESIGNATIONS.map((designation) => {
      const found = members.find((m) => m.designation === designation);
      if (!found) return { designation, names: [] };

      const names = found.name
        .split(/[,&]/)
        .map((n) => n.trim())
        .filter(Boolean)
        .map((n) =>
          n.startsWith('Shri') || n.startsWith('Dr.') ? n : `Shri ${n}`
        );

      return {
        designation,
        names,
      };
    }).filter((role) => role.names.length > 0);
  }, [members]);

  const generalMembers = useMemo(() => {
    const genObj = members.find((m) => m.designation === 'Members');
    if (!genObj) return [];
    return genObj.name
      .split(',')
      .map((n) => n.trim())
      .map((n) =>
        n.replace(/\.?\s*and all the citizens of Madhyanchal\.?/i, '').trim()
      )
      .filter(Boolean);
  }, [members]);

  return (
    <div className="space-y-5 sm:space-y-7">
      {/* EXECUTIVE COMMITTEE CARDS (Without text title) */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
        {executiveRoles.map((role, idx) => (
          <div
            key={`${role.designation}-${idx}`}
            className="card-glass relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-xl transition-all duration-200 sm:p-4 dark:border-white/12"
          >
            <BorderBeam
              size={100}
              duration={6}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />

            <div className="space-y-2">
              {/* Role Header Badge & Member Count */}
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5 dark:border-white/10">
                <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[9.5px] font-black text-amber-700 uppercase dark:text-amber-300">
                  <UserCheck className="h-3 w-3 text-amber-500" />{' '}
                  {role.designation}
                </span>
                <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400">
                  {role.names.length}{' '}
                  {role.names.length === 1 ? 'Member' : 'Members'}
                </span>
              </div>

              {/* Officer Names */}
              <div className="space-y-1 pt-0.5">
                {role.names.map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GENERAL MEMBERS TEAM SHOWCASE */}
      <div className="space-y-2.5 text-center">
        <div className="flex flex-col items-center justify-center border-b border-slate-200/70 pb-2 text-center dark:border-white/10">
          <h3 className="font-paytone text-sm text-slate-900 sm:text-base dark:text-white">
            Samity Members & Volunteers
          </h3>
          <p className="text-[10.5px] text-slate-600 dark:text-slate-400">
            Showing {generalMembers.length} dedicated citizens & volunteers.
          </p>
        </div>

        {/* Member Names List */}
        <div className="no-scrollbar flex max-h-[160px] flex-wrap items-center justify-center gap-x-2 gap-y-2 overflow-y-auto rounded-xl border border-slate-200/80 bg-white/60 p-3.5 leading-relaxed backdrop-blur-sm sm:max-h-none sm:overflow-visible sm:p-4 dark:border-white/10 dark:bg-stone-950/40">
          {generalMembers.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-xs font-bold text-slate-800 transition-colors hover:text-amber-600 dark:text-slate-200 dark:hover:text-amber-400"
            >
              {name}
              {i < generalMembers.length - 1 && (
                <span className="ml-2 text-slate-400 dark:text-stone-600">
                  •
                </span>
              )}
            </span>
          ))}
        </div>

        {/* DEDICATED SACRED CITIZENS HONORIFIC BANNER */}
        <div className="card-glass relative mt-2.5 space-y-0.5 overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-2.5 text-center backdrop-blur-xl sm:p-3">
          <BorderBeam
            size={100}
            duration={6}
            colorFrom="#f59e0b"
            colorTo="#fef08a"
          />
          <div className="flex items-center justify-center gap-1.5 text-amber-700 dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-500" />
            <h4 className="font-paytone text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
              ✦ And All Respected Citizens of Madhyanchal ✦
            </h4>
            <Heart className="h-3.5 w-3.5 shrink-0 fill-amber-500/40 text-amber-500" />
          </div>
          <p className="mx-auto max-w-xl text-[10px] leading-snug font-normal text-slate-600 dark:text-slate-300">
            Every resident, family, and devotee of Madhyanchal whose untiring
            love and patronage fuel our legacy year after year.
          </p>
        </div>
      </div>
    </div>
  );
}
