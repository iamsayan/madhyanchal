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
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      ...sharedOpenGraph,
      title: `${title} | ${SITE_NAME}`,
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
      title: `${title} | ${SITE_NAME}`,
      description,
      ...(image && {
        images: [image],
      }),
    },
  };
}
