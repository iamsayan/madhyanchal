import type { Metadata } from 'next';
import { ServiceLayout } from '@/components/layout/service-layout';
import { LetterheadGenerator } from '@/components/features/letterhead-generator';

export const metadata: Metadata = {
  title: 'Letterhead & PDF Generator',
  description:
    'Generate official Madhyanchal Sarbajanin letterheads, member authorization certificates, notices, and PDF documents.',
};

export default function LetterheadGeneratorPage() {
  return (
    <ServiceLayout title="Letterhead Generator">
      <LetterheadGenerator />
    </ServiceLayout>
  );
}
