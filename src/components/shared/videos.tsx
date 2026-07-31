'use client';

import * as React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { HomepageVideo } from '@/types';

import { Film, Play } from 'lucide-react';

interface VideosProps {
  items?: HomepageVideo[];
}

const DEFAULT_VIDEOS: HomepageVideo[] = [
  {
    video_id: 'Zq1Yn5D3vMo',
    title:
      'Chandannagar Jagadhatri Puja Light Tapestries & Nocturnal Procession Grandeur',
  },
  {
    video_id: '8vK8v1gW0kM',
    title:
      'Madhyanchal Sarbajanin Pandal Architecture & 56th Jubilee Illumination',
  },
  {
    video_id: 'Ld6V6W8Qx88',
    title: 'World-Famous Moving Light Tableaux Shobhajatra Highlights',
  },
  {
    video_id: 'Y3k9v8Qx88a',
    title: 'Golden Jubilee Special Divine Cultural Celebrations & Rituals',
  },
];

export function Videos({ items = [] }: VideosProps) {
  const videoList = items && items.length > 0 ? items : DEFAULT_VIDEOS;
  const [activeIdx, setActiveIdx] = React.useState<number>(0);

  const activeVideo = videoList[activeIdx] || videoList[0];

  return (
    <div className="grid grid-cols-1 gap-4 pt-2 sm:gap-6 sm:pt-4 lg:grid-cols-12">
      {/* MAIN FEATURED VIDEO PLAYER CONTAINER (8-col on desktop) */}
      <div className="flex flex-col space-y-3 lg:col-span-8">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-950 sm:rounded-3xl dark:border-white/15">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.video_id}?autoplay=0&rel=0`}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>

        {/* ACTIVE VIDEO STATUS BAR */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white/80 p-3 backdrop-blur-md sm:rounded-2xl sm:p-4 dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex min-w-0 items-center gap-2.5 pr-2">
            <span className="flex h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-rose-500" />
            <h4 className="font-paytone truncate text-xs font-bold text-slate-900 sm:text-base dark:text-slate-100">
              {activeVideo.title}
            </h4>
          </div>
          <span className="shrink-0 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider text-rose-600 uppercase sm:text-xs dark:text-rose-400">
            Playing {activeIdx + 1} of {videoList.length}
          </span>
        </div>
      </div>

      {/* INTERACTIVE PLAYLIST DRAWER (4-col on desktop) */}
      <div className="flex flex-col space-y-2.5 lg:col-span-4">
        <div className="flex items-center justify-between px-1 pb-1">
          <span className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase sm:text-xs dark:text-slate-400">
            <Film className="h-3.5 w-3.5 text-amber-500" /> Video Archive
            Playlist
          </span>
          <span className="text-[10px] font-bold text-amber-600 sm:text-xs dark:text-amber-400">
            {videoList.length} Videos
          </span>
        </div>

        <div className="flex max-h-[460px] scrollbar-none flex-col gap-2 overflow-y-auto pr-0.5">
          {videoList.map((video, idx) => {
            const isActive = activeIdx === idx;
            const thumbUrl = `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'group relative flex cursor-pointer items-center gap-3 rounded-xl border p-2 text-left transition-all duration-300 sm:rounded-2xl sm:p-2.5',
                  isActive
                    ? 'border-amber-500/70 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent font-bold dark:bg-amber-500/15'
                    : 'border-slate-200/80 bg-white/70 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-white/5'
                )}
              >
                {/* Thumbnail Preview */}
                <div className="relative aspect-video h-14 shrink-0 overflow-hidden rounded-lg bg-slate-950 sm:h-16 sm:rounded-xl">
                  <Image
                    src={thumbUrl}
                    alt={video.title}
                    unoptimized
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30">
                    <div
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full transition-transform',
                        isActive
                          ? 'scale-110 bg-amber-500 text-slate-950'
                          : 'bg-slate-900/80 text-white group-hover:scale-110'
                      )}
                    >
                      <Play className="ml-0.5 h-3 w-3 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Video Title & Index */}
                <div className="flex min-w-0 flex-1 flex-col space-y-0.5">
                  <span
                    className={cn(
                      'line-clamp-2 text-xs leading-snug font-bold',
                      isActive
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-slate-900 dark:text-slate-100'
                    )}
                  >
                    {video.title}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    <span className="h-1 w-1 rounded-full bg-amber-500" />
                    Video {idx + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
