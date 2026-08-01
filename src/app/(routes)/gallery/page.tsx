import type { Metadata } from 'next';

import { GalleryFilterView } from '@/components/features/gallery-filter-view';
import { PageLayout } from '@/components/layout/page-layout';
import { getGalleryItems } from '@/lib/data';

import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Photo Gallery | Madhyanchal Sarbajanin Chandannagar',
  description:
    'Explore high-resolution photo archives of Madhyanchal Sarbajanin in Chandannagar—featuring majestic pandal architecture, idol decorations, and legendary LED illuminations.',
  keywords: [
    'jagadhatri puja photos',
    'madhyanchal puja gallery',
    'chandannagar puja images',
    'jagadhatri puja pandal photos',
    'chandannagar lighting photos',
    'madhyanchal sarbajanin photo gallery',
  ],
  openGraph: {
    title: 'Photo Gallery | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Explore high-resolution photo archives of Madhyanchal Sarbajanin in Chandannagar.',
    url: '/gallery',
    type: 'website',
  },
  alternates: {
    canonical: '/gallery',
  },
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

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
            name: 'Gallery',
            item: 'https://www.madhyanchalsarbajanin.co.in/gallery',
          },
        ],
      },
      {
        '@type': 'ImageGallery',
        name: 'Madhyanchal Sarbajanin Jagadhatri Puja Photo Gallery',
        description:
          'Photo archive collection of Madhyanchal Sarbajanin in Chandannagar.',
        url: 'https://www.madhyanchalsarbajanin.co.in/gallery',
      },
    ],
  };

  return (
    <PageLayout
      title="Photo Gallery"
      subtitle="Explore memories of majestic pandals, sacred idols, and world-renowned Chandannagar illuminations captured across the years."
      badge={{
        text: 'Photo Memory Archives',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Gallery"
      scriptJsonLd={jsonLd}
    >
      <GalleryFilterView items={items} />
    </PageLayout>
  );
}
