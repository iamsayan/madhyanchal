import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { createMetadata } from '@/lib/metadata';
import {
  JsonLd,
  webpageSchema,
  breadcrumbSchema,
  faqSchema,
  jagadhatriFaqSchema,
  durgaFaqSchema,
} from '@/lib/schema';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Frequently Asked Questions (FAQ)',
    description:
      'Find answers to common questions about Madhyanchal Sarbajanin Jagadhatri Puja & Durga Puja in Chandannagar — timings, location, entry, Pushpanjali, and procession.',
    canonical: '/faq',
  }),
};

const faqs = [
  {
    question: 'Where is Madhyanchal Sarbajanin Jagadhatri Puja celebrated?',
    answer:
      'Madhyanchal Sarbajanin Jagadhatri Puja is celebrated at Station Road, Chandannagar, Hooghly, West Bengal 712136 (just 800 meters from Chandannagar Railway Station).',
  },
  {
    question: 'When was Madhyanchal Sarbajanin established?',
    answer:
      'Madhyanchal Sarbajanin Jagadhatri Puja Samity was established in 1971 and has been celebrating over 55+ years of cultural heritage and community unity.',
  },
  {
    question: 'What are the main attractions of Jagadhatri Puja at Madhyanchal Chandannagar?',
    answer:
      'Highlights include traditional idol craftsmanship, world-famous Chandannagar LED light gate showcases, Maha Nabami 108 lotus Anjali, and the grand immersion procession.',
  },
  {
    question: 'Is entry free for visitors during Jagadhatri Puja & Durga Puja?',
    answer:
      'Yes! Pandal entry, Pushpanjali participation, cultural events, and viewing the lightings are 100% free for all visitors.',
  },
  {
    question: 'How can I participate in Pushpanjali or Bhog distribution?',
    answer:
      'Pushpanjali is open to all devotees during the scheduled ritual timings on Saptami, Ashtami, and Nabami mornings. Dedicated volunteers manage smooth lines for all visitors.',
  },
  {
    question: 'How can children register for the Durga Puja Drawing Competition?',
    answer:
      'Parents can register their children online via the Drawing Contest portal under the Durga Puja section or directly at the club counter during festival dates.',
  },
];

export default function FAQPage() {
  const faqWebpage = webpageSchema({
    title: 'Frequently Asked Questions (FAQ) | Madhyanchal Sarbajanin',
    description:
      'Answers to common questions regarding location, schedule, rituals, entry, and events at Madhyanchal Sarbajanin.',
    url: '/faq',
    type: 'FAQPage',
  });

  const faqBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ]);

  const faqPageSchema = faqSchema({
    url: '/faq',
    items: faqs,
  });

  return (
    <PageLayout
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about visiting Madhyanchal Sarbajanin Jagadhatri & Durga Puja celebrations in Chandannagar."
      badge={{
        text: 'Help & Information Center',
        icon: HelpCircle,
      }}
      breadcrumbCurrent="FAQ"
    >
      <JsonLd data={[faqWebpage, faqBreadcrumb, faqPageSchema]} />

      <div className="mx-auto max-w-4xl py-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-amber-200/60 dark:border-stone-800 rounded-2xl bg-amber-50/40 dark:bg-stone-900/60 p-6 transition-all duration-300 [&[open]]:bg-amber-100/50 dark:[&[open]]:bg-stone-900"
            >
              <summary className="flex cursor-pointer items-center justify-between font-paytone text-lg text-slate-900 dark:text-amber-100 list-none">
                <span>{faq.question}</span>
                <ChevronDown className="h-5 w-5 text-amber-600 transition-transform duration-300 group-[open]:rotate-180 dark:text-amber-400" />
              </summary>
              <p className="mt-4 text-sm sm:text-base text-slate-700 dark:text-stone-300 leading-relaxed border-t border-amber-200/40 dark:border-stone-800 pt-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
