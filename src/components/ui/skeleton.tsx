import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative animate-pulse overflow-hidden rounded-xl bg-amber-500/10 dark:bg-stone-800/50',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent',
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/60 p-2.5 backdrop-blur-md sm:rounded-3xl sm:p-5 dark:border-white/10 dark:bg-stone-900/60',
        className
      )}
    >
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 sm:pb-2.5 dark:border-white/10">
          <Skeleton className="h-3.5 w-24 rounded-lg sm:h-4 sm:w-32" />
          <Skeleton className="h-5 w-12 rounded-full sm:h-6 sm:w-16" />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <Skeleton className="h-7 w-full rounded-lg sm:h-10 sm:rounded-xl" />
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <Skeleton className="h-7 w-full rounded-lg sm:h-10 sm:rounded-xl" />
            <Skeleton className="h-7 w-full rounded-lg sm:h-10 sm:rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
