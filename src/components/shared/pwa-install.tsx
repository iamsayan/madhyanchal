'use client';

import * as React from 'react';

export function PwaInstallPrompt() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Dynamically register web component in client browser
    import('@khmyznikov/pwa-install');
  }, []);

  if (!mounted) return null;

  return (
    <pwa-install
      manifest-url="/manifest.webmanifest"
      name="Madhyanchal Sarbajanin"
      icon="/circle-logo.png"
      description="Golden Jubilee Edition — Official Web App for Madhyanchal Sarbajanin Jagadhatri Puja Samity, Chandannagar."
      install-description="Install our official Web App on your mobile device or desktop for quick access to Puja Schedules, Gallery, and Pushpanjali timings."
    />
  );
}
