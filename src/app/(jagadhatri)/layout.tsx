import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Madhyanchal Sarbajanin Jagadhatri Puja, Chandannagar',
    default: 'Madhyanchal Sarbajanin Jagadhatri Puja | Chandannagar',
  },
  publisher: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
};

export default function JagadhatriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="jagadhatri-puja-layout flex flex-col">{children}</div>;
}
