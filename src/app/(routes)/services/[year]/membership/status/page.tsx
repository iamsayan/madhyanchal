import * as React from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceMembershipStatus } from '@/components/features/service-membership-status';
import { ServiceLayout } from '@/components/layout/service-layout';
import { getModelItems } from '@/utils/fetch';

interface Props {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `Membership Status ${year} | Madhyanchal Sarbajanin`,
    description: `Membership Status for Madhyanchal Sarbajanin Jagadhatri Puja Samity`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/services/${year}/membership/status`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { year } = await params;

  let data: Record<string, unknown>[] = [];
  try {
    const modelData = await getModelItems(
      'members',
      {
        payments: year,
        sort: {
          name: 1,
        },
      },
      0
    );
    if (Array.isArray(modelData?.data)) {
      data = modelData.data as Record<string, unknown>[];
    }
  } catch (error) {
    console.error('Error fetching membership status:', error);
  }

  if (!data || data.length === 0) {
    notFound();
  }

  return (
    <ServiceLayout title={`Membership Status ${year}`}>
      <ServiceMembershipStatus data={data} year={year} />
    </ServiceLayout>
  );
}
