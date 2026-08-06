import type { Metadata } from 'next';

import { DrawingCompetitionLanding } from '@/components/features/drawing-competition-landing';
import { PageLayout } from '@/components/layout/page-layout';
import { Palette } from 'lucide-react';
import { getDrawingCompetitionSchema } from '@/lib/seo-schemas';
import { currentYear, getDrawingCompetitionParticipants } from '@/lib/data';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...createMetadata({
    title: `Annual Sit & Draw Competition ${currentYear}`,
    description:
      'Join Madhyanchal Sarbajanin Annual Sit & Draw Competition in Chandannagar. Open for 3 age categories with 15+ trophies, medals, certificates, gifts, and snacks for all participants.',
    canonical: '/durgapuja/drawing-competition',
  }),
  keywords: [
    'madhyanchal drawing competition',
    'drawing competition registration chandannagar',
    'children drawing contest hooghly',
    'durga puja art competition',
    'sit and draw competition 2026',
  ],
};

export default async function DrawingCompetitionLandingPage() {
  const jsonLd = getDrawingCompetitionSchema();
  const participantList = await getDrawingCompetitionParticipants(
    currentYear.toString()
  );

  return (
    <PageLayout
      title="Drawing Competition"
      subtitle="Unleash your child’s creative imagination! Open across 3 age categories with exciting trophies, medals, certificates, and gifts."
      badge={{
        text: 'Art & Creativity Festival',
        icon: Palette,
      }}
      breadcrumbCurrent="Drawing Competition"
      scriptJsonLd={jsonLd}
    >
      <DrawingCompetitionLanding initialParticipants={participantList} />
    </PageLayout>
  );
}
