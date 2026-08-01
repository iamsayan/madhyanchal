'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { BProgress } from '@bprogress/core';

export function NativeToast() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [navTitle, setNavTitle] = useState<string>('');

  // Automatically reset on pathname / searchParams update
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  // Hook into BProgress core state & DOM MutationObserver for @bprogress/next events
  useEffect(() => {
    const checkStatus = () => {
      const active = BProgress.isStarted() || BProgress.status !== null;
      setIsNavigating(active);
    };

    // Check status periodically when progress is active
    const interval = setInterval(checkStatus, 100);

    // Observer to catch instant DOM injection of bprogress elements
    const observer = new MutationObserver(() => {
      checkStatus();
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    // Catch anchor click label for custom "Opening [Page]..." text
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const label = target.textContent?.trim();
      if (label && label.length < 25) {
        setNavTitle(label);
      } else {
        setNavTitle('');
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
      document.removeEventListener('click', handleAnchorClick, {
        capture: true,
      });
    };
  }, []);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          key="native-route-toast"
          initial={{ y: 24, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', damping: 26, stiffness: 360 }}
          className="fixed bottom-[calc(4.75rem+max(0.75rem,env(safe-area-inset-bottom,0px)))] left-1/2 z-[99999] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-amber-500/35 bg-slate-950/90 px-4 py-2 text-xs font-bold text-white shadow-2xl backdrop-blur-2xl sm:bottom-6 sm:left-6 sm:translate-x-0 dark:border-white/15 dark:bg-stone-900/95"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
          </span>
          <span className="tracking-tight text-slate-100">
            {navTitle ? `Opening ${navTitle}...` : 'Loading page...'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
