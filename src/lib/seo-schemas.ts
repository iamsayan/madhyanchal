/**
 * Enterprise SEO & Schema.org JSON-LD Builders for Madhyanchal Sarbajanin
 * Optimized for Next.js 16 App Router, Google Search Rich Snippets, and Social Crawlers.
 * Covers both Jagadhatri Puja (Main Festival) & Durga Puja (Autumn Entry Point).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const ORGANIZATION_SCHEMA = {
  '@type': 'NGO',
  '@id': `${SITE_URL}/#organization`,
  name: 'Madhyanchal Sarbajanin',
  alternateName: [
    'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
    'Madhyanchal Sarbajanin Durga Puja',
    'Madhyanchal Sporting Club',
  ],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    caption: 'Madhyanchal Sarbajanin Logo',
  },
  image: `${SITE_URL}/logo.png`,
  foundingDate: '1971',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Station Road',
    addressLocality: 'Chandannagar',
    addressRegion: 'West Bengal',
    postalCode: '712136',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.8687,
    longitude: 88.3662,
  },
  hasMap: 'https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9',
  sameAs: [
    'https://maps.app.goo.gl/xY6cx8Arcy6ayLYq9',
    'https://www.facebook.com/msjpsofficial',
  ],
};

/**
 * Generate standard BreadcrumbList schema
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Main Homepage & Jagadhatri Puja Entry Schema (/)
 */
export function getJagadhatriPujaEntrySchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Madhyanchal Sarbajanin',
        alternateName: 'Madhyanchal Sarbajanin Chandannagar',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      getBreadcrumbSchema([{ name: 'Home', url: '/' }]),
      {
        '@type': 'Festival',
        '@id': `${SITE_URL}/#jagadhatri-festival`,
        name: 'Madhyanchal Sarbajanin Jagadhatri Puja 2026',
        alternateName: 'Madhyanchal Jagadhatri Puja Chandannagar',
        description:
          'Celebrating 55+ years of tradition, unity, and grandeur! Experience world-renowned Jagadhatri Puja in Chandannagar at Madhyanchal Sarbajanin — traditional worship, 108 lotus Nabami Pushpanjali, iconic Chandannagar illumination, and grand immersion procession.',
        url: SITE_URL,
        startDate: '2026-11-16T06:00:00+05:30',
        endDate: '2026-11-20T23:59:00+05:30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        image: [`${SITE_URL}/logo.png`, `${SITE_URL}/letter-head-msjps.jpg`],
        location: {
          '@type': 'Place',
          name: 'Madhyanchal Jagadhatri Puja Ground',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Station Road',
            addressLocality: 'Chandannagar',
            addressRegion: 'West Bengal',
            postalCode: '712136',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 22.8687,
            longitude: 88.3662,
          },
        },
        organizer: {
          '@id': `${SITE_URL}/#organization`,
        },
        subEvent: [
          {
            '@type': 'Event',
            name: 'Saptami Puja & Bodhon',
            startDate: '2026-11-16T07:00:00+05:30',
            endDate: '2026-11-16T22:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: { '@type': 'Place', name: 'Madhyanchal Puja Ground' },
          },
          {
            '@type': 'Event',
            name: 'Maha Ashtami Anjali & Puja',
            startDate: '2026-11-17T07:30:00+05:30',
            endDate: '2026-11-17T22:30:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: { '@type': 'Place', name: 'Madhyanchal Puja Ground' },
          },
          {
            '@type': 'Event',
            name: 'Maha Nabami Puja & 108 Lotus Anjali',
            startDate: '2026-11-18T08:00:00+05:30',
            endDate: '2026-11-18T23:30:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: { '@type': 'Place', name: 'Madhyanchal Puja Ground' },
          },
          {
            '@type': 'Event',
            name: 'Vijayadashami & World Famous Shobhajatra Procession',
            startDate: '2026-11-19T10:00:00+05:30',
            endDate: '2026-11-20T04:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: {
              '@type': 'Place',
              name: 'Chandannagar Procession Route & Strand Road',
            },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#jagadhatri-faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where is Madhyanchal Sarbajanin Jagadhatri Puja celebrated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Madhyanchal Sarbajanin Jagadhatri Puja is celebrated at Station Road, Chandannagar, Hooghly, West Bengal 712136 (just 800m from Chandannagar Railway Station).',
            },
          },
          {
            '@type': 'Question',
            name: 'When was Madhyanchal Sarbajanin established?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity was established in 1971 and has been celebrating over 55+ years of cultural heritage.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the main attractions of Jagadhatri Puja at Madhyanchal Chandannagar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Highlights include traditional idol craftsmanship, world-famous Chandannagar LED light gate showcases, Maha Nabami 108 lotus Anjali, and the grand immersion procession.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is entry free for visitors during Jagadhatri Puja?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Pandal entry, Pushpanjali participation, and viewing the procession lightings are 100% free for all visitors.',
            },
          },
        ],
      },
    ],
  };
}

/**
 * Main Durga Puja Entry Point Schema (/durgapuja)
 */
export function getDurgaPujaEntrySchema() {
  const durgaPujaUrl = `${SITE_URL}/durgapuja`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Durga Puja Entry Point', url: '/durgapuja' },
      ]),
      {
        '@type': 'Festival',
        '@id': `${durgaPujaUrl}/#festival`,
        name: 'Madhyanchal Sarbajanin Durga Puja 2026',
        alternateName: 'Madhyanchal Durga Puja Celebrations',
        description:
          'Join the grand Durga Puja celebrations at Madhyanchal Sarbajanin in Chandannagar — traditional rituals, Pushpanjali, 108 lotus Sandhi Puja, Youth Drawing Contest, and community feasts.',
        url: durgaPujaUrl,
        startDate: '2026-10-16T06:00:00+05:30',
        endDate: '2026-10-20T22:00:00+05:30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        image: [`${SITE_URL}/logo.png`, `${SITE_URL}/letter-head-msdps.jpg`],
        location: {
          '@type': 'Place',
          name: 'Madhyanchal Puja Grounds',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Station Road',
            addressLocality: 'Chandannagar',
            addressRegion: 'West Bengal',
            postalCode: '712136',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 22.8687,
            longitude: 88.3662,
          },
        },
        organizer: {
          '@id': `${SITE_URL}/#organization`,
        },
        subEvent: [
          {
            '@type': 'Event',
            name: 'Maha Sasthi - Bodhon & Adhibas',
            startDate: '2026-10-16T07:30:00+05:30',
            endDate: '2026-10-16T21:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: { '@type': 'Place', name: 'Madhyanchal Puja Grounds' },
          },
          {
            '@type': 'Event',
            name: 'Maha Saptami - Nabapatrika Prabesh',
            startDate: '2026-10-17T06:00:00+05:30',
            endDate: '2026-10-17T22:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: { '@type': 'Place', name: 'Madhyanchal Puja Grounds' },
          },
          {
            '@type': 'Event',
            name: 'Maha Ashtami - Pushpanjali & 108 Lotus Sandhi Puja',
            startDate: '2026-10-18T08:00:00+05:30',
            endDate: '2026-10-18T22:30:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: { '@type': 'Place', name: 'Madhyanchal Puja Grounds' },
          },
          {
            '@type': 'Event',
            name: 'Maha Nabami - Maha Aarti & Bhog Distribution',
            startDate: '2026-10-19T09:00:00+05:30',
            endDate: '2026-10-19T23:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: { '@type': 'Place', name: 'Madhyanchal Puja Grounds' },
          },
          {
            '@type': 'Event',
            name: 'Vijayadashami - Aparajita Puja & Immersion Procession',
            startDate: '2026-10-20T10:00:00+05:30',
            endDate: '2026-10-20T22:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode:
              'https://schema.org/OfflineEventAttendanceMode',
            isAccessibleForFree: true,
            location: { '@type': 'Place', name: 'Madhyanchal Puja Grounds' },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${durgaPujaUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where is Madhyanchal Durga Puja located?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Madhyanchal Durga Puja is celebrated at Station Road, Chandannagar, Hooghly, West Bengal 712136.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there an entry fee to visit Madhyanchal Durga Puja?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, entry to the puja pandal, Pushpanjali, and cultural events is completely free for everyone.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the main attractions of Durga Puja at Madhyanchal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Key attractions include traditional Vedic rituals, 108 lotus Sandhi Puja, Youth Sit & Draw Competition, illuminated pandal artwork, and community bhog.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can children register for the Drawing Competition?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Parents can register their children online via the Drawing Contest portal under the Durga Puja section or at the club office.',
            },
          },
        ],
      },
    ],
  };
}

/**
 * Puja History Schema (/puja-history)
 */
export function getPujaHistorySchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Puja History', url: '/puja-history' },
      ]),
      {
        '@type': 'Article',
        headline: 'Heritage & History of Madhyanchal Sarbajanin Since 1971',
        description:
          'Trace 55+ years of glorious heritage of Madhyanchal Sarbajanin in Chandannagar — from humble beginnings in 1971 to world-class Jagadhatri & Durga Puja celebrations.',
        url: `${SITE_URL}/puja-history`,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}

/**
 * Main Schedule Schema (/schedule)
 */
export function getJagadhatriScheduleSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Schedule', url: '/schedule' },
      ]),
      {
        '@type': 'Schedule',
        name: 'Jagadhatri Puja 2026 Ritual & Cultural Program Timings',
        url: `${SITE_URL}/schedule`,
        description:
          'Official schedule for Jagadhatri Puja rituals, Pushpanjali, Bhog, and evening cultural galas.',
      },
    ],
  };
}

/**
 * Durga Puja Schedule Entry Schema (/durgapuja/schedule)
 */
export function getDurgaPujaScheduleSchema() {
  const scheduleUrl = `${SITE_URL}/durgapuja/schedule`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Durga Puja', url: '/durgapuja' },
        { name: 'Festival Schedule', url: '/durgapuja/schedule' },
      ]),
      {
        '@type': 'Schedule',
        name: 'Durga Puja 2026 5-Day Ritual Timings',
        url: scheduleUrl,
        description:
          'Official 5-day Puja ritual schedule including Pushpanjali, Sandhi Puja, Bhog distribution, and Aarti timings.',
      },
    ],
  };
}

/**
 * Drawing Competition Schema (/durgapuja/drawing-competition)
 */
export function getDrawingCompetitionSchema() {
  const contestUrl = `${SITE_URL}/durgapuja/drawing-competition`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Durga Puja', url: '/durgapuja' },
        {
          name: 'Drawing Competition',
          url: '/durgapuja/drawing-competition',
        },
      ]),
      {
        '@type': 'Event',
        name: 'Madhyanchal Annual Drawing Competition 2026',
        description:
          'Sit & Draw art contest for kids & youth during Durga Puja across 3 age categories with certificates and trophies.',
        startDate: '2026-10-18T10:00:00+05:30',
        endDate: '2026-10-18T13:00:00+05:30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        location: {
          '@type': 'Place',
          name: 'Madhyanchal Community Hall',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Station Road',
            addressLocality: 'Chandannagar',
            postalCode: '712136',
          },
        },
      },
    ],
  };
}

/**
 * Contact Page Schema (/contact-us)
 */
export function getContactSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Contact Us', url: '/contact-us' },
      ]),
      {
        '@type': 'ContactPage',
        name: 'Contact Madhyanchal Sarbajanin',
        url: `${SITE_URL}/contact-us`,
        description:
          'Get in touch with Madhyanchal Sarbajanin committee for membership, puja enquiry, or advertisement.',
      },
    ],
  };
}

/**
 * Gallery Schema (/gallery)
 */
export function getGallerySchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Gallery', url: '/gallery' },
      ]),
      {
        '@type': 'ImageGallery',
        name: 'Madhyanchal Sarbajanin Jagadhatri & Durga Puja Photo Gallery',
        url: `${SITE_URL}/gallery`,
        description:
          'Browse HD photo gallery of pandal decorations, lighting displays, idol artistry, and cultural events.',
      },
    ],
  };
}
