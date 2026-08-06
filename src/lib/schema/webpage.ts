import { breadcrumbSchema } from './breadcrumb';
import {
  DEFAULT_LANGUAGE,
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
} from './constants';
import type { WebPageOptions, WebPageSchema } from './types';

/**
 * Reusable WebPage Schema Builder (powered by schema-dts)
 * Automatically references WebSite (@id) and Organization (@id)
 */
export function webpageSchema(options: WebPageOptions): WebPageSchema {
  const fullUrl = options.url.startsWith('http')
    ? options.url
    : `${SITE_URL}${options.url.startsWith('/') ? '' : '/'}${options.url}`;

  const pageId = `${fullUrl}#webpage`;

  let breadcrumbProp = undefined;
  if (options.breadcrumb) {
    if (Array.isArray(options.breadcrumb)) {
      breadcrumbProp = breadcrumbSchema(options.breadcrumb);
    } else {
      breadcrumbProp = options.breadcrumb;
    }
  }

  const pageType = options.type || 'WebPage';

  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': pageId,
    url: fullUrl,
    name: options.title,
    description: options.description,
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    inLanguage: DEFAULT_LANGUAGE,
    ...(options.image && { image: options.image }),
    ...(breadcrumbProp && { breadcrumb: breadcrumbProp }),
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
  };
}
