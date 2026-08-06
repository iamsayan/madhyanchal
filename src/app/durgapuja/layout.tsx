import { currentYear } from '@/src/lib/data';
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
  publisher: 'Madhyanchal Sarbajanin Durga Puja Samity',
  alternates: {
    canonical: '/durgapuja',
  },
  openGraph: {
    siteName: 'Madhyanchal Sarbajanin',
    title: `Madhyanchal Sarbajanin Durga Puja ${currentYear} | Chandannagar`,
    description: `Official website of Madhyanchal Sarbajanin Durga Puja, Chandannagar. Explore the Durga Puja ${currentYear} schedule, rituals, gallery, cultural programmes, drawing competition, and latest updates.`,
    url: '/durgapuja',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@msjpsofficial',
    creator: '@msjpsofficial',
    title: `Madhyanchal Sarbajanin Durga Puja ${currentYear} | Chandannagar`,
    description: `Official website of Madhyanchal Sarbajanin Durga Puja, Chandannagar. Explore the Durga Puja ${currentYear} schedule, gallery, cultural programmes, and latest updates.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function DurgaPujaLayout({ children }: { children: ReactNode }) {
  return <div className="durga-puja-layout flex flex-col">{children}</div>;
}
