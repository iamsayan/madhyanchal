import type { Metadata } from 'next';

import { ServicePaymentForm } from '@/components/features/service-payment-form';
import { ServiceLayout } from '@/components/layout/service-layout';
import { currentYear } from '@/src/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Subscription ${currentYear} | Madhyanchal Sarbajanin`,
    description: `Subscription Payment for Madhyanchal Sarbajanin ${currentYear}`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/services/subscription`,
    },
  };
}

export default async function Page() {
  return (
    <ServiceLayout title="Monthly Subscription">
      <ServicePaymentForm
        type="monthly-subscription"
        year={currentYear.toString()}
      />
    </ServiceLayout>
  );
}
