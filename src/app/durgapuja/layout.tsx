import { currentYear } from '@/lib/data';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const viewport: Viewport = {
  themeColor: '#0c1930',
};

export const metadata: Metadata = {
  title: {
    absolute: `Madhyanchal Sarbajanin Durga Puja ${currentYear} | Chandannagar`,
    template: '%s | Madhyanchal Sarbajanin Durga Puja',
  },
  description: `Official website of Madhyanchal Sarbajanin Durga Puja, Chandannagar. Explore the Durga Puja ${currentYear} schedule, rituals, photo gallery, cultural programmes, drawing competition, committee details, and the latest updates.`,
  keywords: [
    'durga puja chandannagar',
    'madhyanchal durga puja',
    'durga puja 2026',
    'durga puja schedule chandannagar',
    'madhyanchal drawing competition',
    'sandhi puja chandannagar',
    'chandannagar festival 2026',
    'madhyanchal sarbajanin durga puja',
    'hooghly durga puja',
    'bengal autumn festival',
  ],
  alternates: {
    canonical: '/durgapuja',
  },
};

export default function DurgaPujaLayout({ children }: { children: ReactNode }) {
  return <div className="durga-puja-layout flex flex-col">{children}</div>;
}
