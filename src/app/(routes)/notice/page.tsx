import type { Metadata } from 'next';
import NoticeClientView from './notice-client-view';

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
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.madhyanchalsarbajanin.co.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Notice Board',
            item: 'https://www.madhyanchalsarbajanin.co.in/notice',
          },
        ],
      },
      {
        '@type': 'Organization',
        name: 'Madhyanchal Sarbajanin',
        url: 'https://www.madhyanchalsarbajanin.co.in',
        logo: 'https://www.madhyanchalsarbajanin.co.in/logo.png',
        knowsAbout: [
          'Annual General Meeting',
          'Community Announcements',
          'Audited Accounts',
          'Jagadhatri & Durga Puja Celebrations',
        ],
      },
    ],
  };

  return <NoticeClientView notices={notices} jsonLd={jsonLd} />;
}
