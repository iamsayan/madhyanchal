'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionProps {
  children: ReactNode;
}

// Global history stack and popstate listener persistent across template re-mounts
const globalHistoryStack: string[] = [];
let globalIsPopState = false;
let isListenerAttached = false;

function ensureListenerAttached() {
  if (typeof window !== 'undefined' && !isListenerAttached) {
    isListenerAttached = true;
    window.addEventListener('popstate', () => {
      globalIsPopState = true;
    });
  }
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  useEffect(() => {
    ensureListenerAttached();
  }, []);

  const [state, setState] = useState(() => {
    ensureListenerAttached();
    if (globalHistoryStack.length === 0) {
      globalHistoryStack.push(pathname);
    }
    return { pathname, direction: 'forward' as 'forward' | 'back' };
  });

  // Synchronously compute direction when pathname changes during render
  if (state.pathname !== pathname) {
    let dir: 'forward' | 'back' = 'forward';

    if (globalIsPopState) {
      dir = 'back';
      globalIsPopState = false;
      const idx = globalHistoryStack.lastIndexOf(pathname);
      if (idx !== -1) {
        globalHistoryStack.length = idx + 1;
      } else {
        globalHistoryStack.push(pathname);
      }
    } else {
      const existingIndex = globalHistoryStack.indexOf(pathname);
      if (existingIndex !== -1 && existingIndex < globalHistoryStack.length - 1) {
        // Navigating via Link to a previously visited parent/higher page
        dir = 'back';
        globalHistoryStack.length = existingIndex + 1;
      } else {
        // Forward navigation
        dir = 'forward';
        if (globalHistoryStack[globalHistoryStack.length - 1] !== pathname) {
          globalHistoryStack.push(pathname);
        }
      }
    }

    setState({ pathname, direction: dir });
  }

  const direction = state.direction;

  // Ultra-fluid iOS native app motion variants (subtle depth scale + gentle 18px slide)
  const variants = {
    initial: (dir: 'forward' | 'back') => ({
      opacity: 0,
      x: dir === 'forward' ? 18 : -18,
      scale: 0.992,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: 'forward' | 'back') => ({
      opacity: 0,
      x: dir === 'forward' ? -18 : 18,
      scale: 0.992,
    }),
  };

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'transform, opacity' }}
        transition={{
          duration: 0.32,
          ease: [0.16, 1, 0.3, 1], // Ultra-luxury Apple iOS spring curve
        }}
        className="w-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
