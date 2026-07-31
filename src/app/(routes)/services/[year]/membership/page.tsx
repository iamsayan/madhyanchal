import * as React from 'react';
import type { Metadata } from 'next';
import { ServiceLayout } from '@/components/layout/service-layout';
import { ServicePaymentForm } from '@/components/features/service-payment-form';

interface Props {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `Membership ${year} | Madhyanchal Sarbajanin`,
    description: `Membership Payment for Madhyanchal Sarbajanin Jagadhatri Puja Samity ${year}`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/services/${year}/membership`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { year } = await params;

  return (
    <ServiceLayout title="Monthly Subscription">
      <ServicePaymentForm type="monthly-subscription" year={year} />
    </ServiceLayout>
  );
}
