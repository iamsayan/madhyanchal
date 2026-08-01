import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceMembershipStatus } from '@/components/features/service-membership-status';
import { ServiceLayout } from '@/components/layout/service-layout';
import { getMembersStatus } from '@/lib/data';

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
