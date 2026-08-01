import * as React from 'react';

import Link from 'next/link';

import Script from 'next/script';

import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { Section } from '@/components/shared/section';
import { cn } from '@/lib/utils';

import { ChevronRight } from 'lucide-react';

export interface PageLayoutProps {
  children: React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string;
  badge?: {
    text: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
  breadcrumbCurrent?: string;
  showBreadcrumb?: boolean;
  maxWidth?: string;
  className?: string;
  headerContent?: React.ReactNode;
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
  const renderedTitle = React.useMemo(() => {
    if (typeof title !== 'string') return title;
    const words = title.split(' ');
    if (words.length <= 1) return title;
    const lastWord = words.pop();
    return (
      <>
        {words.join(' ')}{' '}
        <span className="font-paytone bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
          {lastWord}
        </span>
      </>
    );
  }, [title]);

  const currentNav =
    breadcrumbCurrent || (typeof title === 'string' ? title : 'Page');

  const BadgeIcon = badge?.icon;

  return (
    <div className="bg-dot-mesh relative min-h-screen overflow-hidden bg-amber-50/60 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] transition-colors duration-500 sm:pb-0 dark:bg-stone-950">
      {scriptJsonLd && (
        <Script
          id="page-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(scriptJsonLd) }}
        />
      )}

      {/* HERO HEADER BANNER (Standardized Mobile-First Spacing) */}
      <section className="relative overflow-hidden border-b border-amber-500/20 bg-amber-50/60 pt-20 pb-5 transition-colors duration-500 sm:pt-32 sm:pb-10 dark:bg-stone-950">
        {/* <div className="absolute top-0 left-1/2 h-px w-3/4 max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px] sm:h-[300px] sm:w-[600px]" /> */}

        <div className="relative z-10 mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8">
          <AnimatedWrapper
            direction="up"
            className="flex flex-col items-center space-y-2.5 text-center sm:space-y-4"
          >
            {/* Breadcrumb Navigation */}
            {showBreadcrumb && (
              <nav className="hidden items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 sm:flex dark:text-slate-400">
                <Link
                  href="/"
                  className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {currentNav}
                </span>
              </nav>
            )}

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
              {renderedTitle}
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

      {/* MAIN CONTENT CONTAINER */}
      <Section className="pt-5 pb-3 sm:pt-12 sm:pb-12">
        <div className={cn('mx-auto', maxWidth, className)}>{children}</div>
      </Section>
    </div>
  );
}
