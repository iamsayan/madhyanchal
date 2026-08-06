import type { PostalAddress, GeoCoordinates, Place } from 'schema-dts';

/**
 * Global Constants & Canonical Identifiers for JSON-LD Schema Architecture (schema-dts powered)
 */

export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const ORGANIZATION_ID: string = `${SITE_URL}/#organization`;
export const WEBSITE_ID: string = `${SITE_URL}/#website`;

export const DEFAULT_ORGANIZATION_NAME = 'Madhyanchal Sarbajanin';
export const DEFAULT_ORGANIZATION_ALT_NAMES = [
  'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
  'Madhyanchal Sarbajanin Durga Puja',
  'Madhyanchal Sporting Club',
];

export const DEFAULT_ORGANIZATION_EMAIL = 'madhyanchalsarbajanin@gmail.com';
export const DEFAULT_ORGANIZATION_FOUNDING_DATE = '1971';
export const DEFAULT_LANGUAGE = 'en-IN';

export const DEFAULT_LOGOS = {
  main: `${SITE_URL}/logo.png`,
  jagadhatri: `${SITE_URL}/letter-head-msjps.jpg`,
  durga: `${SITE_URL}/letter-head-msdps.jpg`,
};

export const DEFAULT_SAME_AS_LINKS: string[] = [
  'https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9',
  'https://www.facebook.com/msjpsofficial',
];

export const DEFAULT_POSTAL_ADDRESS: PostalAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'Station Road',
  addressLocality: 'Chandannagar',
  addressRegion: 'West Bengal',
  postalCode: '712136',
  addressCountry: 'IN',
};

export const DEFAULT_GEO_COORDINATES: GeoCoordinates = {
  '@type': 'GeoCoordinates',
  latitude: 22.8687,
  longitude: 88.3662,
};

export const DEFAULT_VENUE_PLACE: Place = {
  '@type': 'Place',
  '@id': `${SITE_URL}/#venue-ground`,
  name: 'Madhyanchal Puja Ground',
  address: DEFAULT_POSTAL_ADDRESS,
  geo: DEFAULT_GEO_COORDINATES,
  hasMap: 'https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9',
};
