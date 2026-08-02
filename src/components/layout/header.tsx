'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { Calendar, MapPin, ChevronLeft } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isDurgaPuja = pathname.startsWith('/durgapuja');

  useEffect(() => {
    sendGTMEvent({ event: 'page_view', value: pathname });

    const controller = new AbortController();
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [pathname]);

  const mainNavItems = [
    { label: 'Home', href: '/' },
    { label: 'History', href: '/puja-history' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Activities', href: '/activities' },
    { label: 'About Us', href: '/about-us' },
    { label: '🌺 Durga Puja', href: '/durgapuja', highlighted: true },
  ];

  const durgaPujaNavItems = [
    { label: 'Home', href: '/durgapuja' },
    { label: 'Drawing Contest', href: '/durgapuja/drawing-competition' },
    { label: 'Puja Schedule', href: '/durgapuja#schedule' },
    { label: 'Highlights', href: '/durgapuja#highlights' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact-us' },
  ];

  const navItems = isDurgaPuja ? durgaPujaNavItems : mainNavItems;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-300',
        isDurgaPuja
          ? 'border-b border-amber-600/20 bg-[#f59e0b] text-slate-950 lg:border-transparent lg:bg-transparent'
          : 'border-b border-stone-800 bg-[#1c1917] text-white lg:border-transparent lg:bg-transparent',
        scrolled
          ? 'lg:border-b lg:border-slate-200/60 lg:bg-white/90 lg:backdrop-blur-2xl lg:dark:border-white/10 lg:dark:bg-stone-950/90'
          : 'lg:border-transparent lg:bg-transparent'
      )}
    >
      {/* DESKTOP HEADER LAYOUT (lg view) - ABSOLUTE 100% DEAD CENTERED DOCK */}
      <div
        className={cn(
          'relative mx-auto hidden max-w-7xl items-center justify-between px-4 transition-all duration-300 lg:flex lg:px-6 xl:px-8',
          scrolled ? 'h-16' : 'h-20'
        )}
      >
        {/* Brand Logo & Back Button (< Logo) Section */}
        <div className="flex shrink-0 items-center gap-2.5">
          {isDurgaPuja && (
            <Link
              href="/"
              className={cn(
                'flex items-center justify-center rounded-full transition-all focus-visible:outline-none active:scale-95',
                scrolled
                  ? 'h-8 w-8 border border-slate-300/80 bg-slate-100/80 text-slate-800 hover:bg-amber-500 hover:text-slate-950 dark:border-white/15 dark:bg-stone-900/80 dark:text-slate-100 dark:hover:bg-amber-500'
                  : 'h-9 w-9 border border-amber-700/35 bg-amber-600/20 text-slate-950 backdrop-blur-md hover:bg-amber-600/30 dark:text-slate-950'
              )}
              title="Back to Main Website"
              aria-label="Back to Main Website"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          )}

          <Link
            href={isDurgaPuja ? '/durgapuja' : '/'}
            className="group flex shrink-0 items-center focus-visible:outline-none"
          >
            <div
              className={cn(
                'relative w-auto transition-all duration-300 group-hover:scale-105',
                scrolled ? 'h-8 min-w-[130px]' : 'h-10 min-w-[150px]'
              )}
            >
              <Image
                src="/logo.png"
                alt="Madhyanchal Sarbajanin Logo"
                width={200}
                height={50}
                className={cn(
                  'w-auto object-contain transition-all duration-300 dark:brightness-110',
                  scrolled ? 'h-8' : 'h-10'
                )}
                priority
              />
            </div>
          </Link>
        </div>

        {/* 100% ABSOLUTE DEAD-CENTERED DESKTOP NAVIGATION DOCK */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
          <nav
            className={cn(
              'flex max-w-full items-center gap-0.5 overflow-hidden rounded-full p-1 transition-all duration-300 xl:gap-1',
              scrolled
                ? 'border border-slate-200/90 bg-white/95 text-slate-800 backdrop-blur-xl dark:border-white/15 dark:bg-stone-900/85 dark:text-slate-200'
                : 'border border-amber-500/30 bg-white/90 text-slate-800 backdrop-blur-2xl dark:border-white/20 dark:bg-stone-950/80 dark:text-slate-100'
            )}
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const isHighlighted = Boolean(
                'highlighted' in item && item.highlighted
              );
              const currentIndex = navItems.findIndex(
                (i) => i.href === pathname
              );
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex shrink-0 items-center justify-center rounded-full text-center font-bold whitespace-nowrap transition-all',
                    scrolled
                      ? 'min-h-[28px] px-2.5 py-1 text-[11px] xl:px-3 xl:text-xs'
                      : 'min-h-[32px] px-2.5 py-1 text-[11.5px] xl:px-3.5 xl:text-xs',
                    isActive
                      ? 'bg-amber-500 font-black text-slate-950 shadow-xs'
                      : isHighlighted
                        ? 'bg-amber-500 font-black text-slate-950 shadow-sm ring-1 ring-amber-400/50 hover:bg-amber-400'
                        : 'text-slate-700 hover:bg-amber-500/15 hover:text-amber-700 dark:text-slate-200 dark:hover:bg-amber-500/20 dark:hover:text-amber-300'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: Theme Toggle Switch (Far Right) */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle isScrolled={scrolled} />
        </div>
      </div>

      {/* NATIVE MOBILE APP ACTION HEADER (<lg view) */}
      <div
        className={cn(
          'flex h-[calc(3.5rem+env(safe-area-inset-top,0px))] items-center justify-between px-4 pt-[env(safe-area-inset-top,0px)] shadow-sm transition-all duration-300 lg:hidden',
          isDurgaPuja
            ? 'border-b border-amber-600/20 bg-[#f59e0b] text-slate-950'
            : 'border-b border-stone-800 bg-[#1c1917] text-white'
        )}
      >
        {/* Left: (< Logo) Back Button & Brand Logo */}
        <div className="flex items-center gap-2 shrink-0">
          {isDurgaPuja && (
            <Link
              href="/"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-700/35 bg-amber-600/20 text-slate-950 shadow-xs backdrop-blur-xl transition-all hover:bg-amber-600/30 active:scale-90"
              aria-label="Back to Main Site"
              title="Back to Main Site"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </Link>
          )}

          <Link
            href={isDurgaPuja ? '/durgapuja' : '/'}
            className="flex shrink-0 items-center focus-visible:outline-none"
          >
            <Image
              src="/logo.png"
              alt="Madhyanchal Sarbajanin Logo"
              width={140}
              height={40}
              className="h-8 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>
        </div>

        {/* Right: 3 Distinct Action Buttons (Map, Schedule, Theme) */}
        <div className="flex items-center gap-2">
          <a
            href="https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-xs backdrop-blur-xl transition-all active:scale-90',
              isDurgaPuja
                ? 'border-amber-700/35 bg-amber-600/20 text-slate-950 hover:bg-amber-600/30'
                : 'border-stone-700 bg-stone-800/80 text-amber-400 hover:bg-stone-800'
            )}
            aria-label="Map Location"
          >
            <MapPin className="h-4 w-4" />
          </a>
          <Link
            href={isDurgaPuja ? '/durgapuja#schedule' : '/schedule'}
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-xs backdrop-blur-xl transition-all active:scale-90',
              isDurgaPuja
                ? 'border-amber-700/35 bg-amber-600/20 text-slate-950 hover:bg-amber-600/30'
                : 'border-stone-700 bg-stone-800/80 text-amber-400 hover:bg-stone-800'
            )}
            aria-label="Puja Schedule"
          >
            <Calendar className="h-4 w-4" />
          </Link>
          <ThemeToggle
            className={cn(
              'h-8 w-8 shadow-xs backdrop-blur-xl active:scale-90',
              isDurgaPuja
                ? 'border-amber-700/35 bg-amber-600/20 text-slate-950 hover:bg-amber-600/30'
                : 'border-stone-700 bg-stone-800/80 text-amber-400 hover:bg-stone-800'
            )}
            iconClassName={isDurgaPuja ? 'text-slate-950' : 'text-amber-400'}
          />
        </div>
      </div>
    </header>
  );
}
