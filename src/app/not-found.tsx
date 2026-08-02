import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Compass,
  Flame,
  Home,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '404: Page Not Found | Madhyanchal Sarbajanin',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div className="bg-dot-mesh relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-10 text-center select-none">
      {/* Background Ambient Glow Halo */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px] dark:bg-amber-500/10" />

      {/* MOBILE NATIVE APP VIEW (Clean, Borderless, Buttonless, Ultra-Minimal) */}
      <div className="flex w-full max-w-xs flex-col items-center space-y-5 sm:hidden">
        {/* Native App Minimal Icon Badge */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-14 w-14 rounded-full bg-amber-500/20 blur-xl dark:bg-amber-500/15" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-xl">
            <span className="font-paytone text-lg font-bold text-amber-600 dark:text-amber-400">
              404
            </span>
          </div>
        </div>

        {/* Minimal Native App Title & Subtitle */}
        <div className="space-y-1 text-center">
          <h1 className="font-paytone text-lg font-bold text-slate-900 dark:text-white">
            Not Found
          </h1>
          <p className="px-2 text-xs leading-relaxed font-normal text-slate-500 dark:text-slate-400">
            This link may be broken or the page has been moved.
          </p>
        </div>

        {/* Clean Native Text Links (No Buttons) */}
        <div className="flex flex-col items-center space-y-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 hover:text-amber-800 active:scale-95 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return Home
          </Link>

          <Link
            href="/durgapuja"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-amber-600 active:scale-95 dark:text-slate-400 dark:hover:text-amber-400"
          >
            <Flame className="h-3.5 w-3.5 text-amber-500" /> Explore Durga Puja
          </Link>
        </div>
      </div>

      {/* DESKTOP VIEW (Rich Glassmorphism Showcase) */}
      <AnimatedWrapper
        direction="up"
        className="relative z-10 hidden w-full max-w-md sm:block"
      >
        <div className="relative flex flex-col items-center space-y-6 overflow-hidden rounded-3xl border border-amber-500/30 bg-white/85 p-8 backdrop-blur-2xl dark:border-white/15 dark:bg-stone-900/90">
          <BorderBeam
            size={160}
            duration={7}
            colorFrom="#f59e0b"
            colorTo="#fef08a"
          />

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3.5 py-1 text-[10.5px] font-extrabold tracking-widest text-amber-900 uppercase dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-500" />
            Page Not Found
          </span>

          {/* Big Shimmer 404 Number */}
          <div className="relative flex flex-col items-center">
            <h1 className="font-paytone text-8xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent dark:from-amber-400 dark:via-amber-300 dark:to-yellow-400">
                404
              </span>
            </h1>
            <span className="mt-1 text-[11px] font-black tracking-[0.2em] text-amber-900/80 uppercase dark:text-amber-300/90">
              ✦ Lost in the Festivities? ✦
            </span>
          </div>

          {/* Description */}
          <div className="space-y-1.5 text-center">
            <h2 className="font-paytone text-xl font-bold text-slate-900 dark:text-white">
              We Couldn’t Find That Page
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              The page you are looking for might have been moved, renamed, or is
              temporarily unavailable during festival updates.
            </p>
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="flex w-full flex-row items-center justify-center gap-2.5 pt-1">
            <Button
              variant="primary"
              size="default"
              asChild
              className="h-10 rounded-full border border-amber-400/60 px-5 text-xs font-bold shadow-none active:scale-95"
            >
              <Link href="/" className="justify-center gap-2">
                <Home className="h-4 w-4" /> Return to Home
              </Link>
            </Button>

            <Button
              variant="outline"
              size="default"
              asChild
              className="h-10 rounded-full border-amber-500/40 bg-white/80 px-5 text-xs font-bold text-slate-900 shadow-none hover:bg-amber-500/10 active:scale-95 dark:border-white/20 dark:bg-stone-950 dark:text-white"
            >
              <Link href="/durgapuja" className="justify-center gap-2">
                <Flame className="h-4 w-4 text-amber-500" /> Explore Durga Puja
              </Link>
            </Button>
          </div>

          {/* Sub-Footer Help Link */}
          <div className="flex w-full items-center justify-between border-t border-slate-200/80 pt-3 text-[11px] font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
            <Link
              href="/contact-us"
              className="flex items-center gap-1 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
            >
              <PhoneCall className="h-3.5 w-3.5 text-amber-500" /> Contact
              Support
            </Link>

            <Link
              href="/schedule"
              className="flex items-center gap-1 transition-colors hover:text-amber-600 dark:hover:text-amber-400"
            >
              <Compass className="h-3.5 w-3.5 text-amber-500" /> View Schedule
            </Link>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
