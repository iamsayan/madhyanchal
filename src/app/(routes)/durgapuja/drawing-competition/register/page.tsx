import type { Metadata } from 'next';

import { DrawingCompetitionForm } from '@/components/features/drawing-competition-form';
import { PageLayout } from '@/components/layout/page-layout';
import { Palette } from 'lucide-react';
import { getDrawingCompetitionSchema } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Online Registration | Drawing Competition 2026 | Madhyanchal Sarbajanin',
  description:
    'Register online for the annual Sit & Draw competition organized by Madhyanchal Sarbajanin. ₹50 per participant with instant confirmation.',
  keywords: [
    'drawing competition online registration',
    'madhyanchal drawing competition registration',
    'chandannagar art contest register',
  ],
  openGraph: {
    title: 'Online Registration | Drawing Competition 2026',
    description:
      'Fill out guardian and participant details to register for the annual drawing competition.',
    url: '/durgapuja/drawing-competition/register',
    type: 'website',
  },
  alternates: {
    canonical: '/durgapuja/drawing-competition/register',
  },
};

export default function DrawingCompetitionRegisterPage() {
  const jsonLd = getDrawingCompetitionSchema();

  return (
    <PageLayout
      title="Online Registration Portal"
      subtitle="Register your child for the annual Sit & Draw competition. Fast & secure online registration."
      badge={{
        text: 'Participant Registration',
        icon: Palette,
      }}
      breadcrumbCurrent="Registration Form"
      scriptJsonLd={jsonLd}
    >
      <DrawingCompetitionForm />
    </PageLayout>
  );
}
