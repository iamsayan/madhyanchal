import type { JsonLdInput } from './types';

interface JsonLdProps {
  data: JsonLdInput;
}

/**
 * Reusable Production-Ready JSON-LD React Component for Next.js 16 App Router
 * Safely serializes Schema.org JSON-LD scripts with XSS sanitization.
 */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  // Format array input into @graph if not already wrapped
  let formattedData = data;
  if (Array.isArray(data)) {
    formattedData = {
      '@context': 'https://schema.org',
      '@graph': data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(formattedData).replace(/</g, '\\u003c'),
      }}
    />
  );
}
