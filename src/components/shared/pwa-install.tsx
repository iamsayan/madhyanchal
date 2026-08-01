'use client';

import { useEffect, useState } from 'react';

export function PwaInstallPrompt() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dynamically register web component in client browser
    import('@khmyznikov/pwa-install');
  }, []);

  if (!mounted) return null;

  return (
    <pwa-install
      manifest-url="/manifest.webmanifest"
      name="Madhyanchal"
      icon="/circle-logo.png"
      description="Official App for Madhyanchal Sarbajanin, Chandannagar."
      install-description="Install our official App on your mobile device or desktop for quick access to Puja Schedules, Gallery, and Pushpanjali timings."
    />
  );
}
