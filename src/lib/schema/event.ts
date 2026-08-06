import type { Event as SchemaEvent } from 'schema-dts';
import {
  DEFAULT_LOGOS,
  DEFAULT_VENUE_PLACE,
  ORGANIZATION_ID,
  SITE_URL,
} from './constants';
import type { EventOptions, EventSchema } from './types';

/**
 * Reusable Event / Festival Schema Builder (powered by schema-dts)
 * References Organization (@id) as organizer
 */
export function eventSchema(options: EventOptions): EventSchema {
  const fullUrl = options.url.startsWith('http')
    ? options.url
    : `${SITE_URL}${options.url.startsWith('/') ? '' : '/'}${options.url}`;

  const eventId = options.id || `${fullUrl}#festival`;

  const subEvents: SchemaEvent[] | undefined = options.subEvent
    ? options.subEvent.map((sub) => ({
        '@type': 'Event',
        name: sub.name,
        startDate: sub.startDate,
        endDate: sub.endDate,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        ...(sub.description && { description: sub.description }),
        location: sub.locationName
          ? { '@type': 'Place', name: sub.locationName }
          : DEFAULT_VENUE_PLACE,
      }))
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': options.type || 'Festival',
    '@id': eventId,
    name: options.name,
    ...(options.alternateName && { alternateName: options.alternateName }),
    description: options.description,
    url: fullUrl,
    startDate: options.startDate,
    endDate: options.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree:
      options.isAccessibleForFree !== undefined
        ? options.isAccessibleForFree
        : true,
    image: options.image || [DEFAULT_LOGOS.main, DEFAULT_LOGOS.jagadhatri],
    location: options.location || DEFAULT_VENUE_PLACE,
    organizer: {
      '@id': ORGANIZATION_ID,
    },
    ...(subEvents && { subEvent: subEvents }),
  };
}

/**
 * Preset Helper for Jagadhatri Puja Main Event (Root)
 */
export function jagadhatriPujaEventSchema(
  overrides?: Partial<EventOptions>
): EventSchema {
  return eventSchema({
    name: 'Madhyanchal Sarbajanin Jagadhatri Puja 2026',
    alternateName: 'Madhyanchal Jagadhatri Puja Chandannagar',
    description:
      'Celebrating 55+ years of tradition, unity, and grandeur! Experience world-renowned Jagadhatri Puja in Chandannagar at Madhyanchal Sarbajanin — traditional worship, 108 lotus Nabami Pushpanjali, iconic Chandannagar illumination, and grand immersion procession.',
    url: '/',
    id: `${SITE_URL}/#jagadhatri-festival`,
    startDate: '2026-11-16T06:00:00+05:30',
    endDate: '2026-11-20T23:59:00+05:30',
    image: [DEFAULT_LOGOS.main, DEFAULT_LOGOS.jagadhatri],
    subEvent: [
      {
        name: 'Saptami Puja & Bodhon',
        startDate: '2026-11-16T07:00:00+05:30',
        endDate: '2026-11-16T22:00:00+05:30',
        locationName: 'Madhyanchal Puja Ground',
      },
      {
        name: 'Maha Ashtami Anjali & Puja',
        startDate: '2026-11-17T07:30:00+05:30',
        endDate: '2026-11-17T22:30:00+05:30',
        locationName: 'Madhyanchal Puja Ground',
      },
      {
        name: 'Maha Nabami Puja & 108 Lotus Anjali',
        startDate: '2026-11-18T08:00:00+05:30',
        endDate: '2026-11-18T23:30:00+05:30',
        locationName: 'Madhyanchal Puja Ground',
      },
      {
        name: 'Vijayadashami & World Famous Shobhajatra Procession',
        startDate: '2026-11-19T10:00:00+05:30',
        endDate: '2026-11-20T04:00:00+05:30',
        locationName: 'Chandannagar Procession Route & Strand Road',
      },
    ],
    ...overrides,
  });
}

/**
 * Preset Helper for Durga Puja Event (/durgapuja)
 */
export function durgaPujaEventSchema(
  overrides?: Partial<EventOptions>
): EventSchema {
  return eventSchema({
    name: 'Madhyanchal Sarbajanin Durga Puja 2026',
    alternateName: 'Madhyanchal Durga Puja Celebrations',
    description:
      'Join the grand Durga Puja celebrations at Madhyanchal Sarbajanin in Chandannagar — traditional rituals, Pushpanjali, 108 lotus Sandhi Puja, Youth Drawing Contest, and community feasts.',
    url: '/durgapuja',
    id: `${SITE_URL}/durgapuja#festival`,
    startDate: '2026-10-16T06:00:00+05:30',
    endDate: '2026-10-20T22:00:00+05:30',
    image: [DEFAULT_LOGOS.main, DEFAULT_LOGOS.durga],
    subEvent: [
      {
        name: 'Maha Sasthi - Bodhon & Adhibas',
        startDate: '2026-10-16T07:30:00+05:30',
        endDate: '2026-10-16T21:00:00+05:30',
        locationName: 'Madhyanchal Puja Grounds',
      },
      {
        name: 'Maha Saptami - Nabapatrika Prabesh',
        startDate: '2026-10-17T06:00:00+05:30',
        endDate: '2026-10-17T22:00:00+05:30',
        locationName: 'Madhyanchal Puja Grounds',
      },
      {
        name: 'Maha Ashtami - Pushpanjali & 108 Lotus Sandhi Puja',
        startDate: '2026-10-18T08:00:00+05:30',
        endDate: '2026-10-18T22:30:00+05:30',
        locationName: 'Madhyanchal Puja Grounds',
      },
      {
        name: 'Maha Nabami - Maha Aarti & Bhog Distribution',
        startDate: '2026-10-19T09:00:00+05:30',
        endDate: '2026-10-19T23:00:00+05:30',
        locationName: 'Madhyanchal Puja Grounds',
      },
      {
        name: 'Vijayadashami - Aparajita Puja & Immersion Procession',
        startDate: '2026-10-20T10:00:00+05:30',
        endDate: '2026-10-20T22:00:00+05:30',
        locationName: 'Madhyanchal Puja Grounds',
      },
    ],
    ...overrides,
  });
}
