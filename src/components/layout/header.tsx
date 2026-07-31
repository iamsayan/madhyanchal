'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { Calendar, MapPin } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [isStandalone, setIsStandalone] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const checkStandalone = () => {
      const isPWA =
        !window.matchMedia('(display-mode: browser)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.startsWith('android-app://') ||
        window.location.search.includes('pwa');

      setIsStandalone(isPWA);
    };

    checkStandalone();

    const m = window.matchMedia('(display-mode: browser)');
    const handleChange = () => checkStandalone();
    m.addEventListener?.('change', handleChange);

    return () => {
      m.removeEventListener?.('change', handleChange);
    };
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'History', href: '/puja-history' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Advertise', href: '/advertise' },
    { label: 'Activities', href: '/activities' },
    { label: 'Awards', href: '/awards' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
  ];

  const activeStandalone = mounted && isStandalone;
  const isCompact = activeStandalone || scrolled;

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full border-b transition-all duration-300',
        activeStandalone
          ? 'border-amber-600/30 bg-[#78350f]'
          : scrolled
            ? 'border-slate-200/60 bg-white/90 backdrop-blur-2xl dark:border-white/10 dark:bg-stone-950/90'
            : 'border-transparent bg-transparent'
      )}
    >
      {/* DESKTOP HEADER LAYOUT (lg view) - ABSOLUTE 100% DEAD CENTERED DOCK */}
      <div
        className={cn(
          'relative mx-auto hidden max-w-7xl items-center justify-between px-4 transition-all duration-300 lg:flex lg:px-6 xl:px-8',
          isCompact ? 'h-16' : 'h-20'
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
              isCompact ? 'h-8 min-w-[130px]' : 'h-10 min-w-[150px]'
            )}
          >
            <Image
              src="/logo.png"
              alt="Madhyanchal Sarbajanin Jagadhatri Puja Logo"
              width={200}
              height={50}
              className={cn(
                'w-auto object-contain transition-all duration-300',
                isCompact ? 'h-8' : 'h-10'
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
              isCompact
                ? 'border border-slate-200/90 bg-white/95 text-slate-800 backdrop-blur-xl dark:border-white/15 dark:bg-stone-900/85 dark:text-slate-200'
                : 'border border-amber-500/30 bg-white/90 text-slate-800 backdrop-blur-2xl dark:border-white/20 dark:bg-stone-950/80 dark:text-slate-100'
            )}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isHome = item.href === '/';
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  transitionTypes={isHome ? ['nav-back'] : ['nav-forward']}
                  className={cn(
                    'flex shrink-0 items-center justify-center rounded-full text-center font-bold whitespace-nowrap transition-all',
                    isCompact
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
          <ThemeToggle isScrolled={isCompact} />
        </div>
      </div>

      {/* NATIVE MOBILE APP ACTION HEADER (<lg view) */}
      <div
        className={cn(
          'flex items-center justify-between px-4 transition-all duration-300 lg:hidden',
          activeStandalone
            ? 'h-14 bg-[#78350f]'
            : scrolled
              ? 'h-14 bg-white/90 backdrop-blur-2xl dark:bg-stone-950/90'
              : 'h-16'
        )}
      >
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
            height={36}
            className={cn(
              'w-auto object-contain transition-all duration-300',
              isCompact ? 'h-7.5' : 'h-8.5'
            )}
            priority
          />
        </Link>

        {/* Right: Identical h-8 w-8 Mobile Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border backdrop-blur-2xl transition-all duration-300 active:scale-95',
              isCompact
                ? 'border-slate-200/90 bg-white/95 text-amber-600 dark:border-white/15 dark:bg-stone-900/80 dark:text-amber-400'
                : 'border-amber-500/30 bg-white/90 text-amber-600 dark:border-white/20 dark:bg-stone-950/70 dark:text-amber-400'
            )}
            aria-label="Map Location"
          >
            <MapPin className="h-4 w-4" />
          </a>
          <Link
            href="/schedule"
            transitionTypes={['nav-forward']}
            className={cn(
              'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border backdrop-blur-2xl transition-all duration-300 active:scale-95',
              isCompact
                ? 'border-slate-200/90 bg-white/95 text-amber-600 dark:border-white/15 dark:bg-stone-900/80 dark:text-amber-400'
                : 'border-amber-500/30 bg-white/90 text-amber-600 dark:border-white/20 dark:bg-stone-950/70 dark:text-amber-400'
            )}
            aria-label="Puja Schedule"
          >
            <Calendar className="h-4 w-4" />
          </Link>
          <ThemeToggle isScrolled={isCompact} />
        </div>
      </div>
    </header>
  );
}
