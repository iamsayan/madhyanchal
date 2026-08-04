'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Calendar,
  Image as ImageIcon,
  Award,
  Grid,
  X,
  History,
  Info,
  Phone,
  MapPin,
  ChevronRight,
  CreditCard,
  UserCheck,
  Flame,
  Palette,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendGTMEvent } from '@next/third-parties/google';

import { useIsDurgaPuja } from '@/hooks/use-is-durga-puja';

export function MobileNavDock() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [savedMembers, setSavedMembers] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const currentYear = new Date().getFullYear();
  const isDurgaPuja = useIsDurgaPuja();

  // Load saved member profiles list from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('madhyanchal_members_list');
      if (stored) {
        setSavedMembers(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [pathname, moreOpen]);

  // Close sheet on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const mainPrimaryTabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Schedule', href: '/schedule', icon: Calendar },
    { label: 'Gallery', href: '/gallery', icon: ImageIcon },
    { label: 'Durga Puja', href: '/durgapuja', icon: Flame },
  ];

  const durgaPujaPrimaryTabs = [
    { label: 'Home', href: '/durgapuja', icon: Flame },
    { label: 'Schedule', href: '/durgapuja/schedule', icon: Calendar },
    {
      label: 'Drawing',
      href: '/durgapuja/drawing-competition',
      icon: Palette,
    },
  ];

  const primaryTabs = isDurgaPuja ? durgaPujaPrimaryTabs : mainPrimaryTabs;

  const mainExplorePages = [
    {
      label: 'Durga Puja',
      href: '/durgapuja',
      icon: Flame,
      desc: 'Rituals, Drawing Contest & Events',
      highlighted: true,
    },
    {
      label: 'Awards & Honors',
      href: '/awards',
      icon: Award,
      desc: 'Recognitions & Trophies',
    },
    {
      label: 'Puja History',
      href: '/puja-history',
      icon: History,
      desc: 'Heritage Since 1971',
    },
    {
      label: 'About Committee',
      href: '/about-us',
      icon: Info,
      desc: 'Legacy & Team',
    },
    {
      label: 'Contact Us',
      href: '/contact-us',
      icon: Phone,
      desc: 'Get in Touch',
    },
    {
      label: 'Puja Location',
      href: 'https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9',
      icon: MapPin,
      desc: 'Station Road, Chandannagar',
      isExternal: true,
    },
  ];

  const durgaPujaExplorePages = [
    {
      label: 'Puja Schedule',
      href: '/durgapuja/schedule',
      icon: Calendar,
      desc: '5-Day Festival Rituals & Timings',
    },
    {
      label: 'Contact Us',
      href: '/contact-us',
      icon: Phone,
      desc: 'Get in Touch',
    },
    {
      label: 'Main Home',
      href: '/',
      icon: ArrowLeft,
      desc: 'Return to Jagadhatri Puja',
    },
    {
      label: 'Puja Location',
      href: 'https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9',
      icon: MapPin,
      desc: 'Station Road, Chandannagar',
      isExternal: true,
    },
  ];

  const explorePages = isDurgaPuja ? durgaPujaExplorePages : mainExplorePages;

  const isPrimaryActive = primaryTabs.some((tab) => tab.href === pathname);

  const isMoreActive =
    moreOpen ||
    (!isPrimaryActive &&
      explorePages.some(
        (page) =>
          !page.isExternal &&
          page.href !== '/' &&
          (pathname === page.href || pathname.startsWith(page.href + '/'))
      ));

  return (
    <>
      {/* Bottom Floating Navigation Dock (Safe-area inset compliant) */}
      <div className="pointer-events-auto fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] z-50 flex justify-center px-4 lg:hidden">
        <nav
          className={cn(
            'flex w-fit max-w-[calc(100vw-1.5rem)] items-center justify-center gap-0.5 rounded-full p-1 shadow-lg backdrop-blur-2xl transition-all duration-300 sm:gap-1 sm:p-1.5',
            isDurgaPuja
              ? 'border border-amber-500/40 bg-white/95 dark:border-white/15 dark:bg-stone-950/95'
              : 'border border-slate-200/90 bg-white/95 dark:border-white/15 dark:bg-stone-950/95'
          )}
        >
          {primaryTabs.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const currentIndex = primaryTabs.findIndex(
              (i) => i.href === pathname
            );
            const isBack = index < (currentIndex !== -1 ? currentIndex : 0);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() =>
                  sendGTMEvent({
                    event: 'mobile_nav_tab_click',
                    label: item.label,
                    value: item.href,
                  })
                }
                className={cn(
                  'flex h-11 w-[64px] shrink-0 flex-col items-center justify-center rounded-full px-1 py-1 text-center transition-all duration-150 outline-none select-none [webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:outline-none active:scale-95 sm:w-[72px]',
                  isActive
                    ? 'bg-amber-500 font-extrabold text-slate-950 shadow-xs'
                    : 'text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-400'
                )}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span className="mt-0.5 max-w-full truncate px-0.5 text-[9.5px] font-bold tracking-tight sm:text-[10px]">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* 5th Tab: More Drawer Trigger */}
          <button
            type="button"
            onClick={() => {
              const nextState = !moreOpen;
              setMoreOpen(nextState);
              sendGTMEvent({
                event: 'mobile_nav_more_toggle',
                state: nextState ? 'open' : 'close',
              });
            }}
            className={cn(
              'relative flex h-11 w-[64px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-full px-1 py-1 text-center transition-all duration-150 outline-none select-none [webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:outline-none active:scale-95 sm:w-[72px]',
              isMoreActive
                ? 'bg-amber-500 font-extrabold text-slate-950 shadow-xs'
                : 'text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-400'
            )}
            aria-label="Open More Menu"
          >
            <Grid className="h-4.5 w-4.5 shrink-0" />
            <span className="mt-0.5 max-w-full truncate px-0.5 text-[9.5px] font-bold tracking-tight sm:text-[10px]">
              More
            </span>
            {savedMembers.length > 0 && (
              <span className="absolute top-1 right-2.5 h-2 w-2 animate-ping rounded-full bg-amber-500" />
            )}
          </button>
        </nav>
      </div>

      {/* Native Bottom Sheet Modal Drawer with Motion Spring & AnimatePresence */}
      <AnimatePresence>
        {moreOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
            {/* Frosted Glass Backdrop Fade matching Header Theme */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={cn(
                'fixed inset-0 cursor-pointer backdrop-blur-md transition-colors duration-300',
                isDurgaPuja
                  ? 'bg-gradient-to-b from-[#0c1930]/90 via-[#0c1930]/70 to-[#0c1930]/60'
                  : 'bg-gradient-to-b from-[#1c1917]/90 via-[#1c1917]/70 to-stone-950/60'
              )}
              onClick={() => setMoreOpen(false)}
            />

            {/* Native Spring Sheet Container (Original Styling) */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 360,
                mass: 0.8,
              }}
              className="relative z-10 max-h-[85vh] w-full space-y-4 overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white/95 p-5 pb-[calc(5rem+max(0.75rem,env(safe-area-inset-bottom,0px)))] shadow-2xl backdrop-blur-2xl dark:border-white/15 dark:bg-stone-950/95"
            >
              {/* Sheet Handle Bar */}
              <div className="mx-auto mb-1 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />

              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-white/10">
                <div>
                  <h3 className="font-paytone text-lg text-slate-900 dark:text-white">
                    {isDurgaPuja
                      ? 'Durga Puja Navigation'
                      : 'Explore Madhyanchal'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isDurgaPuja
                      ? 'Autumn Festival & Youth Drawing Contest'
                      : 'Culture, Sports & Community Services'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMoreOpen(false)}
                  className="flex h-9 min-h-[44px] w-9 min-w-[44px] items-center justify-center rounded-full bg-slate-100 text-slate-700 active:scale-[0.98] dark:bg-slate-900 dark:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* SAVED MEMBERSHIPS ON THIS DEVICE SECTION */}
              {!isDurgaPuja && savedMembers.length > 0 && (
                <div className="space-y-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-3">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Saved Dues / Memberships ({savedMembers.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {savedMembers.map((m) => (
                      <Link
                        key={m.id}
                        href={`/services/${currentYear}/membership/${m.id}/status`}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-white/80 p-2.5 transition-colors hover:bg-amber-500/20 active:scale-[0.98] dark:bg-stone-900/80"
                      >
                        <div className="flex items-center gap-2.5">
                          <CreditCard className="h-4 w-4 text-amber-500" />
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                            {m.name}
                          </span>
                        </div>
                        <span className="rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[9.5px] font-bold text-amber-700 dark:text-amber-300">
                          View Due / Pay ➔
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Menu List */}
              <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                {explorePages.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  const isHighlighted = Boolean(
                    'highlighted' in item && item.highlighted
                  );

                  if (item.isExternal) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3 transition-colors hover:bg-amber-500/10 active:scale-[0.98] dark:border-white/10 dark:bg-slate-900/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-2xl border p-3 transition-colors active:scale-[0.98]',
                        isActive
                          ? 'border-amber-500/60 bg-amber-500/15 text-slate-900 dark:text-white'
                          : isHighlighted
                            ? 'border-amber-500/60 bg-amber-500/10 text-slate-900 shadow-xs dark:border-amber-400/50 dark:bg-amber-500/15 dark:text-white'
                            : 'border-slate-200/80 bg-slate-50/50 hover:bg-amber-500/10 dark:border-white/10 dark:bg-slate-900/50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-xl',
                            isActive
                              ? 'bg-amber-500 text-slate-950'
                              : isHighlighted
                                ? 'bg-amber-500 text-slate-950 shadow-xs'
                                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                          )}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                            <span>{item.label}</span>
                            {isHighlighted && (
                              <span className="py-0.2 rounded-full bg-amber-500 px-1.5 text-[9px] font-black tracking-wider text-slate-950 uppercase">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
