import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PageSkeletonProps {
  className?: string;
  maxWidth?: string;
}

export function PageSkeleton({
  className,
  maxWidth = 'max-w-4xl',
}: PageSkeletonProps) {
  return (
    <div className={cn('relative min-h-[60vh] w-full pb-8 sm:pb-12', className)}>
      {/* HERO BANNER SKELETON (NATIVE COMPACT ON MOBILE) */}
      <section className="relative border-b border-amber-500/10 bg-amber-50/30 px-3.5 pt-[calc(3.5rem+env(safe-area-inset-top,0px))] pb-6 sm:px-6 sm:pt-24 sm:pb-10 dark:bg-stone-950/50">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-2.5 text-center sm:space-y-4">
          {/* Badge Skeleton */}
          <Skeleton className="h-5 w-28 rounded-full sm:h-6 sm:w-36" />

          {/* Title Skeleton */}
          <Skeleton className="h-7 w-48 rounded-xl sm:h-12 sm:w-96" />

          {/* Subtitle Skeleton */}
          <Skeleton className="h-3.5 w-3/4 rounded-lg sm:h-4 sm:w-2/3" />
        </div>
      </section>

      {/* CONTENT AREA SKELETON (NATIVE APP COMPACT LAYOUT) */}
      <section className="px-3.5 pt-4 sm:px-6 sm:pt-8">
        <div className={cn('mx-auto space-y-3.5 sm:space-y-6', maxWidth)}>
          {/* Quick Schedule / Action Bar Skeleton */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-3 backdrop-blur-md sm:rounded-3xl sm:p-5 dark:border-white/10 dark:bg-stone-900/60">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
              <Skeleton className="h-12 w-full rounded-xl sm:h-14" />
              <Skeleton className="h-12 w-full rounded-xl sm:h-14" />
              <Skeleton className="h-12 w-full rounded-xl sm:h-14" />
            </div>
          </div>

          {/* Main Card Container Skeleton */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/70 p-3.5 backdrop-blur-md sm:rounded-3xl sm:p-8 dark:border-white/12 dark:bg-stone-900/80">
            {/* Card Header */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-200/80 pb-3 sm:mb-6 sm:pb-4 dark:border-white/10">
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-36 rounded-lg sm:h-6 sm:w-48" />
                <Skeleton className="h-3 w-24 rounded-md sm:h-3.5 sm:w-32" />
              </div>
              <Skeleton className="h-8 w-8 rounded-xl sm:h-9 sm:w-9" />
            </div>

            {/* Input Form Fields Skeleton */}
            <div className="space-y-3 sm:space-y-5">
              <Skeleton className="h-9 w-full rounded-xl sm:h-10" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Skeleton className="h-9 w-full rounded-xl sm:h-10" />
                <Skeleton className="h-9 w-full rounded-xl sm:h-10" />
              </div>
              <Skeleton className="h-9 w-full rounded-xl sm:h-10" />
            </div>

            {/* Repeater Cards Skeleton */}
            <div className="mt-4 space-y-3 border-t border-slate-200/80 pt-3 sm:mt-6 sm:space-y-4 sm:pt-4 dark:border-white/10">
              <Skeleton className="h-28 w-full rounded-xl sm:h-36 sm:rounded-2xl" />
            </div>

            {/* Submit Button Skeleton */}
            <div className="mt-5 sm:mt-8">
              <Skeleton className="h-10 w-full rounded-full sm:h-11" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
