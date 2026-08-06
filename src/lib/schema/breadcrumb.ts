import { SITE_URL } from './constants';
import type { BreadcrumbItemInput, BreadcrumbListSchema } from './types';

/**
 * Reusable BreadcrumbList Schema Builder (powered by schema-dts)
 * Input: Array of { name, url }
 * Output: Schema.org BreadcrumbList
 */
export function breadcrumbSchema(
  items: BreadcrumbItemInput[]
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const absoluteUrl = item.url.startsWith('http')
        ? item.url
        : `${SITE_URL}${item.url.startsWith('/') ? '' : '/'}${item.url}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl,
      };
    }),
  };
}
