import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const viewport: Viewport = {
  themeColor: '#0c1930',
};

export const metadata: Metadata = {
  title: {
    template: '%s | Durga Puja 2026 - Madhyanchal Sarbajanin',
    default: 'Durga Puja 2026 Celebrations | Madhyanchal Sarbajanin',
  },
  description:
    'Join the Durga Puja 2026 celebrations at Madhyanchal Sarbajanin, Chandannagar. 5-day festival schedule, 108 lotus Sandhi Puja, Youth Drawing Contest, and community feasts.',
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
  category: 'Culture & Religion',
  alternates: {
    canonical: '/durgapuja',
  },
  openGraph: {
    siteName: 'Madhyanchal Sarbajanin Durga Puja',
    title: 'Durga Puja 2026 Celebrations | Madhyanchal Sarbajanin',
    description:
      'Experience traditional Vedic rituals, 108 lotus Sandhi Puja, youth drawing contest, and community festivities at Madhyanchal Durga Puja in Chandannagar.',
    url: '/durgapuja',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Madhyanchal Sarbajanin Durga Puja Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@msjpsofficial',
    creator: '@msjpsofficial',
    title: 'Durga Puja 2026 Celebrations | Madhyanchal Sarbajanin',
    description:
      'Experience traditional Vedic rituals, 108 lotus Sandhi Puja, youth drawing contest, and community festivities at Madhyanchal Durga Puja in Chandannagar.',
    images: ['/logo.png'],
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
  return (
    <div className="durga-puja-theme flex min-h-screen flex-col">
      {children}
    </div>
  );
}
