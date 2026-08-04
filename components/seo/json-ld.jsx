/**
 * Emits one or more JSON-LD graphs.
 *
 * A plain <script type="application/ld+json"> is correct here — next/script is
 * for executable JavaScript, and applying a loading strategy to structured data
 * can delay or skip it entirely.
 *
 * `data` is a single object or an array; nullish entries are dropped so callers
 * can pass conditional builders inline.
 */
function JsonLd({ data }) {
  const graphs = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!graphs.length) return null;

  return (
    <>
      {graphs.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Content is built server-side from our own content layer, never from
          // user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}

export default JsonLd;
