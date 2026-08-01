'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  // Complete progress bar on route change completion
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  // Intercept click events on links to show INSTANT 0ms visual feedback
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Check if it's an internal navigation link
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        targetAttr !== '_blank'
      ) {
        // Only trigger if navigating to a different page or search query
        const currentUrl = window.location.pathname + window.location.search;
        if (href !== currentUrl) {
          setIsNavigating(true);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
    };
  }, []);

  return (
    <AnimatePresence>
      {isNavigating && (
        <div className="fixed inset-x-0 top-0 z-[999999] pointer-events-none">
          {/* Top Glowing Golden Progress Bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{
              scaleX: [0, 0.45, 0.8, 0.92],
              transition: {
                duration: 4,
                ease: [0, 0.7, 0.1, 1],
              },
            }}
            exit={{
              scaleX: 1,
              opacity: 0,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            style={{ transformOrigin: '0% 50%' }}
            className="h-1 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_12px_#f59e0b]"
          />

          {/* Top Right Mini Floating Loading Pill Badge (Mobile & Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-3 right-4 z-[999999] flex items-center gap-2 rounded-full border border-amber-500/40 bg-slate-950/90 px-3 py-1 text-[11px] font-bold text-amber-400 shadow-xl backdrop-blur-xl"
          >
            <span className="h-2 w-2 animate-ping rounded-full bg-amber-400" />
            <span>Loading...</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
