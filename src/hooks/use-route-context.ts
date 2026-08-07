'use client';

import { usePathname } from 'next/navigation';

export const COMMON_ROUTES = ['/privacy-policy', '/terms'];

export interface RouteContext {
  isDurgaPuja: boolean;
  isCommon: boolean;
  isMainHome: boolean;
  section: 'durga' | 'common' | 'main';
}

/**
 * Single comprehensive hook to manage route classification across Durga Puja, Common Pages, and Main site.
 */
export function useRouteContext(): RouteContext {
  const pathname = usePathname() || '';

  const isDurgaPuja = pathname.startsWith('/durgapuja');
  const isCommon = COMMON_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isMainHome = pathname === '/';

  let section: 'durga' | 'common' | 'main' = 'main';
  if (isDurgaPuja) {
    section = 'durga';
  } else if (isCommon) {
    section = 'common';
  }

  return {
    isDurgaPuja,
    isCommon,
    isMainHome,
    section,
  };
}
