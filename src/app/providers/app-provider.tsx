'use client';

import { createContext, ReactNode, use } from 'react';

import type { Settings } from '@/types';

const SiteContext = createContext<{
  settingsPromise: Promise<Settings>;
} | null>(null);

export default function AppProvider({
  children,
  settingsPromise,
}: {
  children: ReactNode;
  settingsPromise: Promise<Settings>;
}) {
  return <SiteContext value={{ settingsPromise }}>{children}</SiteContext>;
}

export function useSiteSettings() {
  const context = use(SiteContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within Providers');
  }
  return use(context.settingsPromise);
}
