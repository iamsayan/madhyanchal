import type { Metadata } from 'next';

import { ServiceDressOrder } from '@/components/features/service-dress-order';
import { ServiceLayout } from '@/components/layout/service-layout';
import { currentYear, getDressOrders } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Puja Committee Dress ${currentYear} | Madhyanchal Sarbajanin`,
    description: `Order for Madhyanchal Puja Committee Dress ${currentYear}`,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    alternates: {
      canonical: `/services/puja-committee-dress`,
    },
  };
}

export default async function Page() {
  const data = await getDressOrders(currentYear);

  const stockTotals: { [key: string]: number } = {};

  data?.forEach((order) => {
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
      <ServiceDressOrder stockTotals={stockTotals} year={currentYear} />
    </ServiceLayout>
  );
}
