'use client';

import * as React from 'react';
import { ViewTransition } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  return <ViewTransition name="page">{children}</ViewTransition>;
}
