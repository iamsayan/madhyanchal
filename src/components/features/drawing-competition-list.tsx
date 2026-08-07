'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Search, User } from 'lucide-react';

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

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return initialData;
    const query = searchTerm.toLowerCase().trim();
    return initialData.filter(
      (item) =>
        (item.name || '').toLowerCase().includes(query) ||
        (item.registration_id || '').toLowerCase().includes(query) ||
        (item.guardian_name || '').toLowerCase().includes(query)
    );
  }, [initialData, searchTerm]);

  return (
    <div className="space-y-3 p-1">
      {/* MINIMAL SEARCH BAR */}
      <div className="relative w-full">
        <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by participant name or ID..."
          className="h-9 w-full rounded-xl border border-slate-300/80 bg-white/80 pr-3 pl-9 text-xs text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-900 dark:text-white"
        />
      </div>

      {/* COMPACT CARD LIST */}
      {filteredData.length === 0 ? (
        <div className="card-glass rounded-2xl border border-slate-200/90 p-6 text-center dark:border-white/12">
          <User className="mx-auto h-7 w-7 text-slate-400 opacity-60" />
          <p className="mt-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            No participants found
          </p>
        </div>
      ) : (
        <div className="space-y-1.5 pr-1">
          {filteredData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-2.5 py-2 text-left dark:border-white/10 dark:bg-stone-900/80"
            >
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-mono text-[11px] font-black text-amber-600 dark:text-amber-400">
                    {item.registration_id || `DC/${2026000 + idx + 1}`}
                  </span>
                  <span className="truncate text-xs font-bold text-slate-900 dark:text-white">
                    {item.name || 'Participant'}
                  </span>
                </div>
                <p className="truncate text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  Guardian:{' '}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {item.guardian_name || '-'}
                  </span>
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 text-[9.5px] font-bold">
                <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-amber-700 dark:text-amber-300">
                  {item.category || 'Group A'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <span className="hidden sm:inline">Confirmed</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
