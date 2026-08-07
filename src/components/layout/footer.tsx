'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';

import {
  AtSign,
  Facebook,
  Instagram,
  Sparkles,
  Twitter,
  Youtube,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouteContext } from '@/hooks/use-route-context';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export function Footer() {
  const { isDurgaPuja } = useRouteContext();

  const defaultSocialLinks = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://www.facebook.com/madhyanchalsarbajanin',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://www.youtube.com/@madhyanchalsarbajanin',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/madhyanchal_sarbajanin',
    },
    {
      icon: AtSign,
      label: 'Threads',
      href: 'https://www.threads.net/@madhyanchal_sarbajanin',
    },
    { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/madhyanchal' },
  ];

  const durgaSocialLinks = [
    {
      icon: Facebook,
      label: 'Facebook',
      href: 'https://www.facebook.com/msdpsofficial',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/madhyanchal_sarbajanin',
    },
    {
      icon: AtSign,
      label: 'Threads',
      href: 'https://www.threads.net/@madhyanchal_sarbajanin',
    },
    { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/madhyanchal' },
  ];

  const socialLinks = isDurgaPuja ? durgaSocialLinks : defaultSocialLinks;

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-slate-100/60 pt-3 pb-20 text-slate-700 transition-colors sm:pt-10 sm:pb-10 dark:border-white/10 dark:bg-[#0c0a09] dark:text-slate-300">
      {/* Ambient Halo & Radial Glow */}
      <div className="absolute top-0 left-1/2 h-px w-3/4 max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[150px] w-[300px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[90px] sm:h-[250px] sm:w-[500px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center space-y-2 px-3 pt-1 pb-2 text-center sm:space-y-5 sm:px-6 lg:px-8">
        {/* Prominent Brand Logo */}
        <Link
          href="/"
          className="inline-block transition-transform hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="Madhyanchal Sarbajanin Jagadhatri Puja Logo"
            width={240}
            height={60}
            className="mx-auto h-6 w-auto object-contain sm:h-14"
            priority
          />
        </Link>

        {/* Social Media Micro Icon Row */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3">
          {socialLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-600 shadow-2xs transition-all hover:scale-110 hover:border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 sm:h-8 sm:w-8 dark:border-white/10 dark:bg-stone-900/80 dark:text-slate-300 dark:hover:bg-amber-500 dark:hover:text-slate-950"
              >
                <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </a>
            );
          })}
        </div>

        {/* Legal & Copyright Info */}
        <div className="space-y-1 text-[9.5px] text-slate-500 sm:space-y-1 sm:text-xs dark:text-slate-400">
          <p>
            Copyright © {new Date().getFullYear()} Madhyanchal Sarbajanin. All
            Rights Reserved.
          </p>
          <p className="flex items-center justify-center gap-1 text-[9px] text-slate-400 sm:text-[10px] dark:text-slate-500">
            Designed & Developed by{' '}
            <Link
              href="https://www.sayandatta.co.in"
              target="_blank"
              className={cn(
                spaceGrotesk.className,
                'inline-flex items-center gap-1 rounded border border-amber-500/25 bg-amber-500/10 px-1.5 py-0.5 text-[6px] font-bold tracking-widest transition-all hover:scale-105 hover:border-amber-500/50 hover:bg-amber-500/20 sm:text-[9px]'
              )}
            >
              <Sparkles className="h-2 w-2 animate-pulse text-amber-500 sm:h-2.5 sm:w-2.5" />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent uppercase dark:from-amber-400 dark:to-yellow-300">
                SAYAN DATTA
              </span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
