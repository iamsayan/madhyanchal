'use client';

import { useMemo, useState } from 'react';
import { Search, Users, ShieldCheck, UserCheck, Heart, Sparkles } from 'lucide-react';
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
        .map((n) => (n.startsWith('Shri') || n.startsWith('Dr.') ? n : `Shri ${n}`));

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
      .map((n) => n.replace(/\.?\s*and all the citizens of Madhyanchal\.?/i, '').trim())
      .filter(Boolean);
  }, [members]);

  const filteredGeneralMembers = useMemo(() => {
    if (!searchTerm.trim()) return generalMembersRaw;
    const term = searchTerm.toLowerCase();
    return generalMembersRaw.filter((name) => name.toLowerCase().includes(term));
  }, [generalMembersRaw, searchTerm]);

  return (
    <div className="space-y-6 sm:space-y-10">
      
      {/* EXECUTIVE COMMITTEE LEADERSHIP (Role-Wise Glass Cards) */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" /> Executive Committee Leadership ({executiveRoles.length} Portfolios)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {executiveRoles.map((role, idx) => (
            <div
              key={`${role.designation}-${idx}`}
              className="card-glass card-hover-glow relative overflow-hidden rounded-xl border border-slate-200/90 dark:border-white/12 p-3.5 sm:p-5 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-3 h-full"
            >
              <BorderBeam size={120} duration={6} colorFrom="#f59e0b" colorTo="#fef08a" />

              <div className="space-y-2.5">
                {/* Role Header Badge & Member Count */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[9px] sm:text-[10.5px] font-black uppercase text-amber-700 dark:text-amber-300">
                    <UserCheck className="h-3 w-3 text-amber-500" /> {role.designation}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
                    {role.names.length} {role.names.length === 1 ? 'Officer' : 'Officers'}
                  </span>
                </div>

                {/* Bulleted Officer Names */}
                <div className="space-y-1.5 pt-0.5">
                  {role.names.map((name, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 animate-pulse" />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-200/80 dark:border-white/10 pb-2.5">
          <div>
            <h3 className="font-paytone text-xs sm:text-xl text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
              <Users className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-amber-500 shrink-0" /> Samity Members & Volunteers
            </h3>
            <p className="text-[10.5px] sm:text-xs text-slate-600 dark:text-slate-400">
              Showing {filteredGeneralMembers.length} dedicated citizens and volunteers.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search member name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-slate-300/80 dark:border-white/15 bg-white/90 dark:bg-stone-900/90 pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 h-8 sm:h-9"
            />
          </div>
        </div>

        {/* Compact 2-Column Mobile Members Pill Dock */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
          {filteredGeneralMembers.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-stone-900/70 p-1.5 sm:p-2 text-[10px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors hover:border-amber-500/50 hover:bg-amber-500/10 truncate"
            >
              <UserCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500 shrink-0" />
              <span className="truncate">{name}</span>
            </div>
          ))}
        </div>

        {/* DEDICATED SACRED CITIZENS HONORIFIC BANNER */}
        <div className="card-glass relative overflow-hidden rounded-xl sm:rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-amber-500/15 p-3.5 sm:p-5 backdrop-blur-2xl text-center space-y-1.5 sm:space-y-2 mt-4">
          <BorderBeam size={140} duration={6} colorFrom="#f59e0b" colorTo="#fef08a" />
          <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300">
            <Sparkles className="h-4 w-4 text-amber-500 animate-spin-slow sm:h-5 sm:w-5 shrink-0" />
            <h4 className="font-paytone text-xs sm:text-base tracking-wide text-slate-900 dark:text-white">
              ✦ And All The Respected Citizens of Madhyanchal ✦
            </h4>
            <Heart className="h-4 w-4 fill-amber-500/40 text-amber-500 animate-pulse sm:h-5 sm:w-5 shrink-0" />
          </div>
          <p className="text-[10.5px] sm:text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
            Every resident, family, and devotee of Madhyanchal whose untiring love, participation, and patronage fuel our legacy year after year.
          </p>
        </div>
      </div>
    </div>
  );
}
