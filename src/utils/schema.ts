import { toISOWithOffset } from '@/lib/utils';

interface Parent {
  title: string;
  slug: string;
}

interface SchemaOptions {
  path: string;
  title: string;
  description?: string;
  image?: string;
  parents?: Parent[];
  dates?: {
    published?: string;
    modified?: string;
  };
  type?: {
    collection?: boolean;
  };
}

interface SchemaItem {
  '@type': string;
  '@id': string;
  [key: string]: unknown;
}

interface BreadcrumbItem {
  '@type': 'ListItem';
  position: string;
  item: {
    '@id': string;
    name: string;
  };
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

function generateBreadcrumbs(
  path: string,
  title: string,
  parents?: Parent[]
): Array<BreadcrumbItem> {
  const homeBreadcrumb = {
    '@type': 'ListItem' as const,
    position: '1',
    item: {
      '@id': baseUrl,
      '@type': 'Thing',
      name: 'Home',
    },
  };

  const parentsBreadcrumbs =
    parents?.map((parent, index) => {
      return {
        '@type': 'ListItem' as const,
        position: String(index + 2),
        item: {
          '@id': `${baseUrl}/${parents
            .slice(0, index + 1)
            .map((p) => p.slug)
            .join('/')}`,
          '@type': 'Thing',
          name: parent.title,
        },
      };
    }) || [];

  const currentBreadcrumb = {
    '@type': 'ListItem' as const,
    position: String(parentsBreadcrumbs.length + 2),
    item: {
      '@id': `${baseUrl}/${path}`,
      '@type': 'Thing',
      name: title,
    },
  };

  return [homeBreadcrumb, ...parentsBreadcrumbs, currentBreadcrumb];
}

export default function schema({
  path,
  title,
  description,
  image,
  parents,
  type,
  dates,
}: SchemaOptions) {
  const curYear = new Date().getFullYear();
  const siteSchema: { '@context': string; '@graph': SchemaItem[] } = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Madhyanchal Sarbajanin',
        url: baseUrl,
        logo: `${baseUrl}/circle-logo.png`,
        email: 'madhyanchalsarbajanin@gmail.com',
        sameAs: [
          'https://www.facebook.com/madhyanchalsarbajanin/',
          'https://www.instagram.com/madhyanchal_sarbajanin',
          'https://www.youtube.com/@madhyanchalsarbajanin?sub_confirmation=1',
          'https://www.threads.com/@madhyanchal_sarbajanin',
          'https://x.com/msjpsofficial',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Madhyanchal Sarbajanin',
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/${path}/#breadcrumb`,
        name: `Navigate to ${title}`,
        itemListElement: generateBreadcrumbs(path, title, parents),
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/${path}/#webpage`,
        url: `${baseUrl}/${path}`,
        name: `${title} - Madhyanchal Sarbajanin | ${curYear - 1971 + 1} Years of Tradition, Unity, and Celebration since 1971!`,
        ...(description && { description }),
        ...(image && {
          primaryImageOfPage: { '@type': 'ImageObject', url: image },
        }),
        datePublished: dates?.published ?? '2018-02-03T00:00:00+05:30',
        dateModified:
          dates?.modified ?? toISOWithOffset(new Date(performance.timeOrigin)),
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        inLanguage: 'en-IN',
        breadcrumb: {
          '@id': `${baseUrl}/${path}/#breadcrumb`,
        },
      },
    ],
  };

  if (type?.collection) {
    siteSchema['@graph'].push({
      '@type': 'CollectionPage',
      '@id': `${baseUrl}/${path}/#webpage`,
      url: `${baseUrl}/${path}`,
      name: title,
      isPartOf: {
        '@id': `${baseUrl}/#website`,
      },
      inLanguage: 'en-IN',
      breadcrumb: {
        '@id': `${baseUrl}/${path}/#breadcrumb`,
      },
    });
  }

  return siteSchema;
}
