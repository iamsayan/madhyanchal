'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { useRouteContext } from '@/hooks/use-route-context';

interface PageBreadcrumbProps {
  currentNav: string;
}

function formatSegmentName(segment: string): string {
  const formattedMap: Record<string, string> = {
    durgapuja: 'Durga Puja',
    'drawing-competition': 'Drawing Competition',
    schedule: 'Schedule',
    awards: 'Awards',
    gallery: 'Gallery',
    about: 'About',
    contact: 'Contact',
    services: 'Services',
    membership: 'Membership',
  };

  if (formattedMap[segment]) {
    return formattedMap[segment];
  }

  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function PageBreadcrumb({ currentNav }: PageBreadcrumbProps) {
  const pathname = usePathname();
  const { isDurgaPuja } = useRouteContext();

  if (pathname === '/' || pathname === '/durgapuja') {
    return null;
  }

  // Dynamically parse path segments from URL
  const segments = pathname.split('/').filter(Boolean);

  // Define section base root
  const baseHref = isDurgaPuja ? '/durgapuja' : '/';
  const baseLabel = 'Home';

  // Exclude 'durgapuja' prefix from intermediate links if in Durga Puja section
  const startIndex = isDurgaPuja && segments[0] === 'durgapuja' ? 1 : 0;
  const subSegments = segments.slice(startIndex, segments.length - 1);

  const intermediateBreadcrumbs = subSegments.map((segment, idx) => {
    const pathUntil = segments.slice(0, startIndex + idx + 1).join('/');
    return {
      label: formatSegmentName(segment),
      href: `/${pathUntil}`,
    };
  });

  return (
    <nav className="hidden flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500 sm:flex sm:text-xs dark:text-slate-400">
      <Link
        href={baseHref}
        className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
      >
        {baseLabel}
      </Link>

      {intermediateBreadcrumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
          <Link
            href={crumb.href}
            className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
          >
            {crumb.label}
          </Link>
        </span>
      ))}

      <ChevronRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
      <span className="font-bold text-amber-600 dark:text-amber-400">
        {currentNav}
      </span>
    </nav>
  );
}
