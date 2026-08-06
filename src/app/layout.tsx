import { SerwistProvider } from '@serwist/next/react';
import type { Metadata, Viewport } from 'next';
import { Outfit, Paytone_One } from 'next/font/google';

import { ThemeProvider } from '@/app/providers/theme-provider';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { MobileNavDock } from '@/components/layout/mobile-nav';
import { PwaInstallPrompt } from '@/components/shared/pwa-install';
import { PageLoader } from '@/components/shared/page-loader';
import { GoogleTagManager } from '@next/third-parties/google';
import { celebratingYear, currentYear, getSettings } from '@/lib/data';
import AppProvider from '@/app/providers/app-provider';
import { ReactNode, Suspense } from 'react';

import './globals.css';
import Script from 'next/script';
import { JsonLd, organizationSchema, websiteSchema, SITE_URL } from '@/lib/schema';

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

export const viewport: Viewport = {
  themeColor: '#1c1917',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Madhyanchal Sarbajanin',
    template: '%s | Madhyanchal Sarbajanin',
  },
  description: `Official website of Madhyanchal Sarbajanin`,
  category: 'Religion & Culture',
  authors: [{ name: 'Sayan Datta', url: 'https://www.sayandatta.co.in' }],
  creator: 'Sayan Datta',
  publisher: 'Madhyanchal Sarbajanin',
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
  openGraph: {
    siteName: 'Madhyanchal Sarbajanin',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@msjpsofficial',
    creator: '@msjpsofficial',
  },
  verification: {
    google: 'SYZt9rv7_qvB3hl-_KzC5lcd-yrB4C2hr4tb2q6RyBA',
    other: {
      me: ['madhyanchalsarbajanin@gmail.com'],
    },
  },
  facebook: {
    appId: process.env.NEXT_PUBLIC_FB_APP_ID!,
  },
  other: {
    'facebook-domain-verification': '0zt2e0ie65lmgs9vgwe2j434t5cboq',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Madhyanchal',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const settings = getSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${paytoneOne.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      {process.env.NODE_ENV === 'production' && (
        <>
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GA4_ID!}
            dataLayer={{
              cookie_prefix: 'MsGtag',
              cookie_domain: process.env.NEXT_PUBLIC_SITE_URL!,
              cookie_flags: 'samesite=none;secure',
              allow_google_signals: true,
            }}
          />
          <Script id="statcounter">
            {`
              var sc_project=11173869;
              var sc_invisible=1;
              var sc_security="87f092e7";
            `}
          </Script>
          <Script
            src="https://www.statcounter.com/counter/counter.js"
            async={true}
          />
        </>
      )}
      <body className="text-foreground flex min-h-screen flex-col bg-amber-50/60 font-sans antialiased transition-colors duration-500 selection:bg-amber-500 selection:text-slate-950 dark:bg-stone-950">
        <SerwistProvider
          swUrl="/sw.js"
          disable={process.env.NODE_ENV !== 'production'}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AppProvider settingsPromise={settings}>
              <Suspense fallback={<PageLoader />}>
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
