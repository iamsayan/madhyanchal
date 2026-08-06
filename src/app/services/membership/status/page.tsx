import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceMembershipStatus } from '@/components/features/service-membership-status';
import { ServiceLayout } from '@/components/layout/service-layout';
import { getMembersStatus, getMembershipYear } from '@/lib/data';
import type { PageProps } from '@/types';

type Props = PageProps<Record<string, never>, { year?: string }>;

export const instant = false;

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { year: yearParam } = await searchParams;
  const year = await getMembershipYear(yearParam);

  return {
    title: `Membership Status ${year}`,
    description: `Membership Status for Madhyanchal Sarbajanin`,
    alternates: {
      canonical: `/services/membership/status`,
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const { year: yearParam } = await searchParams;

  const year = await getMembershipYear(yearParam);
  const data = await getMembersStatus(year);

  if (!data || data.length === 0) {
    notFound();
  }

  return (
    <ServiceLayout title={`Membership Status ${year}`}>
      <ServiceMembershipStatus data={data} year={year} />
    </ServiceLayout>
  );
}
