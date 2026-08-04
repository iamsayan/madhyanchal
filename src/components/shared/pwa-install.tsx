'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    openPwaInstallPrompt?: () => void;
  }
}

export function PwaInstallPrompt() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dynamically register web component in client browser
    import('@khmyznikov/pwa-install');

    // Register global trigger API on window object
    window.openPwaInstallPrompt = () => {
      const pwaInstall = document.getElementsByTagName(
        'pwa-install'
      )[0] as unknown as {
        openPrompt?: () => void;
        show?: () => void;
        isUnderStandaloneMode?: boolean;
        isInstallAvailable?: boolean;
      };
      if (pwaInstall) {
        if (typeof pwaInstall.openPrompt === 'function') {
          pwaInstall.openPrompt();
        } else if (typeof pwaInstall.show === 'function') {
          pwaInstall.show();
        }
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <pwa-install
      manifest-url="/manifest.webmanifest"
      name="Madhyanchal Sarbajanin"
      icon="/circle-logo.png"
      description="Official App for Madhyanchal Sarbajanin, Chandannagar."
      install-description="Install our official app on your device for instant offline access to Puja Schedules, Pandal Details, Gallery, Pushpanjali timings, and Sit & Draw Competition results!"
      manual-apple="true"
      manual-chrome="true"
    />
  );
}
