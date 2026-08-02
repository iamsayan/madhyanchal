import { Flame, Loader2, Sparkles } from 'lucide-react';
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
      {/* Native App Minimal Emblem Container */}
      <div className="relative flex items-center justify-center">
        {/* Soft Ambient Golden Glow Halo */}
        <div className="absolute h-20 w-20 rounded-full bg-amber-500/25 blur-2xl dark:bg-amber-500/15" />

        {/* Outer Frosted Pill Ring */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-white/80 shadow-md backdrop-blur-2xl dark:border-white/15 dark:bg-stone-900/90">
          {/* Subtle Outer Spinner Ring */}
          <Loader2 className="h-9 w-9 animate-spin text-amber-500/90" />

          {/* Center Brand Flame Icon */}
          <Flame className="absolute h-4 w-4 animate-pulse text-amber-600 dark:text-amber-400" />
        </div>
      </div>

      {/* Minimal Native Subtitle */}
      {showText && (
        <div className="flex flex-col items-center space-y-1">
          <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-900/80 dark:text-amber-400/90">
            <Sparkles className="h-3 w-3 animate-pulse text-amber-500" />
            MADHYANCHAL
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            Loading Experience...
          </span>
        </div>
      )}
    </div>
  );
}
