'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { useIsDurgaPuja } from '@/hooks/use-is-durga-puja';

interface PageBreadcrumbProps {
  currentNav: string;
}

export function PageBreadcrumb({ currentNav }: PageBreadcrumbProps) {
  const pathname = usePathname();
  const isDurgaPuja = useIsDurgaPuja();

  if (pathname === '/durgapuja') {
    return null;
  }

  return (
    <nav className="hidden items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 sm:flex dark:text-slate-400">
      {isDurgaPuja ? (
        <>
          <Link
            href="/durgapuja"
            className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          {pathname === '/durgapuja/drawing-competition/list' ? (
            <>
              <Link
                href="/durgapuja/drawing-competition"
                className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
              >
                Drawing Contest
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {currentNav}
              </span>
            </>
          ) : (
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {currentNav}
            </span>
          )}
        </>
      ) : (
        <>
          <Link
            href="/"
            className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-bold text-amber-600 dark:text-amber-400">
            {currentNav}
          </span>
        </>
      )}
    </nav>
  );
}
