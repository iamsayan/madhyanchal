import { SerwistProvider } from '@serwist/next/react';
import type { Metadata, Viewport } from 'next';
import { Outfit, Paytone_One } from 'next/font/google';

import { ThemeProvider } from '@/app/providers/theme-provider';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { MobileNavDock } from '@/components/layout/mobile-nav';
import { PwaInstallPrompt } from '@/components/shared/pwa-install';

import { getSettings } from '@/lib/data';
import AppProvider from '@/app/providers/app-provider';
import { Suspense } from 'react';
import { PageLoader } from '@/components/shared/page-loader';

import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const paytoneOne = Paytone_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-paytone',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://madhyanchalsarbajanin.co.in';

export const viewport: Viewport = {
  themeColor: '#0c0a09',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Madhyanchal Sarbajanin Jagadhatri Puja | Chandannagar',
    template: '%s | Madhyanchal Sarbajanin',
  },
  description:
    'Official website of Madhyanchal Sarbajanin Jagadhatri Puja Samity, Chandannagar. Celebrating over 50 years of tradition, unity, and devotion.',
  keywords: [
    'Madhyanchal Sarbajanin',
    'Jagadhatri Puja',
    'Chandannagar',
    'Jagadhatri Puja Chandannagar',
    'Puja Samity',
    'West Bengal Festival',
  ],
  authors: [{ name: 'Madhyanchal Sarbajanin' }],
  creator: 'Madhyanchal Sarbajanin',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Madhyanchal Jagadhatri Puja',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'Madhyanchal Sarbajanin Jagadhatri Puja',
    description:
      'Celebrating over 50 years of tradition, unity, and devotion in Chandannagar.',
    siteName: 'Madhyanchal Sarbajanin',
    images: [
      {
        url: `${siteUrl}/circle-logo.png`,
        width: 800,
        height: 800,
        alt: 'Madhyanchal Sarbajanin Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madhyanchal Sarbajanin Jagadhatri Puja',
    description:
      'Celebrating over 50 years of tradition, unity, and devotion in Chandannagar.',
  },
  icons: {
    icon: '/circle-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${paytoneOne.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="text-foreground flex min-h-screen flex-col bg-amber-50/60 font-sans antialiased transition-colors duration-500 selection:bg-amber-500 selection:text-slate-950 dark:bg-stone-950">
        <SerwistProvider swUrl="/sw.js">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <AppProvider settingsPromise={settings}>
              <Suspense>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <MobileNavDock />
                <PwaInstallPrompt />
              </Suspense>
            </AppProvider>
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
