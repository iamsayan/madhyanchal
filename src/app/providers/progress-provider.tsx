'use client';

import { AppProgressProvider as BProgressProvider } from '@bprogress/next';
import { ReactNode } from 'react';

export function ProgressProvider({ children }: { children: ReactNode }) {
  return (
    <BProgressProvider
      height="3px"
      color="#f59e0b"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </BProgressProvider>
  );
}
