import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Madhyanchal Sarbajanin',
    short_name: 'Madhyanchal',
    description:
      'Official Portal for Madhyanchal Sarbajanin, Station Road, Chandannagar.',
    id: '/?utm_source=pwa',
    start_url: '/?utm_source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#1c1917',
    theme_color: '#1c1917',
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
      {
        src: '/icons/icon-192x192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Durga Puja',
        short_name: 'Durga Puja',
        description: 'Durga Puja Celebrations',
        url: '/durgapuja/?utm_source=pwa',
        icons: [{ src: '/circle-logo.png', sizes: '192x192' }],
      },
      {
        name: 'Puja Schedule',
        short_name: 'Schedule',
        description: 'Check live rituals, Anjali timings and festival dates',
        url: '/schedule/?utm_source=pwa',
        icons: [{ src: '/circle-logo.png', sizes: '192x192' }],
      },
      {
        name: 'Photo Gallery',
        short_name: 'Gallery',
        description:
          'Explore pandal art and nocturnal lighting tableau archives',
        url: '/gallery/?utm_source=pwa',
        icons: [{ src: '/circle-logo.png', sizes: '192x192' }],
      },
      // {
      //   name: 'Drawing Competition',
      //   short_name: 'Contest',
      //   description:
      //     'View drawing competition directory and participants',
      //   url: '/durgapuja/drawing-competition',
      //   icons: [{ src: '/circle-logo.png', sizes: '192x192' }],
      // },
    ],
  };
}
