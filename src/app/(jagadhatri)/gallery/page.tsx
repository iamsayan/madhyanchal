import type { Metadata } from 'next';

import { GalleryFilterView } from '@/components/features/gallery-filter-view';
import { PageLayout } from '@/components/layout/page-layout';
import { getGalleryItems } from '@/lib/data';

import { Sparkles } from 'lucide-react';

import { getGallerySchema } from '@/lib/seo-schemas';
import { createMetadata } from '@/src/lib/metadata';

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
  const jsonLd = getGallerySchema();

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
