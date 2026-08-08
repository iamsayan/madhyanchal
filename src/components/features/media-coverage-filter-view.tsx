'use client';

import { useMemo, useState } from 'react';
import type { MediaCategory, MediaCoverageData, MediaItem } from '@/types';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import {
  ExternalLink,
  Filter,
  Globe,
  Newspaper,
  Radio,
  Search,
  Sparkles,
  Tv,
  Video,
} from 'lucide-react';

interface MediaCoverageFilterViewProps {
  data: MediaCoverageData;
}

export function MediaCoverageFilterView({ data }: MediaCoverageFilterViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const categories: { key: string; label: string; icon: React.ElementType }[] = [
    { key: 'all', label: 'All Coverage', icon: Filter },
    { key: 'news', label: 'News Articles', icon: Newspaper },
    { key: 'video', label: 'Videos & Vlogs', icon: Video },
    { key: 'official', label: 'Official Portals', icon: Globe },
    { key: 'mention', label: 'Media Mentions', icon: Radio },
  ];

  // Extract unique years dynamically
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    data.items.forEach((item) => {
      if (item.year) years.add(item.year);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [data.items]);

  // Filter items dynamically
  const filteredItems = useMemo(() => {
    return data.items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'all') {
        if (selectedYear === 'unknown') {
          if (item.year !== null && item.year !== undefined) return false;
        } else if (item.year !== Number(selectedYear)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesPublisher = item.publisher.toLowerCase().includes(query);
        const matchesDetails = item.details.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesPublisher || matchesDetails || matchesTags;
      }
      return true;
    });
  }, [data.items, selectedCategory, selectedYear, searchQuery]);

  const featuredItems = useMemo(() => {
    return data.items.filter((item) => item.featured);
  }, [data.items]);

  const getCategoryIcon = (category: MediaCategory) => {
    switch (category) {
      case 'news':
        return Newspaper;
      case 'video':
        return Video;
      case 'official':
        return Globe;
      case 'mention':
        return Radio;
      default:
        return Tv;
    }
  };

  const getCategoryBadgeClass = (category: MediaCategory) => {
    switch (category) {
      case 'news':
        return 'border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400';
      case 'video':
        return 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400';
      case 'official':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'mention':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400';
      default:
        return 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400';
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* FEATURED SPOTLIGHT SECTION */}
      {featuredItems.length > 0 && selectedCategory === 'all' && !searchQuery && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <h3 className="font-paytone text-base text-slate-900 sm:text-xl dark:text-white">
              Featured Headlines & Major Coverage
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item, idx) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <AnimatedWrapper key={item.id} direction="up" delay={idx * 0.05}>
                  <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/5 to-amber-500/5 p-5 backdrop-blur-2xl transition-all duration-300 dark:from-amber-500/15 dark:via-stone-950 dark:to-amber-500/10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-black text-amber-700 uppercase dark:text-amber-300">
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          Featured
                        </span>
                        {item.year && (
                          <span className="rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
                            {item.year}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold tracking-wider text-amber-600 uppercase dark:text-amber-400">
                          {item.publisher}
                        </span>
                        <h4 className="font-paytone text-base leading-snug text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                      </div>

                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {item.details}
                      </p>
                    </div>

                    {item.url && (
                      <div className="pt-4">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/15 px-3.5 py-2 text-xs font-bold text-amber-700 transition-all hover:bg-amber-500 hover:text-white dark:text-amber-300 dark:hover:text-stone-950"
                        >
                          <span>Open Coverage</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      )}

      {/* FILTER & SEARCH BAR */}
      <div className="card-glass space-y-4 rounded-2xl border border-slate-200/90 p-4 sm:p-6 dark:border-white/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* SEARCH INPUT */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search news, publisher, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300/80 bg-white/80 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 sm:text-sm dark:border-white/10 dark:bg-stone-900/80 dark:text-white dark:placeholder-slate-500"
            />
          </div>

          {/* YEAR FILTER SELECTOR */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Year:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-xl border border-slate-300/80 bg-white/80 px-3 py-2 text-xs font-bold text-slate-900 transition-all focus:border-amber-500 focus:outline-none dark:border-white/10 dark:bg-stone-900/80 dark:text-white"
            >
              <option value="all">All Years</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'border border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/20 dark:text-stone-950'
                    : 'border border-slate-200 bg-slate-100/70 text-slate-700 hover:border-amber-500/40 dark:border-white/10 dark:bg-stone-900/60 dark:text-slate-300'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ITEMS GRID */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-white/10">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            No media coverage found matching your filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => {
            const CategoryIcon = getCategoryIcon(item.category);
            const badgeClass = getCategoryBadgeClass(item.category);

            return (
              <AnimatedWrapper key={item.id} direction="up" delay={idx * 0.03}>
                <div className="card-glass card-hover-glow flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 p-4 sm:p-5 backdrop-blur-2xl transition-all duration-300 dark:border-white/10">
                  <div className="space-y-3">
                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${badgeClass}`}
                      >
                        <CategoryIcon className="h-3 w-3" />
                        {item.platform || item.category}
                      </span>
                      {item.year ? (
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                          {item.year}
                        </span>
                      ) : (
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                          Heritage
                        </span>
                      )}
                    </div>

                    {/* PUBLISHER & TITLE */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-extrabold tracking-wider text-amber-600 uppercase dark:text-amber-400">
                        {item.publisher}
                      </span>
                      <h3 className="font-paytone text-sm leading-snug text-slate-900 sm:text-base dark:text-white">
                        {item.title}
                      </h3>
                    </div>

                    {/* DETAILS */}
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.details}
                    </p>

                    {/* TAGS */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-slate-200/60 bg-slate-100/60 px-1.5 py-0.5 text-[9px] font-medium text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ACTION LINK */}
                  {item.url ? (
                    <div className="pt-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline dark:text-amber-400 dark:hover:text-amber-300"
                      >
                        <span>
                          {item.category === 'video'
                            ? 'Watch Video'
                            : item.category === 'official'
                            ? 'Visit Portal'
                            : 'Read Article'}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ) : (
                    <div className="pt-4 text-[10px] font-semibold text-slate-400 italic">
                      Mentioned in Regional Media
                    </div>
                  )}
                </div>
              </AnimatedWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
}
