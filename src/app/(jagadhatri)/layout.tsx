import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Madhyanchal Sarbajanin Jagadhatri Puja',
    default: 'Madhyanchal Sarbajanin Jagadhatri Puja | Chandannagar',
  },
};

export default function JagadhatriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="jagadhatri-puja-layout flex flex-col">{children}</div>;
}
