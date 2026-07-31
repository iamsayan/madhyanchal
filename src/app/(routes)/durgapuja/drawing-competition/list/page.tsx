import * as React from 'react';

import type { Metadata } from 'next';

import {
  DrawingCompetitionList,
  ParticipantRecord,
} from '@/components/features/drawing-competition-list';
import { PageLayout } from '@/components/layout/page-layout';
import { getModelItems } from '@/utils/fetch';

import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Drawing Competition Participants List | Madhyanchal Sarbajanin',
  description:
    'Official list of registered participants for Madhyanchal Sarbajanin Youth Drawing Competition.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/durgapuja/drawing-competition/list',
  },
};

const MOCK_PARTICIPANTS: ParticipantRecord[] = [
  {
    registration_id: 'DC/20250001',
    name: 'Aarav Mukherjee',
    dob: '2018-04-12',
    age: '7 yrs 4 mos',
    category: 'Group A',
    guardian_name: 'Subhash Mukherjee',
    phone: '+91 9831012345',
    email: 'subhash.m@gmail.com',
  },
  {
    registration_id: 'DC/20250002',
    name: 'Ananya Das',
    dob: '2015-08-20',
    age: '10 yrs 0 mos',
    category: 'Group B',
    guardian_name: 'Pratap Das',
    phone: '+91 9832045678',
    email: 'pratap.das@gmail.com',
  },
  {
    registration_id: 'DC/20250003',
    name: 'Soumyadip Ghosh',
    dob: '2012-01-15',
    age: '13 yrs 7 mos',
    category: 'Group C',
    guardian_name: 'Tanmoy Ghosh',
    phone: '+91 9833078901',
    email: 'tanmoy.ghosh@gmail.com',
  },
  {
    registration_id: 'DC/20250004',
    name: 'Ishita Ganguly',
    dob: '2019-11-05',
    age: '5 yrs 9 mos',
    category: 'Group A',
    guardian_name: 'Somenath Ganguly',
    phone: '+91 9834011223',
    email: 'somenath.g@gmail.com',
  },
  {
    registration_id: 'DC/20250005',
    name: 'Rohan Banerjee',
    dob: '2014-06-30',
    age: '11 yrs 2 mos',
    category: 'Group B',
    guardian_name: 'Debabrata Banerjee',
    phone: '+91 9835033445',
    email: 'debabrata.b@gmail.com',
  },
];

export default async function DrawingCompetitionListPage() {
  let participantList: ParticipantRecord[] = [];

  try {
    const res = await getModelItems(
      'drawingcompetition2025',
      {
        sort: { category: 1, name: 1 },
      },
      0
    );
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      participantList = res.data as ParticipantRecord[];
    } else {
      participantList = MOCK_PARTICIPANTS;
    }
  } catch {
    participantList = MOCK_PARTICIPANTS;
  }

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
      subtitle="Official list of registered participants for Madhyanchal Youth Drawing Competition."
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
