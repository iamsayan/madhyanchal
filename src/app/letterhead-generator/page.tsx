import type { Metadata } from 'next';
import { ServiceLayout } from '@/components/layout/service-layout';
import { LetterheadGenerator } from '@/components/features/letterhead-generator';
import { PageLayout } from '@/src/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Letterhead & PDF Generator',
  description:
    'Generate official Madhyanchal Sarbajanin letterheads, member authorization certificates, notices, and PDF documents.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LetterheadGeneratorPage() {
  return (
    <PageLayout
      title={'Letterhead Generator'}
      subtitle="Generate official Madhyanchal Sarbajanin letterheads, member authorization certificates, notices, and PDF documents."
      showBreadcrumb={false}
    >
      <LetterheadGenerator />
    </PageLayout>
  );
}
