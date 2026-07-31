import { cacheLife, cacheTag } from 'next/cache';

import cockpit from '@/lib/client';
import type { GalleryItem, Homepage, Settings } from '@/types';

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

export async function getGalleryByYear(year: string): Promise<GalleryItem> {
  'use cache';
  cacheLife('weeks');
  cacheTag('gallery', year);
  const galleryItem = await cockpit.getContentItemByFilter<GalleryItem>(
    'gallery',
    {
      filter: { year },
      populate: 1,
    }
  );
  return galleryItem;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('gallery');
  try {
    const items = await cockpit.listContentItems<GalleryItem[]>('gallery', {
      sort: { year: -1 },
      populate: 1,
    });
    if (Array.isArray(items)) {
      return items;
    }
  } catch (error) {
    console.error('Failed to fetch gallery items:', error);
  }
  return [];
}
