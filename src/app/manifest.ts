import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Madhyanchal Sarbajanin Jagadhatri Puja',
    short_name: 'Madhyanchal',
    description:
      'Golden Jubilee Edition — Official Portal for Madhyanchal Sarbajanin Jagadhatri Puja Samity, Station Road, Chandannagar.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#78350f',
    theme_color: '#78350f',
    categories: ['events', 'lifestyle', 'culture', 'entertainment'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/circle-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/circle-logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.png',
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
      {
        name: 'Drawing Competition',
        short_name: 'Contest',
        description:
          'View youth drawing competition directory and participants',
        url: '/durgapuja/drawing-competition',
        icons: [{ src: '/circle-logo.png', sizes: '192x192' }],
      },
    ],
  };
}
