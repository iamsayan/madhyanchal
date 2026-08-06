import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceMembershipStatus } from '@/components/features/service-membership-status';
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
    title: `Membership Status ${year}`,
    description: `Membership Status ${year} for Madhyanchal Sarbajanin`,
    alternates: {
      canonical: `/services/membership/${id}/status`,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const { year: yearParam } = await searchParams;
  const year = await getMembershipYear(yearParam);

  const member = await getMemberById(id, year);

  if (!member || !member._id) {
    notFound();
  }

  return (
    <ServiceLayout title={`Membership Status ${year}`}>
      <ServiceMembershipStatus data={[member]} year={year} />
    </ServiceLayout>
  );
}
