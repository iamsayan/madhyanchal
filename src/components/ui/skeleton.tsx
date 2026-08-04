import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-amber-500/10 dark:bg-stone-800/60',
        className
      )}
      {...props}
    />
  );
}
