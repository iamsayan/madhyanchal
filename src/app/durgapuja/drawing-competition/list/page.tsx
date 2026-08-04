import type { Metadata } from 'next';

import { DrawingCompetitionList } from '@/components/features/drawing-competition-list';
import { PageLayout } from '@/components/layout/page-layout';
import { getDrawingCompetitionParticipants } from '@/lib/data';

import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Drawing Competition Participants List | Madhyanchal Sarbajanin',
  description:
    'Official list of registered participants for Madhyanchal Sarbajanin Drawing Competition.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/durgapuja/drawing-competition/list',
  },
};

export default async function DrawingCompetitionListPage() {
  const participantList = await getDrawingCompetitionParticipants('2025');

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
            name: 'Durga Puja',
            item: 'https://www.madhyanchalsarbajanin.co.in/durgapuja',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Drawing Competition List',
            item: 'https://www.madhyanchalsarbajanin.co.in/durgapuja/drawing-competition/list',
          },
        ],
      },
    ],
  };

  return (
    <PageLayout
      title="Participants Directory"
      subtitle="Official list of registered participants for Madhyanchal Drawing Competition."
      badge={{
        text: 'Confirmed Registrations',
        icon: Users,
      }}
      breadcrumbCurrent="Participants List"
      scriptJsonLd={jsonLd}
    >
      <DrawingCompetitionList initialData={participantList} />
    </PageLayout>
  );
}
