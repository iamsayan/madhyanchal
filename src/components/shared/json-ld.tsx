/**
 * Next.js 16 compliant Schema.org JSON-LD Component
 * Renders safe <script type="application/ld+json"> for search crawlers.
 */
export function JsonLd({
  schema,
}: {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
