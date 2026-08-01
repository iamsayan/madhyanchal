'use client';

import { useMemo, useState } from 'react';

import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';

import { CheckCircle2, Filter, Search, User, Users } from 'lucide-react';

export interface ParticipantRecord {
  registration_id?: string;
  name?: string;
  dob?: string;
  age?: string;
  category?: string;
  guardian_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
}

interface DrawingCompetitionListProps {
  initialData: ParticipantRecord[];
}

export function DrawingCompetitionList({
  initialData = [],
}: DrawingCompetitionListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchSearch =
        !searchTerm ||
        (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.registration_id || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (item.guardian_name || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ||
        (item.category || '').toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'A' && (item.category || '').includes('A')) ||
        (selectedCategory === 'B' && (item.category || '').includes('B')) ||
        (selectedCategory === 'C' && (item.category || '').includes('C'));

      return matchSearch && matchCategory;
    });
  }, [initialData, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* STATS & FILTER BAR */}
      <div className="card-glass relative overflow-hidden rounded-2xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6 dark:border-white/12">
        <BorderBeam
          size={160}
          duration={8}
          colorFrom="#f59e0b"
          colorTo="#fef08a"
        />

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-paytone text-base font-bold text-slate-900 sm:text-xl dark:text-white">
                Registered Participants ({filteredData.length})
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Official Directory for Youth Drawing Competition
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, or guardian..."
              className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 pl-9 pr-3.5 text-xs text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-white/15 dark:bg-stone-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-200/80 dark:border-white/10">
          <span className="mr-1 inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <Filter className="h-3 w-3" /> Category:
          </span>
          {[
            { label: 'All Categories', value: 'all' },
            { label: 'Group A (0-8 yrs)', value: 'A' },
            { label: 'Group B (8-12 yrs)', value: 'B' },
            { label: 'Group C (12-16 yrs)', value: 'C' },
          ].map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-bold transition-all',
                selectedCategory === cat.value
                  ? 'border-amber-500/80 bg-amber-500 text-slate-950 shadow-xs'
                  : 'border-slate-200/80 bg-white/50 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-stone-900 dark:text-slate-300 dark:hover:bg-white/5'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE SHOWCASE */}
      <div className="card-glass overflow-hidden rounded-2xl border border-slate-200/90 backdrop-blur-2xl dark:border-white/12">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center">
            <User className="mx-auto h-8 w-8 text-slate-400 opacity-60" />
            <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              No participants found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-100/70 text-[10.5px] font-extrabold uppercase tracking-wider text-slate-600 dark:border-white/10 dark:bg-stone-950/80 dark:text-slate-400">
                  <th className="px-4 py-3">Registration ID</th>
                  <th className="px-4 py-3">Participant Name</th>
                  <th className="px-4 py-3">Age & DOB</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Guardian Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 font-medium text-slate-700 dark:divide-white/10 dark:text-slate-300">
                {filteredData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-amber-500/5 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                      {item.registration_id || `DC/${2025000 + idx}`}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {item.name || 'Participant'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-semibold">
                        {item.age || '8 yrs'}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.dob || '2017-05-12'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                        {item.category || 'Group A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.guardian_name || '-'}</td>
                    <td className="px-4 py-3">{item.phone || '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" /> Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
