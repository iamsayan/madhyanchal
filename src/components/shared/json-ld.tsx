/**
 * Next.js 16 compliant Schema.org JSON-LD Component
 * Renders safe <script type="application/ld+json"> for search crawlers.
 */
import type { JsonLdInput } from '@/lib/schema/types';

interface JsonLdProps {
  data?: JsonLdInput;
  schema?: JsonLdInput;
}

/**
 * Next.js 16 compliant Schema.org JSON-LD Component
 * Renders safe <script type="application/ld+json"> for search crawlers.
 */
export function JsonLd({ data, schema }: JsonLdProps) {
  const content = data || schema;
  if (!content) return null;

  let formattedData = content;
  if (Array.isArray(content)) {
    formattedData = {
      '@context': 'https://schema.org',
      '@graph': content,
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

