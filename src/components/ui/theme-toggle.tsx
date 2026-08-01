'use client';

import * as React from 'react';

import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  isScrolled?: boolean;
}

export function ThemeToggle({
  className,
  isScrolled = false,
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = resolvedTheme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    // Circular View Transition API Reveal Animation (Astro.js / Modern Web App style)
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.classList.add('theme-transitioning');

      const transition = (
        document as unknown as {
          startViewTransition: (cb: () => void | Promise<void>) => {
            ready: Promise<void>;
            finished?: Promise<void>;
          };
        }
      ).startViewTransition(async () => {
        setTheme(newTheme);
        await new Promise((resolve) => setTimeout(resolve, 20));
      });

      const cleanUp = () => {
        document.documentElement.classList.remove('theme-transitioning');
      };

      if (transition.finished) {
        transition.finished.then(cleanUp).catch(cleanUp);
      } else {
        setTimeout(cleanUp, 700);
      }

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        const anim = document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );

        anim.onfinish = cleanUp;
      });
    } else {
      setTheme(newTheme);
    }
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!mounted}
      className={cn(
        'relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border backdrop-blur-2xl transition-all duration-300 select-none',
        !mounted && 'opacity-40 pointer-events-none',
        isScrolled
          ? 'border border-slate-200/90 bg-white/95 text-amber-600 hover:scale-105 active:scale-95 dark:border-white/15 dark:bg-stone-900/80 dark:text-amber-400'
          : 'border border-amber-500/30 bg-white/90 text-amber-600 hover:scale-105 hover:border-amber-500/50 hover:bg-amber-500/10 active:scale-95 dark:border-white/20 dark:bg-stone-950/70 dark:text-amber-400 dark:hover:border-amber-400/60 dark:hover:bg-amber-500/20',
        className
      )}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      aria-label="Toggle Light or Dark mode"
    >
      <Sun className={cn('h-4 w-4 text-amber-500 transition-all duration-500', isDark ? 'scale-0 -rotate-90' : 'scale-100 rotate-0')} />
      <Moon className={cn('absolute h-4 w-4 text-amber-400 transition-all duration-500', isDark ? 'scale-100 rotate-0' : 'scale-0 rotate-90')} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
