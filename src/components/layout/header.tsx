'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { Calendar, MapPin, ChevronLeft, Bell, Mail } from 'lucide-react';

import { useRouteContext } from '@/hooks/use-route-context';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const { isDurgaPuja, isCommon } = useRouteContext();

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
    { label: 'Awards', href: '/awards' },
    { label: 'Advertise', href: '/advertise' },
    { label: 'About Us', href: '/about-us' },
    { label: '🌺 Durga Puja', href: '/durgapuja', highlighted: true },
  ];

  const durgaPujaNavItems = [
    { label: 'Home', href: '/durgapuja' },
    { label: 'Schedule', href: '/durgapuja/schedule' },
    { label: 'Drawing Contest', href: '/durgapuja/drawing-competition' },
    { label: 'Contact Us', href: '/durgapuja/contact-us' },
  ];

  const navItems = isDurgaPuja ? durgaPujaNavItems : mainNavItems;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-300',
        isCommon
          ? 'border-b border-amber-950/40 bg-[#4a0e17] text-white lg:border-transparent lg:bg-transparent'
          : isDurgaPuja
            ? 'border-b border-white/10 bg-[#0c1930] text-white lg:border-transparent lg:bg-transparent'
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
                'flex shrink-0 items-center justify-center rounded-full border border-slate-200/60 bg-slate-100/50 text-slate-600 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-600 focus-visible:outline-none active:scale-90 dark:border-white/10 dark:bg-stone-900/50 dark:text-slate-300 dark:hover:border-amber-400/40 dark:hover:bg-amber-500/20 dark:hover:text-amber-400',
                scrolled ? 'h-6 w-6' : 'h-7 w-7'
              )}
              title="Return to Main Website"
              aria-label="Return to Main Website"
            >
              <ChevronLeft
                className={cn(
                  'stroke-[2.5]',
                  scrolled ? 'h-3.5 w-3.5' : 'h-4 w-4'
                )}
              />
            </Link>
          )}

          <Link
            href={isDurgaPuja ? '/durgapuja' : '/'}
            className="group flex shrink-0 items-center focus-visible:outline-none"
          >
            <div
              className={cn(
                'relative w-auto transition-all duration-300 group-hover:scale-105',
                scrolled ? 'h-8 min-w-32.5' : 'h-10 min-w-37.5'
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
                      ? 'min-h-7 px-2.5 py-1 text-[11px] xl:px-3 xl:text-xs'
                      : 'min-h-8 px-2.5 py-1 text-[11.5px] xl:px-3.5 xl:text-xs',
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

        {/* Right Controls: Notice Icon & Theme Toggle Switch (Far Right) */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/notice"
            className={cn(
              'relative flex items-center justify-center rounded-full border transition-all active:scale-95',
              scrolled
                ? 'h-8 w-8 border-slate-300/80 bg-slate-100/80 text-slate-700 hover:border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 dark:border-white/15 dark:bg-stone-900/80 dark:text-slate-200 dark:hover:bg-amber-500 dark:hover:text-slate-950'
                : 'h-9 w-9 border-amber-500/30 bg-amber-500/10 text-slate-800 backdrop-blur-md hover:bg-amber-500/20 dark:border-white/20 dark:bg-stone-950/80 dark:text-slate-100',
              pathname === '/notice' &&
                'border-amber-500 bg-amber-500 text-slate-950 dark:bg-amber-500 dark:text-slate-950'
            )}
            title="Public Notices & Announcements"
            aria-label="Public Notices & Announcements"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-slate-900 bg-amber-500"></span>
            </span>
          </Link>
          <ThemeToggle isScrolled={scrolled} />
        </div>
      </div>

      {/* NATIVE MOBILE APP ACTION HEADER (<lg view) */}
      <div
        className={cn(
          'flex h-[calc(3.5rem+env(safe-area-inset-top,0px))] items-center justify-between px-4 pt-[env(safe-area-inset-top,0px)] shadow-sm transition-all duration-300 lg:hidden',
          isCommon
            ? 'border-b border-amber-950/40 bg-[#4a0e17] text-white'
            : isDurgaPuja
              ? 'border-b border-white/10 bg-[#0c1930] text-white'
              : 'border-b border-stone-800 bg-[#1c1917] text-white'
        )}
      >
        {/* Left: Brand Logo */}
        <div className="flex shrink-0 items-center gap-2">
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

        {/* Right: Action Buttons (Map, Schedule, Notice) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-xs backdrop-blur-xl transition-all active:scale-90',
              isCommon
                ? 'border-rose-900/50 bg-[#631422]/90 text-amber-300 hover:bg-[#781a2b]'
                : isDurgaPuja
                  ? 'border-white/15 bg-[#132342]/90 text-amber-400 hover:bg-[#1a2d52]'
                  : 'border-stone-700 bg-stone-800/80 text-amber-400 hover:bg-stone-800'
            )}
            aria-label="Map Location"
          >
            <MapPin className="h-4 w-4" />
          </a>
          <Link
            href={isDurgaPuja ? '/durgapuja/schedule' : '/schedule'}
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-xs backdrop-blur-xl transition-all active:scale-90',
              isCommon
                ? 'border-rose-900/50 bg-[#631422]/90 text-amber-300 hover:bg-[#781a2b]'
                : isDurgaPuja
                  ? 'border-white/15 bg-[#132342]/90 text-amber-400 hover:bg-[#1a2d52]'
                  : 'border-stone-700 bg-stone-800/80 text-amber-400 hover:bg-stone-800'
            )}
            aria-label="Puja Schedule"
          >
            <Calendar className="h-4 w-4" />
          </Link>
          <Link
            href="/notice"
            className={cn(
              'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-xs backdrop-blur-xl transition-all active:scale-90',
              isCommon
                ? 'border-rose-900/50 bg-[#631422]/90 text-amber-300 hover:bg-[#781a2b]'
                : isDurgaPuja
                  ? 'border-white/15 bg-[#132342]/90 text-amber-400 hover:bg-[#1a2d52]'
                  : 'border-stone-700 bg-stone-800/80 text-amber-400 hover:bg-stone-800',
              pathname === '/notice' &&
                'border-amber-500 bg-amber-500 text-slate-950 dark:bg-amber-500 dark:text-slate-950'
            )}
            aria-label="Public Notices"
            title="Public Notices"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
