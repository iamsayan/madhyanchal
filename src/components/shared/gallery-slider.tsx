'use client';

import { MouseEvent, useCallback, useEffect, useRef, useState, ViewTransition } from 'react';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

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
  layout?: 'carousel' | 'grid' | 'responsive';
}

export function GallerySlider({
  slides = [],
  layout = 'responsive',
}: GallerySliderProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const nextImage = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev + 1) % totalSlides
        );
      }
    },
    [selectedIndex, totalSlides]
  );

  const prevImage = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setSelectedIndex((prev) =>
          prev === null ? 0 : (prev - 1 + totalSlides) % totalSlides
        );
      }
    },
    [selectedIndex, totalSlides]
  );

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, nextImage, prevImage]);

  // Scroll active thumbnail into view inside Lightbox
  useEffect(() => {
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

  if (totalSlides === 0) return null;

  const currentSlide = selectedIndex !== null ? slides[selectedIndex] : null;

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      {/* 1. UNIVERSAL CAROUSEL MODE (Always Carousel everywhere) */}
      {layout === 'carousel' && (
        <div className="group/carousel relative">
          <div
            ref={scrollRef}
            className="flex w-full snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto scroll-smooth pt-1 pb-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((asset, idx) => (
              <div
                key={asset._id ? asset._id + idx : idx}
                onClick={() => openLightbox(idx)}
                className="group/item relative aspect-[4/3] w-[82vw] shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 transition-transform active:scale-[0.98] sm:w-[45vw] md:w-[30vw] dark:border-white/10"
              >
                <ViewTransition
                  name={`gallery-carousel-img-${asset._id || 'img'}-${idx}`}
                >
                  <CockpitImage
                    asset={asset}
                    preset="thumbnail"
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 30vw"
                    containerClassName="absolute inset-0 size-full"
                    className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                  />
                </ViewTransition>

                {/* Gradient Overlay & Metadata */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent p-3.5">
                  <div className="flex justify-end">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur-md">
                      <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                    </span>
                  </div>
                  <div className="space-y-0.5 text-left">
                    <p className="line-clamp-1 text-xs font-bold text-white drop-shadow-sm sm:text-sm">
                      {asset.title || 'Jagadhatri Puja Memory'}
                    </p>
                    <p className="flex items-center gap-1 text-[10px] font-semibold text-amber-300 drop-shadow-sm sm:text-xs">
                      <ZoomIn className="h-3 w-3" /> Tap to expand
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Next/Prev Controls for Carousel Mode */}
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
              }
            }}
            className="absolute top-1/2 -left-3 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-amber-500 hover:text-slate-950 sm:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
              }
            }}
            className="absolute top-1/2 -right-3 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-amber-500 hover:text-slate-950 sm:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* 2. UNIVERSAL GRID MODE (Always Grid everywhere) */}
      {layout === 'grid' && (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4">
          {slides.map((asset, idx) => {
            const isFeatured = idx === 0 || idx % 7 === 0;

            return (
              <div
                key={asset._id ? asset._id + idx : idx}
                onClick={() => openLightbox(idx)}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200/90 bg-slate-100 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/80 sm:rounded-2xl dark:border-white/12 dark:bg-stone-900/80 ${
                  isFeatured
                    ? 'col-span-2 row-span-2 aspect-[16/10] min-h-[220px] sm:aspect-auto sm:min-h-[280px]'
                    : 'aspect-[4/3]'
                }`}
              >
                <ViewTransition
                  name={`gallery-grid-img-${asset._id || 'img'}-${idx}`}
                >
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
                  <div className="absolute top-2.5 left-2.5 z-20 sm:top-3 sm:left-3">
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-500/20 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-amber-300 uppercase shadow-md backdrop-blur-md sm:px-3 sm:py-1 sm:text-[10px]">
                      <Sparkles className="h-3 w-3" /> Featured Art
                    </span>
                  </div>
                )}

                {/* Hover Ambient Overlay & Controls */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
                  <div className="flex justify-end">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-slate-950/80 text-amber-400 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <ZoomIn className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="font-paytone line-clamp-1 text-xs text-white drop-shadow-sm sm:text-base">
                      {asset.title || 'Jagadhatri Puja Memory'}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. RESPONSIVE MODE (Desktop Grid, Mobile Carousel) */}
      {layout === 'responsive' && (
        <>
          {/* Mobile Carousel (< 640px) */}
          <div className="block sm:hidden">
            <div
              ref={scrollRef}
              className="flex w-full snap-x snap-mandatory [scrollbar-width:none] gap-3.5 overflow-x-auto scroll-smooth pt-1 pb-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {slides.map((asset, idx) => (
                <div
                  key={asset._id ? asset._id + idx : idx}
                  onClick={() => openLightbox(idx)}
                  className="group/item relative aspect-[4/3] w-[82vw] shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl border border-slate-100/80 bg-slate-900 transition-transform active:scale-[0.98] dark:border-white/10"
                >
                  <ViewTransition
                    name={`gallery-mob-img-${asset._id || 'img'}-${idx}`}
                  >
                    <CockpitImage
                      asset={asset}
                      preset="thumbnail"
                      fill
                      sizes="82vw"
                      containerClassName="absolute inset-0 size-full"
                      className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                    />
                  </ViewTransition>

                  <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent p-3.5">
                    <div className="flex justify-end">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur-md">
                        <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                      </span>
                    </div>
                    <div className="space-y-0.5 text-left">
                      <p className="line-clamp-1 text-xs font-bold text-white drop-shadow-sm">
                        {asset.title || 'Jagadhatri Puja Memory'}
                      </p>
                      <p className="flex items-center gap-1 text-[10px] font-semibold text-amber-300 drop-shadow-sm">
                        <ZoomIn className="h-3 w-3" /> Tap for full screen
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Bento Grid (>= 640px) */}
          <div className="hidden grid-cols-2 gap-4 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {slides.map((asset, idx) => {
              const isFeatured = idx === 0 || idx % 7 === 0;

              return (
                <div
                  key={asset._id ? asset._id + idx : idx}
                  onClick={() => openLightbox(idx)}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200/90 bg-slate-100 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-500/80 dark:border-white/12 dark:bg-stone-900/80 ${
                    isFeatured
                      ? 'col-span-2 row-span-2 aspect-[16/10] min-h-[280px] sm:aspect-auto'
                      : 'aspect-[4/3]'
                  }`}
                >
                  <ViewTransition
                    name={`gallery-desk-img-${asset._id || 'img'}-${idx}`}
                  >
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

                  {isFeatured && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-500/20 px-3 py-1 text-[10px] font-black tracking-widest text-amber-300 uppercase shadow-md backdrop-blur-md">
                        <Sparkles className="h-3 w-3" /> Featured Art
                      </span>
                    </div>
                  )}

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
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. CLEAN & STREAMLINED LIGHTBOX PORTAL OVERLAY WITH MOTION ANIMATION */}
      {/* ========================================================================= */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                key="lightbox-portal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={closeLightbox}
                className="fixed inset-0 z-[99999] flex flex-col justify-between border-b border-stone-800/80 bg-stone-950/95 p-4 text-white backdrop-blur-2xl transition-all duration-300 sm:p-6"
              >
                {/* Top Toolbar */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-between border-b border-white/10 pb-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-black text-amber-400">
                      {selectedIndex + 1} / {totalSlides}
                    </span>
                    <span className="line-clamp-1 max-w-xs text-xs font-bold text-slate-200 sm:max-w-md sm:text-sm">
                      {currentSlide?.title || 'Jagadhatri Puja Memory'}
                    </span>
                  </div>

                  <button
                    onClick={closeLightbox}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-rose-500 hover:bg-rose-500/80 active:scale-95 sm:h-10 sm:w-10"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </motion.div>

                {/* Main Stage Image Display */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex flex-1 flex-col items-center justify-center py-1"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={
                        slides[selectedIndex]._id
                          ? `${slides[selectedIndex]._id}-${selectedIndex}`
                          : selectedIndex
                      }
                      initial={{ opacity: 0, scale: 0.88, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -10 }}
                      transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 300,
                      }}
                      className="relative flex h-full max-h-[68vh] w-full max-w-[90vw] items-center justify-center sm:max-h-[72vh]"
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
                    </motion.div>
                  </AnimatePresence>

                  {/* Side Navigation Buttons */}
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

                  {/* Pure Unboxed Caption & Tags (No Box Container) */}
                  {currentSlide &&
                    (currentSlide.description ||
                      (currentSlide.tags && currentSlide.tags.length > 0)) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 flex max-w-xl flex-col items-center justify-center space-y-1 text-center"
                      >
                        {currentSlide.description && (
                          <p className="text-xs font-medium text-slate-200 drop-shadow-sm sm:text-sm">
                            {currentSlide.description}
                          </p>
                        )}
                        {currentSlide.tags && currentSlide.tags.length > 0 && (
                          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                            {currentSlide.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] font-bold text-amber-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                </div>

                {/* Bottom Horizontal Thumbnail Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center pt-2"
                >
                  <div
                    ref={thumbnailContainerRef}
                    className="flex max-w-full [scrollbar-width:none] gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-2 backdrop-blur-md [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {slides.map((asset, idx) => (
                      <button
                        key={asset._id ? `${asset._id}-${idx}` : idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={`relative h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 ${
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
