import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceMembershipForm } from '@/components/features/service-membership-form';
import { ServiceLayout } from '@/components/layout/service-layout';
import { getMemberById, getMembershipYear } from '@/lib/data';
import type { PageProps } from '@/types';

type Props = PageProps<{ id: string }, { year?: string }>;

export const instant = false;

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const { year: yearParam } = await searchParams;
  const year = await getMembershipYear(yearParam);

  return {
    title: `Membership ${year} | Madhyanchal Sarbajanin`,
    description: `Membership Payment for Madhyanchal Sarbajanin`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/services/membership/${id}`,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const { year: yearParam } = await searchParams;
  const year = await getMembershipYear(yearParam);

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
