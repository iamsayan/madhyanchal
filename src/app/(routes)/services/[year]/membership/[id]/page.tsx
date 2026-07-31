import * as React from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceMembershipForm } from '@/components/features/service-membership-form';
import { ServiceLayout } from '@/components/layout/service-layout';
import { getModelItem } from '@/utils/fetch';

interface Props {
  params: Promise<{ year: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, id } = await params;

  return {
    title: `Membership ${year} | Madhyanchal Sarbajanin`,
    description: `Membership Payment for Madhyanchal Sarbajanin Jagadhatri Puja Samity`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/services/${year}/membership/${id}`,
    },
  };
}

interface MemberRecord {
  _id: string;
  name: string;
  phone: string;
  amount?: string | number;
  payments?: Array<{ amount?: string | number }>;
  [key: string]: unknown;
}

export default async function Page({ params }: Props) {
  const { year, id } = await params;

  let memberData: MemberRecord | null = null;
  try {
    const rawData = await getModelItem(
      `members/${id}`,
      {
        payments: year,
      },
      0
    );
    if (rawData && typeof rawData === 'object' && '_id' in rawData) {
      memberData = rawData as unknown as MemberRecord;
    }
  } catch (error) {
    console.error('Error fetching member details:', error);
  }

  if (!memberData) {
    notFound();
  }

  return (
    <ServiceLayout title="Membership Subscription">
      <ServiceMembershipForm memberData={memberData} year={year} />
    </ServiceLayout>
  );
}
