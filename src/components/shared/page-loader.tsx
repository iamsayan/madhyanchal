import Image from 'next/image';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  className?: string;
  showText?: boolean;
}

export function PageLoader({ className, showText = true }: PageLoaderProps) {
  return (
    <div
      className={cn(
        'flex min-h-[60vh] w-full flex-col items-center justify-center space-y-4 px-4 py-20 text-center select-none',
        className
      )}
    >
      {/* Native App Emblem & Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Soft Ambient Golden Glow Halo */}
        <div className="absolute h-24 w-48 rounded-full bg-amber-500/25 blur-3xl dark:bg-amber-500/15" />

        {/* Logo Card Container */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl border border-amber-500/20 bg-white/80 px-6 py-4 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-stone-900/90">
          <Image
            src="/logo.png"
            alt="Madhyanchal Sarbajanin Logo"
            width={160}
            height={48}
            className="h-10 w-auto object-contain transition-all duration-300 animate-pulse"
            priority
          />
        </div>

        {/* Subtle Outer Spinner & Subtitle */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
          {showText && (
            <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
              <Sparkles className="h-3 w-3 animate-pulse text-amber-500" />
              Loading Experience...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
