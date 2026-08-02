'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const isPopState = useRef(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true;
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      if (isPopState.current) {
        setDirection('back');
        isPopState.current = false;
      } else {
        setDirection('forward');
      }
      prevPathname.current = pathname;
    }
  }, [pathname]);

  // Motion variants for forward vs back mobile native transitions
  const variants = {
    initial: (dir: 'forward' | 'back') => ({
      opacity: 0,
      x: dir === 'forward' ? 24 : -24,
      filter: 'blur(2px)',
    }),
    animate: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
    exit: (dir: 'forward' | 'back') => ({
      opacity: 0,
      x: dir === 'forward' ? -24 : 24,
      filter: 'blur(2px)',
    }),
  };

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.25,
          ease: [0.25, 0.1, 0.25, 1.0], // Native iOS curve
        }}
        className="w-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
