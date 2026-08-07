import type { Metadata } from 'next';

import { GalleryFilterView } from '@/components/features/gallery-filter-view';
import { PageLayout } from '@/components/layout/page-layout';
import { getGalleryItems } from '@/lib/data';
import { createMetadata } from '@/lib/metadata';
import {
  JsonLd,
  webpageSchema,
  breadcrumbSchema,
  imageGallerySchema,
} from '@/lib/schema';

import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Durga Puja Photo Gallery',
    description:
      'Explore high-resolution Durga Puja photo archives of Madhyanchal Sarbajanin in Chandannagar—featuring pandal architecture, idol decorations, sit and draw competition memories, and LED illuminations.',
    canonical: '/durgapuja/gallery',
  }),
  keywords: [
    'durga puja photos chandannagar',
    'madhyanchal durga puja gallery',
    'chandannagar durga puja images',
    'madhyanchal durga puja pandal photos',
    'drawing competition photos madhyanchal',
    'madhyanchal sarbajanin durga puja photos',
  ],
};

export default async function DurgaPujaGalleryPage() {
  const items = await getGalleryItems();

  const galleryImages = items
    .flatMap((item) => item.images?.map((img) => img?.path || '') || [])
    .filter(Boolean);

  const galleryWebpage = webpageSchema({
    title: 'Photo Gallery',
    description:
      'Browse high-resolution photo archives of Madhyanchal Sarbajanin Durga Puja celebrations in Chandannagar.',
    url: '/durgapuja/gallery',
    type: 'CollectionPage',
  });

  const galleryBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: '/durgapuja' },
    { name: 'Gallery', url: '/durgapuja/gallery' },
  ]);

  const gallerySchemaObj = imageGallerySchema({
    title: 'Madhyanchal Sarbajanin Durga Puja Photo Gallery',
    description:
      'Explore memories of majestic Durga Puja pandals, idol artistry, sit & draw contests, and festival illuminations.',
    url: '/durgapuja/gallery',
    images: galleryImages.length > 0 ? galleryImages : ['/logo.png'],
  });

  return (
    <PageLayout
      title="Durga Puja"
      subtitle="Explore high-resolution photo archives of Madhyanchal Sarbajanin Durga Puja celebrations, sit and draw competition, idol artistry, and illuminations."
      badge={{
        text: 'Durga Puja Memory Archives',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Gallery"
    >
      <JsonLd data={[galleryWebpage, galleryBreadcrumb, gallerySchemaObj]} />
      <GalleryFilterView items={items} />
    </PageLayout>
  );
}
