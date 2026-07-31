'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Calendar,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Camera,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BorderBeam } from '@/components/ui/border-beam';

interface ImageItem {
  year: string;
  path: string;
  src: string;
  alt: string;
}

interface GalleryFilterViewProps {
  images?: Record<string, string[]>;
}

export function GalleryFilterView({ images = {} }: GalleryFilterViewProps) {
  // Calculate sorted available years
  const years = React.useMemo(() => {
    if (!images || Object.keys(images).length === 0) return ['2025', '2024', '2023'];
    return Object.keys(images)
      .filter((y) => images[y] && images[y].length > 0)
      .sort()
      .reverse();
  }, [images]);

  const [selectedYear, setSelectedYear] = React.useState<string>(() => years[0] || '2025');
  const [activeLightboxIndex, setActiveLightboxIndex] = React.useState<number | null>(null);

  // Fallback sample gallery images if CMS/Service is unreachable or returns empty data
  const fallbackImages: ImageItem[] = React.useMemo(
    () => [
      {
        year: '2025',
        path: '/hero-pandal.png',
        src: '/hero-pandal.png',
        alt: 'Golden Jubilee Grand Pandal Architecture 2025',
      },
      {
        year: '2025',
        path: '/lighting-tableau.png',
        src: '/lighting-tableau.png',
        alt: 'Legendary LED Light Tableau Illumination 2025',
      },
      {
        year: '2025',
        path: '/chandannagar-tableau.png',
        src: '/chandannagar-tableau.png',
        alt: 'Chandannagar Nocturnal Immersion Procession 2025',
      },
      {
        year: '2024',
        path: '/hero-pandal.png',
        src: '/hero-pandal.png',
        alt: 'Majestic Idol Illumination 2024',
      },
      {
        year: '2024',
        path: '/lighting-tableau.png',
        src: '/lighting-tableau.png',
        alt: 'Cultural Dhunuchi Naach & Dhaki Performance 2024',
      },
      {
        year: '2023',
        path: '/chandannagar-tableau.png',
        src: '/chandannagar-tableau.png',
        alt: 'Pandal Lighting Craftsmanship 2023',
      },
    ],
    []
  );

  // Transform images into unified ImageItem format
  const allImages = React.useMemo<ImageItem[]>(() => {
    if (!images || Object.keys(images).length === 0) return fallbackImages;

    const result: ImageItem[] = [];
    const baseUrl = 'https://web.madhyanchalsarbajanin.co.in/cms/storage/uploads';

    for (const year of years) {
      const files = images[year] || [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `${year}/${file}`;
        result.push({
          year,
          path,
          src: `${baseUrl}/${path}`,
          alt: `Madhyanchal Jagadhatri Puja ${year} Memory ${i + 1}`,
        });
      }
    }

    return result.length > 0 ? result : fallbackImages;
  }, [images, years, fallbackImages]);

  // Filtered dataset according to active tab
  const filteredImages = React.useMemo(() => {
    return allImages.filter((item) => item.year === selectedYear);
  }, [allImages, selectedYear]);

  // Lightbox handlers
  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrevImage = React.useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev === 0 || prev === null ? filteredImages.length - 1 : prev - 1
    );
  }, [activeLightboxIndex, filteredImages.length]);

  const handleNextImage = React.useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev === filteredImages.length - 1 || prev === null ? 0 : prev + 1
    );
  }, [activeLightboxIndex, filteredImages.length]);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handlePrevImage, handleNextImage]);

  return (
    <div className="space-y-6 sm:space-y-10">
      
      {/* FILTER CONTROLS BAR (Mobile Scroll Pill Dock & Native Select) */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
          <Filter className="h-3.5 w-3.5" /> Filter Memory Archives
        </div>

        {/* Desktop & Mobile Pill Dock (Horizontal Scroll) */}
        <div className="no-scrollbar flex w-full max-w-2xl items-center justify-start sm:justify-center gap-2 overflow-x-auto px-2 py-1">
          {years.map((year) => {
            const count = allImages.filter((img) => img.year === year).length;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer select-none',
                  selectedYear === year
                    ? 'bg-amber-500 text-slate-950 font-black shadow-sm scale-105'
                    : 'border border-slate-300/80 dark:border-white/15 bg-white/80 dark:bg-stone-900/80 text-slate-700 dark:text-slate-300 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:bg-amber-500/20 dark:hover:text-amber-300'
                )}
              >
                {year} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* GALLERY IMAGES MASONRY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5">
        {filteredImages.map((item, index) => (
          <div
            key={`${item.year}-${item.path}-${index}`}
            onClick={() => handleOpenLightbox(index)}
            className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-white/12 bg-stone-900/40 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/50"
          >
            <BorderBeam
              size={120}
              duration={6}
              colorFrom="#f59e0b"
              colorTo="#fef08a"
            />

            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Year Overlay Pill Badge */}
            <div className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 rounded-full border border-white/20 bg-stone-950/60 px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-amber-300 backdrop-blur-md">
              <Calendar className="h-2.5 w-2.5 text-amber-400" /> {item.year}
            </div>

            {/* Hover Glass Lightbox Callout Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-3 sm:p-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-[11px] sm:text-xs font-bold line-clamp-1">
                  {item.alt}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-black shadow-md">
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX PREVIEW MODAL */}
      {activeLightboxIndex !== null && filteredImages[activeLightboxIndex] && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-stone-950/95 p-3 sm:p-4 backdrop-blur-2xl transition-all duration-300">
          
          {/* Top Controls Bar */}
          <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-8 z-10 flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
              <span className="text-[11px] sm:text-sm font-bold">
                {activeLightboxIndex + 1} / {filteredImages.length}
              </span>
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-amber-300 border border-amber-500/30">
                {filteredImages[activeLightboxIndex].year}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCloseLightbox}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrevImage}
            className="absolute left-2 sm:left-6 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-stone-900/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Main Active Image View */}
          <div className="relative h-[65vh] sm:h-[80vh] w-full max-w-4xl overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 shadow-2xl">
            <Image
              src={filteredImages[activeLightboxIndex].src}
              alt={filteredImages[activeLightboxIndex].alt}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute bottom-0 inset-x-0 bg-stone-950/85 p-2.5 sm:p-4 text-center text-[11px] sm:text-sm text-slate-200 backdrop-blur-md">
              {filteredImages[activeLightboxIndex].alt} ({filteredImages[activeLightboxIndex].year})
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNextImage}
            className="absolute right-2 sm:right-6 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-stone-900/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      )}

    </div>
  );
}
