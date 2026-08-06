import type { Metadata } from 'next';

import { ServicePaymentForm } from '@/components/features/service-payment-form';
import { ServiceLayout } from '@/components/layout/service-layout';
import { currentYear } from '@/src/lib/data';

export const metadata: Metadata = {
  title: `Subscription ${currentYear}`,
  description: `Subscription Payment for Madhyanchal Sarbajanin ${currentYear}`,
  alternates: {
    canonical: `/services/subscription`,
  },
};

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
