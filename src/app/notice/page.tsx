import type { Metadata, Viewport } from 'next';
import NoticeClientView from './notice-client-view';

import { getBreadcrumbSchema } from '@/lib/seo-schemas';
import { getNotices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Public Notices & Announcements',
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
  alternates: {
    canonical: '/notice',
  },
};

export const viewport: Viewport = {
  themeColor: '#4a0e17',
};

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
