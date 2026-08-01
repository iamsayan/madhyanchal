import { cacheLife, cacheTag } from 'next/cache';

import cockpit from '@/lib/client';
import type {
  DrawingCompetitionRecord,
  DressOrder,
  GalleryItem,
  Homepage,
  Member,
  Settings,
} from '@/types';

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
  const items = await cockpit.listContentItems<GalleryItem[]>('gallery', {
    sort: { year: -1 },
    populate: 1,
  });
  return items;
}

export async function getMembersStatus(year: string): Promise<Member[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag('members', `members-${year}`);
  const res = await cockpit.listContentItems<Member[]>('members', {
    payments: year,
    sort: { name: 1 },
  });
  return res;
}

export async function getMemberById(id: string, year: string): Promise<Member> {
  const res = await cockpit.getContentItemById<Member>('members', id, {
    payments: year,
  });
  return res;
}

export async function getDressOrders(year: string): Promise<DressOrder[]> {
  const res = await cockpit.listContentItems<DressOrder[]>(`dress${year}`);
  return res;
}

export async function getDrawingCompetitionParticipants(
  year: string
): Promise<DrawingCompetitionRecord[]> {
  'use cache';
  cacheLife('weeks');
  cacheTag(`drawingcompetition${year}`);
  const res = await cockpit.listContentItems<DrawingCompetitionRecord[]>(
    `drawingcompetition${year}`,
    {
      sort: { category: 1, name: 1 },
    }
  );
  return res;
}
