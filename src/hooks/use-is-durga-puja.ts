'use client';

import { usePathname } from 'next/navigation';

/**
 * Custom hook to detect if the current active route is part of the Durga Puja festival section.
 * @returns boolean - true if current path starts with '/durgapuja', false otherwise.
 */
export function useIsDurgaPuja(): boolean {
  const pathname = usePathname();
  return Boolean(pathname?.startsWith('/durgapuja'));
}
