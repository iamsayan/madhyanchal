import { HTMLAttributes, ReactNode } from 'react';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  action?: ReactNode;
  containerClassName?: string;
  showGridPattern?: boolean;
}

export function Section({
  title,
  subtitle,
  description,
  badge,
  action,
  className,
  containerClassName,
  showGridPattern = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn('py-14 sm:py-20 md:py-24 relative overflow-hidden', className)} {...props}>
      {/* Background Dot Mesh & Ambient Glow Halo */}
      {showGridPattern && (
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      )}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10', containerClassName)}>
        {(title || subtitle || badge) && (
          <AnimatedWrapper direction="up" className="mb-6 sm:mb-12">
            {/* Mobile Header: Ultra-Sleek Native App Left-Bar Widget Header */}
            <div className="flex items-center justify-between border-l-2 border-amber-500 pl-3 py-0.5 sm:hidden">
              <div className="flex flex-col space-y-0.5">
                {badge && (
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    {badge}
                  </span>
                )}
                {title && (
                  <h2 className="font-paytone text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-snug">
                    {title}
                  </h2>
                )}
              </div>
              {action && (
                <div className="text-[11px] font-bold text-amber-500 shrink-0 ml-2">
                  {action}
                </div>
              )}
            </div>

            {/* Desktop Header: Full Grandeur Centered Showcase */}
            <div className="hidden sm:flex flex-col space-y-2.5 text-center max-w-3xl mx-auto">
              {badge && (
                <span className="inline-block mx-auto rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 border border-amber-500/20 backdrop-blur-md">
                  {badge}
                </span>
              )}
              {title && (
                <h2 className="font-paytone text-3xl lg:text-4xl tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-base lg:text-lg font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent">
                  {subtitle}
                </p>
              )}
              <div className="mx-auto h-0.5 w-16 lg:w-20 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 my-3" />
              {description && (
                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {description}
                </p>
              )}
            </div>
          </AnimatedWrapper>
        )}
        {children}
      </div>
    </section>
  );
}
