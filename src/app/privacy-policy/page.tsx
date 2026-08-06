import type { Metadata, Viewport } from 'next';

import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { Section } from '@/components/shared/section';
import { BorderBeam } from '@/components/ui/border-beam';

import {
  Baby,
  Cookie,
  Cpu,
  Database,
  ExternalLink,
  HelpCircle,
  Key,
  Lock,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Share2,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Explore the privacy policy of Madhyanchal Sarbajanin. Learn how we collect, protect, and safeguard your personal information and ensure data transparency.',
  keywords: [
    'madhyanchal privacy policy',
    'madhyanchal sarbajanin privacy',
    'jagadhatri puja data protection',
    'chandannagar privacy statement',
  ],
  openGraph: {
    title: 'Privacy Policy | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Detailed privacy policy outlining data collection, security measures, cookies, and user rights at Madhyanchal Sarbajanin.',
    url: '/privacy-policy',
    type: 'website',
  },
  alternates: {
    canonical: '/privacy-policy',
  },
};

export const viewport: Viewport = {
  themeColor: '#4a0e17',
};

export default function PrivacyPolicyPage() {
  const policySections = [
    {
      id: 'collection',
      num: '01',
      title: '1. Information We Collect',
      icon: Database,
      content:
        'We collect personal information such as your name, email address, phone number, residential address, and registration details when you fill out membership forms, enter drawing competitions, or contact our committee. Additionally, we automatically collect non-personal browser data (IP address, device type, pages visited) to optimize our web platform and user experience.',
    },
    {
      id: 'usage',
      num: '02',
      title: '2. How We Use Your Information',
      icon: Cpu,
      content:
        'Your personal information is used exclusively to facilitate festival registrations, process digital membership dues receipt status, respond to inquiries, send official festival announcements, and coordinate community welfare programs. Non-personal analytics data helps us diagnose server performance and improve site responsiveness.',
    },
    {
      id: 'sharing',
      num: '03',
      title: '3. Data Sharing & Third Parties',
      icon: Share2,
      content:
        'We respect your privacy and do not sell, trade, or rent your personal data to third parties. We may share essential data only with trusted technology partners (such as secure payment gateway processors or cloud hosting infrastructure) who agree to maintain strict confidentiality. Data may also be disclosed if mandated by Indian legal authorities.',
    },
    {
      id: 'cookies',
      num: '04',
      title: '4. Cookies & Analytics Tracking',
      icon: Cookie,
      content:
        'Our portal uses browser cookies and local storage tokens to store user preferences (such as dark mode selection and saved membership cards). Cookies help deliver personalized browsing. You can disable or modify cookie permissions in your browser settings, though certain interactive features may function with reduced performance.',
    },
    {
      id: 'security',
      num: '05',
      title: '5. Data Security Measures',
      icon: Lock,
      content:
        'We implement industry-standard encryption, SSL transport security, and restricted database access controls to safeguard your data against unauthorized access, alteration, or exposure. While we take rigorous measures, no electronic transmission over the Internet can be guaranteed 100% immune to external security risks.',
    },
    {
      id: 'third-party-links',
      num: '06',
      title: '6. Third-Party Websites & Services',
      icon: ExternalLink,
      content:
        'Our website may contain hyperlinks to external sites (such as Google Maps, social channels, or payment portals). We are not responsible for the privacy practices, content, or policies of third-party platforms. We encourage you to inspect their individual privacy statements before submitting personal data.',
    },
    {
      id: 'children',
      num: '07',
      title: '7. Children’s Privacy Protection',
      icon: Baby,
      content:
        'Our website is intended for general public access and community participation. For drawing competitions or child participant registrations, entries must be submitted with consent from a parent or legal guardian. We do not knowingly collect personal data directly from children under 13 without guardian supervision.',
    },
    {
      id: 'rights',
      num: '08',
      title: '8. Your Rights & Data Control',
      icon: Key,
      content:
        'You have the right to request access to, correction of, or deletion of your stored personal information or membership profile records. If you wish to update your details or revoke communication preferences, please reach out to our committee helpline.',
    },
    {
      id: 'updates',
      num: '09',
      title: '9. Periodic Policy Amendments',
      icon: RefreshCw,
      content:
        'We may update this Privacy Policy periodically to reflect technological enhancements, operational changes, or new statutory requirements in India. Revisions will be published on this page along with an updated effective date. We recommend checking back regularly.',
    },
  ];

  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="How Madhyanchal Sarbajanin handles, protects, and respects your personal information and digital data."
      badge={{
        text: 'DATA TRANSPARENCY & PROTECTION',
        icon: ShieldCheck,
      }}
      breadcrumbCurrent="Privacy Policy"
    >
      {/* POLICY CLAUSES GRID */}
      <Section className="p-0!">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {policySections.map((item, index) => {
            const Icon = item.icon;

            return (
              <AnimatedWrapper
                key={item.id}
                direction="up"
                delay={index * 0.05}
              >
                <div className="card-glass card-hover-glow relative h-full space-y-3 overflow-hidden rounded-2xl border border-slate-200/90 p-5 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-6 dark:border-white/12">
                  <BorderBeam
                    size={120}
                    duration={8}
                    colorFrom="#f59e0b"
                    colorTo="#fef08a"
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-paytone text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-black text-amber-500/70">
                      {item.num}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                    {item.content}
                  </p>
                </div>
              </AnimatedWrapper>
            );
          })}

          {/* 10. PRIVACY CONTACT CLAUSE CARD (Full Width on Desktop) */}
          <div className="md:col-span-2">
            <AnimatedWrapper direction="up" delay={0.3}>
              <div className="card-glass card-hover-glow relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-5 backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-7 dark:border-amber-500/30">
                <BorderBeam
                  size={180}
                  duration={6}
                  colorFrom="#f59e0b"
                  colorTo="#fef08a"
                />

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
                        <HelpCircle className="h-4 w-4" />
                      </span>
                      <h3 className="font-paytone text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                        10. Privacy Desk Contact Information
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                      If you have questions, data deletion requests, or privacy
                      concerns regarding this policy, please get in touch with
                      our team:
                    </p>
                  </div>

                  {/* Contact Info Badges */}
                  <div className="flex shrink-0 flex-col flex-wrap gap-3 sm:flex-row">
                    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/80 p-2.5 text-xs dark:border-white/10 dark:bg-stone-900/90">
                      <MapPin className="h-4 w-4 text-amber-500" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          Station Road
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Chandannagar, 712136
                        </p>
                      </div>
                    </div>

                    <a
                      href="mailto:jagatdhatri.madhyanchal@gmail.com"
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/80 p-2.5 text-xs transition-colors hover:border-amber-500/40 dark:border-white/10 dark:bg-stone-900/90"
                    >
                      <Mail className="h-4 w-4 text-amber-500" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          Email Privacy Desk
                        </p>
                        <p className="text-[11px] text-slate-500">
                          jagatdhatri.madhyanchal@gmail.com
                        </p>
                      </div>
                    </a>

                    <a
                      href="tel:+919831360465"
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/80 p-2.5 text-xs transition-colors hover:border-amber-500/40 dark:border-white/10 dark:bg-stone-900/90"
                    >
                      <Phone className="h-4 w-4 text-emerald-500" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          Committee Helpline
                        </p>
                        <p className="text-[11px] text-slate-500">
                          +91-9831360465
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
