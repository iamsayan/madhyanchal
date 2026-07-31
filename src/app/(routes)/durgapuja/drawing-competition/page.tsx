import * as React from 'react';

import type { Metadata } from 'next';

import { DrawingCompetitionForm } from '@/components/features/drawing-competition-form';
import { PageLayout } from '@/components/layout/page-layout';

import { Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Drawing Competition Registration | Madhyanchal Sarbajanin',
  description:
    'Register for the annual youth drawing competition organized by Madhyanchal Sarbajanin. Free entry for all age categories with exciting trophies.',
  keywords: [
    'madhyanchal drawing competition',
    'drawing competition registration chandannagar',
    'children drawing contest hooghly',
    'durga puja art competition',
  ],
  openGraph: {
    title: 'Drawing Competition Registration | Madhyanchal Sarbajanin',
    description:
      'Register online for the annual drawing competition open to all children and youth age groups.',
    url: '/durgapuja/drawing-competition',
    type: 'website',
  },
  alternates: {
    canonical: '/durgapuja/drawing-competition',
  },
};

export default function DrawingCompetitionPage() {
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
            name: 'Drawing Competition',
            item: 'https://www.madhyanchalsarbajanin.co.in/durgapuja/drawing-competition',
          },
        ],
      },
      {
        '@type': 'Event',
        name: 'Madhyanchal Annual Youth Drawing Competition',
        description:
          'Sit & Draw competition for children and youth across Group A, B and C categories.',
        location: {
          '@type': 'Place',
          name: 'Madhyanchal Puja Premises',
          address: 'Station Road, Chandannagar, Hooghly - 712136',
        },
      },
    ],
  };

  return (
    <PageLayout
      title="Youth Drawing Competition"
      subtitle="Unleash your artistic expression! Open to children and youth across 3 age categories with free entry and trophies."
      badge={{
        text: 'Art & Creativity Contest',
        icon: Palette,
      }}
      breadcrumbCurrent="Drawing Competition"
      scriptJsonLd={jsonLd}
    >
      <DrawingCompetitionForm />
    </PageLayout>
  );
}
