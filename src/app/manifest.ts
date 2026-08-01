import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Madhyanchal Sarbajanin',
    short_name: 'Madhyanchal',
    description:
      'Official Portal for Madhyanchal Sarbajanin, Station Road, Chandannagar.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#f59e0b',
    theme_color: '#f59e0b',
    categories: ['events', 'lifestyle', 'culture', 'entertainment'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Puja Schedule',
        short_name: 'Schedule',
        description: 'Check live rituals, Anjali timings and festival dates',
        url: '/schedule',
        icons: [{ src: '/circle-logo.png', sizes: '192x192' }],
      },
      {
        name: 'Photo Gallery',
        short_name: 'Gallery',
        description:
          'Explore pandal art and nocturnal lighting tableau archives',
        url: '/gallery',
        icons: [{ src: '/circle-logo.png', sizes: '192x192' }],
      },
      // {
      //   name: 'Drawing Competition',
      //   short_name: 'Contest',
      //   description:
      //     'View youth drawing competition directory and participants',
      //   url: '/durgapuja/drawing-competition',
      //   icons: [{ src: '/circle-logo.png', sizes: '192x192' }],
      // },
    ],
  };
}
