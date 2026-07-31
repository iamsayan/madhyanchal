import { cacheLife, cacheTag } from 'next/cache';

import cockpit from '@/lib/client';
import type { Homepage, Settings } from '@/types';

export async function getSettings(): Promise<Settings> {
  'use cache';
  cacheLife('weeks');
  cacheTag('settings');
  const settings = await cockpit.getContentItemByFilter<Settings>('settings', {
    populate: 1,
  });
  return settings;
}

export async function getHomePage(): Promise<Homepage> {
  'use cache';
  cacheLife('weeks');
  cacheTag('homepage');
  const settings = await cockpit.getContentItemByFilter<Homepage>('homepage', {
    populate: 1,
  });
  return settings;
}
