import {
  DEFAULT_LANGUAGE,
  DEFAULT_ORGANIZATION_NAME,
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
} from './constants';
import type { WebSiteSchema } from './types';

/**
 * Reusable WebSite Schema Builder (powered by schema-dts)
 * Canonical Identifier: /#website
 * References Organization via @id
 */
export function websiteSchema(
  overrides?: Partial<WebSiteSchema>
): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: DEFAULT_ORGANIZATION_NAME,
    alternateName: [
      'Madhyanchal Sarbajanin Chandannagar',
      'Madhyanchal Jagadhatri Puja & Durga Puja',
    ],
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    inLanguage: DEFAULT_LANGUAGE,
    ...overrides,
  };
}
