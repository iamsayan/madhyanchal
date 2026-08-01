import { ReactNode } from 'react';

import { PageLayout } from '@/components/layout/page-layout';

import { ShieldCheck } from 'lucide-react';

interface ServiceLayoutProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export function ServiceLayout({
  children,
  title,
  className,
}: ServiceLayoutProps) {
  return (
    <PageLayout
      title={title}
      subtitle="Fast, reliable, and secure digital services for Madhyanchal Sarbajanin Jagadhatri Puja Samity members and devotees."
      badge={{
        text: '100% Encrypted & Secured Payment Portal',
        icon: ShieldCheck,
      }}
      breadcrumbCurrent="Services"
      showBreadcrumb={false}
      maxWidth="max-w-4xl sm:max-w-5xl"
      className={className}
    >
      {children}
    </PageLayout>
  );
}
