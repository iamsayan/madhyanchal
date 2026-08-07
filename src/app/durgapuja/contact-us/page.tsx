import type { Metadata } from 'next';
import ContactUsPage from '@/app/(jagadhatri)/contact-us/page';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Contact Us',
  description:
    'Reach out to our Durga Puja committee desk for festival queries, sponsorships, sit and draw competition, and media inquiries.',
  canonical: '/durgapuja/contact-us',
});

export default function DurgaPujaContactUsPage() {
  return <ContactUsPage isDurgaPuja={true} />;
}
