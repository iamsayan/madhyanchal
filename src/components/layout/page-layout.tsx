import { ComponentType, ReactNode } from 'react';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { JsonLd } from '@/components/shared/json-ld';
import { cn } from '@/lib/utils';

export interface PageLayoutProps {
  children: ReactNode;
  title: string | ReactNode;
  subtitle?: string;
  badge?: {
    text: string;
    icon?: ComponentType<{ className?: string }>;
  };
  breadcrumbCurrent?: string;
  showBreadcrumb?: boolean;
  maxWidth?: string;
  className?: string;
  headerContent?: ReactNode;
  scriptJsonLd?: Record<string, unknown>;
}

export function PageLayout({
  children,
  title,
  subtitle,
  badge,
  breadcrumbCurrent,
  showBreadcrumb = true,
  maxWidth = 'max-w-6xl',
  className,
  headerContent,
  scriptJsonLd,
}: PageLayoutProps) {
  const currentNav =
    breadcrumbCurrent || (typeof title === 'string' ? title : 'Page');

  const BadgeIcon = badge?.icon;

  const renderTitle = () => {
    if (typeof title !== 'string') return title;
    const words = title.split(' ');
    if (words.length <= 1) return title;
    const lastWord = words.pop();
    return (
      <>
        {words.join(' ')}{' '}
        <span className="font-paytone bg-linear-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
          {lastWord}
        </span>
      </>
    );
  };

  return (
    <div className="bg-dot-mesh relative min-h-screen overflow-hidden bg-amber-50/60 transition-colors duration-500 dark:bg-stone-950">
      {scriptJsonLd && <JsonLd schema={scriptJsonLd} />}

      {/* HERO HEADER BANNER (Standardized Mobile-First Spacing) */}
      <section className="relative overflow-hidden border-b border-amber-500/20 bg-amber-50/60 pt-[calc(5rem+env(safe-area-inset-top,0px))] pb-5 transition-colors duration-500 sm:pt-32 sm:pb-10 dark:bg-stone-950">
        <div className="relative z-10 mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8">
          <AnimatedWrapper
            direction="up"
            className="flex flex-col items-center space-y-2.5 text-center sm:space-y-4"
          >
            {/* Breadcrumb Navigation */}
            {showBreadcrumb && <PageBreadcrumb currentNav={currentNav} />}

            {/* Emblem / Feature Badge */}
            {badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-[10px] font-black tracking-widest text-amber-700 uppercase backdrop-blur-md sm:px-4 sm:py-1 sm:text-[11px] dark:text-amber-400">
                {BadgeIcon && (
                  <BadgeIcon className="h-3 w-3 text-amber-500 sm:h-3.5 sm:w-3.5" />
                )}
                {badge.text}
              </span>
            )}

            {/* Main Title */}
            <h1 className="font-paytone text-2xl leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              {renderTitle()}
            </h1>

            {/* Subtitle / Sub-description */}
            {subtitle && (
              <p className="max-w-2xl px-2 text-xs leading-relaxed font-normal text-slate-600 sm:text-base dark:text-slate-300">
                {subtitle}
              </p>
            )}

            {headerContent}
          </AnimatedWrapper>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER - Unified Padding Control */}
      <main className="relative z-10 px-3.5 pt-5 pb-6 sm:px-6 sm:pt-10 sm:pb-12 lg:px-8">
        <div className={cn('mx-auto', maxWidth, className)}>{children}</div>
      </main>
    </div>
  );
}
