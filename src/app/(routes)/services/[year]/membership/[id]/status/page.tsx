import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceMembershipStatus } from '@/components/features/service-membership-status';
import { ServiceLayout } from '@/components/layout/service-layout';
import { getMemberById } from '@/lib/data';

interface Props {
  params: Promise<{ year: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, id } = await params;

  return {
    title: `Membership Status ${year} | Madhyanchal Sarbajanin`,
    description: `Membership Status ${year} for Madhyanchal Sarbajanin`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/services/${year}/membership/${id}/status`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { year, id } = await params;
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
