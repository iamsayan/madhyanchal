'use client';

import * as React from 'react';

import CockpitImage from '@/components/shared/cockpit-image';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { SparklesCore } from '@/components/ui/sparkles';
import { Spotlight } from '@/components/ui/spotlight';
import type { Asset } from '@/lib/cockpit';

interface HeroSliderProps {
  images?: Asset[];
  children?: React.ReactNode;
}

export function HeroSlider({ images = [], children }: HeroSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);

  // Automatic slide rotation if multiple images exist
  React.useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="hero relative flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center overflow-hidden border-b border-amber-500/20 bg-amber-50/60 transition-colors duration-500 lg:min-h-screen dark:bg-stone-950">
      {/* Background Image Carousel with Dynamic Light & Dark Overlays */}
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        {images.map((item, index) => (
          <div
            key={item._id || index}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex
                ? 'opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
          >
            <CockpitImage
              asset={item}
              fill
              lazy={index !== 0}
              containerClassName="absolute inset-0 size-full bg-transparent"
              className="object-cover object-center brightness-[0.92] contrast-[1.05] saturate-[1.15] filter transition-all duration-500 dark:brightness-[0.65] dark:saturate-[1.25]"
            />
            {/* Dynamic Theme Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/85 via-amber-50/65 to-amber-100/85 transition-colors duration-500 dark:from-stone-950/90 dark:via-stone-950/75 dark:to-stone-950/90" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-amber-50/50 to-amber-100/90 transition-colors duration-500 dark:from-stone-950/85 dark:via-amber-950/30 dark:to-stone-950" />
          </div>
        ))}
      </div>

      {/* Dynamic Background Beams & Spotlights */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#f59e0b"
      />
      <Spotlight
        className="-top-40 right-0 md:-top-20 md:right-60"
        fill="#eab308"
      />
      <BackgroundBeams />

      {/* Grid Pattern Overlay */}
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-30 dark:opacity-40" />

      {/* Floating Sparkles Particles */}
      <SparklesCore particleCount={50} particleColor="#fef08a" />

      {/* Main Content Centered Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pt-20 pb-10 text-center sm:px-6 sm:pt-28 sm:pb-8 lg:px-8">
        {children}
      </div>

      {/* Subtle Slide Indicators if multiple images exist */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/80 px-3 py-1 shadow-xs backdrop-blur-md sm:bottom-5 dark:border-white/10 dark:bg-stone-950/80">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                idx === currentImageIndex
                  ? 'w-5 bg-amber-500'
                  : 'w-1.5 bg-slate-400/40 hover:bg-amber-500/60 dark:bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
