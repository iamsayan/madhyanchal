import * as React from 'react';

import type { Metadata } from 'next';

import { GalleryFilterView } from '@/components/features/gallery-filter-view';
import { PageLayout } from '@/components/layout/page-layout';

import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Photo Gallery | Madhyanchal Sarbajanin Chandannagar',
  description:
    'Explore high-resolution photo archives of Madhyanchal Sarbajanin Jagadhatri Puja Samity in Chandannagar—featuring majestic pandal architecture, idol decorations, and legendary LED illuminations.',
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
      'Explore high-resolution photo archives of Madhyanchal Sarbajanin Jagadhatri Puja Samity in Chandannagar.',
    url: '/gallery',
    type: 'website',
  },
  alternates: {
    canonical: '/gallery',
  },
};

async function getGalleryData() {
  try {
    const serviceUrl =
      process.env.NEXT_PUBLIC_IMAGE_SERVICE_URL ||
      'https://web.madhyanchalsarbajanin.co.in/cms';
    const res = await fetch(`${serviceUrl}/api.php?v=1s`, {
      next: { revalidate: 3600, tags: ['gallery-data'] },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Gallery API fetch error:', error);
  }
  return {};
}

export default async function GalleryPage() {
  const images = await getGalleryData();

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
          'Photo archive collection of Madhyanchal Sarbajanin Jagadhatri Puja Samity in Chandannagar.',
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
      <GalleryFilterView images={images} />
    </PageLayout>
  );
}
