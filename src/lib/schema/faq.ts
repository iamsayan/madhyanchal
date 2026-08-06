import type { Question as SchemaQuestion } from 'schema-dts';
import { SITE_URL } from './constants';
import type { FAQItem, FAQPageSchema } from './types';

export interface FAQPageOptions {
  items: FAQItem[];
  id?: string;
  url?: string;
}

/**
 * Reusable FAQPage Schema Builder (powered by schema-dts)
 * Input: Array of FAQ items ({ question, answer })
 * Return: Schema.org FAQPage
 */
export function faqSchema(
  itemsOrOptions: FAQItem[] | FAQPageOptions,
  optionalUrl?: string
): FAQPageSchema {
  const items = Array.isArray(itemsOrOptions)
    ? itemsOrOptions
    : itemsOrOptions.items;

  const url = Array.isArray(itemsOrOptions)
    ? optionalUrl || SITE_URL
    : itemsOrOptions.url || optionalUrl || SITE_URL;

  const fullUrl = url.startsWith('http')
    ? url
    : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

  const faqId =
    !Array.isArray(itemsOrOptions) && itemsOrOptions.id
      ? itemsOrOptions.id
      : `${fullUrl}#faq`;

  const questionElements: SchemaQuestion[] = items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': faqId,
    mainEntity: questionElements,
  };
}

/**
 * Default Jagadhatri Puja FAQ Preset
 */
export function jagadhatriFaqSchema(url = '/'): FAQPageSchema {
  return faqSchema({
    id: `${SITE_URL}/#jagadhatri-faq`,
    url,
    items: [
      {
        question:
          'Where is Madhyanchal Sarbajanin Jagadhatri Puja celebrated?',
        answer:
          'Madhyanchal Sarbajanin Jagadhatri Puja is celebrated at Station Road, Chandannagar, Hooghly, West Bengal 712136 (just 800m from Chandannagar Railway Station).',
      },
      {
        question: 'When was Madhyanchal Sarbajanin established?',
        answer:
          'Madhyanchal Sarbajanin Jagadhatri Puja Samity was established in 1971 and has been celebrating over 55+ years of cultural heritage.',
      },
      {
        question:
          'What are the main attractions of Jagadhatri Puja at Madhyanchal Chandannagar?',
        answer:
          'Highlights include traditional idol craftsmanship, world-famous Chandannagar LED light gate showcases, Maha Nabami 108 lotus Anjali, and the grand immersion procession.',
      },
      {
        question: 'Is entry free for visitors during Jagadhatri Puja?',
        answer:
          'Yes! Pandal entry, Pushpanjali participation, and viewing the procession lightings are 100% free for all visitors.',
      },
    ],
  });
}

/**
 * Default Durga Puja FAQ Preset
 */
export function durgaFaqSchema(url = '/durgapuja'): FAQPageSchema {
  return faqSchema({
    id: `${SITE_URL}/durgapuja#faq`,
    url,
    items: [
      {
        question: 'Where is Madhyanchal Durga Puja located?',
        answer:
          'Madhyanchal Durga Puja is celebrated at Station Road, Chandannagar, Hooghly, West Bengal 712136.',
      },
      {
        question: 'Is there an entry fee to visit Madhyanchal Durga Puja?',
        answer:
          'No, entry to the puja pandal, Pushpanjali, and cultural events is completely free for everyone.',
      },
      {
        question:
          'What are the main attractions of Durga Puja at Madhyanchal?',
        answer:
          'Key attractions include traditional Vedic rituals, 108 lotus Sandhi Puja, Youth Sit & Draw Competition, illuminated pandal artwork, and community bhog.',
      },
      {
        question: 'How can children register for the Drawing Competition?',
        answer:
          'Parents can register their children online via the Drawing Contest portal under the Durga Puja section or at the club office.',
      },
    ],
  });
}
