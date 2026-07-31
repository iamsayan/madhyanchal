'use client';

import { ReactNode, createContext, useContext } from 'react';

import { Settings } from '@/types';

export type SiteSettings = Settings;

// Create the context for siteSettings
export const SiteSettingsContext = createContext<SiteSettings | null>(null);

// Provider component
export const SiteSettingsProvider = ({
  children,
  siteSettings,
}: {
  children: ReactNode;
  siteSettings: SiteSettings;
}) => {
  return (
    <SiteSettingsContext value={siteSettings}>{children}</SiteSettingsContext>
  );
};

// Custom hook to use the siteSettings context
export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error(
      'useSiteSettings must be used within a SiteSettingsProvider'
    );
  }
  return context;
};
