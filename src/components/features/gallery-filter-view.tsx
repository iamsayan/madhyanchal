'use client';

import { useMemo, useState } from 'react';

import { GallerySlider } from '@/components/shared/gallery-slider';
import type { Asset } from '@/lib/client';
import type { GalleryItem } from '@/types';

import { Calendar, Camera, Sparkles } from 'lucide-react';

interface GalleryFilterViewProps {
  items?: GalleryItem[];
}

export function GalleryFilterView({ items = [] }: GalleryFilterViewProps) {
  // Extract all available years and create photo pools
  const { yearTabs, photosByYear, allPhotos } = useMemo(() => {
    const photosMap: Record<string, Asset[]> = {};
    const yearList: string[] = [];
    const pool: Asset[] = [];

    items.forEach((item) => {
      if (item.year && item.images && item.images.length > 0) {
        if (!photosMap[item.year]) {
          photosMap[item.year] = [];
          yearList.push(item.year);
        }
        photosMap[item.year].push(...item.images);
        pool.push(...item.images);
      }
    });

    yearList.sort((a, b) => Number(b) - Number(a));

    return {
      yearTabs: ['All', ...yearList],
      photosByYear: photosMap,
      allPhotos: pool,
    };
  }, [items]);

  const [selectedTab, setSelectedTab] = useState<string>('All');

  // Active photos based on selected tab
  const activePhotos = useMemo(() => {
    if (selectedTab === 'All') return allPhotos;
    return photosByYear[selectedTab] || [];
  }, [selectedTab, allPhotos, photosByYear]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Year Filter Track */}
      {yearTabs.length > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-xs backdrop-blur-xl sm:flex-row sm:px-5 sm:py-3.5 dark:border-white/10 dark:bg-stone-900/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Calendar className="h-4 w-4 text-amber-500" />
            <span>Archive Year:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {yearTabs.map((tab) => {
              const isActive = selectedTab === tab;
              const count =
                tab === 'All'
                  ? allPhotos.length
                  : photosByYear[tab]?.length || 0;

              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-black transition-all duration-300 ${
                    isActive
                      ? 'scale-105 border border-amber-400 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                      : 'border border-slate-200/80 bg-slate-100/80 text-slate-600 hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-600 dark:border-white/10 dark:bg-stone-800/80 dark:text-slate-300 dark:hover:text-amber-400'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`py-0.2 rounded-full px-1.5 text-[9.5px] ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-200 text-slate-500 dark:bg-stone-700 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Gallery Photo Slider Grid */}
      {activePhotos.length > 0 ? (
        <GallerySlider slides={activePhotos} layout="grid" />
      ) : (
        <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-3 rounded-3xl border border-slate-200/80 bg-white/60 p-8 text-center backdrop-blur-xl dark:border-white/10 dark:bg-stone-900/60">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-500">
            <Camera className="h-6 w-6" />
          </div>
          <h3 className="font-paytone text-base text-slate-900 dark:text-slate-100">
            No Photos Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Photos for this archive filter will be uploaded soon.
          </p>
        </div>
      )}
    </div>
  );
}
