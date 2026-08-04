import type { Metadata } from 'next';
import NoticeClientView from './notice-client-view';

import { getBreadcrumbSchema } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title:
    'Public Notices & Announcements | AGM & Official Updates - Madhyanchal Sarbajanin',
  description:
    'Official notice board of Madhyanchal Sarbajanin Chandannagar. Access Annual General Meeting (AGM) notices, financial reports, executive decisions, and public announcements.',
  keywords: [
    'madhyanchal sarbajanin notice',
    'madhyanchal agm notice',
    'chandannagar club public announcements',
    'madhyanchal sarbajanin circulars',
    'jagadhatri puja meeting notice',
    'madhyanchal general body meeting',
  ],
  openGraph: {
    title: 'Public Notices & Announcements | Madhyanchal Sarbajanin',
    description:
      'Official public announcements, AGM notices, audited financial statements, and press releases of Madhyanchal Sarbajanin Chandannagar.',
    url: '/notice',
    type: 'website',
  },
  alternates: {
    canonical: '/notice',
  },
};

import { Suspense } from 'react';
import { getNotices } from '@/lib/data';

export default async function NoticePage() {
  const notices = await getNotices().catch(() => []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Notice Board', url: '/notice' },
      ]),
    ],
  };

  return <NoticeClientView notices={notices} jsonLd={jsonLd} />;
}
