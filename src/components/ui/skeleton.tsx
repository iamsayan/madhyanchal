import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden animate-pulse rounded-xl bg-amber-500/10 dark:bg-stone-800/50',
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
        'relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 p-3.5 backdrop-blur-md sm:rounded-3xl sm:p-5 dark:border-white/10 dark:bg-stone-900/60',
        className
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 dark:border-white/10">
          <Skeleton className="h-4 w-32 rounded-lg" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-9 w-full rounded-xl sm:h-10" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-9 w-full rounded-xl sm:h-10" />
            <Skeleton className="h-9 w-full rounded-xl sm:h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
