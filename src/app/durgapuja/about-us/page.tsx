import type { Metadata } from 'next';
import AboutUsPage from '@/app/(jagadhatri)/about-us/page';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'About Durga Puja',
    description:
      'Discover Madhyanchal Sarbajanin Durga Puja Samity (MSDPS) in Chandannagar. Celebrating Durga Puja, Annual Sit & Draw Competition, sports, and community welfare since 1995.',
    canonical: '/durgapuja/about-us',
  }),
  keywords: [
    'madhyanchal durga puja',
    'durga puja samity chandannagar',
    'msdps chandannagar',
    'durga puja about us madhyanchal',
    'chandannagar durga puja committee',
    'madhyanchal sit and draw competition',
  ],
};

export default function DurgaPujaAboutUsPage() {
  return <AboutUsPage isDurgaPuja={true} />;
}
