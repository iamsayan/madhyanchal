import { ORGANIZATION_ID, SITE_URL } from './constants';
import type { ArticleOptions, ArticleSchema } from './types';

/**
 * Reusable Article / NewsArticle Schema Builder (powered by schema-dts)
 * For blog posts, notices, and news articles
 * References Organization (@id) as publisher
 */
export function articleSchema(options: ArticleOptions): ArticleSchema {
  const fullUrl = options.url.startsWith('http')
    ? options.url
    : `${SITE_URL}${options.url.startsWith('/') ? '' : '/'}${options.url}`;

  const articleId = `${fullUrl}#article`;
  const type = options.type || 'NewsArticle';

  const author = options.author || { '@id': ORGANIZATION_ID };

  const datePublished = options.datePublished;
  const dateModified = options.dateModified || datePublished;

  let images: string | string[] | undefined = undefined;
  if (options.image) {
    if (Array.isArray(options.image)) {
      images = options.image.map((img) =>
        img.startsWith('http') ? img : `${SITE_URL}${img.startsWith('/') ? '' : '/'}${img}`
      );
    } else {
      images = options.image.startsWith('http')
        ? options.image
        : `${SITE_URL}${options.image.startsWith('/') ? '' : '/'}${options.image}`;
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': articleId,
    headline: options.headline,
    description: options.description,
    url: fullUrl,
    ...(images && { image: images }),
    author,
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@id': fullUrl,
    },
  };
}
