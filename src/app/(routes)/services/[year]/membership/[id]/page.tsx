import * as React from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceMembershipForm } from '@/components/features/service-membership-form';
import { ServiceLayout } from '@/components/layout/service-layout';
import { getMemberById } from '@/lib/data';

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

export default async function Page({ params }: Props) {
  const { year, id } = await params;
  const memberData = await getMemberById(id, year);

  if (!memberData) {
    notFound();
  }

  return (
    <ServiceLayout title="Membership Subscription">
      <ServiceMembershipForm memberData={memberData} year={year} />
    </ServiceLayout>
  );
}
