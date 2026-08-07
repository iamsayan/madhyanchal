'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AnimatedWrapper } from '@/components/shared/animated-wrapper';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, RefreshCw, WifiOff, Sparkles } from 'lucide-react';

export default function OfflinePage() {
  useEffect(() => {
    document.title = 'Offline | Madhyanchal Sarbajanin';
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="bg-dot-mesh relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-10 text-center select-none">
      {/* Background Ambient Glow Halo */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px] dark:bg-amber-500/10" />

      {/* MOBILE NATIVE VIEW */}
      <div className="flex w-full max-w-xs flex-col items-center space-y-5 sm:hidden">
        {/* Mobile Icon Badge */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-14 w-14 rounded-full bg-amber-500/20 blur-xl dark:bg-amber-500/15" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-xl">
            <WifiOff className="h-7 w-7 text-amber-600 dark:text-amber-400" />
          </div>
        </div>

        {/* Mobile Title & Description */}
        <div className="space-y-1 text-center">
          <h1 className="font-paytone text-lg font-bold text-slate-900 dark:text-white">
            You Are Offline
          </h1>
          <p className="px-2 text-xs leading-relaxed font-normal text-slate-500 dark:text-slate-400">
            Please check your internet connection and try reloading the page.
          </p>
        </div>

        {/* Mobile Actions */}
        <div className="flex flex-col items-center space-y-3 pt-2 w-full">
          <Button
            variant="primary"
            size="sm"
            onClick={handleReload}
            className="w-full h-9 rounded-full text-xs font-bold shadow-none active:scale-95"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Try Again
          </Button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 hover:text-amber-800 active:scale-95 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return Home
          </Link>
        </div>
      </div>

      {/* DESKTOP VIEW */}
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
            No Internet Connection
          </span>

          {/* Icon Header */}
          <div className="relative flex flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-amber-500/40 bg-amber-500/10 backdrop-blur-xl">
              <WifiOff className="h-10 w-10 text-amber-600 dark:text-amber-400" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 text-center">
            <h1 className="font-paytone text-xl font-bold text-slate-900 dark:text-white">
              You Are Currently Offline
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              We couldn’t reach the server. Please check your network connection and try again.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-row items-center justify-center gap-2.5 pt-1">
            <Button
              variant="primary"
              size="default"
              onClick={handleReload}
              className="h-10 rounded-full border border-amber-400/60 px-5 text-xs font-bold shadow-none active:scale-95"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>

            <Button
              variant="outline"
              size="default"
              asChild
              className="h-10 rounded-full border-amber-500/40 bg-white/80 px-5 text-xs font-bold text-slate-900 shadow-none hover:bg-amber-500/10 active:scale-95 dark:border-white/20 dark:bg-stone-950 dark:text-white"
            >
              <Link href="/" className="justify-center gap-2">
                <Home className="h-4 w-4 text-amber-500" /> Return Home
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}
