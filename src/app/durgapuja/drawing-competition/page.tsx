import type { Metadata } from 'next';

import { DrawingCompetitionLanding } from '@/components/features/drawing-competition-landing';
import { PageLayout } from '@/components/layout/page-layout';
import { Palette } from 'lucide-react';
import { getDrawingCompetitionSchema } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Annual Sit & Draw Competition 2026 | Madhyanchal Sarbajanin',
  description:
    'Join Madhyanchal Sarbajanin Annual Sit & Draw Competition in Chandannagar. Open for 3 age categories with 15+ trophies, medals, certificates, gifts, and snacks for all participants.',
  keywords: [
    'madhyanchal drawing competition',
    'drawing competition registration chandannagar',
    'children drawing contest hooghly',
    'durga puja art competition',
    'sit and draw competition 2026',
  ],
  openGraph: {
    title: 'Annual Sit & Draw Competition 2026 | Madhyanchal Sarbajanin',
    description:
      'Join Chandannagar’s grandest children drawing competition. Trophies, medals, certificates, and gifts for all children!',
    url: '/durgapuja/drawing-competition',
    type: 'website',
  },
  alternates: {
    canonical: '/durgapuja/drawing-competition',
  },
};

export default function DrawingCompetitionLandingPage() {
  const jsonLd = getDrawingCompetitionSchema();

  return (
    <PageLayout
      title="Annual Drawing Competition"
      subtitle="Unleash your child’s creative imagination! Open across 3 age categories with exciting trophies, medals, certificates, and gifts."
      badge={{
        text: 'Art & Creativity Festival',
        icon: Palette,
      }}
      breadcrumbCurrent="Drawing Competition"
      scriptJsonLd={jsonLd}
    >
      <DrawingCompetitionLanding />
    </PageLayout>
  );
}
