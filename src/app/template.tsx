'use client';

import { ReactNode, ViewTransition } from 'react';


export default function Template({ children }: { children: ReactNode }) {
  return <ViewTransition name="page">{children}</ViewTransition>;
}
