import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PageSkeletonProps {
  className?: string;
  maxWidth?: string;
}

export function PageSkeleton({
  className,
  maxWidth = 'max-w-5xl',
}: PageSkeletonProps) {
  return (
    <div className={cn('relative min-h-[60vh] w-full pb-12', className)}>
      {/* HERO BANNER SKELETON */}
      <section className="relative border-b border-amber-500/10 bg-amber-50/40 px-4 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-8 sm:pt-28 sm:pb-10 dark:bg-stone-950/50">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-3.5 text-center sm:space-y-4">
          {/* Badge Skeleton */}
          <Skeleton className="h-6 w-36 rounded-full" />

          {/* Title Skeleton */}
          <Skeleton className="h-9 w-64 rounded-xl sm:h-12 sm:w-96" />

          {/* Subtitle Skeleton */}
          <Skeleton className="h-4 w-4/5 rounded-lg sm:w-2/3" />
        </div>
      </section>

      {/* CONTENT AREA SKELETON */}
      <section className="px-3.5 pt-6 sm:px-6 sm:pt-10">
        <div className={cn('mx-auto space-y-6', maxWidth)}>
          {/* Top Action / Filter Bar Skeleton */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-full rounded-xl sm:w-72" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>

          {/* Main Card Container Skeleton */}
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-white/70 p-5 backdrop-blur-md sm:p-8 dark:border-white/10 dark:bg-stone-900/80">
            {/* Card Header */}
            <div className="mb-6 flex items-center justify-between border-b border-amber-500/10 pb-4 dark:border-stone-800">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 rounded-lg" />
                <Skeleton className="h-3.5 w-32 rounded-md" />
              </div>
              <Skeleton className="h-9 w-9 rounded-xl" />
            </div>

            {/* Content Lines / Grid Skeleton */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-24 w-full rounded-2xl" />
                <Skeleton className="h-24 w-full rounded-2xl" />
                <Skeleton className="h-24 w-full rounded-2xl" />
              </div>

              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            {/* Bottom Button Skeleton */}
            <div className="mt-8 flex justify-end gap-3">
              <Skeleton className="h-10 w-28 rounded-xl" />
              <Skeleton className="h-10 w-36 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
