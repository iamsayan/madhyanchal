import type { ImageObject as SchemaImageObject } from 'schema-dts';
import { ORGANIZATION_ID, SITE_URL } from './constants';
import type { ImageGalleryOptions, ImageGallerySchema } from './types';

/**
 * Reusable ImageGallery Schema Builder (powered by schema-dts)
 * Support: title, description, url, images
 */
export function imageGallerySchema(
  options: ImageGalleryOptions
): ImageGallerySchema {
  const fullUrl = options.url.startsWith('http')
    ? options.url
    : `${SITE_URL}${options.url.startsWith('/') ? '' : '/'}${options.url}`;

  const imageObjects: SchemaImageObject[] = options.images.map(
    (img, index) => {
      if (typeof img === 'string') {
        const absoluteImgUrl = img.startsWith('http')
          ? img
          : `${SITE_URL}${img.startsWith('/') ? '' : '/'}${img}`;
        return {
          '@type': 'ImageObject',
          url: absoluteImgUrl,
          caption: `${options.title} - Photo ${index + 1}`,
        };
      }
      const absoluteImgUrl = img.url.startsWith('http')
        ? img.url
        : `${SITE_URL}${img.url.startsWith('/') ? '' : '/'}${img.url}`;
      return {
        '@type': 'ImageObject',
        url: absoluteImgUrl,
        caption: img.caption || img.name || `${options.title} - Photo ${index + 1}`,
      };
    }
  );

  const stringImageUrls = imageObjects.map((obj) => obj.url as string);

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${fullUrl}#gallery`,
    name: options.title,
    description: options.description,
    url: fullUrl,
    image: stringImageUrls,
    mainEntity: imageObjects,
    publisher: {
      '@id': ORGANIZATION_ID,
    },
  };
}
