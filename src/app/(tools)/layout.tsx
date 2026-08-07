import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Madhyanchal Sarbajanin Tools',
    default: 'Madhyanchal Sarbajanin Tools',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="tools-layout flex flex-col">{children}</div>;
}
