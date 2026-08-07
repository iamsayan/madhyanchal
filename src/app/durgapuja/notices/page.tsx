import type { Metadata } from 'next';
import NoticePage from '@/app/(jagadhatri)/notices/page';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Public Notices & Announcements',
  description:
    'Official Durga Puja notice board of Madhyanchal Sarbajanin Chandannagar. Access competition guidelines, timings, and announcements.',
  canonical: '/durgapuja/notices',
});

export default function DurgaPujaNoticePage() {
  return <NoticePage isDurgaPuja={true} />;
}
