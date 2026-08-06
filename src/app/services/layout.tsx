import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Madhyanchal Sarbajanin Services Portal',
    default: 'Madhyanchal Sarbajanin Services Portal',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="services-layout flex flex-col">{children}</div>;
}
