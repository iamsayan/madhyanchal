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
    title: 'Photo Gallery',
    description:
      'Explore high-resolution photo archives of Madhyanchal Sarbajanin in Chandannagar—featuring majestic pandal architecture, idol decorations, and legendary LED illuminations.',
    canonical: '/gallery',
  }),
  keywords: [
    'jagadhatri puja photos',
    'madhyanchal puja gallery',
    'chandannagar puja images',
    'jagadhatri puja pandal photos',
    'chandannagar lighting photos',
    'madhyanchal sarbajanin photo gallery',
  ],
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  const galleryImages = items
    .flatMap((item) => item.images?.map((img) => img?.path || '') || [])
    .filter(Boolean);

  const galleryWebpage = webpageSchema({
    title: 'Photo Gallery | Madhyanchal Sarbajanin',
    description:
      'Browse high-resolution photo archives of Madhyanchal Sarbajanin Jagadhatri & Durga Puja celebrations in Chandannagar.',
    url: '/gallery',
    type: 'CollectionPage',
  });

  const galleryBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' },
  ]);

  const gallerySchemaObj = imageGallerySchema({
    title: 'Madhyanchal Sarbajanin Jagadhatri & Durga Puja Photo Gallery',
    description:
      'Explore memories of majestic pandals, sacred idols, and world-renowned Chandannagar illuminations.',
    url: '/gallery',
    images: galleryImages.length > 0 ? galleryImages : ['/logo.png'],
  });

  return (
    <PageLayout
      title="Photo Gallery"
      subtitle="Explore memories of majestic pandals, sacred idols, and world-renowned Chandannagar illuminations captured across the years."
      badge={{
        text: 'Photo Memory Archives',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Gallery"
    >
      <JsonLd data={[galleryWebpage, galleryBreadcrumb, gallerySchemaObj]} />
      <GalleryFilterView items={items} />
    </PageLayout>
  );
}
