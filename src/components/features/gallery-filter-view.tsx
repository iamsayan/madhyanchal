'use client';

import { useMemo, useState } from 'react';

import { GallerySlider } from '@/components/shared/gallery-slider';
import type { Asset } from '@/lib/client';
import type { GalleryItem } from '@/types';

import { Camera } from 'lucide-react';

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
        <div className="flex w-full items-center justify-start gap-2.5 overflow-x-auto scrollbar-none snap-x snap-mandatory rounded-2xl border border-slate-200/90 bg-white/80 p-2 backdrop-blur-xl sm:justify-center sm:overflow-visible sm:p-2.5 dark:border-white/10 dark:bg-stone-900/80">
          <span className="shrink-0 text-xs font-black text-slate-500 dark:text-slate-400 pl-1 sm:pl-0">
            Filter:
          </span>
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
                className={`inline-flex shrink-0 snap-center items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold transition-all duration-200 cursor-pointer shadow-none ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border border-amber-400/80'
                    : 'border border-slate-200/80 bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 dark:border-white/10 dark:bg-stone-800/80 dark:text-slate-300 dark:hover:bg-stone-700'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[9.5px] font-black ${
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
