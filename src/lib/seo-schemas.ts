/**
 * Enterprise SEO & Schema.org JSON-LD Builders for Madhyanchal Sarbajanin
 * Delegated to modular @/lib/schema architecture.
 */

import {
  organizationSchema,
  websiteSchema,
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
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Durga Puja Entry Point', url: '/durgapuja' },
      ]),
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
        { name: 'Home', url: '/' },
        { name: 'Durga Puja', url: '/durgapuja' },
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
        { name: 'Home', url: '/' },
        { name: 'Durga Puja', url: '/durgapuja' },
        {
          name: 'Drawing Competition',
          url: '/durgapuja/drawing-competition',
        },
      ]),
    ],
  };
}

export function getContactSchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Contact Us', url: '/contact-us' },
      ]),
    ],
  };
}

export function getGallerySchema() {
  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Gallery', url: '/gallery' },
      ]),
      imageGallerySchema({
        title: 'Madhyanchal Sarbajanin Jagadhatri & Durga Puja Photo Gallery',
        description:
          'Browse HD photo gallery of pandal decorations, lighting displays, idol artistry, and cultural events.',
        url: '/gallery',
        images: ['/logo.png'],
      }),
    ],
  };
}
