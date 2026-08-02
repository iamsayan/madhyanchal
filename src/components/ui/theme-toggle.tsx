'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
  isScrolled?: boolean;
}

export function ThemeToggle({
  className,
  iconClassName,
  isScrolled = false,
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const isDark = resolvedTheme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!mounted}
      className={cn(
        'relative flex shrink-0 cursor-pointer items-center justify-center rounded-full border backdrop-blur-2xl transition-all duration-300 select-none active:scale-90',
        !mounted && 'pointer-events-none opacity-40',
        !className &&
          (isScrolled
            ? 'h-8 w-8 border-slate-200/90 bg-white/95 text-amber-600 hover:scale-105 dark:border-white/15 dark:bg-stone-900/80 dark:text-amber-400'
            : 'h-9 w-9 border-amber-500/30 bg-white/90 text-amber-600 hover:scale-105 hover:border-amber-500/50 hover:bg-amber-500/10 dark:border-white/20 dark:bg-stone-950/70 dark:text-amber-400 dark:hover:border-amber-400/60 dark:hover:bg-amber-500/20'),
        className
      )}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      aria-label="Toggle Light or Dark mode"
    >
      <Sun
        className={cn(
          'h-4 w-4 text-amber-500 transition-all duration-300 ease-out',
          iconClassName,
          isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        )}
      />
      <Moon
        className={cn(
          'absolute h-4 w-4 text-amber-400 transition-all duration-300 ease-out',
          iconClassName,
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
