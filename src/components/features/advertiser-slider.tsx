'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BorderBeam } from '@/components/ui/border-beam';

interface AdvertiserSlide {
  name: string;
  path: string;
}

interface AdvertiserSliderProps {
  slides: AdvertiserSlide[];
}

export function AdvertiserSlider({ slides = [] }: AdvertiserSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState<number>(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth * 0.8;
    const targetScroll =
      direction === 'left'
        ? containerRef.current.scrollLeft - scrollAmount
        : containerRef.current.scrollLeft + scrollAmount;

    containerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const onScrollUpdate = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    const newIdx = Math.round(scrollLeft / clientWidth);
    setScrollIndex(newIdx);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative group/slider space-y-3">
      {/* Slider Controls Top Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Award className="h-4 w-4 text-amber-500" />
          <span>Swipe Banners ({slides.length} Showcase Items)</span>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300/80 dark:border-white/20 bg-white/80 dark:bg-stone-900/80 text-slate-700 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300/80 dark:border-white/20 bg-white/80 dark:bg-stone-900/80 text-slate-700 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Touch Snap Container */}
      <div
        ref={containerRef}
        onScroll={onScrollUpdate}
        className="no-scrollbar flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory py-1 scroll-smooth"
      >
        {slides.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="snap-start shrink-0 w-[78vw] sm:w-[280px] md:w-[320px] group relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-white/12 bg-stone-900 backdrop-blur-2xl transition-all duration-300 hover:border-amber-500/50"
          >
            <BorderBeam
              size={120}
              duration={6}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />

            <Image
              src={item.path}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 80vw, 320px"
              className="object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
            
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] sm:text-xs font-bold text-white">
              <span className="line-clamp-1">{item.name}</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators Bar */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              scrollIndex === idx
                ? 'w-5 bg-amber-500'
                : 'w-1.5 bg-slate-300 dark:bg-stone-800'
            )}
          />
        ))}
      </div>
    </div>
  );
}
