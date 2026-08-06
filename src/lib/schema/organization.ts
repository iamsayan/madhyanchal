import type { Organization as SchemaOrganization } from 'schema-dts';
import {
  DEFAULT_LOGOS,
  DEFAULT_ORGANIZATION_ALT_NAMES,
  DEFAULT_ORGANIZATION_EMAIL,
  DEFAULT_ORGANIZATION_FOUNDING_DATE,
  DEFAULT_ORGANIZATION_NAME,
  DEFAULT_POSTAL_ADDRESS,
  DEFAULT_SAME_AS_LINKS,
  DEFAULT_VENUE_PLACE,
  ORGANIZATION_ID,
  SITE_URL,
} from './constants';
import type { OrganizationSchema } from './types';

/**
 * Reusable Organization Schema Builder (powered by schema-dts)
 * Canonical Identifier: /#organization
 * Type: Organization (Registered Society / Samity)
 */
export function organizationSchema(
  overrides?: Record<string, unknown>
): OrganizationSchema {
  const base: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: DEFAULT_ORGANIZATION_NAME,
    alternateName: DEFAULT_ORGANIZATION_ALT_NAMES,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_LOGOS.main,
      caption: `${DEFAULT_ORGANIZATION_NAME} Logo`,
    },
    image: DEFAULT_LOGOS.main,
    email: DEFAULT_ORGANIZATION_EMAIL,
    sameAs: DEFAULT_SAME_AS_LINKS,
    description:
      'Official registered society (Samity) behind Madhyanchal Sarbajanin Jagadhatri Puja and Durga Puja in Chandannagar, celebrating heritage, culture, and community since 1971.',
    foundingDate: DEFAULT_ORGANIZATION_FOUNDING_DATE,
    address: DEFAULT_POSTAL_ADDRESS,
    location: DEFAULT_VENUE_PLACE,
  };

  if (!overrides) return base;

  return {
    ...base,
    ...overrides,
  } as OrganizationSchema;
}
