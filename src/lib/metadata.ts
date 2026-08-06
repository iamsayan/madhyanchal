import type { Metadata } from 'next';

const SITE_NAME = 'Madhyanchal Sarbajanin';
const TWITTER_HANDLE = '@msjpsofficial';

const sharedOpenGraph = {
  type: 'website' as const,
  locale: 'en_IN',
  siteName: SITE_NAME,
};

const sharedTwitter = {
  card: 'summary_large_image' as const,
  site: TWITTER_HANDLE,
  creator: TWITTER_HANDLE,
};

interface MetadataOptions {
  title: string;
  description: string;
  canonical: string;
  image?: string;
}

export function createMetadata({
  title,
  description,
  canonical,
  image,
}: MetadataOptions): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      ...sharedOpenGraph,
      title: fullTitle,
      description,
      url: canonical,
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      ...sharedTwitter,
      title: fullTitle,
      description,
      ...(image && {
        images: [image],
      }),
    },
  };
}
