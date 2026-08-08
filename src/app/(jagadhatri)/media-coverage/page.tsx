import type { Metadata } from 'next';
import mediaData from '@/data/media-coverage.json';
import type { MediaCoverageData } from '@/types';
import { MediaCoverageFilterView } from '@/components/features/media-coverage-filter-view';
import { PageLayout } from '@/components/layout/page-layout';
import { createMetadata } from '@/lib/metadata';
import { Newspaper, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Media Coverage & Press Mentions',
    description:
      'Explore official media coverage, press reports, TV broadcasts, and vlogs featuring Madhyanchal Sarbajanin Jagadhatri Puja in Chandannagar across Anandabazar, Sangbad Pratidin, TV9 Bangla, ETV Bharat, and Times of India.',
    canonical: '/media-coverage',
  }),
  keywords: [
    'madhyanchal media coverage',
    'jagadhatri puja news chandannagar',
    'sangbad pratidin madhyanchal',
    'tv9 bangla jagadhatri puja',
    'etv bharat organ donation laser show',
    'times of india heritage puja chandannagar',
    'abp ananda kumari puja madhyanchal',
  ],
};

export default function MediaCoveragePage() {
  const data = mediaData as MediaCoverageData;

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
            name: 'Media Coverage',
            item: 'https://www.madhyanchalsarbajanin.co.in/media-coverage',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'Media Coverage & Press Mentions',
        description:
          'Comprehensive archive of news articles, TV broadcasts, vlogs, and official directory listings of Madhyanchal Sarbajanin.',
        url: 'https://www.madhyanchalsarbajanin.co.in/media-coverage',
      },
    ],
  };

  return (
    <PageLayout
      title="Media Coverage & Press Highlights"
      subtitle="Explore how leading regional, national, and international media outlets highlight Madhyanchal Sarbajanin’s artistic themes, social initiatives, and heritage celebrations."
      badge={{
        text: 'In The Headlines',
        icon: Newspaper,
      }}
      breadcrumbCurrent="Media Coverage"
      scriptJsonLd={jsonLd}
    >
      <MediaCoverageFilterView data={data} />
    </PageLayout>
  );
}
