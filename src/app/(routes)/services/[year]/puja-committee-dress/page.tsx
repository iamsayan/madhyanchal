import type { Metadata } from 'next';

import { ServiceDressOrder } from '@/components/features/service-dress-order';
import { ServiceLayout } from '@/components/layout/service-layout';
import { getDressOrders } from '@/lib/data';

interface Props {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `Puja Committee Dress ${year} | Madhyanchal Sarbajanin`,
    description: `Order for Madhyanchal Puja Committee Dress ${year}`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/services/${year}/puja-committee-dress`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { year } = await params;
  const data = await getDressOrders(year);

  const stockTotals: { [key: string]: number } = {};

  data.forEach((order) => {
    if (Array.isArray(order.quantity)) {
      order.quantity.forEach((item: string) => {
        const [size, qty] = item.split(' - ');
        const normalizedSize = size.trim().toLowerCase();
        const quantity = parseInt(qty, 10);
        stockTotals[normalizedSize] =
          (stockTotals[normalizedSize] || 0) + quantity;
      });
    }
  });

  return (
    <ServiceLayout title="Puja Committee Dress">
      <ServiceDressOrder stockTotals={stockTotals} year={year} />
    </ServiceLayout>
  );
}
