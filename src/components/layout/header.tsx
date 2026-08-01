'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';
import { Calendar, MapPin } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'History', href: '/puja-history' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Gallery', href: '/gallery' },
    //{ label: 'Advertise', href: '/advertise' },
    { label: 'Activities', href: '/activities' },
    //{ label: 'Awards', href: '/awards' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
  ];

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-300',
        'border-b border-amber-600/15 bg-[#f59e0b] text-slate-950 lg:border-transparent lg:bg-transparent',
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
        {/* Brand Logo (Far Left) */}
        <Link
          href="/"
          transitionTypes={['nav-back']}
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
              const currentIndex = navItems.findIndex(
                (i) => i.href === pathname
              );
              const isBack = index < (currentIndex !== -1 ? currentIndex : 0);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  transitionTypes={isBack ? ['nav-back'] : ['nav-forward']}
                  className={cn(
                    'flex shrink-0 items-center justify-center rounded-full text-center font-bold whitespace-nowrap transition-all',
                    scrolled
                      ? 'min-h-[28px] px-2.5 py-1 text-[11px] xl:px-3 xl:text-xs'
                      : 'min-h-[32px] px-2.5 py-1 text-[11.5px] xl:px-3.5 xl:text-xs',
                    isActive
                      ? 'bg-amber-500 font-black text-slate-950 shadow-xs'
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

      {/* NATIVE MOBILE APP ACTION HEADER (<lg view) - SAFE-AREA COMPLIANT WARM AMBER #f59e0b */}
      <div className="flex h-[calc(3.5rem+env(safe-area-inset-top,0px))] items-center justify-between border-b border-amber-600/15 bg-[#f59e0b] px-4 pt-[env(safe-area-inset-top,0px)] text-slate-950 shadow-sm transition-all duration-300 lg:hidden">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          transitionTypes={['nav-back']}
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

        {/* Right: 3 Distinct Colored Action Buttons (Fixed colors for both Light & Dark modes on #f59e0b) */}
        <div className="flex items-center gap-2">
          <a
            href="https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rose-700/35 bg-rose-500/20 text-rose-950 shadow-xs backdrop-blur-xl transition-all hover:bg-rose-500/30 active:scale-90"
            aria-label="Map Location"
          >
            <MapPin className="h-4 w-4 text-rose-950" />
          </a>
          <Link
            href="/schedule"
            transitionTypes={['nav-forward']}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-700/35 bg-indigo-500/20 text-indigo-950 shadow-xs backdrop-blur-xl transition-all hover:bg-indigo-500/30 active:scale-90"
            aria-label="Puja Schedule"
          >
            <Calendar className="h-4 w-4 text-indigo-950" />
          </Link>
          <ThemeToggle
            className="h-8 w-8 border-emerald-700/35 bg-emerald-500/20 text-emerald-950 shadow-xs backdrop-blur-xl hover:bg-emerald-500/30 active:scale-90"
            iconClassName="text-emerald-950"
          />
        </div>
      </div>
    </header>
  );
}
