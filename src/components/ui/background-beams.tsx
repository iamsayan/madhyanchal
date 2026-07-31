'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden opacity-40',
        className
      )}
    >
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <g filter="url(#beams-filter)">
          <path
            d="M-200 450 C 300 100, 700 800, 1600 450"
            stroke="url(#beam-gradient-1)"
            strokeWidth="3"
            strokeDasharray="10 15"
          />
          <path
            d="M-200 200 C 400 700, 800 100, 1600 700"
            stroke="url(#beam-gradient-2)"
            strokeWidth="2"
          />
          <path
            d="M-200 700 C 500 200, 900 800, 1600 200"
            stroke="url(#beam-gradient-1)"
            strokeWidth="2.5"
            strokeDasharray="5 10"
          />
        </g>
        <defs>
          <linearGradient
            id="beam-gradient-1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="beam-gradient-2"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
          <filter id="beams-filter" x="-300" y="-100" width="2000" height="1100">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
