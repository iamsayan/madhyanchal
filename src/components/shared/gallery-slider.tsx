'use client';

import * as React from 'react';
import { ViewTransition } from 'react';
import { createPortal } from 'react-dom';

import CockpitImage from '@/components/shared/cockpit-image';
import type { Asset } from '@/lib/client';

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  X,
  ZoomIn,
} from 'lucide-react';

interface GallerySliderProps {
  slides?: Asset[];
}

export function GallerySlider({ slides = [] }: GallerySliderProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = React.useState<number>(0);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = React.useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;

  React.useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = React.useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const nextImage = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev + 1) % totalSlides
        );
      }
    },
    [selectedIndex, totalSlides]
  );

  const prevImage = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev - 1 + totalSlides) % totalSlides
        );
      }
    },
    [selectedIndex, totalSlides]
  );

  // Keyboard navigation for Lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, nextImage, prevImage]);

  // Scroll thumbnail into view inside Lightbox
  React.useEffect(() => {
    if (selectedIndex !== null && thumbnailContainerRef.current) {
      const activeThumb = thumbnailContainerRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [selectedIndex]);

  // Track active slide on mobile scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveMobileIndex(index);
  };

  if (totalSlides === 0) return null;

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      {/* ========================================================================= */}
      {/* 1. NATIVE MOBILE HORIZONTAL SNAP CAROUSEL (< 640px) */}
      {/* ========================================================================= */}
      <div className="block sm:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full snap-x snap-mandatory [scrollbar-width:none] gap-3.5 overflow-x-auto scroll-smooth pt-1 pb-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((asset, idx) => (
            <div
              key={asset._id || idx}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] w-[82vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-950 shadow-xl transition-transform active:scale-[0.98]"
            >
              <ViewTransition name={`mob-gallery-img-${asset._id || idx}`} share="morph">
                <CockpitImage
                  asset={asset}
                  preset="thumbnail"
                  fill
                  sizes="82vw"
                  containerClassName="absolute inset-0 size-full"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </ViewTransition>
              {/* Gradient Overlay & Metadata */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-3.5">
                <div className="flex justify-end">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur-md">
                    <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                  </span>
                </div>
                <div className="space-y-0.5 text-left">
                  <p className="line-clamp-1 text-xs font-bold text-white">
                    {asset.title || 'Jagadhatri Puja Memory'}
                  </p>
                  <p className="flex items-center gap-1 text-[10px] font-semibold text-amber-300">
                    <ZoomIn className="h-3 w-3" /> Tap for full screen
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Counter Pill Indicator */}
        <div className="mt-2 flex items-center justify-between px-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 text-amber-500">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Swipe for more ({totalSlides} Photos)</span>
          </span>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-black text-amber-600 dark:text-amber-400">
            {String(activeMobileIndex + 1).padStart(2, '0')} /{' '}
            {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ELEGANT DESKTOP BENTO GALLERY GRID (>= 640px) */}
      {/* ========================================================================= */}
      <div className="hidden grid-cols-2 gap-4 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {slides.map((asset, idx) => {
          const isFeatured = idx === 0 || idx % 7 === 0;

          return (
            <div
              key={asset._id || idx}
              onClick={() => openLightbox(idx)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-500/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] dark:border-white/12 dark:bg-stone-900/80 ${
                isFeatured
                  ? 'col-span-2 row-span-2 aspect-[16/10] min-h-[280px] sm:aspect-auto'
                  : 'aspect-[4/3]'
              }`}
            >
              <ViewTransition name={`desk-gallery-img-${asset._id || idx}`} share="morph">
                <CockpitImage
                  asset={asset}
                  preset="thumbnail"
                  fill
                  sizes={
                    isFeatured
                      ? '(max-width: 1024px) 100vw, 50vw'
                      : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                  }
                  containerClassName="absolute inset-0 size-full"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </ViewTransition>

              {/* Top Featured Pill Badge */}
              {isFeatured && (
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-500/20 px-3 py-1 text-[10px] font-black tracking-widest text-amber-300 uppercase shadow-md backdrop-blur-md">
                    <Sparkles className="h-3 w-3" /> Featured Art
                  </span>
                </div>
              )}

              {/* Hover Ambient Overlay & Controls */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex justify-end">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/80 text-amber-400 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <ZoomIn className="h-4.5 w-4.5" />
                  </span>
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="font-paytone line-clamp-1 text-sm text-white drop-shadow-sm sm:text-base">
                    {asset.title || 'Jagadhatri Puja Memory'}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. HIGH-END LIGHTBOX PORTAL OVERLAY */}
      {/* ========================================================================= */}
      {isMounted &&
        selectedIndex !== null &&
        createPortal(
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-[99999] flex flex-col justify-between bg-stone-950/95 p-4 backdrop-blur-2xl transition-all duration-300 sm:p-6"
          >
            {/* Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between border-b border-white/10 pb-4"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-black text-amber-400">
                  <span>
                    {selectedIndex + 1} / {totalSlides}
                  </span>
                </span>
                <span className="line-clamp-1 max-w-xs text-xs font-bold text-slate-200 sm:max-w-md sm:text-sm">
                  {slides[selectedIndex]?.title ||
                    'Jagadhatri Puja Celebration Memory'}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-rose-500 hover:bg-rose-500/80 active:scale-95 sm:h-10 sm:w-10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Stage Image Display */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-1 items-center justify-center py-2"
            >
              <div className="relative flex h-full max-h-[72vh] w-full max-w-[90vw] items-center justify-center sm:max-h-[76vh]">
                <ViewTransition
                  name={`${isMobile ? 'mob' : 'desk'}-gallery-img-${slides[selectedIndex]?._id || selectedIndex}`}
                  share="morph"
                >
                  <CockpitImage
                    asset={slides[selectedIndex]}
                    preset="large"
                    fill
                    lazy={false}
                    loaderPlaceholder={false}
                    containerClassName="relative size-full bg-transparent flex items-center justify-center"
                    className="rounded-2xl border border-white/15 object-contain shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-md"
                  />
                </ViewTransition>
              </div>

              {/* Side Navigation Glass Buttons */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-1 z-[999999] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-stone-900/80 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950 active:scale-90 sm:left-4 sm:h-13 sm:w-13"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-1 z-[999999] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-stone-900/80 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950 active:scale-90 sm:right-4 sm:h-13 sm:w-13"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Horizontal Thumbnail Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center pt-2"
            >
              <div
                ref={thumbnailContainerRef}
                className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-2 backdrop-blur-md [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {slides.map((asset, idx) => (
                  <button
                    key={asset._id || idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
                      selectedIndex === idx
                        ? 'scale-105 border-amber-400 ring-2 ring-amber-400/50'
                        : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <CockpitImage
                      asset={asset}
                      preset="thumbnail"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
