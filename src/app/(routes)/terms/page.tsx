import * as React from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { Section } from '@/components/shared/section';
import { BorderBeam } from '@/components/ui/border-beam';

import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Gavel,
  Globe2,
  HelpCircle,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Madhyanchal Sarbajanin Chandannagar',
  description:
    'Explore the terms and conditions for Madhyanchal Sarbajanin Jagadhatri Puja Samity. Understand our website policies, user guidelines, and event rules to ensure a seamless experience.',
  keywords: [
    'madhyanchal terms conditions',
    'madhyanchal sarbajanin terms',
    'jagadhatri puja terms and conditions',
    'chandannagar puja rules',
  ],
  openGraph: {
    title: 'Terms & Conditions | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Official terms and conditions for using the Madhyanchal Sarbajanin Jagadhatri Puja Samity website, digital services, and event participation.',
    url: '/terms',
    type: 'website',
  },
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  const termsSections = [
    {
      id: 'acceptance',
      num: '01',
      title: '1. Acceptance of Terms',
      icon: CheckCircle2,
      content:
        'By accessing or using this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using our digital platform and services.',
    },
    {
      id: 'content',
      num: '02',
      title: '2. Website Content & Ownership',
      icon: FileText,
      content:
        'All content featured on this platform—including but not limited to photography archives, digital designs, festival schedules, committee publications, lighting tableau media, logos, and written text—is the exclusive property of Madhyanchal Sarbajanin Jagadhatri Puja Samity. Unauthorized reproduction, distribution, scraping, or commercial exploitation is strictly prohibited without prior written consent.',
    },
    {
      id: 'usage',
      num: '03',
      title: '3. Permissible Use of Website',
      icon: Globe2,
      content:
        'You agree to use this website solely for lawful, community-focused, and non-commercial informational purposes. You must not engage in any activity that could disable, overburden, damage, or compromise the security and availability of our web server infrastructure or databases.',
    },
    {
      id: 'events',
      num: '04',
      title: '4. Event & Competition Participation',
      icon: Calendar,
      content:
        'Participation in cultural contests, drawing competitions, Pushpanjali rituals, or immersion processions organized by Madhyanchal Sarbajanin is subject to respective event guidelines and safety regulations. The Samity reserves the right to alter, reschedule, or adjust event timings due to weather, administrative orders, or safety requirements without prior notice.',
    },
    {
      id: 'external-links',
      num: '05',
      title: '5. Third-Party Links & External Services',
      icon: ExternalLink,
      content:
        'Our portal may contain links to external third-party platforms (such as payment gateways, YouTube video streams, or Google Maps). We do not control or accept responsibility for the content, privacy practices, or accuracy of third-party websites. Accessing external links is at your own discretion.',
    },
    {
      id: 'sponsorships',
      num: '06',
      title: '6. Sponsorships & Advertisements',
      icon: Megaphone,
      content:
        'Sponsorship and souvenir advertisement slots are allocated based on availability and committee approval. All promotional artwork and souvenir banners must adhere to community standards, ethical guidelines, and statutory advertising laws in India.',
    },
    {
      id: 'disclaimer',
      num: '07',
      title: '7. Liability & Technical Disclaimer',
      icon: AlertTriangle,
      content:
        'While we endeavor to keep festival information, schedules, and live updates precise, Madhyanchal Sarbajanin Jagadhatri Puja Samity provides website content on an "as is" basis without warranties of any kind. We shall not be held liable for any indirect or incidental damages resulting from site downtime or external network failures.',
    },
    {
      id: 'privacy',
      num: '08',
      title: '8. Privacy & Data Protection',
      icon: Lock,
      content: (
        <span>
          Your privacy is paramount to us. Please read our comprehensive{' '}
          <Link
            href="/privacy-policy"
            className="font-bold text-amber-600 underline underline-offset-4 hover:text-amber-500 dark:text-amber-400"
          >
            Privacy Policy
          </Link>{' '}
          to understand how we collect, handle, and protect your personal
          information, membership dues data, and registration records.
        </span>
      ),
    },
    {
      id: 'intellectual-property',
      num: '09',
      title: '9. Intellectual Property Rights',
      icon: Award,
      content:
        'The trademarks, service marks, emblem, Golden Jubilee branding, and official titles of Madhyanchal Sarbajanin Jagadhatri Puja Samity are protected under Indian intellectual property laws. Unauthorized usage in external media or commercial banners is forbidden.',
    },
    {
      id: 'governing-law',
      num: '10',
      title: '10. Governing Law & Jurisdiction',
      icon: Gavel,
      content:
        'These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute or proceeding arising in connection with this website shall fall under the exclusive jurisdiction of the competent courts in Chandannagar, Hooghly District, West Bengal.',
    },
    {
      id: 'changes',
      num: '11',
      title: '11. Periodic Modifications to Terms',
      icon: RefreshCw,
      content:
        'The Samity reserves the right to amend, update, or revise these Terms and Conditions at any time to align with legal regulations or organizational policy updates. Continued use of the website following any posted modifications constitutes acceptance of those changes.',
    },
  ];

  return (
    <PageLayout
      title="Terms & Conditions"
      subtitle="Guidelines and statutory terms governing website access, digital services, and event participation for Madhyanchal Sarbajanin Jagadhatri Puja Samity."
      badge={{
        text: 'OFFICIAL GOVERNANCE & POLICIES',
        icon: ShieldCheck,
      }}
      breadcrumbCurrent="Terms & Conditions"
    >
      {/* TERMS CLAUSES GRID */}
      <Section className="p-0!">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {termsSections.map((item, index) => {
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

                  <div className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                    {item.content}
                  </div>
                </div>
              </AnimatedWrapper>
            );
          })}

          {/* 12. OFFICIAL CONTACT CLAUSE CARD (Full Width on Desktop) */}
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
                        12. Committee Contact Information
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                      For any questions, legal notices, or policy clarifications
                      regarding these Terms & Conditions, please contact the
                      Committee Desk:
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
                          Email Us
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
                          Helpline Desk
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
