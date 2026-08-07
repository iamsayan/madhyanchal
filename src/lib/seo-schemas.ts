/**
 * Enterprise SEO & Schema.org JSON-LD Builders for Madhyanchal Sarbajanin
 * Delegated to modular @/lib/schema architecture.
 */

import {
  organizationSchema,
  webpageSchema,
  breadcrumbSchema,
  jagadhatriPujaEventSchema,
  durgaPujaEventSchema,
  jagadhatriFaqSchema,
  durgaFaqSchema,
  articleSchema,
  imageGallerySchema,
  SITE_URL as SCHEMA_SITE_URL,
} from '@/lib/schema';

export * from '@/lib/schema';

export const SITE_URL = SCHEMA_SITE_URL;
export const ORGANIZATION_SCHEMA = organizationSchema();

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return breadcrumbSchema(items);
}

export function getJagadhatriPujaEntrySchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      webpageSchema({
        title: 'Madhyanchal Sarbajanin Jagadhatri Puja | Chandannagar',
        description:
          'Celebrating 55+ years of tradition, unity, and grandeur in Chandannagar.',
        url: '/',
        breadcrumb: [{ name: 'Home', url: '/' }],
      }),
      jagadhatriPujaEventSchema(),
      jagadhatriFaqSchema(),
    ],
  };
}

export function getDurgaPujaEntrySchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema([{ name: 'Home', url: '/durgapuja' }]),
      webpageSchema({
        title: 'Madhyanchal Sarbajanin Durga Puja | Chandannagar',
        description: 'Grand Durga Puja celebrations at Madhyanchal Sarbajanin.',
        url: '/durgapuja',
      }),
      durgaPujaEventSchema(),
      durgaFaqSchema('/durgapuja'),
    ],
  };
}

export function getPujaHistorySchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Puja History', url: '/puja-history' },
      ]),
      articleSchema({
        headline: 'Heritage & History of Madhyanchal Sarbajanin Since 1971',
        description:
          'Trace 55+ years of glorious heritage of Madhyanchal Sarbajanin in Chandannagar — from humble beginnings in 1971 to world-class Jagadhatri & Durga Puja celebrations.',
        url: '/puja-history',
        datePublished: '1971-01-01',
      }),
    ],
  };
}

export function getJagadhatriScheduleSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Schedule', url: '/schedule' },
      ]),
    ],
  };
}

export function getDurgaPujaScheduleSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', url: '/durgapuja' },
        { name: 'Festival Schedule', url: '/durgapuja/schedule' },
      ]),
    ],
  };
}

export function getDrawingCompetitionSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', url: '/durgapuja' },
        {
          name: 'Drawing Competition',
          url: '/durgapuja/drawing-competition',
        },
      ]),
    ],
  };
}

export function getContactSchema(isDurgaPuja = false) {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema(
        isDurgaPuja
          ? [
              { name: 'Home', url: '/durgapuja' },
              { name: 'Contact Us', url: '/durgapuja/contact-us' },
            ]
          : [
              { name: 'Home', url: '/' },
              { name: 'Contact Us', url: '/contact-us' },
            ]
      ),
      {
        '@type': 'ContactPage',
        name: isDurgaPuja
          ? 'Contact Us | Madhyanchal Sarbajanin Durga Puja'
          : 'Contact Us | Madhyanchal Sarbajanin Jagadhatri Puja',
        description: isDurgaPuja
          ? 'Get in touch with Madhyanchal Sarbajanin Durga Puja committee desk for festival queries, sponsorships, and drawing competition.'
          : 'Get in touch with Madhyanchal Sarbajanin Jagadhatri Puja Samity for inquiries, sponsorships, and collaborations.',
        url: isDurgaPuja
          ? `${SCHEMA_SITE_URL}/durgapuja/contact-us`
          : `${SCHEMA_SITE_URL}/contact-us`,
        mainEntity: {
          '@type': 'Organization',
          name: isDurgaPuja
            ? 'Madhyanchal Sarbajanin Durga Puja Samity'
            : 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
          email: isDurgaPuja
            ? 'durga.madhyanchal@gmail.com'
            : 'jagatdhatri.madhyanchal@gmail.com',
          telephone: '+91-9051300020',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Station Road',
            addressLocality: 'Chandannagar',
            addressRegion: 'West Bengal',
            postalCode: '712136',
            addressCountry: 'IN',
          },
        },
      },
    ],
  };
}

export function getNoticeSchema(isDurgaPuja = false) {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema(
        isDurgaPuja
          ? [
              { name: 'Home', url: '/durgapuja' },
              { name: 'Notice Board', url: '/durgapuja/notice' },
            ]
          : [
              { name: 'Home', url: '/' },
              { name: 'Notice Board', url: '/notice' },
            ]
      ),
      {
        '@type': 'WebPage',
        name: isDurgaPuja
          ? 'Public Notices & Announcements | Durga Puja'
          : 'Public Notices & Announcements | Madhyanchal Sarbajanin',
        description: isDurgaPuja
          ? 'Official Durga Puja notice board of Madhyanchal Sarbajanin Chandannagar.'
          : 'Official notice board of Madhyanchal Sarbajanin Chandannagar.',
        url: isDurgaPuja
          ? `${SCHEMA_SITE_URL}/durgapuja/notice`
          : `${SCHEMA_SITE_URL}/notice`,
      },
    ],
  };
}

export function getGallerySchema(isDurgaPuja = false) {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema(
        isDurgaPuja
          ? [
              { name: 'Home', url: '/durgapuja' },
              { name: 'Gallery', url: '/durgapuja/gallery' },
            ]
          : [
              { name: 'Home', url: '/' },
              { name: 'Gallery', url: '/gallery' },
            ]
      ),
      imageGallerySchema({
        title: isDurgaPuja
          ? 'Madhyanchal Sarbajanin Durga Puja Photo Gallery'
          : 'Madhyanchal Sarbajanin Jagadhatri & Durga Puja Photo Gallery',
        description: isDurgaPuja
          ? 'Browse HD photo gallery of Durga Puja pandal decorations, drawing competition, lighting displays, and idol artistry.'
          : 'Browse HD photo gallery of pandal decorations, lighting displays, idol artistry, and cultural events.',
        url: isDurgaPuja ? '/durgapuja/gallery' : '/gallery',
        images: ['/logo.png'],
      }),
    ],
  };
}
