'use client';

import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  AtSign,
  Facebook,
  Heart,
  Instagram,
  MessageCircle,
  Twitter,
  Youtube,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy-policy' },
  ];

  const socialLinks = [
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
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/916291355010',
    },
    {
      icon: AtSign,
      label: 'Threads',
      href: 'https://www.threads.net/@madhyanchal_sarbajanin',
    },
    { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/madhyanchal' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-slate-100/60 pt-5 pb-24 text-slate-700 transition-colors sm:pt-10 sm:pb-10 dark:border-white/10 dark:bg-[#0c0a09] dark:text-slate-300">
      {/* Ambient Halo & Radial Glow */}
      <div className="absolute top-0 left-1/2 h-px w-3/4 max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[200px] w-[400px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px] sm:h-[250px] sm:w-[500px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center space-y-3 px-4 pt-2 pb-4 text-center sm:space-y-5 sm:px-6 lg:px-8">
        {/* Prominent Brand Logo */}
        <Link
          href="/"
          transitionTypes={['nav-back']}
          className="inline-block transition-transform hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="Madhyanchal Sarbajanin Jagadhatri Puja Logo"
            width={240}
            height={60}
            className="mx-auto h-8 w-auto object-contain sm:h-14"
            priority
          />
        </Link>

        {/* Compact Navigation Links with Dot Separators */}
        <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-600 sm:gap-x-6 sm:text-xs dark:text-slate-300">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link.href}>
              {idx > 0 && (
                <span className="text-[10px] text-amber-500/40 select-none">
                  •
                </span>
              )}
              <Link
                href={link.href}
                transitionTypes={['nav-forward']}
                className="transition-colors hover:text-amber-600 dark:hover:text-amber-400"
              >
                {link.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>

        {/* Social Media Micro Icon Row */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {socialLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-600 shadow-xs transition-all hover:scale-110 hover:border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 sm:h-8 sm:w-8 dark:border-white/10 dark:bg-stone-900/80 dark:text-slate-300 dark:hover:bg-amber-500 dark:hover:text-slate-950"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            );
          })}
        </div>

        {/* Legal & Copyright Info */}
        <div className="space-y-1 text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
          <p>
            © {currentYear} Madhyanchal Sarbajanin Jagadhatri Puja Samity. All
            Rights Reserved.
          </p>
          <p className="flex items-center justify-center gap-1 text-[9.5px] text-slate-400 sm:text-[10px] dark:text-slate-500">
            Crafted with{' '}
            <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> for
            Chandannagar & Bengal.
          </p>
        </div>
      </div>
    </footer>
  );
}
