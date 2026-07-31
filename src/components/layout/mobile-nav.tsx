'use client';

import * as React from 'react';
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
  Megaphone,
  Sparkles,
  Info,
  Phone,
  MapPin,
  ChevronRight,
  CreditCard,
  UserCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNavDock() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [savedMembers, setSavedMembers] = React.useState<
    Array<{ id: string; name: string }>
  >([]);

  const currentYear = new Date().getFullYear();

  // Load saved member profiles list from localStorage
  React.useEffect(() => {
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
  React.useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const primaryTabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Schedule', href: '/schedule', icon: Calendar },
    { label: 'Gallery', href: '/gallery', icon: ImageIcon },
    { label: 'Awards', href: '/awards', icon: Award },
  ];

  const explorePages = [
    { label: 'Puja History', href: '/puja-history', icon: History, desc: 'Golden Jubilee Heritage' },
    { label: 'Drawing Competition', href: '/durgapuja/drawing-competition', icon: Sparkles, desc: 'Kids & Open Contest' },
    { label: 'Durga Puja', href: '/durgapuja', icon: Calendar, desc: 'Celebration Portal' },
    { label: 'Social Activities', href: '/activities', icon: Sparkles, desc: 'Community Service' },
    { label: 'Advertise with Us', href: '/advertise', icon: Megaphone, desc: 'Sponsorship & Souvenir' },
    { label: 'About Committee', href: '/about-us', icon: Info, desc: 'Legacy & Team' },
    { label: 'Contact Us', href: '/contact-us', icon: Phone, desc: 'Get in Touch' },
    { label: 'Puja Location', href: 'https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9', icon: MapPin, desc: 'Station Road, Chandannagar', isExternal: true },
  ];

  return (
    <>
      {/* Bottom Floating Navigation Dock (Safe-area inset compliant) */}
      <div className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-4 z-50 lg:hidden pointer-events-auto">
        <nav
          style={{ viewTransitionName: 'mobile-nav-dock' }}
          className="mx-auto max-w-md rounded-full bg-white/95 dark:bg-stone-950/95 border border-slate-200/90 dark:border-white/15 p-1.5 backdrop-blur-2xl flex items-center justify-around shadow-lg"
        >
          {primaryTabs.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isHome = item.href === '/';

            return (
              <Link
                key={item.label}
                href={item.href}
                transitionTypes={isHome ? ['nav-back'] : ['nav-forward']}
                className={cn(
                  'flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] active:scale-[0.98]',
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                <span className="text-[10px] font-bold mt-0.5 tracking-tight">{item.label}</span>
              </Link>
            );
          })}

          {/* 5th Tab: More Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            className={cn(
              'flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] active:scale-[0.98] cursor-pointer relative',
              moreOpen
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
            )}
            aria-label="Open More Menu"
          >
            <Grid className="h-4.5 w-4.5" />
            <span className="text-[10px] font-bold mt-0.5 tracking-tight">More</span>
            {savedMembers.length > 0 && (
              <span className="absolute top-1 right-2.5 h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>
        </nav>
      </div>

      {/* Native Bottom Sheet Modal Drawer with Motion Spring & AnimatePresence */}
      <AnimatePresence>
        {moreOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Smooth Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md cursor-pointer"
              onClick={() => setMoreOpen(false)}
            />

            {/* Native Spring Sheet Container */}
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
              className="relative z-10 w-full rounded-t-3xl border-t border-slate-200 bg-white/95 dark:border-white/15 dark:bg-stone-950/95 p-5 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] backdrop-blur-2xl max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl"
            >
              {/* Sheet Handle Bar */}
              <div className="mx-auto mb-1 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />

              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <h3 className="font-paytone text-lg text-slate-900 dark:text-white">Explore Madhyanchal</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Golden Jubilee Edition</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMoreOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 min-h-[44px] min-w-[44px] active:scale-[0.98]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* SAVED MEMBERSHIPS ON THIS DEVICE SECTION */}
              {savedMembers.length > 0 && (
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
                        transitionTypes={['nav-forward']}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-white/80 dark:bg-stone-900/80 p-2.5 transition-colors hover:bg-amber-500/20 active:scale-[0.98]"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {explorePages.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  if (item.isExternal) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-amber-500/10 transition-colors active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
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
                      transitionTypes={['nav-forward']}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-2xl border transition-colors active:scale-[0.98]',
                        isActive
                          ? 'border-amber-500/60 bg-amber-500/15 text-slate-900 dark:text-white'
                          : 'border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-amber-500/10'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-xl',
                          isActive
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        )}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
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
