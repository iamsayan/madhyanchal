'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Play,
  X,
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';

export interface VirtualTourItem {
  id: string;
  title: string;
  year: string;
  videoId: string;
  description: string;
  location?: string;
  badge?: string;
}

const DEFAULT_TOURS: VirtualTourItem[] = [
  {
    id: '2025-360',
    title: '360° Grand Pandal & Mandap Virtual Tour 2025',
    year: '2025',
    videoId: 'nWpRygeZ73Y',
    description:
      'Experience the spectacular 360-degree panoramic view of Madhyanchal Sarbajanin Jagadhatri Puja pandal, idol & lighting tapestry.',
    location: 'Station Road, Chandannagar',
    badge: '2025 Official 360°',
  },
  {
    id: '2024-360',
    title: '360° Pandal & Mandap Virtual Tour 2024',
    year: '2024',
    videoId: 'RqcynxeuyZM',
    description:
      'Immersive 360-degree panoramic view of Madhyanchal Sarbajanin Jagadhatri Puja pandal, idol & lighting tapestry.',
    location: 'Station Road, Chandannagar',
    badge: '2024 Archive 360°',
  },
];

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  items?: VirtualTourItem[];
}

export function VirtualTourModal({
  isOpen,
  onClose,
  items = DEFAULT_TOURS,
}: VirtualTourModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body & html scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const activeTour = items[selectedIdx] || items[0];
  const thumbUrl = `https://img.youtube.com/vi/${activeTour.videoId}/hqdefault.jpg`;
  const youtubeAppUrl = `https://www.youtube.com/watch?v=${activeTour.videoId}`;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Frosted Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 cursor-pointer bg-stone-950/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Sheet Window */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-amber-500/40 bg-stone-950 shadow-2xl backdrop-blur-2xl dark:border-amber-500/30"
          >
            {/* MODAL HEADER BAR - Matched with themeColor #1c1917 (stone-900) */}
            <div className="flex items-center justify-between border-b border-stone-800 bg-[#1c1917]/95 px-4 py-3 text-white sm:px-6">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-xs">
                  <Compass className="h-4.5 w-4.5 animate-spin [animation-duration:8s]" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-paytone text-base font-bold text-white sm:text-lg">
                    360° Virtual Pandal Tour
                  </h3>
                  <p className="truncate text-[10.5px] font-medium text-amber-400 sm:text-xs">
                    Chandannagar Lighting & Architecture
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-300 transition-all hover:bg-rose-500 hover:text-white active:scale-95"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* MODAL BODY CONTENT */}
            <div className="space-y-4 overflow-y-auto p-3.5 sm:p-5">
              {/* YEAR SELECTION TABS */}
              <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-bold text-stone-300">
                  Select Experience Year:
                </span>
                <div className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-stone-900/90 p-1 sm:flex sm:w-auto sm:items-center">
                  {items.map((tour, idx) => {
                    const isActive = selectedIdx === idx;
                    return (
                      <button
                        key={tour.id}
                        type="button"
                        onClick={() => {
                          setSelectedIdx(idx);
                          sendGTMEvent({
                            event: 'select_360_modal_year',
                            year: tour.year,
                          });
                        }}
                        className={cn(
                          'flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition-all',
                          isActive
                            ? 'bg-amber-500 text-slate-950 shadow-xs'
                            : 'text-stone-300 hover:bg-white/10 hover:text-white'
                        )}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{tour.year}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 360 DISPLAY CARD CONTAINER */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-stone-900 shadow-xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-video">
                  <Image
                    src={thumbUrl}
                    alt={activeTour.title}
                    unoptimized
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/20" />

                  {/* ANIMATED COMPASS ORBIT & CENTER LAUNCH ACTION */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <a
                      href={youtubeAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative flex cursor-pointer flex-col items-center gap-3 sm:gap-4"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
                        <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-amber-400/60 [animation-duration:10s]" />
                        <div className="absolute h-12 w-12 animate-ping rounded-full bg-amber-500/20 [animation-duration:3s] sm:h-14 sm:w-14" />
                        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-2xl transition-transform group-hover/btn:scale-110 active:scale-95 sm:h-13 sm:w-13">
                          <Play className="ml-0.5 h-5.5 w-5.5 fill-current sm:h-6 sm:w-6" />
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-500 px-4 py-1.5 text-xs font-black text-slate-950 shadow-lg transition-all group-hover/btn:scale-105 group-hover/btn:bg-amber-400 sm:px-5 sm:py-2 sm:text-sm">
                        <Compass className="h-3.5 w-3.5 animate-spin [animation-duration:6s]" />
                        <span>Launch 360° Tour</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </a>
                  </div>
                </div>

                {/* CARD FOOTER */}
                <div className="border-t border-white/10 bg-stone-950/95 p-4 text-white backdrop-blur-xl">
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[9.5px] font-extrabold tracking-wider text-amber-300 uppercase">
                        {activeTour.badge || `${activeTour.year} 360°`}
                      </span>
                      {activeTour.location && (
                        <span className="flex items-center gap-1 text-[10px] text-stone-400">
                          <MapPin className="h-3 w-3 text-amber-400" />
                          {activeTour.location}
                        </span>
                      )}
                    </div>
                    <h4 className="font-paytone text-sm font-bold text-white sm:text-base">
                      {activeTour.title}
                    </h4>
                    <p className="text-[11.5px] leading-relaxed text-stone-300">
                      {activeTour.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
