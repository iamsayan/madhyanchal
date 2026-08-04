import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const viewport: Viewport = {
  themeColor: '#0c1930',
};

export const metadata: Metadata = {
  title: {
    template: '%s - Durga Puja | Madhyanchal Sarbajanin',
    default: 'Durga Puja Celebrations | Madhyanchal Sarbajanin',
  },
  description:
    'Experience the divine celebration of Durga Puja at Madhyanchal Sarbajanin, Chandannagar. Traditional rituals, youth drawing competition, cultural programs, and community feasts.',
  keywords: [
    'durga puja chandannagar',
    'madhyanchal durga puja',
    'durga puja schedule chandannagar',
    'madhyanchal drawing competition',
    'chandannagar festival',
    'durga puja 2026',
  ],
  openGraph: {
    siteName: 'Madhyanchal Sarbajanin Durga Puja',
    title: 'Durga Puja Celebrations | Madhyanchal Sarbajanin',
    description:
      'Experience traditional rituals, cultural events, and spiritual festivities at Madhyanchal Durga Puja in Chandannagar.',
    url: '/durgapuja',
    type: 'website',
  },
  alternates: {
    canonical: '/durgapuja',
  },
};

export default function DurgaPujaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="durga-puja-theme flex min-h-screen flex-col">
      {children}
    </div>
  );
}
