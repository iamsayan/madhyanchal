'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  Users,
  ShieldCheck,
  UserCheck,
  Heart,
  Sparkles,
} from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');

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

  const generalMembersRaw = useMemo(() => {
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

  const filteredGeneralMembers = useMemo(() => {
    if (!searchTerm.trim()) return generalMembersRaw;
    const term = searchTerm.toLowerCase();
    return generalMembersRaw.filter((name) =>
      name.toLowerCase().includes(term)
    );
  }, [generalMembersRaw, searchTerm]);

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* EXECUTIVE COMMITTEE LEADERSHIP (Role-Wise Glass Cards) */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-700 uppercase dark:text-amber-300">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />{' '}
          Executive Committee Leadership
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {executiveRoles.map((role, idx) => (
            <div
              key={`${role.designation}-${idx}`}
              className="card-glass card-hover-glow relative flex h-full flex-col justify-between space-y-3 overflow-hidden rounded-xl border border-slate-200/90 p-3.5 backdrop-blur-2xl transition-all duration-300 sm:p-5 dark:border-white/12"
            >
              <BorderBeam
                size={120}
                duration={6}
                colorFrom="#f59e0b"
                colorTo="#fef08a"
              />

              <div className="space-y-2.5">
                {/* Role Header Badge & Member Count */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 dark:border-white/10">
                  <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[9px] font-black text-amber-700 uppercase sm:text-[10.5px] dark:text-amber-300">
                    <UserCheck className="h-3 w-3 text-amber-500" />{' '}
                    {role.designation}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 sm:text-xs dark:text-slate-400">
                    {role.names.length}{' '}
                    {role.names.length === 1 ? 'Member' : 'Members'}
                  </span>
                </div>

                {/* Bulleted Officer Names */}
                <div className="space-y-1.5 pt-0.5">
                  {role.names.map((name, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-800 sm:text-sm dark:text-slate-200"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-amber-500" />
                      <span className="truncate">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GENERAL MEMBERS TEAM SHOWCASE */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col justify-between gap-2.5 border-b border-slate-200/80 pb-2.5 sm:flex-row sm:items-center dark:border-white/10">
          <div>
            <h3 className="font-paytone flex items-center gap-1.5 text-xs text-slate-900 sm:gap-2 sm:text-xl dark:text-white">
              <Users className="h-3.5 w-3.5 shrink-0 text-amber-500 sm:h-5 sm:w-5" />{' '}
              Samity Members & Volunteers
            </h3>
            <p className="text-[10.5px] text-slate-600 sm:text-xs dark:text-slate-400">
              Showing {filteredGeneralMembers.length} dedicated citizens and
              volunteers.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search member name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 w-full rounded-full border border-slate-300/80 bg-white/90 py-1.5 pr-3 pl-8 text-xs text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none sm:h-9 dark:border-white/15 dark:bg-stone-900/90 dark:text-white"
            />
          </div>
        </div>

        {/* Compact 2-Column Mobile Members Pill Dock */}
        <div className="no-scrollbar grid max-h-[360px] grid-cols-2 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5">
          {filteredGeneralMembers.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-1 truncate rounded-lg border border-slate-200/80 bg-white/70 p-1.5 text-[10px] font-semibold text-slate-800 transition-colors hover:border-amber-500/50 hover:bg-amber-500/10 sm:gap-1.5 sm:p-2 sm:text-xs dark:border-white/10 dark:bg-stone-900/70 dark:text-slate-200"
            >
              <UserCheck className="h-2.5 w-2.5 shrink-0 text-amber-500 sm:h-3 sm:w-3" />
              <span className="truncate">{name}</span>
            </div>
          ))}
        </div>

        {/* DEDICATED SACRED CITIZENS HONORIFIC BANNER */}
        <div className="card-glass relative mt-4 space-y-1.5 overflow-hidden rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-amber-500/15 p-3.5 text-center backdrop-blur-2xl sm:space-y-2 sm:rounded-2xl sm:p-5">
          <BorderBeam
            size={140}
            duration={6}
            colorFrom="#f59e0b"
            colorTo="#fef08a"
          />
          <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300">
            <Sparkles className="animate-spin-slow h-4 w-4 shrink-0 text-amber-500 sm:h-5 sm:w-5" />
            <h4 className="font-paytone text-xs tracking-wide text-slate-900 sm:text-base dark:text-white">
              ✦ And All The Respected Citizens of Madhyanchal ✦
            </h4>
            <Heart className="h-4 w-4 shrink-0 animate-pulse fill-amber-500/40 text-amber-500 sm:h-5 sm:w-5" />
          </div>
          <p className="mx-auto max-w-xl text-[10.5px] leading-relaxed font-normal text-slate-600 sm:text-xs dark:text-slate-300">
            Every resident, family, and devotee of Madhyanchal whose untiring
            love, participation, and patronage fuel our legacy year after year.
          </p>
        </div>
      </div>
    </div>
  );
}
