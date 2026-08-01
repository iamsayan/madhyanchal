import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="relative flex min-h-[65vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      {/* Glowing Ambient Backdrop Orbs */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/15 blur-3xl animate-pulse dark:bg-amber-600/20" />
      <div className="absolute top-1/3 left-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-2xl dark:bg-amber-500/15" />

      {/* Center Festive Emblem & Spinner */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Pulsing Outer Ping Ring */}
        <div className="absolute h-24 w-24 rounded-full border border-amber-500/30 bg-amber-500/5 animate-ping duration-1000" />

        {/* Spinning Golden Accent Ring */}
        <div className="absolute h-28 w-28 animate-spin rounded-full border-2 border-transparent border-t-amber-500 border-r-amber-400/40 opacity-80" />

        {/* Center Logo Badge */}
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/40 bg-white/85 p-3 shadow-xl backdrop-blur-md dark:border-amber-500/30 dark:bg-stone-900/90">
          <Image
            src="/circle-logo.png"
            alt="Madhyanchal Sarbajanin"
            width={64}
            height={64}
            className="h-full w-full object-contain animate-pulse"
            priority
          />
        </div>
      </div>

      {/* Text Indicator */}
      <div className="flex flex-col items-center gap-1.5">
        <h3 className="font-heading text-lg font-bold tracking-wide text-stone-900 dark:text-amber-100 sm:text-xl">
          Madhyanchal Sarbajanin
        </h3>
        <div className="flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400/90 sm:text-sm">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-500" />
          <span>Loading Festive Portal...</span>
        </div>
      </div>

      {/* Content Skeleton Placeholder */}
      <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 px-4">
        <div className="h-36 w-full animate-pulse rounded-2xl border border-amber-500/15 bg-amber-500/5 dark:border-white/5 dark:bg-stone-900/40" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="h-20 animate-pulse rounded-xl border border-amber-500/10 bg-amber-500/5 dark:border-white/5 dark:bg-stone-900/30" />
          <div className="h-20 animate-pulse rounded-xl border border-amber-500/10 bg-amber-500/5 dark:border-white/5 dark:bg-stone-900/30" />
          <div className="h-20 animate-pulse rounded-xl border border-amber-500/10 bg-amber-500/5 dark:border-white/5 dark:bg-stone-900/30" />
        </div>
      </div>
    </div>
  );
}
