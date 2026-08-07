import type { Metadata } from 'next';
import NoticeClientView from '@/components/features/notice-client-view';

import { getNoticeSchema } from '@/lib/seo-schemas';
import { getNotices } from '@/lib/data';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Public Notices & Announcements',
    description:
      'Official notice board of Madhyanchal Sarbajanin Chandannagar. Access Annual General Meeting (AGM) notices, financial reports, executive decisions, and public announcements.',
    canonical: '/notice',
  }),
  keywords: [
    'madhyanchal sarbajanin notice',
    'madhyanchal agm notice',
    'chandannagar club public announcements',
    'madhyanchal sarbajanin circulars',
    'jagadhatri puja meeting notice',
    'madhyanchal general body meeting',
  ],
};

interface NoticePageProps {
  isDurgaPuja?: boolean;
}

export default async function NoticePage({
  isDurgaPuja = false,
}: NoticePageProps) {
  const notices = await getNotices().catch(() => []);
  const jsonLd = getNoticeSchema(isDurgaPuja);

  return (
    <NoticeClientView
      notices={notices}
      jsonLd={jsonLd}
      isDurgaPuja={isDurgaPuja}
    />
  );
}
