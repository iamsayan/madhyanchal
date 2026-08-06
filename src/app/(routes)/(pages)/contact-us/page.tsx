import type { Metadata, Viewport } from 'next';
import { ContactForm } from '@/components/features/contact-form';
import { PageLayout } from '@/components/layout/page-layout';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';

import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
} from 'lucide-react';

import { getContactSchema } from '@/lib/seo-schemas';

export const metadata: Metadata = {
  title: 'Contact Us | Madhyanchal Sarbajanin Chandannagar',
  description:
    'Get in touch with Madhyanchal Sarbajanin for inquiries, sponsorships, and collaborations. Located at Station Road, Chandannagar.',
  keywords: [
    'contact madhyanchal',
    'jagadhatri puja contact chandannagar',
    'madhyanchal sarbajanin contact',
    'chandannagar puja committee phone',
    'madhyanchal email address',
    'station road chandannagar puja',
  ],
  openGraph: {
    title: 'Contact Us | Madhyanchal Sarbajanin Chandannagar',
    description:
      'Reach out to our dedicated committee desk for festival queries, sponsorships, and media inquiries.',
    url: '/contact-us',
    type: 'website',
  },
  alternates: {
    canonical: '/contact-us',
  },
};

export const viewport: Viewport = {
  themeColor: '#4a0e17',
};

export default function ContactUsPage() {
  const contactJsonLd = getContactSchema();

  const contactCards = [
    {
      title: 'Email Address',
      value: 'jagatdhatri.madhyanchal@gmail.com',
      href: 'mailto:jagatdhatri.madhyanchal@gmail.com',
      action: 'Send Email',
      icon: Mail,
    },
    {
      title: 'Phone Helpline',
      value: '+91 6291355010',
      href: 'tel:+916291355010',
      action: 'Call Directly',
      icon: Phone,
    },
    {
      title: 'Committee Location',
      value:
        'Madhyanchal, Station Road, Chandannagar, Hooghly, West Bengal - 712136',
      href: 'https://www.google.com/maps/search/?api=1&query=Madhyanchal+Sarbajanin+Jagadhatri+Puja+Samity,Chandannagar,Hooghly,West+Bengal,712136',
      action: 'Open in Maps',
      icon: MapPin,
    },
  ];

  return (
    <PageLayout
      title="Get In Touch With Us"
      subtitle="Have questions about Jagadhatri Puja, sponsorships, or festival arrangements? Send us a message or reach out through our contact desk."
      badge={{
        text: 'Direct Committee Communication Desk',
        icon: Sparkles,
      }}
      breadcrumbCurrent="Contact Us"
      scriptJsonLd={contactJsonLd}
    >
      <div className="space-y-8 sm:space-y-14">
        {/* 3 QUICK CONTACT DOCK CARDS */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <AnimatedWrapper key={card.title} direction="up" delay={i * 0.08}>
                <div className="card-glass card-hover-glow relative flex h-full flex-col justify-between space-y-2.5 overflow-hidden rounded-xl border border-slate-200/90 p-3 backdrop-blur-2xl transition-all duration-300 sm:rounded-2xl sm:p-5 dark:border-white/12">
                  <BorderBeam
                    size={100}
                    duration={6}
                    colorFrom="#f59e0b"
                    colorTo="#fef08a"
                  />

                  <div className="space-y-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-600 sm:h-9 sm:w-9 sm:rounded-xl dark:text-amber-400">
                      <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                    </div>
                    <h3 className="font-paytone text-xs text-slate-900 sm:text-base dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed font-medium wrap-break-word text-slate-600 sm:text-xs dark:text-slate-300">
                      {card.value}
                    </p>
                  </div>

                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border-t border-slate-200/80 pt-2 text-[11px] font-bold text-amber-600 transition-colors hover:text-amber-700 sm:text-xs dark:border-white/10 dark:text-amber-400"
                  >
                    <span>{card.action}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </AnimatedWrapper>
            );
          })}
        </div>

        {/* FORM & GOOGLE MAPS DUAL GRID */}
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left: Interactive Contact Form */}
          <AnimatedWrapper direction="up" delay={0.15} className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-amber-500" />
              <h2 className="font-paytone text-base text-slate-900 sm:text-xl dark:text-white">
                Send Us a Direct Message
              </h2>
            </div>
            <ContactForm />
          </AnimatedWrapper>

          {/* Right: Interactive Location & Google Maps Card */}
          <AnimatedWrapper direction="up" delay={0.25} className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" />
              <h2 className="font-paytone text-base text-slate-900 sm:text-xl dark:text-white">
                Visit Committee Headquarters
              </h2>
            </div>

            <div className="card-glass card-hover-glow relative space-y-4 overflow-hidden rounded-xl border border-slate-200/90 p-4 backdrop-blur-2xl sm:rounded-2xl sm:p-7 dark:border-white/12">
              <BorderBeam
                size={140}
                duration={6}
                colorFrom="#f59e0b"
                colorTo="#fef08a"
              />

              <div className="space-y-1.5">
                <h3 className="font-paytone text-sm text-slate-900 sm:text-lg dark:text-white">
                  Madhyanchal Sarbajanin
                </h3>
                <p className="text-xs leading-relaxed font-normal text-slate-600 dark:text-slate-300">
                  Madhyanchal, Station Road, Chandannagar, Hooghly, West Bengal
                  – 712136
                </p>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-amber-600 dark:text-amber-400">
                  <Clock className="h-3 w-3" /> Station Road (1 km from
                  Chandannagar Railway Station)
                </span>
              </div>

              {/* Google Maps Visual Embed Frame */}
              <div className="group relative aspect-video overflow-hidden rounded-xl border border-slate-200/90 bg-stone-900 dark:border-white/12">
                <iframe
                  title="Madhyanchal Sarbajanin Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.892398514108!2d88.36033547590895!3d22.864798579284245!2m3!1f0!f0!f0!m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8931167448ebf%3A0x8e82d3e1a613589b!2sMadhyanchal%20Sarbajanin%20Jagadhatri%20Puja%20Samity!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="brightness-[0.95] contrast-[1.05] filter transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Madhyanchal+Sarbajanin+Jagadhatri+Puja+Samity,Chandannagar,Hooghly,West+Bengal,712136"
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-none transition-all hover:bg-amber-600 active:scale-[0.98] sm:text-sm"
              >
                <MapPin className="h-4 w-4" /> Open Full Direction in Google
                Maps
              </a>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </PageLayout>
  );
}
